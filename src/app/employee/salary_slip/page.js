"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Divider,
  Button,
} from "@nextui-org/react";
import { FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function SalarySlipPage() {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;
  const month = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  function getSalMonth(date) {
    return `${month[new Date(date).getMonth()]}, ${new Date(
      date
    ).getFullYear()}`;
  }

  const users = [
    {
      key: "1",
      salary_month: getSalMonth(new Date()),
      salary_deposite_date: new Date().toLocaleDateString(),
      payment_status: "processed",
      payment_type: "Check",
      net_salary: "11000",
      basic_salay: "10000",
      dearence_allowence: "500",
      house_rent_allowance: "1500",
      professional_tax: "200",
      provident_fund: "800",
      bonus: "0",
      ref: "988293",
      print: <FaDownload />,
    },
    {
      key: "2",
      salary_month: getSalMonth(new Date()),
      salary_deposite_date: new Date().toLocaleDateString(),
      payment_status: "processed",
      payment_type: "Account",
      net_salary: "11000",
      basic_salay: "10000",
      dearence_allowence: "500",
      house_rent_allowance: "1500",
      professional_tax: "200",
      provident_fund: "800",
      bonus: "0",
      ref: "-",
      print: <FaDownload />,
    },
    {
      key: "3eefdg",
      salary_month: getSalMonth(new Date()),
      salary_deposite_date: new Date().toLocaleDateString(),
      payment_status: "processed",
      payment_type: "Check",
      net_salary: "11000",
      basic_salay: "10000",
      dearence_allowence: "500",
      house_rent_allowance: "1500",
      professional_tax: "200",
      provident_fund: "800",
      bonus: "0",
      ref: "988293",
      print: <FaDownload />,
    },
    {
      key: "sadf3",
      salary_month: getSalMonth(new Date()),
      salary_deposite_date: new Date().toLocaleDateString(),
      payment_status: "processed",
      payment_type: "Check",
      net_salary: "11000",
      basic_salay: "10000",
      dearence_allowence: "500",
      house_rent_allowance: "1500",
      professional_tax: "200",
      provident_fund: "800",
      bonus: "0",
      ref: "988293",
      print: <FaDownload />,
    },
    {
      key: "3",
      salary_month: getSalMonth(new Date()),
      salary_deposite_date: new Date().toLocaleDateString(),
      payment_status: "processed",
      payment_type: "Account",
      net_salary: "11000",
      basic_salay: "10000",
      dearence_allowence: "500",
      house_rent_allowance: "1500",
      professional_tax: "200",
      provident_fund: "800",
      bonus: "0",
      ref: "-",
      print: <FaDownload />,
    },
    {
      key: "4",
      salary_month: getSalMonth(new Date()),
      salary_deposite_date: new Date().toLocaleDateString(),
      payment_status: "processed",
      payment_type: "Account",
      net_salary: "11000",
      basic_salay: "10000",
      dearence_allowence: "500",
      house_rent_allowance: "1500",
      professional_tax: "200",
      provident_fund: "800",
      bonus: "0",
      ref: "-",
      print: <FaDownload />,
    },
    {
      key: "5",
      salary_month: getSalMonth(new Date()),
      salary_deposite_date: new Date().toLocaleDateString(),
      payment_status: "processed",
      payment_type: "Account",
      net_salary: "11000",
      basic_salay: "10000",
      dearence_allowence: "500",
      house_rent_allowance: "1500",
      professional_tax: "200",
      provident_fund: "800",
      bonus: "0",
      ref: "-",
      print: <FaDownload />,
    },
    {
      key: 6,
      salary_month: getSalMonth(new Date()),
      salary_deposite_date: new Date().toLocaleDateString(),
      payment_status: "processed",
      payment_type: "Account",
      net_salary: "11000",
      basic_salay: "10000",
      dearence_allowence: "500",
      house_rent_allowance: "1500",
      professional_tax: "200",
      provident_fund: "800",
      bonus: "0",
      ref: "-",
      print: <FaDownload />,
    },
    {
      key: 7,
      salary_month: getSalMonth(new Date()),
      salary_deposite_date: new Date().toLocaleDateString(),
      payment_status: "processed",
      payment_type: "Account",
      net_salary: "11000",
      basic_salay: "10000",
      dearence_allowence: "500",
      house_rent_allowance: "1500",
      professional_tax: "200",
      provident_fund: "800",
      bonus: "0",
      ref: "-",
      print: <FaDownload />,
    },
    {
      key: "324r",
      salary_month: getSalMonth(new Date()),
      salary_deposite_date: new Date().toLocaleDateString(),
      payment_status: "processed",
      payment_type: "Check",
      net_salary: "11000",
      basic_salay: "10000",
      dearence_allowence: "500",
      house_rent_allowance: "1500",
      professional_tax: "200",
      provident_fund: "800",
      bonus: "0",
      ref: "988293",
      print: <FaDownload />,
    },
    {
      key: 8,
      salary_month: getSalMonth(new Date()),
      salary_deposite_date: new Date().toLocaleDateString(),
      payment_status: "processed",
      payment_type: "Account",
      net_salary: "11000",
      basic_salay: "10000",
      dearence_allowence: "500",
      house_rent_allowance: "1500",
      professional_tax: "200",
      provident_fund: "800",
      bonus: "0",
      ref: "-",
      print: <FaDownload />,
    },
    {
      key: 9,
      salary_month: getSalMonth(new Date()),
      salary_deposite_date: new Date().toLocaleDateString(),
      payment_status: "processed",
      payment_type: "Account",
      net_salary: "11000",
      basic_salay: "10000",
      dearence_allowence: "500",
      house_rent_allowance: "1500",
      professional_tax: "200",
      provident_fund: "800",
      bonus: "0",
      ref: "-",
      print: <FaDownload />,
    },
    {
      key: 10,
      salary_month: getSalMonth(new Date()),
      salary_deposite_date: new Date().toLocaleDateString(),
      payment_status: "processed",
      payment_type: "Account",
      net_salary: "11000",
      basic_salay: "10000",
      dearence_allowence: "500",
      house_rent_allowance: "1500",
      professional_tax: "200",
      provident_fund: "800",
      bonus: "0",
      ref: "-",
      print: <FaDownload />,
    },
    {
      key: "11",
      salary_month: getSalMonth(new Date()),
      salary_deposite_date: new Date().toLocaleDateString(),
      payment_status: "processed",
      payment_type: "Account",
      net_salary: "11000",
      basic_salay: "10000",
      dearence_allowence: "500",
      house_rent_allowance: "1500",
      professional_tax: "200",
      provident_fund: "800",
      bonus: "0",
      ref: "-",
      print: <FaDownload />,
    },
    {
      key: "12",
      salary_month: getSalMonth(new Date()),
      salary_deposite_date: new Date().toLocaleDateString(),
      payment_status: "processed",
      payment_type: "Account",
      net_salary: "11000",
      basic_salay: "10000",
      dearence_allowence: "500",
      house_rent_allowance: "1500",
      professional_tax: "200",
      provident_fund: "800",
      bonus: "0",
      ref: "-",
      print: <FaDownload />,
    },
    {
      key: "13",
      salary_month: getSalMonth(new Date()),
      salary_deposite_date: new Date().toLocaleDateString(),
      payment_status: "processed",
      payment_type: "Account",
      net_salary: "11000",
      basic_salay: "10000",
      dearence_allowence: "500",
      house_rent_allowance: "1500",
      professional_tax: "200",
      provident_fund: "800",
      bonus: "0",
      ref: "-",
      print: <FaDownload />,
    },
    {
      key: "14",
      salary_month: getSalMonth(new Date()),
      salary_deposite_date: new Date().toLocaleDateString(),
      payment_status: "processed",
      payment_type: "Account",
      net_salary: "11000",
      basic_salay: "10000",
      dearence_allowence: "500",
      house_rent_allowance: "1500",
      professional_tax: "200",
      provident_fund: "800",
      bonus: "0",
      ref: "-",
      print: <FaDownload />,
    },
    {
      key: "15",
      salary_month: getSalMonth(new Date()),
      salary_deposite_date: new Date().toLocaleDateString(),
      payment_status: "processed",
      payment_type: "Account",
      net_salary: "11000",
      basic_salay: "10000",
      dearence_allowence: "500",
      house_rent_allowance: "1500",
      professional_tax: "200",
      provident_fund: "800",
      bonus: "0",
      ref: "-",
      print: <FaDownload />,
    },
    {
      key: "16",
      salary_month: getSalMonth(new Date()),
      salary_deposite_date: new Date().toLocaleDateString(),
      payment_status: "processed",
      payment_type: "Account",
      net_salary: "11000",
      basic_salay: "10000",
      dearence_allowence: "500",
      house_rent_allowance: "1500",
      professional_tax: "200",
      provident_fund: "800",
      bonus: "0",
      ref: "-",
      print: <FaDownload />,
    },
    {
      key: "17",
      salary_month: getSalMonth(new Date()),
      salary_deposite_date: new Date().toLocaleDateString(),
      payment_status: "processed",
      payment_type: "Account",
      net_salary: "11000",
      basic_salay: "10000",
      dearence_allowence: "500",
      house_rent_allowance: "1500",
      professional_tax: "200",
      provident_fund: "800",
      bonus: "0",
      ref: "-",
      print: <FaDownload />,
    },
    {
      key: "18",
      salary_month: getSalMonth(new Date()),
      salary_deposite_date: new Date().toLocaleDateString(),
      payment_status: "processed",
      payment_type: "Account",
      net_salary: "11000",
      basic_salay: "10000",
      dearence_allowence: "500",
      house_rent_allowance: "1500",
      professional_tax: "200",
      provident_fund: "800",
      bonus: "0",
      ref: "-",
      print: <FaDownload />,
    },
    {
      key: "19",
      salary_month: getSalMonth(new Date()),
      salary_deposite_date: new Date().toLocaleDateString(),
      payment_status: "processed",
      payment_type: "Account",
      net_salary: "11000",
      basic_salay: "10000",
      dearence_allowence: "500",
      house_rent_allowance: "1500",
      professional_tax: "200",
      provident_fund: "800",
      bonus: "0",
      ref: "-",
      print: <FaDownload />,
    },
    {
      key: "20",
      salary_month: getSalMonth(new Date()),
      salary_deposite_date: new Date().toLocaleDateString(),
      payment_status: "processed",
      payment_type: "Account",
      net_salary: "11000",
      basic_salay: "10000",
      dearence_allowence: "500",
      house_rent_allowance: "1500",
      professional_tax: "200",
      provident_fund: "800",
      bonus: "0",
      ref: "-",
      print: <FaDownload />,
    },
    {
      key: "21",
      salary_month: getSalMonth(new Date()),
      salary_deposite_date: new Date().toLocaleTimeString(),
      payment_status: "processed",
      payment_type: "Account",
      net_salary: "11000",
      basic_salay: "10000",
      dearence_allowence: "500",
      house_rent_allowance: "1500",
      professional_tax: "200",
      provident_fund: "800",
      bonus: "0",
      ref: "-",
      print: <FaDownload />,
    },
    {
      key: "22",
      salary_month: getSalMonth(new Date()),
      salary_deposite_date: new Date().toLocaleDateString(),
      payment_status: "processed",
      payment_type: "Account",
      net_salary: "11000",
      basic_salay: "10000",
      dearence_allowence: "500",
      house_rent_allowance: "1500",
      professional_tax: "200",
      provident_fund: "800",
      bonus: "0",
      ref: "-",
      print: <FaDownload />,
    },
  ];

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

  function downloadPdf() {
    const doc = new jsPDF("landscape", "mm", "a4");
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

    doc.save("my_salary_record.pdf");
  }
  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500">
        <p className="flex justify-between flex-row flex-wrap text-2xl font-bold tracking-wide my-8">
          <span>VIEW AND PRINT YOUR SALARY DETAILS SLIP</span>
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
        <Divider className="my-5" />
        <Table
          id="download-table"
          aria-label="Example table with client side pagination"
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
          classNames={{
            wrapper: "min-h-[222px]",
          }}
        >
          <TableHeader>
            <TableColumn key="salary_month">SALARY MONTH</TableColumn>
            <TableColumn key="salary_deposite_date">DELIVERED AT</TableColumn>
            <TableColumn key="payment_status">STATUS</TableColumn>
            <TableColumn key="payment_type">PAYMENT TYPE</TableColumn>
            <TableColumn key="net_salary">NET SALARY</TableColumn>
            <TableColumn key="basic_salay">BASE SALARY</TableColumn>
            <TableColumn key="dearence_allowence">DA</TableColumn>
            <TableColumn key="house_rent_allowance">HRA</TableColumn>
            <TableColumn key="professional_tax">PT</TableColumn>
            <TableColumn key="provident_fund">PF</TableColumn>
            <TableColumn key="bonus">BONUS</TableColumn>
            <TableColumn key="ref">
              REF. {/*check number or paymnet ref id*/}
            </TableColumn>
            <TableColumn key="print">PRINT</TableColumn>
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
      </div>
    </div>
  );
}
