
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { anggaranDesa } from "./dataTable";

const handleExcel = () => {
  const allRows: any = [];

  anggaranDesa.forEach((section) => {
    allRows.push({
      "Kode Rekening": section.no,
      Uraian: section.title,
      "Anggaran (Rp)": "",
      "Realisasi (Rp)": "",
      "% Realisasi": "",
    });
    section.data.forEach((data) => {
      allRows.push({
        "Kode Rekening": data.kode,
        Uraian: data.uraian,
        "Anggaran (Rp)": data.anggaran,
        "Realisasi (Rp)": data.realisasi,
        "% Realisasi": data.persen,
      });
    });
    allRows.push({
      "Kode Rekening": section.total.summary,
      Uraian: "",
      "Anggaran (Rp)": section.total.anggaran,
      "Realisasi (Rp)": section.total.realisasi,
      "% Realisasi": section.total.persen,
    });
    allRows.push({});
  });
  const worksheet = XLSX.utils.json_to_sheet(allRows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Anggaran 2025");

  const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const fileData = new Blob([buffer], { type: "application/octet-stream" });
  saveAs(fileData, "anggaran_desa_2025.xlsx");
};

export default handleExcel;
