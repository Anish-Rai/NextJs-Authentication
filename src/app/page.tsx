import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section>
      <div className="h-screen flex flex-col justify-center items-center bg-slate-900">
        <p className="mb-10 text-4xl text-white font-semibold">Welcome to next auth</p>
        <LoginButton mode="modal" asChild>
          <Button variant='secondary' size='lg'>Sign In</Button>
        </LoginButton>
      </div>
    </section>
  );
}
