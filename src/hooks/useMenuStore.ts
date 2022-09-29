import create from "zustand";

interface MenuState {
  menuIsOpen: boolean;
  setMenuIsOpen: (value: boolean) => void;
}

const useMenuStore = create<MenuState>((set) => ({
  menuIsOpen: false,
  setMenuIsOpen: (value) => set(() => ({ menuIsOpen: value })),
}));

export default useMenuStore;
