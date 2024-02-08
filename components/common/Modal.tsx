import { ModalProps } from "./types";

const Modal = ({children, isOpen, onClose, centerContent = true, className, customPosition}: ModalProps) => {
    return (
        <div className={`absolute ${isOpen ? "h-svh" : "h-[-100px]"} left-0 sm:pl-[260px] md:pl-[300px] flex items-center justify-center w-full`}>
            <div onClick={() => onClose ? onClose() : {}} className={`${isOpen ? "h-svh" : ""} w-full bg-[#000] opacity-50`} />
            <div className={`${isOpen ? `${centerContent ? "top-1/2 transform -translate-y-1/2" : customPosition}` : "top-[-1500px]"} max-w-[480px] rounded-md transition-all duration-500 ease-in-out absolute dark:bg-gray-2B2C37 bg-white-FFFFFF ${className}`}>
                {children}
            </div>
        </div>
    );
}

export default Modal;