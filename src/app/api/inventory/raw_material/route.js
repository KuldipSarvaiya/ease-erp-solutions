import RawMaterial from "@/lib/models/raw_material.model";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { join } from "node:path";
import { cwd } from "node:process";
import { Buffer } from "node:buffer";
import { writeFile } from "node:fs";
// import RawMaterialStockHistory from "@/lib/models/raw_material_stock_history.model";
import connectDB from "@/lib/mongoose";
import RawMaterialStock from "@/lib/models/raw_material_stock.model";

export async function POST(request) {
  const data = await request.formData();

  // console.log("api = ", data);

  const image_name = `${Date.now()}__${data.get("image").name}`.replaceAll(
    " ",
    "-"
  );
  const arrBuf = await data.get("image").arrayBuffer();
  const buffer = new Buffer.from(arrBuf);

  const ulr = join(cwd(), "public", "kuldip_upload", image_name);
  writeFile(ulr, buffer, () => {
    // console.log("file saved");
  });

  const colors = data.getAll("color")?.[0]?.split(",") || "";
  const sizes = data.getAll("size")?.[0]?.split(",") || "";
  const description = data.get("description")?.split(";");
  const chemical_property = data.get("chemical_property")?.split(";");
  let produced_by = data.getAll("produced_by")?.[0]?.split(",");
  const used_by = data.getAll("used_by")?.[0]?.split(",");
  if (produced_by[0] === "") produced_by = undefined;

  // console.log(
   // colors,
   // sizes,
  //  description,
   // chemical_property,
  //  produced_by,
  //  used_by
  //);
  const raw_material = [];
  for (let color of colors) {
    // console.log("\n********* color = ", color);
    for (let size of sizes) {
      // console.log("\n********* size = ", size);
      raw_material.push({
        name: data.get("name"),
        raw_material_group_id: data.get("raw_material_group_id"),
        description: description,
        color: color,
        size: size.replaceAll(" ", ""),
        chemical_property: chemical_property,
        image: image_name,
        unit_of_measurement: data.get("unit_of_measurement"),
        usage_process_level: +data.get("usage_process_level"),
        produced_by: produced_by,
        used_by: used_by,
        updated_by: data.get("updated_by"),
      });
    }
  }
  // console.log(raw_material);

  await connectDB();

  const material = await RawMaterial.insertMany(raw_material);

  // const material_history = [];
  const material_stock = [];
  for (let item of material) {
    // material_history.push({
    //   raw_material_id: item?._id,
    //   stock_produced_date: new Date(),
    //   units: 0,
    //   change_type: "",
    //   updated_by: data.get("updated_by"),
    //   produced_by: data.getAll("produced_by")?.split(","),
    //   used_by: data.getAll("used_by")?.split(","),
    // });
    material_stock.push({
      raw_material_id: item?._id,
      last_stock_changed_date: new Date(),
      available_units: 0,
      updated_by: data.get("updated_by"),
      produced_by: produced_by,
      used_by: used_by,
    });
  }

  const stock = await RawMaterialStock.insertMany(material_stock);
  // const history = await RawMaterialStockHistory.insertMany(material_history);

  // console.log(material, stock);
  revalidatePath("/managers/inventory/raaw_material");
  return NextResponse.json({ success: true });
}

export async function PUT(request) {
  const data = await request.formData();

  // console.log("raw material put = ", data);

  const img_obj = {};
  if (data.get("image").name) {
    img_obj.image = `${Date.now()}__${data.get("image").name}`.replaceAll(
      " ",
      "-"
    );
    const arrBuf = await data.get("image").arrayBuffer();
    const buffer = new Buffer.from(arrBuf);

    const ulr = join(cwd(), "public", "kuldip_upload", img_obj.image);
    writeFile(ulr, buffer, () => {
      // console.log("file saved");
    });
  }

  const description = data.get("description")?.split(";");
  const chemical_property = data.get("chemical_property")?.split(";");
  const color = data.get("color") || "";
  const size = data.get("size") || "";
  let produced_by = data.getAll("produced_by")?.[0]?.split(",");
  const used_by = data.getAll("used_by")?.[0]?.split(",");
  if (produced_by[0] === "") produced_by = [];

  // console.log(color);
  await connectDB();

  const res = await RawMaterial.updateOne(
    {
      _id: data.get("_id"),
    },
    {
      $set: {
        ...img_obj,
        name: data.get("name"),
        raw_material_group_id: data.get("raw_material_group_id"),
        description: description,
        color: color,
        size: size.replaceAll(" ", ""),
        chemical_property: chemical_property,
        unit_of_measurement: data.get("unit_of_measurement"),
        usage_process_level: +data.get("usage_process_level"),
        produced_by: produced_by,
        used_by: used_by,
        updated_by: data.get("updated_by"),
      },
    }
  );

  // console.log(res);

  return NextResponse.json({
    success: true,
  });
}

export async function GET(req) {
  await connectDB();
  const res = await RawMaterial.aggregate([
    {
      $match: {
        produced_by: {
          $exists: true,
          $eq: [],
        },
      },
    },
  ]);
  return NextResponse.json(res);
}
