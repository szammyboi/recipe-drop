// based on code from https://github.com/nhost/nhost

'use server';

import { SIGN_IN_URL } from "@/routes";
import { NHOST_SESSION_KEY, getAuthClient } from "@/utils/nhost";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Sign out of website. 
export const signOut = async () => {
    const nhost = await getAuthClient();

    // Sign out of nhost session, delete the session key, and redirect to sign in page. 
    await nhost.auth.signOut();
    cookies().delete(NHOST_SESSION_KEY);

    redirect(SIGN_IN_URL);
};