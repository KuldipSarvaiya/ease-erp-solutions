import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsCircleFill } from "react-icons/bs";

function ProductSellCard() {
  return (
    <Link href={"/customer/products/" + "product_id"}>
      <Card
        isFooterBlurred
        radius="lg"
        className="shadow-lg border-2 border-slate-900"
      >
        <CardBody>
          <Image
            alt="Woman listing to music"
            className="object-cover"
            height={300}
            src="/AdminPage.svg"
            width={300}
          />
        </CardBody>
        <CardFooter className="justify-between flex-col before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className="text-base flex items-center flex-row justify-between w-full px-2 text-white/80 capitalize">
            <span>raw material name</span>
            <span className="underline text-sm flex items-center gap-3 flex-wrap">
              <BsCircleFill className="text-red-500" />2 inch
            </span>
          </p>
          <p className="flex flex-row justify-start w-full">
            <span>
              &nbsp;Price : <b>Rs. 2322 </b>
              <s>32432</s>
            </span>
            {/* <span>Available</span> */}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default ProductSellCard;
