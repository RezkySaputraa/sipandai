"use client"
import Image from "next/image";
import { useState } from "react";

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
  const [summary, setSummary] = useState("Belum Ada Ringkasan");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const sendMessage = async (): Promise<void> => {
    if (!message.trim()) return;
    setLoading(true);
    setSummary("");

    try {
      const res = await fetch(
        `/api/village/AI?village=${slug}&year=${year}&month=${month}&role=${role}&message=${message}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: message,
          }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error: ${res.status}`);
      }

      const data = await res.json();
      setSummary(data.summary || "Tidak ada ringkasan yang dihasilkan");
    } catch (error) {
      console.error("Error:", error);
      setSummary(
        `Error: ${
          error instanceof Error ? error.message : "Failed to get response"
        }`
      );
    } finally {
      setLoading(false);
    }
  };
  function handleSearch(term: string) {
    setMessage(term);
  }

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
        {loading ? <h1>LOADING...</h1> : <p className="text-gray-600 mt-2">{summary}</p> }
        </div>
      <div className="mt-4 relative">
        <input
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          type="text"
          className="p-3 rounded-xl border-2 border-gray-200 w-full"
          placeholder="Cari tau menggunakan AI"
        />
        <Image
          onClick={sendMessage}
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
