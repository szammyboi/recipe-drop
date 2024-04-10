'use client';

import "@/app/globals.css";

const SignOutButton = ({signOut}) => {
    return (
        <button 
            className="my-5 bg-transparent hover:bg-recipe-orange text-recipe-orange font-semibold hover:text-recipe-tan py-2 px-4 border border-recipe-orange hover:border-transparent rounded"
            onClick={() => signOut()}
        >
            Logout
        </button>
    )
};

export default SignOutButton;