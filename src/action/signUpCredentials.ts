"use server"

import { prisma } from "@/lib/prisma"
import { RegisterSchema } from "@/lib/zod"
import { hashSync } from "bcrypt-ts"
import { redirect } from "next/navigation"

export const signUpCredentials = async(_prevState:unknown, formdata:FormData ) => {
    const validatedFields =RegisterSchema.safeParse(Object.fromEntries(formdata.entries()))

    if(!validatedFields.success){
        return {
            error: validatedFields.error.flatten().fieldErrors
        }
    }

    const {email,password} =validatedFields.data; 
    const hashedPassword =hashSync(password,10);
    
    try{
        await prisma.user.create({
            data:{
                email: email,
                password: hashedPassword
            }
        })
    }catch(e){
        return {messages : "failed to register user " + e}
    }
    redirect("/login");

}