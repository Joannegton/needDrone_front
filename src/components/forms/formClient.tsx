import './style.css';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrosForms from '../cards/erroForms';
import SuccessForms from '../cards/successForms';


export default function FormCadastroClient() {
    const url = 'https://needdrone.onrender.com/cliente/cadastro';
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmaPassword, setConfirmaPassword] = useState('')


    const [success, setSuccess] = useState(false);
    const [emailExists, setEmailExists] = useState(false)
    const [render, setRender] = useState(false)
    const [error, setError] = useState('')
    
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    
  // busca de dados (fetching) de uma API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        //const data = await response.json();
        // Faça algo com os dados recebidos
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, [render]);


  const onSubmit = async () => {
    //validações
    if(password !== confirmaPassword){
        setError("Senhas não coincidem!") //colocar setError('') no input de password dentro de onChange
        return
    }


    //cria o request gravando os dados na API
    const bodyForm = {
      name: name,
      email: email,
      password: password,
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(bodyForm),
      });
      if (response.ok) {
        setRender(true);
        setSuccess(true);
        setName('');
        setEmail('');
        setPassword('');
        setConfirmaPassword('');
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
        navigate(`/entrar`);
        
      } else if (response.status === 409) {
        // Validação: Usuário já existe
        setEmailExists(true);
        setTimeout(() => {
            navigate('/entrar');
          }, 2000);

      } else {
        console.error('Erro no cadastro de cliente:', response.statusText);
      }
    } catch (error) {
        console.error('Erro ao enviar dados para a API:', error);
    }
    
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className='titulo'>Cadastro de Cliente</h1>
        <div className="containerData">
            <label htmlFor="name">Nome*</label>
            <input 
            type="text" 
            {...register("name")}  
            value={name} 
            onChange={(event) => {setName(event.target.value)}} 
            placeholder='André magalhães' 
            required />
            {/*value serve para lincar com o useState,
            onChange- manipula os campos => event=html target=input value=valor colocado no input  */}
            <label htmlFor="email">Email*</label>
            <input type="email" {...register("email")} placeholder="example@gmail.com" value={email} onChange={(event) => {setEmail(event.target.value)}} required />
            {emailExists &&  <SuccessForms texto={'E-mail já possui cadastro!'}/>}

            <label htmlFor="password">Senha*</label>
            <input type="password" {...register("password")} placeholder="************" value={password} onChange={(event) => {setPassword(event.target.value); setError('')}} required minLength={3} maxLength={12}/>

            <label htmlFor="confimaPassword">Confirme a Senha*</label>
            <input type="password" {...register("confirmaPassword")} value={confirmaPassword} onChange={(event) => {setConfirmaPassword(event.target.value); setError('')}} placeholder="************" required />
            {error && (
                <ErrosForms texto={error}/>
            )}         
          
            {success && <SuccessForms texto={'Usuário cadastrado com sucesso!'}/>}
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      
    </>
  );
}
