// Home.js

import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Navbar } from "../component/navbar";
import { NavbarLanding } from "../component/NavbarLanding";
import {FormLogin} from "../component/FormLogin";
import { FormSignUp } from "../component/FormSignUp";

export const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <div>
            {/* Contenedor flex para alinear horizontalmente */}
            <div className="d-flex">
                {/* Renderiza tu Navbar original */}
                <Navbar />

                {/* Renderiza NavbarLanding al lado de Navbar */}
                <NavbarLanding />
            </div>

            {/* Contenido principal de la página */}
            <div className="text-center mt-5">
                
                <h1>Ricky Morty!!</h1>
             
               
                <div className="alert alert-info">
                    {store.message || "Srore seguramente)..." }
                </div>
                <p>
                    
                    <a href="https://start.4geeksacademy.com/starters/react-flask">
                        Read documentation
                    </a>
                </p>
            </div>
        </div>
    );
};
