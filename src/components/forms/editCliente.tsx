import './style.css';
import { useForm } from 'react-hook-form';
import { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrosForms from '../cards/erroForms';
import SuccessForms from '../cards/successForms';


type IBGEUFResponse = {
  sigla: string;
  nome: string;
};
type IBGECITYResponse = {
  id: number;
  nome: string;
};


const FormAtualizacaoClient = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [tel, setTel] = useState('')
    const [whatsapp, setWhatsapp] = useState(false)
    const [rua, setRua] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')
    const [cep, setCep] = useState('')
    const [foto, setFoto] = useState('')
    const [biografia, setBiografia] = useState('')

    const [ufs, setUfs] = useState<IBGEUFResponse[]>([]);
    const [cities, setCities] = useState<IBGECITYResponse[]>([]);
    const [selectedUf, setSelectedUf] = useState("0");
    const [selectedCity, setSelectedCity] = useState("0");

    const [success, setSuccess] = useState(false);
    const [content, setContent] = useState('')
    const [render, setRender] = useState(false)
    const [error, setError] = useState('')
    
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')

  // busca de dados (fetching) de uma API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/cliente/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setContent(data)
        setName(data.name);
        setEmail(data.email);
        setBiografia(data.biografia)
        setCep(data.cep)
        setCidade(data.cidade)
        setEstado(data.estado)
        setFoto(data.foto)
        setRua(data.rua)
        setTel(data.tel)
        setWhatsapp(data.whatsapp)
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, [render]);


  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados/")
      .then((response) => response.json())
      .then((data) => setUfs(data));
  }, []);

  useEffect(() => {
    if (selectedUf === "0") {
      return;
    }
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setCities(data));
  }, [selectedUf]);

  const handleSelectUf = (event: ChangeEvent<HTMLSelectElement>) => {
    const uf = event.target.value;
    setSelectedUf(uf);
    setEstado(uf); // Garante que o estado selecionado seja atualizado
  };

  const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
    const city = event.target.value;
    setSelectedCity(city);
    setCidade(city); // Garante que a cidade selecionada seja atualizada
  };


  const onSubmit = async (data: any) => {

    //cria o request gravando os dados na API
    const bodyForm = {
      name: name,
      email: email,
      tel: tel,
      whatsapp: whatsapp,
      rua: rua,
      cep: cep,
      cidade: cidade,
      estado: estado,
      biografia: biografia,
      foto: foto,
    };
    try {
      const response = await fetch(`http://localhost:5000/cliente/atualizar/${userId}`, {
        method: 'PUT',
        headers: {'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`},
        body: JSON.stringify(bodyForm),
      });
      if (response.ok) {
        setRender(true);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
        navigate(`/dashboard/${userId}`);
        
      } else if (response.status === 409) {
        setTimeout(() => {
            navigate('/entrar');
          }, 2000);

      } else {
        console.error('Erro no cadastro de cliente:', response.statusText);
      }
    } catch (error) {
        console.error('Erro ao enviar dados para a API:', error);
    }
    
  };
 
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className='titulo'>Atualizar Perfil</h1>
        <div className="containerData">
            <img src={foto} alt="img perfil" />
            <input type="file" onChange={(event) => {const file = event.target.files ? event.target.files[0] : null;}} />

            <label htmlFor="name">Nome*</label>
            <input 
            type="text" 
            {...register("name")}  
            value={name} 
            onChange={(event) => {setName(event.target.value)}} 
            placeholder='André magalhães' 
            required />
            {/*value serve para lincar com o useState,
            onChange- manipula os campos => event=html target=input value=valor colocado no input  */}
            <label htmlFor="email">Email*</label>
            <input type="email" value={email}  disabled />

            <label htmlFor="biografia">Biografia:</label>
            <textarea className='' {...register("biografia")} value={biografia} onChange={(event) => {setBiografia(event.target.value)}} />

            <label htmlFor="tel">Telefone*</label>
            <div className="Container_tel">
                <input type="tel" {...register("tel")} placeholder="11912345678" value={tel} onChange={(event) => {setTel(event.target.value)}}/>
                <label htmlFor="whatsapp" className='whatsapp'>Whatsapp</label>
                <input type="checkbox" {...register("whatsapp")} checked={whatsapp} onChange={(event) => {setWhatsapp(event.target.checked)}}/>
            </div>

            <label htmlFor="rua">Rua/N°:</label> 
            <input type="text" {...register("rua")} placeholder="Rua dores de campos, 456" value={rua} onChange={(event) => {setRua(event.target.value)}} required/>

            <label htmlFor="estado">Estado:</label>
            <select  {...register("estado")} value={estado} onChange={(event) => {setEstado(event.target.value); handleSelectUf(event)}} >
              <option value="0">Selecione</option>
          {ufs.map((uf) => (
              <option key={uf.sigla} value={uf.sigla}>{uf.nome}</option>
          ))}
        </select>

            <label htmlFor="cidade">Cidade:</label>
            <select  {...register("cidade")} value={cidade} onChange={(event) => {setCidade(event.target.value); handleSelectCity(event)} } >
              <option value="0">{cidade? cidade: 'Cidade'}</option>
              {cities.map((city) => (
            <option key={city.id} value={city.nome}>{city.nome}</option>
          ))}
        </select>
            
            <label htmlFor="cep">CEP:</label>
            <input type="text" {...register("cep")} placeholder="07176390" value={cep} onChange={(event) => {setCep(event.target.value)}} required/>
                        
            {success && <SuccessForms texto={'Dados atualizados com sucesso!'}/>}
        </div>

        <button type="submit">Atualizar</button>
      </form>
      
    </>
  );
}

export default FormAtualizacaoClient