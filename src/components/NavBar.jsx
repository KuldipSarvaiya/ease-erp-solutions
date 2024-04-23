"use client";

import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link as UiLink,
  Button,
  Avatar,
} from "@nextui-org/react";
import { useState } from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const menuItems = ["Home", "Products"];
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      // redirect("/api/auth/signin?callbackUrl=/");
    },
  });
  // console.log("\n********* Nav Session = ", session);
  if (session?.user?.designation === "Employee") redirect("/employee");
  if (session?.user?.designation === "Manager")
    redirect(
      `/managers/${getDepartmentPath(session?.user?.department_id?.dept_name)}`
    );
  function getDepartmentPath(department) {
    switch (department) {
      case "hr":
        return "hr";
      case "finance":
        return "finance";
      case "inventory":
        return "inventory";
      default:
        return "general_manager";
    }
  }

  return (
    <Navbar
      isBordered
      isBlurred
      isMenuOpen={isMenuOpen}
      className="bg-[#16202DE6]"
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* mobile menu toggle button */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      {/* heading */}
      <NavbarContent className="pr-3" justify="start">
        <NavbarBrand>
          <p className="font-bold text-inherit">
            <Link href={"/"}>
              <Image
                src={"/erp.svg"}
                alt="Ease ERP Solutions"
                width={250}
                height={60}
                className="scale-110 translate-y-1 max-sm:scale-[2] md:scale-110 md:translate-x-1/4"
              />
            </Link>
          </p>
        </NavbarBrand>
      </NavbarContent>

      {/* wide screen nav menu */}
      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        {menuItems.map((item) => {
          return (
            <NavbarItem
              key={`${item + Math.random()}`}
              isActive={active === item}
            >
              <UiLink
                as={Link}
                onClick={() => {
                  setActive(item);
                }}
                color="foreground"
                aria-current="page"
                href={`/customer${
                  item === "Home" ? "" : "/" + item.toLowerCase()
                }`}
              >
                {item}
              </UiLink>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      {/* account / login status*/}
      <NavbarContent justify="end">
        <NavbarItem className="flex">
          {session?.user ? (
            <>
              <Button
                variant="flat"
                className="max-md:-scale-75 max-md:translate-x-1/2 max-md:rotate-180"
              >
                <UiLink
                  as={Link}
                  href="/customer/profile"
                  color="foreground"
                  size="sm"
                  onClick={() => {
                    setActive("account");
                  }}
                  className="md:text-base"
                >
                  {session?.user?.picture ? (
                    <Avatar
                      size="sm"
                      src={session.user.picture}
                    />
                  ) : (
                    <VscAccount />
                  )}
                  &nbsp; Account
                </UiLink>
              </Button>
              &nbsp;
              <Button
                variant="flat"
                className="max-md:-scale-75 max-md:translate-x-1/3 max-md:rotate-180"
              >
                <UiLink
                  as={Link}
                  href="/api/auth/signout?callbackUrl=/"
                  size="sm"
                  color="foreground"
                  onClick={() => {
                    setActive("signout");
                  }}
                >
                  <FaSignOutAlt />
                  &nbsp;Sign Out
                </UiLink>
              </Button>
            </>
          ) : (
            <Button variant="flat">
              <UiLink
                as={Link}
                href="/api/auth/signin?callbackUrl=/customer/profile"
                color="foreground"
                size="sm"
                onClick={() => {
                  setActive("signin");
                }}
              >
                <FaSignInAlt />
                &nbsp;Sign In
              </UiLink>
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      {/* mobile toogle menu */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`} isActive={active === item}>
            <UiLink
              as={Link}
              className="w-full"
              color={"foreground"}
              size="lg"
              onClick={() => {
                setIsMenuOpen(false);
                setActive(item);
              }}
              href={`/customer/${item.toLowerCase()}`}
            >
              {item}
            </UiLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
