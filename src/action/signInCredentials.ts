"use server"

import { RegisterSchema } from "@/lib/zod"
import { signIn } from "../app/auth"
import { redirect } from "next/navigation"


export const signInCredentials = async(_prevState:unknown, formdata:FormData ) => {
    const validatedFields =RegisterSchema.safeParse(Object.fromEntries(formdata.entries()))

    if(!validatedFields.success){
        return {
            error: validatedFields.error.flatten().fieldErrors
        }
    }

    const {email,password} =validatedFields.data; 

    try{
        await signIn("credentials", {email,password,redirect:false })
    }catch(e){
        return {messages : "failed to register user " + e}
    }
    redirect("/")

}