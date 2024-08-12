import React from "react";
import "../../styles/episodesCard.css";

export const EpisodesCard = ({ episode }) => {
  return (
    <div className="episode-card">
      <h3 className="episode-title">{episode.name}</h3>
      <p className="episode-info">Season: {episode.season}</p>
      <p className="episode-info">Episode: {episode.episode}</p>
      <p className="episode-info">Air Date: {episode.air_date}</p>
    </div>
  );
};
