// src/pages/Locations.js
import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/Locations.css"; // Importa el CSS

export const Locations = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getLocations();
    }, [actions]);

    return (
        <div className="locations-page">
            <h1>Locations</h1>
            <div className="locations-list">
                {store.locations.length > 0 ? (
                    <ul>
                        {store.locations.map((location, index) => (
                            <li key={index}>
                                <h2>{location.name}</h2>
                                <p>Type: {location.type}</p>
                                <p>Dimension: {location.dimension}</p>
                                <p>Residents: {location.residents.length}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No locations found.</p>
                )}
            </div>
        </div>
    );
};
