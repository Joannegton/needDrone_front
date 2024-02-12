import './style.css'

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-section">
                    <h2 className='titulo'>Sobre Nós</h2>
                    <p className='textos'>
                    Na Need a Drone, proporcionamos uma plataforma que conecta entusiastas de drones aos clientes, comprometendo-nos a fornecer soluções inovadoras e atender às suas necessidades de captura de imagens aéreas com excelência e profissionalismo.
                    </p>
                </div>

                <div className="footer-section footer-section-links">
                    <h2 className='titulo'>Links Úteis</h2>
                    <ul>
                        <li><a className='link' href="/servicos">Serviços</a></li>
                        <li><a className='link' href="/sobre">Como funciona</a></li>
                        <li><a className='link' href="/portfolio">Central de ajuda</a></li>
                        <li><a className='link' href="/privacidade">Politica de privacidade</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h2 className='titulo'>Contato</h2>
                    <p>
                        <strong>Telefone:</strong> +55 123 456 789
                    </p>
                    <p>
                        <strong>Email:</strong> info@dronesolutions.com
                    </p>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2024<a href="https://github.com/joannegton"> Drone Solutions.</a> Todos os direitos reservados.</p>
                
            </div>
        </footer>
    );
};

export default Footer;
