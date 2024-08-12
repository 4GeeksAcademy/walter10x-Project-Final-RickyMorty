import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { FavoriteCard } from "../component/FavoriteCard";
import "../../styles/favorites.css";

export const Favorites = () => {
    const { store, actions } = useContext(Context);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            await actions.getFavorites();
        };

        fetchFavorites();
    }, []); 

    useEffect(() => {
        setFavorites(store.favorites || []);
    }, [store.favorites]);

    return (
        <div className="favorites-page">
            <h1 className="favorites-title">Welcome to the Favorites of the Rick and Morty series</h1>
            <div className="favorites-list">
                {favorites.length > 0 ? (
                    favorites.map((favorite, index) => (
                        <FavoriteCard key={index} favorite={favorite} />
                    ))
                ) : (
                    <div className="no-favorites">
                        <i className="fas fa-heart-broken no-favorites-icon"></i>
                        <p>No tienes ningún personaje favorito agregado. Dirígete a personajes y selecciona tus favoritos.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
