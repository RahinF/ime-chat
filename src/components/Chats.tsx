import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import useUserStore from "../hooks/useUserStore";
import Chat from "./Chat";

interface ChatType {
  date: {
    nanoseconds: number;
    seconds: number;
  };

  uid: string;
}

const Chats = () => {
  const [chats, setChats] = useState<ChatType[] | []>([]);
  const { currentUser } = useUserStore();

  useEffect(() => {
    if (!currentUser) return;
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      if (doc.exists()) {
        const array = Object.values(doc.data() as DocumentData);
        const chats = array as ChatType[];
        setChats(chats);
      }
    });

    return () => {
      unsub();
    };
  }, [currentUser]);

  return (
    <div className="flex flex-col divide-y overflow-y-auto">
      {chats
        .sort((a, b) => b.date.seconds - a.date.seconds)
        .map((chat, index) => (
          <Chat chat={chat} key={index} />
        ))}
    </div>
  );
};

export default Chats;
