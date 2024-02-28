'use client';

import "@/app/globals.css";

import { signUp } from "@/app/actions/sign-up";
import { useState, useEffect } from "react";

const SignUpForm = () => {
    const [failed, setFailed] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async (event) => {
        event.preventDefault();
        const {error} = await signUp(email, password);
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

    return (
        <div>
            <form onSubmit={handleSignUp}>
                <input className="block text-slate-950 text-lg font-bold mb-2" placeholder="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input className="block text-slate-950 text-lg font-bold mb-2" placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className="my-5 bg-transparent hover:bg-recipe-orange text-recipe-orange font-semibold hover:text-recipe-tan py-2 px-4 border border-recipe-orange hover:border-transparent rounded" onClick={handleSignUp}>Sign Up</button>
            </form>
            {failed && <h1 className="text-slate-950">{errorMessage}</h1>}
        </div>
    )
};

export default SignUpForm;