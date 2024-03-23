import { createProduct } from "@/lib/utils/server_actions/inventory";

export async function POST(req) {
  console.log(req);
  const res = await createProduct(req.body);
  return new Response(res);
}
