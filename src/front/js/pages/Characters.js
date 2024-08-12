import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import { Card } from '../component/card';
import { Navbar } from '../component/navbar';
import '../../styles/Characters.css';

export const Characters = () => {
    const { store, actions } = useContext(Context);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCharacters, setFilteredCharacters] = useState([]);
    const navigate = useNavigate();

    // Cargar los personajes al montar el componente
    useEffect(() => {
        actions.getCharacters();
    }, [actions]);

    // Filtrar personajes según el término de búsqueda
    useEffect(() => {
        setFilteredCharacters(
            store.characters.filter(character =>
                character.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, store.characters]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleAddToFavorites = async (character) => {
        try {
            await actions.addFavorite(character);
            await actions.getCharacters();
        } catch (error) {
           // console.error('Error adding favorite:', error);
        }
    };

    const handleRemoveFromFavorites = async (characterId) => {
        try {
            await actions.removeFavorite(characterId);
            await actions.getCharacters();
        } catch (error) {
           // console.error('Error removing favorite:', error);
        }
    };

    const handleViewDetails = (characterId) => {
        navigate(`/character/${characterId}`);
    };

    return (
        <div>
            
            <div className="characters-container">
                <h1 className="title">Welcome to the characters of the Rick and Morty series</h1>
                <input
                    type="text"
                    placeholder="Search characters"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <div className="characters-grid">
                    {filteredCharacters.map(character => (
                        <div key={character.id} className="character-card">
                            <Card
                                image={character.image}
                                title={character.name}
                                description={character.status}
                                onViewDetails={() => handleViewDetails(character.id)}
                                onAddToFavorites={() => handleAddToFavorites(character)}
                                onRemoveFromFavorites={() => handleRemoveFromFavorites(character.id)}
                                isFavorite={character.is_favorite}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
