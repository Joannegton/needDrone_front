import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './style.css'
interface DropZoneProps {
  onFileUploaded: (fileUrl: string) => void; // Função para receber a URL do arquivo carregado
}

const DropZone: React.FC<DropZoneProps> = ({ onFileUploaded }) => {
  const id = localStorage.getItem('userId')
  const userType = localStorage.getItem('typeUser')

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('file', file); // 'file' é o nome do campo esperado pelo servidor
    if (userType !== null) {
      formData.append('userType', userType); // Adiciona userType somente se não for null
    }
    // Substitua 'http://localhost:5000/cliente/upload' pelo endpoint correto do seu servidor
    fetch(`http://localhost:5000/cliente/upload/${id}`, {
      method: 'POST',
      body: formData, // Envio do formulário com o arquivo
      // Não defina o 'Content-Type' header quando estiver usando FormData
      // O browser vai automaticamente definir para 'multipart/form-data' com o boundary correto
    })
    .then(response => response.json())
    .then(data => {
      onFileUploaded(data.fileUrl); // Supondo que o servidor responda com a URL do arquivo carregado
    })
    .catch(error => console.error('Error uploading file:', error));
  }, [onFileUploaded, userType]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {'image/*': []}
  });

  return (
    <div {...getRootProps()} className={isDragActive ? 'active' : "containerFile"}>
      <input {...getInputProps()} />
      {
        isDragActive
          ? <p className='textFile'>Arraste uma imagem...</p> 
          : 
          <>
            <p className='textFile'>Arraste uma imagem </p>
            <p className='textFile'> ou clique e selecione</p>
          </>
          
      }
    </div>
  );
}

export default DropZone;
