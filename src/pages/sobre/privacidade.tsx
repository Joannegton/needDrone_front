import Menu from "../../components/menu/page"
import DropZone from "../../components/uploadImage/app"

const Privacidade = () =>{
    return(        
        <main>
            <Menu/>           
            
            <h1>Política de Privacidade</h1>
            <p className="textos">A Need a Drone considera a privacidade dos dados dos seus usuários uma prioridade e, por isso, solicitamos que leia atentamente nossa política.</p>
            <section>
                <h2 className="titulo2">Coleta de Dados Pessoais</h2>
                <p className="textos">Os dados pessoais coletados pela plataforma Need a Drone limitam-se àqueles fornecidos de forma direta e voluntária pelos usuários.

                Essa coleta é essencial para identificar o usuário, realizar seu cadastro no sistema, efetuar e receber pagamentos, além de viabilizar a execução de outras funcionalidades da plataforma.

                Esses dados também poderão ser utilizados exclusivamente pela plataforma para cumprir obrigações legais, gerenciamento, administração, prestação e aprimoramento dos serviços.</p>
            </section>
            

            <section>
                <h2 className="titulo2">Coleta de dados pessoais</h2>
                <p className="textos">A Need a Drone assegura a segurança e a confidencialidade dos dados pessoais...</p>
            </section>

            <section>
                <h2 className="titulo2">Segurança</h2>
                <p className="textos">A Need a Drone assegura a segurança e a confidencialidade dos dados pessoais sob sua responsabilidade.

                Entretanto, a plataforma não se responsabiliza pela segurança na troca de informações realizada fora do seu ambiente.

                Os dados pessoais divulgados na descrição do perfil do usuário são públicos e acessíveis a qualquer visitante da página. A plataforma não assume responsabilidade pelo uso desses dados por terceiros.</p>
            </section>

        </main>
    )
}

export default Privacidade