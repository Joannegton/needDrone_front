import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import ErrosForms from '../cards/erroForms';

export default function FormCadastroDrone() {

    const {register, handleSubmit} = useForm()
    const navigate = useNavigate()

    const [name, setName] = useState('');
    const [droneType, setDroneType] = useState('');
    const [imgQuality, setImgQuality] = useState('');
    const [cobertArea, setCobertArea] = useState('');
    const [imgsubposition, setImgsubposition] = useState(false);
    const [autonomia, setAutonomia] = useState('');
    const [status, setStatus] = useState('ativo');
    const [id, setId] = useState('');
    
    const [error, setError] = useState(false)
    
    const url = 'http://18.188.189.201:5000/drone/cadastro'

    const onSubmit = async () => {
        const token = localStorage.getItem('token')
        const bodyForm = {
            name: name,
            droneType: droneType,
            imgQuality: imgQuality,
            cobertArea: cobertArea,
            imgsubposition: imgsubposition,
            autonomia: autonomia,
            status: status,
        };
        try {
            const response = await fetch(url,{
                method: "POST",
                headers: {'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`},
                body: JSON.stringify(bodyForm)
                })
                 
                if(response.ok){
                    const userId = localStorage.getItem('')
                    navigate(`/dashboard/${userId}`)
                }else{
                    alert("Erro no servidor, tente novamente mais tarde!")
                }

        } catch (error) {
            console.log("Erro ao enviar dados", error)
            setError(true)
        }

        setAutonomia('')
        setCobertArea('')
        setDroneType('')
        setImgQuality('')
        setImgsubposition(false)
        setName('')
        setStatus('Ativo')
    }
    

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className='titulo'>Cadastro do Drone</h1>
            <div className="containerData">
                <label htmlFor="name">Nome/Modelo:</label>
                <input type="text" {...register("name")} value={name} onChange={(e) => {setName(e.target.value)}} required  placeholder="Moniss YLR/C"/>

                <div className="selects">
                    <div className="containerSelect">
                        <label htmlFor="droneType">Tipo:</label>
                        <select  className='select' {...register("droneType")} value={droneType} onChange={(e) => {setDroneType(e.target.value)}} required>
                                    <option value="">Selecione</option>
                                    <option value="quadricoptero">Quadricóptero</option>
                                    <option value="hexacoptero">Hexacóptero</option>
                                    <option value="octocoptero">Octocóptero</option>
                                    <option value="asaFixa">Asa Fixa</option>
                                    <option value="nanoDrone">Nano Drone</option>
                        </select>
                    </div>
                    <div className="containerSelect">
                        <label htmlFor="imgQuality">Qualidade de Imagem:</label>
                        <select  className='select' {...register("imgQuality")} value={imgQuality} onChange={(e) => {setImgQuality(e.target.value)}} required>
                                    <option value="">Selecione</option>
                                    <option value="SD">SD</option>
                                    <option value="HD">HD</option>
                                    <option value="Full HD">Full HD</option>
                                    <option value="Quad HD">Quad HD</option>
                                    <option value="4K">4K</option>
                                </select>
                    </div>
                    <div className="containerSelect">
                        <label htmlFor="autonomia">Autonomia:</label>
                        <select className='select' {...register("autonomia")} value={autonomia} onChange={(e) => {setAutonomia(e.target.value)}} required>
                                <option value="">Selecione</option>
                                <option value="60">até 60 mins</option>
                                <option value="90">entre 61 e 90 mins</option>
                                <option value="120">entre 91 e 120 mins</option>
                                <option value="121+">121+ minutos</option>
                        </select>
                    </div>
                    <div className="containerSelect">
                        <label htmlFor="cobertArea">Área de cobertura:</label>
                        <select className='select' {...register("cobertArea")} value={cobertArea} onChange={(e) => {setCobertArea(e.target.value)}} required>
                            <option value="">Selecione</option>
                            <option value="100">até 100 m²</option>
                            <option value="200">até 200 m²</option>
                            <option value="400">até 400 km²</option>
                            <option value="500+">500+ km²</option>
                        </select>
                    </div>
                    <div className="containerSelect">
                        <label htmlFor="status">Status:</label>
                        <select className='select' value={status} {...register("status")} onChange={(e) => setStatus(e.target.value)} required>
                            <option value="">Selecione</option>
                            <option value="Ativo">Ativo</option>
                            <option value="Manutencao">Manutenção</option>
                            <option value="Inativo">Inativo</option>
                        </select>
                    </div>
                </div>
                    <aside className='sobreposicaoimg'>
                        <label htmlFor="imgsubposition">Sobreposição de Imagem:</label>
                        <input type='checkbox'  {...register("imgsubposition")} checked={imgsubposition} onChange={(e) => {setImgsubposition(e.target.checked)}}/>
                    </aside>
            </div>
            {error && <ErrosForms texto={'Preencha todos os campos'}/>}
            <button className='button_login' type="submit">Cadastrar</button>
        </form>
    );
}

