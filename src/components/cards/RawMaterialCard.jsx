import {
  Card,
  CardFooter,
  Button,
  CardHeader,
  CardBody,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { BsCircleFill } from "react-icons/bs";
import { GrView } from "react-icons/gr";

function RawMaterialCard() {
  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="shadow-lg border-2 border-slate-900"
    >
      <CardHeader className="flex flex-col justify-start items-start">
        <h4 className="font-bold text-large">Process Level : 0</h4>
        <span className="flex flex-row flex-nowrap gap-1">
          <span className="text-tiny uppercase font-bold">
            fabric manufacturing &rarr;
          </span>
          <span className="text-tiny uppercase font-bold flex flex-col">
            <span> cleaning & finishing</span>
            <span> cleaning & finishing</span>
          </span>
        </span> 
      </CardHeader>
      <CardBody>
        <Image
          alt="Woman listing to music"
          className="object-cover"
          height={300}
          src="/AdminPage.svg"
          width={300}
        />
      </CardBody>
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-base flex items-center flex-row justify-between w-full px-2 text-white/80 capitalize">
          <span>my product name</span>
          <span className="underline text-sm flex items-center gap-3 flex-wrap">
            <BsCircleFill className="text-red-500" />2 inch
          </span>
        </p>
        <Button
          as={Link}
          href={`/managers/inventory/raw_material/${"puthereid"}`}
          className="text-tiny text-white bg-black/40"
          variant="light"
          color="secondary"
          radius="lg"
          size="md"
          isIconOnly
          startContent={<GrView className="scale-150" />}
        ></Button>
      </CardFooter>
    </Card>
  );
}

export default RawMaterialCard;
