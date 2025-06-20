import Image from "next/image";
import Square from "./Square";

export default function MainApp() {
  const admin = true;

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
      title: "Masuk",
      logo: "admindirect",
    },
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

  return (
    <>
      {admin && (
        <>
          <div className="bg-gradient-to-b from-[#E27303] min-h-[70vh]">
            <div className="flex justify-center items-center gap-5">
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
            <p className="text-center">
              Kecamatan Bati Bati, Kabupaten Tanah Laut, Provinsi Kalimantan
              Selatan.
            </p>
            <div className="flex justify-center gap-6">
              {dataUser.map((item, index) => (
                <Square
                  title={item.title}
                  angka={item.angka}
                  logo={item.logo}
                  key={index}
                ></Square>
              ))}
            </div>
          </div>
        </>
      )}

      {!admin && (
        <>
          <div className="bg-gradient-to-b from-[#08B786] min-h-[70vh]">
            <div className="flex justify-center items-center pt-15 relative">
              <input
                type="text"
                placeholder="Cari Desa ..."
                className="p-3 bg-white rounded-xl w-4/12"
              />
              <Image
                src={"/assets/Hero/search.svg"}
                width={40}
                height={40}
                alt="usersearch"
                className="absolute translate-x-57"
              ></Image>
            </div>
            <h1 className="text-white font-bold text-center text-5xl mt-10">
              Rekap Dana Desa Nasional Tahun 2025
            </h1>
            <div className="flex justify-center gap-6">
              {dataUser.map((item, index) => (
                <Square
                  title={item.title}
                  angka={item.angka}
                  logo={item.logo}
                  key={index}
                ></Square>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
