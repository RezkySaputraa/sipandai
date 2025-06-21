import UserVillage from "@/components/page/UserVillage";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: any }) {
  const param:any = await params;
  const village = await prisma.village.findFirst({
    where: {
      slug: param.name,
    },
    include:{
      comments: true,
      laporan: true,
    }
  });
  if(!village){
    notFound()
  }
  return (
    <>
      <UserVillage village={village}></UserVillage>
    </>
  );
}
