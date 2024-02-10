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

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const menuItems = ["Home", "Products", "AboutUs"];
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });
  console.log("\n********* Nav Session = ", session);

  return (
    <Navbar
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
            <Link href={"/"}>Ease ERP Solutions</Link>
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
                href={`/customer/${item.toLowerCase()}`}
              >
                {item}
              </UiLink>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      {/* account / login status*/}
      <NavbarContent justify="end">
        <NavbarItem>
          {session?.user ? (
            <>
              <Button variant="flat">
                <UiLink
                  as={Link}
                  href="/customer/profile"
                  color="secondary"
                  size="sm"
                  onClick={() => {
                    setActive("account");
                  }}
                >
                  {session?.user?.image ? (
                    <Avatar src={session.user.image} />
                  ) : (
                    <VscAccount />
                  )}
                  &nbsp; Account
                </UiLink>
              </Button>
              <Button variant="flat">
                <UiLink
                  as={Link}
                  href="/api/auth/signout?callbackUrl=/"
                  size="sm"
                  color="secondary"
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
                href="/api/auth/signin?callbackUrl=/profile"
                color="secondary"
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
