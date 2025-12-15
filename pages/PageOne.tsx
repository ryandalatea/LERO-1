import React from 'react';
import { AlertTriangle, ShieldAlert, Eye } from 'lucide-react';
import { Button } from '../components/Button';
import { PageProps } from '../types';

export const PageOne: React.FC<PageProps> = ({ onNext }) => {
    const handleClick = () => {
        if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', 'ViewContent');
        }
        onNext();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-6 text-center relative overflow-hidden">
        
        {/* Background Decor */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-900/10 rounded-full blur-[100px] -z-10 animate-pulse-red"></div>

        <div className="max-w-4xl mx-auto flex flex-col items-center z-10">
            
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
            <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-red-400 font-mono text-xs uppercase tracking-widest font-bold">Alerta de Segurança Urgente</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-heading font-bold mb-6 leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
            QUEM ESTÁ FALANDO <br/>
            <span className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">COM SEU FILHO?</span>
            </h1>

            <p className="text-lg md:text-2xl text-gray-400 max-w-2xl mb-12 font-light leading-relaxed">
            Enquanto eles jogam no quarto ao lado, predadores digitais podem estar coletando fotos, endereços e segredos. <span className="text-white font-semibold">Você não está vendo, mas nós podemos te mostrar.</span>
            </p>

            <div className="relative group">
                <div className="absolute -inset-1 bg-red-600 rounded blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <Button onClick={handleClick} variant="danger" className="w-full md:w-auto min-w-[300px] text-xl py-6">
                VERIFICAR AGORA
                </Button>
            </div>

            {/* Status Indicators */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 text-center border-t border-white/10 pt-8 w-full max-w-2xl">
                <div className="flex flex-col items-center gap-2">
                    <AlertTriangle className="text-yellow-500 mb-1" size={24} />
                    <span className="text-3xl font-mono font-bold text-white">87%</span>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Jogos Vulneráveis</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <ShieldAlert className="text-red-500 mb-1" size={24} />
                    <span className="text-3xl font-mono font-bold text-white">24/7</span>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Risco de Exposição</span>
                </div>
                <div className="hidden md:flex flex-col items-center gap-2">
                    <Eye className="text-blue-500 mb-1" size={24} />
                    <span className="text-3xl font-mono font-bold text-white">0%</span>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Supervisão Atual</span>
                </div>
            </div>
        </div>
        </div>
    );
};