"use client";

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

  useEffect(() => {
    // todo : add google map link with given coordinates

    const temp = [
      {
        key: 1,
        image: "/AdminPage.svg",
        name: "customer name1",
        email: "kuldipsarvaiya@gmail.com",
        contact_no: 1234567890,
        address: "23, Main Street, Suite , Suite, Suite 330",
        orders: "10",
        address_coordinates: { latitude: 23.0302, longitude: 72.5772 },
      },
      {
        key: 2,
        image: "/AdminPage.svg",
        name: "customer name2",
        email: "kuldipsarvaiya@gmail.com",
        contact_no: 1234567890,
        address: "23, Main Street, Suite , Suite, Suite 330",
        orders: "3",
        address_coordinates: { latitude: 23.0302, longitude: 72.5772 },
      },
      {
        key: 3,
        image: "/AdminPage.svg",
        name: "customer name3",
        email: "kuldipsarvaiya@gmail.com",
        contact_no: 1234567890,
        address: "23, Main Street, Suite , Suite, Suite 330",
        orders: "0",
        address_coordinates: {},
      },
      {
        key: 4,
        image: "/AdminPage.svg",
        name: "customer name4",
        email: "kuldipsarvaiya@gmail.com",
        contact_no: 1234567890,
        address: "23, Main Street, Suite , Suite, Suite 330",
        orders: "67",
        address_coordinates: { latitude: 23.0302, longitude: 72.5772 },
      },
      {
        key: 5,
        image: "/AdminPage.svg",
        name: "customer name5",
        email: "kuldipsarvaiya@gmail.com",
        contact_no: 1234567890,
        address: "23, Main Street, Suite , Suite, Suite 330 ",
        orders: "1",
        address_coordinates: {},
      },
    ].map((cust) => {
      return {
        ...cust,
        image: <Avatar size="sm" src={cust?.image} />,
        address: <div className="max-w-80 text-wrap">{cust?.address}</div>,
        address_coordinates: cust?.address_coordinates.latitude ? (
          <Link href={"kd"} target="_blank">
            <HiArrowTopRightOnSquare />
          </Link>
        ) : (
          "-"
        ),
      };
    });

    setCustomers(temp);
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

export default CustomerTable;
