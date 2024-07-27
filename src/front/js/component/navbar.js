// src/front/js/component/navbar.js
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/Navbar.css";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = () => {
        actions.logout();
        navigate("/login");
    };

    return (
        <div className="App">
            <nav className={`navbar ${isSidebarOpen ? "navbar-main-open" : "navbar-main-closed"}`}>
                <div className="container-fluid">
                    <div className={`d-flex align-items-center navbar-content ${isSidebarOpen ? "shifted" : ""}`}>
                        {/* Other navbar content */}
                    </div>
                </div>
            </nav>
            <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
                <div className="sidebar-header">
                    {/* Sidebar header content */}
                </div>
                <div className="sidebar-body">
                    <ul className="navbar-nav">
                        <li className="colorido" type="button" onClick={toggleSidebar}>
                            <i className="nav-item fw-bold my-4 ps-2 fa-solid fa-bars fs-3 ms-2 fs-5" aria-hidden="true"></i>
                            {isSidebarOpen && <span className="ms-2 fs-5">Menu</span>}
                        </li>
                        <li className="nav-item fw-bold my-4 ps-2">
                            <Link to="/profile" className="nav-link active">
                                <i className="fa-solid fa-user fs-3"></i>
                                {isSidebarOpen && <span className="ms-2 fs-5">Profile</span>}
                            </Link>
                        </li>
                        <li className="nav-item fw-bold my-4 ps-2">
                            <Link to="/episodes" className="nav-link active">
                                <i className="fa-solid fa-film fs-3"></i>
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
                            <Link to="/locations" className="nav-link active">
                                <i className="fa-solid fa-map-marker-alt fs-3"></i>
                                {isSidebarOpen && <span className="ms-2 fs-5">Locations</span>}
                            </Link>
                        </li>
                        {store.auth ? (
                            <li className="nav-item fw-bold ps-2 my-4">
                                <button onClick={handleLogout} className="nav-link active">
                                    <i className="fa-solid fa-sign-out-alt fs-3"></i>
                                    {isSidebarOpen && <span className="ms-2 fs-5">Logout</span>}
                                </button>
                            </li>
                        ) : (
                            <li className="nav-item fw-bold ps-2 my-4">
                                <Link to="/login" className="nav-link active">
                                    <i className="fa-solid fa-sign-in-alt fs-3"></i>
                                    {isSidebarOpen && <span className="ms-2 fs-5">Login</span>}
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};
