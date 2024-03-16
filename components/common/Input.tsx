import { InputProps } from "@components/common/types";
import { Close } from "@icons";

const Input = ({ label, id, type = "text", value, onChange, placeholder, className, rows = 5, icon }: InputProps) => {
    return (
        <div className="flex flex-col gap-2">
            {label && (<label className="text-gray-828FA3 dark:text-white-FFFFFF text-xs leading-[15px]" htmlFor={id}>{label}</label>)}
            {type === "textarea" ?
                (<textarea
                    id={id}
                    rows={rows}
                    name={label}
                    value={value}
                    placeholder={placeholder}
                    onChange={e => onChange && onChange(e.target.value)}
                    className={`px-[17px] py-2 bg-inherit border border-gray-828FA340 rounded text-[13px] font-medium leading-[23px] placeholder:text-black-000112 placeholder:dark:text-white-FFFFFF placeholder:opacity-25 placeholder:text-[13px] placeholder:leading-[23px] placeholder:font-medium focus-visible:outline-none ${className}`}
                />) :
                (<div className="flex items-center justify-center gap-4">
                    <input
                        type={type}
                        id={id}
                        value={value}
                        onChange={e => onChange && onChange(e.target.value)}
                        placeholder={placeholder}
                        className={`w-full px-[17px] py-2 bg-inherit border border-gray-828FA340 rounded text-[13px] font-medium leading-[23px] placeholder:text-black-000112 placeholder:dark:text-white-FFFFFF placeholder:opacity-25 placeholder:text-[13px] placeholder:leading-[23px] placeholder:font-medium focus-visible:outline-none ${className}`}
                    />
                    <div className="cursor-pointer">
                        {icon}
                    </div>
                </div>)}


        </div>
    );
}

export default Input;
