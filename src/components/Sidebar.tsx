import { useEffect } from "react";
import clsx from "clsx";
import useMenuStore from "../hooks/useMenuStore";
import useWindowSize from "../hooks/useWindowSize";
import Chats from "./Chats";
import Search from "./Search";
import OutSideClick from "../hooks/useOutsideClick";

const Sidebar = () => {
  const { menuIsOpen, setMenuIsOpen } = useMenuStore();
  const width = useWindowSize();

  const isDesktop = width > 1280;
  const isMobileAndMenuOpen = menuIsOpen && !isDesktop;

  const closeMenu = () => {
    if (isMobileAndMenuOpen) {
      setMenuIsOpen(false);
    }
  };

  useEffect(() => {
    setMenuIsOpen(isDesktop);
  }, [isDesktop, setMenuIsOpen]);

  useEffect(() => {
    document.body.style.overflow = isMobileAndMenuOpen ? "hidden" : "visible";
  }, [isMobileAndMenuOpen]);

  if (menuIsOpen)
    return (
      <>
        {isMobileAndMenuOpen && (
          <div className="fixed top-0 h-screen w-screen bg-black/50" />
        )}
        <OutSideClick
          onClick={closeMenu}
          className={clsx({
            "flex basis-1/4 flex-col divide-y border-r bg-white": true,
            "fixed bottom-0 top-0": isMobileAndMenuOpen,
          })}
        >
          <Search />
          <Chats />
        </OutSideClick>
      </>
    );

  return null;
};

export default Sidebar;


