"use server"

import {z} from 'zod'

import { db } from '@/lib/db'
import { getUserByEmail, getUserById } from '../data/user'
import { SettingsSchema } from '../schemas'
import { currentUser } from '@/lib/auth'
import { generateVerificationToken } from '@/lib/token'
import { sendVerificationEmail } from '@/lib/mail'
import bcryptjs from 'bcryptjs'

export const settings = async(values: z.infer<typeof SettingsSchema>) =>{
    const user = await currentUser()

    if(!user){
        return { error: "Unauthorized"}
    }
    
    if(!user?.id){
        return { error: "Unauthorized"}
    }
    const userExistDb = await getUserById(user?.id)


    if(!userExistDb){
        return { error: "Unauthorized"}
    }

    if(user.isOAuth){
        values.email = undefined
        values.isTwoFactorEnabled = undefined
        values.password = undefined
        values.newPassword = undefined
        
    }

    if(values.email && values.email !== user.email){
        const existingUser = await getUserByEmail(values.email)

        if(existingUser && existingUser.id !== user.id){
            return { error: "Email already in use!"}
        }

        const verificationToken = await generateVerificationToken(values.email)

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        )

        return { success: "Verification email sent"}
    }

    if(values.password && values.newPassword && userExistDb.password){
        const passwordMatch =await bcryptjs.compare(values.password, userExistDb.password)

        if(!passwordMatch){
            return { error: "Incorrect password!"}
        }

        const hashedPassword =await bcryptjs.hash(values.newPassword, 10)

        values.password = hashedPassword,
        values.newPassword = undefined
    }

    await db.user.update({
        where: { id: userExistDb.id },
        data:{ 
            ...values
        }
    })

    return { success: "Settings updated successfully!"}
    
}