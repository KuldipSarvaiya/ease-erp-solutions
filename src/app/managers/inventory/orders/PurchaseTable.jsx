"use client";

import Loading from "@/components/Loading";
import {
  Button,
  Divider,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  getKeyValue,
} from "@nextui-org/react";
import Image from "next/image";
import { ImPlus } from "react-icons/im";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const SupplierTooltip = ({ supplier }) => {
  return (
    <Tooltip
      content={
        <div className="flex flex-row gap-3 bg-purple-900/10 backdrop-blur-2xl p-3 rounded-xl border-1 border-purple-900">
          <Image
            alt="supplier img"
            height={100}
            radius="sm"
            src={supplier?.image}
            width={100}
            className="object-cover rounded-lg bg-transparent aspect-square"
            aria-label="photo of supplier"
            aria-labelledby="photo of supplier"
          />
          <div className="flex flex-col gap-1">
            <p className="text-xs text-default-500">ID : {supplier?._id}</p>
            <p className="text-xs text-default-500">
              CONTANCT NO : {supplier?.contact_no}
            </p>
            <p className="text-xs text-default-500">
              EMAIL : {supplier?.email}
            </p>
            <p className="text-xs text-default-500">
              COMPLETED ORDERS : {supplier?.total_completed_orders}
            </p>
            <p className="text-xs text-default-500">
              ADDRESS : {supplier?.address}
            </p>
          </div>
        </div>
      }
      placement="right"
      delay={1000}
      className="bg-transparent border-none shadow-none inline-block"
    >
      <span>{supplier?.name}</span>
    </Tooltip>
  );
};
const RawMaterialTooltip = ({ raw_material }) => {
  return (
    <Tooltip
      content={
        <div className="flex flex-row gap-3 bg-purple-900/10 backdrop-blur-2xl p-3 rounded-xl border-1 border-purple-900">
          <Image
            alt="raw_material img"
            height={100}
            radius="sm"
            src={raw_material?.image}
            width={100}
            className="object-cover rounded-lg bg-transparent aspect-square"
            aria-label="photo of raw_material"
            aria-labelledby="photo of raw_material"
          />
          <div className="flex flex-col gap-2">
            <p className="text-xs text-default-500">ID : {raw_material?._id}</p>
            <p className="text-xs text-default-500">
              COLOR :{" "}
              <span
                style={{ backgroundColor: raw_material?.color }}
                className="text-slate-800 px-3 rounded-2xl"
              >
                {raw_material?.color}
              </span>
            </p>
            <p className="text-xs text-default-500">
              SIZE : {raw_material?.size}
            </p>
            <p className="text-xs text-default-500">
              USAGE PROCESS LEVEL : {raw_material?.usage_process_level}
            </p>

            <p className="text-xs text-default-500">
              <Link
                href={"/managers/inventory/raw_material/" + raw_material._id}
                target="_blank"
              >
                {" "}
                Visit Raw Material Details↗️{" "}
              </Link>
            </p>
          </div>
        </div>
      }
      placement="right"
      delay={1000}
      className="bg-transparent border-none shadow-none inline-block"
    >
      <span>{raw_material?.name}</span>
    </Tooltip>
  );
};

function PurchaseTable() {
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [dataStatus, setDataStatus] = useState(<Loading />);

  useEffect(() => {
    if (orders.length === 0) {
      fetch("/api/inventory/raw_material/order", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.length === 0) return setDataStatus("No Orders Placed Yet");
          // // console.log(data);
          setOrders(
            data?.map((order, i) => {
              return {
                ...order,
                key: i,
                date: (
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                ),
                payment_mode: (
                  <Tooltip
                    content={
                      <Image
                        alt="Bill Image"
                        src={order.bill_image}
                        height={300}
                        width={300}
                        className="object-cover bg-transparent"
                      />
                    }
                    delay={1000}
                  >
                    <span>{order.payment_mode}</span>
                  </Tooltip>
                ),
                supplier: <SupplierTooltip supplier={order.supplier_id} />,
                raw_material: (
                  <RawMaterialTooltip raw_material={order.raw_material_id} />
                ),
                order_receive_date: new Date(
                  order.order_receive_date
                ).toLocaleDateString(),
                order_ordered_date: new Date(
                  order.order_ordered_date
                ).toLocaleDateString(),
                ref: (
                  <span className="text-xs">
                    {order.payment_mode === "inaccount"
                      ? order.transaction_no
                      : order.payment_mode === "check"
                      ? order.check_no
                      : "-"}
                  </span>
                ),
              };
            })
          );
        })
        .catch((error) => {
          // console.log(error);
          setDataStatus("No Orders Placed Yet");
        });
    }
  }, []);

  function downloadPdf() {
    const doc = new jsPDF("landscape", "mm", "a4");
    doc.page =
      doc.internal.pageSize.getWidth() / doc.internal.pageSize.getHeight();
    autoTable(doc, {
      html: "#download-table",
      theme: "grid",
      head: "Kuldip Head",
      foot: "Kuldip Foot",
      showFoot: "everyPage",
      showHead: "everyPage",
      headStyles: { fillColor: "red" },
    });

    doc.save("supplier_order_records.pdf");
  }

  const rowsPerPage = 10;
  const pages = Math.ceil(orders.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return orders.slice(start, end);
  }, [page, orders]);

  return (
    <div className="border-4 rounded-3xl mx-10 mt-4 mb-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch">
      <p className="text-2xl font-bold tracking-wide w-full flex flex-row justify-between">
        RAW MATERIALS PURCHASE ORDERS{" "}
        <span>
          <Button
            as={Link}
            href="/managers/inventory/orders/new_raw_material_order"
            size="sm"
            variant="shadow"
            color="secondary"
            startContent={<ImPlus />}
          >
            NEW ORDER
          </Button>{" "}
          <Button
            size="sm"
            variant="shadow"
            color="secondary"
            aria-label="download-pdf"
            onClick={downloadPdf}
          >
            <FaDownload /> PDF
          </Button>
          {/* <Download /> */}
        </span>
      </p>
      <Divider className="my-2" />
      <Table
        id="download-table"
        aria-label="expenses of company for the all time"
        aria-labelledby="expenses of company for the all time"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader>
          <TableColumn key={"supplier"}>SUPPLIER</TableColumn>
          <TableColumn key={"raw_material"}>RAW MATERIAL</TableColumn>
          <TableColumn key={"date"}>DATE</TableColumn>
          <TableColumn key={"ordered_units"}>UNITS</TableColumn>
          <TableColumn key={"payment_mode"}>PAYMENT</TableColumn>
          <TableColumn key={"ref"}>REFERENCE</TableColumn>
          <TableColumn key={"order_ordered_date"}>ORDERED DATE</TableColumn>
          <TableColumn key={"order_receive_date"}>RECEIVED DATE</TableColumn>
          <TableColumn key={"mrp_per_unit"}>SUB TOTAL</TableColumn>
          <TableColumn key={"total_tax"}>TAX</TableColumn>
          <TableColumn key={"delivery_charge"}>CHARGE</TableColumn>
          <TableColumn key={"total_discount"}>DISCOUNT</TableColumn>
          <TableColumn key={"net_bill_amount"}>NET TOTAL</TableColumn>
        </TableHeader>
        <TableBody items={items} emptyContent={dataStatus}>
          {(item) => (
            <TableRow key={item.name}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default PurchaseTable;
