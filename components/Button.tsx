import React from 'react';
import { ArrowRight, Lock } from 'lucide-react';
import { ButtonProps } from '../types';

export const Button: React.FC<ButtonProps> = ({ 
    children, 
    onClick, 
    variant = 'danger', 
    className = '', 
    icon = true, 
    id 
}) => {
    const baseStyles = "relative group w-full md:w-auto px-8 py-4 font-heading font-bold text-lg uppercase tracking-wider flex items-center justify-center gap-3 transition-all duration-200 overflow-hidden skew-x-[-10deg] md:skew-x-0 cursor-pointer";
    const contentStyles = "skew-x-[10deg] md:skew-x-0 flex items-center gap-2";

    const variants = {
        danger: "bg-red-600 hover:bg-red-700 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]",
        success: "bg-green-600 hover:bg-green-500 text-black shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)]",
        outline: "bg-transparent border border-white/20 hover:border-white/50 text-white hover:bg-white/5"
    };

    return (
        <button 
            id={id}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className} md:rounded-sm`}
        >
            <div className={contentStyles}>
                {variant === 'success' && <Lock size={18} className="mb-0.5" />}
                {children}
                {icon && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
            </div>
            
            {/* Shine Effect */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
        </button>
    );
};