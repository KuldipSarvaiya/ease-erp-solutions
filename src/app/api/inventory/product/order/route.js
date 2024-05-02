import CustomerOrder from "@/lib/models/customer_order.model";
import Income from "@/lib/models/income.model";
import ProductStockHistory from "@/lib/models/product_stock_history.model";
import connectDB from "@/lib/mongoose";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function PATCH(req) {
  const data = await req.json();
  console.log(data);

  const rzp = new Razorpay({
    key_id: process.env.RZP_KEY,
    key_secret: process.env.RZP_SECRET,
  });

  const options = {
    amount: data.net_total * 100,
    currency: "INR",
    receipt: data.customer_id,
  };

  // rzp.orders.create(options, function (err, order) {
  //   console.log(err || order);
  //   if (err) return NextResponse.error({ success: false }, { status: 500 });
  //   return NextResponse.json({ success: true, order: order });
  // });

  const createOrder = (options) => {
    return new Promise((resolve, reject) => {
      rzp.orders.create(options, (err, order) => {
        if (err) {
          reject(err);
        } else {
          resolve(order);
        }
      });
    });
  };

  try {
    const order = await createOrder(options);
    return NextResponse.json({ success: true, order }, { status: 200 });
  } catch (err) {
    return NextResponse.error(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const data = await req.json();

  await connectDB();
  const res = await CustomerOrder.insertMany([
    { ...data, product_group_id: undefined, produced_by: undefined },
  ]);
  console.log(res);

  const income = await Income.insertMany([
    {
      customer_order_id: res[0]._id,
      type: "sells",
      date: new Date(),
      amount: data.net_total,
      description: "Order Placed By Customer",
    },
  ]);
  console.log(income);

  const history = await ProductStockHistory.insertMany([
    {
      product_id: data.product,
      product_group_id: data.product_group_id,
      units: data.units,
      change_type: "Decrease",
      produced_by: data.produced_by,
    },
  ]);
  console.log(history);

  revalidatePath("/managers/inventory/orders");
  return NextResponse.json({ success: true });
}

export async function GET(req) {
  const customer_id = new URL(req.url).searchParams.get("customer_id");

  const qry = {};
  if (customer_id) qry.customer_id = new mongoose.Types.ObjectId(customer_id);

  await connectDB();

  const res = await CustomerOrder.aggregate([
    { $match: qry },
    {
      $lookup: {
        from: "customers",
        localField: "customer_id",
        foreignField: "_id",
        as: "customer",
      },
    },
    {
      $unwind: "$customer",
    },
    {
      $lookup: {
        from: "products",
        localField: "product",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: "$product",
    },
  ]);

  return NextResponse.json(res);
}

export async function PUT(req) {
  const data = await req.json();

  await connectDB();

  if (data.order_state === "canceled") {
    const rzp = new Razorpay({
      key_id: process.env.RZP_KEY,
      key_secret: process.env.RZP_SECRET,
    });

    const refundOrder = () => {
      return new Promise((resolve, reject) => {
        rzp.payments.refund(data.razorpay_payment_id, (err, order) => {
          if (err) {
            reject(err);
          } else {
            resolve(order);
          }
        });
      });
    };

    try {
      const refund = await refundOrder();

      const res = await CustomerOrder.updateOne(
        { _id: new mongoose.Types.ObjectId(data._id) },
        { $set: { order_state: data.order_state } }
      );
      console.log(res);
    } catch (e) {
      return NextResponse.error({ success: false }, { status: 500 });
    }
  } else {
    const res = await CustomerOrder.updateOne(
      { _id: new mongoose.Types.ObjectId(data._id) },
      { $set: { order_state: data.order_state } }
    );
    console.log(res);

    if (res.acknowledged)
      return NextResponse.json({ success: true }, { status: 200 });
    return NextResponse.error({ success: false }, { status: 500 });
  }
}

export async function DELETE(req) {
  const payment_id = new URL(req.url).searchParams.get("payment_id");

  const rzp = new Razorpay({
    key_id: process.env.RZP_KEY,
    key_secret: process.env.RZP_SECRET,
  });

  const refundOrder = () => {
    return new Promise((resolve, reject) => {
      rzp.payments.refund(payment_id, (err, order) => {
        if (err) {
          reject(err);
        } else {
          resolve(order);
        }
      });
    });
  };

  try {
    const order = await refundOrder();
    console.log(order);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
