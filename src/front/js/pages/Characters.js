import React, { useEffect, useContext } from 'react';
import { Context } from '../store/appContext';

export const Characters = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getCharacters();
    }, []);

    return (
        <div>
            <h1>Characters</h1>
            <div>
                {store.characters.map(character => (
                    <div key={character.id}>
                        <h2>{character.name}</h2>
                        <img src={character.image} alt={character.name} />
                    </div>
                ))}
            </div>
        </div>
    );
};


