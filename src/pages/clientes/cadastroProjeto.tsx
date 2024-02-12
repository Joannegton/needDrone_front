import ForbiddenPage from '../../components/cards/proibido';
import FormCadProj from '../../components/forms/cadProjForm';
import Menu from '../../components/menu/page'
import {useNavigate} from 'react-router-dom'



export default function CadastroProjeto() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const typeUser = localStorage.getItem('typeUser')
    
    const authorized = typeUser === 'cliente'

    return (<>
    {!token && navigate('/entrar')}
        {authorized ? <>
            <Menu/>
            <main className='fundo'>
                <FormCadProj/>
            </main> </>
            : 
            <ForbiddenPage/>}
    </>);
};