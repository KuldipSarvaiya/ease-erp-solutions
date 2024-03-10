import { Divider } from "@nextui-org/react";

export default function EventPage() {
  return (
    <div className="relative w-full h-full max-h-full max-w-full"> 
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500">
        <p className="uppercase text-2xl max-md:text-lg tracking-wider font-bold mb-5">
          Organize event
        </p>
        <Divider className="my-5" />
      </div>
    </div>
  );
}
