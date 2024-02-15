import ForbiddenPage from "../../components/cards/proibido"
import FormProposta from "../../components/forms/Proposta"
import Menu from "../../components/menu/page"

const Proposta = ()=>{
    const userType = localStorage.getItem('typeUser')
    return(<>
    <Menu/>
    {userType === 'piloto' ? 
        <main className="fundo">
            <FormProposta/>
        </main> : <ForbiddenPage/>}
    </>)
}

export default Proposta