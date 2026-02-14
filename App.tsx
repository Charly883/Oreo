import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TimeDiff, FloatingHeart, TreeHeart } from './types';

const START_DATE = new Date("2025-12-10T00:00:00");

const BADTZ_IMG = "https://i.ibb.co/ksTF4RPK/d5452c3db4bb387382eab869fe55f493-2.jpg";
const KUROMI_IMG = "https://i.ibb.co/3y0BSHsB/d5452c3db4bb387382eab869fe55f493-3.jpg";

const App: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [time, setTime] = useState<TimeDiff>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const [treeHearts, setTreeHearts] = useState<TreeHeart[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const heartCounter = useRef(0);

  const mainMessage = `Si pudiera elegir un refugio eterno, siempre sería a tu lado, mi cielo.
Gracias por llegar a mi vida y convertir lo cotidiano en algo hermoso.
Desde que estás, mis días tienen más luz, más sentido y más alegría.
Sos esa calma que abrazo incluso cuando no estás cerca,
la razón por la que sonrío sin darme cuenta.
Feliz San Valentín, mi cielo.
Te quiero muchísimo, sos mi felicidad. 💜`;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const diff = Math.abs(now.getTime() - START_DATE.getTime());
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    const interval = setInterval(() => {
      const id = ++heartCounter.current;
      setFloatingHearts(prev => [...prev, { id, x: Math.random() * 100, emoji: Math.random() > 0.7 ? "💜" : "✨" }]);
      setTimeout(() => setFloatingHearts(prev => prev.filter(h => h.id !== id)), 6000);
    }, 800);
    return () => clearInterval(interval);
  }, [hasStarted]);

  const generateTree = useCallback(() => {
    const newHearts: TreeHeart[] = [];
    const count = 320; 
    for (let i = 0; i < count; i++) {
      let x, y, isInside = false;
      while (!isInside) {
        const tx = (Math.random() * 40) - 20;
        const ty = (Math.random() * 40) - 26;
        const nx = tx / 13;
        const ny = -ty / 13;
        const heartVal = Math.pow(nx * nx + ny * ny - 1, 3) - nx * nx * ny * ny * ny;
        if (heartVal <= 0.01) { 
          x = tx; y = ty;
          isInside = true;
        }
      }
      const left = 50 + x! * 2.3;
      const top = 38 + y! * 2.3;
      const palette = ["bg-purple-600", "bg-purple-500", "bg-purple-400", "bg-indigo-500", "bg-violet-400", "bg-fuchsia-600"];
      newHearts.push({
        id: i,
        top: `${top}%`,
        left: `${left}%`,
        color: palette[Math.floor(Math.random() * palette.length)],
        delay: 200 + (Math.random() * 1800), 
      });
    }
    setTreeHearts(newHearts);
  }, []);

  const handleStart = () => {
    setHasStarted(true);
    generateTree();
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden bg-ethereal">
      <div className="absolute inset-0 pointer-events-none">
        {floatingHearts.map(h => (
          <div key={h.id} className="absolute bottom-0 animate-float text-lg" style={{ left: `${h.x}%` }}>{h.emoji}</div>
        ))}
      </div>

      {!hasStarted ? (
        <div className="relative z-50 text-center animate-in fade-in zoom-in duration-1000">
          <h1 className="text-8xl font-signature text-purple-700 mb-2 drop-shadow-md">Eli</h1>
          <p className="font-subtle-serif italic text-2xl text-purple-400 mb-12 tracking-widest">Un suspiro de Carlos</p>
          <div className="flex justify-center items-end space-x-6 mb-12">
             <div className="p-1 bg-white rounded-3xl shadow-lg border-4 border-purple-50 rotate-[-8deg] animate-bounce-slow overflow-hidden">
                <img src={KUROMI_IMG} className="w-28 h-28 object-cover rounded-2xl" alt="Kuromi" />
             </div>
             <div className="p-1 bg-white rounded-3xl shadow-lg border-4 border-purple-50 rotate-[8deg] animate-bounce-slow-delayed overflow-hidden">
                <img src={BADTZ_IMG} className="w-28 h-28 object-cover rounded-2xl" alt="Badtz" />
             </div>
          </div>
          <button
            onClick={handleStart}
            className="border border-purple-200 text-purple-600 px-12 py-3 rounded-full font-light tracking-[0.2em] hover:bg-purple-50 transition-all uppercase text-sm shadow-sm backdrop-blur-sm"
          >
            Entrar al jardín
          </button>
        </div>
      ) : (
        <>
          <div className="relative z-30 w-full max-w-[95%] sm:max-w-4xl glass-card p-6 sm:p-10 rounded-[40px] flex flex-row items-center gap-4 sm:gap-8 animate-in slide-in-from-bottom-12 duration-1000 border border-white/40 shadow-2xl">
            <div className="w-[45%] flex flex-col justify-center space-y-4 sm:space-y-6 pr-4 border-r border-purple-100/30">
              <div className="flex items-center space-x-3 mb-2">
                 <img src={KUROMI_IMG} className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-full border-2 border-white shadow-sm -rotate-6 animate-pulse-slow" alt="K" />
                 <span className="text-purple-300 text-xl font-signature">siempre juntos</span>
                 <img src={BADTZ_IMG} className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-full border-2 border-white shadow-sm rotate-6 animate-pulse-slow" alt="B" />
              </div>
              <h2 className="text-3xl sm:text-5xl font-subtle-serif italic text-purple-800 leading-tight">Para mi Gatitos</h2>
              <p className="text-purple-900 text-sm sm:text-base font-subtle-serif leading-relaxed italic opacity-90 select-text whitespace-pre-wrap">"{mainMessage}"</p>
              <div className="pt-4 mt-auto">
                <p className="text-[11px] leading-tight text-purple-400 font-bold mb-2 italic">
                  Mis sentimientos por vos llevan y quiero que sigan creciendo:
                </p>
                <div className="text-purple-700 font-subtle-serif text-xl sm:text-3xl tabular-nums drop-shadow-sm">
                  {time.days}d {time.hours}h {time.minutes}m {time.seconds}s
                </div>
              </div>
            </div>

            <div className="w-[55%] relative flex items-center justify-center min-h-[350px] sm:min-h-[450px]">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 200">
                 <path d="M100,190 Q100,165 100,145" stroke="#4a2c2a" strokeWidth="6" fill="none" strokeLinecap="round" className="branch-path opacity-40" />
              </svg>
              <div className="absolute inset-0">
                {treeHearts.map(heart => (
                  <div
                    key={heart.id}
                    onClick={() => setIsModalOpen(true)}
                    className={`absolute heart-shape ${heart.color} cursor-pointer opacity-0 transition-all duration-1000 hover:scale-[2.5] z-20`}
                    style={{
                      top: heart.top,
                      left: heart.left,
                      animation: `heartbeat ${3 + Math.random()}s infinite ease-in-out`,
                      animationDelay: `${heart.delay}ms`,
                      transitionDelay: `${heart.delay}ms`,
                      opacity: 0.95
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] sm:w-[480px] z-[60] flex flex-col items-center group">
            <div className="mb-4 text-center">
               <p className="text-purple-700 font-signature text-6xl mb-1 drop-shadow-md animate-soft-glow">Esta canción es para vos</p>
               <div className="flex items-center justify-center space-x-3 opacity-80">
                 <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-purple-300"></span>
                 <p className="text-purple-400 font-subtle-serif italic text-xs uppercase tracking-[0.5em] glow-text">Solo para ti, mi niña 💜</p>
                 <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-purple-300"></span>
               </div>
            </div>
            <div className="w-full bg-white/30 backdrop-blur-3xl rounded-[38px] p-2 border border-white/60 shadow-[0_20px_60px_rgba(150,100,200,0.2)] transition-all duration-700 group-hover:scale-[1.05] group-hover:shadow-[0_25px_80px_rgba(150,100,200,0.35)] group-hover:bg-white/40">
              <iframe
                className="rounded-[30px] shadow-inner"
                src="https://open.spotify.com/embed/track/6uUYmvgx6MDIK52vrcELU2?utm_source=generator&theme=0"
                width="100%" height="80" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              ></iframe>
            </div>
          </div>
        </>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-purple-950/20 backdrop-blur-md" onClick={() => setIsModalOpen(false)}>
          <div className="w-full max-w-sm bg-white/95 rounded-[40px] p-10 shadow-3xl animate-in zoom-in duration-300 text-center border border-white" onClick={e => e.stopPropagation()}>
            <h3 className="text-5xl font-signature text-purple-700 mb-6">Eli</h3>
            <p className="text-purple-900 font-subtle-serif italic text-2xl leading-relaxed">
              "Cada pequeño corazón en este árbol representa un segundo que he pasado pensando en ti."
            </p>
            <button onClick={() => setIsModalOpen(false)} className="mt-10 text-purple-400 font-light tracking-widest uppercase text-xs hover:text-purple-600 transition-colors">Cerrar</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1) rotate(45deg); }
          50% { transform: scale(1.18) rotate(45deg); }
        }
        @keyframes soft-glow {
          0%, 100% { text-shadow: 0 0 15px rgba(168, 85, 247, 0.2); transform: scale(1); }
          50% { text-shadow: 0 0 30px rgba(168, 85, 247, 0.6), 0 0 45px rgba(168, 85, 247, 0.3); transform: scale(1.02); }
        }
        .animate-soft-glow { animation: soft-glow 4s infinite ease-in-out; }
        .animate-bounce-slow { animation: bounce 5s infinite ease-in-out; }
        .animate-bounce-slow-delayed { animation: bounce 5s infinite ease-in-out 2.5s; }
        .animate-pulse-slow { animation: pulse 6s infinite ease-in-out; }
        .glow-text { text-shadow: 0 0 8px rgba(168, 85, 247, 0.4); }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
};

export default App;