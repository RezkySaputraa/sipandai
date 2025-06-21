import SideVillage from "../ui/SideVillage";
import MainVillage from "../ui/MainVillage";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Village } from "@prisma/client";


export default function UserVillage({village} : {village:any}) {

  return (
    <div className="bg-[#EEF0F2] min-h-screen flex px-5 pt-7">
      <SideVillage village={village}></SideVillage>
      <MainVillage  village={village}></MainVillage>
    </div>
  );
}
