import React, { useState, useEffect } from 'react';
import { 
    MapPin, MessageSquare, Loader2, Signal, Battery, 
    Wifi, AlertOctagon, Smartphone, Lock, CreditCard, 
    Users, CheckCircle2, Star, ChevronRight, ShieldCheck, Globe 
} from 'lucide-react';
import { Button } from '../components/Button';
import { Coords } from '../types';

export const PageThree: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'gps' | 'chat'>('gps');
    const [scanning, setScanning] = useState(true);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
    const [userIp, setUserIp] = useState<string>("Rastreando IP...");
    
    const [protectingCount, setProtectingCount] = useState(14832);

    // Coordinates state (Defaults to São Paulo generic if all fails)
    const [coords, setCoords] = useState<Coords>({ lat: -23.5505, lng: -46.6333 });

    useEffect(() => {
        const interval = setInterval(() => {
            // Add 1 person every 12 seconds
            setProtectingCount(prev => prev + 1);
        }, 12000);

        return () => clearInterval(interval);
    }, []);

    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(prev => prev > 0 ? prev - 1 : 0), 1000);
        return () => clearInterval(timer);
    }, []);

    // Location Fetching Logic - Aggressive Mode (IP + GPS High Accuracy)
    useEffect(() => {
        let isMounted = true;
        const startTime = Date.now();
        const MIN_ANIMATION_TIME = 2500; 

        const stopScanning = () => {
            if (!isMounted) return;
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, MIN_ANIMATION_TIME - elapsed);
            
            setTimeout(() => {
                if (isMounted) setScanning(false);
            }, remaining);
        };

        // 1. Fetch IP Data immediately (Fast fallback + IP Display)
        const fetchIpData = async () => {
            try {
                // Primary IP Service
                const response = await fetch('https://ipapi.co/json/');
                if (response.ok) {
                    const data = await response.json();
                    if (isMounted) {
                        if (data.ip) setUserIp(data.ip);
                        // Set rough location immediately so map isn't empty/generic
                        if (data.latitude && data.longitude) {
                            // Only update if we don't have a high-precision GPS lock yet
                            setCoords(prev => {
                                // Simple check to see if we are still on default coordinates
                                if (prev.lat === -23.5505) {
                                    return { lat: data.latitude, lng: data.longitude };
                                }
                                return prev;
                            });
                        }
                    }
                } else {
                    throw new Error("Primary IP API failed");
                }
            } catch (error) {
                // Secondary IP Service
                try {
                    const resBackup = await fetch('https://ipwho.is/');
                    const dataBackup = await resBackup.json();
                    if (isMounted && dataBackup.success) {
                        setUserIp(dataBackup.ip);
                        if (dataBackup.latitude && dataBackup.longitude) {
                             setCoords(prev => {
                                if (prev.lat === -23.5505) {
                                    return { lat: dataBackup.latitude, lng: dataBackup.longitude };
                                }
                                return prev;
                            });
                        }
                    }
                } catch (e) {
                    console.log("All IP fetches failed");
                    if (isMounted) setUserIp("192.168.15.10"); // Fallback mock IP
                }
            }
        };

        // 2. Browser Geolocation (The "Exact" Location)
        const fetchPreciseLocation = () => {
            if (!navigator.geolocation) {
                stopScanning();
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Success! We have exact hardware location
                    if (isMounted) {
                        console.log("Precision GPS Locked");
                        setCoords({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        });
                        stopScanning();
                    }
                },
                (error) => {
                    console.warn("GPS Access Denied or Error", error);
                    // We rely on the IP location we hopefully fetched by now
                    stopScanning();
                },
                {
                    enableHighAccuracy: true, // CRITICAL: Forces GPS/Wi-Fi triangulation
                    timeout: 15000,           // Wait up to 15s for high precision
                    maximumAge: 0             // Do not use cached positions
                }
            );
        };

        // Run both in parallel
        fetchIpData();
        fetchPreciseLocation();

        return () => { isMounted = false; };
    }, []);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleBuy = () => {
        const btn = document.getElementById('activate-btn');
        if (btn) {
            btn.setAttribute('disabled', 'true');
            btn.innerText = 'REDIRECIONANDO...';
        }
        window.location.href = 'https://checkout.olhodigital-pagueseguro.shop/VCCL1O8SCMA1';
    };

    return (
        <div className="min-h-screen w-full bg-[#050505] text-gray-200 font-sans overflow-x-hidden pb-10">
        
        {/* --- TOP BAR SYSTEM STATUS --- */}
        <div className="w-full bg-[#0a0a0a] border-b border-white/10 p-2 flex justify-between items-center text-[10px] md:text-xs font-mono text-gray-500 fixed top-16 z-30 backdrop-blur-md bg-opacity-90">
            <div className="flex gap-4">
                <span className="flex items-center gap-1 text-green-500"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> SISTEMA ONLINE</span>
            </div>
            <div className="text-red-500 animate-pulse font-bold tracking-widest">
                OFERTA EXPIRA EM: {formatTime(timeLeft)}
            </div>
        </div>

        {/* Reduced padding-top from pt-32 to pt-20 to decrease space below header */}
        <div className="max-w-7xl mx-auto px-4 pt-20">
            
            {/* --- HEADER --- */}
            <div className="text-center mb-12 max-w-5xl mx-auto">
                
                <h1 className="text-3xl md:text-5xl font-sans font-black text-white mb-6 leading-tight tracking-tight">
                    JÁ PENSOU EM VER MENSAGENS E LOCALIZAÇÃO DE <br className="hidden md:block"/>
                    <span className="text-green-500 drop-shadow-[0_0_25px_rgba(34,197,94,0.6)]">SEU FILHO (A) EM TEMPO REAL?</span>
                </h1>
                
                <div className="max-w-3xl mx-auto mt-8 px-4">
                    <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed tracking-wide drop-shadow-md">
                        Aqui esta um <span className="text-red-600 font-bold">EXEMPLO</span> de como estaria a localização do seu filho (a) pelo aplicativo de monitoramento.
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">

                {/* --- LEFT COLUMN: THE SIMULATION DASHBOARD --- */}
                <div className="lg:col-span-7 space-y-6">
                    
                    {/* THE "COMMAND CENTER" CONTAINER */}
                    <div className="bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden shadow-2xl relative group">
                        
                        {/* Dashboard Tabs */}
                        <div className="flex border-b border-white/5 bg-[#141414]">
                            <button 
                                onClick={() => setActiveTab('gps')}
                                className={`flex-1 p-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${activeTab === 'gps' ? 'bg-white/5 text-blue-400 border-b-2 border-blue-500' : 'text-gray-500 hover:text-white'}`}
                            >
                                <MapPin size={16} /> Rastreamento GPS
                            </button>
                            <button 
                                onClick={() => setActiveTab('chat')}
                                className={`flex-1 p-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${activeTab === 'chat' ? 'bg-white/5 text-green-400 border-b-2 border-green-500' : 'text-gray-500 hover:text-white'}`}
                            >
                                <MessageSquare size={16} /> Espião de Chat
                            </button>
                        </div>

                        {/* DASHBOARD CONTENT AREA */}
                        <div className="h-[400px] relative bg-black">
                            
                            {/* OVERLAY: SCANNING EFFECT */}
                            <div className={`absolute inset-0 z-50 bg-black flex flex-col items-center justify-center p-4 text-center transition-opacity duration-700 ${scanning ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                                <Loader2 size={48} className="text-green-500 animate-spin mb-4" />
                                <div className="text-green-500 font-mono text-sm tracking-widest">RASTREANDO SINAL...</div>
                                <div className="text-gray-500 font-mono text-xs mt-2">Triangulando antenas e IP {userIp !== "Rastreando IP..." ? "conectado" : ""}</div>
                                <div className="text-gray-400 font-mono text-[10px] mt-1 animate-pulse opacity-80">
                                    Estabelecendo conexão segura com o dispositivo...
                                </div>
                                <div className="w-64 h-1 bg-gray-800 mt-6 rounded overflow-hidden">
                                    <div className="h-full w-full bg-green-500 animate-shine-loader"></div>
                                </div>
                            </div>

                            {/* TAB 1: GPS MAP SIMULATION */}
                            {activeTab === 'gps' && (
                                <div className={`absolute inset-0 bg-[#0c0c0c] overflow-hidden transition-opacity duration-1000 ${scanning ? 'opacity-0' : 'opacity-100'}`}>
                                    
                                    {/* The Map Frame - Increased Zoom to 18 for Exact Precision */}
                                    <iframe 
                                        width="100%" 
                                        height="100%" 
                                        frameBorder="0" 
                                        scrolling="no" 
                                        src={`https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=17&output=embed&iwloc=near`}
                                        className="opacity-80 hover:opacity-100 transition-all duration-700"
                                        style={{ 
                                            // Matrix/Dark mode filter
                                            filter: 'invert(100%) hue-rotate(180deg) brightness(95%) contrast(110%) saturate(80%)',
                                            width: '100%',
                                            height: '100%',
                                            display: 'block',
                                            border: 'none'
                                        }}
                                        title="User Location Map"
                                    ></iframe>
                                    
                                    {/* Overlay: Grid Lines for "Tech" feel */}
                                    <div className="absolute inset-0 pointer-events-none opacity-20" 
                                        style={{
                                            backgroundImage: 'linear-gradient(#00ff00 1px, transparent 1px), linear-gradient(90deg, #00ff00 1px, transparent 1px)', 
                                            backgroundSize: '100px 100px'
                                        }}>
                                    </div>

                                    {/* Overlay: Pulsing Target Center */}
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
                                        <div className="relative">
                                            <div className="w-16 h-16 border border-red-500/50 rounded-full animate-[ping_2s_linear_infinite] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                                            <div className="w-8 h-8 border border-red-500 rounded-full animate-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500/10"></div>
                                            
                                            {/* Center Dot */}
                                            <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,1)] relative z-20"></div>

                                            {/* Avatar label */}
                                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-red-600/90 backdrop-blur-sm border border-red-500 text-white text-[10px] font-bold px-3 py-1.5 rounded whitespace-nowrap shadow-[0_0_20px_rgba(220,38,38,0.4)] animate-float">
                                                ALVO LOCALIZADO
                                                <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-red-600/90"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-4 right-4 bg-black/90 backdrop-blur border border-white/10 p-3 rounded text-xs font-mono min-w-[160px] shadow-xl z-10">
                                        <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-1">
                                            <span className="text-gray-400">SINAL</span>
                                            <span className="text-green-500 font-bold flex items-center gap-1"><Signal size={10}/> EXCELENTE</span>
                                        </div>
                                        <div className="flex justify-between items-center text-gray-300">
                                            <span className="flex items-center gap-1"><Battery size={10} /> Bateria Alvo</span>
                                            <span className="text-yellow-500 font-bold">14%</span>
                                        </div>
                                        <div className="flex justify-between items-center text-gray-300 mt-1">
                                            <span className="flex items-center gap-1"><Wifi size={10} /> Rede</span>
                                            <span>4G LTE</span>
                                        </div>
                                        {/* Exibição do IP Real */}
                                        <div className="flex justify-between items-center text-gray-300 mt-1 pt-1 border-t border-white/5">
                                            <span className="flex items-center gap-1"><Globe size={10} className="text-blue-400"/> IP</span>
                                            <span className="text-blue-400 font-mono tracking-tighter">{userIp}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TAB 2: CHAT INTERCEPT */}
                            {activeTab === 'chat' && (
                                <div className={`absolute inset-0 bg-[#0c0c0c] flex flex-col p-4 font-mono text-sm transition-opacity duration-500 ${scanning ? 'opacity-0' : 'opacity-100'}`}>
                                    <div className="flex-1 space-y-3 overflow-hidden">
                                        <div className="flex flex-col gap-1 opacity-50">
                                            <span className="text-[10px] text-gray-500">14:20 - WhatsApp</span>
                                            <div className="bg-white/10 self-start p-2 rounded-r-lg rounded-bl-lg max-w-[80%]">Oi, tudo bem?</div>
                                        </div>
                                        <div className="flex flex-col gap-1 opacity-50">
                                            <span className="text-[10px] text-gray-500 text-right">14:21 - WhatsApp</span>
                                            <div className="bg-blue-600/20 text-blue-200 self-end p-2 rounded-l-lg rounded-br-lg max-w-[80%]">Tudo sim e vc?</div>
                                        </div>
                                        <div className="flex flex-col gap-1 animate-pulse">
                                            <span className="text-[10px] text-red-500 font-bold flex items-center gap-1"><AlertOctagon size={10}/> MENSAGEM APAGADA RECUPERADA</span>
                                            <div className="bg-red-900/20 border border-red-500/50 text-red-200 self-start p-2 rounded-r-lg rounded-bl-lg max-w-[90%]">
                                                Me manda uma foto agora? Ninguém vai ver...
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Alert Overlay */}
                                    <div className="mt-4 bg-red-500 text-white p-2 text-center text-xs font-bold uppercase animate-pulse">
                                        ⚠ Palavra-chave "FOTO" detectada
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Feature Highlights Grid */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        {[
                            { title: "Modo Fantasma", desc: "Totalmente invisível no aparelho", icon: <Smartphone size={20} className="text-purple-500"/> },
                            { title: "Keylogger", desc: "Grava tudo que é digitado", icon: <Lock size={20} className="text-yellow-500"/> },
                            { title: "Fotos Remotas", desc: "Acesse a galeria e câmera", icon: <CreditCard size={20} className="text-blue-500"/> },
                            { title: "Histórico Web", desc: "Veja sites visitados (mesmo anônimo)", icon: <Wifi size={20} className="text-green-500"/> },
                        ].map((f, i) => (
                            <div key={i} className="bg-[#0f0f0f] border border-white/5 p-4 rounded-lg flex items-start gap-3 hover:bg-white/5 transition-colors">
                                <div className="mt-1">{f.icon}</div>
                                <div>
                                    <h4 className="font-bold text-white text-sm">{f.title}</h4>
                                    <p className="text-gray-500 text-xs leading-tight mt-1">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                {/* --- RIGHT COLUMN: THE ACTIVATION CARD --- */}
                <div className="lg:col-span-5 relative">
                    <div className="sticky top-28 group">
                        
                        {/* COUNTER */}
                        <div className="flex justify-center mb-8">
                            <div className="flex flex-col items-center justify-center gap-2 bg-white/5 px-4 py-4 rounded border border-white/10 backdrop-blur-sm animate-slideInUp w-full text-center">
                                <div className="flex items-center gap-2">
                                    <Users size={16} className="text-green-500" />
                                    <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">Pais protegendo seus filhos</span>
                                </div>
                                <span className="text-2xl font-mono font-bold text-white tabular-nums tracking-widest text-shadow-green">
                                    {protectingCount.toLocaleString('pt-BR')}
                                </span>
                            </div>
                        </div>

                        {/* Pulsing Border Effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-b from-green-500 to-emerald-900 rounded-2xl blur opacity-30 animate-pulse group-hover:opacity-50 transition duration-500 mt-0"></div>

                        <div className="relative bg-[#111] border border-green-500/20 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col">
                            
                            {/* Header Badge */}
                            <div className="bg-gradient-to-r from-green-900/40 to-black p-4 border-b border-white/10 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="bg-green-500 p-1 rounded-full">
                                        <CheckCircle2 size={12} className="text-black fill-current" />
                                    </div>
                                    <span className="text-green-500 font-bold text-xs uppercase tracking-wider">Acesso Vitalício Liberado</span>
                                </div>
                                <div className="flex gap-1">
                                    {[1,2,3,4,5].map(s => <Star key={s} size={10} className="fill-yellow-500 text-yellow-500"/>)}
                                </div>
                            </div>

                            {/* Price Section */}
                            <div className="p-8 pb-4 text-center bg-[#0a0a0a]">
                                <p className="text-gray-500 text-sm font-medium mb-1 uppercase tracking-wide">De <span className="line-through decoration-red-500 decoration-2">R$ 97,00</span> por apenas:</p>
                                
                                <div className="flex items-end justify-center gap-1 text-white mb-4">
                                    <span className="text-3xl font-light text-gray-500 mb-2">R$</span>
                                    <span className="text-7xl font-heading font-bold text-white tracking-tighter drop-shadow-xl">27</span>
                                    <div className="flex flex-col text-left leading-none mb-2">
                                        <span className="text-2xl font-bold">,90</span>
                                    </div>
                                </div>
                                
                                <div className="inline-block bg-green-500/10 border border-green-500/30 rounded px-3 py-1">
                                    <span className="text-green-500 text-xs font-bold uppercase tracking-wide">Pagamento Único • Sem Mensalidades</span>
                                </div>
                            </div>

                            {/* Checklist Section */}
                            <div className="px-8 py-4 bg-[#0f0f0f] border-t border-b border-white/5 space-y-3">
                                {[
                                    "Monitoramento de WhatsApp & Insta",
                                    "Localização GPS em Tempo Real",
                                    "Acesso à Câmera e Microfone",
                                    "Permissão para baixar aplicativos no celular do seu filho (a)",
                                    "Monitoramento de mensagens de jogos online"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                                        <div className="bg-green-500/20 p-1 rounded-full shrink-0">
                                            <CheckCircle2 size={14} className="text-green-500" />
                                        </div>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Action Area */}
                            <div className="p-6 bg-[#0a0a0a] space-y-4">
                                <Button 
                                    id="activate-btn"
                                    onClick={handleBuy} 
                                    variant="success" 
                                    className="w-full h-16 text-lg font-bold shadow-[0_0_30px_rgba(34,197,94,0.15)] hover:shadow-[0_0_50px_rgba(34,197,94,0.3)] border border-green-500/50"
                                    icon={false}
                                >
                                    <span className="flex items-center justify-center gap-3">
                                        <CreditCard size={24} className="stroke-[2.5]" />
                                        IR PARA PAGAMENTO
                                        <ChevronRight size={20} className="opacity-50" />
                                    </span>
                                </Button>

                                {/* Trust Badges */}
                                <div className="flex flex-col items-center gap-3 pt-2">
                                    <div className="flex items-center gap-2 text-[10px] text-gray-500">
                                        <ShieldCheck size={12} className="text-green-500" />
                                        <span>Ambiente Seguro</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
        </div>
    );
};