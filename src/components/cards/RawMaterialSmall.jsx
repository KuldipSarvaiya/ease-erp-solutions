import { options } from "@/app/api/auth/[...nextauth]/options";
import RawMaterialStock from "@/lib/models/raw_material_stock.model";
import RawMaterialStockHistory from "@/lib/models/raw_material_stock_history.model";
import { Button, ButtonGroup, Input, Tooltip } from "@nextui-org/react";
import { getServerSession } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";
import Image from "next/image";
import { GrAdd } from "react-icons/gr";
import { MdRemove } from "react-icons/md";

async function RawMaterialSmall({ no_decrement, no_increment, material }) {
  const session = await getServerSession(options);
  function ToolTipDialog() {
    async function handleSubmit(formdata) {
      "use server";
      try {
        const stock_id = formdata.get("stock_id");
        const material_id = formdata.get("material_id");
        const updated_by = formdata.get("updated_by");
        const change_units = +formdata.get("units");
        const available_units = +formdata.get("available_units");
        const produced_by = formdata.getAll("produced_by");
        const used_by = formdata.getAll("used_by");
        const increase = formdata.get("increase") !== null;
        const decrease = formdata.get("decrease") !== null;

        if (increase !== !decrease) return;

        const stock = await RawMaterialStock.updateOne(
          { _id: stock_id },
          {
            $set: {
              available_units: increase
                ? available_units + change_units
                : available_units - change_units,
              updated_by: updated_by,
            },
          }
        );

        const history = await RawMaterialStockHistory.insertMany([
          {
            raw_material_id: material_id,
            units: +change_units,
            change_type: increase ? "Increase" : "Decrease",
            produced_by: produced_by,
            used_by: used_by,
            updated_by: updated_by,
          },
        ]);
        revalidateTag("RawMaterialStockHistory");
        revalidatePath("/managers/inventory/raw_material_stock");
        // console.log(stock, history);
      } catch (error) {
        // console.log(error);
      }
    }

    return (
      <form action={handleSubmit}>
        <input
          hidden
          readOnly
          name="stock_id"
          defaultValue={material?._id}
          required
        />
        <input
          hidden
          readOnly
          name="material_id"
          defaultValue={material?.raw_material?._id}
          required
        />
        <input
          hidden
          readOnly
          name="available_units"
          defaultValue={material?.available_units}
          required
        />
        <input
          hidden
          readOnly
          name="updated_by"
          defaultValue={session?.user?._id}
          required
        />
        <select hidden name="produced_by" multiple>
          {material?.produced_by?.map((producedBy, index) => (
            <option
              key={index}
              selected={true}
              value={producedBy.toString()}
              hidden
            >
              {producedBy.toString()}
            </option>
          ))}
        </select>
        <select hidden name="used_by" multiple>
          {material?.used_by?.map((usedBy, index) => (
            <option
              key={index}
              selected={true}
              value={usedBy.toString()}
              hidden
            >
              {usedBy.toString()}
            </option>
          ))}
        </select>
        <div className="flex flex-col gap-3 bg-purple-900/10 backdrop-blur-2xl p-3 rounded-xl border-1 border-purple-900">
          <div className="flex flex-col">
            <p className="text-lg capitalize text-default-800">
              MANAGE STOCK UNITS
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
                    {material?.raw_material?.unit_of_measurement}
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
            {!no_increment && (
              <Button
                name="increase"
                type="submit"
                startContent={<GrAdd className="scale-125" />}
                aria-label="increase"
                aria-labelledby="increase"
              >
                INCREASE
              </Button>
            )}
            {!no_decrement && (
              <Button
                isDisabled={material?.available_units <= 0}
                name="decrease"
                type="submit"
                startContent={<MdRemove className="scale-150" />}
                aria-label="decrease"
                aria-labelledby="decrease"
              >
                DECREASE
              </Button>
            )}
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
          src={material?.raw_material?.image}
          width={100}
          className="object-cover rounded-lg bg-slate-800 max-h-28 "
          aria-label="photot of raw material"
          aria-labelledby="photot of raw material"
        />
        <div className="flex flex-col">
          <p className="text-base capitalize text-default-800">
            {material?.raw_material?.name}
          </p>
          <p className="text-xs text-default-500 capitalize text-nowrap">
            Raw Material Group : {material?.raw_material?.raw_material_group_id}
          </p>
          <p className="text-xs text-default-500 flex flex-nowrap gap-2">
            <span>
              Color :{" "}
              <span
                style={{ backgroundColor: material?.raw_material?.color }}
                className="text-slate-800 px-3 rounded-2xl"
              >
                {material?.raw_material?.color}
              </span>
            </span>
            <span className="text-xs text-default-500 capitalize">
              Size : {material?.raw_material?.size}
            </span>
          </p>
          <p className="text-xs text-default-500">
            Last Stock Changed :{" "}
            {new Date(material?.last_stock_changed_date).toDateString()}
          </p>
          <p className="text-xs text-default-500">
            Usage Process Level : {material?.raw_material?.usage_process_level}
          </p>
          <p className="text-sm text-default-600 capitalize">
            stock units : {material?.available_units}{" "}
            {material?.raw_material?.unit_of_measurement}
          </p>
        </div>
      </div>
    </Tooltip>
  );
}

export default RawMaterialSmall;
