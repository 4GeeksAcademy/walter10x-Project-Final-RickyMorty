import React from "react";
import PropTypes from "prop-types";
import "../../styles/Card.css";

export const Card = ({ image, title, description, onViewDetails, onAddToFavorites, onRemoveFromFavorites, isFavorite }) => {
    return (
        <div className="card">
            <img src={image} className="card-img-top" alt={title} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <button className="btn btn-primary" onClick={onViewDetails}>View Details</button>
                {isFavorite ? (
                    <button className="btn btn-danger" onClick={onRemoveFromFavorites}>Remove from Favorites</button>
                ) : (
                    <button className="btn btn-secondary" onClick={onAddToFavorites}>Add to Favorites</button>
                )}
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
    onRemoveFromFavorites: PropTypes.func.isRequired,
    isFavorite: PropTypes.bool.isRequired,
};
