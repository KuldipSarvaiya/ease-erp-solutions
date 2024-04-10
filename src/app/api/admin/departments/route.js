import Department from "@/lib/models/department.model.js";
import connectDB from "@/lib/mongoose";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  const formdata = await request.formData();
  try {
    await connectDB();

    const dept = new Department({
      dept_name: formdata.get("dept_name").toLowerCase().replaceAll(" ", "-"),
      // used_material_id: formdata.getAll("used_material_id")[0].split(","),
      // produced_material_id: formdata.getAll("produced_material_id")[0].split(","),
      // produced_product_id: formdata.getAll("produced_product_id")[0].split(","),
      production_process_level: +formdata.get("production_process_level"),
      raw_material_used_level: +formdata.get("raw_material_used_level"),
      produced_material_level: +formdata.get("produced_material_level"),
      updated_by: formdata.get("updated_by"),
    });
    const res = await dept.save();

    console.log(res);
    revalidatePath("/admin/departments")
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.error({ error: error, success: false });
  }
}

export async function PUT(request) {
  const formdata = await request.formData();
  try {
    await connectDB();

    const dept = await Department.updateOne(
      { _id: formdata.get("department_id") },
      {
        $set: {
          dept_name: formdata
            .get("dept_name")
            .toLowerCase()
            .replaceAll(" ", "-"),
          // used_material_id: formdata.getAll("used_material_id")[0].split(","),
          // produced_material_id: formdata.getAll("produced_material_id")[0].split(","),
          // produced_product_id: formdata.getAll("produced_product_id")[0].split(","),
          production_process_level: +formdata.get("production_process_level"),
          raw_material_used_level: +formdata.get("raw_material_used_level"),
          produced_material_level: +formdata.get("produced_material_level"),
          updated_by: formdata.get("updated_by"),
        },
      }
    );

    console.log(dept);
    revalidatePath("/admin/departments")
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.error({ error: error, success: false });
  }
}
