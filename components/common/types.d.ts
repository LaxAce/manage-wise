
export interface RadioInputProps {
    value: boolean;
    isBig?: boolean;
    onChange: () => void;
}

export interface ModalProps {
    isOpen: boolean;
    className?: string;
    onClose?: () => void;
    customPosition?: string;
    centerContent?: boolean;
    isFullScreen?: boolean;
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