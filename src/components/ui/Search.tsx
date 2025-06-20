import Image from "next/image";

export default function Search({ image }: { image: string }) {
  return (
    <>
      <div className="flex justify-center relative">
        <input
          type="text"
          placeholder="Cari Desa ..."
          className="p-3 bg-white rounded-xl w-full"
        />
        <Image
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
