import {
  Card,
  CardFooter,
  Button,
  CardBody,
  CardHeader,
  Tooltip,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRight, BsCircleFill } from "react-icons/bs";
import { GrView } from "react-icons/gr";

function ProductCard({ card_only, product }) {
  return (
    <Tooltip
      placement="left"
      content={
        <div className="flex flex-col gap-3 bg-purple-900/10 backdrop-blur-2xl p-3 rounded-xl border-1 border-purple-900">
          <h5>
            <b>Product Group ID :</b> {product?.product_group_id}
          </h5>
          <p className="max-w-96 flex flex-col text-xs items-start">
            <big className="font-extrabold">Description :</big>
            {product?.description?.map((item, i) => (
              <span key={i}>⚪{item}</span>
            ))}
          </p>
          <p className="max-w-96 flex flex-col text-xs items-start">
            <big className="font-extrabold">Chemical Property :</big>
            {product?.chemical_property?.map((item, i) => (
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
        {!card_only && (
          <CardHeader className="justify-around bg-white/20 border-white/20 border-1 backdrop-blur-sm overflow-hidden py-1 absolute before:rounded-xl rounded-large top-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 text-slate-900">
            <span className="flex flex-row flex-nowrap justify-between gap-1 w-full">
              <span className="text-tiny flex gap-2  uppercase font-bold">
                Produced By{" "}
                <big className=" font-extrabold text-xl">
                  <BsArrowRight />
                </big>
              </span>
              <span className="text-tiny uppercase font-bold flex flex-col">
                {product?.produced_by?.map((item, i) => (
                  <span key={i}>{item?.dept_name?.replaceAll("-", " ")}</span>
                ))}
              </span>
            </span>
          </CardHeader>
        )}
        {/* <CardBody> */}
        <Image
          src={product?.image}
          alt="image of the product"
          height={300}
          width={300}
          className="h-full w-full object-cover"
        />
        {/* </CardBody> */}
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] ml-1 z-10 font-bold shadow-slate-800  shadow-inner">
          <p className="text-lg flex items-center flex-row justify-between w-full px-2 text-black/80 capitalize">
            <span>{product?.name}</span>
            <span className="underline text-sm flex items-center gap-3 flex-wrap">
              {product?.size}
              <BsCircleFill style={{ color: product?.color }} />{" "}
              {product?.available_stock_units} {product?.unit_of_measurement}
            </span>
          </p>
          {!card_only && (
            <Button
              as={Link}
              href={`/managers/inventory/product/${product?._id}`}
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

export default ProductCard;
