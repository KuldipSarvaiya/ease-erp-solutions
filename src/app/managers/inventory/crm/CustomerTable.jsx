"use client";

import Loading from "@/components/Loading";
import {
  Avatar,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";

function CustomerTable({ id }) {
  const [page, setPage] = useState(1);
  const [customers, setCustomers] = useState([]);
  const [dataStatus, setDataStatus] = useState(<Loading />);

  useEffect(() => {
    if (customers.length === 0)
      fetch("/api/customer", { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
          setCustomers(
            data.map((cust) => {
              return {
                ...cust,
                image: (
                  <Avatar
                    size="sm"
                    src={
                      cust?.image?.startsWith("https://")
                        ? cust?.image
                        : "/kuldip_upload/" + cust?.image
                    }
                  />
                ),
                orders: 0,
                address: (
                  <div className="max-w-80 text-wrap">{cust?.address}</div>
                ),
                address_coordinates: cust?.address_coordinates.latitude ? (
                  <Link
                    href={`https://www.google.com/maps/search/?api=1&query=${cust?.address_coordinates?.latitude},${cust?.address_coordinates?.longitude}`}
                    target="_blank"
                  >
                    <HiArrowTopRightOnSquare />
                  </Link>
                ) : (
                  "-"
                ),
              };
            })
          );
        })
        .catch((e) => {
          // console.log(e);
          setDataStatus("No Customers Are Available");
        });
  }, []);

  const rowsPerPage = 10;
  const pages = Math.ceil(customers.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return customers.slice(start, end);
  }, [page, customers]);

  return (
    <Table
      id={id}
      aria-label="table of customer"
      aria-labelledby="table of customer"
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
        <TableColumn key={"image"}></TableColumn>
        <TableColumn key={"name"}>NAME</TableColumn>
        <TableColumn key={"email"}>EMAIL</TableColumn>
        <TableColumn key={"contact_no"}>CONTACT</TableColumn>
        <TableColumn key={"address"}>ADDRESS</TableColumn>
        <TableColumn key={"orders"}>ORDERS</TableColumn>
        <TableColumn key={"address_coordinates"}>MAP</TableColumn>
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

export default CustomerTable;
