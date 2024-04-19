import { db } from "@/lib/db";

export const getPasswordResetTokenbyToken = async(token: string) => {
    try{
        const passwrodResetToken = await db.passwordResetToken.findUnique({
            where: {
                token
            }
        })

        return passwrodResetToken
    }catch{
        return null
    }
}

export const getPasswordResetTokenByEmail = async (email: string) => {
    try{
        const passwordResetToken = await db.passwordResetToken.findFirst({
            where: {
                email
            }
        })

        return passwordResetToken
    }catch{
        return null
    }


}