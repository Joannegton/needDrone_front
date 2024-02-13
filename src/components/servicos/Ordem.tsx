import { useParams, Link, useNavigate } from 'react-router-dom';
import Menu from "../menu/page";
import React, { useEffect, useState } from 'react';
import ForbiddenPage from '../cards/proibido';
import ErrosForms from '../cards/erroForms';

interface IordemServico {
    title: string;
    created_at: string;
    deadline: string;
    description: string;
    droneType: string;
    imgQuality: string;
    imgsubposition: string;
    cobertArea: string;
    localization:string
    userName: string
    userAvaliacao: number
    userId: string
    estadoOrdem: string
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
    return formattedDate;
};

const Ordem = () => {
    const { projectId } = useParams()    
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState('');
    const [description, setDescription] = useState('');
    const [droneType, setDronetype] = useState('');
    const [imgQuality, setImgQuality] = useState('');
    const [imgsubposition, setSubposition] = useState('');
    const [cobertArea, setCobertArea] = useState('');
    const [localization, setLocalization] = useState('');
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [userAvaliacao, setUserAvaliacao] = useState(5);
    const [estadoOrdem, setEstadoOrdem] = useState('');
    const [error, setError] = useState(false)

    const typeUser = localStorage.getItem('typeUser')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://slug-liberal-wallaby.ngrok-free.app:5000/projeto/${projectId}`);
                if (!response.ok) {
                    throw new Error(`Erro ao obter dados do projeto: ${response.statusText}`);
                }
                const data: IordemServico = await response.json();
                setCobertArea(data.cobertArea);
                setDeadline(data.deadline);
                setDescription(data.description);
                setDronetype(data.droneType);
                setImgQuality(data.imgQuality);
                setSubposition(data.imgsubposition); 
                setTitle(data.title);
                setLocalization(data.localization)
                setUserName(data.userName)
                setUserAvaliacao(data.userAvaliacao)
                setUserId(data.userId)
                setEstadoOrdem(data.estadoOrdem)
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [projectId]);





    const handleProposalClick = () => {
        if (typeUser === 'piloto') {
            navigate(`/proposta/${projectId}`);
        } else {
            setError(true)
        }
    };

    return (<>
          <div className="container">
              <h3 className="titulo">{title}</h3>
              <p className="textos">{description}</p><br />
              <h2 className="titulo3">Especificações do drone(desejável)</h2>
              <div className="projeto">
                  <p>{droneType}</p>
                  <p>{imgQuality}</p>
                  <p>{cobertArea}m²</p>
                  <p className={imgsubposition? 'Sobreposição': 'hidden' }>{imgsubposition}</p>
              </div>
              <div className="localization">
                  {localization}
              </div>
              <div className="client">
                  <p>Cliente: <Link to={`/cliente/perfil/${userId}`}>{userName}</Link> {userAvaliacao}</p> 
                  <p>Data do Evento: {formatDate(deadline)}</p>
              </div>

              <div className="proposta">
                <h1>{estadoOrdem}</h1>
                <button className='button_login' onClick={handleProposalClick}>Enviar Proposta</button>
                {error && <ErrosForms texto={'Somente pilotos podem enviar Propostas!'}/>}

              </div>
          </div>
        </>
    );
};

export default Ordem;
