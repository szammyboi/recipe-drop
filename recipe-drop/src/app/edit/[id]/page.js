import "@/app/globals.css";
import { getAuthClient } from "@/utils/nhost";
import { EditRecipeImage, GetRecipe } from "@/app/actions/recipes";
import withAuthGuard from "@/utils/guard";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/sign-out";
import { signOut } from "@/app/actions/sign-out";
import RecipeCreationForm from "./form";
import Link from 'next/link';



const EditPage = async ({params}) => {
    const auth = await getAuthClient();
    const accessToken = auth.auth.getAccessToken();
    const recipeID = params.id;

    const { recipe, error } = await GetRecipe(recipeID);

    if (error || !recipe) {
        redirect("/recipes");
    }

    if (recipe.image) {
        const resp = await auth.storage.getPresignedUrl({fileId: recipe.image});
        if (resp.presignedUrl) {
            recipe.image_url = resp.presignedUrl.url;
        }
    }

    return (
        <div className="bg-recipe-tan h-auto min-h-screen w-screen">
            <div className="px-6 flex justify-between py-2">
                <Link href="/">
                    <h1 className="text-4xl font-bold text-recipe-orange my-auto">
                        <i>RECIPE DROP</i>
                    </h1>
                </Link>
                <SignOutButton signOut={signOut}/>
            </div>
            <RecipeCreationForm recipeID={recipeID} accessToken={accessToken} initialRecipe={recipe}/>
        </div>
        
    )
};

export default withAuthGuard(EditPage);