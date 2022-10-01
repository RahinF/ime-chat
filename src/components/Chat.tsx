import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import Placeholder from "../assets/avatar_placeholder.png";
import { db } from "../firebase";
import useUserStore from "../hooks/useUserStore";
import IChat from "../types/IChat";
import IUser from "../types/IUser";

const Chat = ({ chat }: { chat: IChat }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const { setChatUser } = useUserStore();

  useEffect(() => {
    if (!chat.uid) return;
    const unsub = onSnapshot(doc(db, "users", chat.uid), (doc) => {
      if (doc.exists()) {
        const user = doc.data() as IUser;
        setUser(user);
      }
    });

    return () => {
      unsub();
    };
  }, [chat.uid]);

  const handleSelect = () => {
    if (user) {
      const { displayName, photoURL, uid } = user;
      setChatUser({ displayName, photoURL, uid });
    }
  };

  return (
    <div
      className="flex cursor-pointer gap-2 p-4 hover:bg-blue-500 hover:text-white"
      onClick={handleSelect}
    >
      <img
        className="h-12 w-12 shrink-0 rounded-full object-cover"
        src={user?.photoURL || Placeholder}
        alt="avatar"
      />
      <div>
        <div className="font-bold">{user?.displayName}</div>

        <div className="w-40 truncate">
          {chat.lastMessage?.text || "no messages"}
        </div>
      </div>
    </div>
  );
};

export default Chat;
