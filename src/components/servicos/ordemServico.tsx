import { useEffect, useState } from "react"
import {Link} from 'react-router-dom'
import './style.css'
import Menu from "../menu/page"

interface IordemServico{
    title: string
    created_at: string
    deadline: string
    description: string
    droneType: string
    imgQuality: boolean
    imgsubposition: string
    cobertArea: string
    _id: string
    userId: string
    userName: string
}

const formatDate = (dateString: string) => {
    // Convertendo a string de data para um objeto Date
    const date = new Date(dateString);
    
    // Obtendo os componentes da data UTC
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; // Adiciona 1, pois os meses são indexados a partir de zero
    const day = date.getUTCDate();

    // Formatando a data manualmente
    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

    return formattedDate;
};


const OrdemServicoComponent = () =>{
    const [content, setContent] = useState<IordemServico[]>([])

    
    useEffect(()=>{
        const fetchData = async () =>{  
            const response = await fetch('http://18.188.189.201:5000/projeto')
            const data = await response.json()
            setContent(data) 
        }
        fetchData()
    }, [])
  


    return(<>

            <div className="resultados" style={{margin: '5px 0 15px 10px'}}>
                <p className="titulo2">Resultados da pesquisa:</p> 
                <p className="titulo3">foram encontrados {content.length} projetos</p>
            </div>

            <div className="filtros">
                Em breve - Filtros
            </div>
            {content.map((cont, index) =>(
                <div className="container" key={index}>
                    <Link to={`/ordemservico/${cont._id}`}>
                        <h3 className="titulo2">{cont.title}</h3>
                    </Link>
                    <p className="textos">{cont.description}</p>
                    <div className="projeto">
                        <p>{cont.droneType}</p>
                        <p>{cont.imgQuality}</p>
                        <p>{cont.cobertArea}</p>
                        <p>{cont.imgsubposition ? 'Sobreposição': '' }</p>
                    </div>
                    <div className="client">
                        <p>Cliente: <Link to={`/cliente/perfil/${cont.userId}`}>{cont.userName}</Link> Avaliação</p>
                        <p>Data do Evento: {formatDate(cont.deadline)}</p>
                    </div>
                    
                </div>
            ))}
    </>)
}

export default OrdemServicoComponent