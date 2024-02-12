import ForbiddenPage from "../../components/cards/proibido";
import FormCadastroDrone from "../../components/forms/form_cad_Drone";
import Menu from "../../components/menu/page";

export default function CadastroDrone(){
    const type = localStorage.getItem('typeUser')
    return(<>
    
           {type === 'piloto'? <>
                <Menu/>
                <main className="fundo">
                    <FormCadastroDrone/>
                </main> </>: 
                <ForbiddenPage/>}
    </>)
}