'use client';

import "@/app/globals.css";
import { RECIPE_PAGE_URL } from "@/routes";
import withAuthAsync from "@/utils/guard";
import { useRouter } from "next/navigation";


// Define button to redirect back to recipes page. 
/*
const BackButton = () => {
    const router = useRouter();

    // Define function to handle button click and redirect back to recipes page.
    const handleGoBack = () => {
        router.push(RECIPE_PAGE_URL);
    }
    
    // Define button component to route back to recipes page.
    return (
        <button
            className="bg-transparent hover:bg-recipe-orange text-recipe-orange font-semibold hover:text-recipe-tan py-2 px-4 border border-recipe-orange hover:border-transparent rounded"
            onClick={handleGoBack}
        >
            Go Back
        </button>
    )
}

export default withAuthAsync(BackButton);*/