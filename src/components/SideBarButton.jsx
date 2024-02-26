"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";

function SideBarButton({ item, mainPath }) {
  return (
    <Link href={mainPath + item} aria-label={mainPath + item}>
      <Button
        className="uppercase tracking-widest mt-2 font-bold text-lg w-full"
        color="secondary"
        size="lg"
        // variant={"shadow"}
        variant={
          window?.location?.pathname?.endsWith(item.toLowerCase())
            ? "flat"
            : "shadow"
        }
      >
        {item.replaceAll("_", " ")}
      </Button>
    </Link>
  );
}

export default SideBarButton;
