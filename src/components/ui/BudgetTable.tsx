"use client";
import React, { Fragment, useEffect, useState } from "react";
import { getColor } from "@/utils/color";
import { useRouter } from "next/navigation";

export default function BudgetTable({
  role,
  year,
  month,
  setInput,
  slug,
}: {
  role?: string;
  year: number;
  month: number;
  setInput?: any;
  slug: string;
}) {
  const [anggaranDesa, setAnggaranDesa] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [editedItems, setEditedItems] = useState<
    Record<string, { budget: number; realization: number }>
  >({});
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (
    itemId: string,
    field: "anggaran" | "realisasi",
    value: string
  ) => {
    const numValue = value ? parseFloat(value.replace(/[^\d]/g, "")) : 0;

    setEditedItems((prev) => ({
      ...prev,
      [itemId]: {
        ...(prev[itemId] || {}),
        [field === "anggaran" ? "budget" : "realization"]: numValue,
      },
    }));
  };

  const handleSave = async () => {
    if (!anggaranDesa.id) return;
    if (Object.keys(editedItems).length === 0) {
      alert("No changes to save");
      return;
    }
    setIsSaving(true);
    try {
      const updatedItems = anggaranDesa.BudgetItem.map((item: any) => {
        const edited = editedItems[item.id];
        return {
          id: item.id,
          budget:
            edited?.budget !== undefined ? edited.budget : Number(item.budget),
          realization:
            edited?.realization !== undefined
              ? edited.realization
              : Number(item.realization),
          mainCategory: item.mainCategory,
          subCategory: item.subCategory,
          orderNumber: item.orderNumber,
          code: item.code,
          name: item.name,
        };
      });

      const response = await fetch(`/api/village/table`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: anggaranDesa.id,
          BudgetItem: updatedItems,
        }),
      });

      if (!response.ok) throw new Error("Failed to update budget data");

      const result = await response.json();
      setAnggaranDesa(result.data);
      setEditedItems({});
      alert("Budget data updated successfully");
    } catch (error) {
      console.error("Error updating budget:", error);
      alert("Failed to update budget data");
    } finally {
      setInput(false);
      setIsSaving(false);
      router.refresh();
    }
  };

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
  }, [year, month]);

  if (loading) {
    return (
      <>
        <h1>Loading</h1>
      </>
    );
  }

  if (!anggaranDesa || !anggaranDesa.BudgetItem) {
    return (
      <>
        <div className="text-black">Not Found</div>
      </>
    );
  }

  const formatCurrency = (amount: any): string => {
    if (typeof amount !== "number") {
      return "";
    }
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
    const mainCategoryOrder: string[] = [];

    anggaran.BudgetItem.forEach((item: any) => {
      const categoryCode = item.mainCategory;
      if (!mainCategories.has(categoryCode)) {
        mainCategories.set(categoryCode, []);
        mainCategoryOrder.push(categoryCode);
      }
      mainCategories.get(categoryCode)!.push(item);
    });

    mainCategoryOrder.forEach((categoryCode) => {
      const items = mainCategories.get(categoryCode)!;
      const mainCategory = items[0].mainCategory;
      const subCategories = new Map<string, any[]>();
      const subCategoryOrder: string[] = [];

      items.forEach((item) => {
        const subCatCode = item.subCategory || "other";
        if (!subCategories.has(subCatCode)) {
          subCategories.set(subCatCode, []);
          subCategoryOrder.push(subCatCode);
        }
        subCategories.get(subCatCode)!.push(item);
      });

      const sectionData: any["data"] = [];
      let totalBudget = 0;
      let totalRealization = 0;

      subCategoryOrder.forEach((subCatCode) => {
        const subItems = subCategories.get(subCatCode)!;

        if (subItems[0].subCategory) {
          sectionData.push({
            kode: "",
            uraian: subItems[0].subCategory,
            anggaran: "",
            realisasi: "",
            persen: "",
          });
        }

        subItems.forEach((item) => {
          totalBudget += Number(item.budget);
          totalRealization += Number(item.realization);

          sectionData.push({
            id: item.id,
            kode: item.code || "",
            uraian: item.name,
            anggaran: Number(item.budget),
            realisasi: Number(item.realization),
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

    return sections;
  };

  const anggaran = transformBudgetData(anggaranDesa);
  return (
    <>
      {anggaran.length > 0 ? (
        <div>
          <table className="w-full text-white rounded-lg overflow-hidden border-collapse">
            <thead className={`${getColor(role)}`}>
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
                  {section.data?.map((data: any, index: number) => (
                    <tr className="text-center" key={index}>
                      <td className="border border-white  py-1">{data.kode}</td>
                      <td className="border border-white text-left pl-2 py-1">
                        {data.uraian}
                      </td>

                      <td className="border border-white  py-1">
                        {role === "admin" ? (
                          <div>
                            <input
                              name="anggaran"
                              type="text"
                              placeholder={formatCurrency(data.anggaran)}
                              value={
                                editedItems[data.id]?.budget
                                  ? formatCurrency(editedItems[data.id].budget)
                                  : ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  data.id,
                                  "anggaran",
                                  e.target.value
                                )
                              }
                              className="w-full px-2 py-1 text-black"
                            />
                          </div>
                        ) : data.persen ? (
                          formatCurrency(Number(data.anggaran))
                        ) : (
                          ""
                        )}
                      </td>
                      <td className="border border-white  py-1">
                        {role === "admin" ? (
                          <div>
                            <input
                              name="realisasi"
                              type="text"
                              placeholder={formatCurrency(data.realisasi)}
                              value={
                                editedItems[data.id]?.realization
                                  ? formatCurrency(
                                      editedItems[data.id].realization
                                    )
                                  : ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  data.id,
                                  "realisasi",
                                  e.target.value
                                )
                              }
                              className="w-full px-2 py-1 text-black"
                            />
                          </div>
                        ) : data.persen ? (
                          formatCurrency(Number(data.realisasi))
                        ) : (
                          ""
                        )}
                      </td>
                      <td className="border border-white  py-1">
                        {data.persen}
                      </td>
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
          {role === "admin" && (
            <div className="flex justify-end mt-5 gap-2">
              <button
                className="bg-[#E20303] w-1/12 text-white rounded-lg font-semibold p-2 cursor-pointer"
                onClick={() => setEditedItems({})}
              >
                Batal
              </button>
              <button
                className="bg-[#186ac6] w-1/12 text-white rounded-lg font-semibold p-2 cursor-pointer"
                onClick={handleSave}
                disabled={isSaving}
              >
                Simpan
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-black">Not Found</div>
      )}
    </>
  );
}
