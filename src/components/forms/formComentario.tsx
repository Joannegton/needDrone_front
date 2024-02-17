import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import Star from '../cards/estrela';

interface FormComentarioProps {
  pilotoId: string;
}

const items: number[] = [...(new Array(5).keys() as any)]; //estrelas de avaliação

export const FormComentario: React.FC<FormComentarioProps> = ({pilotoId}) => {
  const { register, handleSubmit } = useForm();
  const [comentario, setComentario] = useState('');
  const [estrela, setEstrela] = useState<number | null>(null);

  const [activeIndex, setActiveIndex] = useState<number>();


  useEffect( ()=>{
    const fetchData = async()=>{
      try {
        const responde = fetch('')
      } catch (error) {
        
      }
    }
    console.log(1)
  })


  const onClickStar = (index: number) => {
    setActiveIndex((oldState) => (oldState === index ? undefined : index));
    setEstrela(index + 1)
  };

  const onSubmit = async() => {
    const clienteId = localStorage.getItem('userId')
    const bodyForm = {
      pilotoId: pilotoId,
      clienteId: clienteId,
      avaliacao: estrela,
      comentario: comentario
    }
    const response = await fetch('http://localhost:5000/comentario',{
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(bodyForm),
    })
  };


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea {...register('comentario')} value={comentario}
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
            {estrela}

        <button className='button_login' type="submit">Enviar</button>
      </form>
    </>
  );
};
