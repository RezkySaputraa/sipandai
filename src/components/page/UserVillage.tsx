import SideVillage from "../ui/SideVillage";
import MainVillage from "../ui/MainVillage";

export default function UserVillage() {
  return (
    <div className="bg-[#EEF0F2] min-h-screen flex px-5 pt-7">
      <SideVillage></SideVillage>
      <MainVillage></MainVillage>
    </div>
  );
}
