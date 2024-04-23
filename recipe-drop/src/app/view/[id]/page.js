import "@/app/globals.css";
import { getAuthClient } from "@/utils/nhost";
import { EditRecipeImage, GetRecipe } from "@/app/actions/recipes";
import withAuthGuard from "@/utils/guard";
import { RedirectType, redirect } from "next/navigation";
import SignOutButton from "@/components/sign-out";
import { signOut } from "@/app/actions/sign-out";
import RecipeCreationForm from "./form";
import Link from 'next/link';


// Define the structure of the edit page. 
const EditPage = async ({params}) => {
    const auth = await getAuthClient();
    const accessToken = auth.auth.getAccessToken();
    const recipeID = params.id;

    // Get the details of the recipe to be edited. 
    const { recipe, error } = await GetRecipe(recipeID);

    // If there is an error or the recipe is not retreived, redirect to recipe view page. 
    if (error || !recipe) {
        redirect("/recipes");
    }

    // If the recipe has an image, get a URL so it can be displayed 
    if (recipe.image) {
        const resp = await auth.storage.getPresignedUrl({fileId: recipe.image});
        if (resp.presignedUrl) {
            recipe.image_url = resp.presignedUrl.url;
        }
    }

    // Define the structure of the recipe view page. 
    return (
        <div className="bg-recipe-tan h-auto min-h-screen w-screen">
            <div className="px-6 flex justify-between py-2">
                <h1 className="text-4xl font-bold text-recipe-orange my-auto">
                    <Link href="/recipes"><i>RECIPE DROP</i></Link>
                </h1>
                <SignOutButton signOut={signOut}/>
            </div>
            <RecipeViewForm recipeID={recipeID} accessToken={accessToken} initialRecipe={recipe}/>
        </div>
        
    )
};

export default withAuthGuard(EditPage);