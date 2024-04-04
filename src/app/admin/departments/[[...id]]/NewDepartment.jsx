"use client";

import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { GrPowerReset } from "react-icons/gr";

function NewDepartment({ id, data }) {
  const router = useRouter();
  const {
    register,
    getValues,
    reset,
    setError,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: id ? data : {},
  });

  async function createNewDepartment(data) {
    console.log(data);

    const formData = new FormData();

    for (const key in data) formData.append(key, data[key]);

    const result = await fetch("/api/admin/departments", {
      method: id ? "PUT" : "POST",
      body: formData,
    });
    if (!result.ok)
      return alert("Request has Failed in Department.\n Please Try Again");

    const res = await result.json();

    console.log(res);

    if (res.success === true)
      return id ? router.push("/admin/departments") : reset();

    for (const key in res) {
      setError(key, { message: res[key] });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(createNewDepartment)}
      noValidate={false}
      encType="multipart/form-data"
      className="flex flex-col flex-nowrap gap-5 md:flex-nowrap w-full"
    >
      <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
        <span className="text-xl font-semibold">Department Name : </span>
        <Input
          defaultValue={getValues("dept_name")}
          {...register("dept_name", {
            required: "Please Specify Department Name",
          })}
          variant="faded"
          size="md"
          color="secondary"
          type="text"
          name="dept_name"
          aria-label="dept_name"
          aria-labelledby="dept_name"
          title="Enter department name of the product"
          className="md:col-start-2 md:col-end-4"
        />
        <p className="text-red-500"> {errors?.dept_name?.message} </p>
      </span>
      <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
        <span className="text-xl font-semibold">
          Production Proccess Level :
        </span>
        <Input
          defaultValue={getValues("production_process_level")}
          {...register("production_process_level", {
            required: "Please Specify Production Process Level of Department",
          })}
          variant="faded"
          size="md"
          color="secondary"
          type="number"
          name="production_process_level"
          aria-label="production_process_level"
          aria-labelledby="production_process_level"
          title="Enter Production process level of department"
          className="md:col-start-2 md:col-end-4"
        />
        <p className="text-red-500">
          {" "}
          {errors?.production_process_level?.message}{" "}
        </p>
      </span>
      <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
        <span className="text-xl font-semibold">
          Used Raw Material Level :{" "}
        </span>
        <Input
          defaultValue={getValues("raw_material_used_level")}
          {...register("raw_material_used_level", {
            required:
              "Please Enter the Level of Material Used in this Department",
            min: 1,
            max: 10000,
          })}
          variant="faded"
          raw_material_used_level="md"
          color="secondary"
          type="number"
          name="raw_material_used_level"
          aria-label="raw_material_used_level"
          aria-labelledby="raw_material_used_level"
          title="Enter raw_material_used_level in this department"
          className="md:col-start-2 md:col-end-4"
        />
        <p className="text-red-500">
          {errors?.raw_material_used_level?.message}
        </p>
      </span>
      <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
        <span className="text-xl font-semibold">
          Produced Raw Material Level :{" "}
        </span>
        <Input
          defaultValue={getValues("produced_material_level")}
          {...register("produced_material_level", {
            required:
              "Please Enter the Level of Material Produced by this Department",
            min: 2,
            max: 10000,
          })}
          variant="faded"
          size="md"
          color="secondary"
          type="number"
          name="produced_material_level"
          aria-label="produced_material_level"
          aria-labelledby="produced_material_level"
          title="Enter produced_material_level in this department"
          className="md:col-start-2 md:col-end-4"
        />
        <p className="text-red-500">
          {errors?.produced_material_level?.message}
        </p>
      </span>
      <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
        <span className="text-xl font-semibold">Used Raw Materials : </span>
        <Select
          defaultSelectedKeys={getValues("used_material_id")}
          {...register("used_material_id", {
            required: "Please Select the Materials Used by this Department",
          })}
          selectionMode="multiple"
          isMultiline
          variant="faded"
          size="md"
          color="secondary"
          name="used_material_id"
          aria-label="used_material_id"
          aria-labelledby="used_material_id"
          title="Enter used materials in this department"
          className="md:col-start-2 md:col-end-4"
        >
          {/* // ! here you will need all the raw materials within the process level */}
          {[
            "rajapuri keri",
            "kesar keri",
            "hafus keri",
            "kagda keri",
            "daseri keri",
          ].map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </Select>
        <p className="text-red-500">{errors?.used_material_id?.message}</p>
      </span>
      <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
        <span className="text-xl font-semibold">Produced Raw Materials : </span>
        <Select
          defaultSelectedKeys={getValues("produced_material_id")}
          {...register("produced_material_id", {
            required: "Please Select the Materials Produced by this Department",
          })}
          selectionMode="multiple"
          isMultiline
          variant="faded"
          size="md"
          color="secondary"
          name="produced_material_id"
          aria-label="produced_material_id"
          aria-labelledby="produced_material_id"
          title="Enter produced_materials in this department"
          className="md:col-start-2 md:col-end-4"
        >
          {/* // ! here you will need all the raw materials within the process level */}
          {["ready made keri ras", "keri no ras kadho", "frooti pivo"].map(
            (item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            )
          )}
        </Select>
        <p className="text-red-500">{errors?.produced_material_id?.message}</p>
      </span>
      <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
        <span className="text-xl font-semibold">Produced Products : </span>
        <Select
          defaultSelectedKeys={getValues("produced_product_id")}
          {...register("produced_product_id", {
            required: "Please Select the Products Produced by this Department",
          })}
          selectionMode="multiple"
          isMultiline
          variant="faded"
          size="md"
          color="secondary"
          name="produced_product_id"
          aria-label="produced_product_id"
          aria-labelledby="produced_product_id"
          title="Enter produced_product in this department"
          className="md:col-start-2 md:col-end-4"
        >
          {/* // ! here you will need all the product within the process level */}
          {[
            "gokul no ras",
            "gir ni special keri",
            "laal desi keri",
            "apdi vadi ni keri",
          ].map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </Select>
        <p className="text-red-500">{errors?.produced_product_id?.message}</p>
      </span>
      <span className="grid grid-cols-6 gap-3 max-md:grid-cols-2 max-md:grid-rows-2 grid-rows-1">
        <Button
          type="submit"
          color="secondary"
          isDisabled={!isDirty}
          variant="shadow"
          endContent={<>✅</>}
        >
          {id ? "UPDATE DEPARTMENT" : "CREATE DEPARTMENT"}
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
  );
}

export default NewDepartment;
