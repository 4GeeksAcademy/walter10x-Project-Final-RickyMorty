import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Navbar.css";
import araickyMorty from "../../img/RickyMorty.jpeg";

export const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="App">
            <nav className={`navbar bg-body-light ${isSidebarOpen ? "navbar-main-open" : "navbar-main-closed"}`}>
                <div className="container-fluid">
                    <div className={`d-flex align-items-center navbar-content ${isSidebarOpen ? "shifted" : ""}`}>
                        <button
                            className="btn menu-button"
                            type="button"
                            onClick={toggleSidebar}
                        >
                            <i className="fa-solid fa-meteor"> RickyMorty</i>
                        </button>
                    </div>
                </div>
            </nav>
            <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
                <div className="sidebar-header">
                    <img
                        src={araickyMorty}
                        alt="logo-with-name"
                        type="button"
                        className={`${isSidebarOpen ? "logo-sidebar-open" : "logo-sidebar-closed"}`}
                        onClick={() => navigate("/home")}
                    />
                    {isSidebarOpen && (
                        <button
                            type="button"
                            className="btn-close"
                            onClick={toggleSidebar}
                        ></button>
                    )}
                </div>
                <div className="sidebar-body">
                    <ul className="navbar-nav">
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
                    </ul>
                </div>
            </div>
        </div>
    );
};
