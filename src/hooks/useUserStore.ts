import create from "zustand";
import IUser from "../types/IUser";

interface UserState {
  currentUser: IUser | null;
  setCurrentUser: (currentUser: IUser | null) => void;

  chatId: string | null;
  setChatId: (chatId: string | null) => void;

  chatUser: IUser | null;
  setChatUser: (chatUser: IUser) => void;
}



const useUserStore = create<UserState>((set, get) => ({
  currentUser: null,
  setCurrentUser: (currentUser) => set(() => ({ currentUser })),

  chatId: null,
  setChatId: (chatId) => set(() => ({ chatId })),

  // chat user - person the current user is talking to
  chatUser: null,
  setChatUser: (chatUser) =>
    set(() => {
      const currentUser = get().currentUser!;
      const chatId =
        currentUser.uid > chatUser.uid
          ? currentUser.uid + chatUser.uid
          : chatUser.uid + currentUser.uid;

      return { chatUser, chatId };
    }),
}));

export default useUserStore;
