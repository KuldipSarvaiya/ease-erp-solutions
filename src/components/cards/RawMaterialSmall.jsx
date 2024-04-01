import { Button, ButtonGroup, Input, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import { GrAdd } from "react-icons/gr";
import { MdRemove } from "react-icons/md";
import Loading from "../Loading";

function RawMaterialSmall({ no_decrement, no_increment }) {
  function ToolTipDialog() {
    async function handleSubmit(formdata) {
      "use server";

      console.log(
        "form action",
        formdata.get("units"),
        "\n increse pressed = ",
        formdata.get("increase") !== null,
        "\n decrese pressed = ",
        formdata.get("decrease") !== null
      );
    }

    return (
      <form action={handleSubmit}>
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
                endContent={<span className="capitalize">pieces</span>}
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
          src="/AdminPage.svg"
          width={100}
          className="object-contain rounded-lg bg-slate-800"
          aria-label="photot of product"
          aria-labelledby="photot of product"
        />
        <div className="flex flex-col">
          <p className="text-base capitalize text-default-800">indi shirt</p>
          <p className="text-xs text-default-500 capitalize text-nowrap">
            Raw Material Group : raw_material_group
          </p>
          <p className="text-xs text-default-500 flex flex-nowrap gap-2">
            <span>
              Color :{" "}
              <span
                style={{ backgroundColor: "#ffffff" }}
                className="text-slate-800 px-3 rounded-2xl"
              >
                #ffffff
              </span>
            </span>
            <span className="text-xs text-default-500 capitalize">
              Size : m
            </span>
          </p>
          <p className="text-xs text-default-500">
            Last Stock Changed : {new Date().toDateString()}
          </p>
          <p className="text-xs text-default-500">Usage Process Level : 1</p>
          <p className="text-sm text-default-600 capitalize">
            stock units : 100 piece
          </p>
        </div>
      </div>
    </Tooltip>
  );
}

export default RawMaterialSmall;
