import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Welcom to Ease ERP Solutions</h1>
      <Link href={'/customer'}>Go To Customer</Link>
    </>
  );
}
