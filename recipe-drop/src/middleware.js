import { manageAuthSession } from "@/utils/nhost";
import { NextResponse } from 'next/server';
import { SIGN_IN_URL } from "@/routes";

export const middleware = async (request) => {
    return manageAuthSession(request, () => {
        NextResponse.redirect(new URL(SIGN_IN_URL, request.url));
    })
};