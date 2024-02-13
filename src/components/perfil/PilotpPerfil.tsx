import perfil from '../../assets/logo.jpg'
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import './style.css'

const image1 = 'https://www.anapolis.go.gov.br/wp-content/uploads/2022/06/WhatsApp-Image-2022-06-21-at-17.47.38.jpeg'
const image2 = 'https://www.anapolis.go.gov.br/wp-content/uploads/2022/06/WhatsApp-Image-2022-06-21-at-17.47.38.jpeg'
const image3 = 'https://www.anapolis.go.gov.br/wp-content/uploads/2022/06/WhatsApp-Image-2022-06-21-at-17.47.38.jpeg'


export default function PilotoPerfil(){
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
    const [avaliacao, setAvaliacao] = useState('')
    const [licenca, setLicenca] = useState('')
    const [experiencia, setExperiencia] = useState('')
    const [especializacao, setEspecializacao] = useState('')
    
    const {id} = useParams()

    const fetchData = async () => {
        const response = await fetch(`https://slug-liberal-wallaby.ngrok-free.app:5000/piloto/${id}`)
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
        setExperiencia(data.experiencia)
        setEspecializacao(data.especializacao)
        setLicenca(data.licenca)
        setWhatsapp(data.whatsapp)
    }

    useEffect(()=>{fetchData()}, [])


    return(
        <>
            <aside className='containerDado'>
                <img src={foto} alt="Foto de perfil" />
                <h2 className='titulo'>{name}</h2>
            </aside>

            <section className='containerPerfil'>
                <h2 className='titulo2' id="titulo2">Biografia:</h2>
                <p className='textos'>{biografia}</p>
                <h2 className='titulo2'>Experiencia</h2>
                <ul className="listaCertificacoes">
                    <li><strong>Licença de pilotagem:</strong> {licenca}</li>
                    <li><strong>Experiência com drone:</strong> {experiencia} anos</li>
                    <li><strong>Área de especialização:</strong> {especializacao}</li>
                </ul>
                <h2 className='titulo2'>Portfólio</h2>
                <div id="galeriaPortfolio">
                    {/* Adicione exemplos de imagens do portfólio aqui */}
                    <img src={image1} alt="Projeto 1" />
                    <img src={image2} alt="Projeto 2" />
                    <img src={image3} alt="Projeto 3" />
                </div>
                <h2 className='titulo2'>Avaliações</h2>
                <div id="avaliacoes">
                {avaliacao}
                    <p>"Gabriel é extremamente profissional e entrega resultados excepcionais.
                        Recomendo seus serviços para qualquer projeto que exija qualidade e precisão."</p>
                    <p>"Trabalho incrível! As imagens capturadas por Gabriel superaram nossas
                        expectativas. Um verdadeiro especialista no que faz."</p>
                </div>
                <div className="contato">
                    <h2>Contato</h2>
                    <p>Email: <span id="emailPiloto">{email}</span></p>
                    <p>Telefone: <span id="telefonePiloto">{tel}</span></p>
                </div>
            </section>
        </>

    )
}