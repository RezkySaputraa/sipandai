import Image from "next/image";
import Search from "./Search";
import Link from "next/link";
import { textColor } from "@/utils/color";

export default function SideVillage({
  village,
  role,
  userId
}: {
  village: any;
  role: any;
  userId: string;
}) {
  return (
    <>
      {role === "admin" && (
        <div className="w-3/12 pr-5">
          <div className="flex items-start gap-2">
            <Image
              src="/assetsweb/Village/adminmap.svg"
              width={25}
              height={25}
              alt="map"
            ></Image>
            <div>
              <h1 className="font-semibold text-[#E27303] text-3xl">
                {village.name}
              </h1>
              <p className=" text-gray-600">
                Kecamatan {village.Kecamatan}, Kabupaten {village.Kabupaten},
                Provinsi {village.provinsi}
                Selatan.
              </p>
            </div>
          </div>

          <h1 className="font-bold text-2xl my-5">Keuangan</h1>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 bg-white p-3 rounded-lg">
              <Image
                src="/assetsweb/Village/adminriwayatlaporan.svg"
                alt="anggaran"
                width={25}
                height={25}
              ></Image>
              <h1 className="font-semibold text-md">Laporan APDes</h1>
            </div>
          </div>
        </div>
      )}

      {role !== "admin" && (
        <div className="w-3/12 pr-5">
          <div className="flex items-start gap-2">
            {role === "auditor" ? (
              <Image
                src="/assetsweb/Village/auditormap.svg"
                width={25}
                height={25}
                alt="map"
              ></Image>
            ) : (
              <Image
                src="/assetsweb/Village/maps.svg"
                width={25}
                height={25}
                alt="map"
              ></Image>
            )}
            <div>
              <h1 className={`font-semibold ${textColor(role)} text-3xl`}>
                {village.name}
              </h1>
              <p className=" text-gray-600">
                Kecamatan {village.Kecamatan}, Kabupaten {village.Kabupaten},
                Provinsi {village.provinsi}
                Selatan.
              </p>
            </div>
          </div>
          <div className="mt-5">
            {role === "auditor" ? (
              <Search image="/assetsweb/Hero/auditorsearch.svg"></Search>
            ) : (
              <Search image="/assetsweb/Village/search.svg"></Search>
            )}
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
              <h1 className="font-semibold text-md">
                Anggaran & Realisasi Desa
              </h1>
            </div>
            {role === "auditor" ? (
              <Link
                href="/reports"
                className="flex gap-2 bg-white p-3 rounded-lg"
              >
                <Image
                  src="/assetsweb/Village/laporan.svg"
                  alt="anggaran"
                  width={25}
                  height={25}
                ></Image>
                <h1 className="font-semibold text-md">Laporan</h1>
              </Link>
            ) : (
              <Link
                href={`/reports/${userId}`}
                className="flex gap-2 bg-white p-3 rounded-lg"
              >
                <Image
                  src="/assetsweb/Village/laporan.svg"
                  alt="anggaran"
                  width={25}
                  height={25}
                ></Image>
                <h1 className="font-semibold text-md">Laporan</h1>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
