import React, { useState, useEffect } from 'react';
import  { Link, useNavigate } from 'react-router-dom';
import Drone from './drone';
import ErrosForms from './erroForms';
import SuccessForms from './successForms';

import accepted from '../../assets/accepted.png'
import canceled from '../../assets/canceled.png'
interface Piloto {
  name: string;
  // Adicione outras propriedades do piloto conforme necessário
}

interface Proposta {
  projectId: string
    IdCriadorProjeto:string
    enviadorProposta: string;
    ofertaInicial: number;
    ofertaFinal: number;
    detalhesProposta: string;
    droneId: string;
    status: string
    _id: string
}

interface PropostaCardProps {
  proposta: Proposta;
}

const PropostaCard: React.FC<PropostaCardProps> = ({ proposta }) => {
  const [piloto, setPiloto] = useState<Piloto | null>(null);

  const [render, setRender] = useState(false)
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/piloto/${proposta.enviadorProposta}`);
        const data = await response.json();
        if (data) {
          setPiloto(data);
        } else {
          throw new Error('Erro ao buscar dados do Piloto!');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [proposta.enviadorProposta, proposta.status])

  const aceptOrder = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token de autenticação não encontrado.');
      setError(true);
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/proposta/atualizar/${proposta._id}`, {
        method: "PUT",
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: "andamento" }) 
      });
  
      if (response.ok) {
        setRender(true);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate(`/andamentoordem/${proposta._id}`);
        }, 5000);
      } else {
        setError(true);
        console.error('Erro ao atualizar proposta:', await response.text());
      }
    } catch (error) {
      setError(true);
      console.error('Erro ao atualizar proposta:', error);
    }
  };
  
  const rejectOrder = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token de autenticação não encontrado.');
      setError(true);
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/proposta/atualizar/${proposta._id}`, {
        method: "PUT",
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: "cancelado" }) 
      });
  
      if (response.ok) {
        setRender(true);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
        window.location.reload()
        
      } else {
        setError(true);
        console.error('Erro ao atualizar proposta:', await response.text());
      }
    } catch (error) {
      setError(true);
      console.error('Erro ao atualizar proposta:', error);
    }
  };

  useEffect(() => {
    if (proposta.status === 'concluído') {
      setSuccess(true);
    
    }
  }, [proposta.status])
  
  const userType = localStorage.getItem('typeUser')
  const auth = userType === 'cliente'

  return (
    <div className="container">
      { (
        <div className="proposta-card">
          <div className="proposta_infos">
            <div>
              <p><strong>Proposta de:</strong> <Link to={`/piloto/perfil/${proposta.enviadorProposta}`}>{piloto?.name}</Link></p>
              <p><strong>Valor:</strong> {proposta.ofertaFinal}</p>
              <p><strong>Detalhes da Proposta:</strong></p>
              <p className='textos detalhetext'>{proposta.detalhesProposta}</p>
            </div>
            <img src={proposta.status === 'cancelado' ? canceled : accepted} 
                className={proposta.status !== ''  ? '' : 'hidden'} 
                style={{width: '70px', height: '70px'}} 
                alt="status" />
          </div>
          <div className="drone"><Drone id={proposta.droneId}/></div>
            {error && <ErrosForms texto={'Erro ao aceitar/recusar proposta!'}/>}
            {success && <SuccessForms texto={'Projeto Aceito/Recusado com sucesso!'}/>}
            <div className={proposta.status === 'concluido' || proposta.status === 'cancelado' ? 'hidden' : "botoes"}>
              <div className={userType === 'cliente'? '': 'hidden'}>
                <button className={proposta.status === '' ? 'button_login' : 'hidden'}
                        style={{backgroundColor: 'green', border: 'none'}}
                        onClick={aceptOrder}>Aceitar</button>
                <button className={proposta.status === 'andamento' || proposta.status === '' ? 'button_login' : 'hidden'}
                        style={{backgroundColor: 'red', border: 'none'}}
                        onClick={rejectOrder}>Recusar</button>
              </div>
              <button className='button_login' 
                      style={{border: 'none'}} 
                      onClick={() => navigate(`/andamentoordem/${proposta._id}`)}>Mensagem</button>
            </div>
            {proposta.status === 'concluido'? 
              <div className='flex'>
                <SuccessForms texto={'Projeto finalizado com sucesso!'}/>
                <Link className='link button_login' style={{fontSize: '1.1em'}} to={'/comentario'}>Avalie o piloto</Link>
              </div>: null}
        </div>
      )}
    </div>
  );
};

export default PropostaCard;

