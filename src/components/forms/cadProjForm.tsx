import { useState } from 'react';
import './style.css'
import {useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form';
import SuccessForms from '../cards/successForms';



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
    const [success, setSuccess] = useState(false)



    const url = "https://slug-liberal-wallaby.ngrok-free.app/projeto"
    const onSubmit = async () => {

        const token = localStorage.getItem('token')
        const bodyForm = {
            title: titulo,
            description: descricao,
            droneType: tipoDrone,
            imgQuality: qualidadeImagem,
            cobertArea: areaCobertura,
            imgsubposition: sobreposicaoImagem,
            deadline: prazoEntrega
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
                </div>
                {success && <SuccessForms texto={'Projeto cadastrado com sucesso!'}/>}
                <button type="submit">Enviar</button>
            </form>
    );
};