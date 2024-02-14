import React, { useState, useEffect } from 'react';
import PropostaCard from "../../components/cards/proposta";
import Menu from "../../components/menu/page";
import OrdemComponent from "../../components/servicos/Ordem";
import { useParams } from 'react-router-dom';

const Ordem = () => {
    const [propostas, setPropostas] = useState([]);
    const [userId, setUserId] = useState('');
    const { projectId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://needdrone.onrender.com/proposta/projeto/${projectId}`);
                if (!response.ok) {
                    throw new Error(`Erro ao obter propostas do projeto: ${response.statusText}`);
                }
                const data = await response.json();
                setPropostas(data);
                setUserId(data.criadorProjeto)
                console.log('ta indo')
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [projectId]);

    const idUser = localStorage.getItem('userId')
    const isAuthorized = true //userId === idUser

    return (
        <>
            <Menu />
            <main className="fundo">
                <OrdemComponent />
                {isAuthorized ? <div className="proposta-container">
                    {propostas.map((proposta, index) => (
                        <PropostaCard key={index} proposta={proposta} />
                    ))}
                </div> : null}
            </main>
        </>
    );
};

export default Ordem;
