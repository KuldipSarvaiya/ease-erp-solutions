import Download from "@/components/Dowload";
import { Divider } from "@nextui-org/react";
import SaleTable from "./SaleTable";
import PurchaseTable from "./PurchaseTable";
import { Suspense } from "react";
import Loading from "@/components/Loading";

export default function SalesPage() {
  //  todo : fetch details from here and send it to tables (parallel fetch both orders)

  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      {/* purchases orders table */}
      <PurchaseTable />

      {/* sales order tables */}
      <div className="border-4 rounded-3xl mx-10 mt-4 mb-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch">
        <p className="text-2xl font-bold tracking-wide w-full flex flex-row justify-between">
          PRODUCT SALES ORDERS <Download />
        </p>
        <Divider className="my-2" />
        <Suspense fallback={<Loading inline={true} key={1} />}>
          <SaleTable
            data={[
              {
                key: 1,
                customer: {
                  customer_id: "er32rwerwfs",
                  name: "kuldip",
                  image: "/AdminPage.svg",
                  address: "123 Main Street, Suite, Suite 330",
                  contact_no: "1234567890",
                  email: "kuldip@example.com",
                  address_coordinates: {
                    latitude: 23.0302,
                    longitude: 72.5772,
                  },
                },
                product: {
                  product_id: "1234567890",
                  name: "red shirt",
                  image: "/AdminPage.svg",
                  color: "#FF0000",
                  size: "xxl",
                },
                units: 3,
                payment_mode: "online",
                transaction_no: "wdas32e2w",
                sub_total: "1000",
                total_tax: "15",
                delivery_charge: "15",
                total_discount: "100",
                net_total: "930",
                order_state: "pending",
              },
            ]}
          />
        </Suspense>
      </div>
    </div>
  );
}
