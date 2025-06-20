import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt-ts";
const prisma = new PrismaClient();
async function main() {
  const password = hashSync("123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      email: "admin@gmail.com",
      name: "admin",
      role: "admin",
      password: password,
    },
  });
  const user = await prisma.user.upsert({
    where: { email: "user@gmail.com" },
    update: {},
    create: {
      email: "user@gmail.com",
      name: "user",
      password: password,
    },
  });

  const auditor = await prisma.user.upsert({
    where: { email: "auditor@gmail.com" },
    update: {},
    create: {
      email: "auditor@gmail.com",
      name: "auditor",
      password: password,
    },
  });

  const bati_bati = await prisma.village.upsert({
    where: { slug: "bati-bati" },
    update: {},
    create: {
      name: "Desa bati bati",
      slug: "bati-bati",
      kecamatan: "bati bati",
      kabupaten: "Tanah Laut",
      provinsi: "Kalimantan Selatan",
      comments: {},
      budgetPeriod: {
        create: {
          year: 2025,
          month: 1,
          name : "apdes januari 2025",
          BudgetItem:{
            create:[
                
            ]
          }
        },
      },

      laporan: {},
    },
  });

  console.log({ admin });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
