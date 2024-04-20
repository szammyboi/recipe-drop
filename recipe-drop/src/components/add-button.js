'use client';

import "@/app/globals.css";

import { useRouter } from 'next/navigation';
import { NewRecipe } from "@/app/actions/recipes";
import { PlusSymbol } from "./graphics";

const CreateRecipe = async (router) => {
    const {id, error} = await NewRecipe("", {}, null);

    if (id)
        router.push("/edit/" + id);
};

export const AddRecipeButton = () => {
    const router = useRouter();

    return (
        <button
            className="mx-6 mb-5 bg-transparent hover:bg-recipe-orange text-recipe-orange font-semibold hover:text-recipe-tan py-2 px-4 border border-recipe-orange hover:border-transparent rounded"
            onClick={() => CreateRecipe(router)}
        >
            Add Recipe
        </button>
    )
};

export const AddRecipeCard= () => {
    const router = useRouter();

    return (
        <div className="cursor-pointer overflow-hidden relative border-solid border border-recipe-orange p-4" onClick={() => CreateRecipe(router)}>
            <div className="w-full h-fit rounded-md bg-recipe-tan border-solid border border-recipe-orange flex flex-col items-center justify-center">
                <PlusSymbol className="text-recipe-orange p-5" width="4.5rem" height="4.5rem"/>
            </div>
        </div>
    )
};