"use client";

import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Avatar,
  Button,
} from "@nextui-org/react";
import { FaSignOutAlt } from "react-icons/fa";
import SideBarButton from "./SideBarButton";
import Image from "next/image";
import NotifyModel from "./NotifyModel";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function DashBoardNavBar({ menuItems, mainPath }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });

  // console.log("nav session = ", session);

  return (
    <Navbar
      isBlurred
      isBordered
      onMenuOpenChange={setIsMenuOpen}
      className="bg-[#16202DE6] fixed z-[1001]"
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">
            <Image
              src={"/erp.svg"}
              alt="Ease ERP Solutions"
              width={250}
              height={60}
              className="w-64 max-md:scale-150 max-sm:translate-x-7 max-md:translate-x-11 translate-y-2"
            />
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden md:flex">
          <p className="font-bold text-inherit uppercase text-2xl mb-1">
            {session?.user?.middle_name} {session?.user?.first_name}
          </p>
        </NavbarItem>
        <NavbarItem>
          <Avatar
            radius="lg"
            className="max-md:scale-80"
            isBordered
            color="secondary"
            about="profile"
            src={session?.user?.image || ""}
          />
        </NavbarItem>
        <NavbarItem>
          {/* <span className="cursor-pointer">
            <Badge
              color="secondary"
              content={1}
              isInvisible={false}
              shape="circle"
              isOneChar
            >
              <MdNotificationsActive className="scale-[2]" />
            </Badge>
          </span> */}
          <NotifyModel />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <SideBarButton mainPath={mainPath} item={item} />
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <i className="font-thin">stay organized everytime...</i>
          <hr />
          <Button
            as={Link}
            variant="faded"
            color="secondary"
            className="uppercase w-50 mt-5"
            href="/api/auth/signout?callbackUrl=/"
          >
            <FaSignOutAlt className="scale-125" /> sign Out
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

export default DashBoardNavBar;
