"use client";

import { useState } from "react";
import { HiPlusSm } from "react-icons/hi";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import { MobileLogo, Options } from "@icons";
import useGeneralStore from "@store/general";
import { Button, Modal } from "@components/common";
import MobileNav from "@components/layouts/NavBar/MobileNav";

const NavBar = () => {
    const isSideBarOpen = useGeneralStore(state => state.isSideBarOpen);
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div className={`${isSideBarOpen ? "left-0 sm:left-[260px] md:left-[300px]" : "left-0"} z-10 duration-500 absolute right-0 bg-white-FFFFFF dark:bg-gray-2B2C37 flex items-center justify-between py-4 md:py-5 px-4 sm:px-6 border-b border-gray-E4EBFA dark:border-gray-3E3F4E`}>
                <div className="flex items-center gap-4">
                    <div className="sm:hidden">
                        <MobileLogo />
                    </div>

                    <div className="flex items-center gap-2">
                        <h1 className="text-[18px] sm:text-2xl dark:text-white-FFFFFF duration-500 font-bold">Platform Launch</h1>
                        <Button onClick={handleClick} variant="neutral" className="sm:hidden">
                            <FaChevronDown color="#635FC7" className={`duration-500 ${isOpen ? ' rotate-[-180deg]' : ''}`} />
                        </Button>
                    </div>
                </div>

                <div className="hidden sm:flex items-center gap-6">
                    <Button variant="primary" size="large" >
                        + Add New Task
                    </Button>
                    <Options />
                </div>

                <div className="flex sm:hidden items-center gap-6">
                    <Button variant="primary" size="extraSmall" className="!text-[18px]">
                        <HiPlusSm size={"28px"} />
                    </Button>
                    <Options />
                </div>
            </div>

            <MobileNav isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
}

export default NavBar;