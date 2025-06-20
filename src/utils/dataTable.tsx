const villages = [
  "Bati-Bati, Bati-Bati, Tanah Laut, Kalimantan Selatan",
  "Tamalate, Tamalate, Makassar, Sulawesi Selatan",
];

const komentarNetizen = [
  {
    user: "Siti Nurhaliza",
    komentar:
      "Program pembangunan jalan desa sangat membantu mobilitas warga. Terima kasih!",
    tanggal: "3 Juni 2025",
  },
  {
    user: "Agus Salim",
    komentar: "Semoga dana desa digunakan dengan transparan dan akuntabel.",
    tanggal: "4 Juni 2025",
  },
  {
    user: "Dewi Sartika",
    komentar: "Tolong perhatikan juga saluran irigasi untuk pertanian kami.",
    tanggal: "4 Juni 2025",
  },
  {
    user: "Budi Hartono",
    komentar:
      "Bagus, tapi mohon laporan keuangan desa ditampilkan lebih rinci.",
    tanggal: "5 Juni 2025",
  },
  {
    user: "Rina Marlina",
    komentar:
      "Acaranya seru, apalagi pas bagian pentas seni dari anak-anak desa!",
    tanggal: "5 Juni 2025",
  },
];

export const anggaranDesa = [
  {
    no: "1",
    title: "Pendapatan Desa",
    data: [
      {
        kode: "1.1",
        uraian: "Pendapatan Asli Desa (PADes)",
        anggaran: "15.000.000",
        realisasi: "13.000.000",
        persen: "86.7%",
      },
      {
        kode: "1.2",
        uraian: "Dana Desa Tahap I",
        anggaran: "200.000.000",
        realisasi: "190.000.000",
        persen: "95.0%",
      },
      {
        kode: "1.3",
        uraian: "Dana Desa Tahap II",
        anggaran: "150.000.000",
        realisasi: "150.000.000",
        persen: "100%",
      },
      {
        kode: "1.4",
        uraian: "Bagi Hasil Pajak dan Retribusi",
        anggaran: "75.000.000",
        realisasi: "70.000.000",
        persen: "93.3%",
      },
      {
        kode: "1.5",
        uraian: "Bantuan Keuangan Kabupaten",
        anggaran: "100.000.000",
        realisasi: "98.000.000",
        persen: "98.0%",
      },
    ],
    total: {
      summary: "Total Pendapatan",
      anggaran: "540.000.000",
      realisasi: "521.000.000",
      persen: "96.5%",
    },
  },
  {
    no: "2",
    title: "Belanja Desa",
    data: [
      {
        kode: "2.1",
        uraian: "Belanja Pegawai",
        anggaran: "120.000.000",
        realisasi: "110.000.000",
        persen: "91.7%",
      },
      {
        kode: "2.2",
        uraian: "Belanja Barang dan Jasa",
        anggaran: "160.000.000",
        realisasi: "155.000.000",
        persen: "96.9%",
      },
      {
        kode: "2.3",
        uraian: "Belanja Modal",
        anggaran: "180.000.000",
        realisasi: "170.000.000",
        persen: "94.4%",
      },
      {
        kode: "2.4",
        uraian: "Belanja Tak Terduga",
        anggaran: "40.000.000",
        realisasi: "38.000.000",
        persen: "95.0%",
      },
      {
        kode: "2.5",
        uraian: "Belanja Lain-lain",
        anggaran: "50.000.000",
        realisasi: "45.000.000",
        persen: "90.0%",
      },
    ],
    total: {
      summary: "Total Belanja",
      anggaran: "550.000.000",
      realisasi: "518.000.000",
      persen: "94.2%",
    },
  },
  {
    no: "3",
    title: "Pembiayaan Desa",
    data: [
      {
        kode: "3.1",
        uraian: "Penerimaan Pembiayaan Awal Tahun",
        anggaran: "100.000.000",
        realisasi: "100.000.000",
        persen: "100%",
      },
      {
        kode: "3.2",
        uraian: "Sisa Lebih Perhitungan Anggaran Tahun Lalu (SiLPA)",
        anggaran: "80.000.000",
        realisasi: "78.000.000",
        persen: "97.5%",
      },
      {
        kode: "3.3",
        uraian: "Pengeluaran Pembiayaan",
        anggaran: "50.000.000",
        realisasi: "48.000.000",
        persen: "96.0%",
      },
      {
        kode: "3.4",
        uraian: "Penyertaan Modal Desa",
        anggaran: "30.000.000",
        realisasi: "30.000.000",
        persen: "100%",
      },
      {
        kode: "3.5",
        uraian: "Pengembalian Investasi",
        anggaran: "20.000.000",
        realisasi: "18.000.000",
        persen: "90.0%",
      },
    ],
    total: {
      summary: "Total Pembiayaan",
      anggaran: "280.000.000",
      realisasi: "274.000.000",
      persen: "97.9%",
    },
  },
];

export { villages, komentarNetizen };
