"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Square({
  title,
  angka,
  logo,
  color,
}: {
  title: string;
  angka?: string;
  logo: string;
  color: string;
}) {
  const router = useRouter();

  const handleDirect = () => {
    router.push(`/village/bati-bati`);
  };

  return (
    <>
      <div
        className="bg-white w-[250px] flex flex-col justify-center items-center rounded-xl mt-10 py-6"
        onClick={handleDirect}
      >
        <Image
          src={`/assetsweb/Hero/${logo}.svg`}
          width={50}
          height={50}
          alt="home"
        ></Image>
        <h1 className={`font-bold text-lg mt-3 ${color}`}>{title}</h1>
        <h2 className="font-bold mt-3 text-3xl text-gray-500">{angka}</h2>
      </div>
    </>
  );
}
