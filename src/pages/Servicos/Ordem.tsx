import React, { useState, useEffect } from 'react';
import PropostaCard from "../../components/cards/proposta";
import Menu from "../../components/menu/page";
import OrdemComponent from "../../components/servicos/Ordem";
import { useParams } from 'react-router-dom';

// Defina a interface aqui ou importe-a se estiver definida em outro lugar
interface PropostaCardProps {
    projectId: string
    IdCriadorProjeto:string
    enviadorProposta: string;
    ofertaInicial: number;
    ofertaFinal: number;
    detalhesProposta: string;
    droneId: string;
    status: string
    _id: string
}

const Ordem = () => {
    const [propostas, setPropostas] = useState<PropostaCardProps[]>([]);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const { projectId } = useParams();
    const idUser = localStorage.getItem('userId');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/proposta/projeto/${projectId}`);
                if (!response.ok) {
                    throw new Error(`Erro ao obter propostas do projeto: ${response.statusText}`);
                }
                const data = await response.json() as PropostaCardProps[];
                setPropostas(data);

                const isAnyAuthorized = data.some(proposta => proposta.IdCriadorProjeto === idUser || proposta.enviadorProposta === idUser);
                setIsAuthorized(isAnyAuthorized);

            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [projectId]);

    const userType = localStorage.getItem('typeUser')

    return (
        <>
            <Menu />
            <main className="fundo">
                <OrdemComponent />
                {isAuthorized && 
                <div className="container">
                    <h1 className="titulo2">Propostas Recebidas</h1>
                    {userType === 'cliente'?
                        propostas.map((proposta) => (
                            <PropostaCard key={proposta._id} proposta={proposta} />
                        )) : 
                        propostas.filter(proposta => proposta.enviadorProposta === idUser)
                        .map((proposta)=>(
                            <PropostaCard key={proposta._id} proposta={proposta}/>
                        ))
                    }
                </div>}
            </main>
        </>
    );
};

export default Ordem;
