import { signOut } from "firebase/auth";
import { List } from "phosphor-react";
import { auth } from "../firebase";
import useAuthStore from "../hooks/useAuthStore";
import useMenuStore from "../hooks/useMenuStore";
import Placeholder from "../assets/avatar_placeholder.png";

const Navbar = () => {
  const { setMenuIsOpen } = useMenuStore();
  const { user } = useAuthStore();

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
          <img
            className="h-12 w-12 shrink-0 rounded-full object-cover"
            src={user?.photoURL || Placeholder}
            alt="avatar"
          />
          <div className="font-semibold">{user?.displayName}</div>
        </div>

        <button
          className="bg-blue-500 p-3 uppercase text-white"
          onClick={() => signOut(auth)}
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
