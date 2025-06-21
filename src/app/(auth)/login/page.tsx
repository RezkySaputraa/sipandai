import { auth, signIn } from "@/app/auth";
import GoogleButton from "@/app/components/auth/GoogleButton";
import LoginForm from "@/app/components/auth/LoginForm";
import { redirect } from "next/navigation";


export default async function Login() {
  
  const session = await auth();
  if(session){
    redirect("/");
  }
  return (
    <div className="flex justify-center h-screen items-center">
      <div >
        <LoginForm />
        <GoogleButton/>
      </div>
    </div>
  );
}