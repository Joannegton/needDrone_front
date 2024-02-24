'use client'
import { useEffect, useState } from 'react';
import { Bars3Icon } from '@heroicons/react/16/solid' 
import {useNavigate} from 'react-router-dom'

import './style.css';
import logo from '../../assets/logo.jpg';
import { Link } from 'react-router-dom';

export default function Menu() {
  const navigate = useNavigate()
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [logged, setLogged] = useState(false)

  const userId = localStorage.getItem('userId');
    
  function toggleMenu() {
    setMenuOpen(!isMenuOpen);
  }
  
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const isUserLogged = !!token; //!! transforma em booleano true
    setLogged(isUserLogged);
  }, []);

  const singout = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('email')
    setLogged(false)
    navigate('/')
    window.location.reload();
  }

  return (
    <>

        <header>
          
          <Link to="/"><img className={`logo ${isMenuOpen ? 'hidden' : ''}`} src={logo} alt="logo" /></Link>
          <h2 className={`titulo hidden ${isMenuOpen ? 'namepage': ''} `}>Need Drone</h2>
          
          <Bars3Icon className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu} />

          <div className={`menu ${isMenuOpen ? 'show' : ''}`}>
            {isMenuOpen && (
              <>
              
                <div className="container_menu">
                  <Link to="/"><img className='logoMobile' src={logo} alt="logo" /></Link>
                  
                  {!logged ? (
                    <>
                      <div>
                        <button className='button_login' onClick={()=>navigate('/entrar')}>Login</button>
                        <button className='button_login' onClick={()=>navigate('/registro')}>Criar conta</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h1 className='titulo1'>Need a Drone</h1>
                      <button className='button_login' onClick={singout}>Sair</button>
                    </>
                  )}
                  
                  <Bars3Icon className='menu-icon' onClick={toggleMenu} />
                </div>
              </>
            )}
            <ul>
              <li>
                <Link className='link' to={'/'}>Home</Link>
              </li>
              <li>
                <Link className='link' to={'/ordemservico'}>Projetos</Link>
              </li>
              <li>
                <Link className='link' to={'/projeto/cadastro'}>Criar projeto</Link>
              </li>
              <li>
                <Link className='link' to={'/drone/cadastro'}>Cadastrar drone</Link>
              </li>
              <li>
                <Link className='link' to={`/dashboard/${userId}`}>Dashboard</Link>
              </li>
            </ul>
           
          </div>
        </header>
      
    
    </>
  );
}
