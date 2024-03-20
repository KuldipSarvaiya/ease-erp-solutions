"use server";

// import { writeFile } from "node:fs";
// import { join } from "node:path";
// import { cwd } from "node:process";

export async function declareHoliday(formdata) {
  console.log(formdata.get("date"));
  return "holiday is announced";
}

export async function announceEvent(formdata) {
  console.log("event");
  console.log(formdata.get("details").split("\n").length);
  return false;
}

export async function newEmployee(formdata) {
  console.log("new employee");
  const image = formdata.get("image");
  const dept = formdata.get("department_id");
  console.log(image, typeof dept);

  // **********file upload to own backend server
  // const arrBuf = await image.arrayBuffer();
  // const buffer = new Buffer.from(arrBuf);

  // const ulr = join(cwd(), "kuldip_upload", `${Date.now()}__${image.name}`);
  // writeFile(ulr, buffer, () => {
  //   console.log("file saved");
  // });

  return true;
}
