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
import { createIncome, getIncomes } from "@/lib/utils/server_actions/finance";

export default function IncomePage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callback_url=/managers/finance/incomes");
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [success, setSuccess] = useState(false);
  const [incomes, setIncomes] = useState([]);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const rowsPerPage = 10;

  useEffect(() => {
    if (incomes.length === 0) {
      (async () => {
        const res = await getIncomes("nothing");
        if (res)
          return setIncomes(
            res.map((item, i) => ({
              ...item,
              key: i + 1,
              date: new Date(item.date).toDateString(),
            }))
          );
      })();
    }
  }, []);

  async function handleCreateIncome(formdata) {
    formdata.updated_by = session?.user?._id;
    console.log(formdata);
    setIsLoading(true);

    const res = await createIncome(formdata);

    if (res.success) {
      reset();
      setSuccess("Income Entry Has Been Successfully Generated");
    } else setSuccess("Failed To Create Income Entry Right Now.");

    setTimeout(() => setSuccess(false), [5000]);
    setIsLoading(false);
  }

  const pages = Math.ceil(incomes.length / rowsPerPage);

  const items = useMemo(() => {
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

  // Charts  ///////////////////////////////////////////////////////////////////////////////
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
  //////////////////////////////////////////////////////////////////////////////

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
                    valueAsNumber: true,
                  },
                }}
                input={{
                  type: "number",
                  name: "amount",
                  size: "lg",
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
                CREATE INCOME
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

      {/*  */}
      {/* old income records */}
      <div className="border-4 rounded-3xl mx-10 my-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500 relative">
        {/* <Accordion>
          <AccordionItem
            title={
              <span className="uppercase flex justify-between flex-row flex-nowrap text-2xl max-md:text-lg tracking-wider font-bold w-full">
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
        </Accordion> */}

        <span className="uppercase flex justify-between flex-row flex-nowrap text-2xl max-md:text-lg tracking-wider font-bold w-full">
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
        </span>
        <Divider className="my-5" />
        <Table
          id="download-table"
          aria-label="Example table with client side pagination"
          bottomContent={
            <span className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </span>
          }
        >
          <TableHeader>
            <TableColumn key={"date"}>DATE</TableColumn>
            <TableColumn key={"type"}>TYPE</TableColumn>
            <TableColumn key={"amount"}>AMOUNT</TableColumn>
            <TableColumn key={"description"}>DESCRIPTION</TableColumn>
            <TableColumn key={"customer_order_id"}>REF.</TableColumn>
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
          Categorized incomes by source
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
