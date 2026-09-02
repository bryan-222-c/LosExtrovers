import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  getLevelsByModuleId, 
  KINEMATICS_LEVELS, 
  DYNAMICS_LEVELS,
  THERMODYNAMICS_LEVELS,
  WAVES_LEVELS,
  FLUIDS_THERMO_LEVELS
} from '../questions';
import { Level } from '../types';
import { 
  Copy, 
  Check, 
  X, 
  BookOpen, 
  HelpCircle, 
  Award, 
  Clipboard, 
  CheckSquare, 
  Layers,
  ArrowRight,
  Flame,
  Activity,
  Zap,
  Waves,
  Droplets
} from 'lucide-react';

interface QuestionBankDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuestionBankDrawer({ isOpen, onClose }: QuestionBankDrawerProps) {
  const [activeTab, setActiveTab] = useState<1 | 2 | 3 | 4 | 5>(5); // Default to Module 5 (Fluidos y Termodinámica)
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getModuleLevels = () => {
    if (activeTab === 1) return KINEMATICS_LEVELS;
    if (activeTab === 2) return DYNAMICS_LEVELS;
    if (activeTab === 3) return THERMODYNAMICS_LEVELS;
    if (activeTab === 4) return WAVES_LEVELS;
    return FLUIDS_THERMO_LEVELS;
  };

  const getModuleName = () => {
    if (activeTab === 1) return 'Módulo 1: Cinemática';
    if (activeTab === 2) return 'Módulo 2: Dinámica';
    if (activeTab === 3) return 'Módulo 3: Termodinámica y Energía';
    if (activeTab === 4) return 'Módulo 4: Ondas y Electromagnetismo';
    return 'Módulo 5: Mecánica de Fluidos y Termodinámica';
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // Format a single Level into a beautiful plain text representation
  const formatSingleQuestionText = (level: Level) => {
    const optionsText = level.saber11.options
      .map(opt => `${opt.key}) ${opt.text}`)
      .join('\n');

    return `========================================
PREGUNTA SABER 11 - LOS EXTROVERS
========================================
Módulo: ${getModuleName()}
Nivel: ${level.title}
Tema: ${level.conceptTitle}

[CONTEXTO]
${level.saber11.context}

[PREGUNTA]
${level.saber11.questionText}

[OPCIONES DE RESPUESTA]
${optionsText}

----------------------------------------
RESPUESTA CORRECTA: [${level.saber11.correctAnswer}]
----------------------------------------

[EXPLICACIÓN PEDAGÓGICA (PROF. JARAMILLO)]
${level.saber11.pedagogicalFeedback}

========================================`;
  };

  // Format all questions in the current module
  const formatAllModuleQuestions = (levels: Level[]) => {
    return levels.map(level => formatSingleQuestionText(level)).join('\n\n\n');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-2xl bg-slate-900 border-l border-slate-800 shadow-2xl z-50 flex flex-col overflow-hidden text-slate-100"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-800 bg-slate-950/40 relative">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-amber-500 to-indigo-500"></div>
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="p-1.5 bg-amber-500/10 rounded-lg text-amber-400 border border-amber-500/20">
                      <Clipboard className="w-5 h-5 animate-pulse" />
                    </span>
                    <h2 className="text-xl font-black tracking-tight text-white uppercase">
                      Banco de Preguntas Saber 11
                    </h2>
                  </div>
                  <p className="text-xs text-slate-400 font-mono">
                    Copia y pega las preguntas exactas estructuradas bajo el modelo de evaluación ICFES.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Module Toggle Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800/80">
                <button
                  onClick={() => setActiveTab(1)}
                  className={`py-2 px-1 rounded-lg text-[10px] font-mono font-bold tracking-wider transition-all cursor-pointer truncate ${
                    activeTab === 1
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-extrabold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  M1: Cinemática ({KINEMATICS_LEVELS.length})
                </button>
                <button
                  onClick={() => setActiveTab(2)}
                  className={`py-2 px-1 rounded-lg text-[10px] font-mono font-bold tracking-wider transition-all cursor-pointer truncate ${
                    activeTab === 2
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 font-extrabold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  M2: Dinámica ({DYNAMICS_LEVELS.length})
                </button>
                <button
                  onClick={() => setActiveTab(3)}
                  className={`py-2 px-1 rounded-lg text-[10px] font-mono font-bold tracking-wider transition-all cursor-pointer truncate ${
                    activeTab === 3
                      ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30 font-extrabold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  M3: Termo ({THERMODYNAMICS_LEVELS.length})
                </button>
                <button
                  onClick={() => setActiveTab(4)}
                  className={`py-2 px-1 rounded-lg text-[10px] font-mono font-bold tracking-wider transition-all cursor-pointer truncate ${
                    activeTab === 4
                      ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30 font-extrabold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  M4: Ondas ({WAVES_LEVELS.length})
                </button>
                <button
                  onClick={() => setActiveTab(5)}
                  className={`py-2 px-1 rounded-lg text-[10px] font-mono font-bold tracking-wider transition-all cursor-pointer truncate col-span-2 sm:col-span-1 ${
                    activeTab === 5
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-extrabold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  M5: Fluidos ({FLUIDS_THERMO_LEVELS.length})
                </button>
              </div>
            </div>

            {/* Quick action section: Copy All */}
            <div className="px-6 py-3.5 bg-slate-950 border-b border-slate-800/60 flex justify-between items-center gap-3">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                Colección completa de {getModuleLevels().length} preguntas listas
              </span>
              <button
                onClick={() => handleCopyText(formatAllModuleQuestions(getModuleLevels()), 'all-module')}
                className="flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer shadow-sm shrink-0"
              >
                {copiedId === 'all-module' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-300 animate-scale" />
                    <span>¡Módulo Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Todo el Módulo</span>
                  </>
                )}
              </button>
            </div>

            {/* Questions List */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-thin">
              {getModuleLevels().map((level, index) => {
                const singleText = formatSingleQuestionText(level);
                return (
                  <div 
                    key={level.id} 
                    className="group bg-slate-950/40 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 space-y-4 transition-all relative overflow-hidden"
                  >
                    {/* Corner ID indicator */}
                    <div className="absolute top-0 right-0 bg-slate-800 px-3 py-1 text-[10px] font-mono font-bold text-slate-400 rounded-bl-xl border-l border-b border-slate-800">
                      ID: #{level.id}
                    </div>

                    {/* Title */}
                    <div className="space-y-1 pr-12">
                      <div className="text-[10px] uppercase tracking-widest font-mono text-cyan-400 font-extrabold flex items-center gap-1">
                        <span>🎯 Tema:</span>
                        <span>{level.conceptTitle}</span>
                      </div>
                      <h3 className="text-sm font-black text-white uppercase tracking-tight">
                        {level.title}
                      </h3>
                    </div>

                    {/* Context and Question Area */}
                    <div className="space-y-3 text-xs leading-relaxed text-slate-350">
                      <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/40 font-mono text-[11px] text-slate-300 space-y-2">
                        <strong className="text-slate-400 block mb-1 text-[9px] uppercase tracking-wider font-sans">Contexto Saber 11:</strong>
                        <p className="whitespace-pre-line">{level.saber11.context}</p>
                        {level.saber11.imageUrl && (
                          <div className="mt-2 flex justify-center bg-white p-2.5 rounded-lg border border-slate-700">
                            <img 
                              src={level.saber11.imageUrl} 
                              alt="Figura de la pregunta Saber 11" 
                              className="max-h-56 w-auto object-contain rounded"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        )}
                      </div>

                      <div className="pl-3 border-l-2 border-cyan-500/60 py-0.5 font-bold text-slate-100">
                        {level.saber11.questionText}
                      </div>

                      {/* Options */}
                      <div className="grid grid-cols-1 gap-2 pl-3">
                        {level.saber11.options.map(opt => (
                          <div 
                            key={opt.key}
                            className={`p-2 rounded-lg text-[11px] font-mono flex gap-2 border ${
                              opt.key === level.saber11.correctAnswer
                                ? 'bg-green-500/5 border-green-500/20 text-green-300'
                                : 'bg-slate-900/20 border-slate-800/40 text-slate-400'
                            }`}
                          >
                            <span className="font-bold shrink-0">{opt.key})</span>
                            <span>{opt.text}</span>
                          </div>
                        ))}
                      </div>

                      {/* Feedback box */}
                      <div className="bg-amber-500/5 border border-amber-500/10 p-3 rounded-xl text-[11px] text-slate-350 leading-relaxed">
                        <span className="font-mono text-amber-400 font-black uppercase text-[9px] tracking-widest block mb-1">
                          💡 Clave Correcta [{level.saber11.correctAnswer}] - Explicación:
                        </span>
                        {level.saber11.pedagogicalFeedback}
                      </div>
                    </div>

                    {/* Copy actions toolbar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-850">
                      <div className="text-[10px] font-mono text-slate-500">
                        Presiona copiar para portapapeles
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCopyText(`${level.saber11.context}\n\n${level.saber11.questionText}\n\n${level.saber11.options.map(o => `${o.key}) ${o.text}`).join('\n')}`, `q-${level.id}`)}
                          className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[10.5px] font-mono cursor-pointer transition-all"
                          title="Copiar solo el enunciado y opciones"
                        >
                          {copiedId === `q-${level.id}` ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-green-400" />
                              <span className="text-green-400">Enunciado Copiado</span>
                            </>
                          ) : (
                            <>
                              <Clipboard className="w-3.5 h-3.5 text-slate-400" />
                              <span>Copiar Enunciado</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleCopyText(singleText, `full-${level.id}`)}
                          className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white font-mono rounded-lg px-3 py-1.5 text-[10.5px] font-bold cursor-pointer transition-all shadow-sm"
                          title="Copiar pregunta completa, clave y retroalimentación"
                        >
                          {copiedId === `full-${level.id}` ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-green-300" />
                              <span className="text-green-300">¡Todo Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                              <span>Copiar Ficha Completa</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/80 text-center text-[10px] font-mono text-slate-500">
              Profesor Jorge Armando Jaramillo Bravo • Los Extrovers &copy; 2026
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
