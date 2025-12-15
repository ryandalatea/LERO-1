import { ReactNode } from 'react';

export interface LayoutProps {
    children: ReactNode;
    currentPage: number;
}

export interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    variant?: 'danger' | 'success' | 'outline';
    className?: string;
    icon?: boolean;
    id?: string;
}

export interface NotificationSimProps {
    app: 'roblox' | 'whatsapp' | 'instagram' | 'system';
    sender: string;
    message: string;
    time?: string;
}

export interface PageProps {
    onNext: () => void;
}

export interface Coords {
    lat: number;
    lng: number;
}