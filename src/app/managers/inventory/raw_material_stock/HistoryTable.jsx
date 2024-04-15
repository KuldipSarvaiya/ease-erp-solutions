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
  getKeyValue,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { BsCircleFill } from "react-icons/bs";
import { FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

function HistoryTable() {
  const [page, setPage] = useState(1);
  const change_type = {
    Increase: <Increase />,
    Decrease: <Decrease />,
  };
  const [dataStatus, setDataStatus] = useState(<Loading />);
  const [history, setHistory] = useState([]);

  function downloadPdf() {
    const doc = new jsPDF("portrait", "mm", "a4");
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

    doc.save("raw_material_stock_records.pdf");
  }

  useEffect(() => {
    // fetch(`/api/inventory/product/stock_history?department=${department}`);
    if (history.length === 0)
      fetch("/api/inventory/raw_material/stock_history?department=all", {
        method: "GET",
        next: { tags: ["RawMaterialStockHistory"] },
      })
        .then((res) => res.json())
        .then((data) => {
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
  });

  const rowsPerPage = 10;
  const pages = Math.ceil(history.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return history.slice(start, end);
  }, [page, history]);

  return (
    <div className="border-4 rounded-3xl mx-10 mt-4 mb-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch">
      <div className="text-2xl font-bold tracking-wide w-full flex flex-row justify-between">
        RAW MATERIALS STOCK HISTORY
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
      </div>
      <Divider className="my-2" />
      <div className="w-full">
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
      </div>
    </div>
  );
}

export default HistoryTable;
