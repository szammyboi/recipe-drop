'use client'

import Modal from 'react-modal';
import React, { useState } from 'react';

export const ViewRecipeButton = (entry) => {
    const [ isOpen, setIsOpen ] = useState(false);

    const handleOpenClick = () => {
        setIsOpen(true);
    }

    const handleCloseClick = () => {
        setIsOpen(false);
    }

    const customStyling = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)'
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            botton: 'auto',
            marginRight: '50%',
            transform: 'translate(-50%, -50%)'
        }
    }

    return (
        <div>
            <button className="my-5 bg-transparent hover:bg-recipe-orange text-recipe-orange font-semibold hover:text-recipe-tan py-2 px-4 border border-recipe-orange hover:border-transparent rounded"
            onClick = {() => setIsOpen(true)}>
                View Recipe
            </button>
            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyling}>
                Recipe Info!
                <button className="my-5 bg-transparent hover:bg-recipe-orange text-recipe-orange font-semibold hover:text-recipe-tan py-2 px-4 border border-recipe-orange hover:border-transparent rounded" 
                onClick={handleCloseClick}>
                    Close Recipe
                </button>
            </Modal>
        </div>
    )
}

export default ViewRecipeButton;