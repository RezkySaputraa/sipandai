"use client";

import Image from "next/image";
import { useState } from "react";

export default function Navbar({role} : {role: string}) {
  const [loginModal, setLoginModal] = useState(false);
  
  const handleModal = () => {
    setLoginModal(!loginModal);
  };

  return (
    <>
      {/* nanti dirubah warna sesuai auth */}
      <div
        className="bg-[#08B786] flex justify-between px-7 relative"
        onClick={handleModal}
      >
        <div className="flex items-center gap-3">
          <Image
            src={"/assetsweb/Navbar/logo.svg"}
            alt="logo"
            width={100}
            height={100}
          ></Image>
          <h1 className="font-bold text-white w-60">
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

        {role != "" && (
          <div className="bg-stone-100 w-1/12 flex justify center flex-col p-2 rounded-lg absolute top-10 right-10">
            <h1 className="font-semibold">Login</h1>
            <h1 className="font-semibold">Logout</h1>
          </div>
        )}
      </div>
    </>
  );
}
