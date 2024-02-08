import { create } from "zustand";

interface ITestState {
    isSideBarOpen: boolean;
    updateIsSideBarOpen: (value: boolean) => void;
}

const initialState = {
    isSideBarOpen: true,
};

const useGeneralStore = create<ITestState>((set) => ({
    ...initialState,
    updateIsSideBarOpen: (value: boolean) => set({ isSideBarOpen: value }),
}));

export default useGeneralStore;
