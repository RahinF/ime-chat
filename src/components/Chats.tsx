import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import useUserStore from "../hooks/useUserStore";
import IChat from "../types/IChat";
import Chat from "./Chat";

const Chats = () => {
  const [chats, setChats] = useState<IChat[] | []>([]);
  const { currentUser } = useUserStore();

  useEffect(() => {
    if (!currentUser) return;
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      if (doc.exists()) {
        const array = Object.values(doc.data() as DocumentData);
        const chats = array as IChat[];
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
