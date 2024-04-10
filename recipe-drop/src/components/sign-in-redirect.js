'use client';

import "@/app/globals.css";
import { SIGN_IN_URL } from "@/routes";
import { useRouter } from "next/navigation";

const SignInRedirectButton = () => {
    const router = useRouter();

    return (
        <button 
            className="ml-2 my-5 bg-transparent hover:bg-recipe-orange text-recipe-orange font-semibold hover:text-recipe-tan py-2 px-4 border border-recipe-orange hover:border-transparent rounded"
            onClick={() => router.push(SIGN_IN_URL)}
        >
            Sign In
        </button>
    )
};

export default SignInRedirectButton;