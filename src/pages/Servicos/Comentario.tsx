import {  useEffect, useState } from "react"
import { FormComentario } from "../../components/forms/formComentario"
import Menu from "../../components/menu/page"
import Ordem from "../../components/servicos/Ordem";
import { useParams } from "react-router-dom";
import Drone from "../../components/cards/drone";

const Comentario = () =>{
    const [userName, setUserName] = useState('');
    const [pilotoId, setPilotoId] = useState('');
    const [droneId, setDroneId] = useState('');
    const [title, setTitle] = useState('');
    const {proposta_id} = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/proposta/${proposta_id}`);
                if (!response.ok) {
                    throw new Error(`Erro ao obter dados da proposta: ${response.statusText}`);
                }
                const data = await response.json(); 
                setTitle(data.tituloProjeto);
                setUserName(data.userNamePiloto)
                setPilotoId(data.enviadorProposta)
                setDroneId(data.droneId)
            } catch (error) {
                console.error(error);
            }
        };
        const fetchDataDrone = async () => {
            try {
                const response = await fetch(`http://localhost:5000/drone/${droneId}`);
                if (!response.ok) {
                    throw new Error(`Erro ao obter dados da proposta: ${response.statusText}`);
                }
                const data = await response.json();
                console.log(data) 

            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
        fetchDataDrone()
    }, [proposta_id]);
    return(<>
        <Menu/>
        <main>
            <div className="container">
                <h2 className="titulo2">{title}</h2><br />
                <p><strong>Nome do Piloto: </strong>{userName}</p>
                <p><strong>Drone: </strong></p>
                <Drone id={droneId}/>
            </div>
            <FormComentario pilotoId={pilotoId} />
        </main>
    </>)
}

export default Comentario