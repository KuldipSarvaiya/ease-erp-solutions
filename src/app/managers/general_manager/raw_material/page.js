import RawMaterialCard from "@/components/cards/RawMaterialCard";
import { Divider } from "@nextui-org/react";

export default function LowMaterialPage() {
  //  ! Fetch data of all raw materials here

  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      {/* used materials */}
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch">
        <p className="text-2xl font-bold tracking-wide w-full">
          USED RAW MATERIAL
        </p>
        <Divider className="my-3" />{" "}
        <div className="flex flex-row flex-wrap justify-start gap-7 lg:px-8">
          <RawMaterialCard card_only={true} />
          <RawMaterialCard card_only={true} />
          <RawMaterialCard card_only={true} />
        </div>
      </div>

      {/* produced materials */}
      <div className="border-4 rounded-3xl mx-10 mb-4 mt-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch">
        <p className="text-2xl font-bold tracking-wide w-full">
          PRODUCED RAW MATERIAL
          {/* // ? do here product if this department produces product */}
        </p>
        <Divider className="my-3" />
        <div className="flex flex-row flex-wrap justify-start gap-7 lg:px-8">
          <RawMaterialCard card_only={true} />
          <RawMaterialCard card_only={true} />
          <RawMaterialCard card_only={true} />
          <RawMaterialCard card_only={true} />
        </div>
      </div>
    </div>
  );
}
