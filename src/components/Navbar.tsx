import { List } from "phosphor-react";
import useMenuStore from "../hooks/useMenuStore";

const Navbar = () => {
  const {  setMenuIsOpen } = useMenuStore();


  return (
    <div className="sticky top-0 flex h-16 items-center justify-between border-b p-4">
      <div className="flex items-center gap-2">
        <button
          className="rounded-full p-3 transition hover:bg-blue-500 hover:text-white"
          onClick={() => setMenuIsOpen(true)}
        >
          <List size={24} />
        </button>

        <div className="text-2xl">iMe</div>
      </div>

      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <div className="h-12 w-12 shrink-0 rounded-full bg-blue-300" />
          <span className="font-semibold">Jane Smith</span>
        </div>

        <button className="bg-blue-500 p-3 text-white uppercase">logout</button>
      </div>
    </div>
  );
};

export default Navbar;
