import React from 'react';

const ForbiddenPage: React.FC = () => {
    return (
        <div className="forbidden-container">
            <div className="forbidden-content">
                <h1>403</h1>
                <h2>Acesso Negado</h2>
                <p>Desculpe, você não tem permissão para acessar esta página.</p>
                <button onClick={() => window.history.back()}>Voltar</button>
            </div>
        </div>
    );
}

export default ForbiddenPage;
