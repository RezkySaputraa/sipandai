"use client";
import React, { Fragment, useEffect, useState } from "react";


export default function BudgetTable({
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
  const [anggaranDesa, setAnggaranDesa] = useState<any>({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchAnggaranDesa = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/village/table?slug=${slug}&year=${year}&month=${month}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch budget data");
        }

        const result = await response.json();
        setAnggaranDesa(result.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnggaranDesa();
  }, [year,month]);

  if (loading){
    return <>
      <h1>Loading</h1>
    </>
  }

  if (!anggaranDesa || !anggaranDesa.BudgetItem){
   return <>
    <div className="text-black">Not Found</div>
   </>
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
const calculatePercentage = (realization: number, budget: number): string => {
    if (budget === 0) return "0%";
    return `${((realization / budget) * 100).toFixed(1)}%`;
  };

  const transformBudgetData = (anggaran: any): any[] => {
    const sections: any[] = [];
    const mainCategories = new Map<string, any[]>();

    anggaran.BudgetItem.forEach((item) => {
      const categoryCode = item.mainCategory;
      if (!mainCategories.has(categoryCode)) {
        mainCategories.set(categoryCode, []);
      }
      mainCategories.get(categoryCode)!.push(item);
    });

    mainCategories.forEach((items, categoryCode) => {
      const mainCategory = items[0].mainCategory;
      const subCategories = new Map<string, any[]>();

      items.forEach((item) => {
        const subCatCode = item.subCategory || "other";
        if (!subCategories.has(subCatCode)) {
          subCategories.set(subCatCode, []);
        }
        subCategories.get(subCatCode)!.push(item);
      });

      const sectionData: any["data"] = [];
      let totalBudget = 0;
      let totalRealization = 0;

      console.log( subCategories);
      subCategories.forEach((subItems, subCatCode) => {
        if (subItems[0].subCategory) {
          sectionData.push({
            kode: subItems[0].subCategory,
            uraian: subItems[0].subCategory,
            anggaran: "",
            realisasi: "",
            persen: "",
          });
        }

        subItems
          .sort((a, b) => a.orderNumber - b.orderNumber)
          .forEach((item) => {
            totalBudget += Number(item.budget);
            totalRealization += Number(item.realization);

            sectionData.push({
              kode: item.code || "",
              uraian: item.name, 
              anggaran: formatCurrency(Number(item.budget)),
              realisasi: formatCurrency(Number(item.realization)),
              persen: calculatePercentage(
                Number(item.realization),
                Number(item.budget)
              ),
            });
          });
      });

      sections.push({
        no: categoryCode,
        title: mainCategory,
        data: sectionData,
        total: {
          summary: `JUMLAH ${mainCategory}`,
          anggaran: formatCurrency(totalBudget),
          realisasi: formatCurrency(totalRealization),
          persen: calculatePercentage(totalRealization, totalBudget),
        },
      });
    });

    return sections.sort((a, b) => a.no.localeCompare(b.no));
  };

  const anggaran = transformBudgetData(anggaranDesa);

  return (
    <>
      {anggaran.length > 0 ? (
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
            {anggaran.map((section, index) => (
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
