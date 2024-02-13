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
        const response = await fetch(`https://slug-liberal-wallaby.ngrok-free.app/piloto/${proposta.enviadorProposta}`);
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

    fetchData(); // Chame a função fetchData diretamente dentro do useEffect
  }, [proposta.enviadorProposta, proposta.status]); // Certifique-se de incluir proposta.enviadorProposta como dependência

  const aceptOrder = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token de autenticação não encontrado.');
      setError(true);
      return;
    }
  
    try {
      const response = await fetch(`https://slug-liberal-wallaby.ngrok-free.app/proposta/atualizar/${proposta._id}`, {
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
      const response = await fetch(`https://slug-liberal-wallaby.ngrok-free.app/proposta/atualizar/${proposta._id}`, {
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
  

  return (
    <div className="container">
      <h2 className="titulo2">Propostas Recebidas</h2>
      {piloto ? (
        <>
          <div className="proposta-card">
          <div className="proposta_infos">
            <div>
              <p><strong>Proposta de:</strong> <Link to={`/piloto/perfil/${proposta.enviadorProposta}`}>{piloto.name}</Link></p>
              <p><strong>Oferta Inicial:</strong> {proposta.ofertaInicial}</p>
              <p><strong>Oferta Final:</strong> {proposta.ofertaFinal}</p>
              <p><strong>Detalhes da Proposta:</strong> {proposta.detalhesProposta}</p>
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
              <button className={proposta.status === '' ? 'button_login' : 'hidden'} 
                      style={{backgroundColor: 'green', border: 'none'}} 
                      onClick={aceptOrder}>Aceitar</button>
              <button className={proposta.status === 'andamento' ? 'button_login' : 'hidden'} 
                      style={{backgroundColor: 'red', border: 'none'}} 
                      onClick={rejectOrder}>Recusar</button>
              <button className='button_login' 
                      style={{border: 'none'}} 
                      onClick={() => navigate(`/andamentoordem/${proposta._id}`)}>Mensagem</button>
            </div>
            {proposta.status === 'concluido'? <SuccessForms texto={'Projeto finalizado com sucesso!'}/>: null}
        </div>
        </>
      ) : (
        <h2 className='titulo3'>Carregando Propostas...</h2>
      )}
    </div>
  );
};

export default PropostaCard;

