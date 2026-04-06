import { create } from "zustand";

interface ITestState {
    isSideBarOpen: boolean;
    updateIsSideBarOpen: (value: boolean) => void;
    activeBoardId: string;
    setActiveBoardId: (id: string) => void;
}

const initialState = {
    isSideBarOpen: true,
    activeBoardId: "",

};

const useGeneralStore = create<ITestState>((set) => ({
    ...initialState,
    updateIsSideBarOpen: (value: boolean) => set({ isSideBarOpen: value }),
    setActiveBoardId: (id: string) => set({ activeBoardId: id }),
}));

export default useGeneralStore;
