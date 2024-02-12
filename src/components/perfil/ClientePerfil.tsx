import perfil from '../../assets/_8d2c28f8-d357-4e30-85c9-19019c88e6bf.jpg'
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import './style.css'

export default function ClientePerfil(){
    const [content, setContent] = useState()
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
    const [avaliacao, setAvaliacao] = useState(5)
    const {id} = useParams()

    const fetchData = async () => {
        const response = await fetch(`http://localhost:5000/cliente/${id}`)
        const data = await response.json()
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
    }

    useEffect(()=>{fetchData()}, [])

    return(
        <>
            <aside className='containerDado'>
                <img src={perfil} width={150} height={150} alt="Foto de perfil" /> 
                <h2 id="nome">{name}</h2>
            </aside>

            <section className='containerPerfil'>
                <h2 className='titulo2'>Sobre mim:</h2>
                <p className='textos'>{biografia}</p>

                <h2 className='titulo2'>Projetos anteriores</h2>
                <p className='textos'>
                    Esta é minha primeira vez buscando um piloto de drones para nossos eventos.
                    Estou animada para encontrar um profissional que possa agregar valor às
                    nossas produções.
                </p>
                <h2 className='titulo2'>Avaliações</h2>
                <div id="avaliacoes">
                    {/* Cliente ainda não tem avaliações */}
                    <p>Nenhuma avaliação disponível no momento.</p>
                </div>
                <div className="contato">
                    <h2 className='titulo2'>Contato</h2>
                    <p>Email: <span id="emailPiloto">{email}</span></p>
                    <p>Telefone: <span id="telefonePiloto">{tel}</span></p>
                </div>
            </section>
        </>

    )
}