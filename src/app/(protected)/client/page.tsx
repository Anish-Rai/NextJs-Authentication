"use client"

import UserInfo from "@/components/user-info"
import { auth } from "../../../../auth"
import { useCurrentUser } from "../../../../hooks/use-current-user"

const ServerPage = () => {
    const session = useCurrentUser()
  return (
    <div>
        <UserInfo user={session} label="Client component" />
    </div>
  )
}

export default ServerPage