import { signIn } from "@/app/auth";
import { redirect } from "next/dist/server/api-utils";

export default function Login() {
  return (
    <div>
      <form
        action={async (formData) => {
          "use server";
          await signIn("credentials", formData);
        }}
      >
        <label>
          Email
          <input name="email" type="email" />
        </label>
        <label>
          Password
          <input name="password" type="password" />
        </label>
        <button>Sign In</button>
      </form>
      <form
        action={async () => {
          "use server";
          await signIn("google",{redirectTo: "/"});
        }}
      >
        <button type="submit">Signin with Google</button>
      </form>
    </div>
  );
}
