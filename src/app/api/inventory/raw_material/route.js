import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
// import { join } from "node:path";
// import { cwd } from "node:process";
// import { Buffer } from "node:buffer";
// import { writeFile } from "node:fs";

export async function POST(request) {
  const data = await request.formData();

  console.log("api = ", data);
  // todo : need to upload raw naterial image
  // todo : add raw_material_group_id
  // todo : create multiple raw naterial based on colors and sizes

  // const arrBuf = await data.get("image").arrayBuffer();
  // const buffer = new Buffer.from(arrBuf);

  // const ulr = join(
  //   cwd(),
  //   "kuldip_upload",
  //   `${Date.now()}__${data.get("image").name}`
  // );
  // writeFile(ulr, buffer, () => {
  //   console.log("file saved");
  // });
  revalidateTag("raw_materials");

  // return NextResponse.json({ success: true });
  return NextResponse.json({
    name: "this is testing error from server", 
  });
}

export async function PUT(request) {
  const data = await request.formData();

  console.log("raw naterial put = ", data);
  // todo : need to upload raw naterial image
  // todo : add raw_material_group_id
  // todo : create multiple raw naterial based on colors and sizes

  if (!!data.get("image")) return NextResponse.json({ success: true });

  // const arrBuf = await data.get("image").arrayBuffer();
  // const buffer = new Buffer.from(arrBuf);

  // const ulr = join(
  //   cwd(),
  //   "kuldip_upload",
  //   `${Date.now()}__${data.get("image").name}`
  // );
  // writeFile(ulr, buffer, () => {
  //   console.log("file saved");
  // });
  revalidateTag("one_raw_material");

  return NextResponse.json({
    name: "this is testing error from server", 
  });
}
