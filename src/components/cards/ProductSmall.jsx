import { options } from "@/app/api/auth/[...nextauth]/options";
import Income from "@/lib/models/income.model";
import Product from "@/lib/models/product.model";
import ProductStockHistory from "@/lib/models/product_stock_history.model";
import { Button, ButtonGroup, Input, Tooltip } from "@nextui-org/react";
import { getServerSession } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";
import Image from "next/image";
import { GrAdd } from "react-icons/gr";
import { MdRemove } from "react-icons/md";

async function ProductSmall({ product }) {
  const session = await getServerSession(options);
  function ToolTipDialog() {
    async function handleSubmit(formdata) {
      "use server";
      try {
        const product_id = formdata.get("product_id");
        const updated_by = formdata.get("updated_by");
        const change_units = formdata.get("units");
        const available_stock_units = formdata.get("available_stock_units");
        const increase = formdata.get("increase") !== null;
        const decrease = formdata.get("decrease") !== null;

        if (increase !== !decrease) return;

        const new_unit = increase
          ? +change_units + +available_stock_units
          : +available_stock_units - +change_units;

        const update = await Product.findOneAndUpdate(
          { _id: product_id },
          { available_stock_units: new_unit, updated_by: updated_by },
          { new: true }
        );

        console.log(update);

        const product_history = {
          product_id: product_id,
          product_group_id: update.product_group_id,
          units: +formdata.get("units"),
          change_type: increase ? "Increase" : "Decrease",
          updated_by: updated_by,
          produced_by: update.produced_by,
        };

        const history = await ProductStockHistory.insertMany([product_history]);

        if (decrease) {
          const res = await Income.insertMany([
            {
              type: "sells",
              date: new Date(),
              amount: +formdata.get("units") * +formdata.get("product_price"),
              description: "Local sell registed by Inventory Manager",
              updated_by: updated_by,
            },
          ]);
        }

        console.log(history);
        revalidateTag("ProductStockHistory");
        revalidatePath("/managers/inventory/product_stock");
      } catch (error) {
        console.error(error);
      }
    }

    return (
      <form action={handleSubmit}>
        <input
          hidden
          readOnly
          name="product_id"
          defaultValue={product?._id}
          required
        />
        <input
          hidden
          readOnly
          name="product_price"
          defaultValue={product?.price}
          required
        />
        <input
          hidden
          readOnly
          name="updated_by"
          defaultValue={session?.user?._id}
          required
        />
        <input
          hidden
          readOnly
          name="available_stock_units"
          defaultValue={product?.available_stock_units}
          required
        />
        <div className="flex flex-col gap-3 bg-purple-900/10 backdrop-blur-2xl p-3 rounded-xl border-1 border-purple-900">
          <div className="flex flex-col">
            <p className="text-lg capitalize text-default-800">
              MANAGE AVAILABLE UNITS
            </p>
            <p className="text-sm text-default-600 capitalize">
              <Input
                name="units"
                type="number"
                max={99999999999999}
                min={1}
                defaultValue={1}
                size="sm"
                variant="faded"
                color="secondary"
                endContent={
                  <span className="capitalize">
                    {product?.unit_of_measurement}
                  </span>
                }
                aria-label="units"
                aria-labelledby="units"
              />
            </p>
          </div>
          <ButtonGroup
            size="sm"
            color="secondary"
            variant="solid"
            className="grid grid-cols-2 gap-1"
          >
            <Button
              name="increase"
              type="submit"
              startContent={<GrAdd className="scale-125" />}
            >
              INCREASE
            </Button>
            <Button
              name="decrease"
              type="submit"
              startContent={<MdRemove className="scale-150" />}
            >
              DECREASE
            </Button>
          </ButtonGroup>
        </div>
      </form>
    );
  }

  return (
    <Tooltip
      content={<ToolTipDialog />}
      placement="bottom"
      delay={1000}
      className="bg-transparent border-none shadow-none inline-block"
    >
      <div className="p-2 flex flex-row gap-3 bg-purple-100/10 backdrop-blur-2xl rounded-xl border-1 border-purple-400  max-w-[350px] flex-1 hover:bg-purple-200/20">
        <Image
          alt="product img"
          height={100}
          radius="sm"
          src={"/kuldip_upload/" + product?.image}
          width={100}
          className="max-h-24 rounded-lg bg-slate-800 object-cover"
          aria-label="photot of product"
          aria-labelledby="photot of product"
        />
        <div className="flex flex-col">
          <p className="text-lg capitalize text-default-800">{product?.name}</p>
          <p className="text-xs text-default-500 capitalize">
            Product Group : {product?.product_group_id}
          </p>
          <p className="text-xs text-default-500">
            Color :{" "}
            <span
              style={{ backgroundColor: product?.color }}
              className="text-slate-700 font-bold px-3 rounded-2xl"
            >
              {product?.color}
            </span>
          </p>
          <p className="text-xs text-default-500 capitalize">
            Size : {product?.size}
          </p>
          <p className="text-sm text-default-600 capitalize">
            available units : {product?.available_stock_units}{" "}
            {product?.unit_of_measurement}
          </p>
        </div>
      </div>
    </Tooltip>
  );
}

export default ProductSmall;
