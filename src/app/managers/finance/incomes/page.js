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

export default function IncomePage() {
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

  const incomes = [
    {
      key: 1,
      type: "sells",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description: "it was big income for the company",
      customer_order_id: "-",
    },
    {
      key: 2,
      type: "joint_ventures",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description:
        "this is small or may be big income depends on future got from various places ",
      customer_order_id: "-",
    },
    {
      key: 3,
      type: "rental_income",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description:
        "this is small or may be big income depends on future got from various places",
      customer_order_id: "-",
    },
    {
      key: 4,
      type: "sells",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description:
        "this is small or may be big income depends on future got from various places",
      customer_order_id: "-",
    },
    {
      key: 5,
      type: "joint_ventures",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description:
        "this is small or may be big income depends on future got from various places",
      customer_order_id: "-",
    },
    {
      key: 6,
      type: "sells",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description:
        "this is small or may be big income depends on future got from various places",
      customer_order_id: "-",
    },
    {
      key: 7,
      type: "rental_income",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description:
        "this is small or may be big income depends on future got from various places",
      customer_order_id: "-",
    },
    {
      key: 8,
      type: "loan",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description:
        "this is small or may be big income depends on future got from various places",
      customer_order_id: "-",
    },
    {
      key: 9,
      type: "liacense",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description:
        "this is small or may be big income depends on future got from various places",
      customer_order_id: "-",
    },
    {
      key: 10,
      type: "loan",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description:
        "this is small or may be big income depends on future got from various places",
      customer_order_id: "-",
    },
    {
      key: 11,
      type: "divident",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description:
        "this is small or may be big income depends on future got from various places",
      customer_order_id: "-",
    },
    {
      key: 12,
      type: "rental_income",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description:
        "this is small or may be big income depends on future got from various places ",
      customer_order_id: "-",
    },
    {
      key: 13,
      type: "loan",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description:
        "this is small or may be big income depends on future got from various places",
      customer_order_id: "-",
    },
    {
      key: 14,
      type: "rental_income",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description:
        "this is small or may be big income depends on future got from various places",
      customer_order_id: "-",
    },
    {
      key: 15,
      type: "divident",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description:
        "this is small or may be big income depends on future got from various places",
      customer_order_id: "-",
    },
    {
      key: 16,
      type: "rental_income",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description:
        "this is small or may be big income depends on future got from various places",
      customer_order_id: "-",
    },
    {
      key: 17,
      type: "liacense",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description:
        "this is small or may be big income depends on future got from various places",
      customer_order_id: "-",
    },
    {
      key: 18,
      type: "rental_income",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description:
        "this is small or may be big income depends on future got from various places",
      customer_order_id: "-",
    },
    {
      key: 19,
      type: "divident",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description:
        "this is small or may be big income depends on future got from various places",
      customer_order_id: "-",
    },
    {
      key: 20,
      type: "loan",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description:
        "this is small or may be big income depends on future got from various places",
      customer_order_id: "-",
    },
    {
      key: 21,
      type: "other",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description:
        "this is small or may be big income depends on future got from various places",
      customer_order_id: "-",
    },
    {
      key: 22,
      type: "other",
      date: new Date().toLocaleDateString(),
      amount: 100,
      description:
        "this is small or may be big income depends on future got from various places",
      customer_order_id: "-",
    },
  ];

  const pages = Math.ceil(incomes.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return incomes.slice(start, end);
  }, [page, incomes]);

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

    doc.save("income_records.pdf");
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    const formdata = new FormData(event.target);
    console.log(formdata.get("from_date"));
    console.log(formdata.get("to_date"));
  }

  // =================================================================

  ChartJS.register(ArcElement, Tooltip, Legend);

  const chart_total = [0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < incomes.length; i++) {
    switch (incomes[i].type) {
      case "sells":
        chart_total[0] += incomes[i].amount;
        break;
      case "divident":
        chart_total[1] += incomes[i].amount;
        break;
      case "rental_income":
        chart_total[2] += incomes[i].amount;
        break;
      case "loan":
        chart_total[3] += incomes[i].amount;
        break;
      case "liecense":
        chart_total[4] += incomes[i].amount;
        break;
      case "joint_ventures":
        chart_total[5] += incomes[i].amount;
        break;
      case "other":
        chart_total[6] += incomes[i].amount;
        break;
      default:
        break;
    }
  }

  const data = {
    labels: [
      "SELLS",
      "DIVIDENT",
      "RENTAL INCOME",
      "LOAN",
      "LIACENSE",
      "JOINT VENTURES",
      "OTHER",
    ],
    datasets: [
      {
        label: "Income -",
        data: chart_total,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(200, 200, 200, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(200, 200, 200, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  //

  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      {/* create new income */}
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500">
        <p className="uppercase text-2xl max-md:text-lg tracking-wider font-bold mb-5">
          create new income
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
              <span className="text-xl font-semibold">Income Type : </span>
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
                      {/* <SelectItem key={"sells"} value={"sells"}>
                        SELLS
                      </SelectItem> */}
                      <SelectItem key={"divident"} value={"divident"}>
                        DIVIDENT
                      </SelectItem>
                      <SelectItem key={"rental_income"} value={"rental_income"}>
                        RENTAL INCOME
                      </SelectItem>
                      <SelectItem key={"loan"} value={"loan"}>
                        LOAN
                      </SelectItem>
                      <SelectItem key={"liecense"} value={"liecense"}>
                        LIECENSE
                      </SelectItem>
                      <SelectItem
                        key={"joint_ventures"}
                        value={"joint_ventures"}
                      >
                        JOINT VENTURE
                      </SelectItem>
                      <SelectItem key={"other"} value={"other"}>
                        OTHER
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
                CREATE INCOME
              </Button>
            </span>
          </div>
        </form>
      </div>

      {/*  */}
      {/* old income records */}
      <div className="border-4 rounded-3xl mx-10 my-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500">
        <Accordion>
          <AccordionItem
            title={
              <div className="uppercase flex justify-between flex-row flex-wrap text-2xl max-md:text-lg tracking-wider font-bold w-full">
                <span>income history</span>
                <Button
                  size="sm"
                  variant="shadow"
                  color="secondary"
                  aria-label="download-pdf"
                  onClick={downloadPdf}
                >
                  <FaDownload /> PDF
                </Button>
              </div>
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
        >
          <TableHeader>
            <TableColumn key={"type"}>TYPE</TableColumn>
            <TableColumn key={"date"}>DATE</TableColumn>
            <TableColumn key={"amount"}>AMOUNT</TableColumn>
            <TableColumn key={"customer_order_id"}>REF.</TableColumn>
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
          Categorize above incomes by its type of source
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
