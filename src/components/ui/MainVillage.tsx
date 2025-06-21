"use client";

import { use, useActionState, useEffect, useState } from "react";
import BudgetTable from "./BudgetTable";
import Komentar from "./Komentar";
import SummaryAi from "./SummaryAi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { textColor } from "@/utils/color";
import handleExcel from "@/utils/excel";
import { postBudgetPeriod } from "@/action/postBudgetPeriod";
import { PostLaporan } from "@/action/postLaporan";

export default function MainVillage({
  village,
  role,
  userId
}: {
  village: any;
  role: any;
  userId: any;
}) {
  const [table, setTable] = useState(true);
  const [year, setYear] = useState(2025);
  const [month, setmonth] = useState(1);
  const [input, setInput] = useState(false);
  const [modal, setModal] = useState(false);
  const [listTable, setListTable] = useState<any>();
  const [inputModal, setInputModal] = useState(false);

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const [_state, formActionsTable] = useActionState(
    async (_prevState: any, formData: FormData) => {
      console.log("Form Data:", formData);
      const name = formData.get("name") as string;
      const year = Number(formData.get("year"));
      const month = Number(formData.get("month"));
      const slug = village.slug ?? "";
      if (!name || !year || !month || !slug) {
        console.error("isi dulu bosku.");
        return { success: false, message: "Semua field harus diisi." };
      }
      return await postBudgetPeriod({
        periodName: name,
        year,
        month,
        villageSlug: slug,

      });
    },
    null
  );
  const [_states, formActionsLapor] = useActionState(
    async (_prevState: any, formData: FormData) => {
      console.log("Form Data:", formData);
      const title = formData.get("title") as string;
      const year = Number(formData.get("year"));
      const month = Number(formData.get("month"));
      const description = formData.get("description") as string;
      const slug = village.slug ?? "";
      if (!title || !year || !month || !slug) {
        console.error("isi dulu bosku.");
        return { success: false, message: "Semua field harus diisi." };
      }
      return await PostLaporan({
        title,
        year,
        month,
        villageSlug: slug,
        description
      })
    },
    null
  );
  useEffect(() => {
    const fetchDataTable = async () => {
      const response = await fetch(`/api/village/budget?slug=${village.slug}`);
      if (!response.ok) {
        throw new Error("Failed to fetch budget data");
      }

      const result = await response.json();
      setListTable(result.data);
    };
    fetchDataTable();
  }, [village.slug,year]);
  console.log("listTable", listTable);
  return (
    <>
      {role !== "admin" && (
        <div className="w-9/12 bg-white rounded-xl p-4 pb-5">
          <h1 className={`font-bold text-xl ${textColor(role)}`}>
            Total Anggaran & Realisasi {village.name}
          </h1>
          <div className="flex gap-2 mt-5">
            <button
              className="bg-[#0093DD] w-1/12 text-white rounded-lg font-semibold p-1"
              onClick={handleBack}
            >
              Kembali
            </button>
            <button
              className="bg-[#5DAB2C] w-1/12 text-white rounded-lg font-semibold p-1 cursor-pointer"
              onClick={() => handleExcel()}
            >
              Unduh
            </button>
            {role === "user" && (
              <button
                className="bg-[#E20303] w-1/12 text-white rounded-lg font-semibold p-1"
                onClick={() => setModal(true)}
              >
                Lapor
              </button>
            )}
          </div>
          <div className="flex justify-between gap-2 py-4">
            <div className="flex gap-4">
              <select
                name="year"
                id="year"
                className="p-2 bg-gray-100 rounded-lg"
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
                className="p-2 bg-gray-100 rounded-lg"
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
            {role === "auditor" && (
              <div>
                <select
                  name="status"
                  id="status"
                  className="p-2 bg-gray-100 rounded-lg"
                  defaultValue={"Pilih Status"}
                >
                  <option value="2025" className="hidden">Pilih Status</option>
                  <option value="2025">Sedang di Audit</option>
                  <option value="2024">Sedang di Proses</option>
                  <option value="2023">Selesai</option>
                </select>
              </div>
            )}
          </div>

          <div className="flex gap-3 mb-4">
            <h1
              onClick={() => setTable(true)}
              className={`${
                table && textColor(role)
              } font-semibold cursor-pointer`}
            >
              Data Tabel
            </h1>
            <h1
              onClick={() => setTable(false)}
              className={`${
                !table && textColor(role)
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
              role={role}
            ></BudgetTable>
          ) : (
            <SummaryAi
              year={year}
              month={month}
              slug={village.slug}
              role={role}
            ></SummaryAi>
          )}

          <Komentar role={role}></Komentar>
        </div>
      )}

      {role === "admin" && (
        <div className="w-9/12 bg-white rounded-xl p-4 mb-4">
          <h1 className={`font-bold text-xl ${textColor(role)}`}>
            Laporan APDes
          </h1>

          {input ? (
            <>
              <button
                className="bg-[#0093DD] w-1/12 text-white rounded-lg font-semibold p-1 my-3 cursor-pointer"
                onClick={() => setInput(false)}
              >
                Kembali
              </button>

              <BudgetTable
                year={year}
                month={month}
                slug={village.slug}
                role={role}
              ></BudgetTable>

              <div className="flex gap-3 justify-end mt-3">
                <button className="bg-[#E20303] w-1/12 text-white rounded-lg font-semibold p-1 cursor-pointer">
                  Batal
                </button>
                <button className="bg-[#186ac6] w-1/12 text-white rounded-lg font-semibold p-1 cursor-pointer">
                  Simpan
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-3">
                <button
                  className="bg-[#0093DD] w-1/12 text-white rounded-lg font-semibold p-1 my-3 cursor-pointer"
                  onClick={handleBack}
                >
                  Kembali
                </button>

                <button
                  className="bg-[#5DAB2C] w-2/12 text-white rounded-lg font-semibold p-1 my-3 cursor-pointer"
                  onClick={() => setInputModal(true)}
                >
                  Tambah Laporan
                </button>
              </div>

              <select
                name="year"
                id="year"
                className="p-2 bg-gray-200 rounded-lg w-2/12 my-3"
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

              <table className="w-full">
                <thead>
                  <tr className="border-2 border-gray-300">
                    <th className="border-2 border-gray-300">No</th>
                    <th className="border-2 border-gray-300">Aksi</th>
                    <th className="border-2 border-gray-300">Judul Laporan</th>
                    <th className="border-2 border-gray-300">Last Update</th>
                    <th className="border-2 border-gray-300 p-3">Finalisasi</th>
                  </tr>
                </thead>
                <tbody>
                  {listTable?.map((item: any, index:number) => (
                    <tr className="border-2 border-gray-300 text-center" key={item.id}>
                      <td className="border-2 border-gray-300 ">{index}</td>
                      <td
                        className="border-2 border-gray-300"
                        onClick={() => {
                          setYear(item.year);
                          setmonth(item.month);  
                          setInput(true)
                        }}
                      >
                        <Image
                          src={"/assetsweb/Village/eye.svg"}
                          width={50}
                          height={50}
                          alt="eye"
                          className="mx-auto"
                        ></Image>
                      </td>
                      <td className="border-2 border-gray-300">{item.name}</td>
                      <td className="border-2 border-gray-300">{item.year}</td>
                      <td className="border-2 border-gray-300 p-3">
                        <Image
                          src={"/assetsweb/Village/VillageMain/admincross.svg"}
                          width={50}
                          height={50}
                          alt="check"
                          className="mx-auto"
                        ></Image>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}

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

            <form className="bg-gray-200 p-3 md:p-6 rounded-lg border-t-3 border-red-600 w-full" action={formActionsLapor}>
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
                  Bulan Anggaran
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

      {inputModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>

          <div className="z-10 bg-white w-[45%] py-4 rounded-md shadow-lg">
            <div className="w-full mb-3">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-400 ml-4">
                  Lapor
                </h2>
              </div>
            </div>

            <form
              className="bg-gray-200 px-6 py-7 border-t-3 border-gray-400 w-full"
              action={formActionsTable}
            >
              <div>
                <label className="block font-semibold" htmlFor="title">
                  Judul
                </label>
                <input
                  id="title"
                  type="text"
                  name="name"
                  placeholder="Masukkan judul laporan"
                  className="w-[45%] rounded-md px-3 py-2 bg-gray-100 border border-gray-300"
                />
              </div>

              <div>
                <label className="block font-semibold">Tahun</label>
                <select
                  className="mt-1 rounded-md w-[45%] px-2 py-2 border border-gray-300 bg-gray-100"
                  name="year"
                >
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold">Bulan</label>
                <select
                  className="mt-1 w-[45%] rounded-md px-2 py-2 bg-gray-100 border border-gray-300"
                  name="month"
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

              <div className="flex justify-between px-4 pt-4">
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded cursor-pointer"
                  onClick={() => setModal(false)}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-green-700 text-white px-6 py-2 rounded cursor-pointer"
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

