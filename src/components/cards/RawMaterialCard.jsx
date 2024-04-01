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
import { BsCircleFill } from "react-icons/bs";
import { GrView } from "react-icons/gr";

function RawMaterialCard({ card_only }) {
  return (
    <Tooltip
      isDisabled={!card_only}
      content={
        <div className="flex flex-col gap-3 bg-purple-900/10 backdrop-blur-2xl p-3 rounded-xl border-1 border-purple-900">
          <h5>
            <b>Raw Material Group ID :</b> dsf2wafasSA
          </h5>
          <p>
            <b>Unit of Measurement :</b> Piece
          </p>
          <p className="max-w-80">
            <b>Description :</b> this is material ois good . very good working .
            price is best works with any tempreture
          </p>
          <p className="max-w-80">
            <b>Chemical Property :</b> this is material ois good . very good
            working . price is best works with any tempreture
          </p>
        </div>
      }
      delay={1000}
      className="bg-transparent border-none shadow-none inline-block"
    >
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
            <span>raw material name</span>
            <span className="underline text-sm flex items-center gap-3 flex-wrap">
              <BsCircleFill className="text-red-500" />2 inch
            </span>
          </p>
          {!card_only && (
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
          )}
        </CardFooter>
      </Card>
    </Tooltip>
  );
}

export default RawMaterialCard;
