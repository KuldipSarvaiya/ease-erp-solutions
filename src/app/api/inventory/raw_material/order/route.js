import Expense from "@/lib/models/expense.model";
import RawMaterialOrder from "@/lib/models/raw_material_order.model";
import RawMaterialStock from "@/lib/models/raw_material_stock.model";
import RawMaterialStockHistory from "@/lib/models/raw_material_stock_history.model";
import Supplier from "@/lib/models/supplier.model";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server"; 

export async function GET() {
  await connectDB();

  const orders = await RawMaterialOrder.aggregate([
    {
      $lookup: {
        from: "rawmaterials",
        localField: "raw_material_id",
        foreignField: "_id",
        as: "raw_material_id",
      },
    },
    {
      $lookup: {
        from: "suppliers",
        localField: "supplier_id",
        foreignField: "_id",
        as: "supplier_id",
      },
    },
    {
      $unwind: {
        path: "$raw_material_id",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$supplier_id",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);

  return NextResponse.json(orders);
}

export async function POST(req) {
  const formdata = await req.formData();

  const raw_material_id = formdata.get("raw_material_id");
  const supplier_id = formdata.get("supplier_id");
  const bill_no = formdata.get("bill_no");
  const ordered_units = formdata.get("ordered_units");
  const order_ordered_date = formdata.get("order_ordered_date");
  const order_receive_date = formdata.get("order_receive_date");
  const payment_mode = formdata.get("payment_mode");
  const check_no = formdata.get("check_no");
  const transaction_no = formdata.get("transaction_no");
  const mrp_per_unit = formdata.get("mrp_per_unit");
  const total_discount = formdata.get("total_discount");
  const total_tax = formdata.get("total_tax");
  const delivery_charge = formdata.get("delivery_charge");
  const net_bill_amount = formdata.get("net_bill_amount");
  const updated_by = formdata.get("updated_by");
  const bill_image = formdata.get("bill_image");

  const res = await RawMaterialOrder.insertMany([
    {
      raw_material_id: raw_material_id,
      supplier_id: supplier_id,
      bill_no: bill_no?.toString()?.toUpperCase(),
      ordered_units: +ordered_units,
      order_ordered_date: order_ordered_date,
      order_receive_date: order_receive_date,
      payment_mode: payment_mode?.toString()?.toLowerCase(),
      check_no: check_no?.toString()?.toUpperCase() || "",
      transaction_no: transaction_no?.toString()?.toUpperCase() || "",
      mrp_per_unit: mrp_per_unit,
      total_discount: total_discount,
      total_tax: total_tax,
      delivery_charge: delivery_charge,
      net_bill_amount: net_bill_amount,
      bill_image: bill_image,
      updated_by: updated_by,
    },
  ]);
  // console.log("*****create Raw MAterial Order = ", res);

  const sup_update = await Supplier.updateOne(
    { _id: supplier_id },
    {
      $inc: { total_completed_orders: 1 },
      $set: {
        updated_by: updated_by,
      },
    }
  );
  // console.log("*****update suplliert total order = ", sup_update);

  const inc_stock = await RawMaterialStock.findOneAndUpdate(
    { raw_material_id: raw_material_id },
    {
      $inc: { available_units: +ordered_units },
      $set: { last_stock_changed_date: new Date(), updated_by: updated_by },
    }
  );
  // console.log("*****increase and find stock of raw material = ", inc_stock);

  const history = await RawMaterialStockHistory.insertMany([
    {
      raw_material_id: raw_material_id,
      stock_date: new Date(),
      units: ordered_units,
      change_type: "Increase",
      produced_by: inc_stock.produced_by,
      used_by: inc_stock.used_by,
      updated_by: updated_by,
    },
  ]);
  // console.log("*****create history or raw material = ", history);

  const expense = await Expense.insertMany([
    {
      type: "raw_material",
      raw_material_order_id: res[0]._id,
      date: new Date(),
      amount: net_bill_amount,
      description: "Order Of Raw Material",
      updated_by: updated_by,
    },
  ]);
  // console.log("*** expense of order = ", expense);

  return NextResponse.json({ success: true });
}
