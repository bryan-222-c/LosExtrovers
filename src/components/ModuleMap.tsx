import React, { useState, useEffect } from 'react';
import { OTHER_MODULES } from '../questions';
import { User, isMasterUser } from '../types';
import { TransparentImage } from './TransparentImage';
import mapaImg from '../assets/images/mapa_principal_extrovers_1784053523801.jpg';
import novaImg from '../assets/images/nova_original_1784053505415.jpg';
import { 
  Lock, 
  Unlock, 
  FileCheck2, 
  Coins, 
  Compass, 
  Activity, 
  Zap, 
  Flame, 
  Waves, 
  Cpu, 
  ArrowRight, 
  Sparkles, 
  Orbit, 
  MapPin, 
  Rocket, 
  ShieldAlert,
  ChevronRight,
  Sparkle,
  Crown,
  Lightbulb,
  Frown
} from 'lucide-react';

interface ModuleMapProps {
  user: User;
  onSelectModule: (moduleId: number) => void;
}

// Custom animated component rendering the official 'Nova' image asset with expressive visual enhancements and adjustable size
export function NovaAvatar({ 
  animation, 
  size = 'medium' 
}: { 
  animation: string; 
  size?: 'small' | 'medium' | 'large' | 'xl';
}) {
  let animClass = "nova-anim-idle";
  if (animation === 'walk') animClass = "nova-anim-walk";
  if (animation === 'jump') animClass = "nova-anim-jump";
  if (animation === 'celebrate') animClass = "nova-anim-celebrate";
  if (animation === 'think') animClass = "nova-anim-think";
  if (animation === 'perder') animClass = "nova-anim-perder";
  if (animation === 'ganar') animClass = "nova-anim-ganar";

  // Size Tailwind mappings
  let sizeClass = "w-18"; // default larger medium (increased from w-14)
  if (size === 'small') sizeClass = "w-14";
  if (size === 'large') sizeClass = "w-24";
  if (size === 'xl') sizeClass = "w-28";

  // Shadow glow customization per animation
  let shadowClass = "drop-shadow-[0_4px_12px_rgba(34,211,238,0.55)]";
  if (animation === 'ganar' || animation === 'celebrate') {
    shadowClass = "drop-shadow-[0_0_15px_rgba(234,179,8,0.85)] scale-105";
  } else if (animation === 'perder') {
    shadowClass = "drop-shadow-[0_2px_6px_rgba(59,130,246,0.35)] grayscale-[35%] contrast-95 saturate-75";
  } else if (animation === 'think') {
    shadowClass = "drop-shadow-[0_4px_12px_rgba(168,85,247,0.55)]";
  }

  return (
    <div className="relative flex flex-col items-center select-none pointer-events-none transition-all duration-300">
      {/* 1. THINKING EXPRESSION: Glowing question bubble & lightbulb idea */}
      {animation === 'think' && (
        <>
          {/* Glowing lightbulb on the left */}
          <div className="absolute -top-7 -left-1 flex items-center justify-center bg-slate-950/90 border border-amber-500/40 p-1 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.6)] animate-pulse z-10">
            <Lightbulb className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          </div>
          {/* Floating question bubble */}
          <div className="absolute -top-6 -right-1 bg-slate-900/95 text-cyan-400 border border-cyan-500/40 font-mono font-black text-[10px] px-1.5 py-0.5 rounded-full shadow-lg animate-bounce z-10 flex items-center gap-0.5">
            <span>🤔</span>
            <span>?</span>
          </div>
        </>
      )}

      {/* 2. WIN / CELEBRATE EXPRESSION: Golden sparkles, Winner Crown, energy burst aura */}
      {(animation === 'ganar' || animation === 'celebrate') && (
        <>
          {/* Radiant Crown centered above head */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center justify-center z-10 animate-bounce">
            <Crown className="w-5 h-5 text-amber-300 fill-amber-300/40 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
          </div>
          {/* Star particles popping */}
          <div className="absolute -top-4 -left-3 text-yellow-300 animate-[spin_2s_linear_infinite] z-10">
            <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
          </div>
          <div className="absolute -top-2 -right-3 text-yellow-300 animate-[spin_3s_linear_infinite] z-10">
            <Sparkle className="w-3.5 h-3.5 text-amber-400" />
          </div>
          {/* Victory energy ring behind him */}
          <div className="absolute inset-0 bg-amber-400/10 border border-amber-400/25 rounded-full animate-ping scale-75 opacity-20" />
        </>
      )}

      {/* 3. LOSE / PERDER EXPRESSION: Sad cloud, sweat drops, dizzy spirals */}
      {animation === 'perder' && (
        <>
          {/* Rain / Sweat drop cloud */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center justify-center bg-slate-950/90 border border-blue-500/30 px-1.5 py-0.5 rounded-full shadow-lg z-10 animate-bounce">
            <Frown className="w-3.5 h-3.5 text-blue-400" />
          </div>
          {/* Dizzy spirals */}
          <div className="absolute top-2 -right-2 text-blue-300 animate-[spin_4s_linear_infinite] z-10 bg-slate-950/80 rounded-full border border-blue-800/30 p-0.5">
            <span className="text-[10px] block leading-none">💫</span>
          </div>
          <div className="absolute top-4 -left-2 text-blue-400/80 animate-[bounce_1.5s_infinite] z-10 text-[10px]">
            💧
          </div>
        </>
      )}

      {/* 4. WALKING: Small speed streaks */}
      {animation === 'walk' && (
        <div className="absolute -bottom-1 -left-3 flex gap-0.5 z-10 opacity-70">
          <span className="w-1.5 h-1.5 bg-cyan-400/30 rounded-full animate-ping" />
          <span className="w-1 h-1 bg-cyan-400/20 rounded-full animate-ping [animation-delay:0.2s]" />
        </div>
      )}

      {/* Official Nova Character Image with proportional sizing and shadow */}
      <TransparentImage 
        src={novaImg || "/nova_original.jpg"} 
        alt="Nova - Superhéroe" 
        className={`${sizeClass} h-auto select-none pointer-events-none transition-all duration-300 ${shadowClass} ${animClass}`}
      />
      {/* Interactive landing shadow base */}
      <div className={`absolute -bottom-1 w-10 h-2.5 rounded-full blur-xs animate-pulse transition-all duration-300 ${
        animation === 'perder' ? 'bg-blue-500/20 w-8' : 
        animation === 'ganar' || animation === 'celebrate' ? 'bg-amber-500/40 w-11' : 'bg-cyan-500/35'
      }`} />
    </div>
  );
}

export default function ModuleMap({ user, onSelectModule }: ModuleMapProps) {
  // Free Mode option to unlock all modules immediately, or sequential mode following their progress
  const [freeMode, setFreeMode] = useState<boolean>(false);
  const [hoveredModule, setHoveredModule] = useState<number | null>(null);
  const [dialogText, setDialogText] = useState<string | null>(null);

  // Subtitles inspired by your beautiful boardgame concept
  const getSubTitleForModule = (id: number) => {
    switch (id) {
      case 1: return "La Sabiduría y el Movimiento";
      case 2: return "La Fuerza del Guerrero Cósmico";
      case 3: return "El Aliento de los Astros";
      case 4: return "El Eco de los Espíritus";
      case 5: return "El Corazón del Fuego Primordial";
      default: return "Conocimiento del Multiverso";
    }
  };

  // Return background gradient classes for each planet to give them a distinctive celestial flavor
  const getPlanetGradient = (id: number, active: boolean) => {
    if (!active) return "from-slate-700/80 to-slate-800/80 border-slate-600/40 text-slate-500 shadow-inner";
    switch (id) {
      case 1: // Emerald Green
        return "from-emerald-400 via-teal-500 to-cyan-600 border-emerald-300 shadow-emerald-500/20";
      case 2: // Amber/Yellow
        return "from-amber-400 via-yellow-500 to-orange-600 border-amber-300 shadow-amber-500/20";
      case 3: // Rose/Fire Red
        return "from-rose-400 via-pink-500 to-red-600 border-rose-300 shadow-rose-500/20";
      case 4: // Sky Blue
        return "from-sky-400 via-blue-500 to-indigo-600 border-sky-300 shadow-sky-500/20";
      case 5: // Purple/Cpu Indigo
        return "from-purple-400 via-fuchsia-500 to-violet-600 border-purple-300 shadow-purple-500/20";
      default:
        return "from-indigo-400 to-purple-600 border-indigo-300";
    }
  };

  const renderModuleIcon = (iconName: string, active: boolean, sizeCls = "w-7 h-7") => {
    const cls = `${sizeCls} ${active ? 'text-white drop-shadow' : 'text-slate-500'}`;
    switch (iconName) {
      case 'Activity': return <Activity className={cls} />;
      case 'Zap': return <Zap className={cls} />;
      case 'Flame': return <Flame className={cls} />;
      case 'Waves': return <Waves className={cls} />;
      case 'Cpu': return <Cpu className={cls} />;
      default: return <Compass className={cls} />;
    }
  };

  // Coordinates of each world to draw the visual boardgame layout pathways.
  // Coordinates are precisely calibrated to overlay the visual platforms on "mapa_principal_extrovers.png"
  const getPlanetPosition = (id: number) => {
    switch (id) {
      case 1: return { x: 23, y: 62 }; // Bottom-left platform
      case 2: return { x: 75, y: 67 }; // Bottom-right platform
      case 3: return { x: 21, y: 27 }; // Top-left platform
      case 4: return { x: 53, y: 20 }; // Top-center platform
      case 5: return { x: 82, y: 30 }; // Top-right platform
      default: return { x: 23, y: 62 };
    }
  };

  // Helper to determine if a specific module is unlocked based on mode
  const isModuleUnlocked = (moduleId: number) => {
    if (moduleId === 1) return true;
    if (freeMode) return true; // All unlocked in freeMode
    if (isMasterUser(user.username)) return true; // Direct unrestricted access for JOJABRAVO@GMAIL.COM

    // Module 2 requires Module 1 completed (levels 1 to 10 completed)
    const m1Completed = user.completedLevels.filter(id => id >= 1 && id <= 10).length;
    if (moduleId === 2) return m1Completed >= 10;

    // Module 3 requires Module 2 completed (levels 11 to 16 completed)
    const m2Completed = user.completedLevels.filter(id => id >= 11 && id <= 16).length;
    if (moduleId === 3) return m1Completed >= 10 && m2Completed >= 6;

    // Module 4 requires Module 3 completed (levels 17 to 24 completed)
    const m3Completed = user.completedLevels.filter(id => id >= 17 && id <= 24).length;
    if (moduleId === 4) return m1Completed >= 10 && m2Completed >= 6 && m3Completed >= 8;

    // Module 5 requires Module 4 completed (levels 25 to 29 completed)
    const m4Completed = user.completedLevels.filter(id => id >= 25 && id <= 29).length;
    if (moduleId === 5) return m1Completed >= 10 && m2Completed >= 6 && m3Completed >= 8 && m4Completed >= 5;

    return user.moduleUnlocks ? user.moduleUnlocks.includes(moduleId) : false;
  };

  // Calculate levels completed inside a target module
  const getCompletedForModule = (moduleId: number) => {
    if (moduleId === 1) {
      return user.completedLevels.filter(id => id >= 1 && id <= 10).length;
    } else if (moduleId === 2) {
      return user.completedLevels.filter(id => id >= 11 && id <= 16).length;
    } else if (moduleId === 3) {
      return user.completedLevels.filter(id => id >= 17 && id <= 24).length;
    } else if (moduleId === 4) {
      return user.completedLevels.filter(id => id >= 25 && id <= 29).length;
    } else if (moduleId === 5) {
      return user.completedLevels.filter(id => id >= 30 && id <= 34).length;
    }
    return 0;
  };

  const getLevelsCountForModule = (moduleId: number) => {
    const found = OTHER_MODULES.find(m => m.id === moduleId);
    return found ? found.totalLevels : 2;
  };

  // Find user's current maximum active module
  const getCurrentActiveModuleId = () => {
    let maxUnlocked = 1;
    for (let m = 2; m <= 5; m++) {
      if (isModuleUnlocked(m)) {
        maxUnlocked = m;
      }
    }
    return maxUnlocked;
  };

  const activeModuleId = getCurrentActiveModuleId();

  // Character State setup for Nova
  const [novaModuleId, setNovaModuleId] = useState<number>(activeModuleId);
  const [novaAnimation, setNovaAnimation] = useState<'idle' | 'walk' | 'jump' | 'celebrate' | 'think' | 'perder' | 'ganar'>('idle');
  const [novaX, setNovaX] = useState<number>(getPlanetPosition(activeModuleId).x);
  const [novaY, setNovaY] = useState<number>(getPlanetPosition(activeModuleId).y);
  const [novaDialog, setNovaDialog] = useState<string>("¡Hola, cadete! Soy Nova. Estoy listo para que exploremos juntos el multiverso de Bello. ¡Elige un módulo para iniciar la aventura!");

  // Synchronize character placement on active module changes
  useEffect(() => {
    const pos = getPlanetPosition(activeModuleId);
    setNovaX(pos.x);
    setNovaY(pos.y);
    setNovaModuleId(activeModuleId);
  }, [activeModuleId]);

  const handlePlanetClick = (moduleId: number) => {
    if (isModuleUnlocked(moduleId)) {
      if (moduleId === novaModuleId) {
        // If Nova is already sitting on the selected planet, jump/celebrate and go
        setNovaAnimation('celebrate');
        setNovaDialog("¡Perfecto! Sincronizando portales... ¡Entrando a la simulación!");
        setTimeout(() => {
          onSelectModule(moduleId);
        }, 850);
        return;
      }

      // Smooth slide to clicked planet
      setNovaAnimation('walk');
      const targetPos = getPlanetPosition(moduleId);
      setNovaX(targetPos.x);
      setNovaY(targetPos.y);
      setNovaModuleId(moduleId);

      let greetText = "";
      switch (moduleId) {
        case 1:
          greetText = "¡Fascinante! Sincronizando propulsores para 'La Sabiduría del Movimiento'. ¡Estudiaremos cinemática elemental!";
          break;
        case 2:
          greetText = "¡Excelente elección! Siento una gran fuerza de gravedad. ¡Entremos a 'La Fuerza del Guerrero' para dominar la dinámica!";
          break;
        case 3:
          greetText = "¡Fabuloso! 'El Aliento de los Astros' nos espera. ¡Analizaremos energía térmica y calor!";
          break;
        case 4:
          greetText = "¡Escucha esa sintonía! 'El Eco de los Espíritus' oculta ondas acústicas y fenómenos ópticos extraordinarios.";
          break;
        case 5:
          greetText = "¡Fascinante investigación! 'Mecánica de Fluidos y Termodinámica': exploraremos densidad molecular, ebullición según la altura, líneas de tendencia, gases ideales y empuje de Arquímedes.";
          break;
        default:
          greetText = "¡Iniciando secuencia de acoplamiento cuántico!";
      }
      setNovaDialog(greetText);

      setTimeout(() => {
        setNovaAnimation('celebrate');
        setTimeout(() => {
          onSelectModule(moduleId);
          setNovaAnimation('idle');
        }, 850);
      }, 1250);
    } else {
      // Locked alert handling
      setNovaAnimation('think');
      const prevModuleName = OTHER_MODULES.find(m => m.id === moduleId - 1)?.name || "Mundo previo";
      const lockWarning = `¡Alto ahí, cadete estelar! El portal del Módulo de "${OTHER_MODULES.find(m => m.id === moduleId)?.name || 'Módulo'}" está sellado temporalmente. Debes completar absolutamente todos los portales de "${prevModuleName}" para desactivar la seguridad gravitatoria.`;
      
      setNovaDialog(lockWarning);
      setDialogText(
        `El Módulo de Seguridad desactivó esta órbita espacial. Debes completar absolutamente todos los niveles de "${prevModuleName}" para hackear la gravedad de este candado estelar.`
      );
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-100">
      
      {/* Galaxy Flight Status Panel */}
      <div className="bg-slate-900 border-2 border-[#3E7B7B]/30 rounded-3xl p-5 flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl relative overflow-hidden backdrop-blur-md">
        {/* Ambient star particles in background */}
        <div className="absolute right-0 top-0 w-32 h-32 bg-[#3E7B7B]/10 rounded-bl-full pointer-events-none"></div>
        <div className="absolute left-10 top-2 w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-60"></div>
        <div className="absolute right-40 bottom-3 w-1 h-1 bg-teal-300 rounded-full animate-pulse"></div>

        <div className="text-left relative z-10 space-y-1">
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <Orbit className="w-5 h-5 text-teal-400 animate-spin" style={{ animationDuration: '15s' }} />
            CARTA DE VIAJE ESTELAR – LOS EXTROVERS
          </h2>
          <p className="text-xs text-slate-300 font-semibold tracking-wide">
            Piloto principal: <span className="font-mono text-teal-300 text-sm bg-teal-950/80 px-2 py-0.5 rounded border border-teal-500/20">{user.username}</span>
            {isMasterUser(user.username) && (
              <span className="ml-2 inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 text-[10px] font-bold font-mono px-2 py-0.5 rounded border border-amber-400/40 animate-pulse">
                ⭐ ACCESO MAESTRO TOTAL
              </span>
            )}
            {!isMasterUser(user.username) && " — ¡Supera desafíos para desbloquear portales!"}
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 shrink-0 relative z-10 w-full md:w-auto justify-end">
          {/* Unlock Mode Switch */}
          <div className="bg-slate-950/80 text-white px-3 py-1.5 rounded-2xl flex items-center gap-2 border border-slate-800 shadow-md text-xs">
            <span className="font-mono text-[9px] text-slate-400 font-bold uppercase">SEGURIDAD:</span>
            <button
              onClick={() => setFreeMode(!freeMode)}
              className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                freeMode 
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md shadow-emerald-500/15' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {freeMode ? (
                <>
                  <Unlock className="w-3 h-3" /> Modo Libre
                </>
              ) : (
                <>
                  <Lock className="w-3 h-3 text-amber-400" /> Secuencial
                </>
              )}
            </button>
          </div>

          <div className="bg-slate-950/60 px-3 py-1.5 rounded-2xl border border-slate-800 flex items-center gap-2 shadow-sm">
            <Coins className="w-4 h-4 text-amber-400 animate-pulse" />
            <div className="text-left">
              <span className="text-[8px] text-slate-400 block uppercase font-bold tracking-wider">Monedas</span>
              <span className="text-xs font-black text-amber-400 font-mono">{user.coins} 💰</span>
            </div>
          </div>

          <div className="bg-slate-950/60 px-3 py-1.5 rounded-2xl border border-slate-800 flex items-center gap-2 shadow-sm">
            <FileCheck2 className="w-4 h-4 text-teal-400" />
            <div className="text-left">
              <span className="text-[8px] text-slate-400 block uppercase font-bold tracking-wider">Progreso</span>
              <span className="text-xs font-black text-teal-400 font-mono">{user.completedLevels.length}/18 Portales</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Cosmos Game Map - Styled with official "mapa_principal_extrovers" background */}
      <div 
        className="relative border-2 border-slate-800/80 rounded-3xl p-6 overflow-hidden min-h-[550px] md:min-h-[650px] lg:min-h-[720px] aspect-[16/10] w-full flex flex-col justify-between shadow-2xl transition-all"
        style={{
          backgroundImage: `url(${mapaImg})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        
        {/* Subtle dynamic overlay to match sci-fi aesthetics without blocking the beautiful artwork */}
        <div className="absolute inset-0 bg-slate-950/5 pointer-events-none" />

        {/* --- Path Connector Lines Overlay via dynamic SVG --- */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{ minHeight: '500px' }}
        >
          <g>
            {/* Draw pathways between modules 1 -> 2 -> 3 -> 4 -> 5 sequence */}
            {OTHER_MODULES.map((col, idx) => {
              if (idx === OTHER_MODULES.length - 1) return null;
              const nextCol = OTHER_MODULES[idx + 1];
              const p1 = getPlanetPosition(col.id);
              const p2 = getPlanetPosition(nextCol.id);
              
              const isNextUnlocked = isModuleUnlocked(nextCol.id);
              
              // Custom path curves to look like a scenic curved game roadmap
              const controlX = (p1.x + p2.x) / 2 + (p1.y - p2.y) * 0.15;
              const controlY = (p1.y + p2.y) / 2 - (p2.x - p1.x) * 0.15;

              return (
                <g key={`path-${col.id}-${nextCol.id}`}>
                  {/* Subtle Inner dynamic dashed game road mapping path navigation */}
                  <path 
                    d={`M ${p1.x}% ${p1.y}% Q ${controlX}% ${controlY}% ${p2.x}% ${p2.y}%`}
                    fill="none" 
                    stroke={isNextUnlocked ? "rgba(34, 211, 238, 0.4)" : "rgba(71, 85, 105, 0.15)"} 
                    strokeWidth="2"
                    strokeDasharray="6 6"
                    className={isNextUnlocked ? "animate-[dash_20s_linear_infinite]" : ""}
                    style={{
                      strokeDashoffset: 100,
                    }}
                  />
                </g>
              );
            })}
          </g>
        </svg>

        {/* --- Visual Celestial Planets Grid/Container --- */}
        <div className="absolute inset-0 w-full h-full z-10 pointer-events-none select-none">
          {OTHER_MODULES.map((module) => {
            const pos = getPlanetPosition(module.id);
            const isUnlocked = isModuleUnlocked(module.id);
            const totalForModule = getLevelsCountForModule(module.id);
            const completedCount = getCompletedForModule(module.id);
            
            const isHovered = hoveredModule === module.id;

            return (
              <div 
                key={module.id}
                className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                onMouseEnter={() => setHoveredModule(module.id)}
                onMouseLeave={() => setHoveredModule(null)}
                onClick={() => handlePlanetClick(module.id)}
              >
                {/* Visual holographic pulse surrounding each planet */}
                {isUnlocked && (
                  <div className="absolute -inset-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 animate-ping opacity-35 group-hover:opacity-75 duration-1000" />
                )}

                {/* --- Interactive glass orb / high-tech holo portal overlaying the original map platforms --- */}
                <div className={`relative w-20 h-20 rounded-full flex flex-col items-center justify-center border-2 shadow-xl transition-all duration-300 ${
                  isUnlocked 
                    ? 'hover:scale-110 active:scale-95 cursor-pointer border-cyan-400/40 bg-slate-950/20 backdrop-blur-[0.5px] shadow-[0_0_15px_rgba(34,211,238,0.25)] hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.65)]' 
                    : 'border-slate-800/80 bg-slate-950/75 backdrop-blur-[1.5px]'
                }`}>
                  
                  {/* Planet inner ring styling */}
                  <div className="absolute inset-1 rounded-full border border-white/5 pointer-events-none"></div>

                  {/* Icon representation */}
                  {renderModuleIcon(module.icon, isUnlocked, "w-8 h-8")}

                  {/* Level status overlay badge inside the planet */}
                  <div className="absolute -bottom-1 bg-slate-950/90 border border-slate-800 px-2 py-0.5 rounded-full text-[9px] font-mono font-extrabold text-slate-300 flex items-center gap-1 shadow">
                    <span>{completedCount}/{totalForModule}</span>
                  </div>

                  {/* Lock Indicator directly inside/on the locked planetary body */}
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-slate-950/60 rounded-full flex items-center justify-center z-20 backdrop-blur-[1px]">
                      <div className="bg-amber-500/20 border border-amber-500/40 p-2 rounded-full shadow-lg">
                        <Lock className="w-5 h-5 text-amber-400" />
                      </div>
                    </div>
                  )}

                  {/* Open padlock sign for all unlocked worlds */}
                  {isUnlocked && (
                    <div className="absolute -top-1 -right-1 bg-emerald-600 border border-emerald-400 text-white p-0.5 rounded-full shadow-lg z-20 animate-pulse">
                      <Unlock className="w-2.5 h-2.5" />
                    </div>
                  )}
                </div>

                {/* --- Planetary Title & Subtitle banner always visible --- */}
                <div className={`mt-3 text-center transition-all px-2.5 py-1.5 rounded-2xl max-w-[210px] select-none ${
                    isHovered 
                      ? 'bg-slate-900/95 border border-slate-800 shadow-xl' 
                      : 'bg-slate-950/70 border border-slate-900/60 backdrop-blur-[1px]'
                  }`}
                >
                  <p className="text-[11px] font-black tracking-tight text-white line-clamp-1 uppercase">
                    {module.name}
                  </p>
                  <p className="text-[9px] text-slate-400 font-medium font-mono tracking-normal leading-tight mt-0.5 max-w-[170px] mx-auto">
                    {getSubTitleForModule(module.id)}
                  </p>
                </div>
              </div>
            );
          })}

          {/* --- Animated Nova Character walking/jumping smoothly along paths --- */}
          <div 
            className="absolute z-40 transform -translate-x-1/2 -translate-y-[85%] pointer-events-none"
            style={{
              left: `${novaX}%`,
              top: `${novaY}%`,
              transition: 'left 1.2s ease-in-out, top 1.2s ease-in-out',
            }}
          >
            <NovaAvatar animation={novaAnimation} />
          </div>
        </div>

      </div>

      {/* Holographic Guidance Box with Live Animated Nova Avatar */}
      <div className="bg-slate-900 border-2 border-emerald-500/20 rounded-3xl p-5 flex flex-col sm:flex-row gap-5 items-center shadow-2xl relative overflow-hidden backdrop-blur-md">
        {/* Holographic scanlines effect overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%] opacity-15 pointer-events-none"></div>
        <div className="absolute right-0 bottom-0 w-24 h-24 bg-emerald-500/5 rounded-tl-full pointer-events-none"></div>

        <div className="shrink-0 bg-slate-950 p-3 rounded-2xl border border-slate-800 shadow-inner flex items-center justify-center">
          <NovaAvatar animation={novaAnimation} />
        </div>
        <div className="flex-1 text-left space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-mono text-[10px] font-black uppercase tracking-widest text-emerald-400">Canal de Guía — Nova:</span>
          </div>
          <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-bold">
            {novaDialog}
          </p>
        </div>
      </div>

      {/* Trajectory lines dynamic style inject to support beautiful dashes and character animation keyframes */}
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
        @keyframes nova-idle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes nova-walk {
          0%, 100% { transform: translateY(0) rotate(-6deg); }
          50% { transform: translateY(-3px) rotate(6deg); }
        }
        @keyframes nova-jump {
          0%, 100% { transform: translateY(0) scaleY(1); }
          50% { transform: translateY(-16px) scaleY(0.95); }
        }
        @keyframes nova-celebrate {
          0%, 100% { transform: translateY(0) scale(1) rotate(0); }
          50% { transform: translateY(-8px) scale(1.1) rotate(10deg); }
        }
        @keyframes nova-think {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg) translateY(-2px); }
        }
        @keyframes nova-perder {
          0%, 100% { transform: translateY(2px) scaleY(0.95); opacity: 0.8; }
          50% { transform: translateY(4px) scaleY(0.9) rotate(-3deg); opacity: 0.95; }
        }
        @keyframes nova-ganar {
          0%, 100% { transform: translateY(0) scale(1.05); filter: drop-shadow(0 0 6px rgba(34,211,238,0.4)); }
          50% { transform: translateY(-10px) scale(1.1); filter: drop-shadow(0 0 14px rgba(34,211,238,0.8)); }
        }
        .nova-anim-idle { animation: nova-idle 2s ease-in-out infinite; }
        .nova-anim-walk { animation: nova-walk 0.5s ease-in-out infinite; }
        .nova-anim-jump { animation: nova-jump 0.8s ease-in-out infinite; }
        .nova-anim-celebrate { animation: nova-celebrate 0.6s ease-in-out infinite; }
        .nova-anim-think { animation: nova-think 2s ease-in-out infinite; }
        .nova-anim-perder { animation: nova-perder 1.5s ease-in-out infinite; }
        .nova-anim-ganar { animation: nova-ganar 1s ease-in-out infinite; }
      `}</style>

      {/* Padlock Alert Dialog Modal */}
      {dialogText && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-slate-900 border-2 border-amber-500/40 rounded-3xl max-w-md w-full p-6 text-left shadow-2xl relative overflow-hidden">
            {/* Top red laser bar */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500"></div>
            
            <div className="flex items-start gap-4">
              <div className="bg-amber-950/80 border border-amber-500/30 p-3 rounded-2xl shrink-0 text-amber-400">
                <ShieldAlert className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-black text-white uppercase tracking-tight">
                  🔒 PORTAL GRAVITATORIO BLOQUEADO
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {dialogText}
                </p>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wide">
                  💡 NOTA: PUEDES ACTIVAR EL \"MODO LIBRE\" ARRIBA EN EL MAPA PARA EXPLORAR TODO AL INSTANTE.
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setDialogText(null)}
                className="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-black text-xs px-4 py-2 rounded-xl transition-all shadow-md shadow-amber-500/10 cursor-pointer flex items-center gap-1.5 uppercase"
              >
                Entendido, ¡A la carga! <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
