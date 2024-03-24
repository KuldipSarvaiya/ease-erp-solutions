import Download from "@/components/Dowload";
import ProductCard from "@/components/cards/ProductCard";
import { Button, Divider } from "@nextui-org/react";
import NewProduct from "./NewProduct";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "@/components/Loading";

export default async function Page({ params: { id } }) {
  // ! Fetch data of given id when it is available and send to <NewProduct /> to display
  console.log(id);

  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      {/* display products  */}

      <div className="border-4 rounded-3xl mx-10 mt-4 mb-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch">
        <p className="text-2xl font-bold tracking-wide w-full flex flex-row justify-between">
          MANAGE PRODUCTS <Download />
        </p>
        <Divider className="my-2" />
        <div className="flex flex-row flex-wrap justify-start gap-10 lg:px-14">
          <ProductCard />
          <ProductCard />
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
                name: "shirt",
                size: "m, l, xl, xxl",
                description: "this is shirt\n short sleaves",
                unit_of_measurement: "piece",
                expiry_timing: "no expiry",
                chemical_property: "cotton\n row color",
                price: 1222,
                discount: 12,
                available_stock_units: 12,
                tags: "ok,ok",
                color: "#ffffff",
              }}
            />
          </div>
        </div>
      </Suspense>
    </div>
  );
}
