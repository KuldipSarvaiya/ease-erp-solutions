"use client";

import Loading from "@/components/Loading";
import { Button, ButtonGroup } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { BsCart2, BsCircleFill } from "react-icons/bs";
import { PiMinusBold, PiPlusBold } from "react-icons/pi";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page({ params: { id }, searchParams }) {
  const { data: session } = useSession({
    required: false,
  });
  const [units, setUnits] = useState(1);
  const [data, setData] = useState(false);
  // console.log(id, searchParams, data);

  if (!id && !searchParams?.size && !searchParams?.color) notFound();

  // fetch product details
  useEffect(() => {
    fetch(
      `/api/customer/product/${id}?size=${searchParams?.size}&color=${searchParams?.color}`
    )
      .then((res) => res.json())
      .then((d) => {
        // console.log(d);
        if (d.length > 0) setData(d?.[0]);
        else notFound();
      })
      .catch((e) => console.error(e));
  }, [searchParams?.size, searchParams?.color]);

  function placeOrder() {
    if (
      (!id && !searchParams?.size && !searchParams?.color) ||
      session?.user?.id
    )
      return;
  }

  return (
    <>
      {data === false ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="w-10/12 m-auto my-5 flex flex-col flex-nowrap gap-5">
          {/* hero section */}
          <div className="grid grid-cols-2 max-md:grid-cols-1 grid-rows-1  max-md:grid-rows-2">
            <Image
              src={"/kuldip_upload/" + data?.image}
              height={400}
              width={500}
              alt="Image Of Product"
              aria-label="image of product"
              aria-labelledby="product image"
              className="bg-slate-400 aspect-square object-contain rounded-2xl"
            />
            {/* side of image */}
            <div className="text-xl h-full flex flex-col flex-nowrap justify-around">
              <p className="row-start-1 row-end-2 text-4xl capitalize">
                <b>{data?.name} </b>
              </p>
              <p className="row-start-2 row-end-3">
                <b>
                  Discount :{" "}
                  <s>
                    &#8377;{" "}
                    {data?.discount - Math.abs(Math.floor(data?.discount / 2))}
                  </s>{" "}
                  &#8377; {data?.discount}
                </b>
              </p>
              <p className="row-start-3 row-end-4">
                <b>
                  Price : <s>&#8377; {data?.price}</s> &#8377;{" "}
                  {data?.price - data?.discount}{" "}
                </b>
              </p>
              <p className="row-start-4 row-end-5">
                <b>
                  This Product Is Available In Following Color And Size
                  Combinations :
                </b>
                <br />
                <span className="flex flex-row flex-wrap gap-5 w-full">
                  {data?.group_products?.map((item) => (
                    <Button
                      as={Link}
                      href={`/customer/products/${id}?size=${
                        item?.size
                      }&color=${item?.color.substr(1, 10)}`}
                      variant={
                        item?.color === "#" + searchParams?.color &&
                        item?.size === searchParams?.size
                          ? "faded"
                          : "light"
                      }
                      isDisabled={
                        item?.color === "#" + searchParams?.color &&
                        item?.size === searchParams?.size
                      }
                      onPress={placeOrder}
                    >
                      <BsCircleFill style={{ color: item?.color }} /> |{" "}
                      {item.size}
                    </Button>
                  ))}
                </span>
              </p>

              <p className="capitalize row-start-5 row-end-6">
                <b>Expiry Timing : {data?.expiry_timing}</b>
              </p>
              <p className="row-start-6 row-end-7">
                <b>Unit Of Measurement : {data?.unit_of_measurement} </b>
              </p>
              {data?.available_stock_units < 20 && (
                <p className="row-start-7 row-end-8 text-red-500">
                  <b>Hurry Up!! Only Few Stock Left...</b>
                </p>
              )}
              <div className="row-start-8 row-end-10">
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
                  isDisabled={units <= 0 || data?.available_stock_units <= 0}
                >
                  ORDER NOW
                </Button>
              </div>
            </div>
          </div>

          {/* chemical property */}
          <div className="w-full">
            <p className="font-extrabold text-2xl">
              Chemical Properties Of The Product
            </p>
            <div className="ml-10">
              {data?.chemical_property?.map((item) => (
                <li>{item}</li>
              ))}
            </div>
          </div>

          {/* description */}
          <div className="w-full">
            <p className="font-extrabold text-2xl">
              Description Of The Product
            </p>
            <div className="ml-10">
              {data?.description?.map((item) => (
                <li>{item}</li>
              ))}
            </div>
          </div>

          {/* go back */}
          <div>
            <Link href={"/customer/products"} className="underline">
              &larr; &larr; Explore More Products
            </Link>
          </div>
        </div>
      )}
      {/* payment modal */}
    </>
  );
}
