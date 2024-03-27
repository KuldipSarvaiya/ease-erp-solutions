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

function HistoryTable() {
  const [page, setPage] = useState(1);
  const [history, setHistory] = useState([
    {
      key: 1,
      product: "product name color size",
      product_group_id: "product group",
      total_produced_units: 342,
      stock_produced_date: new Date().toDateString(),
    },
    {
      key: 2,
      product: "product name color size",
      product_group_id: "product group",
      total_produced_units: 342,
      stock_produced_date: new Date().toDateString(),
    },
    {
      key: 3,
      product: "product name color size",
      product_group_id: "product group",
      total_produced_units: 342,
      stock_produced_date: new Date().toDateString(),
    },
    {
      key: 4,
      product: "product name color size",
      product_group_id: "product group",
      total_produced_units: 342,
      stock_produced_date: new Date().toDateString(),
    },
    {
      key: 5,
      product: "product name color size",
      product_group_id: "product group",
      total_produced_units: 342,
      stock_produced_date: new Date().toDateString(),
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
      id="download-table"
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
        <TableColumn key={"total_produced_units"}>PRODUCED UNIT</TableColumn>
        {/* <TableColumn key={"description"}>DESCRIPTION</TableColumn> */}
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
