import './styles.css'; // Certifique-se de ajustar o caminho correto

interface CardAvaliacaoProps {
  nome: string;
  foto: string;
  avaliacao: number;
  comentario: string;
  isVisible: boolean;
}

const CardAvaliacao: React.FC<CardAvaliacaoProps> = ({ nome, foto, avaliacao, comentario, isVisible }) => {
  return (
    <div className={`review-card ${isVisible ? 'visible' : 'hidden'}`}>
      <img src={foto} alt={nome} />
      <h3>{nome}</h3>
      <p className="stars">{avaliacao}</p>
      <p>{comentario}</p>
    </div>
  );
}

export default CardAvaliacao;
