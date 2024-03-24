import Download from "@/components/Dowload";
import ProductCard from "@/components/cards/ProductCard";
import { Button, Divider } from "@nextui-org/react";
import NewProduct from "./NewProduct";
import Link from "next/link";

export default function Page({ params: { id } }) {
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
          <NewProduct id={id} />
        </div>
      </div>
    </div>
  );
}
