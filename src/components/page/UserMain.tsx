import Image from "next/image";
import Navbar from "../ui/Navbar";
import MainApp from "../ui/MainApp";
import { auth } from "@/app/auth";

export default async function UserMain() {
  const session = await auth();

  return (
    <>
      <Navbar role={session?.user?.role || ""}></Navbar>
      <MainApp></MainApp>
    </>
  );
}
