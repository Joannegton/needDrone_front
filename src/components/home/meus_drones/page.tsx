import './style.css'
import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react'

interface IDrone{
    _id: string
    name: string
    imagem: string
    droneType: string
    imgQuality: string
    cobertArea: string
    imgsubposition: boolean
    autonomia: string
    status: string
    userId: string;
}

const Drones = ()=>{
    const [content, setContent] = useState<IDrone[]>([])
    const id = localStorage.getItem('userId')

    const fetchData = async ()=>{
        try {
            const request = await fetch(`http://18.188.189.201:5000/drone`)
            const data: IDrone[] = await request.json() 
            const userDrones = data.filter(drone => drone.userId === id)
            setContent(userDrones)    
        } catch (error) {
            console.log("Deu ruim:", error)
        }
    }
    useEffect(()=>{fetchData()}, [])

    const getStatusColor = (status: string) => {
        if (status === 'Ativo') return 'green';
        if (status === 'Manutencao') return 'orange';
        if (status === 'Desativado') return 'red';
        return 'black';
      };

 return(<>
    <div className="card_edit">
        <h2 className="titulo3">Meus Drones</h2>
        <Link to="/drone/cadastro">Adicionar Drone</Link>
    </div>
    <div >
        {content.map((drone) => (<>
            <div key={drone._id} className="cardDrone">
                
                    <div className="containerImg"><img src={'data:image/webp;base64,UklGRqIMAABXRUJQVlA4IJYMAACwOQCdASqMAIUAPk0ijUUioiESyJaAKATEtIAJ9/+8eGvi/9R+3HMCiNfK/vZ+c+bH5Y8CfVB6hf43/Kf7x+X3FaAE/KP6V/of7d+8P+D+Jjth6JfND7gH6t/8XytPDD8u/XL4AP6B/Wv+z/bPYh/4P87+WXt9+lP/F/kPgI/mH9W/4P929sb2GfuB7N/7NnhR4luYW3sqZFOyO7TJR0sNPi91I9B2jAh/4olstwYoNJEty3cC9dh3GZsy9agtmgm9urneadrYDAP9jGmKkY6aZqOuWsYoEKdwnTBOYsn8B27mD1oFs3kdffD3lpUkJaNLZOTxWQOqRpAQtREztUfNIJFniyuwbK++qFpb/zzFLkm8lp/b4CABIuJ5KuHo/LPpE0SWL/r1WrwWJa4XalJ+gmU4/aubAMRyfxnLGLtOdTzU2ItY1GlP5UUIy8DTP0c8/VaI0HPoG/etHvXXkMe/oq63+/F4307lQBRXh8IrwbelLMXGRM1AQs60uTOxVZ0GeWK0EoFXb+KGYxchlTeSzR3Ixj5M+aJpz4WltmuN4aqy41aFg9JfycHcXZ4lAyZfN74yz4d1NBXYB98IydYISAV/n6kGvP4jskvqd7MkGxJxhh29gAD+/bsLIEEVCbWdiPjI6MLFjwDwCaM67E+8h6oIW+IEURk8HRJchYMa4ZbZBDIki6XsX9/rp48atposAs6a8KAXJLSnCTTeWwMFVhPk/IidsFaHjPRobhsevadwjq3zmE8Do/er1vkRsaaR0gC/W6l+RzhYXtm4C2IXLv/96mc9yF+73g+YSj3TSY6G2X/Nt3Qn8HnkJ527KbLUM/ZR/x+VaR/XQePfk5W7uZb/S/JdXqjPaQiSzDx2Z04DaWarzBpBLfm/4XAcpvVygQcNhVTNh9go+jE3o/TTHKBCE1roLJxoYLT27s7DL4qfGS8fuDOD5VTPlIikuGZdaUH72Fom+HQrsnnN7uGwueLzAwmGWQexBja/EeAQt3QAyqTFTL8EDSMp1C6SV4yUuyEekrqCgxIfU5c5hPowIJBngFI6vsqXgFY2gMbki3Ii9Eioqy9ngiW6KyJLc3Vw85oSRbChz7H/fsO7kdyGvBsLT96zaonL6gjqy/stfyHPMUuDan+RauDv3r8f68MuulEOoSmOHSXoGEppekFhlxfjW150+gseORsb2flngaR9zkkDS0kJs5iyuLYJOEeSoORaTkMvDKiaR/feFvWBoDSI4Dc3uZToU/lDaxK8AvHP3Zv2bQ7MX2sJFWhvougkTNKv6yix4obwLtWNx8E08rcGYZoSYeKiCmNQACDgAdcld/7m92kI9r/er4fayG8X8edkLajAQjCm5oT3QQ35fbI8wGyfKKlTvP9jA+NsubqI48erVn2XQaVc0LnUQHF2Nus+zW7gj59bjXEYLEoqybKRZrLLBk3Ng+TBr2mfSVwzsHdZPZ488XjeUz7voJwmdoUMuqx+ahxgHT3o5iOKUHBJ0DqknMXc6/CAGLkc2lk+edK/T4xMyLyuVbpOdxYqJvgHwUlGNpPxU3f6RzA7Ldlr+PHzM98xsAGHvpV78Kjx1UVPbFNI3uBR9UgXB0G7NA6DkpxZi+1dSbmC1Gs35GzGZRhMOD+F11YrzKbaeV+KU/vS+uxRXJp6DPa5OMT61xCnnmMv31qSdM51qq+RwYaRfVVY8oQW3rvoE5MGLY6Cex5QQdELJWH4qFJLR2y20LMnYDAkIZEsW0ga6pmSEs5IAVfS4CJGoneIy36PECTyfY8hK26ZfDeJvm49jjdTbaoDcBTy4HLZessS5g1N6tfZZOPCpgo8oimNWWtTBddi/TaUd+YxgI+8MkgSUxUWMY3Ih7poP7HTqxnRSfjbqHJNVEq7ip6uXpb6n+DwZu/MC9dEn4nbpM3r5eR5tXT+4JV4q0BNe48J3PN/qr/q8bh58+WrL/gWJf1r2W23lzmO8YE05luy91pkw4Q4dbWc9GNznUyRKntQm6xWGQuaGzZtI+X2+eJSWfCVWBvOHC3o23OaUczMagQbFPgRbEOpoTunaiIXHLhnYMMPP7tOA0gAiRK6qbPk/KLtyyIEl39yPci39Xuym2QYSsdbNZJay5xY2bsU8XN2FtC4TlquE0Qa7pJ4NWQKHvjRAPp6+FvsTyocpKBCrHo8QbiBYyDg3hByUeNMo/+hqKttL73PBfA8WNNpjT4t4t8WDcJTS2GdbJzF26JtrbIp/5MXN4+qrBzWCuOtodO1EnPK4ArZsnQTRMGd8CakroFO5Pm5XmlTObr8uyeJYTbF/7F2w4J9RB1KMUTEIDup9mynxhXy0VI+juXruSxu4ihiqfXkN1iHF6foZQZiUCZTA73fdcCIc10aJpnPfQgCTq6bCLxPxWTEXipMeAU81SUAa1trHNLfM99+B2i3FtwLbyPQuBeDBsCntcqYHV+EIULGq93Y6nOHVq2ByJw0rIXBkBRsjYgey3ACNbqwrpybQ2YTqGipDM0IPkAiVOZHdQCH0Mu2HdutJo9w+zdkDFOAmy0kL2wofjUuCWjxQAJxu0+Xg5l9h+A2Tz7YL5shvbaikn9mdjr/8SoKlrSMjLZY7xsyy0GOFSCWvHpmW2VuwScSVcN/ViBK2GA0CHhQW9kKz7UPS2zV8SDiIFbHmNXMF2UGZgCZiW5UPu5ZEXafVAl2TTHt6CHEl949Q+Brjc7JyWIKmjZ5f9rYG382X1K+u/9BL0rgiDoyd5DpSlas202NU9uiwZQzfrb5B9Sa0HCq5JmHcqqftNa2LnNyMexik6bKMvURf4BMcdCgWYpY3ceAZHBNv81EHjAABUjJ3nO4aNjx9Wv3DLI78LIiaXRi+XHPGr3F2YoNdjNaQvCRBVfzjLcuw0kLv6OrAfe4c0gOvRt0/TbsTSDQnGqmlMJ6hV5xJZVRTdQMJ018VntSkq1F1Vzd4pVRanZoOilWguZghel+dpJjLQ2OlB+lLUwlpsBC0DvvZL4S6xFJDq+FAFR2lHSto/8EfPdVo/AJCNtIIwv5cZz2YUIs0Qbmwqi21lOWQR/balGoYm4yDo4YnDztayYYynGZVmqKK/T4ZwzH9wCz/HJipn+WI+JASjYUUcmT5ThbvN8dDz+3pFDH/kn2a71InwG2Iug+sXBUooHn5cMlIPOB+9Co+oqdNLQ+hdf5dIim+qWfIp8azxmz/EDZ4JC+Mm9jcBCoVsmbyvt2kGQqSX4Aj9JSrzmEeXz6JHMvB16YKqST8Mn9uw2Yg88cx/99qYppPZhCaERNXi/poeEZOZpH0WnJoQ++Vu55TPzkwTW5PQ22X7sx29WxSpC2QmCkB7f5BoHf5XANk9s3oMAxmG78a7I8nsfVcqJtxPEe65h3xSELpqWRE9XZNmhkD7dLVGznRUuaQkRnrHOqtQqDCORxv//Zj3bFK9KTPlrvyC7ZPOZ+o3lDIeDAxLZ/HuRsJwa3Ir5+hgCh8nTtPnVhFzJeD2Fy0/gzWRipvC8lBUN8YUNvmw8Sp6iqvIJmaL78vyzqkk/jSwIG2RLNtinHS28vfYRUdY4okbgij40BS8WOSQJvYyExLUAe/gVl5lLjy2YmXzXpKYuWtJCaPSlYt2KjkYAHUbO1zFUZDomWmNeUKZcGKWjx+GKe1pIims74GbTN+cf40JUjnPGsi3jBNE4VgEe78qpQ9MPkEb1fR+El9345quZFhiM9HpYh8Q+L3yQnBqYQ+zbxcMAJ/TGdlF5cxBwu4TZKQF1BSxBpAcgWv5C0yhmFldn3IQ9/g3TPbFtdkYy4QS7kZGcAz+TJojFPhVcvk/wgJKmc83mw5NP/OBk5tcPDq88P9bLfaNZRQj2ARQ8oLyxjYhsUdPYzfM9OD9/oVMiggjPKwGdCK+o6AKi9CGHAfLJshbRg2Kp+9vo8l9T9tQA7xxLqYJr6QBC1cpxE+i3VnO5SP47XwUHIaEJ3qucJuJYI3pyUnNuua0N0ryxIBU0/yyaPvi/1/giPfU+A+X8cDZRFRJeHCQzeC8dOcHCpc+r+Hwv1O83DHgObsGHm8RF0qLucxBJYgv7s+BulALl5TUAB3tY+muXW6oyEgtk8oJfGh58V4jmLnGPd9sWAizUuIuncQpVbBE5mIAn3B+SACCo36cFT9lkMudc3meKHOWZkXTwJetLYz883XQepN5I2VUJWLX7O+kHxgpLsAP6JfD43kWqtDU9LsUoMwBY3Pi1lhg9plR55+cYAyHKKe3CLA7ilOPwnfo+OCULCbLLN2cHvcsgYu0mynxdbsAYYUaZZaR6wq/A+L53AAAA='} alt={drone.name} width={80} height={80}/>
                    <Link className='button_login' to={`/drone/editar/${drone._id}`}>Editar</Link></div>

                    <div className="infos">
                        <h3 className='titulo3'>{drone.name}</h3>
                        <p>Autonomia: até {drone.autonomia} minutos.</p>
                        <p>Área de cobertura: até {drone.cobertArea}m².</p>
                        <div className="especificacoes">
                            <p>{drone.droneType}</p>
                            <p>{drone.imgQuality}</p>
                            <p className={drone.imgsubposition? 'sobreposicao' : 'hidden'}>{drone.imgsubposition ? 'Sobreposição' : null}</p>
                        </div>
                    </div>
                        
                    <h3 className='statusDrone vertical-text' style={{ color: 'white', backgroundColor: getStatusColor(drone.status) }}>{drone.status}</h3>
            </div>
                
                    
        </>))}
    </div>
 </>)   
}

export default Drones