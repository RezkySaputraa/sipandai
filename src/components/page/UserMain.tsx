import Image from "next/image";
import Navbar from "../ui/Navbar";
import MainApp from "../ui/MainApp";
import { auth } from "@/app/auth";

export default async function UserMain({role} : { role: string }) {

  return (
    <>
      <Navbar role={role|| ""}></Navbar>
      <MainApp role={role|| ""}></MainApp>
    </>
  );
}
