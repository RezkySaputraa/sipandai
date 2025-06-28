"use client";

import { useRouter } from "next/navigation";

export default function LaporanAnda() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="bg-[#EEF0F2] min-h-screen px-7 pt-7">
      <button
        className="font-semibold bg-[#0093DD] rounded-md text-white text-lg p-2 cursor-pointer"
        onClick={handleBack}
      >
        Kembali
      </button>
      <h1 className="font-semibold text-2xl py-6">Laporan Anda</h1>
      <div className="bg-white rounded-lg p-5 w-80%">
        <table className="w-full">
          <thead>
            <tr className="border-2 border-gray-300">
              <th className="border-2 border-gray-300">No</th>
              <th className="border-2 border-gray-300">Nama Desa</th>
              <th className="border-2 border-gray-300">Judul Dugaan</th>
              <th className="border-2 border-gray-300">Tanggal</th>
              <th className="border-2 border-gray-300 p-3">Status</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr className="border-2 border-gray-300">
              <td className="border-2 border-gray-300">No</td>
              <td className="border-2 border-gray-300">Nama Desa</td>
              <td className="border-2 border-gray-300">Judul Dugaan</td>
              <td className="border-2 border-gray-300">Tanggal</td>
              <td className="border-2 border-gray-300 p-3">
                <span className="p-2 bg-indigo-300 rounded-xl">
                  Sedang Diproses
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
