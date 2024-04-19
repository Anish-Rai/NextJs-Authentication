"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useCurrentUser } from "../../../../hooks/use-current-user"
import RoleGate from "@/components/auth/role-gate"
import FormSucess from "@/components/form-success"
import { UserRole } from "@prisma/client"
import { Button } from "@/components/ui/button"

const AdminPage = () => {
    const onApiRouteClick = () =>{
        fetch("/api/admin")
        .then((response) =>{
            if(response.ok){
                console.log("okay")
            }else{
                console.log("forbidden")
            }
        })
    }
    const session = useCurrentUser()
  return (
    <Card className="w-[700px]">
        <CardHeader>
            <p className="font-semibold text-2xl text-center">
                Admin
            </p>
        </CardHeader>
        <CardContent>
            <RoleGate allowedRole={UserRole.ADMIN} >
                <FormSucess message="You are allowed to view this content" />
            </RoleGate>
            <div className="flex justify-between p-3 shadow-md gap-3">
                <p>
                Admin-only api route
                </p>
                <Button onClick={onApiRouteClick}>
                    click to test
                </Button>
            </div>
        </CardContent>
    </Card>
  )
}

export default AdminPage