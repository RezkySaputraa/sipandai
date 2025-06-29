"use client";
import { getColor } from "@/utils/color";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar({ role }: { role: string }) {
  const [loginModal, setLoginModal] = useState(false);

  const handleModal = () => {
    setLoginModal(!loginModal);
  };

  return (
    <>
      <div
        className={`${getColor(
          role
        )} flex justify-between px-3 md:px-7 py-2 relative`}
        onClick={handleModal}
      >
        <div className="flex items-center gap-3">
          <Image
            src={"/assetsweb/Navbar/logo.svg"}
            alt="logo"
            width={100}
            height={100}
          ></Image>
          <h1 className="font-bold text-white w-60 hidden md:block">
            SISTEM PENGAWASAN ANGGARAN DANA DESA
          </h1>
        </div>

        <div className="flex items-center">
          <Image
            src={"/assetsweb/Navbar/hamburger.svg"}
            alt="hamburger"
            width={40}
            height={40}
          ></Image>
        </div>

        {loginModal && (
          <div className="bg-stone-100 w-1/12 flex justify-center flex-col p-2 rounded-lg absolute top-17 right-7 font-bold ">
            <Link href="/login" className="font-semibold">
              Login
            </Link>
            <button  onClick={() => signOut()} className="font-semibold text-left">Logout</button>
            </div>
        )}
      </div>
    </>
  );
}
