import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import useUserStore from "../hooks/useUserStore";
import IMessage from "../types/IMessage";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const { chatId } = useUserStore();

  useEffect(() => {
    if (!chatId) return;
    const unSub = onSnapshot(doc(db, "chats", chatId), (doc) => {
      if (doc.exists()) {
        setMessages(doc.data().messages);
      }
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  return (
    <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-4">
      {messages.map((message) => (
        <Message message={message} key={message.id} />
      ))}
    </div>
  );
};

export default Messages;
