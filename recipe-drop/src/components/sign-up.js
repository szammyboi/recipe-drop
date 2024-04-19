'use client';

import "@/app/globals.css";

import { signUp } from "@/app/actions/sign-up";
import { useState, useEffect } from "react";

// Define sign up form. 
const SignUpForm = () => {
    const [failed, setFailed] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Process signup requests.
    const handleSignUp = async (event) => {
        event.preventDefault();

        // Attempt to sign up. 
        const errorRes = await signUp(email, password);

        // If sign up succeeds, end. 
        if (!errorRes) return;

        // Otherwise, notify console of sign up failure. 
        const  { error } = errorRes;
        
        if (error) {
            console.error({error})
            setErrorMessage(error)
            setFailed(true);
        }
    };  

    useEffect(() => {
        setErrorMessage('');
        setFailed(false);
    }, [email, password]);

    // Define structure and design of sign up box with email and password, capable of processing sign up requests. 
    return (
        <div className="w-full max-w-xs shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-white border-y-recipe-orange">
            <form onSubmit={handleSignUp}>
                <div className="mb-6">
                    <h1 className="block text-gray-700 text-xl font-bold mb-2">Create an account</h1>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input className="block text-gray-700 text-lg mb-4 appearance-none border-b border-slate-950 hover:border-recipe-orange focus:border-recipe-orange w-full focus:outline-none" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input className="block text-gray-700 text-lg mb-4 appearance-none border-b border-slate-950 hover:border-recipe-orange focus:border-recipe-orange w-full focus:outline-none" type="password" placeholder="******************" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    {failed && <p class="text-purple-500 text-xs italic">{errorMessage}</p>}
                    
                </div>
                <div className="flex items-center justify-between">
                    <button className="my-5 bg-transparent hover:bg-recipe-orange text-recipe-orange font-semibold hover:text-recipe-tan py-2 px-4 border border-recipe-orange hover:border-transparent rounded" onClick={handleSignUp}>Sign Up</button>
                </div>
            </form>
        </div>
        
    )
};

export default SignUpForm;