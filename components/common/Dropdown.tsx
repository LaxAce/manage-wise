"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowDown } from "@icons";
import { EDropdownPosition } from "@constants/enums";
import { DropdownProps } from "@components/common/types";

const Dropdown = ({ label, value, options, onChange, position = EDropdownPosition.BOTTOM }: DropdownProps) => {
    const [showOptions, setShowOptions] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: any) => {
        if (dropdownRef.current && !dropdownRef?.current?.contains(event.target)) {
            setShowOptions(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            {label && (<span className="block mb-4 text-xs leading-[15px] dark:text-white-FFFFFF text-gray-828FA3">{label}</span>)}

            <div ref={dropdownRef} onClick={() => setShowOptions(!showOptions)} className={`cursor-pointer relative border border-gray-828FA33F ${showOptions ? " border-violet-635FC7" : ""} flex justify-between px-4 py-2 rounded items-center`}>
                <span className="text-[13px] leading-[23px] dark:text-white-FFFFFF font-medium">{value}</span>
                <div className="w-3.5 h-[20px] flex justify-center items-center">
                    <ArrowDown />
                </div>

                {showOptions && options?.length ? (<div className={`absolute w-full dark:bg-black-20212C bg-white-FFFFFF flex flex-col gap-1 left-0 rounded-lg p-2 max-h-[117px] overflow-y-auto shadow-2xl ${position === EDropdownPosition.TOP ? "top-[-120px]" : "top-11"}`}>
                    {options?.map((item, index) => {

                        return (
                            <div
                                onClick={() => {
                                    onChange && onChange(item);
                                    setShowOptions(false);
                                }}
                                key={index}
                                className={`${value === item.label ? "bg-gray-828FA33F" : ""} hover:bg-gray-828FA33F py-1 px-2 rounded cursor-pointer`}
                            >
                                <span className="text-[13px] leading-[23px] font-medium text-gray-828FA3">{item.label}</span>
                            </div>
                        )
                    })}
                </div>) : null}
            </div>
        </div>
    );
}

export default Dropdown;
