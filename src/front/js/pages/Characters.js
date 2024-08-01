import React, { useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { Card } from '../component/card';

export const Characters = () => {
    const { store, actions } = useContext(Context);

    // Cargar los personajes al montar el componente
    useEffect(() => {
        actions.getCharacters();
    }, [actions]);

    // Manejar la adición a favoritos
    const handleAddToFavorites = async (character) => {
        try {
            await actions.addFavorite(character);
            // Actualiza la lista de personajes después de añadir un favorito
            await actions.getCharacters();
        } catch (error) {
            console.error('Error adding favorite:', error);
        }
    };

    // Manejar la eliminación de favoritos
    const handleRemoveFromFavorites = async (characterId) => {
        try {
            await actions.removeFavorite(characterId);
            await actions.getCharacters();
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    return (
        <div>
            <h1>Characters</h1>
            <div className="row">
                {store.characters.map(character => (
                    <div key={character.id} className="col-md-3">
                        <Card
                            image={character.image}
                            title={character.name}
                            description={character.status}
                            onViewDetails={() => console.log("View Details", character.id)}
                            onAddToFavorites={() => handleAddToFavorites(character)}
                            onRemoveFromFavorites={() => handleRemoveFromFavorites(character.id)}
                            isFavorite={character.is_favorite} // Usa el estado de is_favorite
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
