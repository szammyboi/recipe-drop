import React from 'react';

const RecipeDetailsModal = ({ recipe, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>Close</button>
        <h2>{recipe.title}</h2>
        <p>{recipe.details}</p>
        {/* Add more details as needed */}
      </div>
    </div>
  );
};

export default RecipeDetailsModal;