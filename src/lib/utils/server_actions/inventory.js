"use server";

// ! can not call this action make api route for this
export async function createProduct(data) {
  console.log("server action = ", data);
  // todo : need to upload product image
  // todo : add product_id
  // todo : create multiple product based on colors and sizes
  return {
    name: "this is testing error from server",
    tags: "this is testing error from server",
  };
}
