import { auth } from "@/app/auth";
import GoogleButton from "@/app/components/auth/GoogleButton";
import RegisterForm from "@/app/components/auth/RegisterForm";
import { redirect } from "next/navigation";
export default async function Register() {
  const session = await auth();
  if(session){
    redirect("/")
  }

  return (
    
    <div className="flex justify-center h-screen items-center">
      <div >
        <RegisterForm />
        
        <GoogleButton/>
      </div>
    </div>
  );
}
 