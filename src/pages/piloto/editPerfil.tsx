import Menu from '../../components/menu/page'
import FormAtualizacaoPiloto from '../../components/forms/editPiloto'
import { useParams } from 'react-router-dom'
import ForbiddenPage from '../../components/cards/proibido'

export default function EditarPerfilPiloto(){
    const userId = localStorage.getItem('userId')
    const {id} = useParams()
    const isAuthorized = userId === id

    return(
        <>
            {isAuthorized ? (<>
                <Menu />
                <main>
                    <FormAtualizacaoPiloto />a
                </main>
                </> ) : (
                <ForbiddenPage />
            )}
        </>

    )
}