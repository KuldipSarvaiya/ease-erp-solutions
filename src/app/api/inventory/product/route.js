import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Product from "@/lib/models/product.model";
import { revalidatePath } from "next/cache";
import ProductStockHistory from "@/lib/models/product_stock_history.model";

export async function POST(request) {
  const data = await request.formData();

  // console.log("api = ", data);

  const colors = data.getAll("color")[0].split(",");
  const sizes = data.getAll("size")[0].split(",");
  const description = data.get("description").split(";");
  const chemical_property = data.get("chemical_property").split(";");
  const tags = data.getAll("tags")[0].split(",");

  // // console.log(colors, sizes, description, chemical_property, tags);
  const products = [];
  for (let color of colors)
    for (let size of sizes) {
      products.push({
        product_group_id: data.get("product_group_id"),
        name: data.get("name"),
        image: data.get("image"),
        description: description,
        chemical_property: chemical_property,
        color: color,
        size: size.replaceAll(" ", ""),
        unit_of_measurement: data.get("unit_of_measurement"),
        expiry_timing: data.get("expiry_timing") || "",
        available_stock_units: +data.get("available_stock_units"),
        price: +data.get("price"),
        discount: +data.get("discount"),
        tags: tags,
        updated_by: data.get("updated_by"),
        produced_by: data.getAll("produced_by")[0].split(","),
      });
    }

  await connectDB();

  const prod = await Product.insertMany(products);

  const product_history = [];
  for (let item of prod)
    product_history.push({
      product_id: item._id,
      product_group_id: item.product_group_id,
      units: item.available_stock_units,
      change_type: "Increase",
      updated_by: data.get("updated_by"),
      produced_by: data.getAll("produced_by")[0].split(","),
    });

  const history = await ProductStockHistory.insertMany(product_history);

  // console.log(prod, history);
  revalidatePath("/managers/inventory/product");
  return NextResponse.json({ success: true });
}

// edit product
export async function PUT(request) {
  const data = await request.formData();

  // console.log("product put = ", data);

  const description = data.get("description").split(";");
  const chemical_property = data.get("chemical_property").split(";");
  const tags = data.getAll("tags")[0].split(",");

  await connectDB();

  const res = await Product.updateOne(
    { _id: data.get("_id") },
    {
      $set: {
        image: data.get("image"),
        name: data.get("name"),
        description: description,
        chemical_property: chemical_property,
        color: data.get("color"),
        size: data.get("size"),
        unit_of_measurement: data.get("unit_of_measurement"),
        expiry_timing: data.get("expiry_timing") || "",
        price: +data.get("price"),
        discount: +data.get("discount"),
        tags: tags,
        updated_by: data.get("updated_by"),
        produced_by: data.getAll("produced_by")[0].split(","),
      },
    }
  );
  // // console.log(res, {
  //   _id: data.get("_id"),
  //   ...img_obj,
  //   name: data.get("name"),
  //   description: description,
  //   chemical_property: chemical_property,
  //   color: data.get("color"),
  //   size: data.get("size"),
  //   unit_of_measurement: data.get("unit_of_measurement"),
  //   expiry_timing: data.get("expiry_timing") || "",
  //   price: +data.get("price"),
  //   discount: +data.get("discount"),
  //   tags: tags,
  //   updated_by: data.get("updated_by"),
  //   produced_by: data.getAll("produced_by")[0].split(","),
  // });
  revalidatePath("/managers/inventory/product");
  return NextResponse.json({ success: true });
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const department = searchParams.get("department");

  const matchQry = {};
  if (department !== "all") matchQry.produced_by = { $in: [department] };

  await connectDB();

  const res = await Product.aggregate([
    {
      $match: matchQry,
    },
  ]);

  // console.log("product for this department = ", department, " =  ", res);

  return NextResponse.json(res);
}
