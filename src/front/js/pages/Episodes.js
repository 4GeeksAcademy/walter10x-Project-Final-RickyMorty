// src/pages/Episodes.js

import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import '../../styles/Episodes.css';

export const Episodes = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getEpisodes();
    }, [actions]);

    return (
        <div className="episodes-container">
            <h1 className="title">Episodes</h1>
            <div className="episodes-list">
                {store.episodes.length > 0 ? (
                    store.episodes.map((episode, index) => (
                        <div className="episode-card" key={index}>
                            <h2 className="episode-title">{episode.title}</h2>
                            <p className="episode-description">{episode.description}</p>
                            <p className="episode-date">Air Date: {episode.air_date}</p>
                        </div>
                    ))
                ) : (
                    <p className="no-episodes">No episodes available.</p>
                )}
            </div>
        </div>
    );
};
