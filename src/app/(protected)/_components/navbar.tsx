"use client"

import { Button } from "@/components/ui/button"
import UserButton from "@/components/ui/user-button"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Navbar = () => {
    const pathName = usePathname()
  return (
    <nav className="flex items-center justify-between bg-slate-900 w-[700px] p-3">
        <div className="flex gap-x-2">
            <Button 
                asChild
                variant={ pathName ==="/server"? "destructive": "ghost"}
            >
                <Link href='/server'>
                    Server
                </Link>
            </Button>

            <Button 
                asChild
                variant={ pathName ==="/client"? "destructive": "ghost"}
            >
                <Link href='/client'>
                    Client
                </Link>
            </Button>

            <Button 
                asChild
                variant={ pathName ==="/admin"? "destructive": "ghost"}
            >
                <Link href='/admin'>
                    Admin
                </Link>
            </Button>    

            <Button 
                asChild
                variant={ pathName ==="/settings"? "destructive": "ghost"}
            >
                <Link href='/settings'>
                    Setting
                </Link>
            </Button>
        </div>
       <UserButton />
    </nav>
  )
}

export default Navbar