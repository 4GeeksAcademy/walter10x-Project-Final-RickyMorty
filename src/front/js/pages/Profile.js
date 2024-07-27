import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const Profile = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        console.log("soy el perfil ok llavitos ")
    }, []);

    return (
        <div>
            <h1>Profile</h1>
            <p>Welcome, {store.user ? store.user.name : "User"}</p>
            {/* Puedes mostrar más información del perfil aquí */}
        </div>
    );
};
