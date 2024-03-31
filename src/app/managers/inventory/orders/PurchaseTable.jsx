"use client";

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
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

// todo : place google map link with given coordinates
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
            className="object-contain rounded-lg bg-slate-800"
            aria-label="photo of supplier"
            aria-labelledby="photo of supplier"
          />
          <div className="flex flex-col gap-1">
            <p className="text-xs text-default-500">
              SUPPLIER ID : {supplier?.supplier_id}
            </p>
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
      placement="bottom"
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
            className="object-contain rounded-lg bg-slate-800"
            aria-label="photo of raw_material"
            aria-labelledby="photo of raw_material"
          />
          <div className="flex flex-col gap-2">
            <p className="text-xs text-default-500">
              Raw Material ID : {raw_material?.raw_material_id}
            </p>
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
                href={"/managers/raw_material/" + raw_material.raw_material_id}
                target="_blank"
              >
                {" "}
                Visit Raw Material Details↗️{" "}
              </Link>
            </p>
          </div>
        </div>
      }
      placement="bottom"
      delay={1000}
      className="bg-transparent border-none shadow-none inline-block"
    >
      <span>{raw_material?.name}</span>
    </Tooltip>
  );
};

function PurchaseTable({ data }) {
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const temp = data?.map((order) => {
      return {
        ...order,
        supplier: <SupplierTooltip supplier={order.supplier} />,
        raw_material: <RawMaterialTooltip raw_material={order.raw_material} />,
        order_receive_date: new Date(
          order.order_receive_date
        ).toLocaleDateString(),
        order_ordered_date: new Date(
          order.order_ordered_date
        ).toLocaleDateString(),
        ref:
          order.payment_mode === "inaccount"
            ? order.transaction_no
            : order.payment_mode === "check"
            ? order.check_no
            : "-",
      };
    });
    setOrders(temp);
  }, [data]);

  const rowsPerPage = 10;
  const pages = Math.ceil(orders.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return orders.slice(start, end);
  }, [page, orders]);

  return (
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
      <TableBody items={items} emptyContent={"NO DATA AVAILABLE"}>
        {(item) => (
          <TableRow key={item.name}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default PurchaseTable;
