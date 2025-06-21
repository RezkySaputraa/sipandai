import Navbar from "@/components/ui/Navbar";
import { auth } from "../auth";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  return (
    <>
      <Navbar role = {session?.user.role || ""}></Navbar>
      <div>{children}</div>
    </>
  );
}
