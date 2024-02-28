'use client';

import "@/app/globals.css";

import { signIn } from "@/utils/sign-in";
import { useState } from "react";

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        const {error} = await signIn(email, password);
        if (error) {
            console.error({error})
        }
    };  

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input className="block text-slate-950 text-lg font-bold mb-2" placeholder="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input className="block text-slate-950 text-lg font-bold mb-2" placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className="my-5 bg-transparent hover:bg-recipe-orange text-recipe-orange font-semibold hover:text-recipe-tan py-2 px-4 border border-recipe-orange hover:border-transparent rounded" onClick={handleLogin}>Login</button>
            </form>
            
        </div>
    )
};

export default SignInForm;