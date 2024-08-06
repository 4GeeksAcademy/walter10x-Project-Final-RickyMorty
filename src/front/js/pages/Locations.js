import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { LocationCard } from "../component/LocationCard";
import "../../styles/locations.css";

export const Locations = () => {
  const { store, actions } = useContext(Context);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
    //  console.log("Fetching locations..."); // Log cuando empieza a buscar
      await actions.getLocations();
      //console.log("Locations fetched:", store.locations); // Log para verificar los datos
      setLocations(store.locations);
    };

    fetchLocations();
  }, []);

  return (
    <div className="locations-page">
      <h1 id="mpp" className="locations-title">Locations</h1>
      <div className="locations-list">
        {locations.length > 0 ? (
          locations.map((location, index) => (
            <LocationCard key={index} location={location} />
          ))
        ) : (
          <p>No locations available.</p>
        )}
      </div>
    </div>
  );
};
