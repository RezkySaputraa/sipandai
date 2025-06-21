"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Search({ image }: { image: string }) {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const handleOnClick = () => {
    router.push(`/village/${search}`);
  };
  function handleSearch(term: string) {
    setSearch(term);
  }
  return (
    <>
      <div className="flex justify-center relative">
        <input
          value={search}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          type="text"
          placeholder="Cari Desa ..."
          className="p-3 bg-white rounded-xl w-full"
        />
        <Image
          onClick={handleOnClick}
          src={image}
          width={40}
          height={40}
          alt="usersearch"
          className="absolute right-3 translate-x-0 top-1"
        ></Image>
      </div>
    </>
  );
}
