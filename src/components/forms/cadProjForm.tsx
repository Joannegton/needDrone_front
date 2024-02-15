import { useState, useEffect, ChangeEvent } from 'react';
import './style.css'
import {useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form';
import SuccessForms from '../cards/successForms';

type IBGEUFResponse = {
    sigla: string;
    nome: string;
  };
  type IBGECITYResponse = {
    id: number;
    nome: string;
  };

export default function FormCadProj() {
    const { register, handleSubmit} = useForm()
    const navigate = useNavigate()

    const[titulo, setTitulo] = useState('')
    const[descricao,setDescricao] = useState('')
    const[tipoDrone, setTipoDrone] = useState('')
    const[qualidadeImagem, setQualidadeImagem] = useState('')
    const[areaCobertura, setAreaCobertura] = useState('')
    const[sobreposicaoImagem, setSobreposicaoImagem] = useState(false)
    const[prazoEntrega, setPrazoEntrega] = useState('')
    const[rua, setRua] = useState('')
    const[localization, setLocalization] = useState('')
    const [success, setSuccess] = useState(false)

    const [ufs, setUfs] = useState<IBGEUFResponse[]>([]);
    const [cities, setCities] = useState<IBGECITYResponse[]>([]);
    const [selectedUf, setSelectedUf] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    useEffect(() => {
        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados/")
          .then((response) => response.json())
          .then((data) => setUfs(data));
      }, []);
    
    useEffect(() => {
    if (selectedUf === "0") {
        return;
    }
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => setCities(data));
    }, [selectedUf]);
    
    const handleSelectUf = (event: ChangeEvent<HTMLSelectElement>) => {
        const uf = event.target.value;
        setSelectedUf(uf);
    };
    
    const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
        const city = event.target.value;
        setSelectedCity(city);
    };

    useEffect(()=>{setLocalization(`${rua}. ${selectedCity} - ${selectedUf}`)}, [selectedCity])

    const url = "https://needdrone.onrender.com/projeto"
    const onSubmit = async () => {

        const token = localStorage.getItem('token')
        const bodyForm = {
            title: titulo,
            description: descricao,
            droneType: tipoDrone,
            imgQuality: qualidadeImagem,
            cobertArea: areaCobertura,
            imgsubposition: sobreposicaoImagem,
            deadline: prazoEntrega,
            localization: localization
        }
        try {
            const response = await fetch(url,{
                method: "POST",
                headers: {"content-type": "application/json",
                'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(bodyForm)
            })

            if(response.ok){
                setSuccess(true)
                const id = localStorage.getItem('userId')
                setTimeout(()=> navigate(`/dashboard/${id}`), 3000)
            }else{
                console.log(bodyForm)
            }

        } catch (error) {
            console.error('Erro ao enviar dados para a API:', error);
        }

        setAreaCobertura('')
        setDescricao('')
        setPrazoEntrega('')
        setQualidadeImagem('')
        setSobreposicaoImagem(false)
        setTipoDrone('')
        setTitulo('')
        setRua('')
        setSelectedCity('')
        setSelectedUf('')
        setLocalization('')
        
    };

    return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className='titulo'>Detalhes do Projeto</h1>
                <div className='containerData'>
                    <label htmlFor="titulo">Título:</label>
                    <input type='text'  {...register("titulo")} value={titulo} onChange={(e) => {setTitulo(e.target.value)}}></input>

                    <label htmlFor="descricaoProjeto">Descrição Detalhada:</label>
                    <textarea  {...register("descricao")}value={descricao} onChange={(e) => {setDescricao(e.target.value)}}></textarea>
                
                    
                <div className="containerSobrepDate">     
                    <aside>
                        <label htmlFor="tipoDrone">Tipo de Drone:</label>
                            <select  className='select' {...register("droneType")} value={tipoDrone} onChange={(e) => {setTipoDrone(e.target.value)}} required>
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
                        <select  className='select' {...register("qualidadeImagem")} value={qualidadeImagem} onChange={(e) => {setQualidadeImagem(e.target.value)}} >
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
                        <select className='select' {...register("areaCobertura")} value={areaCobertura} onChange={(e) => {setAreaCobertura(e.target.value)}}>
                            <option value="">Selecione</option>
                            <option value="100">100 m²</option>
                            <option value="500">500 m²</option>
                            <option value="1000">1 km²</option>
                            <option value="2000">2 ou mais km²</option>
                        </select>
                    </aside>

                    <aside className='prazoEntrega'>
                        <label htmlFor="prazoEntrega">Prazo de Entrega:</label>
                        <input className='select' type="date" {...register("prazoEntrega")} value={prazoEntrega} onChange={(e) => {setPrazoEntrega(e.target.value)}}/>
                    </aside>
                    
                    </div>
                    <aside className='sobreposicaoimg'>
                        <label htmlFor="sobreposicaoImagem">Sobreposição de Imagem:</label>
                        <input type='checkbox'  {...register("sobreposicaoImagem")} checked={sobreposicaoImagem} onChange={(e) => {setSobreposicaoImagem(e.target.checked)}}/>
                    </aside>
                    <h1 className="titulo3">Local do evento:</h1>
                    <aside>
                        <label htmlFor="rua">Rua/n°</label>
                        <input type="text" {...register("rua")} value={rua} onChange={(e) => {setRua(e.target.value)}} placeholder='Rua dores de campos, 456'/>
                    </aside>
                    <aside>
                        <label htmlFor="estado">Estado:</label>
                        <select  {...register("estado")} onChange={(event) => { handleSelectUf(event)}}  required>
                            <option value="0">Selecione</option>
                            {ufs.map((uf) => (
                                <option key={uf.sigla} value={uf.sigla}>{uf.nome}</option>
                            ))}
                        </select>
                    </aside>

                    <aside>
                        <label htmlFor="cidade">Cidade:</label>
                        <select  {...register("cidade")}  onChange={(event) => { handleSelectCity(event)} } required >
                            <option value="0">Selecione</option>
                            {cities.map((city) => (
                            <option key={city.id} value={city.nome}>{city.nome}</option>
                            ))}
                        </select>
                        <p className={selectedCity !== ''? 'titulo3': 'hidden'}>{localization}</p>
                    </aside>
                </div>
                {success && <SuccessForms texto={'Projeto cadastrado com sucesso!'}/>}
                <button type="submit">Enviar</button>
            </form>
    );
};