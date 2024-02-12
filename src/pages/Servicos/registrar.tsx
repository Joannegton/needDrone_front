import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Menu from "../../components/menu/page";
import './style.css'

const Registrar: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string>('');
    const navigate = useNavigate();

    const handleSelectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSelectedOption(value);
    };

    const handleContinueClick = () => {
        if (selectedOption === 'contratar') {
            navigate('/cliente/cadastro');
        } else if (selectedOption === 'trabalhar') {
            navigate('/piloto/cadastro');
        }
    };
    
    return(
        <main>
            <Menu/>
            <section className="containerCadastro">
                <h1 className="titulo">Criar uma conta</h1>
                <p>Seja bem-vindo à Need a Drone!</p> <p>Diga-nos o que você está procurando.</p>

                <div className="radio">
                    <input 
                        type="radio" 
                        name="contratar" 
                        value="contratar" 
                        checked={selectedOption === 'contratar'}  
                        onChange={handleSelectionChange}
                    />
                    <div>
                        <label htmlFor="contratar">Eu quero Contratar</label>
                        <p >Publique seu projeto e encontre pilotos incríveis.</p>
                    </div>
                </div>
                <div className="radio" >
                    <input 
                        type="radio" 
                        name="trabalhar" 
                        value="trabalhar" 
                        checked={selectedOption === 'trabalhar'} 
                        onChange={handleSelectionChange}
                    />
                    <div>
                        <label htmlFor="trabalhar">Eu quero Trabalhar</label>
                        <p >Encontre projetos, seja contratado e ganhe dinheiro.</p>
                    </div>
                </div>
                <button className="button_login" onClick={handleContinueClick}>Continuar</button>
                
            </section>
        </main>
    );
}

export default Registrar;
