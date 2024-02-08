
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
    children: React.ReactNode;
}

export interface ThemeSwitcherProps {
    isBig?: boolean;
}