import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Star from '../cards/estrela';
import SuccessForms from '../cards/successForms';
import './style.css'

interface FormComentarioProps {
  pilotoId: string;
}

const items: number[] = Array.from({ length: 5 }, (_, index) => index);
 // Estrelas de avaliação

export const FormComentario: React.FC<FormComentarioProps> = ({ pilotoId }) => {
  const { register, handleSubmit } = useForm();
  const [comentario, setComentario] = useState('');
  const [estrela, setEstrela] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>();
  const [success, setSuccess] = useState(false);

  const onClickStar = (index: number) => {
    setActiveIndex(index === activeIndex ? undefined : index);
    setEstrela(index + 1);
  };

  const onSubmit = async () => {
    const clienteId = localStorage.getItem('userId');
    const bodyForm = {
      pilotoId: pilotoId,
      clienteId: clienteId,
      avaliacao: estrela,
      comentario: comentario
    };

    const response = await fetch('http://localhost:5000/comentario/criar', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(bodyForm),
    });

    if (response.ok) {
      setComentario('');
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } else {
      console.log('Erro ao enviar o formulário');
      console.log(bodyForm)
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="titulo2">Avalie o Piloto</h2>
        <textarea
          {...register('comentario')}
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          placeholder="Digite seu comentário"
        ></textarea>

        <div className="estrelas-container">
          {items.map((index) => (
            <Star
              onClick={() => onClickStar(index)}
              key={`star_${index}`}
              isActive={index <= activeIndex!}
            />
          ))}
        </div>
        {success && <SuccessForms texto={'Mensagem enviada com sucesso!'}/>}
        <button className='button_login' type="submit">Enviar</button>
      </form>

    </>
  );
};
