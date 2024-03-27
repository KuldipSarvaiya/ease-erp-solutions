import Download from "@/components/Dowload";
import ProductSmall from "@/components/cards/ProductSmall";
import HistoryTable from "./HistoryTable";
import { Divider } from "@nextui-org/react";

export default function ProdStockPage() {
  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      {/*  products  */}
      <div className="border-4 rounded-3xl mx-10 mt-4 mb-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch">
        <div className="text-2xl font-bold tracking-wide w-full flex flex-row justify-between">
          PRODUCTS STOCK <Download />
        </div>
        <Divider className="my-2" />

        <div className="grid gap-3 w-full manager_inventory_product_stock">
          <ProductSmall />
          <ProductSmall />
          <ProductSmall />
        </div>
      </div>
      <div className="border-4 rounded-3xl mx-10 mt-4 mb-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch">
        <div className="text-2xl font-bold tracking-wide w-full flex flex-row justify-between">
          PRODUCTS STOCK HISTORY <Download />
        </div>
        <Divider className="my-2" />
        <div className="w-full">
          <HistoryTable />
        </div>
      </div>
    </div>
  );
}
