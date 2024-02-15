import {  useState } from "react"
import { FormComentario } from "../../components/forms/formComentario"
import Menu from "../../components/menu/page"

const Comentario = () =>{
    const [estrelas, setEstrelas] = useState<number>(0);
    return(
        <main>
            <Menu/>
            
            <FormComentario pilotoId={""} />
      <p>Número de estrelas selecionadas: {estrelas}</p>
        </main>
    )
}

export default Comentario