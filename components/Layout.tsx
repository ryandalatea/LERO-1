import React from 'react';
import { ShieldAlert, Activity } from 'lucide-react';
import { SalesNotification } from './SalesNotification';
import { LayoutProps } from '../types';

export const Layout: React.FC<LayoutProps> = ({ children, currentPage }) => {
    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col relative selection:bg-red-600 selection:text-white">
        {/* Visual Effects Layer */}
        <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 bg-grid opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/80"></div>
            <div className="scanlines absolute inset-0 opacity-30"></div>
        </div>

        <header className="border-b border-white/10 bg-black/90 backdrop-blur-md fixed top-0 w-full z-50 h-16 shadow-lg transition-all">
            <div className="container mx-auto h-full flex items-center justify-between px-4">
            
            {/* Logo Area */}
            <div className="flex items-center gap-3">
                <div className="bg-red-600/20 p-1.5 rounded border border-red-500/50">
                    <ShieldAlert size={20} className="text-red-500 animate-pulse" />
                </div>
                <div className="flex flex-col justify-center">
                    <div className="font-heading font-bold text-xl md:text-2xl tracking-wider leading-none flex items-center gap-2">
                        <span className="text-white">OLHO</span>
                        <span className="text-red-600">DIGITAL</span>
                    </div>
                    <span className="text-[8px] md:text-[10px] text-gray-500 font-mono tracking-[0.2em] uppercase mt-0.5 hidden sm:block">Sistema de Proteção e Monitoramento</span>
                </div>
            </div>
            
            {/* Right Status (Desktop Only) */}
            <div className="hidden md:flex items-center gap-2 bg-neutral-900/50 px-3 py-1 rounded-full border border-white/5">
                <Activity size={14} className="text-green-500 animate-pulse" />
                <span className="text-xs font-mono text-green-500">MONITORAMENTO ATIVO</span>
            </div>
            </div>
        </header>
        
        {/* Added top padding to prevent content from being hidden behind fixed header */}
        <div className="h-16"></div> 
        
        <main className="flex-grow flex flex-col relative z-10 w-full">
            {children}
        </main>

        {/* Notifications Overlay (ONLY ON PAGE 3) */}
        {currentPage === 3 && <SalesNotification />}
        </div>
    );
};