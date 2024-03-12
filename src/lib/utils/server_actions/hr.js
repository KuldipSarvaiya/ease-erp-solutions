"use server";

export async function declareHoliday(formdata) {
  console.log(formdata.get("date"));
  return "holiday is announced";
}

export async function announceEvent(formdata) {
  console.log("event");
  console.log(formdata.get("details").split("\n").length);
  return false;
}
