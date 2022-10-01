import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import Placeholder from "../assets/avatar_placeholder.png";
import { db } from "../firebase";
import useUserStore from "../hooks/useUserStore";

interface ChatType {
  date: {
    nanoseconds: number;
    seconds: number;
  };

  uid: string;
}

const Chat = ({ chat }: { chat: ChatType }) => {
  const [user, setUser] = useState<DocumentData | null>(null);

  const { setChatUser } = useUserStore();

  useEffect(() => {
    if (!chat.uid) return;
    const unsub = onSnapshot(doc(db, "users", chat.uid), (doc) => {
      if (doc.exists()) {
        setUser(doc.data());
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
          praesentium dolore nesciunt provident placeat alias temporibus!
          Dolorem minima, aliquid provident inventore sed ex quis maiores
          eveniet dolores similique, alias qui.
        </div>
      </div>
    </div>
  );
};

export default Chat;
