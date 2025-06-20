import Image from "next/image";
import Search from "./Search";

export default function SideVillage() {
  return (
    <div className="w-3/12 pr-5">
      <div className="flex items-start gap-2">
        <Image
          src="/assetsweb/Village/maps.svg"
          width={25}
          height={25}
          alt="map"
        ></Image>
        <div>
          <h1 className="font-semibold text-[#16604B] text-3xl">
            Desa Bati-Bati
          </h1>
          <p className=" text-gray-600">
            Kecamatan Bati Bati, Kabupaten Tanah Laut, Provinsi Kalimantan
            Selatan.
          </p>
        </div>
      </div>
      <div>
        <Search image="/assetsweb/Village/search.svg"></Search>
      </div>

      <h1 className="font-bold text-2xl my-5">Subjek</h1>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 bg-white p-3 rounded-lg">
          <Image
            src="/assetsweb/Village/anggaran.svg"
            alt="anggaran"
            width={25}
            height={25}
          ></Image>
          <h1 className="font-semibold text-md">Anggaran & Realisasi Desa</h1>
        </div>
        <div className="flex gap-2 bg-white p-3 rounded-lg">
          <Image
            src="/assetsweb/Village/laporan.svg"
            alt="anggaran"
            width={25}
            height={25}
          ></Image>
          <h1 className="font-semibold text-md">Laporan</h1>
        </div>
      </div>
    </div>
  );
}
