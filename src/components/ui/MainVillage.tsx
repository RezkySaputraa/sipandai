"use client";

import { useState } from "react";
import BudgetTable from "./BudgetTable";
import Komentar from "./Komentar";
import SummaryAi from "./SummaryAi";
import Image from "next/image";

export default function MainVillage({ village }: { village: any }) {
  const [table, setTable] = useState(true);
  const [year, setYear] = useState(2025);
  const [month, setmonth] = useState(2);

  const [modal, setModal] = useState(false);

  return (
    <>
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
          <button
            className="bg-[#E20303] w-1/12 text-white rounded-lg font-semibold p-1"
            onClick={() => setModal(true)}
          >
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

        {table ? (
          <BudgetTable
            year={year}
            month={month}
            slug={village.slug}
          ></BudgetTable>
        ) : (
          <SummaryAi year={year} month={month} slug={village.slug}></SummaryAi>
        )}

        <Komentar></Komentar>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>

          <div className="z-10 bg-white w-11/12 md:w-[40%] h-fit py-4 px-3 md:px-10 rounded-lg shadow-lg">
            <div className="w-full mb-3">
              <div className="flex items-center mb-4">
                <Image
                  src="/assetsweb/Village/VIllageMain/laporan.svg"
                  alt="lapor"
                  width={25}
                  height={25}
                ></Image>
                <h2 className="text-xl font-semibold text-red-600 ml-2">
                  Lapor
                </h2>
              </div>
              <button
                className="rounded-md bg-[#0093DD] text-white py-2 px-4 font-semibold flex justify-center items-center w-4/12 md:w-[19%] cursor-pointer"
                onClick={() => setModal(false)}
              >
                <img
                  src="/assets/Village/VillageMain/arrowleft.svg"
                  className="mr-2"
                  alt=""
                />
                <p>Kembali</p>
              </button>
            </div>

            <form className="bg-gray-200 p-3 md:p-6 rounded-lg border-t-3 border-red-600 w-full">
              <div className="flex flex-col">
                <label
                  className="block font-semibold text-sm md:text-lg"
                  htmlFor="title"
                >
                  Judul Dugaan
                </label>
                <input
                  name="title"
                  id="title"
                  type="text"
                  placeholder="Masukkan judul dugaan"
                  className="w-full rounded-md px-3 py-2 bg-gray-100 border border-gray-300"
                />
              </div>

              <div className="flex flex-col">
                <label className="block font-semibold text-sm md:text-lg">
                  Tahun Anggaran
                </label>
                <select
                  name="month"
                  className="mt-1 rounded-md w-full px-2 py-2 border border-gray-300 bg-gray-100"
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
              <div className="flex flex-col">
                <label className="block font-semibold text-sm md:text-lg">
                  Tahun Anggaran
                </label>
                <select
                  name="year"
                  className="mt-1 rounded-md w-full px-2 py-2 border border-gray-300 bg-gray-100"
                >
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="block font-semibold text-sm md:text-lg">
                  Sasaran Anggaran
                </label>
                <select
                  name="mainCategory"
                  className="mt-1 w-full rounded-md px-2 py-2 bg-gray-100 border border-gray-300"
                >
                  <option value={"belanjadesa"}>Belanja Desa</option>
                  <option value={"pendapatandesa"}>Pendapatan Desa</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="block font-semibold text-sm md:text-lg">
                  Keterangan
                </label>
                <textarea
                  name="description"
                  placeholder="Pengeluaran fiktif"
                  className="mt-1 w-full rounded-md px-3 py-1 border border-gray-300 bg-gray-100 placeholder:text-sm"
                  rows={3}
                />
              </div>
              <div className="flex justify-between pt-4">
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded cursor-pointer"
                  onClick={() => setModal(false)}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded cursor-pointer"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
