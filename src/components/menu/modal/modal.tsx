import React from 'react';
import { XMarkIcon } from '@heroicons/react/16/solid' 
import './style.css'
import { Link, useNavigate } from 'react-router-dom';

interface ModalProps {
  onClose: () => void; // indicando que onClose deve ser uma função sem parâmetros e sem retorno
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const navigate = useNavigate()
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>
          <XMarkIcon className="close" onClick={onClose}/>
        </p>

        <div>
          <h1 className='titulo'>Entre ou Cadatre-se</h1>
          <button className='button_login' onClick={()=>{navigate('/client/entrar')}}>Sou Cliente</button>

          <button className='button_login' onClick={()=>{navigate('/piloto/entrar')}}>Sou Piloto</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;


