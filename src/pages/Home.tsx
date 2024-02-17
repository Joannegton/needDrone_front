import { ClipboardDocumentListIcon, ShieldCheckIcon, UserIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import banner from '../assets/Banner.gif'
import CardAvaliacaoSlider from "../components/cards/sliderAvaliacao";
import logo from '../assets/logo.jpg';
import AnimatedText from "../components/animadotexto";
import Carousel from "../components/carrosel/carrosel";



export default function Home() {

  const navigate = useNavigate()
  
  const logado = localStorage.getItem('token')

  const VerifyLogin = ()=>{
    if(!logado){
      navigate('entrar')
    } else{
      navigate('/cadatro/projeto')
    }
  }
  
  
  return (<>
    <header>
      <Link to="/"><img className='logo'  src={logo} alt="logo" /></Link>
      <div className="linkshome">
          <Link className='button_login' to='/entrar'>Login</Link>
          <Link className='button_login'  to={'/registro'}>Criar conta</Link>
          <button className="button_login" style={{backgroundColor: '#6BB78E', border: 'none'}}  onClick={()=>{navigate('/projeto/cadastro')}}>Publicar Projeto</button>
      </div>
    </header>
    <main>
      <section>      
        <aside className="sombra-banner">
        <div className="buttons">
            <button className="button_login" onClick={VerifyLogin} style={{backgroundColor: 'transparent', border: '1px solid #6BB78E', color: '#6BB78E'}}>Solicitar drone</button>

            <button className="button_login" onClick={() => { navigate('/ordemservico'); } } style={{backgroundColor: 'transparent', border: '1px solid #6BB78E', color: '#6BB78E'}}>Projetos</button>
          </div>
        </aside>
        <aside className="banner">
          <h2 >Você pilota? Junte-se a nós! <Link style={{color: '#f70592'}} to={"/cliente/cadastro"}><strong>Cadastre-se</strong></Link></h2>
        </aside>
    
        <div className="home-container">
          <h2 className="titulo">Algumas aplicações com drone:</h2>
          <ul>
              <li>Eventos com drone para fins corporativos;</li>
              <li>Filmagem de Festas com drones;</li>
              <li>Utilização de drones para filmar Casamentos e Bodas;</li>
              <li>Filmagem aérea de Shows e espetáculos;</li>
              <li>Imagens aéreas de Campeonatos esportivos;</li>
              <li>Eventos esportivos em geral e campeonatos;</li>
              <li>Lançamento de produtos com Drone;</li>
              <li>E muito mais…</li>
          </ul>
        </div>
      </section>   

      <div className="container_funcionamento">
        <h2 className="titulo largura70">Como funciona?</h2>
        <p className="textos">Anuncie o seu trabalho facilmente, contrate pilotos e/drones e pague com segurança.</p>
        <div className="container_card">
          <div className="cards">
            <ClipboardDocumentListIcon className='icons' />
            <h3 className="titulo3">Publique uma vaga</h3>
            <p className="textos">Publique a sua vaga para milhares de profissionais, você irá receber propostas de pilotos talentosos.</p>
          </div>
          <div className="cards">
          <UserIcon className='icons' />
            <h3 className="titulo3">Contrate</h3>
            <p className="textos">Reveja o histórico de trabalho, feedback de clientes e portfólio para limitar os candidatos. Então faça uma entrevista pelo chat e escolha o melhor.</p>
          </div>
          <div className="cards">
          <ShieldCheckIcon className='icons' />
            <h3 className="titulo3">Pague com segurança</h3>
            <p className="textos">Com o pagamento seguro do Have Drone, o pagamento será repassado para o freelancer somente quando o projeto estiver concluído.</p>
          </div>
        </div>
      </div>
      
      <div className="home-container">
          <h2 className="titulo">O que nossos clientes estão dizendo</h2>
          <CardAvaliacaoSlider/>
      </div>
      
      <div className="home-container">
        <h1 className="titulo2">Está pronto para encontrar o piloto ideal para seu evento?</h1>
        <button className="button_login" style={{backgroundColor: '#4FA4D1', border: 'none', margin:'auto'}}  onClick={()=>{navigate('/projeto/cadastro')}}>Publicar Projeto</button>
      </div>

    </main>
  </>
  )
}
