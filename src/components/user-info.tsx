import { ExtendedUser } from "../../next-auth";
import { Card, CardContent, CardHeader } from "./ui/card";

interface UserInfoProps{
    user?: ExtendedUser,
    label:string,
}



const UserInfo = ({user, label}: UserInfoProps) => {
  return (
    <Card className="w-[700px]">
        <CardHeader>
            <p className="flex font-semibold text-2xl items-center justify-center">
                {label}
            </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-3">
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                <p>ID</p>
                <p> {user?.id} </p>
            </div>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                <p>Name</p>
                <p> {user?.name} </p>
            </div>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                <p>Email</p>
                <p> {user?.email} </p>
            </div>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                <p>Role</p>
                <p> {user?.role} </p>
            </div>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                <p>Two factor authentication</p>
                <p className={`px-2 py-1 font-medium text-sm rounded-md text-white ${user?.isTwoFactor? "bg-emerald-500":"bg-destructive"}`}> {user?.isTwoFactor? "ON":"OFF"} </p>
            </div>

        </CardContent>
    </Card>
  )
}

export default UserInfo