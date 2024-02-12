import './styles.css'
import img_drone from '../../components/img/drone.jpg'
import { useEffect, useState } from 'react'
import  { Link } from 'react-router-dom';

interface IDrone{
    _id: string
    name: string
    imagem: string
    droneType: string
    imgQuality: string
    cobertArea: string
    imgsubposition: boolean
    autonomia: string
    status: string
    userId: string;
}

interface DroneProps {
    id: string;
  }
  
const Drone: React.FC<DroneProps> = ({ id }) =>{
    const [content, setContent] = useState<IDrone | null>(null)
    const userType = localStorage.getItem('type')

    const fetchData = async ()=>{
        try {
            const request = await fetch(`http://localhost:5000/drone/${id}`)
            const data = await request.json()
            setContent(data)    
        } catch (error) {
            console.log("Deu ruim:", error)
        }
    }

    useEffect(()=>{fetchData()}, [id])

    const getStatusColor = (status: string) => {
        if (status === 'Ativo') return 'green';
        if (status === 'Manutencao') return 'orange';
        if (status === 'Desativado') return 'red';
        return 'black';
      };
    return(<>
        {content && ( 
            <div className="container_drone" >
                <div className="containerImg"><img src={img_drone} width={80} height={80} alt="Foto do drone" />
                <Link className={userType === 'piloto'?'button_login': 'hidden'} to={`/drone/editar/${content._id}`}>Editar</Link></div>

                <div className='infos'>
                    <h3 className="Titulo3">{content.name} </h3>
                    <p>Autonomia: até {content.autonomia} minutos.</p>
                    <p>Área de cobertura: até {content.cobertArea}m².</p>
                    <div className="especificacoes">
                        <p>{content.droneType}</p>
                        <p>{content.imgQuality}</p>
                        <p className={content.imgsubposition? 'sobreposicao' : 'hidden'}>{content.imgsubposition ? 'Sobreposição' : null}</p>
                    </div>
                </div>
                <h3 className='statusDrone vertical-text' style={{ color: 'white', backgroundColor: getStatusColor(content.status) }}>{content.status}</h3>

            </div>
        )}
    </>)
}

export default Drone
