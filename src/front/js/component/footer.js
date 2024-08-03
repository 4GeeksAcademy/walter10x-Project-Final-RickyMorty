import React from "react";

export const Footer = () => (
    <footer className="footer mt-auto py-4 text-center bg-dark text-light">
        <div className="container">
            <div className="row">
                <div className="col-md-2 col-sm-6 mb-3">
                    <h5>Quiénes Somos</h5>
                    <p>Academia dedicada a la formación en tecnología.</p>
                </div>
                <div className="col-md-2 col-sm-6 mb-3">
                    <h5>Contacto</h5>
                    <p>
                        <a href="mailto:tu-correo@example.com" className="text-light">tu-correo@example.com</a><br />
                        Tel: +1 (234) 567-8901
                    </p>
                </div>
                <div className="col-md-2 col-sm-6 mb-3">
                    <h5>Nuestra Visión</h5>
                    <p>Ser líderes en educación tecnológica.</p>
                </div>
                <div className="col-md-2 col-sm-6 mb-3">
                    <h5>Aviso Legal</h5>
                    <p>
                        Términos y condiciones de uso.
                        <a href="/aviso-legal" className="text-light"> Leer más</a>
                    </p>
                </div>
                <div className="col-md-2 col-sm-6 mb-3">
                    <h5>Política de Privacidad</h5>
                    <p>
                        Comprometidos a proteger su información.
                        <a href="/politica-de-privacidad" className="text-light"> Leer más</a>
                    </p>
                </div>
                <div className="col-md-2 col-sm-6 mb-3 mlx">
                    <h5>Síguenos</h5>
                    <div className="social-links">
                        <a href="https://www.linkedin.com/in/tu-perfil" target="_blank" rel="noopener noreferrer" className="text-light mx-2">
                            <i className="fab fa-linkedin" style={{ fontSize: '24px' }}></i>
                        </a>
                        <a href="https://www.instagram.com/tu-perfil" target="_blank" rel="noopener noreferrer" className="text-light mx-2">
                            <i className="fab fa-instagram" style={{ fontSize: '24px' }}></i>
                        </a>
                        <a href="https://www.facebook.com/tu-perfil" target="_blank" rel="noopener noreferrer" className="text-light mx-2">
                            <i className="fab fa-facebook" style={{ fontSize: '24px' }}></i>
                        </a>
                    </div>
                </div>
            </div>
            <hr className="my-4" />
            <p className="mb-0">
                Made with <i className="fa fa-heart text-danger mx-1" /> by{" "}
                <a href="http://www.4geeksacademy.com" className="text-light fw-bold">4Geeks Academy</a>
            </p>
        </div>
    </footer>
);


