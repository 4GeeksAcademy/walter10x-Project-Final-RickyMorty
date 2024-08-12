import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { FormLogin } from "../component/FormLogin";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate(); // Configura useNavigate

  const cardData = [
    { title: "Personajes", description: "Explora la galería de personajes únicos.", icon: "fas fa-users", path: "/characters" },
    { title: "Lugares", description: "Descubre los mundos y dimensiones.", icon: "fas fa-globe", path: "/locations" },
    { title: "Episodios", description: "Revive las aventuras más locas.", icon: "fas fa-tv", path: "/episodes" },
  ];

  const handleCardClick = (path) => {
    navigate(path); // Redirige al usuario a la ruta especificada
  };

  return (
    <div className="home-container">
      <div className="main-content">
        <div className="hero-section">
          <h1 className="hero-title">Bienvenido al Multiverso de Rick y Morty</h1>
          <p className="hero-subtitle">Prepárate para un viaje interdimensional lleno de ciencia, aventura y humor absurdo.</p>
          <div className="login-wrapper">
            <FormLogin />
          </div>
        </div>

        <div className="content-section">
          <div className="card-container">
            {cardData.map((card, index) => (
              <div
                key={index}
                className={`info-card ${hoveredCard === index ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleCardClick(card.path)} // Agrega el manejador de clic
              >
                <i className={`${card.icon} card-icon`}></i>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="cta-section">
          <h2>¿Listo para la aventura?</h2>
          <button className="cta-button">Explorar Ahora</button>
        </div>
      </div>
    </div>
  );
};
