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
  Snippet,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { VscGitPullRequest } from "react-icons/vsc";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaDownload, FaSearch } from "react-icons/fa";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { createExpense, getExpenses } from "@/lib/utils/server_actions/finance";

export default function ExpensePage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callback_url=/managers/finance/incomes");
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [success, setSuccess] = useState(false);
  const [expense, setExpense] = useState([]);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const rowsPerPage = 10;

  async function handleCreateIncome(formdata) {
    formdata.updated_by = session?.user?._id;
    console.log(formdata);
    setIsLoading(true);

    const res = await createExpense(formdata);

    if (res.success) {
      reset();
      setSuccess("Expense Entry Has Been Successfully Generated");
    } else setSuccess("Failed To Create Expense Entry Right Now.");

    setTimeout(() => setSuccess(false), [5000]);
    setIsLoading(false);
  }

  useEffect(() => {
    if (expense.length === 0) {
      (async () => {
        const res = await getExpenses("nothing");
        if (res)
          return setExpense(
            res.map((item, i) => ({
              ...item,
              key: i + 1,
              date: new Date(item.date).toDateString(),
              ref:
                item?.raw_material_order_id?.toString() ||
                item?.salary_id?.[0] ||
                "...",
            }))
          );
      })();
    }
  });

  const pages = Math.ceil(expense.length / rowsPerPage);

  const items = useMemo(() => {
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

  // charts /////////////////////////////////////////////////////////////
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
        label: "# part in Total Expense ",
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
  /////////////////////////////////////////////////////////////////////

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
                  size: "lg",
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
                  size: "lg",
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

            <span className="flex gap-5">
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
              {success !== false && (
                <Snippet
                  color={
                    success.includes("Successfully") ? "success" : "danger"
                  }
                  hideCopyButton
                  hideSymbol
                >
                  {success}
                </Snippet>
              )}
            </span>
          </div>
        </form>
      </div>

      {/* old expense records */}
      <div className="border-4 rounded-3xl mx-10 my-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500">
        {/* <Accordion>
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
        </Accordion>  */}
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
            <TableColumn key={"description"}>DESCRIPTION</TableColumn>
            <TableColumn key={"ref"}>REF.</TableColumn>{" "}
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
