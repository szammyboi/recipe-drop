// based on code from https://github.com/nhost/nhost

'use server'

import { RECIPE_PAGE_URL } from '@/routes'
import { NHOST_SESSION_KEY, getAuthClient } from '@/utils/nhost'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// Attempt sign up. 
export const signUp = async (email, password) => {
    const nhost = await getAuthClient()

    // Send user information to nHost and attempt sign up. If user does not exist, add to server when email and password requirements are met. 
    const { session, error } = await nhost.auth.signUp({
        email,
        password
    })

    // If successful, create user session and redirect to recipe page. 
    if (session) {
        cookies().set(NHOST_SESSION_KEY, btoa(JSON.stringify(session)), { path: '/' })
        redirect(RECIPE_PAGE_URL)
    }

    // If unsuccessful, return error message to user from nHost. 
    if (error) {
        return {
            error: error.message
        }
    }
}