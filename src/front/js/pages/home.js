import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navbar } from "../component/navbar";
import { NavbarLanding } from "../component/NavbarLanding";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [hoveredCard, setHoveredCard] = useState(null);

  const cardData = [
    { title: "Personajes", description: "Explora la galería de personajes únicos.", icon: "fas fa-users" },
    { title: "Lugares", description: "Descubre los mundos y dimensiones.", icon: "fas fa-globe" },
    { title: "Episodios", description: "Revive las aventuras más locas.", icon: "fas fa-tv" },
  ];

  return (
    <div className="home-container">
      <div className="d-flex">
        <Navbar />
        {/* <NavbarLanding /> */}
      </div>

      <div className="hero-section">
        <h1 className="hero-title">Bienvenido al Multiverso de Rick y Morty</h1>
        <p className="hero-subtitle">Prepárate para un viaje interdimensional lleno de ciencia, aventura y humor absurdo.</p>
      </div>

      <div className="content-section">
        <div className="card-container">
          {cardData.map((card, index) => (
            <div 
              key={index}
              className={`info-card ${hoveredCard === index ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
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
  );
};