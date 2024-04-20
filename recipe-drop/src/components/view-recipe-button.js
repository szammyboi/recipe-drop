'use client';

import Modal from 'react-modal';
import React, { useState } from 'react';

const ParseTime = (time) => {
    const hours =  Math.floor(time / 60);
    const minutes = time - hours*60;
  
    return {hours, minutes};
  }

// Define button to open modal. 
export const ViewRecipeButton = ( entry, image_url ) => {

    const [ isOpen, setIsOpen ] = useState(false);

    // This is used for easier recipe field access. 
    const viewEntry = entry.entry;

    // Format time into readable format. 
    let time;
    const { hours, minutes } = ParseTime(viewEntry.details.cooking_minutes);

    if (hours > 0 && minutes == 0)
        time = <h1>{hours} {hours == 1 ? "hour" : "hours"}</h1>
    else if (hours > 0 && minutes > 0)
        time = <h1>{hours} {hours == 1 ? "hour" : "hours"} {minutes} {minutes == 1 ? "minute" : "minutes"}</h1>
    else if (hours == 0 && minutes > 0)
        time = <h1>{minutes} {minutes == 1 ? "minute" : "minutes"}</h1>


    const customStyling = {
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.6)'
        },
        content: {
          top: '10%',
          left: '20%',
          right: '10%',
          bottom: '10%', 
          transform: 'none',
          padding: '20px', 
          borderRadius: '10px', 
          width: '60%', 
          height: '80%', 
          overflow: 'auto' 
        }
    };
    
    console.log("image url: ", image_url);

    // Format steps.
    let stepOutput;
    if (viewEntry.details.steps){
        stepOutput = <ul>{viewEntry.details.steps.map((step, index) => (<li key={index}>{index + 1}: {step}</li>))}</ul>
    }
    else {
        stepOutput = "No Steps!"
    }

    // Format ingredients.
    let ingredientOutput;
    if (viewEntry.details.ingredients){
        ingredientOutput = <ul>{viewEntry.details.ingredients.map((ingredient, index) => (<li key={index}>{index + 1}: {ingredient}</li>))}</ul>
    }
    else{ 
        ingredientOutput = "No Ingredients!"
    }

    // Modal structure.
    return (
        <div>
            <button className="my-5 bg-transparent hover:bg-recipe-orange text-recipe-orange font-semibold hover:text-recipe-tan py-2 px-4 border border-recipe-orange hover:border-transparent rounded"
            onClick = {() => setIsOpen(true)}>
                View Recipe
            </button>
            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyling}>
                <div className="overflow-hidden relative border-solid border border-recipe-orange p-4">
                    <div className="w-full text-left text-2xl py-3 font-bold text-recipe-orange">{viewEntry.title}</div>
                    <div className="w-full text-left text-xl font-bold py-2 text-recipe-orange">Preparation Time: </div>
                    <h1 className="w-full text-left text-xl py-1 text-recipe-orange">{time}</h1>

                    {viewEntry.image != null ?
                        <img src={image_url} className="w-48 rounded-md"/>
                        :
                        <div className="w-full h-48 rounded-md bg-recipe-orange"/>
                    }

                    <p>Steps: {stepOutput}</p>
                    <p>Ingredients: {ingredientOutput}</p>
                </div>
                <button className="my-5 bg-transparent hover:bg-recipe-orange text-recipe-orange font-semibold hover:text-recipe-tan py-2 px-4 border border-recipe-orange hover:border-transparent rounded" 
                    onClick={() => setIsOpen(false)} style={{position: 'absolute', bottom: '20px', left: '20px'}}>
                        Close Recipe
                </button>
            </Modal>
        </div>
    )
}

export default ViewRecipeButton;