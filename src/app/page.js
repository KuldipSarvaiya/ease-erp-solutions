import { getServerSession } from "next-auth";
import Link from "next/link";
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(options);

  if (session) {
    if (session?.user?.designation === "Employee") redirect("/employee");

    if (session?.user?.designation === "Manager")
      redirect(
        `/managers/${getDepartmentPath(
          session?.user?.department_id?.dept_name
        )}`
      );
  }

  function getDepartmentPath(department) {
    switch (department) {
      case "hr":
        return "hr";
      case "finance":
        return "finance";
      case "inventory":
        return "inventory";
      default:
        return "general_manager";
    }
  }
  return (
    <>
      <h1>Welcom to Ease ERP Solutions</h1>
      <Link href={"/customer"}>Go To Customer</Link>
    </>
  );
}
