import SignOutButton from "@/components/sign-out";
import withAuthGuard from "@/utils/guard";
import { signOut } from "@/app/actions/sign-out";

import "@/app/globals.css";
import { getAuthClient } from "@/utils/nhost";

const getRecipes = `
  {
    recipes {
      id,
      title
    }
  }
`;

const Recipes = async () => {
  const auth = await getAuthClient();
  const { data, _ } = await auth.graphql.request(getRecipes);

  return ( 
    <div className="bg-recipe-tan h-screen w-screen">
      <div className="pl-6">
        <h1 className="text-3xl font-bold text-recipe-orange">MY RECIPES</h1>
        <SignOutButton signOut={signOut}/>
      </div>
      

      <div className="grid grid-cols-4 gap-4 w-screen px-6">
        {data && data.recipes.map((entry) => (
            <div className="text-slate-950 shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-white border-y-recipe-orange" key={entry.id}>
              {entry.title}
            </div>
        ))}
      </div>
      
    </div>
  );
}

export default withAuthGuard(Recipes);