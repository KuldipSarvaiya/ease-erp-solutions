import Image from "next/image";

export default function InventoryPage() {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h1 className="font-extrabold">Welcome :{")"}</h1>
      <h1 className="font-light">Find the missing part.. 🧮📦</h1>
      <Image
        src={"/InventoryPage.svg"}
        width={400}
        height={400}
        alt="Finance Landing Page"
      />
    </div>
  );
}
