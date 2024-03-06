import { Check } from "@icons";
import { CheckBoxProps } from "@components/common/types";

const CheckBox = ({ value, onChange, label }: CheckBoxProps) => {
    return (
        <div className="flex gap-4 items-center">
            <div className="w-4">
                <div onClick={() => onChange && onChange(!value)} className={`${value ? "bg-violet-635FC7" : "border border-gray-828FA33F dark:bg-gray-2B2C37 bg-white-FFFFFF"} flex-nowrap w-4 h-4 rounded-sm flex items-center justify-center cursor-pointer`}>
                    {value && <Check />}
                </div>
            </div>
            {label ? (<label className={`text-xs leading-[15px] ${value ? "opacity-50 line-through" : ""} dark:text-white-FFFFFF text-black-000112 `}>
                {label}
            </label>) : null}
        </div>
    );
}

export default CheckBox;
