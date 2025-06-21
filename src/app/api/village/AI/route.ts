import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const { message } = await request.json();
    const village = searchParams.get("village") ?? "";
    const role = searchParams.get("role") ?? "user";
    const year = Number(searchParams.get("year")?? 2025);
    const month =Number(searchParams.get("month")?? 1);
    
    if (!village) {
      return Response.json(
        { error: "village ID is required" },
        { status: 400 }
      );
    }

    const data: any = await prisma.budgetPeriod.findFirst({
      where: {
        villageSlug: village,
        month : month,
        year : year
      },
      include: {
        BudgetItem: true,
      },
    });

    if (!data) {
      return Response.json(
        { error: "village budget data not found" },
        { status: 404 }
      );
    }
    console.log(message)
    if (!message) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    const payload = {
      message: message,
      table: data,
    };

    const body = {
      model: "meta-llama/llama-3.3-8b-instruct:free",
      messages: [
        {
          role: "system",
          content: `Posisikan Dirimu sebagai Ahli Keuangan dan Buat Ringkasan keuangan untuk ${role} desa dari data JSON berikut.
                    Data yang diberikan sudah difilter dan hanya menampilkan item anggaran yang aktif (memiliki anggaran atau realisasi > 0).
                    
                    Analisis data berikut:
                    - Ringkasan umum kondisi keuangan desa
                    - Persentase realisasi anggaran secara keseluruhan
                    - Kategori anggaran dengan realisasi tertinggi dan terendah
                    - Rekomendasi untuk pengelolaan keuangan yang lebih baik

                    Hasilkan dalam format JSON yang valid dan HARUS memiliki struktur seperti ini:
                    {
                        "summary": "string ringkasan lengkap dalam bahasa Indonesia"
                    }
                    
                    Gunakan bahasa Indonesia yang mudah dipahami masyarakat desa. 
                    Jangan ubah nama key apapun dan jangan tambahkan \`\`\`json.`,
        },
        {
          role: "user",
          content: JSON.stringify(payload),
        },
      ],
    };

    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
    let retries = 3;
    let response: Response | undefined;

    while (retries > 0) {
      response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.Llama}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.status !== 429) break;
      await delay(3000);
      retries--;
    }

    if (!response?.ok) {
      console.log(response);
      throw new Error(`HTTP error: ${response?.status}`);
    }

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content || "";

    let parsed;
    try {
      const cleaned = content.replace(/```json\s*|\s*```/g, "").trim();
      parsed = JSON.parse(cleaned);

      if (!parsed.summary) {
        throw new Error("Struktur JSON Tidak Lengkap");
      }
    } catch (error) {
      throw new Error(
        "Gagal Mengurai Response JSON dari LLM, Harap Di Coba Lagi!"
      );
    }

    return Response.json({
      summary: parsed.summary,
      dataTable: data,
    });
  } catch (error) {
    console.error("Error calling api:", error);
    return Response.json(
      { error: "Failed to get response from api" },
      { status: 500 }
    );
  }
}
