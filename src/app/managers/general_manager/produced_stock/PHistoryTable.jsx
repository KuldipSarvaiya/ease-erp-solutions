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
  getKeyValue,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { BsCircleFill } from "react-icons/bs";
import { notFound } from "next/navigation";
import getCookie from "@/lib/utils/getCookie";

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

function PHistoryTable({ id }) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(
        "/api/auth/signin?callbackUrl=/managers/general_manager/produced_stock"
      );
    },
  });

  let department_id = session?.user?.department_id?._id;

  if (session?.user?.designation === "Admin") {
    department_id = getCookie("department_id");
    if (!department_id) return notFound();
  }

  const change_type = {
    Increase: <Increase />,
    Decrease: <Decrease />,
  };
  const [page, setPage] = useState(1);
  const [history, setHistory] = useState([]);
  const [dataStatus, setDataStatus] = useState(<Loading />);

  useEffect(() => {
    if (history.length === 0 && department_id)
      fetch(
        "/api/inventory/product/stock_history?department=" + department_id,
        {
          method: "GET",
          next: { tags: ["ProductStockHistory"] },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.length === 0)
            return setDataStatus("No Stock History Available");

          const data2 = data.map((item, i) => ({
            ...item,
            key: i,
            stock_produced_date: new Date(
              item.stock_produced_date
            ).toDateString(),
            change_type: change_type[item.change_type],
            product: (
              <span className="flex flex-row flex-nowrap gap-1 items-center">
                {item.product.name}
                <BsCircleFill style={{ color: item.product.color }} />
                {item.product.size}
              </span>
            ),
            available_stock_units: (
              <span>
                {item.units} {item.product.unit_of_measurement}
              </span>
            ),
          }));
          setHistory(data2);
        })
        .catch(() => setDataStatus("No Stock History Available"));
  }, [session]);

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
        <TableColumn key={"available_stock_units"}>UNITS</TableColumn>
        <TableColumn key={"change_type"}>STOCK CHANGE</TableColumn>
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
  );
}

export default PHistoryTable;
