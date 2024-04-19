// based on code from https://github.com/nhost/nhost

'use server';

import { RECIPE_PAGE_URL } from "@/routes";
import { NHOST_SESSION_KEY, getAuthClient } from "@/utils/nhost";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Send user information to server and authenticate. 
export const signIn = async (email, password) => {
    const nhost = await getAuthClient();

    // Attempt sign in. 
    const { session, error } = await nhost.auth.signIn({email, password});

    // If successful, set the session key and redirect the user to their recipe page. 
    if (session) {
        cookies().set(NHOST_SESSION_KEY, btoa(JSON.stringify(session)), {path: '/'});
        redirect(RECIPE_PAGE_URL);
    }

    // If unsuccessful, return error message to user from nHost. 
    if (error) {
        return {
            error: error.message
        }
    }
};