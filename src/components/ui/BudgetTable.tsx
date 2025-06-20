import { anggaranDesa } from "@/utils/dataTable";
import React, { Fragment } from "react";
export default function BudgetTable({ role }: { role?: string }) {
  return (
    <>
      {anggaranDesa.length > 0 ? (
        <table className="w-full text-white rounded-lg overflow-hidden border-collapse">
          <thead
            className={`${
              role === "auditor" ? "bg-[#0093DD]" : "bg-[#08B786]"
            }`}
          >
            <tr>
              <th className="border border-white py-1" rowSpan={2}>
                Desa Bati-Bati
              </th>
              <th className="border border-white  py-1" colSpan={5}>
                Anggaran & Realisasi Desa Bati-Bati
              </th>
            </tr>
            <tr>
              <th className="border border-white  py-1" colSpan={5}>
                2025
              </th>
            </tr>
            <tr>
              <th className="border border-white py-1">Kode Rekening</th>
              <th className="border border-white pl-2 text-left  py-1">
                Uraian
              </th>
              <th className="border border-white  py-1">Anggaran (Rp)</th>
              <th className="border border-white  py-1">Realisasi (Rp)</th>
              <th className="border border-white  py-1">% Realisasi</th>
            </tr>
          </thead>

          <tbody className="bg-[#E2E8F0] text-black">
            {anggaranDesa.map((section, index) => (
              <Fragment key={index}>
                <tr className="text-center">
                  <td className="border border-white  py-1">
                    <b>{section.no}</b>
                  </td>
                  <td
                    className="border text-left border-white pl-2 py-1"
                    colSpan={4}
                  >
                    {section.title}
                  </td>
                </tr>
                {section.data?.map((data, index) => (
                  <tr className="text-center" key={index}>
                    <td className="border border-white  py-1">{data.kode}</td>
                    <td className="border border-white text-left pl-2 py-1">
                      {data.uraian}
                    </td>
                    <td className="border border-white  py-1">
                      {data.anggaran}
                    </td>
                    <td className="border border-white  py-1">
                      {data.realisasi}
                    </td>
                    <td className="border border-white  py-1">{data.persen}</td>
                  </tr>
                ))}
                <tr className="text-center">
                  <td className="border border-white py-1">
                    <b>{section.total?.summary}</b>
                  </td>
                  <td></td>
                  <td className="border border-white py-1">
                    {section.total?.anggaran}
                  </td>
                  <td className="border border-white py-1">
                    {section.total?.realisasi}
                  </td>
                  <td className="border border-white py-1">
                    {section.total?.persen}
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-black">Not Found</div>
      )}
    </>
  );
}
