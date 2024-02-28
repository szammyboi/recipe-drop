// based on code from https://github.com/nhost/nhost

'use server';

import { SIGN_IN_URL } from "@/routes";
import { NHOST_SESSION_KEY, getAuthClient } from "./nhost";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signOut = async () => {
    const nhost = await getAuthClient();

    await nhost.auth.signOut();
    cookies().delete(NHOST_SESSION_KEY);

    redirect(SIGN_IN_URL);
};