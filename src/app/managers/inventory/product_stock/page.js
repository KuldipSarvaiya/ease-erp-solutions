import Download from "@/components/Dowload";
import ProductSmall from "@/components/cards/ProductSmall";
import HistoryTable from "./HistoryTable";
import { Divider } from "@nextui-org/react";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import Product from "@/lib/models/product.model";

export default async function ProdStockPage() {
  const products = await Product.find({});

  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      {/*  products  */}
      <div className="border-4 rounded-3xl mx-10 mt-4 mb-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch">
        <div className="text-2xl font-bold tracking-wide w-full flex flex-row justify-between">
          PRODUCTS STOCK <Download />
        </div>
        <Divider className="my-2" />

        <div className="grid gap-3 w-full manager_inventory_product_stock">
          {products.length === 0 && (
            <h1>No Is Available For This Department</h1>
          )}
          {products?.map((product) => (
            <ProductSmall product={product} />
          ))}
        </div>
      </div>
      <div className="border-4 rounded-3xl mx-10 mt-4 mb-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch">
        <div className="text-2xl font-bold tracking-wide w-full flex flex-row justify-between">
          PRODUCTS STOCK HISTORY <Download id={"product_stock_table"} />
        </div>
        <Divider className="my-2" />
        <div className="w-full">
          <Suspense fallback={<Loading />}>
            <HistoryTable id={"product_stock_table"} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
