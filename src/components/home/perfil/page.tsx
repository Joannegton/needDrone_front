import perfil from '../../img/eu.jpg'
import './style.css'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

interface IResumoPerfil{
    name: string
}


const ResumoPerfil: React.FC = () => {

    const [content, setContent] = useState<IResumoPerfil | null>(null)
    const userId = localStorage.getItem('userId');
    const typeUser = localStorage.getItem('typeUser');
    let url = ''
    if(typeUser === 'cliente') {
         url = `http://18.224.25.213:5000/cliente/${userId}`
    }else {
         url = `http://18.224.25.213:5000/piloto/${userId}`
    }

    const  fetchData = async ()=>{
        try {
            const request = await fetch(url)
            const data = await request.json()
            setContent(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{fetchData()}, [userId])

    return(<>
        {content && (
            <div className="container_perfil">
                <div className="card_edit">
                    <h2 className="titulo3">Meu perfil</h2>
                    <div className='links'>
                        <Link className='link' to={typeUser === 'cliente'? `/cliente/perfil/${userId}` : `/piloto/perfil/${userId}`}>Ver</Link>
                        <Link className='link' to={typeUser === 'cliente'? `/cliente/editar/${userId}` : `/piloto/editar/${userId}`}>Editar</Link>
                    </div>
                </div>

                <div className="card_perfil">
                    <img src={perfil} width={80} height={80} alt="Foto de perfil" />
                    <div className='infos'>
                        <h3 className="texto3">{content.name}</h3>
                        <p>Numeros de estrelas (0 avaliações)</p>
                        <p>Nivel de membro. <strong><a href="/premium">Seja premium</a></strong></p>
                    </div>
                </div>
                <div className='perc_preenc'>
                    Perfil preenchido (100%) 
                </div>

            </div>
        )}
    </>)
}

export default ResumoPerfil
