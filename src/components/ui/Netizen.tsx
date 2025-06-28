import Image from "next/image";

export default function Netizen({
  user,
  image,
  komentar,
  tanggal,
}: {
  user: string;
  image: string | undefined | null;
  komentar: string;
  tanggal: string | Date;
}) {
  return (
    <div className="mt-7 flex items-start">
      <Image
        src={image || "/assets/Village/VillageMain/profile.svg"}
        alt="profile"
        width={50}
        height={50}
        className="mr-5 rounded-full object-cover w-12"
      />
      <div>
        <div className="flex items-center gap-3">
          <h1 className="font-semibold text-sm">{user || "Anonim"}</h1>
          <p className="text-gray-400 text-sm w-full">
            {typeof tanggal === "string"
              ? new Date(tanggal).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : tanggal.toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
          </p>
        </div>
        <p className="w-full text-sm mt-1">{komentar}</p>
      </div>
    </div>
  );
}
