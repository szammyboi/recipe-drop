import SignOutButton from "@/components/sign-out";
import withAuthGuard from "@/utils/guard";
import { signOut } from "@/utils/sign-out";

import "@/app/globals.css";

const Recipes = async () => {
  return ( 
    <div className="bg-recipe-tan h-screen w-screen">
      <h1 className="text-3xl font-bold text-recipe-orange">MY RECIPES</h1>
      <SignOutButton signOut={signOut}/>
    </div>
  );
}

export default withAuthGuard(Recipes);