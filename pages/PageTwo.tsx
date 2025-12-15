import React, { useState, useEffect } from 'react';
import { Unlock, Signal, Wifi, Battery } from 'lucide-react';
import { Button } from '../components/Button';
import { NotificationSim } from '../components/NotificationSim';
import { PageProps } from '../types';

export const PageTwo: React.FC<PageProps> = ({ onNext }) => {
    const [step, setStep] = useState(0);

    const handleClick = () => {
        if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', 'AddToWishlist');
        }
        onNext();
    };

    useEffect(() => {
        const sequence = [
            setTimeout(() => setStep(1), 500),  // Show Roblox
            setTimeout(() => setStep(2), 2000), // Show Insta
            setTimeout(() => setStep(3), 3500), // Show WhatsApp
            setTimeout(() => setStep(4), 4500), // Show Button
        ];
        return () => sequence.forEach(t => clearTimeout(t));
    }, []);

    return (
        <div className="flex flex-col items-center min-h-screen py-12 px-4 max-w-6xl mx-auto w-full">
        
        <div className="text-center mb-12">
            <div className="inline-block bg-neutral-900 border border-neutral-800 rounded px-3 py-1 mb-4">
                <span className="text-red-500 font-mono text-sm tracking-widest animate-pulse">● INTERCEPTANDO DADOS...</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4 text-white uppercase">
            ISSO É O QUE ACONTECE <span className="text-red-600">TODOS OS DIAS</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
                Simulações baseadas em milhões de casos reais reportados em 2025.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center w-full items-start">
            
            {/* Left Side: Phone Simulation - iPhone Style */}
            <div className="relative mx-auto w-full max-w-[340px] md:sticky md:top-24 z-10">
                {/* Ambient Glow */}
                <div className="absolute inset-0 bg-red-600/20 blur-[80px] rounded-full transform scale-90 -z-10"></div>
                
                {/* Chassis Outer Frame (Metallic Look) */}
                <div className="relative bg-[#1a1a1a] rounded-[55px] shadow-[0_0_0_8px_#1f1f1f,0_0_0_10px_#000,0_30px_60px_rgba(0,0,0,0.8)] border border-neutral-800">
                    
                    {/* Side Buttons */}
                    <div className="absolute top-28 -left-[11px] w-[3px] h-7 bg-[#2a2a2a] rounded-l-sm border-l border-white/10"></div> {/* Mute */}
                    <div className="absolute top-40 -left-[11px] w-[3px] h-14 bg-[#2a2a2a] rounded-l-sm border-l border-white/10"></div> {/* Vol Up */}
                    <div className="absolute top-56 -left-[11px] w-[3px] h-14 bg-[#2a2a2a] rounded-l-sm border-l border-white/10"></div> {/* Vol Down */}
                    <div className="absolute top-44 -right-[11px] w-[3px] h-20 bg-[#2a2a2a] rounded-r-sm border-r border-white/10"></div> {/* Power */}

                    {/* Bezel & Screen Container */}
                    <div className="m-[10px] bg-black rounded-[46px] overflow-hidden relative h-[680px] border-[6px] border-black ring-1 ring-white/5">
                        
                        {/* Dynamic Island */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[110px] h-[30px] bg-black rounded-full z-30 flex items-center justify-center">
                        {/* Camera reflection hint */}
                        <div className="absolute right-4 w-2 h-2 rounded-full bg-[#111] ring-1 ring-white/5"></div>
                        </div>

                        {/* Status Bar */}
                        <div className="absolute top-3 w-full px-6 flex justify-between items-center z-20 text-white text-[12px] font-medium tracking-tight">
                            <span className="pl-2">19:42</span>
                            <div className="flex items-center gap-1.5 pr-2">
                                <Signal size={12} fill="white" />
                                <Wifi size={12} />
                                <Battery size={14} fill="white" />
                            </div>
                        </div>

                        {/* Wallpaper & Content */}
                        <div className="h-full w-full bg-[#050505] flex flex-col justify-center space-y-4 pt-16 px-3 relative z-10">
                            
                            {/* Subtle Wallpaper Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-black opacity-40 -z-10"></div>

                            <div className={`transition-all duration-700 transform ${step >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <NotificationSim 
                                    app="roblox"
                                    sender="Gamer_Dark12"
                                    message="Me manda aquela foto que te pedi? Prometo te dar skin grátis."
                                    time="2 min atrás"
                                />
                            </div>

                            <div className={`transition-all duration-700 transform ${step >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <NotificationSim 
                                    app="instagram"
                                    sender="Pessoa Desconhecida"
                                    message="Seus pais não precisam saber. Apaga essa mensagem depois de ler, tá?"
                                    time="Agora"
                                />
                            </div>

                            <div className={`transition-all duration-700 transform ${step >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <NotificationSim 
                                    app="whatsapp"
                                    sender="Número Desconhecido"
                                    message="Tô aqui na frente da sua escola. Vem aqui fora..."
                                    time="Agora mesmo"
                                />
                            </div>

                        </div>

                        {/* Screen Reflections */}
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 via-transparent to-transparent pointer-events-none z-20"></div>
                        
                        {/* Home Indicator */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/20 rounded-full z-30 backdrop-blur-sm"></div>
                    </div>
                </div>
            </div>

            {/* Right Side: Text & CTA */}
            <div className="flex flex-col justify-center text-left pt-12 md:pt-24">
                <div className="space-y-8">
                    <div className={`transition-all duration-500 delay-100 ${step >= 1 ? 'opacity-100 translate-x-0' : 'opacity-20 -translate-x-4'}`}>
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <Unlock size={20} className="text-red-500" />
                            Aliciamento em Jogos
                        </h3>
                        <p className="text-gray-400 text-sm border-l-2 border-red-900 pl-4">
                            Eles usam a moeda do jogo para comprar a confiança e pedir fotos íntimas.
                        </p>
                    </div>

                    <div className={`transition-all duration-500 delay-300 ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-20 -translate-x-4'}`}>
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <Unlock size={20} className="text-red-500" />
                            Conversas Secretas
                        </h3>
                        <p className="text-gray-400 text-sm border-l-2 border-red-900 pl-4">
                            Apps de mensagens temporárias apagam as provas antes que você veja.
                        </p>
                    </div>

                    <div className={`transition-all duration-500 delay-500 ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="bg-red-900/20 border border-red-500/30 p-6 rounded-lg mb-8">
                            <p className="text-red-400 font-bold font-heading text-lg uppercase mb-1">Diagnóstico:</p>
                            <p className="text-gray-200">Seu filho está a <span className="text-white underline decoration-red-500 underline-offset-4">um clique</span> de um perigo real.</p>
                        </div>

                        <Button onClick={handleClick} variant="danger" className="w-full shadow-xl">
                            PROTEGER MEU FILHO AGORA
                        </Button>
                    </div>
                </div>
            </div>

        </div>
        </div>
    );
};