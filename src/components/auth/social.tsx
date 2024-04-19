"use client"

import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { Button } from "../ui/button"
import { signIn } from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from "../../../routes"

const Social = () => {
  const onClickHandler = (provider: "google" | "github") => {
    signIn(provider,{
      callbackUrl: DEFAULT_LOGIN_REDIRECT
    })
  }

  return (
    <div className="w-full text-2xl flex items-center gap-2">
        <Button variant='outline' size='lg' className="w-full text-2xl " onClick={()=>onClickHandler('google')}>
            <FcGoogle />
        </Button>

        <Button variant='outline' size='lg' className="w-full text-2xl" onClick={()=>onClickHandler('github')}>
            <FaGithub />
        </Button>
    </div>
  )
}

export default Social