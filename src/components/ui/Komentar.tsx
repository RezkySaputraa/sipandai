import Image from "next/image";
import Netizen from "./Netizen";
import { getColor } from "@/utils/color";

export default function Komentar({ role }: { role: string }) {
  return (
    <div>
      <div>
        <h1 className="font-bold text-2xl my-6">3 Komentar</h1>
        <div className="flex gap-2 items-center">
          <Image
            src={"/assetsweb/Village/VillageMain/profile.svg"}
            width={40}
            height={40}
            alt="profile"
          ></Image>
          <input
            type="text"
            placeholder="Tambahkan Komentar"
            className="border-b-2 border-gray-300 w-full ml-4"
          />
        </div>
      </div>
      <div className="flex gap-4 justify-end">
        <button className="font-semibold">Batal</button>
        <button
          className={`font-semibold text-white ${getColor(
            role
          )} rounded-lg p-2`}
        >
          Komentar
        </button>
      </div>
      <Netizen></Netizen>
      <Netizen></Netizen>
    </div>
  );
}
