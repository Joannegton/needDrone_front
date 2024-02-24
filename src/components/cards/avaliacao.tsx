import React from 'react';
import Star from './estrela';
import './styles.css'; // Ajuste o caminho conforme necessário

interface CardAvaliacaoProps {
  nome: string;
  foto: string;
  avaliacao: number; // Número de estrelas ativas
  comentario: string;
  isVisible: boolean;
}

// Supondo que seu componente Star aceite uma prop isActive para controle de estado ativo/desativo
const CardAvaliacao: React.FC<CardAvaliacaoProps> = ({ nome, foto, avaliacao, comentario, isVisible }) => {
  // Não precisa de useState aqui, pois a avaliação não muda neste componente
  const totalEstrelas = 5; // Total de estrelas a serem exibidas

  return (
    <div className={`review-card ${isVisible ? 'visible' : 'hidden'}`}>
      <img src={foto} alt={nome} className="review-avatar" />
      <h3>{nome}</h3>
      <div className="estrelas-container">
        {[...Array(totalEstrelas)].map((_, index) => (
          <Star
            key={`star_${index}`}
            isActive={index < avaliacao} // Estrela ativa se o índice for menor que a avaliação
            onClick={()=>{}}/>
        ))}
      </div>
      <p>{comentario}</p>
    </div>
  );
};

export default CardAvaliacao;
