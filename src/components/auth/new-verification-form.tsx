"use client"

import CardWrapper from './card-wrapper'
import { CgSpinner } from "react-icons/cg";
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { newVerification } from '../../../actions/new-verification';
import FormError from '../form-error';
import FormSucess from '../form-success';


const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const onSubmit = useCallback(()=>{
        if(!token){
            setError("Missing token!")
            return
        }
        newVerification(token)
            .then((data)=>{
                setSuccess(data?.success)
                setError(data?.error)
            })
            .catch(()=>{
                setError("Something went wrong!")
            })

    },[token])

    useEffect(() => {
      onSubmit()
    }, [onSubmit])
    

  return (
    <CardWrapper
        headerLabel='Confirming your verification'
        backButtonLabel='Back to login'
        backButtonHref='/auth/login'
    >
        <div className='flex items-center justify-center w-full'>
            {
                !success && !error && (<CgSpinner className='animate-spin text-2xl' />)
            }
            <FormError message={error} />
            <FormSucess message={success} />
        </div>
    </CardWrapper>
  )
}

export default NewVerificationForm