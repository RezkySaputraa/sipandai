"use client";

import Image from "next/image";
import Square from "./Square";
import Search from "./Search";
import { useRouter } from "next/navigation";

export default function MainApp({ role }: { role: string }) {
  const dataUser = [
    {
      title: "Jumlah Desa",
      angka: "100",
      logo: "home",
    },
    {
      title: "Total Dana Desa 2025",
      angka: "Rp. 71 T",
      logo: "chart",
    },
    {
      title: "Total Pendapatan Desa 2025",
      angka: "Rp. 131.8 T",
      logo: "money",
    },
    {
      title: "Total Belanja Desa 2025",
      angka: "Rp. 246 T",
      logo: "bag",
    },
  ];

  const dataAdmin = [
    {
      title: "Realisasi Pendapatan 2025",
      angka: "98%",
      logo: "adminchart",
    },
    {
      title: "Realisasi Pembiayaan 2025",
      angka: "96%",
      logo: "adminmoney",
    },
    {
      title: "Realisasi Belanja 2025",
      angka: "98%",
      logo: "adminbag",
    },
  ];

  const dataAuditor = [
    {
      title: "Desa Telah di Audit",
      angka: "13.599",
      logo: "auditorceklis",
    },
    {
      title: "Desa Sedang di Audit",
      angka: "5067",
      logo: "auditorhourglass",
    },
    {
      title: "Desa tidak Submit Laporan",
      angka: "203",
      logo: "auditortelat",
    },
    {
      title: "Laporan Masyarakat",
      angka: "171",
      logo: "auditorlapor",
    },
  ];

  const router = useRouter();

  const handleDirect = () => {
    router.push(`/village/bati-bati`);
  };

  return (
    <>
      {role === "admin" && (
        <>
          <div className="bg-gradient-to-b from-[#E27303] min-h-[70vh]">
            <div className="flex justify-center items-center gap-5 pt-20">
              <Image
                src="/assetsweb/Navbar/map.svg"
                width={30}
                height={30}
                alt="map"
              ></Image>
              <h1 className="text-white font-bold text-center text-5xl">
                Desa Bati-Bati
              </h1>
            </div>
            <p className="text-center text-gray-200 mt-3 font-semibold">
              Kecamatan Bati Bati, Kabupaten Tanah Laut, Provinsi Kalimantan
              Selatan.
            </p>
            <div className="flex justify-center gap-6">
              <Square
                title={"Masuk"}
                logo={"admindirect"}
                color="text-[#E27303]"
                onClick={handleDirect}
              ></Square>
              {dataAdmin.map((item, index) => (
                <Square
                  title={item.title}
                  angka={item.angka}
                  logo={item.logo}
                  key={index}
                  color="text-[#E27303]"
                ></Square>
              ))}
            </div>
          </div>
        </>
      )}

      {role === "user" && (
        <>
          <div className="bg-gradient-to-b from-[#08B786] min-h-[70vh]">
            <div className="w-[90%] md:w-[30%] mx-auto pt-10">
              <Search image="/assetsweb/Hero/search.svg"></Search>
            </div>
            <h1 className="text-white font-bold text-center text-2xl md:text-5xl mt-10 ">
              Rekap Dana Desa Nasional Tahun 2025
            </h1>
            <div className="flex justify-center gap-1 md:gap-6 flex-wrap">
              <Square
                title={"Jumlah Desa"}
                angka={"83.971"}
                logo={"home"}
                color="text-[#08B786]"
              ></Square>
              <Square
                title={"Total Dana Desa 2025"}
                angka={"Rp. 71 T"}
                logo={"chart"}
                color="text-[#08B786]"
              ></Square>
              <Square
                title={"Total Pendapatan Desa 2025"}
                angka={"Rp. 131.8 T"}
                logo={"money"}
                color="text-[#08B786]"
              ></Square>
              <Square
                title={"Total Belanja Desa 2025"}
                angka={"Rp. 246 T"}
                logo={"bag"}
                color="text-[#08B786]"
              ></Square>
            </div>
          </div>
        </>
      )}

      {role === "auditor" && (
        <>
          <div className="bg-gradient-to-b from-[#0093DD] min-h-[70vh]">
            <div className="w-[30%] mx-auto pt-15">
              <Search image="/assetsweb/Hero/auditorsearch.svg"></Search>
            </div>
            <h1 className="text-white font-bold text-center text-5xl mt-10">
              Audit Anggaran dan Realisasi Dana Desa
            </h1>
            <div className="flex justify-center gap-6">
              {dataAuditor.map((item, index) => (
                <Square
                  title={item.title}
                  angka={item.angka}
                  logo={item.logo}
                  key={index}
                  color="text-[#0093DD]"
                ></Square>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
