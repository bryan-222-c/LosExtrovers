import React from 'react';
import { getLevelsByModuleId, OTHER_MODULES } from '../questions';
import { User, isMasterUser } from '../types';
import { 
  ArrowLeft, 
  Play, 
  CheckCircle2, 
  Lock, 
  Star, 
  Coins, 
  Radio, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  FastForward, 
  Zap 
} from 'lucide-react';
import { NovaAvatar } from './ModuleMap';

interface LevelOverviewProps {
  user: User;
  moduleId: number;
  onBackToMap: () => void;
  onSelectLevel: (levelId: number) => void;
  onSelectModule?: (moduleId: number) => void;
  onPassEntireModule?: (moduleId: number) => void;
}

export default function LevelOverview({ 
  user, 
  moduleId, 
  onBackToMap, 
  onSelectLevel,
  onSelectModule,
  onPassEntireModule
}: LevelOverviewProps) {
  
  // Get levels specifically for the selected module
  const activeLevels = getLevelsByModuleId(moduleId);
  
  // Get active module metadata
  const currentModule = OTHER_MODULES.find(m => m.id === moduleId) || OTHER_MODULES[0];
  const isMaster = isMasterUser(user.username);

  // Helper to determine if a level is unlocked within this module
  const isLevelUnlocked = (levelId: number) => {
    if (isMaster) return true; // Direct access for anfitrión & jojabravo
    if (activeLevels.length === 0) return false;
    const firstLevelId = activeLevels[0].id;
    if (levelId === firstLevelId) return true;
    // Unlocked if previous level in this module is in completedLevels
    return user.completedLevels.includes(levelId - 1);
  };

  const isLevelCompleted = (levelId: number) => {
    return user.completedLevels.includes(levelId);
  };

  // Calculate completed levels for this module
  const completedCount = activeLevels.filter(lvl => isLevelCompleted(lvl.id)).length;
  const totalCount = activeLevels.length;

  return (
    <div className="space-y-8 animate-fade-in text-left">
      {/* Sub-header navigation row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <button
          onClick={onBackToMap}
          className="flex items-center gap-2 text-xs font-mono font-black uppercase tracking-wider text-slate-100 hover:text-cyan-400 cursor-pointer transition-colors bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-850 shadow-xl"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400 animate-pulse" />
          Regresar al Mapa Principal
        </button>

        {/* Quick Worlds switcher tabs */}
        {onSelectModule && (
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-850">
            {OTHER_MODULES.map((m) => {
              const isCurrent = m.id === moduleId;
              return (
                <button
                  key={m.id}
                  onClick={() => onSelectModule(m.id)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isCurrent
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <span>{m.icon}</span>
                  <span className="hidden md:inline">Mundo {m.id}</span>
                  <span className="md:hidden">M{m.id}</span>
                </button>
              );
            })}
          </div>
        )}

        <div className="flex items-center gap-2">
          <div className="bg-cyan-950/40 border border-cyan-500/25 px-3.5 py-1.5 rounded-full font-mono text-xs text-cyan-400 flex items-center gap-1.5 font-bold">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            FRECUENCIA J.A.J.B CONECTADA
          </div>
        </div>
      </div>

      {/* Master pass control banner for Host / Jojabravo */}
      {isMaster && (
        <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/30 border-2 border-amber-500/40 rounded-3xl p-5 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 shrink-0">
              <Zap className="w-5 h-5 text-amber-400 fill-amber-400/30 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-extrabold text-amber-300 uppercase tracking-widest">
                  ⭐ PASE MAESTRO Y ANFITRIÓN ACTIVO
                </span>
                <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">
                  {user.username}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Tienes autorización total para recorrer, saltar y pasar cualquier mundo sin necesidad de resolver los niveles.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full md:w-auto justify-end">
            {onPassEntireModule && (
              <button
                onClick={() => onPassEntireModule(moduleId)}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-black text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-all shadow-lg shadow-amber-500/10 uppercase tracking-wider"
              >
                <Sparkles className="w-4 h-4" />
                Aprobar Este Mundo
              </button>
            )}

            {onSelectModule && moduleId < 5 && (
              <button
                onClick={() => onSelectModule(moduleId + 1)}
                className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-mono font-black text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-all shadow-lg uppercase tracking-wider"
              >
                Siguiente Mundo
                <FastForward className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Module Title Section with Nova Avatar Guide */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full pointer-events-none"></div>
        
        <div className="flex items-center gap-5 relative z-10">
          <div className="shrink-0 scale-95">
            <NovaAvatar animation="idle" size="medium" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-cyan-400 font-extrabold uppercase tracking-widest block">
                🪐 MUNDO 0{moduleId}: LOS EXTROVERS
              </span>
              <span className="text-sm">{currentModule.icon}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
              {currentModule.name}
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-xl font-medium leading-relaxed">
              {currentModule.description} ¡Acompaña a Nova y a la tripulación en este viaje!
            </p>
          </div>
        </div>

        {/* Progress box and Next/Prev world buttons */}
        <div className="flex items-center gap-3 relative z-10">
          {onSelectModule && moduleId > 1 && (
            <button
              onClick={() => onSelectModule(moduleId - 1)}
              className="p-3 bg-slate-950 hover:bg-slate-850 border border-slate-800 rounded-2xl text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
              title="Mundo anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          <div className="bg-slate-950 p-4 border border-slate-850 rounded-2xl min-w-[180px] text-center shrink-0 shadow-inner">
            <span className="font-mono text-[9px] text-cyan-400 block uppercase tracking-wider font-extrabold">Aprobación del Mundo</span>
            <span className="text-3xl font-black text-white font-sans tracking-tight">
              {totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%
            </span>
            <span className="block text-[10px] font-mono text-cyan-400 mt-1 font-bold">
              {completedCount} de {totalCount} Portales Superados
            </span>
          </div>

          {onSelectModule && moduleId < 5 && (
            <button
              onClick={() => onSelectModule(moduleId + 1)}
              className="p-3 bg-slate-950 hover:bg-slate-850 border border-slate-800 rounded-2xl text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
              title="Siguiente mundo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Levels list grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeLevels.map((level, index) => {
          const unlocked = isLevelUnlocked(level.id);
          const completed = isLevelCompleted(level.id);
          
          let cardStyle = "bg-slate-950/40 border-slate-900 opacity-50 cursor-not-allowed text-slate-500";
          if (unlocked) {
            if (completed) {
              cardStyle = "bg-slate-900 border-emerald-900/40 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/5 cursor-pointer hover:scale-[1.02] text-slate-100";
            } else {
              cardStyle = "bg-slate-900 border-slate-800 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/5 cursor-pointer hover:scale-[1.02] text-slate-100";
            }
          }

          return (
            <div
              key={level.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${cardStyle}`}
              onClick={() => unlocked && onSelectLevel(level.id)}
            >
              <div className="space-y-4 text-left">
                {/* Level index pill */}
                <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-slate-850">
                  <span className="text-[10px] font-mono text-slate-300 font-extrabold uppercase tracking-wider">
                    Desafío {index + 1}
                  </span>
                  
                  {completed ? (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-extrabold uppercase tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Superado
                    </span>
                  ) : unlocked ? (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-cyan-400 font-extrabold uppercase tracking-wider animate-pulse">
                      <Play className="w-3.5 h-3.5 fill-cyan-400/20 text-cyan-400" /> Jugar
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-slate-500 font-extrabold uppercase tracking-wider">
                      <Lock className="w-3.5 h-3.5" /> Bloqueado
                    </span>
                  )}
                </div>

                <div>
                  <h3 className={`text-base font-black tracking-tight ${unlocked ? 'text-white' : 'text-slate-500'}`}>
                    {level.title}
                  </h3>
                  <p className="text-[11px] font-mono text-cyan-400 mt-1 uppercase font-extrabold tracking-wider bg-cyan-950/45 border border-cyan-800/20 rounded px-2 py-0.5 inline-block">
                    {level.conceptTitle}
                  </p>
                  <p className="text-xs text-slate-300 mt-3 line-clamp-3 leading-relaxed font-medium">
                    {level.narrative}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                {/* Coins reward indicators */}
                <div className="flex items-center gap-1">
                  <Coins className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono font-bold text-amber-400">+{level.coinsReward} monedas</span>
                </div>

                <div className="flex items-center gap-1 font-semibold">
                  <Star className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono font-bold text-cyan-400">+{level.xpReward} XP</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
