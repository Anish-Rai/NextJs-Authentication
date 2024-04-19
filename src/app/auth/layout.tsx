import React from 'react'

const AuthPageLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
        {children}
    </div>
  )
}

export default AuthPageLayout