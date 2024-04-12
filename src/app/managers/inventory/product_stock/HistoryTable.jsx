"use client";

import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { useMemo, useState } from "react";

const Increase = () => {
  return (
    <span className="flex flex-row flex-nowrap gap-1">
      <svg width="20px" height="20px">
        <path
          fill="#00FF00"
          d="M 0,20 L 10,10 L 20,20 Z"
          className="-translate-y-1"
        />
      </svg>
      Increase
    </span>
  );
};
const Decrease = () => {
  return (
    <span className="flex flex-row flex-nowrap  gap-1">
      <svg width="20px" height="20px">
        <path
          fill="#FF0000"
          d="M 0,0 L 10,10 L 20,0 Z"
          className="translate-y-2"
        />
      </svg>
      Decrease
    </span>
  );
};

function HistoryTable({ id }) {
  const change_type = {
    Increase: <Increase />,
    Decrease: <Decrease />,
  };
  const [page, setPage] = useState(1);
  const [history, setHistory] = useState([
    {
      key: 1,
      product: "product name color size",
      product_group_id: "product group",
      units: 342,
      stock_produced_date: new Date().toDateString(),
      change_type: change_type["Decrease"],
    },
    {
      key: 2,
      product: "product name color size",
      product_group_id: "product group",
      units: 342,
      stock_produced_date: new Date().toDateString(),
      change_type: change_type["Increase"],
    },
    {
      key: 3,
      product: "product name color size",
      product_group_id: "product group",
      units: 342,
      stock_produced_date: new Date().toDateString(),
      change_type: change_type["Increase"],
    },
    {
      key: 4,
      product: "product name color size",
      product_group_id: "product group",
      units: 342,
      stock_produced_date: new Date().toDateString(),
      change_type: change_type["Decrease"],
    },
    {
      key: 5,
      product: "product name color size",
      product_group_id: "product group",
      units: 342,
      stock_produced_date: new Date().toDateString(),
      change_type: change_type["Increase"],
    },
  ]);

  const rowsPerPage = 10;
  const pages = Math.ceil(history.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return history.slice(start, end);
  }, [page, history]);

  return (
    <Table
      id={id}
      aria-label="expenses of company for the all time"
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
        <TableColumn key={"stock_produced_date"}>DATE</TableColumn>
        <TableColumn key={"product"}>PRODUCT</TableColumn>
        <TableColumn key={"product_group_id"}>PRODUCT GROUP</TableColumn>
        <TableColumn key={"units"}>UNITS</TableColumn>
        <TableColumn key={"change_type"}>STOCK CHANGE</TableColumn>
      </TableHeader>
      <TableBody items={items} emptyContent={"NO DATA FOUND"}>
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

export default HistoryTable;
