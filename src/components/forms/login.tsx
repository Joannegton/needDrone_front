
import { useState } from 'react';
import './style.css'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import GoogleAuth from '../authGoogle/authGoogle';
import { Link } from 'react-router-dom';
import ErrosForms from '../cards/erroForms';


export default function FormLogin(){
    const { register, handleSubmit} = useForm()
    const navigate = useNavigate()

    const[type, setType] = useState('')
    const[email, setEmail] = useState('')
    const [password, setPassaword] = useState('')

    const [error, setError] = useState(false)

    const url = 'http://18.188.189.201:5000/entrar'

    const onSubmit = async () => {
        
        const bodyForm = {
            type: type,
            email: email,
            password: password,
        }
        try{
            const response = await fetch(url,{
            method: "POST",
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(bodyForm)
            })

            if(response.ok){
                const responseData = await response.json()

                if (responseData.token) {
                    const token = responseData.token;
                    localStorage.setItem('token', token);
                    
                    // Decodifica o token para extrair o ID do usuário
                    const base64Url = token.split('.')[1];
                    const base64 = base64Url.replace('-', '+').replace('_', '/');
                    const payload = JSON.parse(window.atob(base64));
                    const userId = payload.id; // Ensure this matches the actual payload structure!
                    localStorage.setItem('userId', userId);
                    localStorage.setItem('typeUser', type);
                    navigate(`/dashboard/${userId}`);
                    window.location.reload();

                    
                } else {
                    console.error('Token não recebido na resposta:', responseData);
                }

            } else{
                setError(true)
                console.log('aaaaaaa')
            }
        } catch (error){
            console.error('Erro ao enviar dados para a API:', error);
        }

    };
    
    return(
        <div className="container_form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Autenticação</h1>
                <div className='userType'>
                    <label>
                        <input 
                            type="radio" 
                            value="cliente" 
                            checked={type === 'cliente'} 
                            onChange={(e) => setType(e.target.value)} 
                        />
                        Cliente
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            value="piloto" 
                            checked={type === 'piloto'} 
                            onChange={(e) => setType(e.target.value)} 
                        />
                        Piloto
                    </label>
                </div>

                <div className="containerData">
                    <input type="email" {...register('email')} value={email} onChange={(e) =>{setEmail(e.target.value)}} placeholder="example@gmail.com"  />
                    
                    <input type="password" {...register('password')} value={password} onChange={(e) => setPassaword(e.target.value)} placeholder="************" />
                    {error && <ErrosForms texto={'Email ou senha incorretos!'}/>}
                    <button type="submit">Entrar</button>
                    <GoogleAuth/>
                </div>
            
            </form>
                <div className="container_esqueci">
                    <Link className='link' style={{fontSize: '1.1em'}} to={"/esquecisenha"}>Esqueci a Senha</Link>
                    <Link className='link' style={{fontSize: '1.1em'}} to={'/registro'}>Criar Conta </Link>
                </div>
        </div>
    )
}
