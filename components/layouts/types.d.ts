export interface PageLayoutProps {
    children: React.ReactNode;
}

export interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface NavContextProps {
    setShowBoardForm: (value: boolean) => void;
    setShowDeleteBoard: (value: boolean) => void;
}
