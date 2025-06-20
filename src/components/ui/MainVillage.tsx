"use client";

import { useState } from "react";
import BudgetTable from "./BudgetTable";
import Komentar from "./Komentar";
import SummaryAi from "./SummaryAi";

export default function MainVillage() {
  const [table, setTable] = useState(true);

  return (
    <div className="w-9/12 bg-white rounded-xl p-4 mb-4">
      <h1 className="font-bold text-xl text-[#16604B]">
        Total Anggaran & Realisasi Desa Bati-Bati
      </h1>
      <p className=" text-gray-500 py-4">
        Terakhir diperbaharui : 20 Desember 2022
      </p>
      <div className="flex gap-2">
        <button className="bg-[#0093DD] w-1/12 text-white rounded-lg font-semibold p-1">
          Kembali
        </button>
        <button className="bg-[#5DAB2C] w-1/12 text-white rounded-lg font-semibold p-1">
          Unduh
        </button>
        <button className="bg-[#E20303] w-1/12 text-white rounded-lg font-semibold p-1">
          Lapor
        </button>
      </div>
      <div className="flex gap-2 py-4">
        <select
          name="year"
          id="year"
          className="p-2 bg-gray-100 rounded-lg w-2/12"
        >
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
        <select
          name="month"
          id="month"
          className="p-2 bg-gray-100 rounded-lg w-2/12"
        >
          <option value="Januari">Januari</option>
          <option value="Februari">Februari</option>
          <option value="Maret">Maret</option>
          <option value="April">April</option>
          <option value="Mei">Mei</option>
          <option value="Juni">Juni</option>
          <option value="Juli">Juli</option>
          <option value="Agustus">Agustus</option>
          <option value="September">September</option>
          <option value="Oktober">Oktober</option>
          <option value="November">November</option>
          <option value="Desember">Desember</option>
        </select>
      </div>

      <div className="flex gap-3 mb-4">
        <h1
          onClick={() => setTable(true)}
          className={`${
            table && "text-[#0093DD]"
          } font-semibold cursor-pointer`}
        >
          Data Tabel
        </h1>
        <h1
          onClick={() => setTable(false)}
          className={`${
            !table && "text-[#0093DD]"
          } font-semibold cursor-pointer`}
        >
          AI Summary
        </h1>
      </div>

      {table ? <BudgetTable></BudgetTable> : <SummaryAi></SummaryAi>}

      <Komentar></Komentar>
    </div>
  );
}
