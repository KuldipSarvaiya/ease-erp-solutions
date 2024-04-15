"use server";

import Customer from "@/lib/models/customer.model";
import Supplier from "@/lib/models/supplier.model";
import connectDB from "@/lib/mongoose";

import { writeFile } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";

export async function createCustomer(formdata) {
  console.log(formdata);

  const name = formdata.get("name");
  const updated_by = formdata.get("updated_by");
  const email = formdata.get("email");
  const contact_no = formdata.get("contact_no");
  const address = formdata.get("address");
  const latitude = formdata.get("latitude");
  const longitude = formdata.get("longitude");
  const image = formdata.get("image");
  const image_name = `${Date.now()}__${image.name}`.replaceAll(" ", "-");

  const arrBuf = await image.arrayBuffer();
  const buffer = new Buffer.from(arrBuf);

  const ulr = join(cwd(), "public", "kuldip_upload", image_name);
  writeFile(ulr, buffer, () => {
    console.log("file saved");
  });

  await connectDB();
  const res = await Customer.insertMany([
    {
      name: name,
      image: image_name,
      email: email,
      contact_no: contact_no,
      address: address,
      address_coordinates: {
        latitude: latitude,
        longitude: longitude,
      },
      updated_by: updated_by,
    },
  ]);

  console.log(res);

  return { success: true };
}

export async function createSupplier(formdata) {
  console.log(formdata);

  const name = formdata.get("name");
  const updated_by = formdata.get("updated_by");
  const email = formdata.get("email");
  const contact_no = formdata.get("contact_no");
  const address = formdata.get("address");
  const supplied_material_id = formdata.get("supplied_material_id").split(",");
  const image = formdata.get("image");
  const image_name = `${Date.now()}__${image.name}`.replaceAll(" ", "-");

  const arrBuf = await image.arrayBuffer();
  const buffer = new Buffer.from(arrBuf);

  const ulr = join(cwd(), "public", "kuldip_upload", image_name);
  writeFile(ulr, buffer, () => {
    console.log("file saved");
  });

  await connectDB();
  const newSupplier = await Supplier.insertMany([
    {
      image: image_name,
      supplied_material_id: supplied_material_id,
      name: name,
      email: email,
      contact_no: contact_no,
      address: address,
      updated_by: updated_by,
    },
  ]);

  console.log("new Supplier = ", newSupplier);

  return { success: true };
}
