import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import {FavoriteCard} from "../component/FavoriteCard";
import "../../styles/favorites.css";

export const Favorites = () => {
  const { store, actions } = useContext(Context);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      console.log("Fetching favorites...");
      await actions.getFavorites();
    };

    fetchFavorites();
  }, [actions]);

  useEffect(() => {
    console.log("Store favorites:", store.favorites);
    setFavorites(store.favorites || []);
  }, [store.favorites]);

  console.log("Rendering favorites:", favorites);

  return (
    <div className="favorites-page">
      <h1 className="favorites-title">Welcome to the Favorites of the Rick and Morty series</h1>
      <div className="favorites-list">
        {favorites.length > 0 ? (
          favorites.map((favorite, index) => (
            <FavoriteCard key={index} favorite={favorite} />
          ))
        ) : (
          <p>No favorites found.</p>
        )}
      </div>
    </div>
  );
};


