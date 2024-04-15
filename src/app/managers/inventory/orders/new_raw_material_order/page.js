"use client";

import {
  Avatar,
  Button,
  Divider,
  Input,
  Select,
  SelectItem,
  Snippet,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaBackward } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

function NewRawMaterialOrderPage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(
        "/api/auth/signin?callbackUrl=/managers/inventory/orders/new_raw_material_order"
      );
    },
  });
  const [suppliers, setSuppliers] = useState([]);
  const [rawMaterial, setRawMaterial] = useState([]);
  const [success, setSuccess] = useState(false);
  const {
    register,
    getValues,
    reset,
    setError,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const watch_raw_material_id = watch(["raw_material_id"]);
  const [prevMaterial, setPrevMaterial] = useState("");

  // fetching raw material
  useEffect(() => {
    if (rawMaterial.length === 0)
      fetch("/api/inventory/raw_material", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setRawMaterial(
            data.map((item) => ({
              _id: item?._id,
              name: item?.name,
              color: item?.color,
              size: item?.size,
              raw_material_group_id: item?.raw_material_group_id,
              usage_process_level: item?.usage_process_level,
            }))
          );
        });
  }, []);

  // fetch suppliers of selected raw material
  const getSupplier = useCallback(() => {
    if (!getValues("raw_material_id")) return setSuppliers([]);
    fetch(
      "/api/inventory/supplier?match_material=" + getValues("raw_material_id"),
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setSuppliers([]);
          return alert(
            "No Supplier Is Registered To Supply This Raw Material\nFirst Register Supplier To Supply This Raw Material"
          );
        } else
          setSuppliers(
            data?.map((item) => ({
              _id: item?._id,
              total_completed_orders: item?.total_completed_orders,
              name: item?.name,
            }))
          );
      });
    setPrevMaterial(getValues("raw_material_id"));
  }, [getValues("raw_material_id")]);
  useEffect(() => {
    if (watch_raw_material_id?.[0] !== prevMaterial) getSupplier();
  }, [watch_raw_material_id]);

  async function createNewRawMaterial(formdata) {
    console.log(formdata);

    const formData = new FormData();

    for (const key in formdata) {
      if (key === "bill_image") formData.append(key, formdata[key][0]);
      else formData.append(key, formdata[key]);
    }
    formData.append("updated_by", session?.user?._id);

    const result = await fetch("/api/inventory/raw_material/order", {
      method: "POST",
      body: formData,
    });
    if (!result.ok) {
      setSuccess("Failed To Distribute Employees Salary");
      setTimeout(() => setSuccess(false), [5000]);
      return;
    }

    const res = await result.json();

    console.log(res);

    if (res.success === true) {
      reset();
      setSuccess("Salary Employees Has Been Distributed Successfully");
      setTimeout(() => setSuccess(false), [5000]);
    }

    // for (const key in res) {
    //   setError(key, { message: res[key] });
    // }
  }

  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      <div className="border-4 rounded-3xl mx-10 mt-4 mb-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch">
        <p className="text-2xl font-bold tracking-wide flex justify-between flex-row w-full">
          NEW RAW MATERIAL ORDER{" "}
          <Button
            as={Link}
            href="/managers/inventory/orders"
            color="secondary"
            variant="shadow"
            size="sm"
            startContent={<FaBackward />}
          >
            GO BACK
          </Button>
        </p>
        <Divider className="my-2" />
        <form
          onSubmit={handleSubmit(createNewRawMaterial)}
          noValidate={false}
          encType="multipart/form-data"
          className="flex flex-col flex-nowrap gap-5 md:flex-nowrap w-full"
        >
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Raw Material :</span>
            <Select
              {...register("raw_material_id", {
                required: "Please select Raw Material for this Order",
              })}
              variant="faded"
              size="md"
              isDisabled={rawMaterial?.length === 0}
              color="secondary"
              name="raw_material_id"
              aria-label="select raw_material_id order"
              aria-labelledby="select raw_material_id order"
              className="md:col-start-2 md:col-end-4"
            >
              {rawMaterial?.map((item, i) => {
                return (
                  <SelectItem key={item?._id} value={item?._id}>
                    {`Level : ${
                      item?.usage_process_level
                    } | ${item?.name?.toUpperCase()} | ${
                      item?.raw_material_group_id
                    } | ${item?.color} | ${item?.size} `}
                  </SelectItem>
                );
              })}
            </Select>
            <p className="text-red-500"> {errors?.raw_material_id?.message} </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Supplier :</span>
            <Select
              {...register("supplier_id", {
                required: "Please select Raw Material Supplier for this Order",
              })}
              isDisabled={suppliers?.length === 0}
              variant="faded"
              size="md"
              color="secondary"
              name="supplier_id"
              aria-label="select supplier_id order"
              aria-labelledby="select supplier_id order"
              className="md:col-start-2 md:col-end-4"
            >
              {suppliers?.map((item, i) => {
                return (
                  <SelectItem key={item?._id} value={item?._id}>
                    {`${item?.name?.toUpperCase()} | Completed Orders : ${
                      item?.total_completed_orders
                    } `}
                  </SelectItem>
                );
              })}
            </Select>
            <p className="text-red-500"> {errors?.supplier_id?.message} </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Order Bill No. : </span>
            <Input
              {...register("bill_no", {
                required: "Please Specify Bill No Of the Raw Material Order",
              })}
              variant="faded"
              size="md"
              color="secondary"
              type="text"
              name="bill_no"
              aria-label="bill_no"
              aria-labelledby="bill_no"
              title="Enter bill_no of the order"
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500"> {errors?.bill_no?.message} </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Units To Order :</span>
            <Input
              {...register("ordered_units", {
                required: "Please Specify units Of the Raw Material to Order",
              })}
              variant="faded"
              size="md"
              color="secondary"
              type="number"
              name="ordered_units"
              aria-label="ordered_units"
              aria-labelledby="ordered_units"
              title="Enter units of the order"
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500">{errors?.ordered_units?.message}</p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Bill Image : </span>
            <Input
              {...register("bill_image", {
                required: "Please Drop a Bill Image",
                validate: (v) =>
                  v[0].size < 500 * 1024 || "Imgae Size is Large, max 500kb",
              })}
              startContent={
                <Avatar
                  radius="lg"
                  size="md"
                  src={
                    getValues("bill_image")?.[0]
                      ? URL.createObjectURL(getValues("bill_image")[0])
                      : null
                  }
                />
              }
              variant="faded"
              size="md"
              color="secondary"
              type="file"
              multiple={false}
              accept=".png, .jpg, .jpeg"
              name="bill_image"
              aria-label="bill_image"
              aria-labelledby="bill_image"
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500"> {errors?.bill_image?.message} </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Pick Ordered Date :</span>
            <Input
              {...register("order_ordered_date", {
                required: "Please select a date of the order",
              })}
              variant="faded"
              size="md"
              color="secondary"
              type="date"
              name="order_ordered_date"
              aria-label="order_ordered_date"
              aria-labelledby="order_ordered_date"
              title="Enter  order_ordered_date"
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500">
              {errors?.order_ordered_date?.message}
            </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">
              Pick Order Received Date :
            </span>
            <Input
              {...register("order_receive_date", {
                required: "Please select a date of the order received",
                validate: (v) =>
                  new Date(v) > new Date(getValues("order_ordered_date")) ||
                  "Order Receive Date is Earlyer Than Order Placing Date",
              })}
              variant="faded"
              size="md"
              color="secondary"
              type="date"
              name="order_receive_date"
              aria-label="order_receive_date"
              aria-labelledby="order_receive_date"
              title="Enter  order_receive_date"
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500">
              {errors?.order_receive_date?.message}
            </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Payment Mode :</span>
            <div className="flex gap-5">
              <Input
                {...register("payment_mode", {
                  required: "Please Select Payment Mode",
                })}
                variant="faded"
                size="sm"
                color="secondary"
                type="radio"
                value={"inaccount"}
                name="payment_mode"
                endContent="&nbsp;&nbsp;&nbsp;&nbsp;INACCOUNT"
                aria-label="payment_mode"
                aria-labelledby="payment_mode"
                // isRequired
                className="md:col-start-2 md:col-end-4"
              />
              <Input
                {...register("payment_mode", {
                  required: "Please Select Payment Mode",
                })}
                variant="faded"
                endContent="&nbsp;&nbsp;&nbsp;&nbsp;CHECK"
                size="sm"
                color="secondary"
                type="radio"
                value={"check"}
                name="payment_mode"
                aria-label="payment_mode"
                aria-labelledby="payment_mode"
                // isRequired
                className="md:col-start-2 md:col-end-4"
              />
            </div>
            <p className="text-red-500">{errors?.payment_mode?.message}</p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Check No. :</span>
            <Input
              {...register("check_no", {
                required:
                  getValues("payment_mode") === "check"
                    ? "Please Enter Check No. of Check Payment"
                    : false,
              })}
              placeholder="*** If Payment Mode is CHECK"
              variant="faded"
              size="md"
              color="secondary"
              type="text"
              name="check_no"
              aria-label="check_no"
              aria-labelledby="check_no"
              title="Enter Transaction No. of InAccount Payment"
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500"> {errors?.check_no?.message} </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Transaction No. :</span>
            <Input
              {...register("transaction_no", {
                required:
                  getValues("payment_mode") === "inaccount"
                    ? "Please Enter Transaction No. of InAccount Payment"
                    : false,
              })}
              placeholder="*** If Payment Mode is INACCOUNT"
              variant="faded"
              size="md"
              color="secondary"
              type="text"
              name="transaction_no"
              aria-label="transaction_no"
              aria-labelledby="transaction_no"
              title="Enter Transaction No. of InAccount Payment"
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500"> {errors?.transaction_no?.message} </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">
              Raw Material Price / Unit :{" "}
            </span>
            <Input
              {...register("mrp_per_unit", {
                required: "Please Specify Raw Material Price Per Unit",
              })}
              variant="faded"
              size="md"
              color="secondary"
              type="number"
              name="mrp_per_unit"
              aria-label="mrp_per_unit"
              aria-labelledby="mrp_per_unit"
              title="Enter Product mrp_per_unit"
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500"> {errors?.mrp_per_unit?.message} </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Total Discount : </span>
            <Input
              {...register("total_discount", {
                required: "Please Specify Total Discount",
              })}
              variant="faded"
              size="md"
              color="secondary"
              type="number"
              name="total_discount"
              aria-label="total_discount"
              aria-labelledby="total_discount"
              title="Enter total_discount"
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500"> {errors?.total_discount?.message} </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Total TAX Paid : </span>
            <Input
              {...register("total_tax", {
                required: "Please Specify Total Paid TAX Amount",
              })}
              type="number"
              variant="faded"
              name="total_tax"
              aria-label="total_tax"
              aria-labelledby="total_tax"
              title="Enter Total TAX Paid"
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500">{errors?.total_tax?.message}</p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">
              Delivery Charge Paid :{" "}
            </span>
            <Input
              {...register("delivery_charge", {
                required: "Please Specify Total Paid Delivery Charge",
              })}
              type="number"
              variant="faded"
              name="delivery_charge"
              aria-label="delivery_charge"
              aria-labelledby="delivery_charge"
              title="Enter Paid Delivery Charge"
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500">{errors?.delivery_charge?.message}</p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Net Bill Amount : </span>
            <Input
              {...register("net_bill_amount", {
                required: "Please Specify Total Paid Bill Amount",
                validate: (v) =>
                  +v ===
                    +getValues("mrp_per_unit") * +getValues("ordered_units") +
                      +getValues("total_tax") +
                      +getValues("delivery_charge") -
                      +getValues("total_discount") ||
                  "Total Bill Amount Not Match All Charges and Discount Total",
              })}
              type="number"
              variant="faded"
              name="net_bill_amount"
              aria-label="net_bill_amount"
              aria-labelledby="net_bill_amount"
              title="Enter Paid Total Bill Amount"
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500">{errors?.net_bill_amount?.message}</p>
          </span>
          <span className="w-full flex justify-start gap-5 items-center">
            <Button type="submit" color="secondary" variant="shadow">
              CREATE ORDER
            </Button>
            <Button
              type="reset"
              color="secondary"
              variant="shadow"
              endContent={<GrPowerReset />}
              onClick={() => reset()}
            >
              RESET
            </Button>
            {success !== false && (
              <Snippet
                color={success.includes("Successfully") ? "success" : "danger"}
                hideCopyButton
                hideSymbol
              >
                {success}
              </Snippet>
            )}
          </span>
        </form>
      </div>
    </div>
  );
}

export default NewRawMaterialOrderPage;
