"use client"

import { UserRole } from "@prisma/client"
import { useCurrentRole, useCurrentUser } from "../../../hooks/use-current-user"

interface RoleGateProps{
    children: React.ReactNode,
    allowedRole: UserRole
}

import React from 'react'
import FormError from "../form-error"

const RoleGate = (
    {
        children,
        allowedRole
    }: RoleGateProps
) => {

    const role = useCurrentRole()
   
    if( role !== allowedRole)
        return (
            <FormError message="You don't have permission to view this content" />
        
        )

    return (
        <>
            {
                children
            }
        </>
    )
}

export default RoleGate