import React, { useState, useEffect } from 'react';
import CardAvaliacao from './avaliacao'; // Certifique-se de ajustar o caminho correto
import './styles.css'; // Certifique-se de ajustar o caminho correto

const CardAvaliacaoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
  const [conteudo, setConteudo] = useState([])
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % conteudo.length);
    }, 7000); // 7 segundos

    return () => clearTimeout(timer);
  }, [conteudo.length, currentIndex]);
  
  useEffect(() => {
    const checkScreenWidth = () => {
      // Obtém a largura atual da tela
      const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

      // Atualiza o estado 'width'
      setWidth(screenWidth);
    };

    // Adiciona um ouvinte de evento para verificar o tamanho da tela quando a janela for redimensionada
    window.addEventListener('resize', checkScreenWidth);

    // Chama a função checkScreenWidth quando o componente é montado
    checkScreenWidth();

    // Remove o ouvinte de evento quando o componente é desmontado
    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, []);

  const fetchData = async ()=>{
      const response = await fetch("https://slug-liberal-wallaby.ngrok-free.app/comentario")
      const data = await response.json()  
      setConteudo(data)
  }
  useEffect(  ()=> {fetchData()}, [])

  return (
    <div className="container_avaliacoes_slider largura70">

     {conteudo.map((content, index) => (
        <CardAvaliacao
          key={index}
          nome={content.nome}
          foto={content.foto}
          avaliacao={content.estrelas}
          comentario={content.comentario}
          isVisible={index === currentIndex}
        />
      ))}

      {width > 768 && conteudo.map((content, index) => (
        <CardAvaliacao
        key={index}
        nome={content.nome}
        foto={content.foto}
        avaliacao={content.estrelas}
        comentario={content.comentario}
        isVisible={index === currentIndex}
        />
      
      ))}
    </div>
  );
}

export default CardAvaliacaoSlider;
