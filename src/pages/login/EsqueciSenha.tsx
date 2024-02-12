// ForgotPassword.js
import React, { useState } from 'react';
import Menu from '../../components/menu/page';

import 'firebase/auth'

const EsqueciSenha = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function resuperarSenha(){
    
  }


  return (
    <div>
        <Menu/>
      <h2>Esqueceu sua senha?</h2>
      <form >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu e-mail"
          required
        />
        <button type="submit">Recuperar Senha</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EsqueciSenha;
