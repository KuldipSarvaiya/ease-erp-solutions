"use client";

import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { BsSearch } from "react-icons/bs";
import ProductSellCard from "@/components/cards/ProductSellCard";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (products.length <= 0)
      fetch("/api/customer/product", { method: "GET" })
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((e) => console.log(e));
  });

  async function searchProduct(e) {
    e.preventDefault();
    const search_string = new FormData(e.target).get("search_string");
    alert(search_string);
  }
  function sortProduct(e) {
    const { value } = e.target;
    // console.log(value);
  }

  return (
    <div className="w-10/12 m-auto my-5">
      {/* top search and filter line */}
      <div className="w-full flex flex-row flex-wrap justify-between gap-y-1">
        <form onSubmit={searchProduct}>
          <Input
            variant="faded"
            color="secondary"
            size="sm"
            name="search_string"
            type="search"
            placeholder="Search Products Here... "
            title="Search Products Here... "
            aria-label="search product"
            aria-labelledby="search product"
            className="w-80"
            endContent={
              <Button
                isIconOnly
                color="secondary"
                variant="light"
                type="submit"
                title="Search Product"
              >
                <BsSearch />
              </Button>
            }
          />
        </form>
        <span className="flex w-80 text-base">
          <Select
            variant="faded"
            size="sm"
            color="secondary"
            startContent={<b>Sort&nbsp;Product&nbsp;By&nbsp;:&nbsp;</b>}
            aria-label="Sort Product By :"
            aria-labelledby="Sort Product By :"
            defaultSelectedKeys={"0"}
            onChange={sortProduct}
            className="w-80"
          >
            <SelectItem key={"0"} value={"0"}>
              NONE
            </SelectItem>
            <SelectItem key={"1"} value={"1"}>
              Price : High To Low
            </SelectItem>
            <SelectItem key={"-1"} value={"-1"}>
              Price : Low To High
            </SelectItem>
          </Select>
        </span>
      </div>

      {/* products container */}
      {products.length <= 0 ? (
        <Loading />
      ) : (
        <div className="w-full my-10 max-lg:mx-10 max-md:mx-5 max-sm:mx-1 grid manager_inventory_product_stock place-items-center gap-y-7">
          {products?.map((item) => (
            <ProductSellCard product={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
