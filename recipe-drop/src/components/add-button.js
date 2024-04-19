'use client';

import "@/app/globals.css";

import { useRouter } from 'next/navigation';


const AddRecipeButton = ({addRecipe}) => {
    const router = useRouter();

    const CreateRecipe = async () => {
        const {id, error} = await addRecipe("", {}, null);

        if (id)
            router.push("/edit/" + id);
    };

    return (
        <button
            className="mx-6 mb-5 bg-transparent hover:bg-recipe-orange text-recipe-orange font-semibold hover:text-recipe-tan py-2 px-4 border border-recipe-orange hover:border-transparent rounded"
            onClick={CreateRecipe}
        >
            Add Recipe
        </button>
    )
};

export default AddRecipeButton;