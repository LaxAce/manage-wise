import { ModalProps } from "./types";

const Modal = ({ children, isOpen, onClose, centerContent = true, className, customPosition, isFullScreen = true, noPadding, header, leftHeaderClass }: ModalProps) => {
    return (
        <div className={`absolute ${isOpen ? "h-svh" : "h-[-100px]"} ${isFullScreen ? "z-20" : ""} left-0 top-0 flex items-center justify-center w-full`}>
            <div onClick={() => onClose ? onClose() : {}} className={`${isOpen ? "h-svh" : ""} w-full bg-[#000] opacity-50`} />
            <div className={`${isOpen ? `${centerContent ? "top-1/2 transform -translate-y-1/2" : customPosition}` : "top-[-1500px]"} w-full max-w-[90%] sm:max-w-[480px] rounded-md transition-all duration-500 ease-in-out absolute dark:bg-gray-2B2C37 bg-white-FFFFFF ${className}`}>
                <div className={`dark:text-white-FFFFFF ${noPadding ? "" : "px-6 py-8"}`}>
                    {header ? (<div className={`flex justify-between items-center mb-6 dark:text-white-FFFFFF ${leftHeaderClass}`}>
                        <h3 className="text-lg leading-[23px] max-w-[387px]">{header.left}</h3>
                        {header.right}
                    </div>) : null}
                    <div className="max-h-[60svh] sm:max-h-[70svh] overflow-y-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
