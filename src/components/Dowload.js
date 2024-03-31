"use client";

import { FaDownload } from "react-icons/fa";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Download({ id }) {
  function downloadPdf() {
    const doc = new jsPDF("portrait", "mm", "a4");
    doc.page =
      doc.internal.pageSize.getWidth() / doc.internal.pageSize.getHeight();
    autoTable(doc, {
      html: id,
      theme: "grid",
      head: "Kuldip Head",
      foot: "Kuldip Foot",
      showFoot: "everyPage",
      showHead: "everyPage",
      headStyles: { fillColor: "purple" },
    });

    doc.save(`${id}.pdf`);
  }

  return (
    <Dropdown size="sm" aria-label="dowload" aria-labelledby="dowload">
      <DropdownTrigger
        aria-label="dowlnoad button"
        aria-labelledby="dowlnoad button"
      >
        <Button
          color="secondary"
          variant="shadow"
          size="sm"
          startContent={<FaDownload />}
          aria-label="download dropdown"
          aria-labelledby="download dropdown"
        >
          DOWNLOAD
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="dowlnoad menu" aria-labelledby="dowlnoad menu">
        <DropdownItem
          aria-label="dowlnoad PDF"
          aria-labelledby="dowlnoad PDF"
          onPress={downloadPdf}
        >
          PDF
        </DropdownItem>
        <DropdownItem aria-label="dowlnoad XLS" aria-labelledby="dowlnoad XLS">
          XLS
        </DropdownItem>
        <DropdownItem aria-label="dowlnoad CVS" aria-labelledby="dowlnoad CVS">
          CVS
        </DropdownItem>
        <DropdownItem
          aria-label="dowlnoad HTML"
          aria-labelledby="dowlnoad HTML"
        >
          HTML
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
