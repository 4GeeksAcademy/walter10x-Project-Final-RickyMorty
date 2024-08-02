import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/Card.css'; // Asegúrate de tener los estilos para la card

export const Card = ({ image, title, description, onViewDetails, onAddToFavorites, onRemoveFromFavorites, isFavorite }) => {
    return (
        <div className="card">
            <img src={image} className="card-img-top" alt={title} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <div className="card-actions">
                    <button onClick={onViewDetails} className="btn btn-primary">View Details</button>
                    {isFavorite ? (
                        <button onClick={onRemoveFromFavorites} className="btn btn-danger">Remove from Favorites</button>
                    ) : (
                        <button onClick={onAddToFavorites} className="btn btn-secondary">Add to Favorites</button>
                    )}
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
    onRemoveFromFavorites: PropTypes.func.isRequired,
    isFavorite: PropTypes.bool.isRequired
};
