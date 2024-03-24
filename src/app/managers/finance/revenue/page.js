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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = React.useState(1);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const rowsPerPage = 10;

  function handleGenerateRevenue(formdata) {
    console.log(formdata);
    setIsLoading(true);
  }

  const revenues = [
    {
      key: 1,
      title: "this is title of revenue",
      type: "WEEKLY",
      revenue_from_date: new Date().toLocaleDateString(),
      revenue_to_date: new Date().toLocaleDateString(),
      total_income: 232,
      total_expense: 23,
      total_tax: 242,
      total_revenue: 1000,
    },
    {
      key: 2,
      title: "this is title of revenue",
      type: "WEEKLY",
      revenue_from_date: new Date().toLocaleDateString(),
      revenue_to_date: new Date().toLocaleDateString(),
      total_income: 232,
      total_expense: 23,
      total_tax: 242,
      total_revenue: 1000,
    },
    {
      key: 3,
      title: "this is title of revenue",
      type: "WEEKLY",
      revenue_from_date: new Date().toLocaleDateString(),
      revenue_to_date: new Date().toLocaleDateString(),
      total_income: 232,
      total_expense: 23,
      total_tax: 242,
      total_revenue: 1000,
    },
    {
      key: 4,
      title: "this is title of revenue",
      type: "WEEKLY",
      revenue_from_date: new Date().toLocaleDateString(),
      revenue_to_date: new Date().toLocaleDateString(),
      total_income: 232,
      total_expense: 23,
      total_tax: 242,
      total_revenue: 1000,
    },
    {
      key: 5,
      title: "this is title of revenue",
      type: "WEEKLY",
      revenue_from_date: new Date().toLocaleDateString(),
      revenue_to_date: new Date().toLocaleDateString(),
      total_income: 232,
      total_expense: 23,
      total_tax: 242,
      total_revenue: 1000,
    },
    {
      key: 6,
      title: "this is title of revenue",
      type: "WEEKLY",
      revenue_from_date: new Date().toLocaleDateString(),
      revenue_to_date: new Date().toLocaleDateString(),
      total_income: 232,
      total_expense: 23,
      total_tax: 242,
      total_revenue: 1000,
    },
    {
      key: 7,
      title: "this is title of revenue",
      type: "WEEKLY",
      revenue_from_date: new Date().toLocaleDateString(),
      revenue_to_date: new Date().toLocaleDateString(),
      total_income: 232,
      total_expense: 23,
      total_tax: 242,
      total_revenue: 1000,
    },
    {
      key: 8,
      title: "this is title of revenue",
      type: "WEEKLY",
      revenue_from_date: new Date().toLocaleDateString(),
      revenue_to_date: new Date().toLocaleDateString(),
      total_income: 232,
      total_expense: 23,
      total_tax: 242,
      total_revenue: 1000,
    },
    {
      key: 9,
      title: "this is title of revenue",
      type: "WEEKLY",
      revenue_from_date: new Date().toLocaleDateString(),
      revenue_to_date: new Date().toLocaleDateString(),
      total_income: 232,
      total_expense: 23,
      total_tax: 242,
      total_revenue: 1000,
    },
    {
      key: 10,
      title: "this is title of revenue",
      type: "WEEKLY",
      revenue_from_date: new Date().toLocaleDateString(),
      revenue_to_date: new Date().toLocaleDateString(),
      total_income: 232,
      total_expense: 23,
      total_tax: 242,
      total_revenue: 1000,
    },
    {
      key: 11,
      title: "this is title of revenue",
      type: "WEEKLY",
      revenue_from_date: new Date().toLocaleDateString(),
      revenue_to_date: new Date().toLocaleDateString(),
      total_income: 232,
      total_expense: 23,
      total_tax: 242,
      total_revenue: 1000,
    },
  ];

  const pages = Math.ceil(revenues.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return revenues.slice(start, end);
  }, [page, revenues]);

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
    console.log(formdata.get("type"));
  }

  //================================================================================================
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    plugins: {
      title: {
        display: true,
        text: "REVENUE STATS FOR ABOVE REPORTS",
      },
    },
    responsive: true,
    indexAxis: "y",
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const labels = ["Revenue Stats"];
  let total_income = 0;
  let total_expense = 0;
  let total_tax = 0;
  let total_revenue = 0;
  for (let i = 0; i < revenues.length; i++) {
    total_income += revenues[i].total_income;
    total_expense += revenues[i].total_expense;
    total_revenue += revenues[i].total_revenue;
    total_tax += revenues[i].total_tax;
  }

  const chart_data = {
    labels,
    datasets: [
      {
        label: "INCOME",
        data: [total_income],
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "EXPENSE",
        data: [total_expense],
        backgroundColor: "#36A2EB",
      },
      {
        label: "TAX",
        data: [total_tax],
        backgroundColor: "#FFB1C1",
      },
      {
        label: "PROFIT",
        data: [total_tax],
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };
  //

  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      {/* create new income */}
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500">
        <p className="uppercase text-2xl max-md:text-lg tracking-wider font-bold mb-5">
          GENERATE new Revenue
        </p>
        <Divider className="my-5" />
        <form onSubmit={handleSubmit(handleGenerateRevenue)}>
          <div className="flex flex-col flex-nowrap gap-5 md:flex-nowrap">
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Title : </span>
              <InputCon
                controller={{
                  name: "title",
                  control: control,
                  rules: {
                    required: "revenue title is required",
                    maxLength: {
                      value: 100,
                      message: "Please use less than 100 characters",
                    },
                  },
                }}
                input={{
                  name: "title",
                  size: "lg",
                  isRequired: true,
                  disabled: isLoading,
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              <p className="text-red-500"> {errors?.title?.message} </p>
            </span>

            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">
                Revenue Date From :{" "}
              </span>
              <InputCon
                controller={{
                  name: "revenue_from_date",
                  control: control,
                  rules: {
                    required: "revenue starting date is required",
                  },
                }}
                input={{
                  type: "date",
                  name: "revenue_from_date",
                  isRequired: true,
                  disabled: isLoading,
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              <p className="text-red-500">
                {errors?.revenue_from_date?.message}
              </p>
            </span>

            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Revenue Date To : </span>
              <InputCon
                controller={{
                  name: "revenue_to_date",
                  control: control,
                  rules: {
                    required: "revenue boundry date  is required",
                  },
                }}
                input={{
                  type: "date",
                  name: "revenue_to_date",
                  isRequired: true,
                  disabled: isLoading,
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              <p className="text-red-500">{errors?.revenue_to_date?.message}</p>
            </span>

            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">
                Total TAX{"(INR)"} :{" "}
              </span>
              <InputCon
                controller={{
                  name: "total_tax",
                  control: control,
                  rules: {
                    required: "TAX is required",
                    min: {
                      value: 0,
                      message: "TAX must greater than or equal to 00",
                    },
                  },
                }}
                input={{
                  type: "number",
                  name: "total_tax",
                  isRequired: true,
                  disabled: isLoading,
                  className: "md:col-start-2 md:col-end-4",
                }}
              />
              <p className="text-red-500">{errors?.revenue_to_date?.message}</p>
            </span>

            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 n">
              <span className="text-xl font-semibold">Revenue Type : </span>
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
                      <SelectItem key={"monthly"} value={"monthly"}>
                        MONTHLY
                      </SelectItem>
                      <SelectItem key={"quaterly"} value={"quaterly"}>
                        QUATERLY
                      </SelectItem>
                      <SelectItem key={"yearly"} value={"yearly"}>
                        YEARLY
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
                GENERATE REVENUE
              </Button>
            </span>
          </div>
        </form>
      </div>

      {/*  */}
      {/* old revenue records */}
      <div className="border-4 rounded-3xl mx-10 my-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500">
        <Accordion>
          <AccordionItem
            title={
              <>
                <span className="uppercase flex justify-between flex-row flex-nowrap text-2xl max-md:text-lg tracking-wider font-bold">
                  <span>revenue history</span>
                  <Button
                    size="sm"
                    variant="shadow"
                    color="secondary"
                    aria-label="download-pdf"
                    onClick={downloadPdf}
                  >
                    <FaDownload /> PDF
                  </Button>
                </span>
              </>
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
                  aria-label="from_date"
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
                  aria-label="to_date"
                />
                <Select
                  name="type"
                  size="sm"
                  variant="faded"
                  color="secondary"
                  label="Revenue Type"
                  placeholder="--- Select Type ---"
                  labelPlacement="outside"
                  radius="sm"
                  isRequired={false}
                  isDisabled={isLoading}
                  aria-label="type"
                  className="max-w-60"
                >
                  <SelectItem key={"MONTHLY"} value={"MONTHLY"}>
                    MONTHLY
                  </SelectItem>
                  <SelectItem key={"QUATERLY"} value={"QUATERLY"}>
                    QUATERLY
                  </SelectItem>
                  <SelectItem key={"YEARLY"} value={"YEARLY"}>
                    YEARLY
                  </SelectItem>
                  <SelectItem key={""} value={""}>
                    ALL
                  </SelectItem>
                </Select>
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
            <TableColumn key={"title"}>TITLE</TableColumn>
            <TableColumn key={"type"}>TYPE</TableColumn>
            <TableColumn key={"revenue_from_date"}>REVENUE FROM</TableColumn>
            <TableColumn key={"revenue_to_date"}>REVENUE TO</TableColumn>
            <TableColumn key={"total_income"}>INCOME</TableColumn>
            <TableColumn key={"total_expense"}>EXPENSE</TableColumn>
            <TableColumn key={"total_tax"}>TAX</TableColumn>
            <TableColumn key={"total_revenue"}>REVENUE</TableColumn>
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
        <Bar options={options} data={chart_data} className="max-h-56" />
      </div>
    </div>
  );
}
