import React from "react";
import "../../styles/locationCard.css"; 

export const LocationCard = ({ location }) => {
  return (
    <div className="location-card">
      <h3 className="location-name">{location.name}</h3>
      <p className="location-info">Tipo: {location.type}</p>
      <p className="location-info">Dimensión: {location.dimension}</p>
      <p className="location-info">Número de Residentes: {location.residents.length}</p>
    </div>
  );
};
