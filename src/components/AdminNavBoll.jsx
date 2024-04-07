"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { BsMenuButtonWideFill } from "react-icons/bs";
function AdminNavBoll() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      // redirect("/api/auth/signin?callbackUrl=/");
    },
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [ballPosition, setBallPosition] = useState({ x: 10, y: 200 });
  const [depts, setDepts] = useState([
    "fabric-manufacturing",
    "cleaning-and-finishing",
    "dying-and-printing",
    "cutting",
    "sewing",
    "packing-and-labeling",
  ]);

  // do not show ball if he is employee
  if (
    !session?.user?.designation ||
    session?.user?.designation === "Employee"
  ) {
    return;
  }

  // draggable button function
  const handleMouseDown = (e) => {
    let initialX = e.clientX;
    let initialY = e.clientY;

    const handleMouseMove = (event) => {
      const dx = event.clientX - initialX;
      const dy = event.clientY - initialY;

      setBallPosition((prevPosition) => {
        const newX = prevPosition.x - dx;
        const newY = prevPosition.y + dy;

        if (
          newX > 5 &&
          newY > 5 &&
          newX < window.innerWidth - 55 &&
          newY < window.innerHeight - 55
        )
          return { x: newX, y: newY };

        return prevPosition;
      });

      initialX = event.clientX;
      initialY = event.clientY;
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const my_dept = session?.user?.department_id?.dept_name;

  return (
    <>
      <Button
        onPress={onOpen}
        color="success"
        variant="ghost"
        radius="lg"
        isIconOnly
        size="lg"
        className="hover:shadow-slate-900 hover:shadow-inner fixed z-[999999]"
        style={{ top: ballPosition?.y + "px", right: ballPosition?.x + "px" }}
        draggable={false}
        onMouseDown={handleMouseDown}
      >
        <BsMenuButtonWideFill className="scale-[2]" />
      </Button>
      <Modal
        isOpen={isOpen}
        placement="bottom"
        backdrop="blur"
        onOpenChange={onOpenChange}
      >
        <ModalContent className="min-w-fit">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                TAKE DEPARTMENT VISITS
              </ModalHeader>
              <ModalBody className="w-fit">
                <p>
                  <Button
                    className="font-semibold"
                    as={Link}
                    href="/employee"
                    color="secondary"
                    variant="shadow"
                  >
                    E M P L O Y E E
                  </Button>
                  &nbsp; &nbsp;
                  {session?.user?.designation === "Admin" && (
                    <Button
                      className="font-semibold"
                      as={Link}
                      href="/admin"
                      color="secondary"
                      variant="shadow"
                    >
                      A D M I N
                    </Button>
                  )}
                </p>
                {["hr", "inventory", "finance"].includes(my_dept) && (
                  <>
                    <h6 className="flex-1">MANAGERIAL DASHBOARD</h6>
                    <p className="flex flex-nowrap max-md:flex-wrap gap-3">
                      {my_dept === "finance" && (
                        <Button
                          className="font-semibold"
                          as={Link}
                          href="/managers/finance"
                          color="secondary"
                          variant="shadow"
                        >
                          F I N A N A C E
                        </Button>
                      )}
                      {my_dept === "inventory" && (
                        <Button
                          className="font-semibold"
                          as={Link}
                          href="/managers/inventory"
                          color="secondary"
                          variant="shadow"
                        >
                          I N V E T O R Y
                        </Button>
                      )}
                      {my_dept === "hr" && (
                        <Button
                          className="font-semibold"
                          as={Link}
                          href="/managers/hr"
                          color="secondary"
                          variant="shadow"
                        >
                          H U M A N &nbsp; R E S O U R C E
                        </Button>
                      )}
                    </p>
                  </>
                )}
                {depts.includes(my_dept) && (
                  <>
                    <h6 className="flex-1">GENERAL DEPARTMENT DASHBOARD</h6>
                    <p className="flex flex-wrap max-w-[500px] justify-stretch gap-3">
                      {depts.map((dept) => (
                        <>
                          {my_dept === dept && (
                            <Button
                              key={dept}
                              className="font-semibold tracking-[0.15rem] uppercase"
                              as={Link}
                              href={
                                "/managers/general_manager?department=" + dept
                              }
                              color="secondary"
                              variant="shadow"
                            >
                              {dept.replaceAll("-", " ")}
                            </Button>
                          )}
                        </>
                      ))}
                    </p>
                  </>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default AdminNavBoll;
