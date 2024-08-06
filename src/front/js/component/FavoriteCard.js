import React from "react";
import "../../styles/favoriteCard.css";

export  const FavoriteCard = ({ favorite }) => {
  return (
    <div className="favorite-card">
      <img src={favorite.image} alt={favorite.name} className="favorite-image" />
      <div className="favorite-info">
        <h3 className="favorite-name">{favorite.name}</h3>
        <p className="favorite-status">{favorite.status}</p>
      </div>
    </div>
  );
};


