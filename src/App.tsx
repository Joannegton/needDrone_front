import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom' 

import Home from './pages/Home';
import CadastroCliente from './pages/clientes/cadastro';
import Dashboard from './pages/dashboard';
import PerfilCliente from './pages/clientes/perfil';

import EsqueciSenha from './pages/login/EsqueciSenha';
import CadastroPiloto from './pages/piloto/cadastro';
import PerfilPiloto from './pages/piloto/perfil';

import CadastroProjeto from './pages/clientes/cadastroProjeto';
import CadastroDrone from './pages/piloto/cadastroDrone';

import Footer from './components/footer/page';
import Privacidade from './pages/sobre/privacidade';


import Comentario from './pages/Servicos/Comentario';
import OrdemsServico from './pages/Servicos/OrdemsServico';
import Ordem from './pages/Servicos/Ordem';
import Registrar from './pages/Servicos/registrar';
import AtualizacaoClient from './pages/clientes/editPerfil';
import AtualizacaoDrone from './pages/piloto/editDrone';
import Login from './pages/login/Login';
import EditarPerfilPiloto from './pages/piloto/editPerfil';
import EditProjeto from './pages/clientes/editProjeto';
import Proposta from './pages/Servicos/proposta';
import Andamentoordem from './pages/Servicos/OrdemAndamento';
import Maps from './components/maps/page';

function App() {
  const token = localStorage.getItem('token')
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/ordemservico" /> : <Home />} />
        <Route path='/registro' element={<Registrar/>} />
        <Route path='/entrar' element={<Login/>} />
        <Route path='/esquecisenha' element={<EsqueciSenha/>} />
        <Route path="/dashboard/:id" element={<Dashboard/>}/> 

        <Route path="/cliente/cadastro" element={<CadastroCliente/>}/>
        <Route path='/cliente/perfil/:id' element={<PerfilCliente/>} />
        <Route path='/cliente/editar/:id' element={<AtualizacaoClient/>} />

        <Route path='/piloto/cadastro' element={<CadastroPiloto/>} />
        <Route path='/piloto/perfil/:id' element={<PerfilPiloto/>} />
        <Route path='/piloto/editar/:id' element={<EditarPerfilPiloto/>} />

        <Route path='/drone/cadastro' element={<CadastroDrone/>} />
        <Route path='/drone/editar/:id' element={<AtualizacaoDrone/>} /> 

        <Route path='/projeto/cadastro' element={<CadastroProjeto/>} />
        <Route path='/projeto/editar/:id' element={<EditProjeto/>} />

        <Route path='/ordemservico' element={<OrdemsServico />} />
        <Route path='/ordemservico/:projectId' element={<Ordem />} />
        <Route path='/andamentoordem/:propostaId' element={<Andamentoordem />} />

        <Route path='/proposta/:projectId' element={<Proposta />} />


        <Route path='/privacidade' element={<Privacidade/>}/>

        <Route path='/comentario' element={<Comentario/>}/>
        
      </Routes>
      
      <Footer/>

    </Router>
  );
}

export default App;
