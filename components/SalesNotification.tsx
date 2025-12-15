import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

const NAMES = [
    "Mariana S. - São Paulo", "Carlos E. - Rio de Janeiro", "Ana P. - Curitiba", 
    "Roberto M. - Belo Horizonte", "Fernanda L. - Salvador", "João V. - Porto Alegre",
    "Patrícia G. - Brasília", "Lucas F. - Recife", "Juliana R. - Fortaleza",
    "Rodrigo B. - Campinas", "Camila T. - Manaus", "Bruno A. - Goiânia",
    "Vanessa O. - Vitória", "Eduardo S. - Florianópolis", "Beatriz M. - Natal"
];

export const SalesNotification: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState('');
    
    useEffect(() => {
        // Initial delay set to 10 seconds
        const initialTimeout = setTimeout(() => {
            showNotification();
        }, 10000);

        const showNotification = () => {
            const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
            setName(randomName);
            setVisible(true);

            setTimeout(() => {
                setVisible(false);
                const nextDelay = Math.random() * (15000 - 8000) + 8000;
                setTimeout(showNotification, nextDelay);
            }, 4000);
        };

        return () => clearTimeout(initialTimeout);
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed bottom-4 left-4 z-50 animate-slideInRight md:animate-slideInUp">
            <div className="bg-[#111] border border-green-500/30 rounded-lg p-3 shadow-[0_0_20px_rgba(0,255,0,0.1)] flex items-center gap-3 max-w-[300px] backdrop-blur-md">
                <div className="bg-green-500/20 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0 border border-green-500/30">
                    <ShieldCheck size={20} className="text-green-500" />
                </div>
                <div className="flex flex-col text-left">
                    <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wide">Acabou de comprar</span>
                    <span className="text-sm font-bold text-white leading-tight">{name}</span>
                    <div className="flex items-center gap-1 mt-0.5">
                        <CheckCircle2 size={10} className="text-green-500" />
                        <span className="text-[9px] text-green-500">Verificado pelo Sistema</span>
                    </div>
                </div>
            </div>
        </div>
    );
};