import create from "zustand";

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
}

interface User {
  displayName: string | null;
  photoURL: string | null;
  uid: string | null;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
}));

export default useAuthStore;
