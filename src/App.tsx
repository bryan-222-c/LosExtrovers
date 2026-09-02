import React, { useState, useEffect } from 'react';
import { User, Level, isMasterUser } from './types';
import { KINEMATICS_LEVELS, getLevelsByModuleId, OTHER_MODULES } from './questions';
import LoginRegister from './components/LoginRegister';
import ModuleMap from './components/ModuleMap';
import LevelOverview from './components/LevelOverview';
import ActiveLevelPlay from './components/ActiveLevelPlay';
import CreditsSection from './components/CreditsSection';
import { LogOut, Award, UserCheck, Play, HelpCircle, Trophy, Bell, Coins, Laptop, Sparkles, Clipboard } from 'lucide-react';
import { NovaAvatar } from './components/ModuleMap';
import { QuestionBankDrawer } from './components/QuestionBankDrawer';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeScreen, setActiveScreen] = useState<'AUTH' | 'MAP' | 'LEVEL_SELECT' | 'LEVEL_PLAY'>('AUTH');
  const [activeModuleId, setActiveModuleId] = useState<number>(1);
  const [activeLevelId, setActiveLevelId] = useState<number | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [madnessLevel, setMadnessLevel] = useState<'NORMAL' | 'LOCO' | 'DELIRIO'>('NORMAL');
  const [isQuestionBankOpen, setIsQuestionBankOpen] = useState(false);

  // Check if there is an active session in local storage
  useEffect(() => {
    const activeSessionStr = localStorage.getItem('extrovers_active_session');
    if (activeSessionStr) {
      const activeUsername = JSON.parse(activeSessionStr);
      const usersStr = localStorage.getItem('extrovers_users');
      if (usersStr) {
        const users = JSON.parse(usersStr);
        if (users[activeUsername]) {
          setCurrentUser(users[activeUsername].data);
          setActiveScreen('MAP');
        }
      }
    }
  }, []);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('extrovers_active_session', JSON.stringify(user.username.toLowerCase()));
    setActiveScreen('MAP');
    showNotification(`¡Sesión iniciada! Bienvenido a bordo, ${user.username}.`);
  };

  const handleLogout = () => {
    localStorage.removeItem('extrovers_active_session');
    setCurrentUser(null);
    setActiveScreen('AUTH');
    setActiveLevelId(null);
    showNotification('Saliendo de la cabina de control. ¡Estableciendo reposo!');
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Callback when user solves a level Saber 11 physics questions correct
  const handleLevelComplete = (
    levelId: number, 
    xpReward: number, 
    coinsReward: number, 
    predictionChoice: string, 
    answerChoice: string
  ) => {
    if (!currentUser) return;

    // Check if previously completed
    const alreadyCompleted = currentUser.completedLevels.includes(levelId);
    
    let updatedCompleted = [...currentUser.completedLevels];
    let updatedCoins = currentUser.coins;
    
    if (!alreadyCompleted) {
      updatedCompleted.push(levelId);
      updatedCoins += coinsReward;
    }

    const updatedPredictions = {
      ...currentUser.predictions,
      [levelId]: predictionChoice
    };

    const updatedSubmittedAnswers = {
      ...currentUser.submittedAnswers,
      [levelId]: answerChoice
    };

    // Calculate simulated Saber 11 rating score based on completed items (out of 100 max)
    const simulatedScore = Math.min(100, Math.round((updatedCompleted.length / 34) * 100));

    let updatedModuleUnlocks = currentUser.moduleUnlocks ? [...currentUser.moduleUnlocks] : [1];
    if (levelId === 10 && !updatedModuleUnlocks.includes(2)) {
      updatedModuleUnlocks.push(2);
    } else if (levelId === 12 && !updatedModuleUnlocks.includes(3)) {
      updatedModuleUnlocks.push(3);
    } else if (levelId === 14 && !updatedModuleUnlocks.includes(4)) {
      updatedModuleUnlocks.push(4);
    } else if (levelId === 16 && !updatedModuleUnlocks.includes(5)) {
      updatedModuleUnlocks.push(5);
    }

    const updatedUser: User = {
      ...currentUser,
      coins: updatedCoins,
      completedLevels: updatedCompleted,
      moduleUnlocks: updatedModuleUnlocks,
      predictions: updatedPredictions,
      submittedAnswers: updatedSubmittedAnswers,
      score: simulatedScore
    };

    // Save user update back to Local Storage database
    const usersStr = localStorage.getItem('extrovers_users');
    if (usersStr) {
       const users = JSON.parse(usersStr);
       const key = currentUser.username.toLowerCase();
       if (users[key]) {
         users[key].data = updatedUser;
         localStorage.setItem('extrovers_users', JSON.stringify(users));
       }
    }

    setCurrentUser(updatedUser);
    
    if (!alreadyCompleted) {
      showNotification(`🎉 ¡Enhorabuena! Portal ${levelId} superado. +${coinsReward} Monedas, +${xpReward} XP.`);
    } else {
      showNotification(`📝 Portal estelar rehecho. Tu bitácora de respuestas ha sido actualizada con éxito.`);
    }
  };

  // Callback for Master User / Host to pass an entire world/module at once
  const handlePassEntireModule = (moduleId: number) => {
    if (!currentUser) return;
    const moduleLevels = getLevelsByModuleId(moduleId);
    const moduleLevelIds = moduleLevels.map(l => l.id);
    
    // Add all levels from this module to completedLevels if not already there
    const newCompleted = Array.from(new Set([...currentUser.completedLevels, ...moduleLevelIds]));
    const nextModuleId = Math.min(5, moduleId + 1);
    const updatedUnlocks = Array.from(new Set([...(currentUser.moduleUnlocks || [1]), nextModuleId]));

    const updatedUser: User = {
      ...currentUser,
      coins: currentUser.coins + 200,
      completedLevels: newCompleted,
      moduleUnlocks: updatedUnlocks,
      score: Math.min(100, Math.round((newCompleted.length / 34) * 100))
    };

    const usersStr = localStorage.getItem('extrovers_users');
    if (usersStr) {
      const users = JSON.parse(usersStr);
      const key = currentUser.username.toLowerCase();
      if (users[key]) {
        users[key].data = updatedUser;
        localStorage.setItem('extrovers_users', JSON.stringify(users));
      }
    }

    setCurrentUser(updatedUser);
    showNotification(`🌟 ¡Mundo 0${moduleId} superado con Pase Maestro! Todos sus portales han sido activados.`);
  };

  // Get active Level Object
  const getSelectedLevelObj = (): Level | undefined => {
    if (activeLevelId === null) return undefined;
    const allModuleLevels = getLevelsByModuleId(activeModuleId);
    return allModuleLevels.find(lvl => lvl.id === activeLevelId);
  };

  return (
    <div className={`min-h-screen text-slate-100 flex flex-col justify-between items-stretch select-none relative pb-12 overflow-hidden font-sans transition-all duration-700 ${
      madnessLevel === 'NORMAL' 
        ? 'bg-slate-950 galaxy-grid' 
        : madnessLevel === 'LOCO' 
        ? 'bg-[#060418] border-4 border-indigo-500/40 shadow-inner' 
        : 'bg-[#12020a] border-8 border-rose-500/30 shadow-[inset_0_0_60px_rgba(244,63,94,0.25)] ring-4 ring-rose-500/15'
    }`}>
      
      {/* Interactive warning banner on STARK DELIRIUM */}
      {madnessLevel === 'DELIRIO' && (
        <div className="bg-red-950/90 text-red-200 border-b border-red-500/30 font-mono text-[10px] text-center py-2.5 uppercase font-bold tracking-widest animate-pulse z-40 relative flex items-center justify-center gap-2 px-4 shadow-md">
          <span>☢️ ALERTA DE REVOLUCIÓN FÍSICA: DETECTADO DELIRIO COGNITIVO DEL PROFESOR JARAMILLO ☢️</span>
          <button 
            type="button"
            onClick={() => {
              setMadnessLevel('NORMAL');
              showNotification('¡Uf! Los portales estables vuelven a alinearse.');
            }}
            className="bg-red-550 text-white hover:bg-red-650 px-3 py-1 rounded-full text-[9px] font-bold shadow transition-all tracking-wider active:scale-95 cursor-pointer uppercase border border-red-550 shrink-0 ml-2"
          >
            Frenar Paradoja 🧪
          </button>
        </div>
      )}

      {/* Floating Madness Science Particles */}
      {madnessLevel !== 'NORMAL' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
          {/* Formula 1 */}
          <div className="absolute top-[12%] left-[3%] text-xs font-mono font-bold text-amber-400/30 rotate-[12deg] bg-amber-950/50 border border-amber-500/20 px-2 py-1 rounded-lg animate-[bounce_5s_infinite]">
            E = mc²... ¡O mc³?! 🤯
          </div>
          {/* Formula 2 */}
          <div className="absolute top-[35%] right-[2%] text-xs font-mono font-bold text-indigo-400/40 -rotate-[15deg] bg-slate-900/60 border border-indigo-500/20 px-2.5 py-1 rounded-xl animate-[pulse_4s_infinite]">
            v = Δx / Δt 🌀
          </div>
          {/* Formula 3 */}
          <div className="absolute bottom-[20%] left-[2%] text-xs font-mono font-bold text-rose-400/30 rotate-[25deg] bg-slate-900/40 border border-rose-500/20 p-2 rounded-2xl">
            a = (v_f - v_i)/t 🧪⚛️
          </div>
          {/* Energy icons */}
          <div className="absolute bottom-[40%] right-[3%] text-lg font-mono font-bold text-amber-500/30 rotate-[45deg] animate-[spin_10s_linear_infinite]">
            🌀 🧲 🧪 🔋
          </div>
          {/* Fun quotes */}
          <div className="absolute top-[60%] left-[5%] text-[10px] font-mono text-slate-400/40 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800/30 -rotate-[8deg]">
            Profesor Jaramillo Bravo ríe: "¡La inercia es una ilusión sagrada!" 🤪
          </div>

          {madnessLevel === 'DELIRIO' && (
            <>
              {/* Collision warning */}
              <div className="absolute top-[5%] right-[15%] text-[11px] font-mono font-extrabold text-red-400/50 bg-red-950/60 px-3 py-1.5 rounded-full animate-bounce rotate-[5deg] border border-red-500/20">
                🔥 ¡COLISIÓN DE PORTALES PARALELOS! 🔥
              </div>
              {/* High G Indicator */}
              <div className="absolute bottom-[8%] right-[20%] text-xs font-mono text-red-500/40 animate-[pulse_2s_infinite]">
                Fuerza G = Excesiva ☣️
              </div>
              {/* Question marker */}
              <div className="absolute top-[48%] left-[25%] text-xs font-serif italic text-rose-450/40 animate-ping">
                ¿Qué es el tiempo? ⏳
              </div>
            </>
          )}
        </div>
      )}
      
      {/* Interactive alert notification bar */}
      {notification && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 bg-slate-900 border-2 border-amber-500/50 text-white font-mono text-xs px-6 py-3.5 rounded-2xl shadow-xl z-50 flex items-center gap-2.5 animate-bounce">
          <Bell className="w-4.5 h-4.5 text-amber-400 animate-pulse" />
          <span className="font-semibold text-slate-100">{notification}</span>
        </div>
      )}

      {/* Main Container Layout */}
      <div className="max-w-7xl w-full mx-auto px-4 md:px-6 py-6 space-y-8 flex-grow relative z-10">
        
        {/* Persistent Top Navigation Bar (Dark Cosmic Navigation) */}
        {currentUser && (
          <header className="flex flex-col md:flex-row justify-between items-center bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-5 gap-4 shadow-xl backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
            
            {/* Left Brand info */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-sky-950/80 border border-cyan-500/30 rounded-2xl flex items-center justify-center shadow-lg shrink-0 overflow-hidden relative group">
                <div className="scale-90 translate-y-1">
                  <NovaAvatar animation="idle" size="small" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight text-white uppercase">
                  FISICA: LOS EXTROVERS
                </h1>
                <p className="text-xs uppercase tracking-widest font-black text-cyan-400">
                  {activeScreen === 'MAP' ? '🌍 Panel de Mundos Cósmicos' : OTHER_MODULES.find(m => m.id === activeModuleId)?.name || 'Misión 1: Cinemática'}
                </p>
              </div>
            </div>

            {/* Right statistics panels / Logged User profile */}
            <div className="flex flex-wrap gap-4 items-center justify-end">
              <div className="bg-slate-950/80 px-4 py-2 rounded-full border border-slate-800 flex items-center gap-2 shadow-sm">
                <span className="text-xs font-semibold text-slate-400 uppercase">Tripulante:</span>
                <span className="font-mono font-bold text-white flex items-center gap-1.5">
                  {currentUser.username}
                  {isMasterUser(currentUser.username) && (
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded border border-amber-500/40">
                      ⭐ Pase Maestro
                    </span>
                  )}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              </div>

              <div className="bg-slate-950/80 px-4 py-2 rounded-full border border-slate-800 flex items-center gap-3 shadow-sm">
                <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-slate-950 font-black text-xs">
                  <span>$</span>
                </div>
                <span className="font-mono font-bold text-amber-400">{currentUser.coins}</span>
              </div>

              <div className="bg-slate-950/80 px-4 py-2 rounded-full border border-slate-800 flex items-center gap-3 shadow-sm">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">PROGRESO TOTAL</span>
                <div className="w-24 h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="h-full bg-cyan-500 rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(100, Math.max(5, (currentUser.completedLevels.length / 18) * 100))}%` }}
                  ></div>
                </div>
                <span className="text-xs font-black text-cyan-400 font-mono">{currentUser.completedLevels.length}/18</span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/20 px-4 py-2 rounded-full text-xs font-mono font-bold cursor-pointer transition-all shadow-sm"
                title="Desconectar e iniciar reposo"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Salir</span>
              </button>
            </div>
          </header>
        )}

        {/* Dynamic Route Screen Renderer */}
        <main className="min-h-[400px]">
          {activeScreen === 'AUTH' && (
            <div className="space-y-6 animate-fade-in py-6 text-center max-w-xl mx-auto">
              <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-800 mb-2 relative group bg-slate-900">
                <img 
                  src="/extrovers_main.jpg" 
                  alt="Física Los Extrovers" 
                  className="w-full h-full object-cover select-none pointer-events-none opacity-90 group-hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 font-mono text-[10px] uppercase font-bold tracking-widest mb-1 animate-pulse">
                🔬 Aplicativo de Física Saber 11
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight leading-tight">
                Aprende Física con <br />
                <span className="text-amber-400 font-serif italic normal-case tracking-normal">
                  Los Extrovers
                </span>
              </h1>
              <p className="text-xs text-slate-350 leading-relaxed max-w-md mx-auto">
                Una aventura gamificada de física alineada con las pruebas de Estado Saber 11. Supera los desafíos, domina los simuladores y consolida tus competencias estelares.
              </p>
              
              <LoginRegister onLoginSuccess={handleLoginSuccess} />
            </div>
          )}

          {activeScreen === 'MAP' && currentUser && (
            <div className="space-y-6">
              <ModuleMap 
                user={currentUser} 
                onSelectModule={(moduleId) => {
                  setActiveModuleId(moduleId);
                  setActiveScreen('LEVEL_SELECT');
                }}
              />
              
              {/* Relocated Space details progress panel */}
              <div className="bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-5 flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl relative overflow-hidden backdrop-blur-md">
                {/* Ambient star particles in background */}
                <div className="absolute right-0 top-0 w-32 h-32 bg-[#3E7B7B]/10 rounded-bl-full pointer-events-none"></div>
                <div className="absolute left-10 top-2 w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-60"></div>
                
                <div className="space-y-1 md:max-w-xl relative z-10 text-left">
                  <h4 className="text-sm font-black text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '3s' }} />
                    SISTEMA DE PROGRESO DE LOS EXTROVERS
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                    Brayan, Alisson y Michell están esperando tus directrices científicas de la mano del Profesor Jaramillo. Recuerda: ¡puedes navegar libremente activando el <strong>"Modo de Seguridad Libre"</strong> arriba a la derecha!
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 shrink-0 relative z-10 w-full md:w-auto justify-end">
                  <div className="bg-slate-950/80 px-4 py-3 rounded-2xl border border-slate-800 text-center shadow-md min-w-[160px]">
                    <span className="text-[8px] text-slate-400 font-extrabold block uppercase tracking-widest">PROGRESO GENERAL</span>
                    <div className="flex items-center gap-2.5 mt-1.5 justify-center">
                      <span className="text-sm font-black text-teal-400 font-mono">
                        {Math.round((currentUser.completedLevels.length / 22) * 100)}%
                      </span>
                      <div className="w-20 h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                        <div 
                          className="h-full bg-teal-400 rounded-full transition-all duration-500" 
                          style={{ width: `${(currentUser.completedLevels.length / 22) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeScreen === 'LEVEL_SELECT' && currentUser && (
            <LevelOverview
              user={currentUser}
              moduleId={activeModuleId}
              onBackToMap={() => setActiveScreen('MAP')}
              onSelectLevel={(levelId) => {
                setActiveLevelId(levelId);
                setActiveScreen('LEVEL_PLAY');
              }}
              onSelectModule={(modId) => setActiveModuleId(modId)}
              onPassEntireModule={handlePassEntireModule}
            />
          )}

          {activeScreen === 'LEVEL_PLAY' && currentUser && getSelectedLevelObj() && (
            <ActiveLevelPlay
              level={getSelectedLevelObj()!}
              userCompleted={currentUser.completedLevels.includes(activeLevelId!)}
              user={currentUser}
              onBack={() => {
                setActiveScreen('LEVEL_SELECT');
                setActiveLevelId(null);
              }}
              onComplete={handleLevelComplete}
            />
          )}
        </main>

        {/* ALWAYS PRESENT MANDATORY CREDITS SECTION */}
        <CreditsSection />
      </div>

      <QuestionBankDrawer 
        isOpen={isQuestionBankOpen} 
        onClose={() => setIsQuestionBankOpen(false)} 
      />
    </div>
  );
}
