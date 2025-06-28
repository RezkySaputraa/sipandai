import SideVillage from "../ui/SideVillage";
import MainVillage from "../ui/MainVillage";
import { auth } from "@/app/auth";


export default async function UserVillage({village} : {village:any}) {

  const session = await auth();
  
  return (
    <div className="bg-[#EEF0F2] min-h-screen flex px-5 pt-7">
      <SideVillage village={village} role={session?.user?.role || "user"} userId={session?.user.id || ""}></SideVillage>
      <MainVillage  village={village} role={session?.user?.role || "user"} userId={session?.user.id || ""}></MainVillage>
    </div>
  );
}
