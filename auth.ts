import { getTwoFactorConfirmationByUserId } from './data/two-factor-confirmation';
import NextAuth from "next-auth"
import authConfig from "./auth.config"
import {PrismaAdapter} from '@auth/prisma-adapter'
import { db } from "@/lib/db"
import { getUserById } from "./data/user"
import { UserRole } from "@prisma/client"
import { getAccountById } from './data/account';


 
export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({user}){
      await db.user.update({
        where: {id: user.id},
        data: {emailVerified: new Date()}
      })
    }
  },
  callbacks:{
    async signIn({user, account}){
      //allow OAuth without email verification
      if(account?.provider !== "credentials") return true

      if (!user || !user.id) {
        return false;
      }
      const existingUser = await getUserById(user.id)

      //Prevent signin with email verification
      if(!existingUser?.emailVerified) return false

      //add 2FA check
      if(existingUser.isTwoFactorEnabled){
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

        if(!twoFactorConfirmation) return false

        await db.twoFactorConfirmation.delete({
          where: {
            id:twoFactorConfirmation.id
          }
        })
      }
      return true
    },

    async session({session, token}){
      if(token.sub && session.user){
        session.user.id = token.sub
      }

      if(token.role && session.user){
        session.user.role = token.role as UserRole
      }

      if(session.user){
        session.user.name = token.name
        session.user.email = token.email as string
        session.user.isOAuth = token.isOAuth as boolean
        session.user.isTwoFactor = token.isTwoFactor as boolean
      }
      return session
    },


    async jwt({ token }){
        if(!token.sub) return token

        const existingUser = await getUserById(token.sub)

        if(!existingUser) return token
        
        const existingAccount = await getAccountById(existingUser.id)

        token.isOAuth = !!existingAccount
        token.role = existingUser.role
        token.name = existingUser.name
        token.email = existingUser.email
        token.isTwoFactor = existingUser.isTwoFactorEnabled

        return token
    }
  },
  adapter: PrismaAdapter(db),
  session: {strategy: "jwt"},
  ...authConfig
})