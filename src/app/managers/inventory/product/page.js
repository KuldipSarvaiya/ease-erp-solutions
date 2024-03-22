import ProductCard from "@/components/cards/ProductCard";
import { Divider } from "@nextui-org/react";

export default function Page() {
  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      {/* products */}
      <div className="border-4 rounded-3xl mx-10 mt-4 mb-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch">
        <p className="text-2xl font-bold tracking-wide w-full">
          MANAGE PRODUCTS
        </p>
        <Divider className="my-2" />
        <div className="flex flex-row flex-wrap justify-start gap-10 lg:px-14">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>

      {/* create new product */}
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch">
        <p className="text-2xl font-bold tracking-wide w-full">
          ADD NEW PRODUCT
        </p>
        <Divider className="my-2" />
        <div></div>
      </div>
    </div>
  );
}
