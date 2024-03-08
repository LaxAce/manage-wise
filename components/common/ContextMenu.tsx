"use client";

import { useEffect, useRef, useState } from "react";

import { ContextMenuProps } from "@components/common/types";

const ContextMenu = ({ children, showOptions, options, setShowOptions }: ContextMenuProps) => {
    const contextMenuRef = useRef<HTMLDivElement>(null);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

    const handleClickOutside = (event: any) => {
        if (contextMenuRef.current && !contextMenuRef?.current?.contains(event.target)) {
            setShowOptions(false)
        }
    };

    const handleMenuClick = () => {
        const rect = contextMenuRef?.current?.getBoundingClientRect();
        const isBottom = (window.innerHeight - rect!.bottom) < rect!.height;
        const isRight = (window.innerWidth - rect!.right) < rect!.width;
        setMenuPosition({
            top: isBottom ? -rect!.height : rect!.height,
            left: isRight ? -rect!.width : rect!.width / 2
        });
        setShowOptions(!showOptions);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={contextMenuRef} className="w-fit relative cursor-pointer">
            <div onClick={handleMenuClick} className="w-[30px] flex justify-end">
                {children}
            </div>
            {showOptions ? (<div style={{top: menuPosition.top, transform: `translateX(${menuPosition.left}px)`}} className="absolute mt-5 w-[192px] left-1/2x -translate-x-1/2x h-20x bg-black-20212C p-2 rounded-lg">
                {options?.map((item, index) => (
                    <p key={index} onClick={item.onClick} className={`text-[13px] leading-[23px] font-medium px-2 py-1  ${item.isDestructive ? "text-red-EA5555" : "text-gray-828FA3"} hover:bg-gray-828FA33F cursor-pointer rounded`}>
                        {item.label}
                    </p>
                ))}
            </div>) : null}
        </div>
    );
}

export default ContextMenu;