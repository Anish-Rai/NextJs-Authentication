"use server"

import UserInfo from "@/components/user-info"
import { auth } from "../../../../auth"

const ServerPage = async() => {
    const session = await auth()
  return (
    <div>
        <UserInfo user={session?.user} label="Server Component" />
    </div>
  )
}

export default ServerPage