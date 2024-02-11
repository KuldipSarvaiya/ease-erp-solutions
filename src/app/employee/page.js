import Image from "next/image"; 

export default function EmployeePage() {
  return (
    <>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-extrabold">Welcome :{")"}</h1>
        <h1 className="font-light">Good to see You 🤩</h1>
        <Image
          src={"/EmployeePage.svg"}
          width={400}
          height={400}
          alt="Employee Landing Page"
        />
        {/* <Link href="/employee/profile">Go To PROFILE &rarr;</Link> */}
      </div>
    </>
  );
}
