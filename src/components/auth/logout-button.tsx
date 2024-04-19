"use client"

import { signOut } from "next-auth/react"

const LogoutButton = ({children}: {children: React.ReactNode }) => {

    const onClick = () => {
        signOut()
    }
  return (
    <div className={` cursor-pointer`} onClick={onClick}>
        {children}
    </div>
  )
}

export default LogoutButton