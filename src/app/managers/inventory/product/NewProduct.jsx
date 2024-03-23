"use client";

import { createProduct } from "@/lib/utils/server_actions/inventory";
import { Avatar, Button, Chip, Input, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { GrPowerReset } from "react-icons/gr";
import { VscInsert } from "react-icons/vsc";

function NewProduct() {
  const [colors, setColors] = useState([]);
  const {
    register,
    getValues,
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function createNewProduct(formdata) {
    formdata.color = colors;
    formdata.size = formdata.size.split(",");
    formdata.description = formdata.description.split("\n");
    formdata.chemical_property = formdata.chemical_property.split("\n");
    formdata.tags = formdata.tags.split(",");
    console.log(formdata);

    // ! can not create new product with server action
    // ? create api route for this new product
    const res = await fetch("/api/inventory/product", {
      method: "POST",
      body: JSON.stringify(formdata),
    });

    console.log(res);

    if (res === true) return reset();

    for (const key in res) {
      setError(key, { message: res[key] });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(createNewProduct)}
      // action={createNewProduct}
      noValidate={false}
      encType="multipart/form-data"
      className="flex flex-col flex-nowrap gap-5 md:flex-nowrap w-full"
    >
      <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
        <span className="text-xl font-semibold">Product Name : </span>
        <Input
          {...register("name", {
            required: "Please Specify Name Of the Product",
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
        <span className="text-xl font-semibold">Product Image : </span>
        <Input
          {...register("image", {
            required: "Please Drop a Product Image",
            validate: (v) =>
              v[0].size < 500 * 1024 || "Imgae Size is Large, max 500kb",
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
          Product Color <sup>{"(opt)"}</sup> :
        </span>
        <div className="md:col-start-2 md:col-end-4 flex flex-col gap-5">
          <div className="flex gap-7 flex-row items-end">
            <Input
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
          Product Sizes <sup>{"(opt)"}</sup> :{" "}
        </span>
        <Input
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
        <span className="text-xl font-semibold">
          Expiry Timing <sup>{"(opt)"}</sup> :{" "}
        </span>
        <Input
          {...register("expiry_timing")}
          variant="faded"
          size="md"
          color="secondary"
          type="text"
          name="expiry_timing"
          aria-label="expiry_timing"
          aria-labelledby="expiry_timing"
          title="Enter Lable Of Expiry Timing"
          className="md:col-start-2 md:col-end-4"
        />
        <p className="text-red-500"> {errors?.expiry_timing?.message} </p>
      </span>
      <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
        <span className="text-xl font-semibold">Product Description : </span>
        <Textarea
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
        <span className="text-xl font-semibold">Product Price : </span>
        <Input
          {...register("price", {
            required: "Please Specify Product Price",
          })}
          variant="faded"
          size="md"
          color="secondary"
          type="number"
          name="price"
          aria-label="price"
          aria-labelledby="price"
          title="Enter Product Price"
          className="md:col-start-2 md:col-end-4"
        />
        <p className="text-red-500"> {errors?.price?.message} </p>
      </span>
      <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
        <span className="text-xl font-semibold">Discount : </span>
        <Input
          {...register("discount", {
            required: "Please Specify Discount",
          })}
          variant="faded"
          size="md"
          color="secondary"
          type="number"
          name="discount"
          aria-label="discount"
          aria-labelledby="discount"
          title="Enter Discount"
          className="md:col-start-2 md:col-end-4"
        />
        <p className="text-red-500"> {errors?.discount?.message} </p>
      </span>
      <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
        <span className="text-xl font-semibold">Available Units : </span>
        <Input
          {...register("available_stock_units", {
            required: "Please Specify Available Units",
          })}
          variant="faded"
          size="md"
          color="secondary"
          type="number"
          name="available_stock_units"
          aria-label="available_stock_units"
          aria-labelledby="available_stock_units"
          title="Enter Available Units"
          className="md:col-start-2 md:col-end-4"
        />
        <p className="text-red-500">{errors?.available_stock_units?.message}</p>
      </span>
      <span className="grid grid-cols-4 max-md:grid-cols-1 max-md:grid-rows-2 grid-rows-1">
        <span className="text-xl font-semibold">Search Tags : </span>
        <Input
          {...register("tags", {
            required: "Please Specify Search Tags",
          })}
          variant="faded"
          size="md"
          color="secondary"
          placeholder="seperate multiple tags by comma sign ( , ) || e.g. = variety, smooth, latest, ..."
          type="text"
          name="tags"
          aria-label="tags"
          aria-labelledby="tags"
          title="Enter Search Tags"
          className="md:col-start-2 md:col-end-4"
        />
        <p className="text-red-500"> {errors?.tags?.message} </p>
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

export default NewProduct;
