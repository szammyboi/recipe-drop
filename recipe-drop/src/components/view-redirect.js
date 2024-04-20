'use client';

import "@/app/globals.css";
import { useRouter } from "next/navigation";

// Define view recipe button on recipe cards.
const ViewRecipeRedirectButton = ({uuid}) => {
    const router = useRouter();

    const handleViewRecipe = () => {
        router.push(`/${String(uuid)}`)
    };

    // Define button component, and route to recipe view URL on click. 
    return (
        <button 
            className="ml-2 my-5 bg-transparent hover:bg-recipe-orange text-recipe-orange font-semibold hover:text-recipe-tan py-2 px-4 border border-recipe-orange hover:border-transparent rounded"
            onClick={handleViewRecipe}
        >
            View Recipe
        </button>
    )
};

export default ViewRecipeRedirectButton;