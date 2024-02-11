import Image from "next/image";

export default function HrPage() {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h1 className="font-extrabold">Welcome :{")"}</h1>
      <h1 className="font-light">Make them feel comfort.&nbsp;😊</h1>
      <Image
        src={"/HrPage.svg"}
        width={400}
        height={400}
        alt="Finance Landing Page"
      />
    </div>
  );
}
