"use client";

import { useRouter } from "next/navigation";

import { Board } from "@icons";
import { Modal, ThemeSwitcher } from "@components/common";
import { MobileNavProps } from "@components/layouts/types";
import { useGetBoards } from "@hooks/useBoard";
import useGeneralStore from "@store/general";

const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
    const router = useRouter();
    const activeBoardId = useGeneralStore(state => state.activeBoardId);
    const setActiveBoardId = useGeneralStore(state => state.setActiveBoardId);

    const { data: boardsData } = useGetBoards();
    const boards = boardsData?.boards ?? [];

    const handleSelectBoard = (id: string) => {
        setActiveBoardId(id);
        router.push(`/board?boardId=${id}`);
        onClose();
    };

    return (
        <Modal
            noPadding
            isOpen={isOpen}
            onClose={onClose}
            isFullScreen={false}
            centerContent={false}
            customPosition="top-[90px]"
            className="!w-[80%] rounded-lg"
        >
            <div className="menu-wrapper z-10 pt-4 duration-500 relative">
                <p className="pl-6 mb-[19px] text-xs font-bold leading-normal tracking-[2.4px] text-gray-828FA3">
                    ALL BOARDS ({boards.length})
                </p>

                <div className="pr-6 mb-4">
                    <ul>
                        {boards.map((board: any) => (
                            <li
                                key={board.id}
                                onClick={() => handleSelectBoard(board.id)}
                                className={`flex items-center cursor-pointer gap-4 pl-8 py-[14px] rounded-r-full ${activeBoardId === board.id
                                        ? "bg-violet-635FC7 active-board"
                                        : ""
                                    }`}
                            >
                                <Board />
                                <span className="text-[15px] text-gray-828FA3">{board.name}</span>
                            </li>
                        ))}

                        <li className="flex items-center cursor-pointer gap-4 pl-8 py-[14px] create-new-board-wrapper">
                            <Board />
                            <span className="text-[15px] text-violet-635FC7">+ Create New Board</span>
                        </li>
                    </ul>
                </div>

                <div className="flex justify-center items-center w-full mb-4">
                    <ThemeSwitcher isBig />
                </div>
            </div>
        </Modal>
    );
};

export default MobileNav;