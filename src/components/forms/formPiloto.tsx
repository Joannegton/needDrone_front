import './style.css'


import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrosForms from '../cards/erroForms';
import SuccessForms from '../cards/successForms';


export default function FormCadastroPiloto(){
    const url = 'https://slug-liberal-wallaby.ngrok-free.app/piloto/cadastro';
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmaPassword, setConfirmaPassword] = useState('')
    const [licenca, setLicenca] = useState('')

    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false);
    const [emailExists, setEmailExists] = useState(false)
    const [render, setRender] = useState(false)

    const {register, handleSubmit} = useForm()

    const navigate = useNavigate()
    
   


    const onSubmit = async () => {
        if(password !== confirmaPassword){
            setError("Senhas não coincidem!")
            return
        }
        

        // Envviando os dados para a API
        const bodyForm ={
            name: name,
            email: email,
            password: password,
            licenca: licenca,
        }
        try {
            const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyForm),
            });

            if(response.ok){
                setRender(true)
                setSuccess(true)
                setTimeout(() => {setSuccess(false); navigate("/entrar")}, 5000)
            } else if(response.status === 409){
                setEmailExists(true)
            } else{
                console.error("Erro no cadastro de Piloto: ", response.statusText)
            }
              
        } catch (error){
            console.error('Erro ao enviar dados para a API:', error);
        }

        setName('')
        setEmail('')
        setPassword('')
        setConfirmaPassword('')
        setLicenca('')
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className='titulo'>Cadastro de Piloto</h1>
            <div className="containerData">
                <label htmlFor="name">Nome</label>
                <input type="text" {...register("name")} value={name} onChange={(event) => {setName(event.target.value)}} placeholder='André magalhães' required />
                <label htmlFor="email">Email</label>
                <input type="email" {...register("email")} value={email} onChange={(event) => {setEmail(event.target.value)}} placeholder="example@gmail.com" required  />
                {emailExists &&  <SuccessForms texto={'E-mail já possui cadastro!'}/>}

                <label htmlFor="password">Senha</label>
                <input type="password" {...register("password")} value={password} onChange={(event) => {setPassword(event.target.value); setError('')}} placeholder="************" required minLength={3} maxLength={12}/>
                <label htmlFor="confirmaPassword">Senha</label>
                <input type="password" {...register("confirmaPassword")} value={confirmaPassword} onChange={(event) => {setConfirmaPassword(event.target.value);setError('')}} placeholder="************" required/>
                {error && (
                    <ErrosForms texto={error}/>
                )}

                <h1 className='titulo3'>Qualificação</h1>
                <label htmlFor="licenca">Licença de Pilotagem</label>
                <input type="text" {...register("licenca")} value={licenca} onChange={(event) => {setLicenca(event.target.value)}} placeholder="inscrição de piloto" required/>


                {success && <SuccessForms texto={'Usuário cadastrado com sucesso!'}/>}
                            
            </div>
            <button type="submit">Cadastrar</button>
        </form>
    )
}