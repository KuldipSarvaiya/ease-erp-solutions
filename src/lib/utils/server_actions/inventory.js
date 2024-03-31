"use server";

// import { writeFile } from "node:fs";
// import { join } from "node:path";
// import { cwd } from "node:process";

export async function createCustomer(formdata) {
  console.log(formdata);

  const image = formdata.get("image");

  // todo : file upload to own backend server
  // const arrBuf = await image.arrayBuffer();
  // const buffer = new Buffer.from(arrBuf);

  // const ulr = join(cwd(), "kuldip_upload", `${Date.now()}__${image.name}`);
  // writeFile(ulr, buffer, () => {
  //   console.log("file saved");
  // });
  return { success: true };
}

export async function createSupplier(formdata) {
  console.log(formdata);

  const image = formdata.get("image");

  // todo : file upload to own backend server
  // const arrBuf = await image.arrayBuffer();
  // const buffer = new Buffer.from(arrBuf);

  // const ulr = join(cwd(), "kuldip_upload", `${Date.now()}__${image.name}`);
  // writeFile(ulr, buffer, () => {
  //   console.log("file saved");
  // });
  return { success: true };
}
