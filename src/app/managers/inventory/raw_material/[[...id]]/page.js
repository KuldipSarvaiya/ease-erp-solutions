import Download from "@/components/Dowload";
import { Button, Divider } from "@nextui-org/react";
import NewRawMaterial from "./NewRawMaterial";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import RawMaterialCard from "@/components/cards/RawMaterialCard";
import connectDB from "@/lib/mongoose";
import RawMaterial from "@/lib/models/raw_material.model";
import { MdDelete } from "react-icons/md";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function Page({ params: { id } }) {
  // console.log(id);

  await connectDB();

  const raw_material = await RawMaterial.aggregate([
    {
      $match: {
        is_deleted: false,
      },
    },
    {
      $lookup: {
        from: "departments",
        localField: "produced_by",
        foreignField: "_id",
        as: "produced_by",
      },
    },
    {
      $lookup: {
        from: "departments",
        localField: "used_by",
        foreignField: "_id",
        as: "used_by",
      },
    },
  ]);

  const id_raw_material = raw_material.filter(
    (item) => item._id.toString() === id?.[0]
  )[0];

  // // console.log("\n\n*********** RAW MATERIALS = ", id_raw_material);

  async function deleteRawMaterialAction(formdata) {
    "use server";

    const id = formdata.get("id");

    await connectDB();

    const res = await RawMaterial.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: { is_deleted: true } }
    );

    // console.log(res, id);

    if (res.acknowledged) {
      revalidatePath("/managers/inventory/raw_material");
      return redirect("/managers/inventory/raw_material");
    }
  }

  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      {/* display raw materials  */}
      <div className="border-4 rounded-3xl mx-10 mt-4 mb-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch max-h-[85dvh] overflow-y-scroll">
        <p className="text-2xl font-bold tracking-wide w-full flex flex-row justify-between">
          MANAGE RAW MATERIALS <Download />
        </p>
        <Divider className="my-2" />
        <div className="lg:columns-3 md:columns-2 max-sm:columns-1 gap-8 space-y-8">
          {raw_material?.map((item) => (
            <RawMaterialCard key={item._id} card_only={false} material={item} />
          ))}
        </div>
      </div>

      {/* edit products */}
      <Suspense fallback={<Loading />}>
        <div className="relative w-full h-full max-h-full max-w-full">
          <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500">
            <p className="uppercase text-2xl max-md:text-lg tracking-wider font-bold mb-5 flex flex-row justify-between">
              {id
                ? "UPDATE RAW MATERIAL : " + id_raw_material?.name
                : "CREATE NEW RAW MATERIAL"}
              {id && (
                <span className="flex gap-5 items-center justify-center">
                  <Button
                    as={Link}
                    href="/managers/inventory/raw_material"
                    color="secondary"
                    variant="shadow"
                    size="sm"
                  >
                    CREATE NEW RAW MATERIAL
                  </Button>
                  <form action={deleteRawMaterialAction}>
                    <input hidden type="text" name="id" value={id} />
                    <Button
                      type="submit"
                      color="secondary"
                      variant="shadow"
                      size="sm"
                      endContent={<MdDelete />}
                    >
                      DELETE RAW MATERIAL
                    </Button>
                  </form>
                </span>
              )}
            </p>
            <Divider className="my-5" />
            <NewRawMaterial
              id={id}
              data={{
                ...id_raw_material,
                description: id_raw_material?.description.join(" ;") || "",
                chemical_property:
                  id_raw_material?.chemical_property.join(" ;") || "",
                produced_by: id_raw_material?.produced_by?.map((item) =>
                  item?._id?.toString()
                ),
                used_by: id_raw_material?.used_by?.map((item) =>
                  item?._id?.toString()
                ),
                photo: id_raw_material?.image,
                image: undefined,
              }}
            />
          </div>
        </div>
      </Suspense>
    </div>
  );
}
