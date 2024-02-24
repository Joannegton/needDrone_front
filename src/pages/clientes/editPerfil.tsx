import { useParams } from "react-router-dom"
import FormAtualizacaoClient from "../../components/forms/editCliente"
import Menu from "../../components/menu/page"
import ForbiddenPage from "../../components/cards/proibido"

export default function AtualizacaoClient() {
    const userId = localStorage.getItem('userId')
    const {id} = useParams()
    const isAuthorized = userId === id
    return (
      <>
            {isAuthorized ? (<>
                <Menu />
                <main>
                    <FormAtualizacaoClient />a
                </main>
                </>) : (
                <ForbiddenPage />
            )}
        </>
    )}

    