import Image from "next/image";
import { useEffect } from "react";

export default function SummaryAi({
  role,
  year,
  month,
  slug,
}: {
  role?: string;
  year: number;
  month: number;
  slug: string;
}) {
  const [summary, setSummary] = setState("");
  
  useEffect(() => {
  });
  

  return (
    <>
      <div className="bg-[#E2E8F0] rounded-lg pl-3 pr-9 pt-1 pb-4">
        <div className="flex items-center">
          <Image
            src="/assetsweb/Village/VillageMain/shuriken.svg"
            width={45}
            height={45}
            alt="shuriken"
          ></Image>
          <h1 className="font-semibold text-[#08B786] text-2xl">
            Ringkasan Pendapatan Desa {slug} di tahun 2025
          </h1>
        </div>
        <p className="text-gray-600 mt-2">Belum Ada Ringkasan</p>
      </div>
      <div className="mt-4 relative">
        <input
          type="text"
          className="p-3 rounded-xl border-2 border-gray-200 w-full"
          placeholder="Cari tau menggunakan AI"
        />
        <Image
          src={"/assetsweb/Village/VillageMain/submit.svg"}
          alt="ai"
          width={30}
          height={30}
          className="absolute right-3 top-3 cursor-pointer"
        ></Image>
      </div>
    </>
  );
}
function setState(arg0: string): [any, any] {
  throw new Error("Function not implemented.");
}

