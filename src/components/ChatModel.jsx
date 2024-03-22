"use client";

import React from "react";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { GrSend } from "react-icons/gr";

function ChatModel() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Modal isOpen={isOpen} placement="bottom" onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Managerial Chats</ModalHeader>
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
                    className={`block ${
                      i % 3 !== 0 ? "self-start" : "self-end"
                    } bg-green-500 p-2 rounded-2xl text-sm sm:text-base flex flex-col gap-[1px] max-w-90`}
                  >
                    {i % 3 !== 0 && (
                      <span className="text-red-500 font-semibold place-self-start text-sm">
                        Kuldip
                      </span>
                    )}
                    {msg}
                    <span className="text-slate-50 text-xs place-self-end">
                      {new Date().toLocaleString().split(",")[1]}
                    </span>
                  </p>
                );
              })}
            </div>
          </ModalBody>
          <ModalFooter className="flex flex-row justify-center">
            <Input
              radius="full"
              color="secondary"
              type="text"
              size="sm"
              placeholder="Type your message here..."
              className="max-w-[320px]"
            />
            <Button variant="shadow" radius="full" color="secondary">
              <GrSend className="scale-150" />
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Button
        variant="light"
        color="secondary"
        onPress={onOpen}
        isIconOnly
        className="cursor-pointer fixed right-10 bottom-10"
      >
        <HiMiniChatBubbleLeftRight className="scale-[2]" />
      </Button>
    </>
  );
}

export default ChatModel;
