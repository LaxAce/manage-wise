"use client";

import { useEffect, useRef } from "react";

import { EPosition } from "@constants/enums";
import { ContextMenuProps } from "@components/common/types";

const ContextMenu = ({ children, showOptions, options, setShowOptions, position = EPosition.CENTER }: ContextMenuProps) => {
    const contextMenuRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: any) => {
        if (contextMenuRef.current && !contextMenuRef?.current?.contains(event.target)) {
            setShowOptions(false)
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={contextMenuRef} className="w-fit px-1 relative cursor-pointer">
            <div onClick={() => setShowOptions(!showOptions)} className="flex justify-end">
                {children}
            </div>
            {showOptions ? (<div className={`absolute mt-5 w-[192px] ${position === EPosition.CENTER ? "left-1/2 -translate-x-1/2" : position === EPosition.LEFT ? "right-0" : position === EPosition.RIGHT ? "left-5" : ""} bg-white-FFFFFF shadow-lg dark:bg-black-20212C p-2 rounded-lg`}>
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
