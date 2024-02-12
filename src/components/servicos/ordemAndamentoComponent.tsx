import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SuccessForms from '../cards/successForms';

interface Proposta {
  _id: string;
  projectId: string;
  tituloProjeto: string;
  status: string;
}

const AndamentoordemComponent: React.FC = () => {
  const [proposta, setProposta] = useState<Proposta | undefined>();
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const { propostaId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://18.224.25.213:5000/proposta/${propostaId}`);
        if (response.ok) {
          const data = await response.json();
          setProposta(data);
        } else {
          throw new Error('Erro ao buscar dados da Proposta!');
        }
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };

    fetchData();
  }, [proposta]); // Deixar vazio para executar apenas uma vez

  async function handleProposta(newStatus: string) {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://18.224.25.213:5000/proposta/atualizar/${propostaId}`, {
        method: "PUT",
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } else {
        setError(true);
        console.error('Erro ao atualizar a proposta:', response.statusText);
      }
    } catch (error) {
      setError(true);
      console.error('Erro ao atualizar a proposta:', error);
    }
  }

  return (
    <>
      <div >
        {proposta &&
          <>
            <div>
              <h2 className="titulo">{proposta.tituloProjeto}</h2>
            </div>
            <div className='containerProposta'>
              <p><strong>Status:</strong></p>
                <select value={proposta.status} onChange={(e) => handleProposta(e.target.value)}>
                  <option value="andamento">Andamento</option>
                  <option value="concluido">Concluído</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              
            </div>
              {success && <p><SuccessForms texto={'Status da proposta atualizado com sucesso!'}/></p>}
          </>
        }
      </div>
    </>
  );
}

export default AndamentoordemComponent;
