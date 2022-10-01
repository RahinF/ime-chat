import { useState } from "react";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import useUserStore from "../hooks/useUserStore";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<DocumentData | null>(null);
  const [error, setError] = useState(false);

  const { currentUser } = useUserStore();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.code === "Enter" && handleSearch();
  };

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setError(true);
    }
  };

  const handleSelect = async () => {
    if (!currentUser || !user) return;

    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const response = await getDoc(doc(db, "chats", combinedId));

      if (!response.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId]: {
            uid: user.uid,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId]: {
            uid: currentUser.uid,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }

    setUser(null);
    setUsername("");
  };

  return (
    <div>
      <input
        className="w-full p-3 pr-10"
        aria-label="Search"
        placeholder="Search"
        onKeyDown={handleKeyDown}
        onChange={(event) => setUsername(event.target.value)}
      />

      {error && <span>User not found!</span>}

      {user && (
        <div
          className="flex cursor-pointer items-center gap-2 p-4 hover:bg-blue-500 hover:text-white"
          onClick={handleSelect}
        >
          <img
            className="h-12 w-12 shrink-0 rounded-full object-cover"
            src={user.photoURL}
            alt="avatar"
          />
          <div className="font-bold">{user.displayName}</div>
        </div>
      )}
    </div>
  );
};

export default Search;
