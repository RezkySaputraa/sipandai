"use client";

import { useState } from "react";
import BudgetTable from "./BudgetTable";
import Komentar from "./Komentar";
import SummaryAi from "./SummaryAi";

export default function MainVillage({ village }: { village: any }) {
  const [table, setTable] = useState(true);
  const [year, setYear] = useState(2025);
  const [month, setmonth] = useState(2);

  console.log(year);
  return (
    <div className="w-9/12 bg-white rounded-xl p-4 mb-4">
      <h1 className="font-bold text-xl text-[#16604B]">
        Total Anggaran & Realisasi {village.name}
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
          onChange={(e) => {
            setYear(Number(e.target.value));
          }}
          defaultValue={year}
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
          onChange={(e) => {
            setmonth(Number(e.target.value));
          }}
          defaultValue={month}
        >
          <option value="1">Januari</option>
          <option value="2">Februari</option>
          <option value="3">Maret</option>
          <option value="4">April</option>
          <option value="5">Mei</option>
          <option value="6">Juni</option>
          <option value="7">Juli</option>
          <option value="8">Agustus</option>
          <option value="9">September</option>
          <option value="10">Oktober</option>
          <option value="11">November</option>
          <option value="12">Desember</option>
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

      {table ? <BudgetTable year={year} month={month} slug={village.slug}></BudgetTable> : <SummaryAi  year={year} month={month} slug={village.slug}></SummaryAi>}

      <Komentar></Komentar>
    </div>
  );
}
