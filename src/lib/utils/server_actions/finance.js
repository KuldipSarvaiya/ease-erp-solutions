"use server";

import Expense from "@/lib/models/expense.model";
import Income from "@/lib/models/income.model";
import Revenue from "@/lib/models/revenue.model";
import connectDB from "@/lib/mongoose";
import { revalidatePath } from "next/cache";

export async function createIncome(data) {
  try {
    await connectDB();

    const income = await Income.insertMany([data]);

    // console.log(income);
    revalidatePath("/managers/finance/incomes");
    return { success: true };
  } catch (error) {
    // console.log(error);
    return { success: false };
  }
}

export async function getIncomes(x) {
  try {
    await connectDB();

    const incomes = await Income.find({}).select(
      "amount description type customer_order_id date"
    );

    return incomes;
  } catch (error) {
    return false;
  }
}

export async function createExpense(data) {
  try {
    await connectDB();

    const expense = await Expense.insertMany([data]);

    // console.log(expense);
    revalidatePath("/managers/finance/expenses");
    return { success: true };
  } catch (error) {
    // console.log(error);
    return { success: false };
  }
}

export async function getExpenses(x) {
  try {
    await connectDB();

    const expense = await Expense.find({}).select(
      "amount description type raw_material_order_id salary_id date"
    );

    return expense;
  } catch (error) {
    return false;
  }
}

export async function createRevenue(data) {
  try {
    await connectDB();

    const incomes = await Income.find({
      $and: [
        { date: { $gte: new Date(data.revenue_from_date) } },
        { date: { $lte: new Date(data.revenue_to_date) } },
      ],
    }).select("_id amount");

    const expenses = await Expense.find({
      $and: [
        { date: { $gte: new Date(data.revenue_from_date) } },
        { date: { $lte: new Date(data.revenue_to_date) } },
      ],
    }).select("_id amount");

    // calculations
    const income_ids = [];
    let total_income = 0;
    for (let inc of incomes) {
      income_ids.push(inc._id);
      total_income += inc.amount;
    }
    const expense_ids = [];
    let total_expense = 0;
    for (let exp of expenses) {
      expense_ids.push(exp._id);
      total_expense += exp.amount;
    }

    const revenue = await Revenue.insertMany([
      {
        ...data,
        income_id: income_ids,
        expense_id: expense_ids,
        total_income,
        total_expense,
        net_revenue: total_income - total_expense - data.total_tax,
      },
    ]);

    // console.log(revenue);
    revalidatePath("/managers/finance/revenue");
    return { success: true };
  } catch (error) {
    // console.log(error);
    return { success: false };
  }
}

export async function getRevenues(x) {
  try {
    await connectDB();

    const revenue = await Revenue.find({}).select(
      "total_income total_expense total_tax net_revenue title type income_id expense_id revenue_from_date revenue_to_date"
    );

    return revenue;
  } catch (error) {
    return false;
  }
}
