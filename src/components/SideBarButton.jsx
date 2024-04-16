"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SideBarButton({ item, mainPath }) {
  const path = usePathname();
  const isActive = path.endsWith(item.toLowerCase());

  return (
    <Button
      as={Link}
      href={mainPath + item}
      className="uppercase tracking-widest mt-2 font-bold text-lg w-full"
      color="secondary"
      // isDisabled={isActive}
      size="lg"
      aria-label={mainPath + item}
      aria-labelledby={mainPath + item}
      // variant={"shadow"}
      variant={isActive ? "flat" : "shadow"}
    >
      {item.replaceAll("_", " ")}
    </Button>
  );
}

export default SideBarButton;
