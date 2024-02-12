import './styles.css'
import React from 'react'

interface SuccessFormsProps{
    texto: string
}

const SuccessForms: React.FC<SuccessFormsProps> = ({texto}) =>{
    return(
        <div className="containerSuccessForm"> 
            <h1 className='titulo3'>{texto}</h1>
        </div>
    )
}

export default SuccessForms