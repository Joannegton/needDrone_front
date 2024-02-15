import { useState } from 'react';
import Star from './estrela';
import './styles.css'; // Certifique-se de ajustar o caminho correto

interface CardAvaliacaoProps {
  nome: string;
  foto: string;
  avaliacao: number;
  comentario: string;
  isVisible: boolean;
}
const items: number[] = [...(new Array(5).keys() as any)];

const CardAvaliacao: React.FC<CardAvaliacaoProps> = ({ nome, foto, avaliacao, comentario, isVisible }) => {
  const [activeIndex, setActiveIndex] = useState<number>();

  const onClickStar = (index: number) => {
    setActiveIndex((oldState) => (oldState === index ? undefined : index));
  };
  
  return (
    <div className={`review-card ${isVisible ? 'visible' : 'hidden'}`}>
      <img src={foto} alt={nome} />
      <h3>{nome}</h3>
      <p className="stars">{avaliacao}</p>
      <p>{comentario}</p>
      <div className="container">
        {items.map((index) => (
          <Star
            onClick={() => onClickStar(index)}
            key={`star_${index}`}
            isActive={index <= activeIndex!}
          />
      ))}
    </div>
    </div>
  );
}

export default CardAvaliacao;
