import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Drone from '../cards/drone';

import './style.css'
import SuccessForms from '../cards/successForms';

interface PropostaForm {
  tituloProjeto: string;
  criadorProjeto: string;
  enviadorProposta: string;
  ofertaInicial: string;
  ofertaFinal: string;
  detalhesProposta: string;
  droneId: string
}

const FormProposta: React.FC = () => {
  const { register, handleSubmit, watch, setValue,reset, formState: { errors } } = useForm<PropostaForm>();
  const [success, setSuccess] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const { projectId } = useParams<{ projectId: string }>();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const [drones, setDrones] = useState<any[]>([]); // Altere o tipo para o array de drones

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/projeto/${projectId}`);
        if (!response.ok) {
          throw new Error(`Erro ao obter dados do projeto: ${response.statusText}`);
        }
        const data = await response.json();
        setTitle(data.title);
        setValue('tituloProjeto', data.title);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [projectId, setValue]);

  useEffect(() => {
    const ofertaInicialValue = watch('ofertaInicial');
    if (ofertaInicialValue) {
      // Garantir que ofertaInicialValue é uma string antes de chamar replace
      const ofertaInicialStr = String(ofertaInicialValue);
      // Removendo "R$" se estiver presente e convertendo para número
      const ofertaInicialNum = parseFloat(ofertaInicialStr.replace(/[^0-9.-]+/g, ""));
      if (!isNaN(ofertaInicialNum)) { // Verifica se o resultado é um número válido
        const final = ofertaInicialNum * 1.1;
        setValue('ofertaFinal', `R$ ${final.toFixed(2)}`);
      }
    }
  }, [watch('ofertaInicial'), setValue]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/drones/${userId}`);
        if (!response.ok) {
          throw new Error(`Erro ao obter drones: ${response.statusText}`);
        }
        const data = await response.json();
        setDrones(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [projectId, userId]);



  const onSubmit = async (data: PropostaForm) => {
    try {
      const response = await fetch('http://localhost:5000/proposta', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...data, projectId, enviadorProposta: userId })
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
        reset()
      } else {
        console.log(data)
        alert("Erro no servidor, tente novamente mais tarde!");
      }
    } catch (error) {
      console.error('Erro ao enviar proposta:', error);
    }
  };

  return (
    <>

      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className='titulo'>{title}</h1>
        <div className="containerData">
          <div className="oferta">
          <div>
            <label>Oferta Inicial</label>
            <input type="text" {...register('ofertaInicial', { required: true, pattern: /^(R\$ )?\d+(\.\d{2})?$/ })} />
            {errors.ofertaInicial && <p>Formato inválido. Use "R$ [valor]".</p>}
          </div>
      <div>
        <label>Oferta Final</label>
        <input type="text" {...register('ofertaFinal')} readOnly disabled/>
      </div>
          </div>
          <div className="detProposta">
            <label>Detalhes da Proposta</label>
            <textarea  {...register('detalhesProposta', { required: true })} />
          </div>
          {errors.detalhesProposta && <p>Detalhes da proposta são obrigatórios</p>}
        </div>
        <div className="drones">
          <h2 className='titulo2'>Escolha uma opção de Drone:</h2>
          {drones.map((drone) => (
            <div key={drone._id}>
              <input className='hidden'
                type="radio"
                id={`opcao-${drone._id}`}
                {...register('droneId', { required: true })}
                name="droneId"
                value={drone._id}
              />
              <label htmlFor={`opcao-${drone._id}`}>
                <Drone id={drone._id}/>
              </label>
            </div>
          ))}
        </div>
        {success && <SuccessForms texto={'Sua proposta foi enviada com sucesso!'}/>}
        <button className='button_login' type="submit">Enviar</button>
      </form>

    </>
  );
};

export default FormProposta;
