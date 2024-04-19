'use client';

import SignOutButton from "@/components/sign-out";
import withAuthGuard from "@/utils/guard"
import { signOut } from "@/app/actions/sign-out";

import "@/app/globals.css";
import { useRouter } from 'next/navigation';
import { getAuthClient } from "@/utils/nhost";

// Define the page that shows recipe details. 
const RecipeViewPage = async () => {
    // Get ID from router
    const router = useRouter();
    const { recipeId } = router.query;

    // Get the details for the selected recipe. 
    const auth = await getAuthClient();
    const { recipeInfo, _ } = await auth.graphql.request(`
    {
        recipes(where: {id: {_eq: "${recipeId}}}){ 
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

export default RecipeViewPage;