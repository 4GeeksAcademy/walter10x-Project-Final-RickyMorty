// src/front/js/component/Card.js
import React from "react";
import PropTypes from "prop-types";
import "../../styles/Card.css";

export const Card = ({ image, title, description, onViewDetails, onAddToFavorites }) => {
    return (
        <div className="card">
            <img src={image} className="card-img-top" alt={title} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <div className="button-group">
                    <button className="btn btn-primary" onClick={onViewDetails}>
                        <i className="fas fa-eye"></i> View Details
                    </button>
                    <button className="btn btn-secondary" onClick={onAddToFavorites}>
                        <i className="fas fa-heart"></i> Add to Favorites
                    </button>
                </div>
            </div>
        </div>
    );
};

Card.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onViewDetails: PropTypes.func.isRequired,
    onAddToFavorites: PropTypes.func.isRequired,
};


