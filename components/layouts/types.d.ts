export interface PageLayoutProps {
    children: React.ReactNode;
}

export interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}
