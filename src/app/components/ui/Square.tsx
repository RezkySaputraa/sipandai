import Image from "next/image";

export default function Square({
  title,
  angka,
  logo,
}: {
  title: string;
  angka: string;
  logo: string;
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
        <h1 className="font-semibold text-lg">{title}</h1>
        <h2 className="font-bold mt-6 text-3xl">{angka}</h2>
      </div>
    </>
  );
}
