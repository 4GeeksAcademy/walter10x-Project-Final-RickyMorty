import React, { useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { Card } from '../component/card';
import "../../styles/Characters.css";

export const Characters = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getCharacters();
    }, []);

    const handleViewDetails = (character) => {
        console.log("View details for:", character);
        // Aquí puedes manejar la navegación a la página de detalles del personaje
    };

    const handleAddToFavorites = (character) => {
        console.log("Add to favorites:", character);
        // Aquí puedes manejar la lógica para agregar a favoritos
    };

    return (
        <div className="characters-container">
            <h1 className="title">Characters</h1>
            <div className="characters-grid">
                {store.characters.map(character => (
                    <Card
                        key={character.id}
                        image={character.image}
                        title={character.name}
                        description={character.species}
                        onViewDetails={() => handleViewDetails(character)}
                        onAddToFavorites={() => handleAddToFavorites(character)}
                    />
                ))}
            </div>
        </div>
    );
};
