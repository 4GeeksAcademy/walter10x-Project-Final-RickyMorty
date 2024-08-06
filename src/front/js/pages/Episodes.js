import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { EpisodesCard } from "../component/EpisodesCard";
import "../../styles/Episodes.css";

export const Episodes = () => {
  const { store, actions } = useContext(Context);
  const [episodes, setEpisodes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEpisodes = async () => {
      await actions.getEpisodes();
      setEpisodes(store.episodes);
    };

    fetchEpisodes();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEpisodes = episodes.filter((episode) =>
    episode.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="episodes-page">
      <h1 className="episodes-title">Episodios</h1>
      <input
        type="text"
        className="search-input"
        placeholder="Buscar episodios..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="episodes-list">
        {filteredEpisodes.map((episode, index) => (
          <EpisodesCard key={index} episode={episode} />
        ))}
      </div>
    </div>
  );
};
