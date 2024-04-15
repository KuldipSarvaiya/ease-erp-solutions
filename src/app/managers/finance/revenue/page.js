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
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { createRevenue, getRevenues } from "@/lib/utils/server_actions/finance";

export default function Page() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callback_url=/managers/finance/incomes");
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [success, setSuccess] = useState(false);
  const [revenues, setRevenues] = useState([]);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const rowsPerPage = 10;

  useEffect(() => {
    if (revenues.length === 0) {
      (async () => {
        const res = await getRevenues("nothing");
        if (res)
          return setRevenues(
            res.map((item, i) => ({
              ...item,
              key: i + 1,
              revenue_from_date: new Date(
                item.revenue_from_date
              ).toDateString(),
              revenue_to_date: new Date(item.revenue_to_date).toDateString(),
              income_id: item?.income_id?.[0] + "...",
              expense_id: item?.expense_id?.[0] + "...",
            }))
          );
      })();
    }
  }, []);

  async function handleGenerateRevenue(formdata) {
    formdata.updated_by = session?.user?._id;
    console.log(formdata);
    setIsLoading(true);

    const res = await createRevenue(formdata);

    if (res.success) {
      reset();
      setSuccess("Revenue Entry Has Been Successfully Generated");
    } else setSuccess("Failed To Create Revenue Entry Right Now.");

    setTimeout(() => setSuccess(false), [5000]);
    setIsLoading(false);
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    const formdata = new FormData(event.target);
    console.log(formdata.get("from_date"));
    console.log(formdata.get("to_date"));
    console.log(formdata.get("type"));
  }

  // table pagination math
  const pages = Math.ceil(revenues.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return revenues?.slice(start, end);
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

    doc.save("revenue_records.pdf");
  }

  // charts /////////////////////////////////////////////////////////////////////////////////////
  ChartJS.register(ArcElement, Tooltip, Legend);

  let chart_total = [0, 0, 0];
  for (let i = 0; i < revenues.length; i++) {
    chart_total[0] += revenues[i].total_expense;
    chart_total[1] += revenues[i].total_tax;
    chart_total[2] += revenues[i].net_revenue;
  }
  const chart_data = {
    labels: ["EXPENSE", "TAX", "PROFIT"],
    datasets: [
      {
        label: "Contro. In Revenue -",
        data: chart_total,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  ////////////////////////////////////////////////////////////////////////////////////////

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
                  size: "lg",
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
                  size: "lg",
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
                  size: "lg",
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
                      <SelectItem key={"MONTHLY"} value={"MONTHLY"}>
                        MONTHLY
                      </SelectItem>
                      <SelectItem key={"QUATERLY"} value={"QUATERLY"}>
                        QUATERLY
                      </SelectItem>
                      <SelectItem key={"YEARLY"} value={"YEARLY"}>
                        YEARLY
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
                GENERATE REVENUE
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
      {/* old revenue records */}
      <div className="border-4 rounded-3xl mx-10 my-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500">
        {/* <Accordion>
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
        </Accordion> */}
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
            <TableColumn key={"net_revenue"}>REVENUE</TableColumn>
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
        <Pie
          data={chart_data}
          className=" max-h-[400px]"
          options={{ responsive: true }}
        />{" "}
      </div>
    </div>
  );
}
