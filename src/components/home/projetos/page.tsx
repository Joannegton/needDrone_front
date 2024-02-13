import './style.css'
import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react'

interface IProjeto{
    title: string
    deadline: string
    description: string
    droneType: string
    imgQuality: boolean
    imgsubposition: string
    cobertArea: string
    status: string
    _id: string
    userId: string
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

const Projetos = ()=>{
    const [content, setContent] = useState<IProjeto[]>([])
    const id = localStorage.getItem('userId')

    const fetchData = async ()=>{
        try {
            const request = await fetch(`https://slug-liberal-wallaby.ngrok-free.app/projeto/`)
            const data: IProjeto[] = await request.json() 
            const userProjetos = data.filter(projeto => projeto.userId === id)
            setContent(userProjetos)    
        } catch (error) {
            console.log("Deu ruim:", error)
        }
    }
    useEffect(()=>{fetchData()}, [])

    const getStatusColor = (status: string) => {
        if (status === 'Ativo') return 'green';
        if (status === 'Manutencao') return 'orange';
        if (status === 'Desativado') return 'red';
        return 'black';
      };

 return(
    <div className="container_projeto">
            <div className="card_edit">
                <h2 className="titulo3">Meus Projetos</h2>
                <Link to="/projeto/cadastro">Adicionar Projeto</Link>
            </div>
            {content.map((projeto) => (<>
                <div key={projeto._id} className="container">
                        <div className="informa">
                            <Link to={`/ordemservico/${projeto._id}`}>
                                <h3 className='titulo3'>{projeto.title}</h3>
                            </Link>
                            <p><strong>Descrição:</strong> {projeto.description}</p>
                            <p><strong>Área de cobertura:</strong> até {projeto.cobertArea}m².</p>
                            <p><strong>Duração:</strong> até {120} minutos</p>
                            <div className="especificacoes">
                                <p>{projeto.droneType}</p>
                                <p>{projeto.imgQuality}</p>
                                <p className={projeto.imgsubposition? 'sobreposicao' : 'hidden'}>{projeto.imgsubposition ? 'Sobreposição' : null}</p>
                            </div>
                            <div className='container_status'>
                                <p>Prazo: {formatDate(projeto.deadline)}</p>
                                <h3 className='status' style={{ color: 'white', backgroundColor: getStatusColor(projeto.status) }}>{projeto.status}</h3>
                                <Link to={`/projeto/editar/${projeto._id}`}>Editar</Link>
                            </div>
                        </div>
                    
                </div>
        </>))}
    </div>
 )   
}

export default Projetos