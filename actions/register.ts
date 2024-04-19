"use server"

import {z} from 'zod';
import { db } from '@/lib/db';
import bcryptjs from "bcryptjs"
import { RegisterSchema } from '../schemas';
import { getUserByEmail } from '../data/user';
import { generateVerificationToken } from '@/lib/token';
import { sendVerificationEmail } from '@/lib/mail';


export const register = async (values: z.infer<typeof RegisterSchema> ) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success){
        return { error: "Invalid fields!"}
    }

    const {email, password, name} = validatedFields.data
    const hashedPassword = await bcryptjs.hash(password,10)

    const existingUser = await getUserByEmail(email)

    if (existingUser){
        return { error: "Email already in use!"}
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    })

    const VerificationToken = await generateVerificationToken(email)

    await sendVerificationEmail(VerificationToken.email,VerificationToken.token)

    return { success: "Confirmation email sent!"}

}