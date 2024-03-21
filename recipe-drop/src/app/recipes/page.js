import SignOutButton from "@/components/sign-out";
import withAuthGuard from "@/utils/guard";
import { signOut } from "@/app/actions/sign-out";

import "@/app/globals.css";
import { getAuthClient } from "@/utils/nhost";

const getRecipes = `
  {
    recipes {
      id,
      title,
      steps
    }
  }
`;

const ParseTime = (time) => {
  const hours =  Math.floor(time / 60);
  const minutes = time - hours*60;

  return {hours, minutes};
}

const RecipeItem = async ({entry}) => {
  let time;
  const { hours, minutes } = ParseTime(entry.steps.cooking_minutes);

  const image_url = "https://static01.nyt.com/images/2024/03/08/multimedia/08BROWN-BREADrex-pglc/13BROWN-BREADrex-pglc-mediumThreeByTwo440.jpg?w=1280&q=75";

  if (hours > 0 && minutes == 0)
    time = <h1>{hours} {hours == 1 ? "hour" : "hours"}</h1>
  else if (hours > 0 && minutes > 0)
    time = <h1>{hours} {hours == 1 ? "hour" : "hours"} {minutes} {minutes == 1 ? "minute" : "minutes"}</h1>
  else if (hours == 0 && minutes > 0)
    time = <h1>{minutes} {minutes == 1 ? "minute" : "minutes"}</h1>

  return (
    <div className="rounded-md border-gray-200 shadow-md overflow-hidden relative">
        <img src={image_url} className="w-full h-48 object-cover"/>
        <div className="mx-6 mt-4 h-20 mb-4 flex flex-col justify-evenly">
          <span className="font-bold">{entry.title}</span>
          <span className="block text-gray-500 text-sm">{time}</span>
        </div>
    </div>
  )
}

const Recipes = async () => {
  const auth = await getAuthClient();
  const { data, _ } = await auth.graphql.request(getRecipes);

  return ( 
    <div className="bg-recipe-tan h-auto min-h-screen w-screen">
      <div className="px-6 flex justify-between">
        <h1 className="text-3xl font-bold text-recipe-orange my-auto">MY RECIPES</h1>
        <SignOutButton signOut={signOut}/>
      </div>
      

      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-screen px-6 no-scrollbar">
        {data && data.recipes.map((entry) => (
          <RecipeItem entry={entry} key={entry.id}/>
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