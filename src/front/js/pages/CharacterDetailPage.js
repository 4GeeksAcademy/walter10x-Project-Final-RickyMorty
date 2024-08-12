import React from 'react';
import { CharacterDetail } from '../component/CharacterDetail';

export const CharacterDetailPage = () => {
    return (
        <div className="character-detail-page">
            <h1 className="welcome-title" style={{color:"white"}}>Welcome to Character Details</h1>
            <CharacterDetail />
        </div>
    );
};
