'use client'
import  { useState } from 'react';

import './style.css';
import Modal from '../menu/modal/modal';

export default function CriarContaLink() {

  const [isModalOpen, setModalOpen] = useState(false);


  const openModal = () => setModalOpen(true);

  const closeModal = () => setModalOpen(false);


  return (
    <>
    
      <p className='link' onClick={openModal}>Criar conta</p>

      {/* Renderize o Modal apenas se isModalOpen for true */}
      {isModalOpen && <Modal onClose={closeModal} />}
    
    </>
  );
}
