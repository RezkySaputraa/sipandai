import Image from "next/image";

export default function Netizen() {
  return (
    <div className="flex ml-1 mt-5">
      <div>
        <Image
          src="/assetsweb/Village/VillageMain/profile.svg"
          width={75}
          height={75}
          alt="netizen"
        ></Image>
      </div>
      <div className="ml-7">
        <h2 className="font-bold text-md">Netizen</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, vero,
          voluptatum praesentium optio exercitationem laborum deserunt dolores
          maiores voluptatem consequatur incidunt? Dolores, repudiandae ducimus.
          Alias velit, eius facere quasi praesentium exercitationem autem totam
          nulla! Itaque veniam doloremque qui numquam ipsa.
        </p>
      </div>
    </div>
  );
}
