import create from "zustand";

interface UserState {
  currentUser: User | null;
  setCurrentUser: (currentUser: User) => void;

  chatId: string | null;
  setChatId: (chatId: string | null) => void;

  chatUser: User | null;
  setChatUser: (chatUser: User) => void;
}

interface User {
  displayName: string | null;
  photoURL: string | null;
  uid: string;
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
