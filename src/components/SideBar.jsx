import Link from "next/link";
import SideBarButton from "./SideBarButton.jsx";
import { Button } from "@nextui-org/react";
import { FaSignOutAlt } from "react-icons/fa";

function SideBar({ menuItems, mainPath }) {
  return (
    <aside className="bg-[#16202DE6] fixed top-0 left-0 w-60 h-full flex flex-col gap-2 p-2 pt-16 overflow-y-auto scrollbar-hide z-[10000]">
      {menuItems.map((menu, i) => {
        return (
          <SideBarButton
            key={`${menu}-${i}`}
            item={menu}
            mainPath={mainPath}
          />
        );
      })}
      <div className="fixed mt-5 left-2 bottom-2 w-56">
        <i className="font-thin">stay organized everytime...</i>
        <hr />
        <Button
          as={Link}
          variant="faded"
          color="secondary"
          className="uppercase w-full mt-5"
          href="/api/auth/signout?callbackUrl=/"
        >
          <FaSignOutAlt className="scale-125" /> sign Out
        </Button>
      </div>
    </aside>
  );
}

export default SideBar;
