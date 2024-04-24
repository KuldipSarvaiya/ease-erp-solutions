import SaleTable from "./SaleTable";
import PurchaseTable from "./PurchaseTable";

export default function SalesPage() {
  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      {/* purchases orders table */}
      <PurchaseTable />

      {/* sales order tables */}
      <SaleTable />
    </div>
  );
}
