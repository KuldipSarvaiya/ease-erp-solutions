import {
  Card,
  CardFooter,
  Button,
  CardHeader,
  CardBody,
  Tooltip,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRight, BsCircleFill } from "react-icons/bs";
import { GrView } from "react-icons/gr";

function RawMaterialCard({ card_only, material }) {
  return (
    <Tooltip
      isDisabled={card_only}
      placement="left"
      content={
        <div className="flex flex-col gap-3 bg-purple-900/10 backdrop-blur-2xl p-3 rounded-xl border-1 border-purple-900 text-white">
          <h5>
            <b>Raw Material Group ID :</b> {material?.raw_material_group_id}
          </h5>
          <p>
            <b>Unit of Measurement :</b> {material?.unit_of_measurement}
          </p>
          <p className="max-w-96 flex flex-col text-xs items-start">
            <big className="font-extrabold">Description :</big>
            {material?.description?.map((item, i) => (
              <span key={i}>⚪{item}</span>
            ))}
          </p>
          <p className="max-w-96 flex flex-col text-xs items-start">
            <big className="font-extrabold">Chemical Property :</big>
            {material?.chemical_property?.map((item, i) => (
              <span key={i}>⚪{item}</span>
            ))}
          </p>
        </div>
      }
      delay={1000}
      className="bg-transparent border-none shadow-none inline-block"
    >
      <Card
        isFooterBlurred
        radius="lg"
        className="shadow-lg border-2 border-slate-900 aspect-square"
      >
        <CardHeader className="flex flex-col justify-start items-start">
          <h4 className="font-bold text-large">
            Usage Process Level : {material?.usage_process_level}
          </h4>
          <span className="flex flex-row flex-nowrap justify-between w-full">
            <span className="text-tiny uppercase font-bold flex flex-col">
              {material?.produced_by?.map((item, i) => (
                <span key={i}>{item.dept_name.replaceAll("-", " ")}</span>
              ))}
              {material?.produced_by?.length === 0 && "💲Purchased"}
            </span>
            <big className=" font-extrabold text-xl">
              <BsArrowRight />
            </big>
            <span className="text-tiny uppercase font-bold flex flex-col">
              {material?.used_by?.map((item, i) => (
                <span key={i}>{item.dept_name.replaceAll("-", " ")}</span>
              ))}
            </span>
          </span>
        </CardHeader>
        {/* <CardBody> */}
        <Image
          alt="Woman listing to music"
          className="object-cover w-full h-full"
          height={300}
          src={"/kuldip_upload/" + material?.image}
          width={300}
        />
        {/* </CardBody> */}
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className="text-base flex items-center flex-row justify-between w-full px-2 text-black/80 font-semibold capitalize">
            <span>{material.name}</span>
            <span className="underline text-sm flex items-center gap-3 flex-wrap">
              <BsCircleFill style={{ color: material?.color || "transparent" }} />{" "}
              {material?.size} {material?.unit_of_measurement}
            </span>
          </p>
          {!card_only && (
            <Button
              as={Link}
              href={`/managers/inventory/raw_material/${material?._id}`}
              className="text-tiny text-white bg-black/40"
              variant="light"
              color="secondary"
              radius="lg"
              size="md"
              isIconOnly
              startContent={<GrView className="scale-150" />}
            ></Button>
          )}
        </CardFooter>
      </Card>
    </Tooltip>
  );
}

export default RawMaterialCard;
