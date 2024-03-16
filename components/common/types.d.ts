import { ReactElement } from "react";

export interface RadioInputProps {
    value: boolean;
    isBig?: boolean;
    onChange: () => void;
}

export interface ModalProps {
    header?: {
        left?: string;
        right?: any;
    };
    isOpen: boolean;
    className?: string;
    noPadding?: boolean;
    onClose?: () => void;
    isFullScreen?: boolean;
    customPosition?: string;
    centerContent?: boolean;
    children: React.ReactNode;
}

export interface ThemeSwitcherProps {
    isBig?: boolean;
}

export interface CheckBoxProps {
    label?: string;
    value?: boolean;
    onChange?: (value: boolean) => void;
}

export interface DropdownProps {
    value?: string;
    options?: {
        label: string;
        value: string;
    }[];
    onChange?: (value: any) => void;
}

export interface ContextMenuProps {
    children: React.ReactNode;
    showOptions: boolean;
    options: {
        label: string;
        onClick: () => void;
        isDestructive?: boolean;
    }[];
    setShowOptions: (value: boolean) => void;
    position?: "left" | "right" | "center";
}

export interface InputProps {
    id?: string;
    rows?: number;
    type?: string;
    value?: string;
    label?: string;
    className?: string;
    icon?: ReactElement;
    placeholder?: string;
    onChange?: (value: any) => void;
}
