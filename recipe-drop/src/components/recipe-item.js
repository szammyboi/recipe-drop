import ViewRecipeRedirectButton from "@/components/view-redirect";
import RecipeDetailsModal from "@/components/recipe-details-modal";
import React, { useState } from 'react';


const ParseTime = (time) => {
  const hours =  Math.floor(time / 60);
  const minutes = time - hours*60;

  return {hours, minutes};
}

const RecipeItem = async ({entry,random}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let time;
  const { hours, minutes } = ParseTime(entry.details.cooking_minutes);

  let image_url = "https://picsum.photos/1280/700?random=" + random ;

  const handleRecipeClick = () => {
    setIsModalOpen(true);
  };

  if (hours > 0 && minutes == 0)
    time = <h1>{hours} {hours == 1 ? "hour" : "hours"}</h1>
  else if (hours > 0 && minutes > 0)
    time = <h1>{hours} {hours == 1 ? "hour" : "hours"} {minutes} {minutes == 1 ? "minute" : "minutes"}</h1>
  else if (hours == 0 && minutes > 0)
    time = <h1>{minutes} {minutes == 1 ? "minute" : "minutes"}</h1>

  return (
    <div className="overflow-hidden relative border-solid border border-recipe-orange p-4">
        <img src={image_url} className="w-full h-48 object-cover rounded-md"/>
        
        <div className="rounded-b-md border-t border-solid border-recipe-orange mt-4 h-28">
          <div className=" flex flex-col justify-evenly h-full">
          <span className="font-bold text-recipe-orange text-xl">{entry.title}</span>
          <span className="block text-gray-500 text-sm">{time}</span>
          <div className="flex items-center justify-between">
          <ViewRecipeRedirectButton uuid={entry.id}/>
          </div>
          </div>
        </div>
        {isModalOpen && <RecipeDetailsModal recipe={entry} onClose={() =>setIsModalOpen(false)} />}
    </div>

  )
}

export default RecipeItem;