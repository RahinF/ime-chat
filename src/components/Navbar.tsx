import { signOut } from "firebase/auth";
import { List } from "phosphor-react";
import { auth } from "../firebase";
import useUserStore from "../hooks/useUserStore";
import useMenuStore from "../hooks/useMenuStore";
import Placeholder from "../assets/avatar_placeholder.png";

const Navbar = () => {
  const { setMenuIsOpen } = useMenuStore();
  const { currentUser, setCurrentUser } = useUserStore();

  const handleLogout = () => {
    signOut(auth);
    setCurrentUser(null);
  };

  return (
    <div className="sticky top-0 flex h-16 items-center justify-between border-b p-4">
      <div className="flex items-center gap-2">
        <button
          className="rounded-full p-3 transition hover:bg-blue-500 hover:text-white block xl:hidden"
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
            src={currentUser?.photoURL || Placeholder}
            alt="avatar"
          />
          <div className="font-semibold">{currentUser?.displayName}</div>
        </div>

        <button
          className="bg-blue-500 p-3 uppercase text-white"
          onClick={handleLogout}
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
