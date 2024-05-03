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
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { GrPowerReset } from "react-icons/gr";
import { VscInsert } from "react-icons/vsc";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ImageUploadButton } from "@/lib/utils/uploadthing";

function NewRawMaterial({ id, data }) {
  const scroll = useRef(null);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callback_url=/managers/finance/incomes");
    },
  });
  const [depts, setDepts] = useState([]);
  const router = useRouter();
  const [colors, setColors] = useState([]);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    getValues,
    reset,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: id ? data : {},
  });

  useEffect(() => {
    setValue("image", image);
  }, [image]);

  // fetches departments
  useEffect(() => {
    if (depts.length === 0)
      (async function () {
        const res = await fetch("/api/hr/department", {
          method: "GET",
        });
        if (!res.ok) return;

        const depts = await res.json();
        // console.log(depts);
        setDepts(depts);
      })();
  });

  useEffect(() => {
    if (id) {
      if (data.color !== "") setColors([data.color]);
      scroll?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }
  }, [id]);

  async function createNewRawMaterial(formdata) {
    setLoading(true);

    formdata.color = id ? colors[0] : colors;
    formdata.size = formdata.size.replaceAll(/\n|\r|\t/g, " ").split(",");
    formdata.description = formdata.description.replaceAll(/\n|\r|\t/g, " ");
    formdata.chemical_property = formdata.chemical_property.replaceAll(
      /\n|\r|\t/g,
      " "
    );
    formdata.updated_by = session?.user?._id;
    if (id) {
      formdata._id = id;
      formdata.size = formdata.size[0];
    }
    // console.log(formdata);

    const formData = new FormData();

    for (const key in formdata) {
      formData.append(key, formdata[key]);
    }

    const result = await fetch("/api/inventory/raw_material", {
      method: id ? "PUT" : "POST",
      body: formData,
    });

    setLoading(false);

    if (!result.ok)
      return alert("Failed To Create New Raw Materails .\n Please Try Again");

    const res = await result.json();

    // console.log(res);

    if (res.success === true)
      return id
        ? router.push("/managers/inventory/raw_material")
        : (() => {
            setColors([]);
            reset();
            setImage("");
          })();

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
      ref={scroll}
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
        <p className="text-red-500">{errors?.raw_material_group_id?.message}</p>
      </span>
      <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
        <span className="text-xl font-semibold">Raw Material Image : </span>
        <input
          {...register("image", {
            required: id ? false : "Please Upload The Raw Material Image",
          })}
          name="image"
          type="text"
          hidden
          className="hidden"
        />
        <ImageUploadButton image={image} setImage={setImage} />
        <p className="text-red-500"> {errors?.image?.message} </p>
      </span>
      <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
        <span className="text-xl font-semibold">
          Raw Material Color <sup>{"(opt)"}</sup> :
        </span>
        <div className="md:col-start-2 md:col-end-4 flex flex-col gap-5">
          <div className="flex gap-7 flex-row items-end">
            <Input
              defaultValue={getValues("color")}
              {...register("color", {
                required: id
                  ? data.color !== ""
                  : "Please Select Colors Of the Product",
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
                const single = id ? colors.length < 1 : true;
                if (!colors.includes(getValues("color")) && single)
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
          // placeholder="0 - if you are buying it"
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
          placeholder={"put (;) for new point"}
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
          placeholder={"put (;) for new point"}
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
            required: false, // "Please select department that produces this material",
          })}
          variant="faded"
          size="md"
          placeholder="leave emploty if you are buying it"
          color="secondary"
          name="produced_by"
          aria-label="select produced_by department"
          aria-labelledby="select produced_by department"
          className="md:col-start-2 md:col-end-4"
        >
          {depts
            ?.filter(
              (dp) => !["hr", "finance", "inventory"].includes(dp.dept_name)
            )
            ?.map((item, i) => {
              return (
                <SelectItem key={item._id} value={item._id}>
                  {`Level : ${item.production_process_level
                    .toString()
                    .padEnd(10, "‎")} ${item.dept_name
                    .toUpperCase()
                    .replaceAll("-", " ")}`}
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
          placeholder=""
          color="secondary"
          name="used_by"
          aria-label="select used_by department"
          aria-labelledby="select used_by department"
          className="md:col-start-2 md:col-end-4"
        >
          {depts
            ?.filter(
              (dp) => !["hr", "finance", "inventory"].includes(dp.dept_name)
            )
            ?.map((item, i) => {
              return (
                <SelectItem
                  key={item._id}
                  value={item._id}
                  aria-disabled={
                    +getValues("usage_process_level") ===
                    +item.production_process_level
                  }
                >
                  {`Level : ${item.production_process_level
                    .toString()
                    .padEnd(10, "‎")} ${item.dept_name
                    .toUpperCase()
                    .replaceAll("-", " ")}`}
                </SelectItem>
              );
            })}
        </Select>
        <p className="text-red-500"> {errors?.used_by?.message} </p>
      </span>
      <span className="flex w-full gap-5">
        <Button
          type="submit"
          color="secondary"
          variant="shadow"
          isLoading={loading}
          endContent={<big>📦</big>}
          // isDisabled={!colors.length}
          className="min-w-fit"
        >
          {id ? "UPDATE RAW MATERIAL" : " ADD RAW MATERIAL"}
        </Button>
        <Button
          isDisabled={loading}
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
