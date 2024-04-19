'use client';

import "@/app/globals.css";
import { createRef, useEffect, useState } from "react";

import ClientSideNhost from "@/utils/client-nhost";
import { EditRecipe, EditRecipeDetails, EditRecipeImage, EditRecipeTitle } from "@/app/actions/recipes";

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

const ImagePreview = ({image_url}) => {
    return (
        <div className="rounded-md overflow-hidden">
            <img src={image_url} className="object-cover w-full aspect-square"/>
        </div>
    );
};

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
    
    return (
        <div className="w-full relative p-2 border-2 border-recipe-orange border-dashed cursor-pointer" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <label  htmlFor="dropzone-file" className={"flex flex-col items-center justify-center cursor-pointer" + ((hovered && image_url == null) ?  " bg-recipe-orange " : " bg-recipe-tan ") +  "w-full aspect-square"} style={{transition: "background-color 0.15s ease-in-out"}}>
                {image_url ? <ImagePreview image_url={image_url}/> : <UploadSVG hovered={hovered} />}
                <input id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={onUpload} />
            </label>
        </div>
    )
}

function getMonthName(monthNumber) {
    const date = new Date()
    date.setMonth(monthNumber) // starts with 0, so 0 is January
    return date.toLocaleString('en-EN', { month: "long" })
}

const CustomTextEntry = ({initial, placeholder, textCallback}) => {
    const [text, setText] = useState(initial ? initial : placeholder);

    const onFocus = (e) => {
        if (e.target.textContent == placeholder)
            e.target.textContent = "";
        setText(e.target.textContent);
        textCallback(e.target.textContent);
    };

    const onBlur = (e) => {
        if (e.target.textContent == "")
            e.target.textContent = placeholder;
        setText(e.target.textContent);
        textCallback(e.target.textContent);
    }

    const onInput = (e) => {
        if (e.nativeEvent.data == '\n')
            e.preventDefault();
    }

    return (
        <div
            className={"select-text text-center sm:text-left outline-none w-full h-max text-4xl py-2 font-bold relative ml-0 sm:ml-10 "
            + (text != placeholder ? " text-recipe-orange" : " text-slate-400")}
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

const RecipeCreationForm = ({recipeID, accessToken, initialRecipe}) => {
    const [date, setDate] = useState(initialRecipe.details.updated_at ? new Date(JSON.parse(initialRecipe.details.updated_at)) : new Date());
    const [imageID, setImageID] = useState(initialRecipe.image ? initialRecipe.image : null);
    const [title, setTitle] = useState();

    ClientSideNhost.storage.setAccessToken(accessToken);
    
    const Save = async () => {
        EditRecipeTitle(recipeID, title);

        initialRecipe.details.updated_at = JSON.stringify(new Date());
        EditRecipeDetails(recipeID, initialRecipe.details);
        setDate(new Date());
    }

    useEffect(() => {
        if (imageID != initialRecipe.image) {
            EditRecipeImage(recipeID, imageID);
        }
    }, [imageID])

    return (
        <div>
        <div className="px-[10%] pt-[5%] h-auto w-screen grid grid-cols-1 sm:grid-cols-3">
            <div className="flex flex-cols items-center justify-center w-full ">
                <ImageUpload initial={initialRecipe.image ? initialRecipe.image_url : null} imageCallback={setImageID}/>
            </div>
            <div className="col-span-1 sm:col-span-2 w-full flex flex-col items-center justify-center mt-5 sm:mt-0">
                <CustomTextEntry initial={initialRecipe.title} placeholder={"Untitled Recipe"} textCallback={setTitle} />
                <p className="appearance-none bg-recipe-tan text-center sm:text-left relative ml-0 sm:ml-10 w-full text-2xl font-bold text-slate-400">Updated on {getMonthName(date.getMonth())} {date.getDate()}, {date.getFullYear()} </p>
            </div>

            

            <div style={{position: "fixed", left: "0px", bottom: "2vh"}} className="w-full flex flex-col items-center justify-center">
                <button 
                    className="bg-recipe-tan hover:bg-recipe-orange text-recipe-orange font-semibold hover:text-recipe-tan py-2 px-4 border border-recipe-orange hover:border-transparent rounded"
                    onClick={Save}
                >
                    Save
                </button>
            </div>
            
        </div>
        <div className="px-[5%] h-screen w-screen">
           
        </div>
        </div>
    );
}

export default RecipeCreationForm;