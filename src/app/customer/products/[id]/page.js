"use client";

import { Button, ButtonGroup } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsCart2, BsCircleFill } from "react-icons/bs";
import { PiMinusBold, PiPlusBold } from "react-icons/pi";

export default function Page({ params: { id } }) {
  const [units, setUnits] = useState(1);
  console.log(id);

  return (
    <>
      <div className="w-10/12 m-auto my-5 flex flex-col flex-nowrap gap-5">
        {/* hero section */}
        <div className="grid grid-cols-2 max-md:grid-cols-1 grid-rows-1  max-md:grid-rows-2">
          <Image
            src={"/AdminPage.svg"}
            height={400}
            width={500}
            alt="Image Of Product"
            aria-label="image of product"
            aria-labelledby="product image"
            className="bg-slate-400"
          />
          {/* side of image */}
          <div className="text-xl h-full flex flex-col flex-nowrap justify-around">
            <p className="row-start-1 row-end-2 text-4xl capitalize">
              <b>Product name gooes here </b>
            </p>
            <p className="row-start-2 row-end-3">
              <b>
                Discount : <s>6</s> 12 %{" "}
              </b>
            </p>
            <p className="row-start-3 row-end-4">
              <b>
                Price : Rs. 2423 <s>3246</s>{" "}
              </b>
            </p>
            <p className="row-start-4 row-end-5">
              <b>
                This Product Is Available In Following Color And Size
                Combinations :
              </b>
              <br />
              <span className="flex flex-row flex-wrap gap-5 w-full">
                <Button
                  as={Link}
                  href={"/customer/products/" + "ewwer"}
                  variant="light"
                >
                  <BsCircleFill className="text-red-500" /> | 2 Inch
                </Button>
                <Button
                  as={Link}
                  href={"/customer/products/" + "ewwer"}
                  variant="light"
                >
                  <BsCircleFill className="text-red-500" /> | 4 Inch
                </Button>
                <Button
                  as={Link}
                  href={"/customer/products/" + "ewwer"}
                  variant="light"
                >
                  <BsCircleFill className="text-green-500" /> | 2 Inch
                </Button>
                <Button
                  as={Link}
                  href={"/customer/products/" + "ewwer"}
                  variant="light"
                >
                  <BsCircleFill className="text-green-500" /> | 4 Inch
                </Button>
                <Button
                  as={Link}
                  href={"/customer/products/" + "ewwer"}
                  variant="light"
                >
                  <BsCircleFill className="text-yellow-500" /> | 2 Inch
                </Button>
                <Button
                  as={Link}
                  href={"/customer/products/" + "ewwer"}
                  variant="light"
                >
                  <BsCircleFill className="text-yellow-500" /> | 4 Inch
                </Button>
              </span>
            </p>

            <p className="capitalize row-start-5 row-end-6">
              <b>Expiry Timing : Best Before 12 Months of packaging</b>
            </p>
            <p className="row-start-6 row-end-7">
              <b>Unit Of Measurement : Inch</b>
            </p>
            <p className="row-start-7 row-end-8 text-red-500">
              <b>Hurry Up!! Only Few Stock Left...</b>
            </p>
            <p className="row-start-8 row-end-10">
              <ButtonGroup variant="ghost" color="secondary" size="lg">
                <Button
                  isDisabled={units === 1}
                  onClick={() => setUnits((prev) => prev - 1)}
                >
                  <PiMinusBold />
                </Button>
                <span className="mx-5 font-bold">{units}</span>
                <Button onClick={() => setUnits((prev) => prev + 1)}>
                  <PiPlusBold />
                </Button>
              </ButtonGroup>
              &nbsp; &nbsp; &nbsp; &nbsp;
              <Button
                variant="shadow"
                color="secondary"
                size="lg"
                endContent={<BsCart2 />}
                isDisabled={units === 0}
              >
                {" "}
                BUY NOW{" "}
              </Button>
            </p>
          </div>
        </div>

        {/* chemical property */}
        <div className="w-full">
          <p className="font-extrabold text-2xl">
            Chemical Properties Of The Product
          </p>
          <div className="ml-10">
            <li>this is made out of cotton</li>
            <li>press it in low iron tempreture</li>
            <li>it leaves color on waash</li>
            <li>use low powder</li>
          </div>
        </div>

        {/* description */}
        <div className="w-full">
          <p className="font-extrabold text-2xl">Description Of The Product</p>
          <div className="ml-10">
            <li>this is made out of cotton</li>
            <li>press it in low iron tempreture</li>
            <li>it leaves color on waash</li>
            <li>use low powder</li>
          </div>
        </div>

        {/* go back */}
        <div>
          <Link href={"/customer/products"} className="underline">
            {" "}
            &larr; &larr; Explore More Products
          </Link>
        </div>
      </div>

      {/* payment modal */}
    </>
  );
}
