import { Card, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsCircleFill } from "react-icons/bs";

function ProductSellCard({ product }) {
  return (
    <Link
      href={`/customer/products/${product?.product_group_id}?size=${product?.size}&color=${product?.color.substr(1,10)}`}
    >
      <Card
        isFooterBlurred
        radius="lg"
        className="border-2 border-slate-900 text-slate-800 group"
      >
        <Image
          alt="Woman listing to music"
          className="object-cover aspect-square"
          height={300}
          src={product?.image}
          width={300}
        />
        <CardFooter
          className="justify-between flex-col group-hover:bg-white before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10"
          style={{ textShadow: "0px 0px 1px white" }}
        >
          <p className="text-base flex items-center flex-row justify-between w-full px-2 capitalize">
            <span>{product?.name}</span>
            <span className="underline text-sm flex items-center gap-3 flex-wrap">
              <BsCircleFill
                style={{ color: product?.color }}
                className="group-hover:border-small group-hover:border-black"
              />
              {product?.size}
            </span>
          </p>
          <p className="flex flex-row justify-between w-full">
            <span>
              &nbsp;Price : <b>&#8377;. {product?.price} </b>
              <s>32432</s>
            </span>
            {product?.available_stock_units < 20 ? (
              <span className="text-red-500 text-nowrap">
                {product.available_stock_units} Units
              </span>
            ) : (
              <span className="text-emerald-500">Available</span>
            )}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default ProductSellCard;
