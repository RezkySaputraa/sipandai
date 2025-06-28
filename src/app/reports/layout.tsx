import Navbar from "@/components/ui/Navbar";
import { auth } from "../auth";
import { SessionProvider } from "next-auth/react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <>
      <Navbar role={session?.user.role || ""}></Navbar>
      <SessionProvider>
        <div>{children}</div>
      </SessionProvider>
    </>
  );
}
