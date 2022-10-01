import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import IUser from "../types/IUser";
import Placeholder from "../assets/avatar_placeholder.png";
import IMessage from "../types/IMessage";

const Message = ({ message }: { message: IMessage }) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (!message) return;
    const unsub = onSnapshot(doc(db, "users", message.senderId), (doc) => {
      if (doc.exists()) {
        const user = doc.data() as IUser;
        setUser(user);
      }
    });

    return () => {
      unsub();
    };
  }, [message]);

  return (
    <div className="flex gap-4">
      <img
        className="h-12 w-12 shrink-0 rounded-full object-cover"
        src={user?.photoURL || Placeholder}
        alt="avatar"
      />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="font-bold">{user?.displayName}</span>
          <span className="text-xs">date</span>
        </div>
        <div className="flex flex-col items-start gap-2">
          {message.image && (
            <img src={message.image} alt="uploaded" className="h-40" />
          )}
          {message.text && (
            <span className="rounded bg-blue-500 p-3 text-white">
              {message.text}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
