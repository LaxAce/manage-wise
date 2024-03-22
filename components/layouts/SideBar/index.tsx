"use client";

import { useMemo, useState } from "react";
import { useTheme } from "next-themes";

import useGeneralStore from "@store/general";
import { Board, ClosedEye, OpenedEye } from "@icons";
import { Logo, ThemeSwitcher } from "@components/common";
import BoardForm from "@components/taskboard/BoardForm";

const SideBar = () => {
    const { resolvedTheme } = useTheme();
    const isSideBarOpen = useGeneralStore(state => state.isSideBarOpen);
    const isDark = useMemo(() => resolvedTheme === "dark", [resolvedTheme]);
    const updateIsSideBarOpen = useGeneralStore(state => state.updateIsSideBarOpen);
    const [showBoardForm, setShowBoardForm] = useState(false);

    return (
        <>
            <aside className="menu-wrapper">
                <div className={`${isSideBarOpen ? "hidden sm:block sm:w-[260px] md:w-[300px]" : "!w-0 opacity-0 invisible"} z-10 pt-8 border-r dark:bg-gray-2B2C37 bg-white-FFFFFF duration-500 border-gray-E4EBFA dark:border-gray-3E3F4E h-svh relative`}>
                    {isSideBarOpen && (<div className=" delay-300">
                        <div className="px-[34px] pb-5">
                            <Logo />
                            <p className=" text-xs font-bold leading-normal tracking-[2.4px] text-gray-828FA3 mt-[54px]">ALL BOARDS (3)</p>
                        </div>
                        <div className={`${isDark ? "menu-hover-dark" : "menu-hover"} pr-6`}>
                            <ul>
                                <li className={`flex items-center cursor-pointer gap-4 pl-8 py-[14px] bg-violet-635FC7 rounded-r-full active-board`}>
                                    <Board />
                                    <span className="text-[15px] text-gray-828FA3">Platform Launch</span>
                                </li>
                                <li className="flex items-center cursor-pointer gap-4 pl-8 py-[14px]">
                                    <Board />
                                    <span className="text-[15px] text-gray-828FA3">Marketing Plan</span>
                                </li>
                                <li className="flex items-center cursor-pointer gap-4 pl-8 py-[14px]">
                                    <Board />
                                    <span className="text-[15px] text-gray-828FA3">Roadmap</span>
                                </li>

                                <li onClick={() => setShowBoardForm(true)} className="flex items-center cursor-pointer gap-4 pl-8 py-[14px] create-new-board-wrapper">
                                    <Board />
                                    <span className="text-[15px] text-violet-635FC7">+ Create New Board</span>
                                </li>
                            </ul>
                        </div>
                        <div className="absolute bottom-[47px] w-full">
                            <div className="flex mb-2 justify-center items-center w-full">
                                <ThemeSwitcher isBig />
                            </div>
                            <div onClick={() => updateIsSideBarOpen(false)} className={`${isDark ? "hide-hover-dark" : "hide-hover"} w-full cursor-pointer px-[31px] py-[14px] flex gap-[15px] items-center`}>
                                <ClosedEye />
                                <span className="text-[15px] text-gray-828FA3">Hide Sidebar</span>
                            </div>
                        </div>
                    </div>)}
                </div>

                <div onClick={() => updateIsSideBarOpen(true)} className={`${isSideBarOpen ? "left-[-100px]" : "left-0"} bg-violet-635FC7 hover:bg-violet-A8A4FF rounded-r-[100px] py-[19px] px-[18px] z-10 duration-300 absolute bottom-8 cursor-pointer w-fit`}>
                    <OpenedEye />
                </div>
            </aside>
            <BoardForm showModal={showBoardForm} setShowModal={setShowBoardForm} />
        </>
    );
}

export default SideBar;
