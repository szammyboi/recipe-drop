'use client';

import "@/app/globals.css";

import { signIn } from "@/app/actions/sign-in";
import { useEffect, useState } from "react";
import Link from 'next/link';

// Define sign in form.
const SignInForm = () => {
    const [failed, setFailed] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Process login request.
    const handleLogin = async (event) => {
        event.preventDefault();

        // Wait for result of sign in attempt. 
        const errorRes = await signIn(email, password);

        // If successful, return. 
        if (!errorRes) return;

        // Otherwise, change relevant values to error state, logging error in console. 
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

    // Define sign in page component, receiving an email and a password, with a button to click for sign in attempts. Also allow users to click "sign up now" if they do not have an account. 
    return (
        <div className="w-full max-w-xs shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-white border-y-recipe-orange">
            <form onSubmit={handleLogin}>
                <div className="mb-6">
                    <h1 className="block text-gray-700 text-xl font-bold mb-2">Sign in with email</h1>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input className="block text-gray-700 text-lg mb-4 appearance-none border-b border-slate-950 hover:border-recipe-orange focus:border-recipe-orange w-full focus:outline-none rounded-none" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input className="block text-gray-700 text-lg mb-4 appearance-none border-b border-slate-950 hover:border-recipe-orange focus:border-recipe-orange w-full focus:outline-none rounded-none" type="password" placeholder="******************" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    {failed && <p class="text-purple-500 text-xs italic">{errorMessage}</p>}

                </div>
                <div className="flex items-center justify-between">
                <button className="my-5 bg-transparent hover:bg-recipe-orange text-recipe-orange font-semibold hover:text-recipe-tan py-2 px-4 border border-recipe-orange hover:border-transparent rounded" onClick={handleLogin}>Sign In</button>

                </div>
                <div className="flex items-left justify-between">
                    <h3 className="text-gray-700">don't have an account?</h3>
                    <Link href="/sign-up" className="underline text-recipe-orange">sign up now</Link>
                </div>
            </form>
        </div>
    )
};

export default SignInForm;