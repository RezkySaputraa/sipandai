import Image from "next/image";

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
  return (
    <>
      <div className="bg-white w-2/12 flex flex-col justify-center items-center rounded-xl mt-14 py-6">
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
