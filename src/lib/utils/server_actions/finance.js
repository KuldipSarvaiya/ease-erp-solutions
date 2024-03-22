"use server"

export async function payroll(formdata){
  console.log(formdata.getAll("selected_employees"))
}