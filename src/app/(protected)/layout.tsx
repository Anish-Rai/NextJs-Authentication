import React from 'react'
import Navbar from './_components/navbar'

const ProtectedLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className=' text-white h-screen w-full bg-slate-950 flex flex-col gap-y-10 items-center justify-center'> 
        <Navbar />
        {children} 
    </div>
  )
}

export default ProtectedLayout