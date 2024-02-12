
import { Chat } from "../../components/chat/chat";
import Menu from "../../components/menu/page"
import AndamentoordemComponent from "../../components/servicos/ordemAndamentoComponent";

const Andamentoordem = () =>{

    return(
        <main>
            <Menu/>
            <AndamentoordemComponent/>
            <Chat/>
        </main>
           
    )
}

export default Andamentoordem;