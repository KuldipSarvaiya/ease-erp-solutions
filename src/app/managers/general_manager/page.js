import Image from "next/image";

export default function GenManagerPage() {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h1 className="font-extrabold">Welcome :{")"}</h1>
      <h1 className="font-light">What to do next.. 🎯</h1>
      <Image
        src={"/GeneralManagerPage.svg"}
        width={400}
        height={400}
        alt="Finance Landing Page"
      />
    </div>
  );
}
