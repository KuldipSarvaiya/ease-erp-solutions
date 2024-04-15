import { Button } from "@nextui-org/react";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

export default function Page() {
  return (
    <div class="w-96 h-[800px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[140px]">
      <div class="bg-[#0d1117]  p-10 rounded-3xl flex flex-col justify-center gap-10 w-full items-center">
        <h1 className="text-2xl font-extrabold text-red-500 text-balance">
          <center>⚠️</center>
          <br />
          WRONG CREDENTIALS
        </h1>
        <Button
          as={Link}
          href="/api/auth/signin?callback_url=/"
          size="lg"
          variant="faded"
          color="default"
          startContent={<BsArrowLeft />}
        >
          TRY SIGNING IN AGAIN
        </Button>
      </div>
    </div>
  );
}
