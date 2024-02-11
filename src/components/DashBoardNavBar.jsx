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
  Badge,
  Button,
} from "@nextui-org/react";
import { MdNotificationsActive } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import SideBarButton from "./SideBarButton";

function DashBoardNavBar({ menuItems }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      isBlurred
      isBordered
      onMenuOpenChange={setIsMenuOpen}
      className="bg-[#16202DE6]"
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">Ease ERP Solutions</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden md:flex">
          <p className="font-bold text-inherit uppercase text-2xl mb-1">
            kuldip sarvaiya
          </p>
        </NavbarItem>
        <NavbarItem>
          <Avatar radius="lg" isBordered color="secondary" about="kuldip" />
        </NavbarItem>
        <NavbarItem className="sm:ml-5">
          <span className="cursor-pointer">
            <Badge
              color="secondary"
              content={1}
              isInvisible={false}
              shape="circle"
              isOneChar
            >
              <MdNotificationsActive className="scale-[2] " />
            </Badge>
          </span>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <SideBarButton item={item} />
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
