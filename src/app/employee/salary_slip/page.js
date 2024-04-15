"use client";

import React, { useEffect, useState } from "react";
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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Loading from "@/components/Loading";
import Image from "next/image";
export default function SalarySlipPage() {
  const [page, setPage] = useState(1);
  const [salary, setSalary] = useState([]);
  const [dataStatus, setDataStatus] = useState(<Loading />);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/employee");
    },
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [printSal, setPrintSal] = useState({});
  const rowsPerPage = 10;
  const get_sal_month = (dt) => {
    return `${new Date(dt).toLocaleString("default", {
      month: "long",
    })} ${new Date(dt).getFullYear()}`;
  };

  useEffect(() => {
    if (salary.length === 0 && session?.user?._id)
      fetch("/api/employee/salary?id=" + session?.user?._id.toString(), {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.length === 0) return setDataStatus("No Salary Found");
          setSalary(
            data.map((item, i) => ({
              key: i,
              ...item,
              ref: item.transaction_no || "-",
              salary_deposite_date: new Date(
                item.createdAt
              ).toLocaleDateString(),
              salary_month: get_sal_month(item.salary_month),
              status: "delivered",
              payment_type: "account",
              print: (
                <Button
                  size="sm"
                  variant="light"
                  isIconOnly
                  onPress={() => {
                    console.log(item);
                    setPrintSal(item);
                    onOpen();
                  }}
                >
                  <FaDownload />
                </Button>
              ),
            }))
          );
        })
        .catch((e) => {
          console.log(e);
          setDataStatus("No Salary Found");
        });
  }, [session]);

  const pages = Math.ceil(salary.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return salary.slice(start, end);
  }, [page, salary]);

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
    <>
      <div className="relative w-full h-full max-h-full max-w-full">
        <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500">
          <p className="flex justify-between flex-row flex-wrap text-2xl font-bold tracking-wide my-3">
            <span>SALARY DETAILS</span>
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
              {/* <TableColumn key="status">STATUS</TableColumn> */}
              {/* <TableColumn key="payment_type">PAYMENT TYPE</TableColumn> */}
              <TableColumn key="net_salary">NET SALARY</TableColumn>
              <TableColumn key="basic_salary">BASE SALARY</TableColumn>
              <TableColumn key="dearness_allowance">DA</TableColumn>
              <TableColumn key="house_rent_allowance">HRA</TableColumn>
              <TableColumn key="profession_tax">PT</TableColumn>
              <TableColumn key="provident_fund">PF</TableColumn>
              <TableColumn key="bonus">BONUS</TableColumn>
              {/* <TableColumn key="ref">REF.</TableColumn> */}
              <TableColumn key="print">PRINT</TableColumn>
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

      {/* salary print  modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="z-[1000]">
        <ModalContent className="min-w-fit">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                EASE ERP SOLUTIONS - SALARY SLIP
              </ModalHeader>
              <ModalBody className="capitalize">
                <table id="salary_slip">
                  <tr>
                    <td className="flex flex-col gap-3">
                      <p className="flex flex-row gap-5 justify-start items-start text-nowrap">
                        <Image
                          src={"/kuldip_upload/" + printSal?.employee?.image}
                          width={170}
                          height={170}
                          className="rounded-2xl object-cover aspect-square"
                        />
                        <span className="grid grid-cols-1">
                          <span>
                            Name : {printSal?.employee?.first_name}{" "}
                            {printSal?.employee?.middle_name}{" "}
                            {printSal?.employee?.last_name}
                          </span>
                          <span>
                            Designation : {printSal?.employee?.designation}
                          </span>
                          <span>Gender : {printSal?.employee?.gender}</span>
                          <span>
                            DOB :{" "}
                            {new Date(
                              printSal?.employee?.dob
                            ).toLocaleDateString()}
                          </span>
                          <span>
                            DOJ :{" "}
                            {new Date(
                              printSal?.employee?.doj
                            ).toLocaleDateString()}
                          </span>
                          <span>Email : {printSal?.employee?.email}</span>
                          <span>
                            Contact : {printSal?.employee?.contact_no}
                          </span>
                        </span>
                      </p>
                      <hr />
                      <p className="flex flex-row justify-start gap-16">
                        <span className="flex flex-col">
                          <span>Salary Month :</span>
                          <span>Basic Salary :</span>
                          <span>dearness allowance :</span>
                          <span>house rent allowance :</span>
                          <span>bonus :</span>
                          <span>overtime salary :</span>
                          <span>travel expense :</span>
                          <span>provident fund :</span>
                          <span>profession tax :</span>
                          <span>net salary :</span>
                          <span>transaction no. :</span>
                          <span>payment status :</span>
                        </span>
                        <span className="flex flex-col">
                          <span>{get_sal_month(printSal?.salary_month)}</span>
                          <span>{printSal?.basic_salary}</span>
                          <span>{printSal?.dearness_allowance}</span>
                          <span>{printSal?.house_rent_allowance}</span>
                          <span>{printSal?.bonus}</span>
                          <span>{printSal?.overtime_salary}</span>
                          <span>{printSal?.travel_expense}</span>
                          <span>{printSal?.provident_fund}</span>
                          <span>{printSal?.profession_tax}</span>
                          <span>{printSal?.net_salary}</span>
                          <span>{printSal?.transaction_no}</span>
                          <span>Complete ✔️</span>
                        </span>
                      </p>
                    </td>
                  </tr>
                </table>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
