import Download from "@/components/Dowload";
import ProductSmall from "@/components/cards/ProductSmall";
import HistoryTable from "./HistoryTable";
import {  Divider } from "@nextui-org/react";  
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
            <ProductSmall key={product?._id} product={product} />
          ))}
        </div>
      </div>
      <HistoryTable />
    </div>
  );
}
