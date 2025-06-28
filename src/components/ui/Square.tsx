import Image from "next/image";

export default function Square({
  title,
  angka,
  logo,
  color,
  onClick,
}: {
  title: string;
  angka?: string;
  logo: string;
  color: string;
  onClick?: () => void;
}) {
  return (
    <>
      <div
        className="bg-white w-[250px] flex flex-col justify-center items-center rounded-xl mt-10 py-6 cursor-pointer"
        onClick={onClick}
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
