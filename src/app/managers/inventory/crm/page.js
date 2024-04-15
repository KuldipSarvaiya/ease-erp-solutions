"use client";

import { Button, Divider } from "@nextui-org/react";
import CustomerTable from "./CustomerTable";
// import Download from "@/components/Dowload";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import SupplierTable from "./SupplierTable";
import { FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Page() {
  function downloadPdf(id) {
    const doc = new jsPDF("portrait", "mm", "a4");
    doc.page =
      doc.internal.pageSize.getWidth() / doc.internal.pageSize.getHeight();
    autoTable(doc, {
      html: `#${id}`,
      theme: "grid",
      head: "Kuldip Head",
      foot: "Kuldip Foot",
      showFoot: "everyPage",
      showHead: "everyPage",
      headStyles: { fillColor: "red" },
    });

    doc.save(id + "_records.pdf");
  }
  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      <div className="border-4 rounded-3xl mx-10 mt-4 mb-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch">
        <p className="text-2xl font-bold tracking-wide flex justify-between flex-row w-full">
          CUSTOMERS{" "}
          <span className="flex gap-2">
            <Button
              as={Link}
              href="/managers/inventory/crm/customer"
              color="secondary"
              variant="shadow"
              size="sm"
              startContent={<FaPlus />}
            >
              ADD CUSTOMER
            </Button>
            <Button
              size="sm"
              variant="shadow"
              color="secondary"
              aria-label="download-pdf"
              onClick={() => downloadPdf("customer-table")}
            >
              <FaDownload /> PDF
            </Button>
            {/* <Download id={"customer_table"} /> */}
          </span>
        </p>
        <Divider className="my-2" />
        <CustomerTable id={"customer-table"} />
      </div>

      {/* supplier table */}
      <div className="border-4 rounded-3xl mx-10 mt-4 mb-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch">
        <p className="text-2xl font-bold tracking-wide flex justify-between flex-row w-full">
          SUPPLIERS
          <span className="flex gap-2">
            <Button
              as={Link}
              href="/managers/inventory/crm/supplier"
              color="secondary"
              variant="shadow"
              size="sm"
              startContent={<FaPlus />}
            >
              ADD SUPPLIER
            </Button>{" "}
            <Button
              size="sm"
              variant="shadow"
              color="secondary"
              aria-label="download-pdf"
              onClick={() => downloadPdf("supplier-table")}
            >
              <FaDownload /> PDF
            </Button>
            {/* <Download id={"supplier-table"} /> */}
          </span>
        </p>
        <Divider className="my-2" />
        <SupplierTable id={"supplier-table"} />
      </div>
    </div>
  );
}
