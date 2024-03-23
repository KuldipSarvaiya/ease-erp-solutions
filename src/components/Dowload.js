"use client";

import { FaDownload } from "react-icons/fa";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

export default function Download() {
  return (
    <Dropdown size="sm" aria-label="dowload" aria-labelledby="dowload">
      <DropdownTrigger>
        <Button
          color="secondary"
          variant="shadow"
          size="sm"
          startContent={<FaDownload />}
        >
          DOWNLOAD
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem>PDF</DropdownItem>
        <DropdownItem>XLS</DropdownItem>
        <DropdownItem>CVS</DropdownItem>
        <DropdownItem>HTML</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
