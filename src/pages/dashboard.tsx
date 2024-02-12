import Menu from "../components/menu/page";
import ResumoPerfil from "../components/home/perfil/page";
import Cards from "../components/home/cards/page";
import { useNavigate } from 'react-router-dom';
import Projetos from "../components/home/projetos/page";
import Drones from "../components/home/meus_drones/page";

export default function Dashboard() {
  const navigate = useNavigate();
  const type = localStorage.getItem('typeUser'); 

  return (
    <main>
      {type === 'cliente' ? (
        <>
          <Menu />
          <main className="fundo">
            <div className="containerCardPerfil">
              <Cards />
              <ResumoPerfil  />
            </div>
            <Projetos />
          </main>
        </>
      ) : type === 'piloto' ? (
        <>
          <Menu />
          <main className="fundo">
            <div className="containerCardPerfil">
              <Cards />
              <ResumoPerfil  />
            </div>
            <Drones />
          </main>
        </>
      ) : (() => {
        navigate('/entrar');
        return null;
      })()}
    </main>
  );
}
