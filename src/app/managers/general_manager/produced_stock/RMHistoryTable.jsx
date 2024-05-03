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
import { useEffect, useMemo, useState } from "react";
import { BsCircleFill } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
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

function RMHistoryTable() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(
        "/api/auth/signin?callbackUrl=/managers/general_manager/used_stock"
      );
    },
  });

  const [page, setPage] = useState(1);
  const change_type = {
    Increase: <Increase />,
    Decrease: <Decrease />,
  };
  const [dataStatus, setDataStatus] = useState(<Loading />);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (history.length === 0 && department_id)
      fetch(
        `/api/inventory/raw_material/stock_history?produced_by=yes&department=${department_id}`,
        {
          method: "GET",
          next: { tags: ["RawMaterialStockHistory"] },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data.length === 0)
            return setDataStatus("No Stock History Available");

          const data2 = data.map((item, i) => ({
            ...item,
            key: i,
            stock_date: new Date(item?.stock_date).toDateString(),
            change_type: change_type[item?.change_type],
            raw_material: (
              <span className="flex flex-row flex-nowrap gap-1 items-center">
                {item?.raw_material?.name}
                <BsCircleFill
                  style={{ color: item?.raw_material?.color || "transparent" }}
                />
                {item?.raw_material?.size}
              </span>
            ),
            units: (
              <span>
                {item?.units} {item?.product?.unit_of_measurement}
              </span>
            ),
            raw_material_group_id: item?.raw_material?.raw_material_group_id,
          }));
          // console.log(data2);
          setHistory(data2);
        })
        .catch((e) => {
          // console.log(e);
          setDataStatus("No Stock History Available");
        });
  }, [session]);

  const rowsPerPage = 10;
  const pages = Math.ceil(history.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return history.slice(start, end);
  }, [page, history]);

  // return if admin and department id is not found
  let department_id = session?.user?.department_id?._id;

  if (session?.user?.designation === "Admin") {
    department_id = getCookie("department_id");
    if (!department_id) return notFound();
  }

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
        <TableColumn key={"stock_date"}>DATE</TableColumn>
        <TableColumn key={"raw_material"}>RAW MATERIAL</TableColumn>
        <TableColumn key={"raw_material_group_id"}>
          RAW MATERIAL GROUP
        </TableColumn>
        <TableColumn key={"units"}>UNITS</TableColumn>
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

export default RMHistoryTable;
