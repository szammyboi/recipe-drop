import SignOutButton from "@/components/sign-out";
import withAuthGuard from "@/utils/guard";
import { signOut } from "@/app/actions/sign-out";

import React, { useState } from 'react';
import "@/app/globals.css";
import { getAuthClient } from "@/utils/nhost";
import RecipeItem from "@/components/recipe-item";

const getRecipes = `
  {
    recipes {
      id,
      title,
      details
    }
  }
`;

const Recipes = async () => {
  const auth = await getAuthClient();
  const { data, _ } = await auth.graphql.request(getRecipes);

  return ( 
    <div className="bg-recipe-tan h-auto min-h-screen w-screen">
      <div className="px-6 flex justify-between py-2">
        <h1 className="text-4xl font-bold text-recipe-orange my-auto"><i>RECIPE DROP</i></h1>
        <SignOutButton signOut={signOut}/>
      </div>
      

      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-screen px-6 pb-6 no-scrollbar">
        {data && data.recipes.map((entry, index) => (
          <RecipeItem entry={entry} key={entry.id} random={index}/>
        ))}
      </div>
      
    </div>
  );
}

export default withAuthGuard(Recipes);


/*
{data && data.recipes.map((entry) => (
            <div className="text-slate-950 shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-white border-y-recipe-orange" key={entry.id}>
              {entry.title}
              <br />
              {entry.steps.cooking_time >= 60 && GetHours(entry.steps.cooking_time)}
            </div>
        ))}
*/

/*

<div className="shadow-md rounded mb-4 p-1 bg-white border-y-recipe-orange h-80 flex-grow-0 overflow-clip">
      <div className="w-auto overflow-clip h-45">
       <img src={image_url} className="object-cover w-full"/>
      </div>
      
      <div className="text-slate-950 bg-recipe-orange flex-grow">
        <strong>{entry.title}</strong>
        {time}
      </div>
      
    </div>

    */