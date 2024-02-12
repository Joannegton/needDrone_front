import ForbiddenPage from "../../components/cards/proibido";
import FormAtualizacaoDrone from "../../components/forms/editDrone";

import Menu from "../../components/menu/page";

export default function AtualizacaoDrone(){
    const type = localStorage.getItem('typeUser')

    return(<>
    
    {type === 'piloto'? <>
                <Menu/>
                <main className="fundo">
                    <FormAtualizacaoDrone/>
                </main> </>: 
                <ForbiddenPage/>}
    </>)
}