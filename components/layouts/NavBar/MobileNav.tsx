import { Modal, ThemeSwitcher } from "@components/common";
import { MobileNavProps } from "@components/layouts/types";
import { Board } from "@icons";

const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
    return (
        <Modal
            isOpen={isOpen}
            centerContent={false}
            customPosition="top-[90px]"
            className="w-[80%] rounded-lg"
            onClose={onClose}
            isFullScreen={false}
        >
            <div className={`menu-wrapper z-10 pt-4 duration-500 relative`}>
                <p className="pl-6 mb-[19px] text-xs font-bold leading-normal tracking-[2.4px] text-gray-828FA3">ALL BOARDS (3)</p>

                <div className="pr-6 mb-4">
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
        </Modal >
    );
}

export default MobileNav;