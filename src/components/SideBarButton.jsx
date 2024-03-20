"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";

function SideBarButton({ item, mainPath }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(window?.location?.pathname?.endsWith(item.toLowerCase()));
  }, []);

  return (
    <Link href={mainPath + item} aria-label={mainPath + item}>
      <Button
        className="uppercase tracking-widest mt-2 font-bold text-lg w-full"
        color="secondary"
        size="lg"
        // variant={"shadow"}
        variant={isActive ? "flat" : "shadow"}
      >
        {item.replaceAll("_", " ")}
      </Button>
    </Link>
  );
}

export default SideBarButton;
