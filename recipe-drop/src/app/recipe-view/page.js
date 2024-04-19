import SignOutButton from "@/components/sign-out";
import withAuthGuard from "@/utils/guard"
import { signOut } from "@/app/actions/sign-out";

import "@/app/globals.css";
//import { useRouter } from 'next/navigation';
//import { fetchRecipes } from "@/app/actions/fetch-recipes";
import { getAuthClient } from "@/utils/nhost";
import { getUUID } from "../actions/get-uuid";


// Define the page that shows recipe details. 
const RecipeViewBlock = async () => {

    const recipeID = await getUUID.toString;

    const auth = await getAuthClient();
    const { recipeInfo, _ } = await auth.graphql.request(`
    {
        recipes(where: {id: {_eq: "${recipeID}}}){ 
            id,
            title,
            steps,
            ingredients
        }   
    }
    `);


    // Define component to be displayed. 
    return (
    <div className="bg-recipe-tan h-auto min-h-screen w-screen">
        <div className="px-6 flex justify-between py-2">
        <h1 className="text-4xl font-bold text-recipe-orange my-auto"><i>RECIPE DROP</i></h1>
        <SignOutButton signOut={signOut}/>
        </div>
        
        
        <div>
            {recipeInfo && recipeInfo.map((entry, index) => (
                <h1>{entry}</h1>
            ))}
            
        </div>
    </div>
    );
    // TODO: add back button?? router.back()
};

export default withAuthGuard(RecipeViewBlock);

/*
this is terrible
<h1>{recipe.title}</h1>
            <h2>Steps:</h2>
            <ul>
                {recipeInfo.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ul>
            <h2>Ingredients:</h2>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
*/