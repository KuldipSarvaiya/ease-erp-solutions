"use client";

import React, { useEffect, useRef, useState } from "react";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
  Avatar,
} from "@nextui-org/react";
import { GrSend } from "react-icons/gr";
import { useSession } from "next-auth/react";

function ChatModel() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      // redirect("/api/auth/signin?callbackUrl=/");
    },
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [msgs, setMsgs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const scrollDown = useRef(null);

  function sendMsg() {
    if (message === "") return;

    setLoading(true);
    fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        message: message,
        sent_by: session?.user?._id,
        date_time: new Date(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMsgs((prev) => [
          ...prev,
          {
            key: Math.random(),
            message: message,
            sent_by: session?.user,
            date_time: new Date(),
          },
        ]);
        setMessage("");
        setLoading(false);
        scrollDown.current.scrollIntoView({
          behavior: "smooth",
        });
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }

  function getMsg(skip = 0, limit = 20) {
    fetch(`/api/chat?skip=${skip}&limit=${limit}`, {
      method: "GET",
      next: { tags: ["chatting"] },
    })
      .then((res) => res.json())
      .then((data) => {
        setMsgs(data);
        scrollDown?.current?.scrollIntoView({
          behavior: "smooth",
        });
      });
  }

  useEffect(() => {
    getMsg();
  }, [isOpen]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        placement="bottom-center"
        backdrop="opaque"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader>Managerial Chats</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-3 text-foreground-700  max-h-[400px] max-md::max-h-[550px] overflow-x-hidden overflow-y-scroll">
              {msgs?.map((msg, i) => {
                return msg?.sent_by?._id?.toString() !==
                  session?.user?._id?.toString() ? (
                  <div
                    key={msg._id}
                    className="self-start bg-purple-800/25 backdrop-blur-lg text-slate-50 p-2 rounded-2xl text-sm sm:text-base flex flex-col gap-0"
                  >
                    <div
                      className={` flex flex-row justify-start items-start gap-1 `}
                    >
                      <Avatar
                        src={msg.sent_by.image}
                        size="sm"
                        title={
                          session?.user?.department_id?.dept_name
                            ?.replaceAll("-", " ")
                            .toUpperCase() + " Department Manager"
                        }
                      />
                      <span className=" flex flex-col gap-[1px] max-w-90">
                        <span
                          className="text-red-500 capitalize font-semibold place-self-start text-sm"
                          title={
                            msg?.sent_by?.department_id?.dept_name
                              ?.replaceAll("-", " ")
                              .toUpperCase() + " Department Manager"
                          }
                        >
                          {msg.sent_by.first_name} {msg.sent_by.middle_name}
                        </span>
                        {msg.message}
                      </span>
                    </div>
                    <span className="text-slate-500 text-xs place-self-end">
                      {new Date(msg.date_time).toLocaleString()}
                    </span>
                  </div>
                ) : (
                  <div
                    key={msg._id}
                    className="self-end bg-purple-800/25 backdrop-blur-lg text-slate-50 p-2 rounded-2xl text-sm sm:text-base flex flex-col gap-0"
                  >
                    <div
                      className={` flex flex-row-reverse justify-start items-start gap-1 `}
                    >
                      <Avatar
                        src={msg.sent_by.image}
                        size="sm"
                        title={
                          msg?.sent_by?.department_id?.dept_name
                            ?.replaceAll("-", " ")
                            .toUpperCase() + " Department Manager"
                        }
                      />
                      <span className=" flex flex-col gap-[1px] max-w-90">
                        {msg.message}
                      </span>
                    </div>
                    <span className="text-slate-600 text-xs place-self-start">
                      {new Date(msg.date_time).toLocaleString()}
                    </span>
                  </div>
                );
              })}
              <div ref={scrollDown} className="bg-red-700 h-20 w-10"></div>
            </div>
          </ModalBody>
          <ModalFooter className="flex flex-row justify-center">
            <Textarea
              isDisabled={loading}
              radius="full"
              color="secondary"
              type="text"
              size="sm"
              placeholder="Type your message here..."
              style={{ color: "#f8fafc" }}
              className="max-w-[320px] outline-none"
              onKeyDown={(e) => {
                if (e.code === "Enter") sendMsg();
              }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              variant="shadow"
              radius="full"
              color="secondary"
              isLoading={loading}
              isIconOnly
              onPress={sendMsg}
            >
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
        isDisabled={isOpen}
        className={"cursor-pointer fixed right-10 bottom-10 z-[99999]"}
      >
        <HiMiniChatBubbleLeftRight className="scale-[2]" />
      </Button>
    </>
  );
}

export default ChatModel;
