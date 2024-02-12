import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface DropZoneProps {
  onFileUploaded: (fileUrl: string) => void; // Função para receber a URL do arquivo carregado
}

const DropZone: React.FC<DropZoneProps> = ({ onFileUploaded }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('file', file); // 'file' é o nome do campo esperado pelo servidor

    // Substitua 'http://localhost:5000/cliente/upload' pelo endpoint correto do seu servidor
    fetch('http://localhost:5000/cliente/upload', {
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
  }, [onFileUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {'image/*': []}
  });

  return (
    <div {...getRootProps()} className={isDragActive ? 'active' : ""}>
      <input {...getInputProps()} />
      {
        isDragActive
          ? <p>Drop the file here ...</p> 
          : <p>Drag 'n' drop an image here, or click to select file</p>
      }
    </div>
  );
}

export default DropZone;
