"use client"


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaUser } from "react-icons/fa"
import { useCurrentUser } from "../../../hooks/use-current-user"
import LogoutButton from "../auth/logout-button"
import { MdOutlineLogout } from "react-icons/md";


  
  const UserButton = () => {
    const user = useCurrentUser()
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar>
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback className="bg-slate-950">
                    <FaUser  />
                </AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48    text-white bg-gray-950 border border-gray-800">
            <LogoutButton>
                <DropdownMenuItem className=" focus:bg-slate-800 focus:text-white bg-slate-950">
                    <MdOutlineLogout className="mr-2" />
                    <span>Logout</span>
                </DropdownMenuItem>
            </LogoutButton>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  
  export default UserButton
  