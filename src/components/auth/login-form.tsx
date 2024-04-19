"use client"

import * as z from 'zod';
import { useForm } from 'react-hook-form'
import CardWrapper from './card-wrapper'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '../../../schemas';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import FormError from '../form-error';
import FormSucess from '../form-success';
import { login } from '../../../actions/login';
import { useTransition, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';


const LoginForm = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
  ? "Email already in use with different providers!"
  : ""

  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [success,setSuccess] = useState<string | undefined>("")
  const [error,setError] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues:{
      email: "",
      password: "",
    }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("")
    setSuccess("")

   startTransition(()=>{
    login(values, callbackUrl)
      .then((data)=>{
      if(data?.error){
        form.reset()
        setError(data.error)
      }

      if(data?.success){
        form.reset()
        setError(data.success)
      }

      if(data?.twoFactor){
        setShowTwoFactor(true)
      }
    })
    .catch(()=> setError("Something went wrong!"))
   })
  }

  return (
    <CardWrapper
      headerLabel='Welcome back'
      backButtonHref='/auth/register'
      backButtonLabel="Don't have an account?"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4 w-full'>
            {
              showTwoFactor && 
              <>
                <FormField
                        control={form.control}
                        name='code'
                        render={({field})=>(
                          <FormItem>
                            <FormLabel>Two Factor Code</FormLabel>
                            <FormControl>
                              <Input  
                                {...field}
                                disabled={isPending}
                                placeholder='12345'
                                
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                    />
              </>
            }

            {
              !showTwoFactor && 
              <>
                    <FormField
                        control={form.control}
                        name='email'
                        render={({field})=>(
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input  
                                {...field}
                                disabled={isPending}
                                placeholder='example@example.com'
                                type='email'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                    />

                <FormField
                    control={form.control}
                    name='password'
                    render={({field})=>(
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input  
                            {...field}
                            disabled={isPending}
                            placeholder='password123'
                            type='password'
                          />
                        </FormControl>
                        <Button variant='link' size='sm' className='pl-0 font-normal'>
                          <Link href='/auth/reset'>
                            Forgot password?
                          </Link>
                        </Button>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
            }
          </div>

          <FormError message={error || urlError} />
          <FormSucess message={success} />
          <Button
            disabled={isPending}
            type='submit'
            className='w-full'
          >
            {showTwoFactor? "Confirm": "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default LoginForm