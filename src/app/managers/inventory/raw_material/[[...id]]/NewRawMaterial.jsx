"use client";

import {
  Avatar,
  Button,
  Chip,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GrPowerReset } from "react-icons/gr";
import { VscInsert } from "react-icons/vsc";

function NewRawMaterial({ id, data }) {
  const router = useRouter();
  const [colors, setColors] = useState([]);
  const {
    register,
    getValues,
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: id ? data : {},
  });

  useEffect(() => {
    if (id) {
      setColors([data.color]);
    }
  }, [id]);

  async function createNewRawMaterial(formdata) {
    formdata.color = colors;
    formdata.size = formdata.size.split(",");
    formdata.description = formdata.description.split("\n");
    formdata.chemical_property = formdata.chemical_property.split("\n"); 
    console.log(formdata);

    const formData = new FormData();

    for (const key in formdata) {
      if (key === "image") formData.append(key, formdata[key][0]);
      else formData.append(key, formdata[key]);
    }

    const result = await fetch("/api/inventory/raw_material", {
      method: id ? "PUT" : "POST",
      body: formData,
    });
    if (!result.ok)
      return alert("Failed To Create New Product.\n Please Try Again");

    const res = await result.json();

    console.log(res);

    if (res.success === true)
      return id ? router.push("/managers/inventory/raw_material") : reset();

    for (const key in res) {
      setError(key, { message: res[key] });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(createNewRawMaterial)}
      // action={createNewRawMaterial}
      noValidate={false}
      encType="multipart/form-data"
      className="flex flex-col flex-nowrap gap-5 md:flex-nowrap w-full"
    >
      <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
        <span className="text-xl font-semibold">Raw Material Name : </span>
        <Input
          defaultValue={getValues("name")}
          {...register("name", {
            required: "Please Specify Name Of the Raw Material",
          })}
          variant="faded"
          size="md"
          color="secondary"
          type="text"
          name="name"
          aria-label="name"
          aria-labelledby="name"
          title="Enter name of the product"
          className="md:col-start-2 md:col-end-4"
        />
        <p className="text-red-500"> {errors?.name?.message} </p>
      </span>
      <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
        <span className="text-xl font-semibold">Raw Material Group ID : </span>
        <Input
          defaultValue={getValues("raw_material_group_id")}
          {...register("raw_material_group_id", {
            required: "Please Specify Group Of the Raw Material",
          })}
          isReadOnly={id}
          variant="faded"
          size="md"
          color="secondary"
          type="text"
          name="raw_material_group_id"
          aria-label="raw_material_group_id"
          aria-labelledby="raw_material_group_id"
          title="Enter group id of the product"
          className="md:col-start-2 md:col-end-4"
        />
        <p className="text-red-500">
          {" "}
          {errors?.raw_material_group_id?.message}{" "}
        </p>
      </span>
      <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
        <span className="text-xl font-semibold">Raw Material Image : </span>
        <Input
          defaultValue={getValues("image")}
          {...register("image", {
            required: id ? false : "Please Drop a Product Image",
            validate: (v) =>
              id
                ? true
                : v[0].size < 500 * 1024 || "Imgae Size is Large, max 500kb",
          })}
          startContent={
            <Avatar
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
        <span className="text-xl font-semibold">
          Raw Material Color <sup>{"(opt)"}</sup> :
        </span>
        <div className="md:col-start-2 md:col-end-4 flex flex-col gap-5">
          <div className="flex gap-7 flex-row items-end">
            <Input
              // defaultValue={getValues("color")}
              {...register("color", {
                required: "Please Select Colors Of the Product",
              })}
              variant="faded"
              size="md"
              color="secondary"
              type="color"
              name="color"
              aria-label="color"
              aria-labelledby="color"
              title="select colors of the product"
            />
            <Button
              type="button"
              endContent={
                <b>
                  <VscInsert />
                </b>
              }
              color="secondary"
              variant="faded"
              size="lg"
              className="h-14"
              onClick={() => {
                if (!colors.includes(getValues("color")))
                  setColors((prev) => {
                    return [...prev, getValues("color")];
                  });
              }}
              isDisabled={id ? colors.length === 1 : false}
            >
              ADD COLOR
            </Button>
          </div>
          <div className="flex gap-2 flex-wrap gap-y-5">
            {colors.map((color) => {
              return (
                <Chip
                  key={color}
                  variant="bordered"
                  style={{ backgroundColor: color }}
                  endContent={
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      style={{ textShadow: "0px 0px 1px black" }}
                      onClick={() => {
                        setColors((prev) => {
                          return prev.filter((col) => col !== color);
                        });
                      }}
                    >
                      ❌
                    </Button>
                  }
                >
                  {color}
                </Chip>
              );
            })}
          </div>
        </div>
        <p className="text-red-500"> {errors?.color?.message} </p>
      </span>
      <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
        <span className="text-xl font-semibold">
          Raw Material Sizes <sup>{"(opt)"}</sup> :{" "}
        </span>
        <Input
          defaultValue={getValues("size")}
          {...register("size")}
          variant="faded"
          size="md"
          color="secondary"
          placeholder="seperate multiple sizes by comma sign ( , ) || e.g. = 1, 2, 5, ..."
          type="text"
          name="size"
          aria-label="size"
          aria-labelledby="size"
          title="Enter multiple sizes of the product"
          className="md:col-start-2 md:col-end-4"
        />
        <p className="text-red-500"> {errors?.size?.message} </p>
      </span>
      <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
        <span className="text-xl font-semibold">Unit of Measurement : </span>
        <Input
          defaultValue={getValues("unit_of_measurement")}
          {...register("unit_of_measurement", {
            required: "Please Specify Unit of Measurement Of the Product",
          })}
          variant="faded"
          size="md"
          color="secondary"
          type="text"
          name="unit_of_measurement"
          aria-label="unit_of_measurement"
          aria-labelledby="unit_of_measurement"
          title="Enter Unit of Measurement of the product"
          className="md:col-start-2 md:col-end-4"
        />
        <p className="text-red-500"> {errors?.unit_of_measurement?.message} </p>
      </span>
      <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
        <span className="text-xl font-semibold">Usage Process Level :</span>
        <Input
          defaultValue={getValues("usage_process_level")}
          {...register("usage_process_level", {
            required: "Please Enter level of usage in manufacturing process",
          })}
          variant="faded"
          size="md"
          color="secondary"
          type="text"
          name="usage_process_level"
          aria-label="usage_process_level"
          aria-labelledby="usage_process_level"
          title="Enter level of usage manufacturing in process"
          className="md:col-start-2 md:col-end-4"
        />
        <p className="text-red-500"> {errors?.usage_process_level?.message} </p>
      </span>
      <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
        <span className="text-xl font-semibold">
          Raw Material Description :{" "}
        </span>
        <Textarea
          defaultValue={getValues("description")}
          {...register("description", {
            required: "Please Specify Description About Product",
          })}
          variant="faded"
          size="lg"
          color="secondary"
          placeholder={"hit ↩️ENTER for new point"}
          name="description"
          aria-label="description"
          aria-labelledby="description"
          title="Enter Description About Product"
          className="md:col-start-2 md:col-end-4"
        />
        <p className="text-red-500"> {errors?.description?.message} </p>
      </span>
      <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
        <span className="text-xl font-semibold">Chemical Property : </span>
        <Textarea
          defaultValue={getValues("chemical_property")}
          {...register("chemical_property", {
            required: "Please Specify Chemical Property of Product",
          })}
          variant="faded"
          size="lg"
          color="secondary"
          placeholder={"hit ↩️ENTER for new point"}
          name="chemical_property"
          aria-label="chemical_property"
          aria-labelledby="chemical_property"
          title="Enter Chemical Property of Product"
          className="md:col-start-2 md:col-end-4"
        />
        <p className="text-red-500"> {errors?.chemical_property?.message} </p>
      </span>
      <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
        <span className="text-xl font-semibold">
          Raw Material Produced By :{" "}
        </span>
        <Select
          defaultSelectedKeys={getValues("produced_by")}
          {...register("produced_by", {
            required: "Please select department that produces this material",
          })}
          variant="faded"
          size="md"
          color="secondary"
          name="produced_by"
          aria-label="select produced_by department"
          aria-labelledby="select produced_by department"
          className="md:col-start-2 md:col-end-4"
        >
          {[
            "hr",
            "finance",
            "inventory",
            "fabric manufacturing",
            "cleaning and finishing",
            "dying and printing",
            "cutting",
            "sewing",
            "packing and labeling",
          ].map((item, i) => {
            return (
              <SelectItem key={item} value={item}>
                {item.toUpperCase()}
              </SelectItem>
            );
          })}
        </Select>
        <p className="text-red-500"> {errors?.produced_by?.message} </p>
      </span>
      <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
        <span className="text-xl font-semibold">Raw Material Used By :</span>
        <Select
          defaultSelectedKeys={getValues("used_by")}
          {...register("used_by", {
            required: "Please select department that produces this material",
          })} 
          selectionMode="multiple"
          isMultiline
          variant="faded"
          size="md"
          color="secondary"
          name="used_by"
          aria-label="select used_by department"
          aria-labelledby="select used_by department"
          className="md:col-start-2 md:col-end-4"
        >
          {[
            "hr",
            "finance",
            "inventory",
            "fabric manufacturing",
            "cleaning and finishing",
            "dying and printing",
            "cutting",
            "sewing",
            "packing and labeling",
          ].map((item, i) => {
            return (
              <SelectItem key={item} value={item}>
                {item.toUpperCase()}
              </SelectItem>
            );
          })}
        </Select>
        <p className="text-red-500"> {errors?.used_by?.message} </p>
      </span>
      <span className="grid grid-cols-6 gap-3 max-md:grid-cols-2 max-md:grid-rows-2 grid-rows-1">
        <Button
          type="submit"
          color="secondary"
          variant="shadow"
          endContent={<big>📦</big>}
          // isDisabled={!colors.length}
        >
          ADD PRODUCT
        </Button>
        <Button
          type="reset"
          color="secondary"
          variant="shadow"
          endContent={<GrPowerReset />}
          onClick={() => {
            reset();
            setColors([]);
          }}
        >
          RESET
        </Button>
      </span>
    </form>
  );
}

export default NewRawMaterial;
