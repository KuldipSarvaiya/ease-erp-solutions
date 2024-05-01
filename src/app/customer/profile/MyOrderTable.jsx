"use client";

import Loading from "@/components/Loading";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  getKeyValue,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
// import Download from "@/components/Dowload";
import { Divider } from "@nextui-org/react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaDownload } from "react-icons/fa";
import Link from "next/link";

const ProductTooltip = ({ product }) => {
  return (
    <Tooltip
      content={
        <div className="flex flex-row gap-3 bg-purple-900/10 backdrop-blur-2xl p-3 rounded-xl border-1 border-purple-900">
          <Image
            alt="product img"
            height={100}
            radius="sm"
            src={"/kuldip_upload/" + product?.image}
            width={100}
            className="object-contain rounded-lg bg-transparent aspect-square"
            aria-label="photo of product"
            aria-labelledby="photo of product"
          />
          <div className="flex flex-col gap-1">
            <p className="text-xs text-default-500">
              PRODUCT GROUP : {product?.product_group_id}
            </p>
            <p className="text-xs text-default-500">
              COLOR :{" "}
              <span
                style={{ backgroundColor: product?.color }}
                className="text-slate-800 px-3 rounded-2xl"
              >
                {product?.color}
              </span>
            </p>
            <p className="text-xs text-default-500">SIZE : {product?.size}</p>
            <p className="text-xs text-default-500">PRICE : {product?.price}</p>
            <Link
              href={`/customer/products/${
                product?.product_group_id
              }?color=${product?.color.substr(1, 10)}&size=${product?.size}`}
              className="text-xs text-default-500"
            >
              visit product ↗️
            </Link>
          </div>
        </div>
      }
      placement="right"
      delay={1000}
      className="bg-transparent border-none shadow-none inline-block"
    >
      <span>{product?.name}</span>
    </Tooltip>
  );
};

function MyOrderTable({ customer_id }) {
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [dataStatus, setDataStatus] = useState(<Loading />);

  // fetch details
  useEffect(() => {
    if (orders.length === 0 && customer_id) {
      fetch("/api/inventory/product/order?customer_id=" + customer_id, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.length === 0) return setDataStatus("No Orders Placed Yet");
          setOrders(
            data?.map((order, i) => {
              return {
                key: i,
                ...order,
                product: <ProductTooltip product={order.product} />,
                date: (
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                ),
                ref: order.razorpay_payment_id || "-",
              };
            })
          );
        })
        .catch((error) => {
          // console.log(error);
          setDataStatus("No Orders Placed Yet");
        });
    }
  }, [customer_id]);

  function downloadPdf() {
    const doc = new jsPDF("landscape", "mm", "a4");
    doc.page =
      doc.internal.pageSize.getWidth() / doc.internal.pageSize.getHeight();
    autoTable(doc, {
      html: "#download-table-sales",
      theme: "grid",
      head: "Kuldip Head",
      foot: "Kuldip Foot",
      showFoot: "everyPage",
      showHead: "everyPage",
      headStyles: { fillColor: "red" },
    });

    doc.save("customer_order_records.pdf");
  }

  const rowsPerPage = 10;
  const pages = Math.ceil(orders?.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return orders?.slice(start, end);
  }, [page, orders]);

  return (
    <div className="border-4 rounded-3xl mt-8 mb-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch">
      <p className="text-2xl font-bold tracking-wide w-full flex flex-row justify-between">
        PRODUCT ORDERS
        {/* <Download /> */}
        <Button
          size="sm"
          variant="shadow"
          color="secondary"
          aria-label="download-pdf"
          onClick={downloadPdf}
        >
          <FaDownload /> PDF
        </Button>
      </p>
      <Divider className="my-2" />

      <Table
        id="download-table-sales"
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
          <TableColumn key={"product"}>PRODUCT</TableColumn>
          <TableColumn key={"date"}>DATE</TableColumn>
          <TableColumn key={"units"}>UNITS</TableColumn>
          <TableColumn key={"payment_mode"}>PAYMENT</TableColumn>
          <TableColumn key={"ref"}>REFERENCE</TableColumn>
          <TableColumn key={"sub_total"}>SUB TOTAL</TableColumn>
          <TableColumn key={"tax"}>TAX</TableColumn>
          <TableColumn key={"discount"}>DISCOUNT</TableColumn>
          <TableColumn key={"net_total"}>NET TOTAL</TableColumn>
          <TableColumn key={"order_state"}>STATUS</TableColumn>
        </TableHeader>
        <TableBody items={items} emptyContent={dataStatus}>
          {(item) => (
            <TableRow key={item?.name}>
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

export default MyOrderTable;
