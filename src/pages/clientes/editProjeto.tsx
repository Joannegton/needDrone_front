import ForbiddenPage from '../../components/cards/proibido';
import FormAtualizacaoProj from '../../components/forms/editProjetoForm';

import Menu from '../../components/menu/page'
import {useNavigate } from 'react-router-dom'



export default function EditProjeto() {
    
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const type = localStorage.getItem('typeUser')
    if (!token) {
        navigate('/entrar');
        return null; // Impede que o componente renderize algo antes do redirecionamento
    }

    return (<>
    {type === 'cliente'? <>
        <Menu />
        <main>
            <FormAtualizacaoProj/> 
        </main></> 
        : <ForbiddenPage/>}
    </>);
};