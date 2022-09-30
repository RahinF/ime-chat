import create from "zustand";

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
}

interface User {
  displayName: string | null;
  photoURL: string | null;
  uid: string;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
}));

export default useAuthStore;
