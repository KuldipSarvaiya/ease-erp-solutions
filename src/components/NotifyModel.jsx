"use client";

import React, { useEffect, useState } from "react";
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
import { MdNotificationsActive } from "react-icons/md";
import { GrClearOption } from "react-icons/gr";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function NotifyModel() {
  const [notices, setNotices] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callback_url=/");
    },
  });

  useEffect(() => {
    if (session?.user?._id && notices.length === 0)
      (() => {
        fetch("/api/notice?_id=" + session?.user?._id, {
          method: "GET",
          next: { tags: ["myNotice"] },
        })
          .then((res) => res?.json())
          .then((data) => {
            // console.log(data);
            setNotices(data.notice);
          })
          .catch((e) => console.log(e));
      })();
  }, [session]);

  async function deleteNotice(notice) {
    fetch("/api/notice", {
      method: "PUT",
      body: JSON.stringify({ _id: session?.user?._id, notice: notice }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data); // do something with the response
        setNotices(notices.filter((n) => n !== notice));
      })
      .catch((e) => console.log(e));
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        placement="bottom-center"
        backdrop="opaque"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader>Bussiness Notifications</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-3 text-foreground-700  max-h-[485px] max-md::max-h-[550px] overflow-x-auto">
              {notices?.map((msg, i) => {
                return (
                  <p
                    key={i}
                    className={`bg-slate-800 text-slate-300 p-2 rounded-2xl text-md sm:text-base flex flex-row gap-[1px] max-w-90 justify-between items-center`}
                  >
                    {msg}
                    <div className="flex justify-end">
                      <Button
                        onPress={() => deleteNotice(msg)}
                        isIconOnly
                        variant="light"
                        className="text-red-500 p-1 m-0 place-self-end scale-100"
                      >
                        <GrClearOption />
                      </Button>
                    </div>
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
          content={notices?.length}
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
