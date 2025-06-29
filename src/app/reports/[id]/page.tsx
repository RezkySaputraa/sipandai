"use client";
import { useSession } from "next-auth/react";
import { notFound, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function LaporanAnda({ params }: { params: any }) {
  const router = useRouter();
  const { id } : { id : any} =  use(params);
  const session = useSession();
  const [tableData, setTableData] = useState<any>();
  
  useEffect(() => {
    const fetchDataTable = async () => {
      const response = await fetch(`/api/village/laporan?userId=${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch budget data");
      }

      const result = await response.json();
      setTableData(result.data);
    };
    
    if (id) {
      fetchDataTable();
    }
  }, [id]);

  const handleBack = () => {
    router.back();
  };
  
  if (!id) {
    notFound();
  }
  
 
  if (session.status === "unauthenticated") {
    notFound();
  }
  
  if (session.data?.user.id !== id && session.data?.user.role !== "admin") {
    return (
      <div className="text-black">
        <h1>Access Denied</h1>
      </div>
    );
  }

  if (!tableData) {
    return (
      <div className="text-black">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="bg-[#EEF0F2] min-h-screen px-7 pt-7">
      <button
        className="font-semibold bg-[#0093DD] rounded-md text-white text-lg p-2 cursor-pointer"
        onClick={handleBack}
      >
        Kembali
      </button>
      <h1 className="font-semibold text-2xl py-6">Laporan User</h1>
      <div className="bg-white rounded-lg p-5 w-80%">
        <table className="w-full">
          <thead>
            <tr className="border-2 border-gray-300">
              <th className="border-2 border-gray-300">No</th>
              <th className="border-2 border-gray-300">Nama Desa</th>
              <th className="border-2 border-gray-300">Judul Dugaan</th>
              <th className="border-2 border-gray-300">Tahun</th>
              <th className="border-2 border-gray-300">Bulan</th>
              <th className="border-2 border-gray-300">status</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {tableData.map((item: any, index: number) => (
              <tr className="border-2 border-gray-300" key={index}>
                <td className="border-2 border-gray-300">{index + 1}</td>
                <td className="border-2 border-gray-300">
                  {item.village.name}
                </td>
                <td className="border-2 border-gray-300">{item.title}</td>
                <td className="border-2 border-gray-300">{item.year}</td>
                <td className="border-2 border-gray-300">{item.month}</td>
                <td className="border-2 border-gray-300 p-3">
                  <span className={`bg-indigo-400 py-2 px-5 rounded-lg`}>
                    Sedang diproses
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
