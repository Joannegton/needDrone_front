import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import ErrosForms from '../cards/erroForms';
import SuccessForms from '../cards/successForms';

const FormAtualizacaoDrone: React.FC = () => {

    const {register, handleSubmit} = useForm()
    const navigate = useNavigate()

    const [name, setName] = useState('');
    const [droneType, setDroneType] = useState('');
    const [imgQuality, setImgQuality] = useState('');
    const [cobertArea, setCobertArea] = useState('');
    const [imgsubposition, setImgsubposition] = useState(false);
    const [autonomia, setAutonomia] = useState('');
    const [status, setStatus] = useState('ativo');
  
    const [content, setContent] = useState('');
    const [error, setError] = useState(false)
    const [render, setRender] = useState(false)
    const [success, setSuccess] = useState(false);

    const {id} = useParams()

    const getFetchData =async () => {
        try {
            const response = await fetch(`https://slug-liberal-wallaby.ngrok-free.app:5000/drone/${id}`)
            if (!response.ok) throw new Error('Network response was not ok')
            const data = await response.json()
            setContent(data)
            setAutonomia(data.autonomia)
            setCobertArea(data.cobertArea)
            setDroneType(data.droneType)
            setImgQuality(data.imgQuality)
            setImgsubposition(data.imgsubposition)
            setName(data.name)
            setStatus(data.status)
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
    
    useEffect(()=>{getFetchData()},[render])
    
    
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
            const response = await fetch(`https://slug-liberal-wallaby.ngrok-free.app:5000/drone/atualizar/${id}`,{
                method: "PUT",
                headers: {'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`},
                body: JSON.stringify(bodyForm)
                })
                 
            if(response.ok){
                setRender(true)
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false);
                    }, 5000);
                    const userId = localStorage.getItem('userId')
                    navigate(`/dashboard/${userId}`)
            }else if (response.status === 409) {
                setTimeout(() => {
                    navigate('/entrar');
                    }, 2000);
        
            } else {
                setError(true)
                console.error('Erro no cadastro de cliente:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao enviar dados para a API:', error);
        }

        
    }
    

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className='titulo'>Atualizar Drone</h1>
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
            {success && <SuccessForms texto={'Dados atualizado com sucesso!'}/>}
            {error && <ErrosForms texto={'Erro ao atualizar Dados!'}/>}
            <button className='button_login' type="submit">Atualizar</button>
        </form>
    );
}

export default FormAtualizacaoDrone
