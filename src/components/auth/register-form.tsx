"use client"

import * as z from 'zod';
import { useForm } from 'react-hook-form'
import CardWrapper from './card-wrapper'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterSchema } from '../../../schemas';
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
import { useTransition, useState } from 'react';
import { register } from '../../../actions/register';


const RegisterForm = () => {
  const [success,setSuccess] = useState<string | undefined>("")
  const [error,setError] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues:{
      name: "",
      email: "",
      password: "",
    }
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("")
    setSuccess("")

   startTransition(()=>{
    register(values)
      .then((data)=>{
      setError(data.error)
      setSuccess(data.success)
    })
   })
  }

  return (
    <CardWrapper
      headerLabel='Create a new account'
      backButtonHref='/auth/login'
      backButtonLabel="Already have an account?"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4 w-full'>
          <FormField
              control={form.control}
              name='name'
              render={({field})=>(
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input  
                      {...field}
                      disabled={isPending}
                      placeholder='John Doe'
                      type='name'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormError message={error} />
          <FormSucess message={success} />
          <Button
            disabled={isPending}
            type='submit'
            className='w-full'
          >
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default RegisterForm