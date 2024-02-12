import './styles.css';

import React from 'react';


interface ErrosFormsProps {
  texto: string;
}

const ErrosForms: React.FC<ErrosFormsProps> = ({ texto }) => {
  return (
    <div className="container_errosForms">
      <p>{texto}</p>
    </div>
  );
};

export default ErrosForms;

