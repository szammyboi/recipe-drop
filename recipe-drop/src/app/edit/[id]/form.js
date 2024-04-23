'use client';

import "@/app/globals.css";
import { useEffect, useState } from "react";

import ClientSideNhost from "@/utils/client-nhost";
import { DeleteRecipe, EditRecipe, EditRecipeDetails, EditRecipeImage, EditRecipeTitle } from "@/app/actions/recipes";
import { useRouter } from "next/navigation";
import { PlusSymbol } from "@/components/graphics";

// Defines the drag and drop/select box for modifying a recipe's image or adding a new one. 
const UploadSVG = ({hovered}) => {
    return (
        <div className="flex flex-col items-center justify-center pt-5 pb-6 m-2">
            <svg className={"w-8 h-8 mb-4" + (hovered ? " text-recipe-tan" : " text-recipe-orange")} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16" style={{transition: "color 0.2s ease-in-out"}}>
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className={"mb-2 text-sm" + (hovered ? " text-recipe-tan" : " text-recipe-orange")} style={{transition: "color 0.2s ease-in-out"}}><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className={"text-xs" + (hovered ? " text-recipe-tan" : " text-recipe-orange")} style={{transition: "color 0.2s ease-in-out"}}>PNG or JPG</p>
        </div>
    )
};

// Defines the image display that shows an image on the edit screen. 
const ImagePreview = ({image_url}) => {
    return (
        <div className="rounded-md overflow-hidden">
            <img src={image_url} className="object-cover w-full aspect-square"/>
        </div>
    );
};

// Uploads an image to the server. 
const ImageUpload = ({initial, imageCallback}) => {
    let [image_url, setImage] = useState(initial ? initial : null);
    let [hovered, setHovered] = useState(false);

    const onUpload = async (e) => {
        e.preventDefault();

        const [file] = e.target.files;
        
        if (file) {
            setImage(URL.createObjectURL(file));

            ClientSideNhost.storage.upload({file: file}).then((res) => {
                imageCallback(res.fileMetadata.id);
            });
        }
    };
    
    // Define the structure of the integrated system that previews an image and displays the upload image box.
    return (
        <div className="w-full relative p-2 border-2 border-recipe-orange border-dashed cursor-pointer" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <label  htmlFor="dropzone-file" className={"flex flex-col items-center justify-center cursor-pointer" + ((hovered && image_url == null) ?  " bg-recipe-orange " : " bg-recipe-tan ") +  "w-full aspect-square"} style={{transition: "background-color 0.15s ease-in-out"}}>
                {image_url ? <ImagePreview image_url={image_url}/> : <UploadSVG hovered={hovered} />}
                <input id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={onUpload} />
            </label>
        </div>
    )
}

// Retreive a month name for a given number out of 12. 
function getMonthName(monthNumber) {
    const date = new Date()
    date.setMonth(monthNumber) // starts with 0, so 0 is January
    return date.toLocaleString('en-EN', { month: "long" })
}

// Define a custom text entry box. 
const CustomTextEntry = ({initial, placeholder, textCallback, color, styling}) => {
    const [text, setText] = useState(initial ? initial : placeholder);

    // When the text is focused, and nothign is in it, show empty string. When text is being typed, show that text. 
    const onFocus = (e) => {
        if (e.target.textContent == placeholder)
            e.target.textContent = "";
        setText(e.target.textContent);
        textCallback(e.target.textContent);
    };

    // When there is no text and it is not being edited, show the placeholder text. 
    const onBlur = (e) => {
        if (e.target.textContent == "")
            e.target.textContent = placeholder;
        setText(e.target.textContent);
        textCallback(e.target.textContent);
    }

    // If the user tries to enter a newline, prevent it. 
    const onInput = (e) => {
        if (e.nativeEvent.data == '\n')
            e.preventDefault();
    }

    // Define the structcure of this text entry system. 
    return (
        <div
            className={"select-text outline-none w-full h-max text-4xl py-2 font-bold relative ml-0 "
            + (text != placeholder ? " " + color + " " : " text-slate-400 ") + styling}
            contentEditable="true"
            suppressContentEditableWarning={true}
            onFocus={onFocus}
            onTouchStart={onFocus}
            onBlur={onBlur}
            onTouchCancel={onBlur}
            onTouchMove={onBlur} 
            onBeforeInput={onInput}
        >
            {initial ? initial : placeholder}
        </div>
    )
}

// Define a custom number entry system. 
const CustomNumberEntry = ({initial, numberCallback}) => {
    const [hours, setHours] = useState(Math.floor(initial / 60));
    const [minutes, setMinutes] = useState(initial % 60);

    // Display the correct time, or zero if no time has been entered. 
    useEffect(() => {
        if (hours != null || minutes != null) {
            const totalTime = (Number(hours) ? Number(hours) : 0) * 60 + (Number(minutes) ? Number(minutes) : 0);
            numberCallback(totalTime);
        }
    }, [hours, minutes]);
    
    // Define the structure of the custom number entry system for the time, modifying hours and minutes where necessary. 
    return (
        <div className="w-full h-fit ml-0  flex flex-col items-center justify-center text-xl text-slate-700">
            <div>
                <div className={"inline  w-fit"}>
                    Total time: 
                </div>
                <input value={hours} onChange={(e) => setHours(e.target.value)} className="h-fit inline w-12 text-center text-gray-700 text-lg mb-4 mx-1 appearance-none border-b border-slate-950 hover:border-recipe-orange focus:border-recipe-orange focus:outline-none rounded-none bg-recipe-tan" placeholder="0" type="number"/>
                <div className="inline  w-fit">
                    {hours == 1 ? "hour" : "hours"}
                </div>
                <input value={minutes} onChange={(e) => setMinutes(e.target.value)} className="h-fit inline w-12 text-center text-gray-700 text-lg mb-4 mx-1 border-b border-slate-950 hover:border-recipe-orange focus:border-recipe-orange focus:outline-none rounded-none bg-recipe-tan appearance-none" placeholder="0" type="number"/>
                <div className="inline  w-fit">
                    {minutes == 1 ? "minute" : "minutes"}
                </div>
            </div>
        </div>
    )
}

// Define the behavior of a displayed step. 
const Step = ({step, steps, setSteps, index}) => {

    // Allow a user to modify the text of a step. 
    const UpdateText = (updatedText) => {
         const newSteps = [...steps];
         newSteps[index] = updatedText;
         setSteps(newSteps);
    };

    // Define the structure of a displayed step. 
    return (
        <div className="py-3">
            <h1><strong>Step {index+1}</strong></h1>
            <CustomTextEntry initial={step} color="text-black" styling="text-left text-sm font-normal " placeholder="..." textCallback={UpdateText}/>
        </div>
    )
}

// Define the behavior of a displayed ingredient. 
const Ingredient = ({ingredient, ingredients, setIngredients, index}) => {
    const [text, setText] = useState(ingredient);

    // Allow a user to modify the text of an ingredient. 
    const UpdateText = (updatedText) => {
        setText(updatedText);

        const newIngredients = [...ingredients];
        newIngredients[index] = updatedText;
        setIngredients(newIngredients);
   };

   // Define the structure of a displayed ingredient. 
    return (
        <div className="pt-3 w-full">
            <input value={text} onChange={(e) => UpdateText(e.target.value)} className="h-fit inline w-full text-left text-gray-700 text-md mb-4 appearance-none border-b border-slate-950 hover:border-recipe-orange focus:border-recipe-orange focus:outline-none rounded-none bg-recipe-tan" placeholder="NEW INGREDIENT" type="text"/>
        </div>
    )
}


// Define the behavior of the recipe creation form. 
const RecipeCreationForm = ({recipeID, accessToken, initialRecipe}) => {
    const router = useRouter();
    
    const [ingredients, setIngredients] = useState(initialRecipe.details.ingredients ? initialRecipe.details.ingredients : []);
    const [steps, setSteps] = useState(initialRecipe.details.steps ? initialRecipe.details.steps : []);
    const [totalTime, setTotalTime] = useState(initialRecipe.details.cooking_minutes);
    const [date, setDate] = useState(initialRecipe.details.updated_at ? new Date(JSON.parse(initialRecipe.details.updated_at)) : new Date());
    const [imageID, setImageID] = useState(initialRecipe.image ? initialRecipe.image : null);
    const [title, setTitle] = useState();

    ClientSideNhost.storage.setAccessToken(accessToken);
    
    // Allow a user to save changes to a recipe. 
    const Save = async () => {
        EditRecipeTitle(recipeID, title);

        initialRecipe.details.updated_at = JSON.stringify(new Date());
        initialRecipe.details.cooking_minutes = totalTime;
        initialRecipe.details.steps = steps;
        initialRecipe.details.ingredients = ingredients;
        EditRecipeDetails(recipeID, initialRecipe.details);
        setDate(new Date());
    }

    // Allow a user to delete a recipe, then redirect to recipe view page 
    const Delete = async () => {
        DeleteRecipe(recipeID);
        router.push("/recipes");
    };

    // Allow a user to add new ingredients to the list. 
    const NewIngredient = () => {
        const newIngredients = [...ingredients];
        newIngredients.push("");

        setIngredients(newIngredients);
    };

    // Allow a user to add new steps to the list. 
    const NewStep = () => {
        const newSteps = [...steps];
        newSteps.push("");

        setSteps(newSteps);
    };

    // If the old image does not match the current image, update the recipe image. 
    useEffect(() => {
        if (imageID != initialRecipe.image) {
            EditRecipeImage(recipeID, imageID);
        }
    }, [imageID])

    // Define the structure of the displayed recipe creation form, fully enabling edits and changes to all aspects of a recipe's attributes. 
    return (
        <div>
        <div className="px-[10%] pt-[5%] h-auto w-screen grid grid-cols-1 sm:grid-cols-3">
            <div className="flex flex-cols items-center justify-center w-full ">
                <ImageUpload initial={initialRecipe.image ? initialRecipe.image_url : null} imageCallback={setImageID}/>
            </div>
            <div className="col-span-1 sm:col-span-2 w-full flex flex-col items-center justify-center mt-5 sm:mt-0">
                <CustomTextEntry styling="text-center" color="text-recipe-orange" initial={initialRecipe.title} placeholder={"Untitled Recipe"} textCallback={setTitle} />
                
                <CustomNumberEntry initial={totalTime} numberCallback={setTotalTime}/>
            </div>

            <div style={{position: "fixed", left: "0px", bottom: "2vh"}} className="w-full flex flex-row items-center justify-center">
                <button 
                    className="bg-recipe-tan hover:bg-recipe-orange text-recipe-orange font-semibold hover:text-recipe-tan py-2 px-4 border border-recipe-orange hover:border-transparent rounded mx-2"
                    onClick={Save}
                >
                    Save
                </button>
                <button 
                    className="bg-recipe-tan hover:bg-recipe-orange text-recipe-orange font-semibold hover:text-recipe-tan py-2 px-4 border border-recipe-orange hover:border-transparent rounded mx-2"
                    onClick={Delete}
                >
                    Delete
                </button>
            </div>
            
        </div>
        <div className="px-[6%] h-screen w-screen">
            <div className="grid grid-cols-1 sm:grid-cols-3">
                <div className="col-span-1 px-5 mt-10">
                    <hr className="border-recipe-orange" />
                    <h1 className="w-full text-left text-2xl py-3 font-bold text-recipe-orange">INGREDIENTS:</h1>
                    
                    {ingredients.map((ingredient, i) => (
                        <Ingredient ingredient={ingredient} ingredients={ingredients} setIngredients={setIngredients} index={i} key={"ingredient" + i}/>
                    ))}
                    
                    <div className="py-3 cursor-pointer" onClick={NewIngredient}>
                        <PlusSymbol width="1rem" height="1rem" />
                    </div>
                </div>
                <div className="col-span-1 sm:col-span-2 px-5 mt-10">
                    <hr className="border-recipe-orange" />
                    <h1 className="w-full text-left text-2xl py-3 font-bold text-recipe-orange">STEPS:</h1>
                    {steps.map((step, i) => (
                        <Step step={step} index={i} steps={steps} setSteps={setSteps} key={"step" + i}/>
                    ))}
                    <div className="py-3 cursor-pointer" onClick={NewStep}>
                        <PlusSymbol width="1rem" height="1rem" />
                    </div>
                </div>
            </div>
        
        </div>
        </div>
    );
}

export default RecipeCreationForm;