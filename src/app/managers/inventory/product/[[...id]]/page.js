import Download from "@/components/Dowload";
import ProductCard from "@/components/cards/ProductCard";
import { Button, Divider } from "@nextui-org/react";
import NewProduct from "./NewProduct";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import connectDB from "@/lib/mongoose";
import Product from "@/lib/models/product.model";

export default async function Page({ params: { id } }) {
  console.log(id);

  await connectDB();

  const products = await Product.aggregate([
    {
      $lookup: {
        from: "departments",
        localField: "produced_by",
        foreignField: "_id",
        as: "produced_by",
      },
    },
  ]);

  const id_product = products.filter(
    (item) => item._id.toString() === id?.[0]
  )[0];

  console.log("tha toitem = ", id_product);

  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      {/* display products  */}

      <div className="border-4 rounded-3xl mx-10 mt-4 mb-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch">
        <p className="text-2xl font-bold tracking-wide w-full flex flex-row justify-between">
          MANAGE PRODUCTS <Download />
        </p>
        <Divider className="my-2" />
        <div className="relative grid place-content-center w-full">
          <div className="lg:columns-3 md:columns-2 max-sm:columns-1 gap-8 space-y-8">
            {!products && (
              <div className="flex flex-row gap-5 justify-center items-center p-20">
                <span className="animate-spinner-linear-spin duration-75">
                  <Loading inline={true} />
                </span>
                No Product Details Right Now
              </div>
            )}
            {products?.map((item) => (
              <ProductCard key={item._id} card_only={false} product={item} />
            ))}
          </div>
        </div>
      </div>

      {/* edit products */}
      <Suspense fallback={<Loading />}>
        <div className="relative w-full h-full max-h-full max-w-full">
          <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500">
            <p className="uppercase text-2xl max-md:text-lg tracking-wider font-bold mb-5 flex flex-row justify-between">
              {id ? "UPDATE PRODUCT : " + id : "CREATE NEW PRODUCT"}
              {id && (
                <Button
                  as={Link}
                  href="/managers/inventory/product"
                  color="secondary"
                  variant="shadow"
                  size="sm"
                >
                  CREATE NEW PRODUCT
                </Button>
              )}
            </p>
            <Divider className="my-5" />
            <NewProduct
              id={id}
              data={{
                ...id_product,
                description: id_product?.description?.join(" ; "),
                chemical_property: id_product?.chemical_property?.join(" ; "),
                tags: id_product?.tags?.join(","),
                produced_by: id_product?.produced_by?.map((item) =>
                  item?._id?.toString()
                ),
                photo: id_product?.image,
                image: undefined,
              }}
            />
          </div>
        </div>
      </Suspense>
    </div>
  );
}
