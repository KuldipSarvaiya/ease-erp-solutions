import { Card, CardFooter, Button } from "@nextui-org/react";
import Image from "next/image";
import { BsCircleFill } from "react-icons/bs";
import { GrView } from "react-icons/gr";

function ProductCard() {
  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="shadow-lg border-2 border-slate-900"
    >
      <Image
        alt="Woman listing to music"
        className="object-cover"
        height={300}
        src="/adminPage.svg"
        width={300}
      />
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-base flex items-center flex-row justify-between w-full px-2 text-white/80 capitalize">
          <spna>my product name</spna>
          <spna className="underline text-sm flex items-center gap-3 flex-wrap">
            <BsCircleFill className="text-red-500" />2 inch
          </spna>
        </p>
        <Button
          className="text-tiny text-white bg-black/40"
          variant="light"
          color="secondary"
          radius="lg"
          size="md"
          isIconOnly
          startContent={<GrView className="scale-150" />}
        ></Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
