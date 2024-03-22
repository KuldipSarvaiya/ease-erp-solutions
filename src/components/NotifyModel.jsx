"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Badge,
} from "@nextui-org/react";
import { MdCancel, MdNotificationsActive } from "react-icons/md";
import { GrClear, GrClearOption } from "react-icons/gr";

function NotifyModel() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Modal isOpen={isOpen} placement="bottom-center" onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Bussiness Notifications</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-3 text-foreground-700  max-h-[485px] max-md::max-h-[550px] overflow-x-auto">
              {[
                "hii ",
                "how are you ",
                "send me yesterday reports",
                "i think we need to motive employees",
                "what is last year revenue",
                "can someone tell me what happend last week?",
                "we need instant meeting",
                "lets meet at meeting hall in half hour",
              ].map((msg, i) => {
                return (
                  <p
                    key={i}
                    className={`bg-slate-800 text-slate-300 p-2 rounded-2xl text-md sm:text-base flex flex-col gap-[1px] max-w-90`}
                  >
                    <div className="flex justify-between">
                      <span className="text-slate-50 text-xs place-self-start">
                        {new Date().toLocaleString().split(",")[1]}
                      </span>
                      <Button
                        isIconOnly
                        variant="light"
                        className="text-red-500 p-1 m-0 place-self-end scale-100"
                      >
                        <GrClearOption />
                      </Button>
                    </div>
                    {msg}
                  </p>
                );
              })}
            </div>
          </ModalBody>
          <ModalFooter className="flex flex-row justify-center"></ModalFooter>
        </ModalContent>
      </Modal>
      <Button
        variant="light"
        color="default"
        onClick={onOpen}
        isIconOnly
        className="cursor-pointer"
      >
        <Badge
          color="secondary"
          content={1}
          isInvisible={false}
          shape="circle"
          isOneChar
        >
          <MdNotificationsActive className="scale-[2]" />
        </Badge>
      </Button>
    </>
  );
}

export default NotifyModel;
