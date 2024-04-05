"use client";

import {
  createCustomer,
  createSupplier,
} from "@/lib/utils/server_actions/inventory";
import {
  Avatar,
  Button,
  Divider,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaBackward } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

function Page({ params: { men } }) {
  if (men !== "customer" && men !== "supplier") return notFound();

  const router = useRouter();
  const [rawMaterial, setRawMaterial] = useState([]);
  const {
    register,
    getValues,
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    console.log(men);
    if (men === "supplier")
      setRawMaterial([
        "shirt",
        "t-shirt",
        "jeans",
        "trouser",
        "polo",
        "jacket",
      ]);
  }, []);

  async function submitForm(data) {
    console.log(data);

    const formdata = new FormData();

    for (const key in data) {
      if (key === "image") formdata.append(key, data[key][0]);
      else formdata.append(key, data[key]);
    }

    const res =
      men === "customer"
        ? await createCustomer(formdata)
        : await createSupplier(formdata);

    console.log(res);

    if (res.success === true) return router.push("/managers/inventory/crm");
    else alert("Failed To Create New " + men + ".\n Please Try Again");

    for (const key in res) {
      setError(key, { message: res[key] });
    }
  }

  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      <div className="border-4 rounded-3xl mx-10 mt-4 mb-10 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch">
        <p className="text-2xl font-bold tracking-wide flex justify-between flex-row w-full uppercase">
          ADD NEW {men}
          <Button
            as={Link}
            href="/managers/inventory/crm"
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
          onSubmit={handleSubmit(submitForm)}
          noValidate={false}
          encType="multipart/form-data"
          className="flex flex-col flex-nowrap gap-5 md:flex-nowrap w-full"
        >
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Name : </span>
            <Input
              {...register("name", {
                required: "Please Name of Supplier",
              })}
              variant="faded"
              size="md"
              color="secondary"
              type="text"
              name="name"
              aria-label="select name of supplier"
              aria-labelledby="select name of supplier"
              title="Enter name of the supplier"
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500"> {errors?.name?.message} </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Image : </span>
            <Input
              {...register("image", {
                required: "Please Drop a Supplier Image",
                validate: (v) =>
                  v[0].size < 500 * 1024 || "Imgae Size is Large, max 500kb",
              })}
              startContent={
                <Avatar
                  radius="lg"
                  size="md"
                  src={
                    getValues("image")?.[0]
                      ? URL.createObjectURL(getValues("image")[0])
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
              name="image"
              aria-label="image"
              aria-labelledby="image"
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500"> {errors?.image?.message} </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Email :</span>
            <Input
              {...register("email", {
                required: "Please Enter Email of Supplier",
              })}
              variant="faded"
              size="md"
              color="secondary"
              type="email"
              name="email"
              aria-label="email"
              aria-labelledby="email"
              title="Enter Email of Supplier"
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500"> {errors?.email?.message} </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Contact No. :</span>
            <Input
              {...register("contact_no", {
                required: "Please Enter Contact No of Supplier",
              })}
              variant="faded"
              size="md"
              color="secondary"
              type="tel"
              name="contact_no"
              aria-label="contact_no"
              aria-labelledby="contact_no"
              title="Enter Contact No of Supplier"
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500"> {errors?.contact_no?.message} </p>
          </span>
          <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
            <span className="text-xl font-semibold">Address :</span>
            <Textarea
              {...register("address", {
                required: "Please Enter Address of Supplier",
              })}
              variant="faded"
              size="md"
              color="secondary"
              type="tel"
              name="address"
              aria-label="address"
              aria-labelledby="address"
              title="Enter Address of Supplier"
              className="md:col-start-2 md:col-end-4"
            />
            <p className="text-red-500"> {errors?.address?.message} </p>
          </span>
          {men === "customer" && (
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1 gap-3">
              <span className="text-xl font-semibold">
                Address Coordinates :
              </span>
              <span className="flex gap-3 items-stretch md:col-start-2 md:col-end-4">
                <Input
                  {...register("latitude", {
                    validate: (v) =>
                      !v.toString().includes("e") ||
                      "latitude must be a valid number",
                  })}
                  variant="faded"
                  size="md"
                  color="secondary"
                  type="number"
                  name="latitude"
                  aria-label="latitude"
                  aria-labelledby="latitude"
                  title="Enter latitude of Address"
                  startContent={<span>Latitude:</span>}
                />
                <Input
                  {...register("longitude", {
                    validate: (v) =>
                      !v.toString().includes("e") ||
                      "longitude must be a valid number",
                  })}
                  variant="faded"
                  size="md"
                  color="secondary"
                  type="number"
                  name="longitude"
                  aria-label="longitude"
                  aria-labelledby="longitude"
                  title="Enter longitude of Address"
                  startContent={<span>Longitude:</span>}
                />
              </span>
              <p className="text-red-500">
                {errors?.latitude?.message} <br /> {errors?.longitude?.message}
              </p>
            </span>
          )}
          {men === "supplier" && (
            <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
              <span className="text-xl font-semibold">
                Supplied Raw Material :
              </span>
              <Select
                {...register("supplied_material_id", {
                  required:
                    "Please select Raw Material supplied by this supplier",
                })}
                selectionMode="multiple"
                isMultiline
                variant="faded"
                size="md"
                color="secondary"
                name="supplied_material_id"
                aria-label="select supplied_material_id"
                aria-labelledby="select supplied_material_id"
                className="md:col-start-2 md:col-end-4"
              >
                {rawMaterial?.map((item, i) => {
                  return (
                    <SelectItem key={item} value={item}>
                      {item.toUpperCase()}
                    </SelectItem>
                  );
                })}
              </Select>
              <p className="text-red-500">
                {errors?.supplied_material_id?.message}
              </p>
            </span>
          )}
          <span className="grid grid-cols-6 gap-3 max-md:grid-cols-2 max-md:grid-rows-2 grid-rows-1">
            <Button
              type="submit"
              color="secondary"
              variant="shadow"
              className="uppercase"
            >
              CREATE {men}
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
          </span>
        </form>
      </div>
    </div>
  );
}

export default Page;