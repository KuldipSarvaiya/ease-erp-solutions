import { Divider } from "@nextui-org/react";

export default function Page() {
  return (
    <div className="relative w-full h-full max-h-full max-w-full"> 
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch">
        <p className="text-2xl font-bold tracking-wide w-full">MANAMGE ATTENDANCE</p>
        <Divider className="my-5" />
      </div>
    </div>
  );
}
