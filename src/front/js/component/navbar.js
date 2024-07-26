// src/front/js/component/navbar.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Navbar.css";
//import rickAndMortyImage from "../../img/RickyMorty.jpeg";

export const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Inicialmente abierta parcialmente
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="App">
            <nav className={`navbar ${isSidebarOpen ? "navbar-main-open" : "navbar-main-closed"}`}>
                <div className="container-fluid">
                    <div className={`d-flex align-items-center navbar-content ${isSidebarOpen ? "shifted" : ""}`}>
                        
                    </div>
                </div>
            </nav>
            <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
                <div className="sidebar-header">
                  
                   
                </div>
                <div className="sidebar-body">
                    <ul className="navbar-nav">
                    <li
                                className="colorido"
                                type="button"
                                onClick={toggleSidebar}
                            >
                                <i className="nav-item fw-bold my-4 ps-2 fa-solid fa-list fs-3 ms-2 fs-5" aria-hidden="true"></i>
                                {isSidebarOpen && <span className="ms-2 fs-5">Menu</span>}
                            </li>
                        <li className="nav-item fw-bold my-4 ps-2">
                            <Link to="/episodes" className="nav-link active">
                                <i className="fa-solid fa-list fs-3"></i>
                                {isSidebarOpen && <span className="ms-2 fs-5">Episodes</span>}
                            </Link>
                        </li>
                        <li className="nav-item fw-bold ps-2 my-4">
                            <Link to="/characters" className="nav-link active">
                                <i className="fa-solid fa-users fs-3"></i>
                                {isSidebarOpen && <span className="ms-2 fs-5">Characters</span>}
                            </Link>
                        </li>
                        <li className="nav-item fw-bold ps-2 my-4">
                            <Link to="/favorites" className="nav-link active">
                                <i className="fa-solid fa-star fs-3"></i>
                                {isSidebarOpen && <span className="ms-2 fs-5">Favorites</span>}
                            </Link>
                        </li>
                        <li className="nav-item fw-bold ps-2 my-4">
                            
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
