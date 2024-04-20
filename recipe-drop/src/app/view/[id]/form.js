'use server';

import "@/app/globals.css";

import Link from 'next/link';

const ImagePreview = ({image_url}) => {
    return (
        <div className="w-full relative p-2 border-2 border-recipe-orange border-solid">
            <div htmlFor="dropzone-file" className={"flex flex-col items-center justify-center cursor-pointebg-recipe-tan w-full aspect-square"}>
                <div className="rounded-md overflow-hidden">
                    {image_url ? 
                        <img src={image_url} className="object-cover w-full aspect-square"/>
                        :
                        <div className="object-cover w-full aspect-square bg-recipe-orange"/>
                    }
                </div>
            </div>
        </div>
    )
}

function getMonthName(monthNumber) {
    const date = new Date()
    date.setMonth(monthNumber);
    return date.toLocaleString('en-EN', { month: "long" })
}


const Step = ({step, index}) => {
    return (
        <div className="py-3">
            <h1><strong>Step {index+1}</strong></h1>
            {step}
        </div>
    )
}

const Ingredient = ({ingredient}) => {
    return (
        <div className="pt-3 w-full">
            {ingredient}
        </div>
    )
}


const ParseTime = (time) => {
    const hours =  Math.floor(time / 60);
    const minutes = time - hours*60;
  
    return {hours, minutes};
  }

const RecipeViewForm = async ({recipeID, initialRecipe}) => {
    let time = <h1></h1>;
    const { hours, minutes } = ParseTime(initialRecipe.details.cooking_minutes);
    
    if (hours > 0 && minutes == 0)
        time = <h1>{hours} {hours == 1 ? "hour" : "hours"}</h1>;
    else if (hours > 0 && minutes > 0)
        time = <h1>{hours} {hours == 1 ? "hour" : "hours"} {minutes} {minutes == 1 ? "minute" : "minutes"}</h1>;
    else if (hours == 0 && minutes > 0)
        time = <h1>{minutes} {minutes == 1 ? "minute" : "minutes"}</h1>;
    
    const date = new Date(JSON.parse(initialRecipe.details.updated_at));
    const ingredients = initialRecipe.details.ingredients;
    const steps = initialRecipe.details.steps;

    return (
        <div>
            <div className="px-[10%] pt-[5%] h-auto w-screen grid grid-cols-1 sm:grid-cols-3">
                <div className="flex flex-cols items-center justify-center w-full ">
                    <ImagePreview image_url={initialRecipe.image_url} />
                </div>
                <div className="col-span-1 sm:col-span-2 w-full flex flex-col items-center justify-center mt-5 sm:mt-0">
                    <h1 className="text-recipe-orange select-text outline-none w-full h-max text-5xl py-2 font-bold relative text-center">{initialRecipe.title}</h1>
                    
                    <div className="bg-recipe-tan text-center relative ml-0 w-full text-2xl text-slate-950">{time}</div>
                    <p className="bg-recipe-tan text-center relative ml-0 w-full text-md text-slate-500">Updated on {getMonthName(date.getMonth())} {date.getDate()}, {date.getFullYear()} </p>
                    
                    <Link href={"/edit/" + recipeID}><p className="bg-recipe-tan text-center relative ml-0 w-full text-md text-recipe-orange underline">edit</p></Link>
                </div>
                
            </div>
            <div className="px-[6%] h-fit min-h-screen w-screen">
                <div className="grid grid-cols-1 sm:grid-cols-3 pb-10">
                    <div className="col-span-1 px-5 mt-10">
                        <hr className="border-recipe-orange" />
                        <h1 className="w-full text-left text-2xl py-3 font-bold text-recipe-orange">INGREDIENTS:</h1>
                        
                        {ingredients.map((ingredient, i) => (
                            <Ingredient ingredient={ingredient} key={"ingredient" + i}/>
                        ))}
                    </div>
                    <div className="col-span-1 sm:col-span-2 px-5 mt-10">
                        <hr className="border-recipe-orange" />
                        <h1 className="w-full text-left text-2xl py-3 font-bold text-recipe-orange">STEPS:</h1>
                        {steps.map((step, i) => (
                            <Step step={step} index={i} key={"step" + i}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipeViewForm;