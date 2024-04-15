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
      {/* <h1>Welcom to Ease ERP Solutions</h1>
      <Link href={"/customer"}>Go To Customer</Link> */}

      <div className="z-0 animate-pulse duration-1000 shadow-[300px_1px_500px_90px_#64748b] absolute rounded-full  w-60 h-0"></div>
      <div className="z-0 animate-pulse duration-1000 shadow-[10px_100px_300px_90px_#64748b] absolute top-[900px] right-20 rounded-full  w-0 h-0"></div>
      <section className=" snap-mandatory snap-start w-fit m-auto py-12 md:py-24 lg:py-32 bg-[#10151D] text-[#B2BECD]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-4 items-center justify-center text-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">
                Modernize your business with our ERP system
              </h1>
              <p className="max-w-[800px] m-auto md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The all-in-one platform to streamline your operations. From HR
                and inventory management to finance and beyond, our ERP system
                empowers your team to work smarter and more efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className=" snap-mandatory snap-start w-fit m-auto py-12 md:py-24 lg:py-32 bg-[#10151D] text-[#B2BECD]">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 xl:gap-24">
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Human Resources
                </h2>
                <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our HR module simplifies employee management. From onboarding
                  to performance reviews, everything you need to support your
                  team.
                </p>
              </div>
              <img
                alt="HR"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
                height="340"
                src="/images/hr_db.png"
                width="600"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Inventory Management
                </h2>
                <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Keep track of your stock in real-time. Our inventory
                  management system helps you avoid stockouts and optimize your
                  supply chain.
                </p>
              </div>
              <img
                alt="Inventory"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
                height="340"
                src="/images/inventory_db.png"
                width="600"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Finance
                </h2>
                <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Take control of your finances with our integrated accounting
                  software. From invoicing to financial reporting, we've got you
                  covered.
                </p>
              </div>
              <img
                alt="Finance"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
                height="340"
                src="/images/finance_db.png"
                width="600"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  General Departmets
                </h2>
                <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our ERP system comes with a powerful production department
                  control panel that allows you to handle diffrent department
                  activity as organization's unique needs.
                </p>
              </div>
              <img
                alt="Admin Control Panel"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
                height="340"
                src="/images/general_department_db.png"
                width="600"
              />
            </div>
          </div>
        </div>
      </section>
      <section className=" snap-mandatory snap-start w-fit m-auto py-12 md:py-24 lg:py-32 bg-[#10151D] text-[#B2BECD] relative">
        <div className="z-[100] animate-pulse duration-1000 shadow-[10px_100px_500px_60px_#64748b] absolute top-[500px] left-72 rounded-full  w-0 h-72"></div>
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                Payroll Management
              </h1>
              <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our ERP system automates the payroll process, saving you time
                and reducing the risk of errors. Employees can access their
                paystubs and tax forms through the self-service portal.
              </p>
            </div>
            <div className="grid gap-4 md:gap-8 items-start">
              <img
                alt="Employee Dashboard"
                className="aspect-video overflow-hidden rounded-xl object-fill object-center"
                height="360"
                src="/images/payroll_1.png"
                width="640"
              />
              <img
                alt="Attendance Management"
                className="aspect-video overflow-hidden rounded-xl object-fill object-center"
                height="360"
                src="/images/payroll_2.png"
                width="640"
              />
            </div>
          </div>
        </div>
      </section>
      <section className=" snap-mandatory snap-start w-fit m-auto py-12 md:py-24 lg:py-32 bg-[#10151D] text-[#B2BECD] relative">
        <div className="z-0 animate-pulse duration-1000 shadow-[10px_100px_500px_60px_#64748b] absolute top-[550px] right-60 rounded-full  w-0 h-72"></div>
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="grid gap-4 md:gap-8 items-start">
              <img
                alt="Employee Dashboard"
                className="aspect-video overflow-hidden rounded-xl object-fill object-center"
                height="360"
                src="/images/employee_db_1.png"
                width="640"
              />
              <img
                alt="Attendance Management"
                className="aspect-video overflow-hidden rounded-xl object-fill object-center"
                height="360"
                src="/images/employee_db_2.png"
                width="640"
              />
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                Employee Dashboard
              </h2>
              <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our ERP system provides employees with a centralized dashboard
                where they can access company announcements, submit time-off
                requests, and collaborate with their colleagues.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className=" snap-mandatory snap-start w-fit m-auto py-12 md:py-24 lg:py-32 bg-[#10151D] text-[#B2BECD]">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                Attendance Management
              </h2>
              <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our ERP system includes an attendance management module that
                allows employees to clock in and out using their mobile devices.
                Managers can easily track attendance and approve time-off
                requests.
              </p>
            </div>
            <div className="grid gap-4 md:gap-8 items-start">
              <img
                alt="Attendance Management"
                className="aspect-video overflow-hidden rounded-xl object-fill object-center"
                height="360"
                src="/images/attendance_1.png"
                width="640"
              />
              <img
                alt="Task Assignment"
                className="aspect-video overflow-hidden rounded-xl object-fill object-center"
                height="360"
                src="/images/attendance_2.png"
                width="640"
              />
            </div>
          </div>
        </div>
      </section>
      <section className=" snap-mandatory snap-start w-fit m-auto py-12 md:py-24 lg:py-32 bg-[#10151D] text-[#B2BECD]">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="grid gap-4 md:gap-8 items-start">
              <img
                alt="Task Assignment"
                className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                height="360"
                src="/images/task_1.png"
                width="640"
              />
              <img
                alt="Inventory Management"
                className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                height="360"
                src="/images/task_2.png"
                width="640"
              />
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                Task Assignment
              </h2>
              <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our ERP system includes a task management module that allows
                managers to assign tasks to employees, set deadlines, and track
                progress. Employees can view their tasks and update their
                status.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className=" snap-mandatory snap-start w-fit m-auto py-12 md:py-24 lg:py-32 bg-[#10151D] text-[#B2BECD] relative">
        <div className="z-0 animate-pulse duration-1000 shadow-[10px_100px_400px_100px_#64748b] absolute top-[10px] left-10 rounded-full  w-0 h-40"></div>
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                Inventory Management
              </h2>
              <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our ERP system includes an inventory management module that
                allows you to track your stock levels, manage purchase orders,
                and fulfill customer orders. You can view real-time inventory
                data and set up automatic reordering.
              </p>
            </div>
            <div className="grid gap-4 md:gap-8 items-start">
              <img
                alt="Inventory Management"
                className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                height="360"
                src="/images/inventory_1.png"
                width="640"
              />
              <img
                alt="Order Tracking"
                className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                height="360"
                src="/images/inventory_2.png"
                width="640"
              />
            </div>
          </div>
        </div>
      </section>
      <section className=" snap-mandatory snap-start w-fit m-auto py-12 md:py-24 lg:py-32 bg-[#10151D] text-[#B2BECD]">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="grid gap-4 md:gap-8 items-start">
              <img
                alt="Financial Management"
                className="aspect-video overflow-hidden rounded-xl object-fill object-center"
                height="360"
                src="/images/order.png"
                width="640"
              />
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                Order Tracking
              </h2>
              <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our ERP system includes an order tracking module that allows you
                to monitor the status of customer orders from the moment they
                are placed to the moment they are delivered. You can view order
                details, track shipments, and provide customers with real-time
                updates.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className=" snap-mandatory snap-start w-fit m-auto py-12 md:py-24 lg:py-32 bg-[#10151D] text-[#B2BECD]">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                CRM (Customer Relationship Management)
              </h2>
              <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our ERP system includes a CRM module that allows you to manage
                your customer relationships more effectively. You can store
                customer information, track interactions, and analyze customer
                data to improve your marketing and sales efforts.
              </p>
            </div>
            <div className="grid gap-4 md:gap-8 items-start">
              <img
                alt="CRM"
                className="aspect-video overflow-hidden rounded-xl object-fill object-center"
                height="360"
                src="/images/crm_1.png"
                width="640"
              />
              <img
                alt="Financial Management"
                className="aspect-video overflow-hidden rounded-xl object-fill object-center"
                height="360"
                src="/images/crm_2.png"
                width="640"
              />
            </div>
          </div>
        </div>
      </section>
      <section className=" snap-mandatory snap-start w-fit m-auto py-12 md:py-24 lg:py-32 bg-[#10151D] text-[#B2BECD]">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="grid gap-4 md:gap-8 items-start">
              <img
                alt="Order Tracking"
                className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                height="360"
                src="/images/finance_1.png"
                width="640"
              />
              <img
                alt="CRM"
                className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                height="360"
                src="/images/finance_2.png"
                width="640"
              />
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                Financial Management
              </h2>
              <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our ERP system includes a financial management module that
                allows you to manage your company's finances more effectively.
                You can track income and expenses, generate financial reports,
                and ensure compliance with accounting standards.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className=" snap-mandatory snap-start w-fit m-auto py-12 md:py-24 lg:py-32 bg-[#10151D] text-[#B2BECD] relative">
        <div className="z-0 animate-pulse duration-1000 shadow-[10px_100px_300px_90px_#64748b] absolute -top-[200px] right-32 rounded-full  w-0 h-0"></div>
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Experience the power of our ERP system
              </h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Ready to take your business to the next level? Contact us to
                learn more about how our ERP system can help you streamline your
                operations, improve productivity, and drive growth.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-[400px] grid-cols-2 gap-10 grid min-[400px]:flex-row justify-center">
            <Link
              className="inline-flex h-10 items-center justify-center text-slate-600 rounded-md border border-gray-200  bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 animate-bounce"
              href="/api/auth/signin?callback_url=/"
            >
              Sign Into ERP &rarr;
            </Link>
            <Link
              className="inline-flex h-10 items-center justify-center text-slate-600 rounded-md border border-gray-200  bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 animate-bounce"
              href="/customer"
            >
              Are&nbsp;You&nbsp;Customer?
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

// === styles.css ===

// :root {
//   --radius: 0.5rem;
// }

// body {
//   font-family: var(--font-dm_sans), sans-serif;
// }

// h1, h2, h3, h4, h5, h6 {
//   font-family: var(--font-archivo), sans-serif;
// }

// === layout.jsx ===

// // This is the root layout component for your Next.js app.
// // Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required

// import { Archivo } from 'next/font/google'
// import { DM_Sans } from 'next/font/google'
// import './styles.css'

// const archivo = Archivo({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-archivo',
// })
// const dm_sans = DM_Sans({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-dm_sans',
// })

// export default function Layout({ children }) {
//   return (
//     <html lang="en">
//       <body className={archivo.variable + dm_sans.variable}>
//         {children}
//       </body>
//     </html>
//   )
// }
