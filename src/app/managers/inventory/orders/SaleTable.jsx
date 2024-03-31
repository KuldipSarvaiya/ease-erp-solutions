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
const CustomerTooltip = ({ customer }) => {
  return (
    <Tooltip
      content={
        <div className="flex flex-row gap-3 bg-purple-900/10 backdrop-blur-2xl p-3 rounded-xl border-1 border-purple-900">
          <Image
            alt="customer img"
            height={100}
            radius="sm"
            src={customer?.image}
            width={100}
            className="object-contain rounded-lg bg-slate-800"
            aria-label="photo of customer"
            aria-labelledby="photo of customer"
          />
          <div className="flex flex-col gap-1">
            <p className="text-xs text-default-500">
              CUSTOMER ID : {customer?.customer_id}
            </p>
            <p className="text-xs text-default-500">
              CONTANCT NO : {customer?.contact_no}
            </p>
            <p className="text-xs text-default-500">
              EMAIL : {customer?.email}
            </p>
            <p className="text-xs text-default-500">
              ADDRESS : {customer?.address}
            </p>
            <p className="text-xs text-default-500">
              <Link href={"http://localhost:3000/employee"} target="_blank">
                {" "}
                Go To Address {"(Google Map)"} ↗️{" "}
              </Link>
            </p>
          </div>
        </div>
      }
      placement="bottom"
      delay={1000}
      className="bg-transparent border-none shadow-none inline-block"
    >
      <span>{customer?.name}</span>
    </Tooltip>
  );
};
const ProductTooltip = ({ product }) => {
  return (
    <Tooltip
      content={
        <div className="flex flex-row gap-3 bg-purple-900/10 backdrop-blur-2xl p-3 rounded-xl border-1 border-purple-900">
          <Image
            alt="product img"
            height={100}
            radius="sm"
            src={product?.image}
            width={100}
            className="object-contain rounded-lg bg-slate-800"
            aria-label="photo of product"
            aria-labelledby="photo of product"
          />
          <div className="flex flex-col gap-2">
            <p className="text-xs text-default-500">
              PRODUCT ID : {product?.product_id}
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

            <p className="text-xs text-default-500">
              <Link
                href={"/managers/product/" + product.product_id}
                target="_blank"
              >
                {" "}
                Visit Product Details↗️{" "}
              </Link>
            </p>
          </div>
        </div>
      }
      placement="bottom"
      delay={1000}
      className="bg-transparent border-none shadow-none inline-block"
    >
      <span>{product?.name}</span>
    </Tooltip>
  );
};
// to change order status
const OrderStatus = ({ order_state }) => {
  const [state, setState] = useState(order_state);
  return (
    <select
      className="p-0 m-0 rounded-md bg-transparent outline-none"
      onChange={(e) => {
        setState(e.target.value);
      }}
      value={state}
    >
      <option
        className="text-slate-800 disabled:text-slate-400 bg-purple-200"
        disabled={[
          "none",
          "canceled",
          "pending",
          "shiped",
          "complete",
        ].includes(state)}
        value={"none"}
        title="none"
      >
        NONE
      </option>
      <option
        className="text-slate-800 disabled:text-slate-400 bg-purple-200"
        disabled={["canceled", "pending", "shiped", "complete"].includes(state)}
        value={"canceled"}
        title="canceled"
      >
        CANCELED
      </option>
      <option
        className="text-slate-800 disabled:text-slate-400 bg-purple-200"
        disabled={["pending", "shiped", "complete"].includes(state)}
        value={"pending"}
        title="pending"
      >
        PENDING
      </option>
      <option
        className="text-slate-800 disabled:text-slate-400 bg-purple-200"
        disabled={["shiped", "complete"].includes(state)}
        value={"shiped"}
        title="shiped"
      >
        SHIPED
      </option>
      <option
        className="text-slate-800 disabled:text-slate-400 bg-purple-200"
        disabled={["complete"].includes(state)}
        value={"complete"}
        title="complete"
      >
        COMPLETE
      </option>
    </select>
  );
};

function SaleTable({ data }) {
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const temp = data?.map((order) => {
      return {
        ...order,
        customer: <CustomerTooltip customer={order.customer} />,
        product: <ProductTooltip product={order.product} />,
        order_state: <OrderStatus order_state={order.order_state} />,
        ref:
          order.payment_mode === "online"
            ? order.transaction_no
            : order.payment_mode === "check"
            ? order.check_no
            : "-",
      };
    });
    setOrders(temp);
  }, [data]);

  const rowsPerPage = 10;
  const pages = Math.ceil(orders?.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return orders?.slice(start, end);
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
        <TableColumn key={"customer"}>CUSTOMER</TableColumn>
        <TableColumn key={"product"}>PRODUCT</TableColumn>
        <TableColumn key={"units"}>UNITS</TableColumn>
        <TableColumn key={"payment_mode"}>PAYMENT</TableColumn>
        <TableColumn key={"ref"}>REFERENCE</TableColumn>
        <TableColumn key={"sub_total"}>SUB TOTAL</TableColumn>
        <TableColumn key={"total_tax"}>TAX</TableColumn>
        <TableColumn key={"delivery_charge"}>CHARGE</TableColumn>
        <TableColumn key={"total_discount"}>DISCOUNT</TableColumn>
        <TableColumn key={"net_total"}>NET TOTAL</TableColumn>
        <TableColumn key={"order_state"}>STATUS</TableColumn>
        {/* <TableColumn key={"description"}>DESCRIPTION</TableColumn> */}
      </TableHeader>
      <TableBody items={items} emptyContent={"NO DATA AVAILABLE"}>
        {(item) => (
          <TableRow key={item?.name}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default SaleTable;
