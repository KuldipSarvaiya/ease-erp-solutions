"use client";

import InputCon from "@/components/InputCon";
import {
  Accordion,
  AccordionItem,
  Button,
  Divider,
  Input,
  Pagination,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { VscGitPullRequest } from "react-icons/vsc";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaDownload, FaSearch } from "react-icons/fa";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

export default function ExpensePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = React.useState(1);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const rowsPerPage = 10;

  function handleCreateIncome(formdata) {
    console.log(formdata);
    setIsLoading(true);
  }

  const expense = [
    {
      key: 1,
      type: "employee_expense",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description: "it was big expense for the company",
      ref: "2rfdsg4gert322",
    },
    {
      key: 2,
      type: "employee_expense",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description: "ok this is real expense",
      ref: "-",
    },
    {
      key: 3,
      type: "accident",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description: "ok this is real expense",
      ref: "-",
    },
    {
      key: 4,
      type: "raw_material",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description: "ok this is real expense",
      ref: "fgf32efret3r34e",
    },
    {
      key: 5,
      type: "emi",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description: "ok this is real expense",
      ref: "-",
    },
    {
      key: 6,
      type: "marketing",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description: "ok this is real expense",
      ref: "-",
    },
    {
      key: 7,
      type: "royalty",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description: "ok this is real expense",
      ref: "-",
    },
    {
      key: 8,
      type: "raw_material",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description: "ok this is real expense",
      ref: "dfg34554fewert",
    },
    {
      key: 9,
      type: "other",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description: "ok this is real expense",
      ref: "-",
    },
    {
      key: 10,
      type: "maintenance",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description: "ok this is real expense",
      ref: "-",
    },
    {
      key: 11,
      type: "emi",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description: "ok this is real expense",
      ref: "-",
    },
    {
      key: 12,
      type: "maintenance",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description:
        "this is small or may be big income depends on future got from various places ",
      ref: "-",
    },
    {
      key: 13,
      type: "other",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description: "ok this is real expense",
      ref: "-",
    },
    {
      key: 14,
      type: "raw_material",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description: "ok this is real expense",
      ref: "fg43r5tefg343t45",
    },
    {
      key: 15,
      type: "emi",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description: "ok this is real expense",
      ref: "-",
    },
    {
      key: 16,
      type: "accident",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description: "ok this is real expense",
      ref: "-",
    },
    {
      key: 17,
      type: "raw_material",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description: "ok this is real expense",
      ref: "-",
    },
    {
      key: 18,
      type: "emi",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description: "ok this is real expense",
      ref: "-",
    },
    {
      key: 19,
      type: "other",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description: "ok this is real expense",
      ref: "-",
    },
    {
      key: 20,
      type: "royalty",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description: "ok this is real expense",
      ref: "-",
    },
  ];

  const pages = Math.ceil(expense.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return expense.slice(start, end);
  }, [page, expense]);

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

    doc.save("expense_records.pdf");
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    const formdata = new FormData(event.target);
    console.log(formdata.get("from_date"));
    console.log(formdata.get("to_date"));
  }

  // =================================================================

  ChartJS.register(ArcElement, Tooltip, Legend);

  const chart_total = [0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < expense.length; i++) {
    switch (expense[i].type) {
      case "raw_material":
        chart_total[0] += expense[i].amount;
        break;
      case "employee_expense":
        chart_total[1] += expense[i].amount;
        break;
      case "emi":
        chart_total[2] += expense[i].amount;
        break;
      case "maintenance":
        chart_total[3] += expense[i].amount;
        break;
      case "marketing":
        chart_total[4] += expense[i].amount;
        break;
      case "royalty":
        chart_total[5] += expense[i].amount;
        break;
      case "accident":
        chart_total[6] += expense[i].amount;
        break;
      case "other":
        chart_total[6] += expense[i].amount;
        break;
      default:
        break;
    }
  }

  const data = {
    labels: [
      "RAW MATERIAL",
      "EMPLOYEE EXPENSE",
      "EMI",
      "MAINTENENCE",
      "MARKETING",
      "ROYALTY",
      "ACCIDENT",
      "OTHER",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: chart_total,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(200, 200, 200, 0.2)",
          "rgba(250, 100, 20, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(200, 200, 200, 1)",
          "rgba(250, 100, 20, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  //

  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      {/* create new expense */}
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500">
        <p className="uppercase text-2xl max-md:text-lg tracking-wider font-bold mb-5">
          create new expense
        </p>

        <Divider className="my-5" />
        <form onSubmit={handleSubmit(handleCreateIncome)}>
          <div className="flex flex-col flex-nowrap gap-5 md:flex-nowrap">
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Date : </span>
              <InputCon
                controller={{
                  name: "date",
                  control: control,
                  rules: {
                    required: "date is required",
                  },
                }}
                input={{
                  type: "date",
                  name: "date",
                  isRequired: true,
                  disabled: isLoading,
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              <p className="text-red-500"> {errors?.date?.message} </p>
            </span>

            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Amount : </span>
              <InputCon
                controller={{
                  name: "amount",
                  control: control,
                  rules: {
                    required: "income amount is required",
                  },
                }}
                input={{
                  type: "number",
                  name: "amount",
                  isRequired: true,
                  disabled: isLoading,
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              <p className="text-red-500"> {errors?.amount?.message} </p>
            </span>

            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Description : </span>
              <InputCon
                controller={{
                  name: "description",
                  control: control,
                  rules: {
                    required: "income description is required",
                  },
                }}
                input={{
                  name: "description",
                  size: "lg",
                  isRequired: true,
                  disabled: isLoading,
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              <p className="text-red-500"> {errors?.description?.message} </p>
            </span>

            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Expense Type : </span>
              <Controller
                name="type"
                control={control}
                rules={{ required: "please select type of income type" }}
                render={({ field }) => (
                  <>
                    <Select
                      name="type"
                      value={field.value}
                      onChange={(e) => field.onChange(e)}
                      size="sm"
                      variant="faded"
                      color="secondary"
                      radius="sm"
                      isRequired={true}
                      isDisabled={isLoading}
                      className={"md:col-start-2 md:col-end-4"}
                      aria-label="type"
                    >
                      {/* <SelectItem key={"raw_material"} value={"raw_material"}>
                        RAW MATERIAL ORDER
                      </SelectItem> */}
                      <SelectItem
                        key={"employee_expense"}
                        value={"employee_expense"}
                      >
                        EMPLOYEE EXPENSE
                      </SelectItem>
                      <SelectItem key={"emi"} value={"emi"}>
                        EMI
                      </SelectItem>
                      <SelectItem key={"maintenance"} value={"maintenance"}>
                        MAINTANENCE
                      </SelectItem>
                      <SelectItem key={"marketing"} value={"marketing"}>
                        MARKETING
                      </SelectItem>
                      <SelectItem key={"royalti"} value={"royalti"}>
                        ROYALTI
                      </SelectItem>
                      <SelectItem key={"accident"} value={"accident"}>
                        ACCIDENT
                      </SelectItem>
                      <SelectItem key={"other"} value={"other"}>
                        OTHERS
                      </SelectItem>
                    </Select>
                  </>
                )}
              />
              <p className="text-red-500"> {errors?.type?.message} </p>
            </span>

            <span>
              <Button
                size="md"
                color="secondary"
                variant="shadow"
                type="submit"
                endContent={<VscGitPullRequest />}
                isLoading={isLoading}
                aria-label="submit"
              >
                CREATE EXPENSE
              </Button>
            </span>
          </div>
        </form>
      </div>

      {/*  */}
      {/* old expense records */}
      <div className="border-4 rounded-3xl mx-10 my-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500">
        <Accordion>
          <AccordionItem
            title={
              <span className="uppercase flex justify-between flex-row flex-wrap text-2xl max-md:text-lg tracking-wider font-bold">
                <span>Expense history</span>
                <Button
                  className=""
                  size="sm"
                  variant="shadow"
                  color="secondary"
                  aria-label="download-pdf"
                  onClick={downloadPdf}
                >
                  <FaDownload /> PDF
                </Button>
              </span>
            }
            key={1}
          >
            <form onSubmit={handleSearchSubmit}>
              <span className="flex gap-4 justify-start flex-row items-end flex-wrap">
                <Input
                  type="date"
                  color="secondary"
                  size="sm"
                  variant="faded"
                  name="from_date"
                  label="Starting Date"
                  placeholder="."
                  labelPlacement="outside"
                  className="max-w-60"
                  isRequired
                />
                <Input
                  isRequired
                  type="date"
                  color="secondary"
                  size="sm"
                  variant="faded"
                  name="to_date"
                  label="End Date"
                  placeholder="."
                  labelPlacement="outside"
                  className="max-w-60"
                />
                <Button
                  color="secondary"
                  size="sm"
                  variant="solid"
                  type="submit"
                  startContent={<FaSearch />}
                >
                  SEARCH
                </Button>
              </span>
            </form>
          </AccordionItem>
        </Accordion>
        <Divider className="my-5" />
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
            <TableColumn key={"type"}>TYPE</TableColumn>
            <TableColumn key={"date"}>DATE</TableColumn>
            <TableColumn key={"amount"}>AMOUNT</TableColumn>
            <TableColumn key={"ref"}>REF.</TableColumn>{" "}
            {/* ref to salary or order id */}
            <TableColumn key={"description"}>DESCRIPTION</TableColumn>
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

      {/* chart */}
      <div className="border-4 rounded-3xl mx-10 my-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500">
        <p className="uppercase text-2xl max-md:text-lg tracking-wider font-bold mb-5">
          Categorize above Expenses by its type of source
        </p>
        <center>
          <Pie
            data={data}
            className=" max-h-[400px]"
            options={{ responsive: true }}
          />
        </center>
      </div>
    </div>
  );
}
