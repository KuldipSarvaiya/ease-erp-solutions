import { NextResponse } from "next/server";
import { join } from "node:path";
import { cwd } from "node:process";
import { Buffer } from "node:buffer";
import { writeFile } from "node:fs";

export async function POST(request) {
  const data = await request.formData();

  console.log("api = ", data);
  // todo : need to upload product image
  // todo : add product_id
  // todo : create multiple product based on colors and sizes

  const arrBuf = await data.get("image").arrayBuffer();
  const buffer = new Buffer.from(arrBuf);

  const ulr = join(
    cwd(),
    "kuldip_upload",
    `${Date.now()}__${data.get("image").name}`
  );
  writeFile(ulr, buffer, () => {
    console.log("file saved");
  });

  return NextResponse.json({
    name: "this is testing error from server",
    tags: "this is testing error from server",
  });
}
