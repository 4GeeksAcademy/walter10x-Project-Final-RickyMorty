import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import '../../styles/CharacterDetail.css';

export const CharacterDetail = () => {
    const { store, actions } = useContext(Context);
    const { characterId } = useParams();
    const [character, setCharacter] = useState(null);

    // Descripciones manuales para los personajes
    const characterDescriptions = {
        1: "Rick Sanchez is a genius scientist whose alcoholism and reckless, nihilistic behavior are a source of concern for his daughter's family. He frequently travels on adventures through space and other dimensions with his grandson Morty.",
        2: "Morty Smith is a good-hearted but easily distressed grandson of Rick Sanchez. He often reluctantly follows Rick on his dangerous adventures, which leads to a great deal of turmoil.",
        3: "Summer Smith is the older sister of Morty and the granddaughter of Rick. She often feels overlooked by her family and seeks validation through social acceptance and adventures.",
        4: "Beth Smith is Rick's daughter, a successful veterinarian who specializes in heart surgery on horses. She often feels torn between her father and her family.",
        5: "Jerry Smith is Beth's husband and the father of Summer and Morty. He's often insecure and feels threatened by Rick's intelligence and adventurous lifestyle.",
        6: "Abadango Cluster Princess is a character who represents the royal family of the Abadango Cluster. She has a deep romantic relationship with Morty Smith.",
        7: "Abradolf Lincler is a genetic experiment created by Rick, combining the DNA of Adolf Hitler and Abraham Lincoln. He struggles with his divided nature.",
        8: "Adjudicator Rick is a member of the Council of Ricks. He helps oversee the legal proceedings and maintains order among the various Ricks in the multiverse.",
        9: "Agency Director is the head of the Galactic Federation's secret intelligence agency. He often comes into conflict with Rick's rebellious activities.",
        10: "Alan Rails is a superhero with the ability to summon ghost trains. He was formerly married to Supernova, a member of the Vindicators.",
        11: "Albert Einstein makes a brief appearance in the series, portrayed as a version of the famous physicist who has an unfortunate encounter with Rick.",
        12: "Alexander is a character who appears briefly in the series, known for his unique and bizarre appearance.",
        13: "Alien Googah is a character with a grotesque appearance who has a brief encounter with Rick and Morty.",
        14: "Alien Morty is a version of Morty from an alternate dimension. He possesses distinct physical traits that set him apart from the original Morty.",
        15: "Alien Rick is a version of Rick from an alternate dimension. He has unique physical characteristics that differentiate him from the original Rick.",
        16: "Amish Cyborg is a character who combines traditional Amish culture with advanced cybernetic enhancements, creating a unique blend of old and new.",
        17: "Annie is a character who works as an intern in Anatomy Park, a theme park inside the body of a homeless man. She aids Rick and Morty in their adventures within the park.",
        18: "Antenna Morty is a version of Morty with antennas on his head, hailing from an alternate dimension where such traits are common.",
        19: "Antenna Rick is a version of Rick with antennas on his head, originating from an alternate dimension where this physical characteristic is normal.",
        20: "Ants in my Eyes Johnson is a character who runs an electronics store. His defining trait is that he literally has ants in his eyes, affecting his vision."
    };

    useEffect(() => {
        const fetchCharacter = async () => {
            const data = await actions.getCharacterById(characterId);
            // Agregar la descripción al personaje
            data.description = characterDescriptions[characterId] || "No description available.";
            setCharacter(data);
        };
        fetchCharacter();
    }, [actions, characterId]);

    if (!character) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="character-detail-container">
            <div className="character-card">
                <div className="character-image">
                    <img src={character.image} alt={character.name} />
                </div>
                <div className="character-info">
                    <h1 className="character-name">{character.name}</h1>
                    <div className="character-description">
                        {character.description}
                    </div>
                    <div className="info-item">
                        <span className="info-label">Status:</span>
                        <span className={`info-value status-${character.status.toLowerCase()}`}>{character.status}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Species:</span>
                        <span className="info-value">{character.species}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Gender:</span>
                        <span className="info-value">{character.gender}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Origin:</span>
                        <span className="info-value">{character.origin.name}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Location:</span>
                        <span className="info-value">{character.location.name}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
