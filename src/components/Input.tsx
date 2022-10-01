import { useState } from "react";
import { Paperclip, PaperPlaneRight } from "phosphor-react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import useUserStore from "../hooks/useUserStore";
import clsx from "clsx";

const Input = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const { chatId, currentUser, chatUser } = useUserStore();

  const handleFileOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList;
    setFile(files[0]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentUser || !chatId || !chatUser) return;

    if (file) {
      const storageRef = ref(storage, uuid());

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              image: downloadURL,
            }),
          });
        });
      });
    } else {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [chatId + ".lastMessage"]: {
        text: text ? text : `${currentUser.displayName} sent an image`,
      },
      [chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", chatUser.uid), {
      [chatId + ".lastMessage"]: {
        text: text ? text : `${currentUser.displayName} sent an image`,
      },
      [chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setFile(null);
  };

  return (
    <form
      className="flex items-center gap-2 border-t bg-white py-2 px-4"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="file"
        className={clsx({
          "cursor-pointer rounded-full p-3 transition": true,
          "hover:bg-blue-500 hover:text-white": !file,
          "bg-green-500 text-white": file,
        })}
      >
        <Paperclip size={24} />
      </label>
      <input
        type="file"
        id="file"
        accept="image/*"
        hidden
        onChange={handleFileOnChange}
      />
      <input
        className="w-full flex-1 p-3"
        placeholder="Enter your message here"
        onChange={(event) => setText(event.target.value)}
        value={text}
      />

      <div className="flex gap-2 text-black">
        <button
          className="rounded-full bg-blue-500 p-3 text-white disabled:bg-slate-300"
          disabled={!text && !file}
        >
          <PaperPlaneRight weight="fill" />
        </button>
      </div>
    </form>
  );
};

export default Input;
