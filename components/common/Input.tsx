"use client";

import { useState } from "react";
import { InputProps } from "@components/common/types";
import { ClosedEyeSmall, OpenEyeSmall } from "@icons";


const Input = ({ label, id, type = "text", value, onChange, placeholder, className, rows = 5, icon, error }: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label className="text-gray-828FA3 dark:text-white-FFFFFF text-xs leading-[15px]" htmlFor={id}>
                    {label}
                </label>
            )}

            {type === "textarea" ? (
                <textarea
                    id={id}
                    rows={rows}
                    name={label}
                    value={value}
                    placeholder={placeholder}
                    onChange={e => onChange && onChange(e.target.value)}
                    className={`px-[17px] py-2 bg-inherit border border-gray-828FA340 rounded text-[13px] font-medium leading-[23px] placeholder:text-black-000112 placeholder:dark:text-white-FFFFFF placeholder:opacity-25 placeholder:text-[13px] placeholder:leading-[23px] placeholder:font-medium focus-visible:outline-none ${className}`}
                />
            ) : (
                <div className="flex items-center justify-center gap-4">
                    <div className="w-full relative">
                        <input
                            type={resolvedType}
                            id={id}
                            value={value}
                            onChange={e => onChange && onChange(e.target.value)}
                            placeholder={placeholder}
                            className={`w-full px-[17px] py-2 bg-inherit border border-gray-828FA340 rounded text-[13px] font-medium leading-[23px] placeholder:text-black-000112 placeholder:dark:text-white-FFFFFF placeholder:opacity-25 placeholder:text-[13px] placeholder:leading-[23px] placeholder:font-medium focus-visible:outline-none focus:border-violet-635FC7 transition-colors duration-200 ${error ? "border-red-EA5555" : ""} ${isPassword ? "pr-10" : ""} ${className}`}
                        />

                        {/* Password toggle — replaces the inline error so it stays inside the input box */}
                        {isPassword && (
                            <button
                                type="button"
                                onClick={() => setShowPassword(v => !v)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-828FA3 hover:text-violet-635FC7 duration-200"
                                tabIndex={-1}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <ClosedEyeSmall /> : <OpenEyeSmall />}
                            </button>
                        )}

                        {/* Inline error text (non-password fields only, to avoid overlap with toggle) */}
                        {error && !isPassword && (
                            <p className="absolute right-3 top-1 text-red-EA5555 text-[13px] font-medium leading-[23px] mt-1">
                                {error}
                            </p>
                        )}
                    </div>

                    {/* External icon slot (e.g. close button on column inputs) */}
                    {icon && !isPassword && (
                        <div className="cursor-pointer">
                            {icon}
                        </div>
                    )}
                </div>
            )}

            {/* Error below the field for password inputs (since right-side space is taken by toggle) */}
            {error && isPassword && (
                <p className="text-red-EA5555 text-xs font-medium leading-[15px]">{error}</p>
            )}
        </div>
    );
}

export default Input;
