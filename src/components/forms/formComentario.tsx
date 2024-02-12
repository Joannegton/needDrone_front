import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormComentarioProps {
  setEstrelas: Dispatch<SetStateAction<number>>;
}

export const FormComentario: React.FC<FormComentarioProps> = ({ setEstrelas }) => {
  const { register, handleSubmit } = useForm();
  const [comentario, setComentario] = useState('');
  const [estrelasLocal, setEstrelasLocal] = useState<number | null>(null);

  const onSubmit = () => {
    // Lógica para enviar dados para o servidor ou realizar outras ações
    console.log();
  };

  const handleEstrelaClick = (value: number) => {
    // Atualizar o estado das estrelas quando uma estrela é clicada
    setEstrelasLocal(value);
    setEstrelas(value);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea {...register('comentario')} value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder="Digite seu comentário"
        ></textarea>

<div className="estrelas-container">
          {[1, 2, 3, 4, 5].map((value) => (
            <span key={value} className={`estrela-container-${value}`}>
              <input
                className='estrela'
                type="radio"
                id={`star${value}`}
                value={value}
                {...register('estrelas')}
                checked={value === estrelasLocal}
                onChange={() => handleEstrelaClick(value)}
                hidden
              />
              <label
                className={`estrela ${estrelasLocal && value <= estrelasLocal ? 'selected' : ''}`}
                htmlFor={`star${value}`}
                onClick={() => handleEstrelaClick(value)}
                >
                  &#9733;
            </label>

            </span>
          ))}
        </div>


        <button className='button_login' type="submit">Enviar</button>
      </form>
    </>
  );
};
