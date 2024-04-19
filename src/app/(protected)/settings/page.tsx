"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { settings } from "../../../../actions/settings"
import { Button } from "@/components/ui/button"
import { useState, useTransition } from "react"
import {z} from 'zod'
import {  useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SettingsSchema } from "../../../../schemas"
import { useSession } from "next-auth/react"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useCurrentUser } from "../../../../hooks/use-current-user"
import FormError from "@/components/form-error"
import FormSucess from "@/components/form-success"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserRole } from "@prisma/client"
import { Switch } from "@/components/ui/switch"



const SettingPage = () => {
  const user =  useCurrentUser()
  const {update} = useSession()
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactor || undefined
    },
  })

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(()=>{
      settings(values)
      .then((data)=>{
        if(data?.error){
          setError(data?.error)
        }

        if(data?.success){
          update()
          setSuccess(data.success)
        }
      })
    })
  }    
  return (
    <Card className="w-[700px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          Settings
        </p>
      </CardHeader>
      <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" disabled={isPending} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              { user?.isOAuth === false && (
                  <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="example@example.com" disabled={isPending} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input placeholder="******" disabled={isPending} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    />

                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input placeholder="******" disabled={isPending} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    />

                </>
              )


              }
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <Select
                        disabled ={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={UserRole.ADMIN}>
                            Admin
                          </SelectItem>
                          <SelectItem value={UserRole.USER}>
                            User
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isTwoFactorEnabled"
                  render={({ field }) => (
                    <FormItem className="flex mt-4 flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div>
                        <FormLabel> Two Factor Authentication</FormLabel>
                        <FormDescription>
                          Enable two factor authentication for extra security of your account
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch 
                          disabled={isPending}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                </div>
                <FormError message={error} />
                <FormSucess message={success} />
              <Button disabled={isPending} type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SettingPage