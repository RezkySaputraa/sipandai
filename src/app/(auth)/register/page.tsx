import { signIn } from "@/app/auth";
import GoogleButton from "@/app/components/auth/GoogleButton";
import RegisterForm from "@/app/components/auth/RegisterForm";
export default function Register() {
 return (
    
    <div className="flex justify-center h-screen items-center">
      <div >
        <RegisterForm />
        
        <GoogleButton/>
      </div>
    </div>
  );
}
 