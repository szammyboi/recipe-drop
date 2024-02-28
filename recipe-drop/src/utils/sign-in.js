// based on code from https://github.com/nhost/nhost

'use server';

import { RECIPE_PAGE_URL } from "@/routes";
import { NHOST_SESSION_KEY, getAuthClient } from "./nhost";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signIn = async (email, password) => {
    const nhost = await getAuthClient();

    const { session, error } = await nhost.auth.signIn({email, password});

    if (session) {
        cookies().set(NHOST_SESSION_KEY, btoa(JSON.stringify(session)), {path: '/'});
        redirect(RECIPE_PAGE_URL);
    }

    if (error) {
        return {
            error: error.message
        }
    }
};