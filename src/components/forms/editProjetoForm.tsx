import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import SuccessForms from '../cards/successForms';

interface ProjectData {
  title: string;
  description: string;
  droneType: string;
  imgQuality: string;
  cobertArea: string;
  imgsubposition: boolean;
  prazoEntrega: string;
  deadline: string;
  localization: string;
  budget: number;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('pt-BR');
  return formattedDate;
};

const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

const FormAtualizacaoProj: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipoDrone, setTipoDrone] = useState('');
  const [qualidadeImagem, setQualidadeImagem] = useState('');
  const [areaCobertura, setAreaCobertura] = useState('');
  const [sobreposicaoImagem, setSobreposicaoImagem] = useState(false);
  const [prazoEntrega, setPrazoEntrega] = useState('');
  const [localization, setLocalization] = useState('');
  const [budget, setBudget] = useState<number>(0);
  const [success, setSuccess] = useState(false);

  const getFetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/projeto/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: ProjectData = await response.json();
      setTitulo(data.title);
      setAreaCobertura(data.cobertArea);
      setDescricao(data.description);
      setTipoDrone(data.droneType);
      setPrazoEntrega(data.deadline);
      setQualidadeImagem(data.imgQuality);
      setSobreposicaoImagem(data.imgsubposition);
      setLocalization(data.localization);
      setBudget(data.budget);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const onSubmit = async () => {
    // Lógica para enviar os dados atualizados para a API
    // ...

    // Redirecionar após o envio bem-sucedido
    const userId = localStorage.getItem('userId');
    setTimeout(() => navigate(`/dashboard/${userId}`), 3000);
  };

  useEffect(() => {
    getFetchData();
  }, [id]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className='titulo'>Atualização do Projeto</h1>
      <div className='containerData'>
        <label htmlFor="titulo">Título:</label>
        <input type='text' {...register("titulo")} value={titulo} onChange={(e) => { setTitulo(e.target.value) }} />

        <label htmlFor="descricaoProjeto">Descrição Detalhada:</label>
        <textarea {...register("descricao")} value={descricao} onChange={(e) => { setDescricao(e.target.value) }} />

        <div className="containerSobrepDate">
          <aside>
            <label htmlFor="tipoDrone">Tipo de Drone:</label>
            <select className='select' {...register("droneType")} value={tipoDrone} onChange={(e) => { setTipoDrone(e.target.value) }} required>
              <option value="">Selecione</option>
              <option value="quadricoptero">Quadricóptero</option>
              <option value="hexacoptero">Hexacóptero</option>
              <option value="octocoptero">Octocóptero</option>
              <option value="asaFixa">Asa Fixa</option>
              <option value="nanoDrone">Nano Drone</option>
            </select>
          </aside>

          <aside>
            <label htmlFor="qualidadeImagem">Qualidade da Imagem:</label>
            <select className='select' {...register("qualidadeImagem")} value={qualidadeImagem} onChange={(e) => { setQualidadeImagem(e.target.value) }} >
              <option value="">Selecione</option>
              <option value="SD">SD</option>
              <option value="HD">HD</option>
              <option value="Full HD">Full HD</option>
              <option value="Quad HD">Quad HD</option>
              <option value="4K">4K</option>
            </select>
          </aside>

          <aside>
            <label htmlFor="areaCobertura">Área de Cobertura Desejada:</label>
            <select className='select' {...register("areaCobertura")} value={areaCobertura} onChange={(e) => { setAreaCobertura(e.target.value) }}>
              <option value="">Selecione</option>
              <option value="100">100 m²</option>
              <option value="500">500 m²</option>
              <option value="1000">1 km²</option>
              <option value="2000">2 ou mais km²</option>
            </select>
          </aside>
        </div>

        <aside >
          <label htmlFor="prazoEntrega">Prazo de Entrega: {formatDate(prazoEntrega)}</label> <br />
          <input className='select' type="date" {...register("prazoEntrega")} value={prazoEntrega} onChange={(e) => { setPrazoEntrega(e.target.value) }} />
        </aside>

        <label htmlFor="budget">Orçamento (R$):</label>
        <input type="number" id="budget" {...register("budget")} value={budget === 0 ? '' : formatCurrency(budget)} onChange={(e) => { setBudget(parseFloat(e.target.value)) }} placeholder="Digite o valor em reais" />

        <aside>
          <label htmlFor="filmLocations">Localização de Filmagem (Google Maps - adicionar):</label>
          <input type="text" id="filmLocations" {...register("filmLocations")} value={localization} onChange={(e) => { setLocalization(e.target.value) }} />
        </aside>

        <aside className='sobreposicaoimg'>
          <label htmlFor="sobreposicaoImagem">Sobreposição de Imagem:</label>
          <input type='checkbox' {...register("sobreposicaoImagem")} checked={sobreposicaoImagem} onChange={(e) => { setSobreposicaoImagem(e.target.checked) }} />
        </aside>
      </div>

      {success && <SuccessForms texto={'Projeto atualizado com sucesso!'} />}
      <button type="submit">Enviar</button>
    </form>
  );
};

export default FormAtualizacaoProj;
