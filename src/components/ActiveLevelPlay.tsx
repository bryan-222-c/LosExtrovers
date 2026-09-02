import React, { useState, useEffect } from 'react';
import { Level, User, isMasterUser } from '../types';
import { KINEMATICS_LEVELS } from '../questions';
import { 
  ArrowLeft, 
  BookOpen, 
  BrainCircuit, 
  MessageSquare, 
  GraduationCap, 
  Check, 
  AlertCircle, 
  Coins, 
  Star, 
  RefreshCw, 
  Send, 
  ArrowRight, 
  Play, 
  Pause, 
  RotateCcw,
  Zap,
  Sparkles
} from 'lucide-react';
import { NovaAvatar } from './ModuleMap';
import Module4Graphics from './Module4Graphics';
import Module5Graphics from './Module5Graphics';

interface ActiveLevelPlayProps {
  level: Level;
  userCompleted: boolean;
  user?: User;
  onBack: () => void;
  onComplete: (levelId: number, xpReward: number, coinsReward: number, predictionChoice: string, answerChoice: string) => void;
}

export default function ActiveLevelPlay({ level, userCompleted, user, onBack, onComplete }: ActiveLevelPlayProps) {
  // Tab order: 1. Chat (narrative), 2. Simulador, 3. Predicción, 4. Fórmulas, 5. Saber 11
  const [activeTab, setActiveTab] = useState<'narrative' | 'simulator' | 'prediction' | 'concepts' | 'saber11'>('narrative');
  
  const isMaster = user ? isMasterUser(user.username) : false;

  // Prediction states
  const [predictionSelected, setPredictionSelected] = useState<string | null>(null);
  const [showPredictionFeedback, setShowPredictionFeedback] = useState(false);

  // Saber 11 states
  const [saberSelected, setSaberSelected] = useState<string | null>(null);
  const [isSaberSubmitted, setIsSaberSubmitted] = useState(false);
  const [isCorrectFeedback, setIsCorrectFeedback] = useState<boolean | null>(null);
  const [saberAttempts, setSaberAttempts] = useState(0);

  // Bypass & direct key solution bypass
  const [showSolutionDirectly, setShowSolutionDirectly] = useState(false);

  // Dynamic Laboratory Slider states (adapted for level variables)
  const [calcVelocity, setCalcVelocity] = useState(() => {
    if (level.id === 1) return 20;
    if (level.id === 8) return 20;
    if (level.id === 9) return 80;
    if (level.id === 11) return 15;
    if (level.id === 16) return 8;
    return 10;
  });

  const [calcTime, setCalcTime] = useState(() => {
    if (level.id === 1) return 10;
    if (level.id === 2) return 6;
    if (level.id === 4) return 10;
    return 5;
  });

  const [calcAcceleration, setCalcAcceleration] = useState(() => {
    if (level.id === 2) return -5;
    return 2;
  });

  const [calcInitialVelocity, setCalcInitialVelocity] = useState(() => {
    if (level.id === 2) return 30;
    if (level.id === 6) return 30;
    if (level.id === 7) return 30;
    return 20;
  });

  const [calcAngle, setCalcAngle] = useState(45);
  const [calcRadius, setCalcRadius] = useState(() => {
    if (level.id === 16) return 2;
    return 100;
  });
  const [calcWindSpeed, setCalcWindSpeed] = useState(60);
  
  const [calcVelocityA, setCalcVelocityA] = useState(30);
  const [calcVelocityB, setCalcVelocityB] = useState(20);
  const [calcSeparation, setCalcSeparation] = useState(1000);

  // Dynamics calculator states
  const [calcMass, setCalcMass] = useState(() => {
    if (level.id === 11) return 500;
    if (level.id === 12) return 200;
    if (level.id === 14) return 100;
    if (level.id === 16) return 4;
    return 10;
  });
  const [calcForce, setCalcForce] = useState(() => {
    if (level.id === 12) return 400;
    if (level.id === 14) return 300;
    return 100;
  });
  const [calcFrictionCoefficient, setCalcFrictionCoefficient] = useState(() => {
    if (level.id === 11) return 0;
    return 0.3;
  });
  const [calcFrictionStaticCoeff, setCalcFrictionStaticCoeff] = useState(0.5);
  const [calcFrictionKineticCoeff, setCalcFrictionKineticCoeff] = useState(0.3);

  // Atwood and circular dynamics variables for Level 15 & 16
  const [calcMass1, setCalcMass1] = useState(20);
  const [calcMass2, setCalcMass2] = useState(30);
  const [calcGravity, setCalcGravity] = useState(10);

  // Nova interactive character states and quotes
  const [novaAnim, setNovaAnim] = useState<string>('think');
  const [novaQuoteIndex, setNovaQuoteIndex] = useState(0);
  const [showNovaBubble, setShowNovaBubble] = useState(false);

  const handleNovaClick = () => {
    const animations = ['jump', 'celebrate', 'walk', 'think', 'ganar'];
    const nextAnim = animations[Math.floor(Math.random() * animations.length)];
    setNovaAnim(nextAnim);
    setNovaQuoteIndex((prev) => (prev + 1) % 5);
    setShowNovaBubble(true);
    
    setTimeout(() => {
      setNovaAnim('think');
    }, 1500);
  };

  const novaLevelTips: Record<number, string> = {
    1: "¡Hola! En el MRU, la velocidad es constante. Esto significa que si recorres 20 metros en un segundo, en el siguiente recorrerás exactamente otros 20 metros. ¡La aceleración es cero!",
    2: "¡Frenos activados! En el MRUA, la velocidad cambia de forma constante. Al frenar, la aceleración se opone a tu dirección de vuelo, por lo que su signo es negativo.",
    3: "¡Fíjate en las gráficas! En una gráfica de posición contra tiempo, una línea completamente horizontal significa que el objeto no se mueve. ¡Está en reposo!",
    4: "¡El área bajo la curva! En una gráfica de velocidad contra tiempo, calcular el área te da exactamente el espacio que ha recorrido el dron. ¡Es una herramienta matemática poderosísima!",
    5: "¡Increíble pero cierto! En el vacío cósmico no hay aire que frene los objetos. Por eso, una pesada bola de plomo y una ligera pluma caerán exactamente al mismo ritmo.",
    6: "¡El movimiento vertical es independiente del horizontal! Cuando lanzas algo de lado, sigue cayendo hacia abajo con la misma aceleración de la gravedad. ¡Dos movimientos en uno!",
    7: "¡Lanzamiento parabólico! En el punto más alto de su vuelo, la velocidad vertical de la sonda se hace cero por un instante, pero la gravedad sigue tirando de ella hacia abajo.",
    8: "¡Velocidad relativa! Si te mueves en el mismo sentido que otra nave, te parecerá que va más despacio. Si van en sentidos opuestos, ¡parecerá que pasan volando!",
    9: "¡Persecuciones estelares! Para calcular el tiempo de encuentro, sumamos las velocidades si van al encuentro, o las restamos si una persigue a la otra.",
    10: "¡Sistemas de referencia! Para un astronauta dentro de la nave, una taza flotando está inmóvil. Para alguien fuera en el espacio, ¡se mueve a miles de kilómetros por hora!",
    11: "¡Inercia pura! La Primera Ley de Newton nos dice que un objeto mantiene su movimiento a menos que una fuerza externa lo detenga. ¡En el vacío no necesitas motores para seguir avanzando!",
    12: "¡Segunda Ley de Newton! A mayor fuerza, mayor aceleración. Pero a mayor masa, ¡más difícil es acelerar! F = m • a es la llave del universo.",
    13: "¡Toda acción tiene una reacción! Si empujas el satélite hacia adelante con 100 Newtons, el satélite te empujará a ti hacia atrás con exactamente los mismos 100 Newtons.",
    14: "¡Fricción! Es la fuerza que se opone al deslizamiento. La fricción estática (para empezar a mover) siempre es mayor que la cinética (para seguir moviendo).",
    15: "¡Máquina de Atwood! La diferencia de masas entre los dos cuerpos colgados de la polea es lo que genera la aceleración del sistema. ¡La tensión en la cuerda los mantiene unidos!",
    16: "¡Movimiento circular! La fuerza centrípeta es la que obliga al proyectil a girar en círculos en lugar de salir volando en línea recta. ¡Depende del cuadrado de la velocidad!",
    17: "¡Energía Potencial Gravitacional! Ep = m•g•h. Como m y g son constantes, la gráfica de energía potencial calca fielmente la forma geométrica y el relieve de la montaña rusa.",
    18: "¡Salto Bungee! Mientras no se alcance la longitud natural de la cuerda (30 m), la banda no ejerce fuerza y la energía potencial gravitacional se convierte solo en energía cinética.",
    19: "¡Pistas sin fricción! En ausencia de rozamiento, la energía mecánica total se conserva constante. Igualando la energía cinética y potencial en cada cota hallamos la rapidez exacta.",
    20: "¡Energía Cinética vs Posición! En el punto más bajo (valle h = 0), la energía potencial es cero y la energía cinética alcanza su pico máximo absoluto.",
    21: "¡Pistas curvas y gravedad! Al ascender por una rampa, la aceleración de gravedad apunta hacia abajo, frenando al patinador y transformando energía cinética en potencial.",
    22: "¡Límites energéticos! Si partes del reposo a 3 metros de altura, por conservación de la energía mecánica nunca podrás alcanzar una altura mayor a 3 metros sin propulsión.",
    23: "¡Equilibrio térmico! El calor fluye espontáneamente desde el cuerpo más caliente al más frío hasta que las temperaturas de ambos cuerpos se igualan.",
    24: "¡Primera Ley de la Termodinámica! ΔU = Q - W. La energía interna cambia según el calor que absorbe el gas menos el trabajo que realiza al expandirse.",
    25: "¡Ecuación de onda fundamental! v = λ • f. Si la frecuencia se duplica en un mismo medio, la longitud de onda se reduce exactamente a la mitad.",
    26: "¡Efecto Doppler! Cuando la fuente se acerca el sonido se percibe más agudo (frecuencia mayor) y cuando se aleja se percibe más grave.",
    27: "¡Ley de Coulomb! Las fuerzas electrostáticas decaen con el cuadrado de la distancia (1/d²). Si triplicas la distancia, la fuerza se reduce a 1/9.",
    28: "¡Circuitos eléctricos! En paralelo, la resistencia equivalente disminuye, permitiendo que circule mayor corriente eléctrica y los bombillos brillen más."
  };

  const novaQuotes = [
    "¡La física es el lenguaje del universo, recluta! Cada ecuación es una coordenada para volver a casa.",
    "¿Sabías que Isaac Newton descubrió la gravedad estando en aislamiento preventivo por la peste? ¡El ingenio no tiene límites!",
    "¡Increíble! Si mantienes el ritmo, pronto serás un experto de las pruebas Saber 11.",
    "No te preocupes por equivocarte, el método científico se basa en aprender de cada ensayo de laboratorio.",
    "¡Mira cómo gira el simulador en tiempo real! ¡Es la teoría hecha realidad!"
  ];

  // --- PHYSICS SIMULATOR STATE ENGINE ---
  const [simPlaying, setSimPlaying] = useState(false);
  const [simGravityActive, setSimGravityActive] = useState(true);
  const [simAirResistance, setSimAirResistance] = useState(false);
  const [simInitialVelocity, setSimInitialVelocity] = useState(0); // m/s
  const [simTime, setSimTime] = useState(0); // current elapsed seconds
  const [simMaxTime, setSimMaxTime] = useState(5); // total simulation limit (s)

  // Realtime physics solver loop
  useEffect(() => {
    let intervalId: any;
    if (simPlaying) {
      const step = 0.05;
      intervalId = setInterval(() => {
        setSimTime(prev => {
          if (prev >= simMaxTime) {
            setSimPlaying(false);
            return simMaxTime;
          }
          return Number((prev + step).toFixed(2));
        });
      }, 50);
    }
    return () => clearInterval(intervalId);
  }, [simPlaying, simMaxTime]);

  const getPhysicsPositions = () => {
    const g = simGravityActive ? 9.8 : 0;
    const v0 = simInitialVelocity;
    
    // Plomo (Lead ball): standard kinematics
    const dLead = v0 * simTime + 0.5 * g * simTime * simTime;
    
    // Pluma (Feather): standard kinematics if vacuum, else high air friction
    let dFeather = 0;
    if (!simAirResistance) {
      dFeather = v0 * simTime + 0.5 * g * simTime * simTime;
    } else {
      // Atmospheric friction drag approximation
      const gEff = simGravityActive ? 1.2 : 0;
      dFeather = v0 * 0.3 * simTime + 0.5 * gEff * simTime * simTime;
    }
    
    // Compute positions in pixels scaled for a 240px fall chamber
    const maxHeightNorm = Math.max(10, v0 * simMaxTime + 0.5 * 9.8 * simMaxTime * simMaxTime);
    
    const leadY = Math.min(240, (dLead / maxHeightNorm) * 240);
    const featherY = Math.min(240, (dFeather / maxHeightNorm) * 240);
    
    return {
      leadY,
      featherY,
      dLead: dLead.toFixed(1),
      dFeather: dFeather.toFixed(1),
      vLead: (v0 + g * simTime).toFixed(1),
      vFeather: (v0 + (simAirResistance ? (simGravityActive ? 1.2 : 0) : g) * simTime).toFixed(1)
    };
  };

  const { leadY, featherY, dLead, dFeather, vLead, vFeather } = getPhysicsPositions();

  const handleSimReset = () => {
    setSimPlaying(false);
    setSimTime(0);
  };

  // Character Avatars / Names mapping
  const characters = [
    { name: "Brayan Conrado", avatar: "👨‍🚀", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    { name: "Michell Barrientos", avatar: "👩‍🚀", color: "text-rose-450 bg-rose-500/10 border-rose-500/20" },
    { name: "Alisson Quintero", avatar: "💻", color: "text-sky-400 bg-sky-500/10 border-sky-400/20" }
  ];

  const handlePredictionChoice = (optionKey: string) => {
    setPredictionSelected(optionKey);
    setShowPredictionFeedback(true);
  };

  const handleSaberSubmit = () => {
    if (!saberSelected) return;
    
    const isCorrect = saberSelected === level.saber11.correctAnswer;
    setIsSaberSubmitted(true);
    setIsCorrectFeedback(isCorrect);
    
    if (isCorrect) {
      setNovaAnim('ganar');
      // Completed! We call the callback to reward and save progress
      onComplete(
        level.id, 
        level.xpReward, 
        level.coinsReward, 
        predictionSelected || 'N/A', 
        saberSelected
      );
    } else {
      setNovaAnim('perder');
      setSaberAttempts(prev => prev + 1);
    }
  };

  const handleSaberRetry = () => {
    setSaberSelected(null);
    setIsSaberSubmitted(false);
    setIsCorrectFeedback(null);
    setNovaAnim('think');
  };

  return (
    <div className="space-y-8 text-left animate-fade-in max-w-5xl mx-auto">
      {/* Level Header and Return Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono font-extrabold uppercase tracking-wider text-slate-100 hover:text-cyan-400 cursor-pointer transition-colors bg-slate-900 px-4 py-2.5 rounded-xl border-2 border-slate-800 shadow-xl"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400 animate-pulse" />
          Volver a Niveles
        </button>

        <div className="flex items-center gap-3">
          {isMaster && (
            <button
              onClick={() => {
                onComplete(level.id, level.xpReward, level.coinsReward, level.prediction.options[0] || 'A', level.saber11.correctAnswer);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm"
              title="Superar este nivel directamente con Pase Maestro"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30" />
              <span>Pase Maestro: Pasar Nivel</span>
            </button>
          )}

          <div className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-500/25 px-3.5 py-1.5 rounded-full">
            SECTOR: {level.id <= 10 ? 'CINEMÁTICA' : level.id <= 16 ? 'DINÁMICA' : level.id <= 24 ? 'TERMODINÁMICA Y ENERGÍA' : level.id <= 29 ? 'ONDAS Y FENÓMENOS ELECTROMAGNÉTICOS' : 'MECÁNICA DE FLUIDOS Y TERMODINÁMICA'}
          </div>
          <div className="font-mono text-xs font-bold text-amber-400 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-full shadow-md">
            PORTAL: {level.id} / 34
          </div>
        </div>
      </div>

      {/* Main layout deck card */}
      <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
        
        {/* Navigation Tabs - Steering Wheel style: 1. Chat, 2. Simulador, 3. Predicción, 4. Fórmulas, 5. Saber 11 */}
        <div className="grid grid-cols-5 border-b border-slate-800 bg-slate-950 font-mono text-[9px] md:text-xs">
          <button
            onClick={() => setActiveTab('narrative')}
            className={`py-4 flex flex-col sm:flex-row items-center justify-center gap-1 md:gap-2 border-r border-slate-800 font-bold uppercase transition-all cursor-pointer ${
              activeTab === 'narrative' 
                ? 'bg-slate-900 text-cyan-400 border-b-2 border-b-cyan-500' 
                : 'text-slate-400 hover:text-slate-150 hover:bg-slate-900/20'
            }`}
            id="tab-narrative"
          >
            <MessageSquare className="w-4 h-4 shrink-0" />
            <span className="hidden md:inline">1. Chat Cabina</span>
            <span className="md:hidden">1. Chat</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('simulator');
              handleSimReset();
            }}
            className={`py-4 flex flex-col sm:flex-row items-center justify-center gap-1 md:gap-2 border-r border-slate-800 font-bold uppercase transition-all cursor-pointer ${
              activeTab === 'simulator' 
                ? 'bg-slate-900 text-cyan-400 border-b-2 border-b-cyan-500' 
                : 'text-slate-400 hover:text-slate-150 hover:bg-slate-900/20'
            }`}
            id="tab-simulator"
          >
            <Play className="w-4 h-4 shrink-0 text-teal-400 animate-pulse" />
            <span className="hidden md:inline">2. Simulador</span>
            <span className="md:hidden">2. Sim</span>
          </button>

          <button
            onClick={() => setActiveTab('prediction')}
            className={`py-4 flex flex-col sm:flex-row items-center justify-center gap-1 md:gap-2 border-r border-slate-800 font-bold uppercase transition-all cursor-pointer ${
              activeTab === 'prediction' 
                ? 'bg-slate-900 text-cyan-400 border-b-2 border-b-cyan-500' 
                : 'text-slate-400 hover:text-slate-150 hover:bg-slate-900/20'
            }`}
            id="tab-prediction"
          >
            <BrainCircuit className="w-4 h-4 shrink-0" />
            <span className="hidden md:inline">3. Predicción</span>
            <span className="md:hidden">3. Predic</span>
          </button>

          <button
            onClick={() => setActiveTab('concepts')}
            className={`py-4 flex flex-col sm:flex-row items-center justify-center gap-1 md:gap-2 border-r border-slate-800 font-bold uppercase transition-all cursor-pointer ${
              activeTab === 'concepts' 
                ? 'bg-slate-900 text-cyan-400 border-b-2 border-b-cyan-500' 
                : 'text-slate-400 hover:text-slate-150 hover:bg-slate-900/20'
            }`}
            id="tab-concepts"
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <span className="hidden md:inline">4. Fórmulas</span>
            <span className="md:hidden">4. Form</span>
          </button>

          <button
            onClick={() => setActiveTab('saber11')}
            className={`py-4 flex flex-col sm:flex-row items-center justify-center gap-1 md:gap-2 font-bold uppercase transition-all cursor-pointer ${
              activeTab === 'saber11' 
                ? 'bg-slate-900 text-cyan-400 border-b-2 border-b-cyan-500' 
                : 'text-slate-400 hover:text-slate-150 hover:bg-slate-900/20'
            }`}
            id="tab-saber11"
          >
            <GraduationCap className="w-4 h-4 shrink-0" />
            <span className="hidden md:inline">5. Saber 11</span>
            <span className="md:hidden">5. Saber</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="p-6 md:p-8 min-h-[380px] bg-slate-950 text-slate-100">
          
          {/* TAB: SIMULATOR (INTERACTIVE PHYSICS CHAMBER) */}
          {activeTab === 'simulator' && (
            <div className="space-y-6 animate-fade-in" id="simulator-container">
              {level.id >= 25 && level.id <= 29 ? (
                <div className="space-y-6">
                  <Module4Graphics levelId={level.id} />
                  <div className="flex justify-end pt-4 border-t border-slate-800">
                    <button
                      onClick={() => setActiveTab('prediction')}
                      className="px-6 py-3.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-mono font-black text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-all shadow-lg uppercase tracking-wider"
                    >
                      Ir a Predicción (Paso 3)
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : level.id >= 30 && level.id <= 34 ? (
                <div className="space-y-6">
                  <Module5Graphics levelId={level.id} />
                  <div className="flex justify-end pt-4 border-t border-slate-800">
                    <button
                      onClick={() => setActiveTab('prediction')}
                      className="px-6 py-3.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-mono font-black text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-all shadow-lg uppercase tracking-wider"
                    >
                      Ir a Predicción (Paso 3)
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-ping"></span>
                    <h3 className="font-mono text-xs uppercase tracking-wider text-teal-600 font-bold">
                      🧪 CÁMARA DE SIMULACIÓN GRAVITATORIA (VACÍO VS AIRE)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* 1. Falling Tube Viewport */}
                <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-2 border-slate-800 rounded-3xl p-4 flex flex-col items-center relative overflow-hidden shadow-xl min-h-[360px]">
                  {/* Tube Reflection highlights */}
                  <div className="absolute top-0 bottom-0 left-12 w-1.5 bg-white/5 pointer-events-none"></div>
                  <div className="absolute top-0 bottom-0 right-12 w-2.5 bg-white/2 pointer-events-none"></div>

                  {/* Altitude scales on the side */}
                  <div className="absolute left-4 top-10 bottom-10 flex flex-col justify-between text-[8px] font-mono text-slate-500 border-r border-slate-800/10 pr-2 pointer-events-none select-none">
                    <span>150 m</span>
                    <span>120 m</span>
                    <span>90 m</span>
                    <span>60 m</span>
                    <span>30 m</span>
                    <span>0 m (Suelo)</span>
                  </div>

                  {/* Environment indicator */}
                  <div className="absolute top-4 right-4 bg-slate-900/90 border border-slate-800 px-2 py-1 rounded-md text-[8px] font-mono text-slate-300 font-extrabold uppercase tracking-widest z-20">
                    {simAirResistance ? "💨 Cámara Con Aire (Atmósfera)" : "🌌 Cámara Al Vacío (100% Vacuum)"}
                  </div>

                  {/* FALL CHAMBER CYLINDER */}
                  <div className="w-full max-w-[200px] h-[260px] bg-slate-950/40 rounded-2xl relative border border-slate-800/80 mt-6 overflow-hidden">
                    {/* Vertical grid lines inside cylinder */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:100%_20px] pointer-events-none"></div>
                    
                    {/* Floor boundary glow */}
                    <div className="absolute bottom-0 inset-x-0 h-2 bg-emerald-500/20 border-t border-emerald-500/30"></div>

                    {/* TWO FALLING OBJECTS */}
                    {/* A. Lead Ball (Plomo) */}
                    <div 
                      className="absolute left-[20%] w-10 flex flex-col items-center transition-all duration-75"
                      style={{ 
                        transform: `translateY(${leadY}px)`,
                        top: '10px'
                      }}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-400 via-slate-600 to-slate-800 border-2 border-slate-300 shadow-lg flex items-center justify-center text-white font-black text-[9px]">
                        Pb
                      </div>
                      <span className="text-[7px] font-mono text-slate-400 font-bold uppercase mt-1">Plomo</span>
                    </div>

                    {/* B. Feather (Pluma) */}
                    <div 
                      className="absolute right-[20%] w-10 flex flex-col items-center transition-all duration-75"
                      style={{ 
                        transform: `translateY(${featherY}px)`,
                        top: '10px'
                      }}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-300 via-sky-100 to-teal-200 border-2 border-sky-300/45 shadow-lg flex items-center justify-center text-teal-800 text-sm animate-pulse">
                        🪶
                      </div>
                      <span className="text-[7px] font-mono text-slate-400 font-bold uppercase mt-1">Pluma</span>
                    </div>
                  </div>

                  {/* Telemetry bottom status inside tube */}
                  <div className="mt-4 text-center z-10">
                    <span className="font-mono text-[9px] text-teal-400 font-extrabold uppercase bg-teal-950/80 px-2 py-0.5 rounded border border-teal-500/20">
                      TIEMPO CORRIDO: {simTime}s / {simMaxTime}s
                    </span>
                  </div>
                </div>

                {/* 2. Controls & Advanced Settings */}
                <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">📊 TELEMETRÍA CIENTÍFICA EN VIVO</h4>
                      <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                          <span className="text-cyan-400 font-bold text-[9px] uppercase tracking-wider">⚪ ESFERA DE PLOMO:</span>
                          <p className="text-slate-300 font-semibold">Altura caída: <span className="font-bold text-amber-400">{dLead} m</span></p>
                          <p className="text-slate-300 font-semibold">Velocidad: <span className="font-bold text-amber-400">{vLead} m/s</span></p>
                        </div>
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                          <span className="text-teal-400 font-bold text-[9px] uppercase tracking-wider">🪶 PLUMA EXPEDICIONARIA:</span>
                          <p className="text-slate-300 font-semibold">Altura caída: <span className="font-bold text-teal-400">{dFeather} m</span></p>
                          <p className="text-slate-300 font-semibold">Velocidad: <span className="font-bold text-teal-400">{vFeather} m/s</span></p>
                        </div>
                      </div>
                    </div>

                    {/* CONFIGURATION DECK */}
                    <div className="space-y-4">
                      {/* Slider 1: Velocidad Inicial */}
                      <div className="space-y-1 text-left">
                        <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
                          <label className="flex items-center gap-1">🚀 Velocidad Inicial ($v_0$):</label>
                          <span className="font-mono text-teal-400 font-bold bg-teal-950 px-2 py-0.5 rounded border border-teal-800">{simInitialVelocity} m/s</span>
                        </div>
                        <input 
                          type="range"
                          min="0"
                          max="15"
                          step="1"
                          value={simInitialVelocity}
                          onChange={(e) => {
                            setSimInitialVelocity(Number(e.target.value));
                            handleSimReset();
                          }}
                          className="w-full accent-teal-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                        />
                        <span className="text-[9px] text-slate-500 font-medium block">Ajusta la velocidad inicial con la que se disparan los objetos hacia abajo.</span>
                      </div>

                      {/* Slider 2: Fall Limit Time */}
                      <div className="space-y-1 text-left">
                        <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
                          <label className="flex items-center gap-1">⏱️ Límite de Tiempo de Simulación (t_máx):</label>
                          <span className="font-mono text-amber-400 font-bold bg-amber-950 px-2 py-0.5 rounded border border-amber-800">{simMaxTime} segundos</span>
                        </div>
                        <input 
                          type="range"
                          min="2"
                          max="10"
                          step="1"
                          value={simMaxTime}
                          onChange={(e) => {
                            setSimMaxTime(Number(e.target.value));
                            handleSimReset();
                          }}
                          className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                        />
                        <span className="text-[9px] text-slate-500 font-medium block">Controla la escala temporal del experimento.</span>
                      </div>

                      {/* Toggles */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {/* Gravity Toggle */}
                        <button
                          onClick={() => {
                            setSimGravityActive(!simGravityActive);
                            handleSimReset();
                          }}
                          className={`flex items-center justify-between p-3 rounded-xl border font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
                            simGravityActive 
                              ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300' 
                              : 'bg-slate-900 border-slate-800 text-slate-500'
                          }`}
                        >
                          <span>🌍 GRAVEDAD {simGravityActive ? "ACTIVA" : "NULA"}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-950 border border-slate-850 rounded">
                            {simGravityActive ? "g = 9.8" : "g = 0"}
                          </span>
                        </button>

                        {/* Vacuum Toggle */}
                        <button
                          onClick={() => {
                            setSimAirResistance(!simAirResistance);
                            handleSimReset();
                          }}
                          className={`flex items-center justify-between p-3 rounded-xl border font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
                            !simAirResistance 
                              ? 'bg-sky-950/40 border-sky-500/30 text-sky-300' 
                              : 'bg-orange-950/40 border-orange-500/30 text-orange-300'
                          }`}
                        >
                          <span>🌌 CÁMARA DE VACÍO</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-950 border border-slate-850 rounded">
                            {!simAirResistance ? "VACÍO" : "CON AIRE"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* CONTROL BUTTONS FOR SIMULATION */}
                  <div className="flex gap-3 pt-4 border-t border-slate-800">
                    <button
                      onClick={() => setSimPlaying(!simPlaying)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-mono font-bold text-xs uppercase cursor-pointer transition-all ${
                        simPlaying 
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/15' 
                          : 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-md shadow-teal-500/15'
                      }`}
                    >
                      {simPlaying ? (
                        <>
                          <Pause className="w-4 h-4" /> Pausar Simulación
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 animate-bounce" /> Iniciar Caída (Play)
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleSimReset}
                      className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-mono font-bold text-xs rounded-xl cursor-pointer transition-all flex items-center gap-1.5 uppercase"
                    >
                      <RotateCcw className="w-4 h-4" /> Reiniciar
                    </button>

                    <button
                      onClick={() => setActiveTab('prediction')}
                      className="px-6 py-3.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-mono font-black text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-all shadow-lg uppercase tracking-wider"
                    >
                      Ir a Predicción (Paso 3)
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
                </>
              )}
            </div>
          )}

          {/* TAB 1: NARRATIVE (CONVERSACIÓN CON LOS EXTROVERS) */}
          {activeTab === 'narrative' && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#5A5A40] animate-ping"></span>
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#5A5A40] font-bold">
                  REGISTRO DE TRANSMISIONES DE CABINA - {level.title}
                </h3>
              </div>

              {/* Chat bubbles */}
              <div className="space-y-4 max-w-3xl">
                {/* Narrador block */}
                <div className="bg-[#FAF9F6] p-5 rounded-2xl border border-[#D1C7B7] leading-relaxed text-sm text-[#433E37] font-serif italic">
                  <span className="font-mono text-[9px] text-[#5A5A40] block font-bold mb-1 uppercase tracking-wider not-italic">Bitácora de Sucesos</span>
                  {level.narrative}
                </div>

                {/* Dialogo 1 - Alisson (Navegadora) */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-center flex items-center justify-center text-lg shadow-lg shrink-0">
                    💻
                  </div>
                  <div className="bg-slate-950 p-4 rounded-r-2xl rounded-bl-2xl border border-slate-800 max-w-xl text-sm text-slate-100">
                    <span className="font-mono text-xs text-cyan-400 font-extrabold block mb-1">Alisson Quintero</span>
                    "Chicos, el panel holográfico reporta lecturas de {level.conceptTitle}. Para abrir el portal necesitamos sincronizar los vectores de velocidad cinemática. ¡Brayan, Michell, revisen las coordenadas!"
                  </div>
                </div>

                {/* Dialogo 2 - Brayan (Sistemas) */}
                <div className="flex gap-4 items-start flex-row-reverse">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center flex items-center justify-center text-lg shadow-lg shrink-0">
                    👨‍🚀
                  </div>
                  <div className="bg-slate-900 p-4 rounded-l-2xl rounded-br-2xl border border-slate-800 max-w-xl text-sm text-right text-slate-100">
                    <span className="font-mono text-xs text-amber-400 font-extrabold block mb-1">Brayan Conrado</span>
                    "Sistemas cargados. Para asegurar el trayecto, primero debemos modelar teóricamente lo que pasará en el espacio. Hagamos una pequeña predicción antes de liberar las fórmulas..."
                  </div>
                </div>

                {/* Dialogo 3 - Michell (Telemetría) */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-center flex items-center justify-center text-lg shadow-lg shrink-0">
                    👩‍🚀
                  </div>
                  <div className="bg-slate-950 p-4 rounded-r-2xl rounded-bl-2xl border border-slate-800 max-w-xl text-sm text-slate-100">
                    <span className="font-mono text-xs text-purple-400 font-extrabold block mb-1">Michell Barrientos</span>
                    "Excelente plan. Alisson, coloca el módulo en modo de análisis primario. Colega asistente, haz clic en el botón de abajo para ayudarnos con la predicción del experimento físico."
                  </div>
                </div>

                {/* Dialogo 4 - Nova (IA Holográfica Especialista) */}
                <div className="flex gap-4 items-start flex-row-reverse bg-slate-900/40 p-4.5 rounded-2xl border border-emerald-500/30">
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <button 
                      onClick={handleNovaClick}
                      className="cursor-pointer hover:scale-105 active:scale-95 transition-all outline-none"
                      title="¡Haz clic en Nova para animarla y escuchar un consejo físico!"
                    >
                      <NovaAvatar animation={novaAnim} />
                    </button>
                    <span className="font-mono text-[8px] font-black text-emerald-400 uppercase tracking-widest mt-1">¡Hazme Clic!</span>
                  </div>
                  <div className="flex-1 text-right text-slate-100">
                    <span className="font-mono text-xs text-emerald-400 font-extrabold block mb-1">Nova (Guía de Física)</span>
                    <p className="text-sm italic leading-relaxed">
                      "{novaLevelTips[level.id] || '¡Sincroniza los reactores cuánticos!'}"
                    </p>
                    {showNovaBubble && (
                      <div className="mt-2.5 bg-slate-950 p-3 rounded-lg border border-cyan-500/20 text-[10px] text-cyan-300 font-mono text-center animate-bounce">
                        💡 Nova dice: "{novaQuotes[novaQuoteIndex]}"
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Mission Objective panel */}
              <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-5 rounded-2xl border-2 border-slate-800 space-y-3 shadow-inner">
                <div className="flex items-center gap-2 text-amber-400">
                  <Star className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span className="font-mono text-[10px] font-black uppercase tracking-widest">OBJETIVO DE LA MISIÓN COGNITIVA</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium">
                  Comprender las variables físicas asociadas a <strong className="text-white">{level.conceptTitle}</strong> mediante el laboratorio de simulación táctica. Somete una hipótesis correcta en la fase de Predicción, y luego resuelve la pregunta tipo ICFES Saber 11 para abrir el portal dimensional. ¡Obtendrás <strong className="text-emerald-400">{level.xpReward} XP</strong> y <strong className="text-amber-400">{level.coinsReward} monedas cuánticas</strong>!
                </p>
              </div>

              {/* Navigation trigger button */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => {
                    setActiveTab('simulator');
                    handleSimReset();
                  }}
                  className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-mono font-black text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-all shadow-lg uppercase tracking-wider"
                >
                  Ir al Simulador (Paso 2)
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: PREDICTION SECTION */}
          {activeTab === 'prediction' && (
            <div className="space-y-6 text-left text-slate-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping"></span>
                <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-bold">
                  DESAFÍO COGNITIVO: CONTROL DE HIPÓTESIS PRE-SABER
                </h3>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1 font-bold">PREGUNTA DE PREDICCIÓN</span>
                <p className="text-white text-base leading-relaxed font-sans font-bold">
                  {level.prediction.question}
                </p>
              </div>

              {/* Option blocks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {level.prediction.options.map((option, idx) => {
                  const letter = option.charAt(0);
                  const isSelected = predictionSelected === letter;

                  return (
                    <button
                      key={idx}
                      onClick={() => handlePredictionChoice(letter)}
                      className={`p-4 rounded-xl border text-left text-xs md:text-sm transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 ring-2 ring-cyan-500/15 font-bold shadow-md' 
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-cyan-500 hover:bg-slate-950'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {/* Prediction Explanation block */}
              {showPredictionFeedback && predictionSelected && (
                <div className={`p-5 rounded-2xl border animate-fade-in ${
                  predictionSelected === 'B' || (level.id === 5 && predictionSelected === 'C') || (level.id === 9 && predictionSelected === 'B') || (level.id === 10 && predictionSelected === 'B') || (level.id === 8 && predictionSelected === 'B') || (level.id === 6 && predictionSelected === 'B') || (level.id === 7 && predictionSelected === 'B')
                    ? 'bg-emerald-950/40 border-emerald-500/35 text-emerald-300'
                    : 'bg-amber-950/40 border-amber-500/35 text-amber-300'
                }`}>
                  <div className="flex gap-2.5 items-start">
                    <span className="text-lg">🛎️</span>
                    <div>
                      <span className="font-mono text-[10px] uppercase font-bold block mb-1 tracking-wider">
                        TELEMETRÍA DE CORRECCIÓN:
                      </span>
                      <p className="text-xs leading-relaxed text-slate-105 font-medium">
                        {level.prediction.explanation[predictionSelected]}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Next tab shortcut */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-[10px] font-mono text-slate-400 font-semibold">
                  * La predicción es libre para afianzar intuición física, no penaliza tus monedas.
                </span>
                
                <button
                  onClick={() => setActiveTab('concepts')}
                  className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-mono font-black text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-all shadow-lg shrink-0 uppercase"
                >
                  Estudiar Fórmulas Científicas
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: KEY CONCEPTS STUDY TAB */}
          {activeTab === 'concepts' && (
            <div className="space-y-6 text-left text-slate-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping"></span>
                <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-bold">
                  SALA DE ESTUDIO DEL PROFESOR JORGE JARAMILLO - CONCEPTOS
                </h3>
              </div>

              {/* Futuristic slate screen */}
              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
                <div className="absolute top-3 right-4 font-mono text-[9px] text-slate-500 select-none font-semibold">
                  SISTEMA_DEDUCCIÓN_COGNITIVA_V1.1
                </div>

                <h4 className="text-lg font-black text-white flex items-center gap-2 pb-3 border-b border-slate-800 uppercase tracking-tight">
                  <GraduationCap className="w-5 h-5 text-cyan-400" />
                  Materia de Refuerzo: {level.conceptTitle}
                </h4>

                <ul className="space-y-4 mt-6">
                  {level.concepts.map((concept, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-slate-200 leading-relaxed font-sans font-medium">
                      <div className="w-5 h-5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 shadow-md">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        {concept}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Theoretical tips block */}
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-xs text-slate-300 leading-relaxed font-medium shadow-xl">
                👨‍🏫 <strong className="text-cyan-400 font-black uppercase">Consejo Curricular:</strong> El ICFES evalúa constantemente tu capacidad de discernimiento entre cambios lineales y cuadráticos. Las gráficas de velocidad constante son líneas rectas diagonales en posición (x), pero horizontales en velocidad (v). ¡No las confundas!
              </div>

              {/* Navigation to evaluation */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setActiveTab('saber11')}
                  className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-mono font-black text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-all shadow-lg uppercase tracking-wider"
                >
                  Iniciar Evaluación Saber 11 📝
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: SABER 11 PHYSICS QUESTION */}
          {activeTab === 'saber11' && (
            <div className="space-y-6 text-left text-slate-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping"></span>
                <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-bold">
                  SINOPSIS ACADÉMICA DEL ICFES SABER 11 - FÍSICA MECÁNICA
                </h3>
              </div>

              {/* Stimulus Context box */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 leading-relaxed text-sm text-slate-300 space-y-4">
                <span className="font-mono text-[9px] text-cyan-400 block font-bold uppercase tracking-wide">
                  CONTEXTO DE OBSERVACIÓN (ESTÍMULO):
                </span>
                <p className="whitespace-pre-line">{level.saber11.context}</p>
                {level.saber11.imageUrl && (
                  <div className="mt-4 flex flex-col items-center justify-center bg-white p-4 rounded-2xl border-2 border-slate-700 shadow-xl overflow-hidden">
                    <img 
                      src={level.saber11.imageUrl} 
                      alt="Diagrama o gráfica de la pregunta ICFES Saber 11" 
                      className="max-h-80 w-auto object-contain rounded-lg"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-[10px] font-mono text-slate-600 font-bold uppercase tracking-wider mt-2">
                      FIGURA OFICIAL ICFES SABER 11
                    </span>
                  </div>
                )}
              </div>

              {/* Module 4 Graphics (Levels 25 to 29) */}
              {level.id >= 25 && level.id <= 29 && (
                <div className="my-4">
                  <Module4Graphics levelId={level.id} />
                </div>
              )}

              {/* Module 5 Graphics (Levels 30 to 34) */}
              {level.id >= 30 && level.id <= 34 && (
                <div className="my-4">
                  <Module5Graphics levelId={level.id} />
                </div>
              )}

              {/* GRAPHICS / TELEMETRY HTML WORKPLACE FOR RELEVANT LEVELS */}
              {(level.id === 1 || level.id === 3 || level.id === 4 || level.id === 5 || level.id === 10) && (
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 font-mono text-[10px] text-slate-300 shadow-2xl">
                  <span className="text-amber-400 block uppercase font-bold tracking-wider mb-2">📊 TELEMETRÍA TÁCTICA DEL PORTAL (GRÁFICAS CIENTÍFICAS)</span>
                  
                  {/* MRU linear motion visualization for Level 1 */}
                  {level.id === 1 && (
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                      <div className="flex justify-between border-b border-slate-800 pb-2 mb-2 text-slate-400 font-bold text-xs">
                        <span>Gráfica de Posición x(t) para MRU</span>
                        <span className="text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20 font-mono">Rapidez v = 72 km/h (20 m/s)</span>
                      </div>
                      
                      <svg className="w-full h-32 text-slate-300" viewBox="0 0 500 130">
                        {/* Grid Lines */}
                        <line x1="50" y1="20" x2="480" y2="20" stroke="#1e293b" strokeDasharray="3,3" />
                        <line x1="50" y1="55" x2="480" y2="55" stroke="#1e293b" strokeDasharray="3,3" />
                        <line x1="50" y1="90" x2="480" y2="90" stroke="#1e293b" strokeDasharray="3,3" />
                        <line x1="157" y1="10" x2="157" y2="100" stroke="#1e293b" strokeDasharray="3,3" />
                        <line x1="265" y1="10" x2="265" y2="100" stroke="#1e293b" strokeDasharray="3,3" />
                        <line x1="372" y1="10" x2="372" y2="100" stroke="#1e293b" strokeDasharray="3,3" />
                        
                        {/* Axes */}
                        <line x1="50" y1="100" x2="480" y2="100" stroke="#64748b" strokeWidth="2" />
                        <line x1="50" y1="10" x2="50" y2="100" stroke="#64748b" strokeWidth="2" />
                        
                        {/* Axes Arrows */}
                        <polygon points="480,97 487,100 480,103" fill="#64748b" />
                        <polygon points="47,10 50,3 53,10" fill="#64748b" />
                        
                        {/* Labels */}
                        <text x="35" y="15" fill="#94a3b8" fontSize="10" fontWeight="bold">x (m)</text>
                        <text x="450" y="115" fill="#94a3b8" fontSize="10" fontWeight="bold">t (s)</text>
                        
                        {/* ticks */}
                        <text x="30" y="103" fill="#64748b" fontSize="9">0</text>
                        <text x="30" y="58" fill="#64748b" fontSize="9">100</text>
                        <text x="30" y="23" fill="#64748b" fontSize="9">200</text>
                        <text x="150" y="112" fill="#64748b" fontSize="9">2.5</text>
                        <text x="260" y="112" fill="#64748b" fontSize="9">5.0</text>
                        <text x="365" y="112" fill="#64748b" fontSize="9">7.5</text>
                        <text x="470" y="112" fill="#64748b" fontSize="9">10.0</text>
                        
                        {/* Plot Line (Diagonal MRU Position) */}
                        <line x1="50" y1="100" x2="470" y2="20" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" />
                        
                        {/* Data Points */}
                        <circle cx="260" cy="60" r="4.5" fill="#f59e0b" />
                        <circle cx="470" cy="20" r="4.5" fill="#06b6d4" />
                      </svg>
                    </div>
                  )}

                  {/* Piecewise line for Level 3 */}
                  {level.id === 3 && (
                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-4 shadow-2xl">
                      <div className="flex justify-between border-b border-slate-800 pb-2 mb-2 text-slate-400 font-bold text-xs">
                        <span>Gráfica de Posición x(t) de la Sonda Espacial</span>
                        <span className="text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20 font-mono text-[10px]">Análisis de Intervalos por Tramo</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <svg className="w-full max-w-[500px] h-36 text-slate-300" viewBox="0 0 500 150">
                          {/* Grid Lines */}
                          <line x1="50" y1="30" x2="480" y2="30" stroke="#1e293b" strokeDasharray="3,3" />
                          <line x1="50" y1="70" x2="480" y2="70" stroke="#1e293b" strokeDasharray="3,3" />
                          <line x1="150" y1="15" x2="150" y2="110" stroke="#1e293b" strokeDasharray="3,3" />
                          <line x1="350" y1="15" x2="350" y2="110" stroke="#1e293b" strokeDasharray="3,3" />
                          <line x1="450" y1="15" x2="450" y2="110" stroke="#1e293b" strokeDasharray="3,3" />
                          
                          {/* Axes */}
                          <line x1="50" y1="110" x2="480" y2="110" stroke="#64748b" strokeWidth="2" />
                          <line x1="50" y1="15" x2="50" y2="110" stroke="#64748b" strokeWidth="2" />
                          
                          {/* Axes Arrows */}
                          <polygon points="480,107 487,110 480,113" fill="#64748b" />
                          <polygon points="47,15 50,8 53,15" fill="#64748b" />
                          
                          {/* Axis Title Labels */}
                          <text x="60" y="20" fill="#94a3b8" fontSize="10" fontWeight="bold">Posición x (m)</text>
                          <text x="445" y="125" fill="#94a3b8" fontSize="10" fontWeight="bold">Tiempo t (min)</text>
                          
                          {/* ticks */}
                          <text x="32" y="114" fill="#64748b" fontSize="9">0</text>
                          <text x="20" y="34" fill="#64748b" fontSize="9">300m</text>
                          <text x="142" y="122" fill="#64748b" fontSize="9">3 min</text>
                          <text x="342" y="122" fill="#64748b" fontSize="9">8 min</text>
                          <text x="438" y="122" fill="#64748b" fontSize="9">10 min</text>
                          
                          {/* Shaded Area Under Line for Visual Depth */}
                          <path d="M 50 110 L 150 30 L 350 30 L 450 110 Z" fill="rgba(6, 182, 212, 0.05)" />
                          
                          {/* Plot Line segments */}
                          <line x1="50" y1="110" x2="150" y2="30" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" />
                          <line x1="150" y1="30" x2="350" y2="30" stroke="#f59e0b" strokeWidth="3" strokeDasharray="5,3" strokeLinecap="round" />
                          <line x1="350" y1="30" x2="450" y2="110" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" />
                          
                          {/* Data Points */}
                          <circle cx="150" cy="30" r="4.5" fill="#06b6d4" />
                          <circle cx="350" cy="30" r="4.5" fill="#f59e0b" />
                          <circle cx="450" cy="110" r="4.5" fill="#06b6d4" />
                        </svg>

                        {/* Interactive structured explanation below the graph for superior organization */}
                        <div className="w-full mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-center text-xs font-sans text-slate-300">
                          <div className="border-b md:border-b-0 md:border-r border-slate-800 pb-2 md:pb-0 md:pr-2">
                            <span className="text-cyan-400 block font-mono font-bold text-[9px] uppercase tracking-wider">Tramo 1 (0 a 3 min)</span>
                            <span className="text-slate-200 font-medium block mt-0.5">La sonda avanza de 0m a 300m</span>
                            <span className="text-cyan-400 block font-bold text-[10px] mt-1 font-mono">Velocidad = +100 m/min (Alejamiento)</span>
                          </div>
                          <div className="border-b md:border-b-0 md:border-r border-slate-800 py-2 md:py-0 md:px-2">
                            <span className="text-amber-400 block font-mono font-bold text-[9px] uppercase tracking-wider">Tramo 2 (3 a 8 min)</span>
                            <span className="text-slate-200 font-medium block mt-0.5">Permanece inmóvil a 300m</span>
                            <span className="text-amber-400 block font-bold text-[10px] mt-1 font-mono">En reposo absoluto (v = 0)</span>
                          </div>
                          <div className="pt-2 md:pt-0 md:pl-2">
                            <span className="text-purple-400 block font-mono font-bold text-[9px] uppercase tracking-wider">Tramo 3 (8 a 10 min)</span>
                            <span className="text-slate-200 font-medium block mt-0.5">Regresa de 300m a 0m</span>
                            <span className="text-rose-400 block font-bold text-[10px] mt-1 font-mono">Velocidad = -150 m/min (Retorno)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Area under curve for Level 4 */}
                  {level.id === 4 && (
                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-4 shadow-2xl">
                      <div className="flex justify-between border-b border-slate-800 pb-2 text-slate-400 font-bold text-xs">
                        <span>Análisis de Área bajo la Curva v(t) - Dron Alpha vs Dron Beta</span>
                        <span className="text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20 font-mono text-[10px]">Cálculo Integrador de Distancia</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Dron Alpha (Triángulo) */}
                        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl shadow-md">
                          <span className="text-cyan-400 font-mono text-[10px] font-bold block pb-1 border-b border-slate-800 mb-2 uppercase">📈 DRON GUARDIÁN ALPHA (Aceleración Constante)</span>
                          <div className="flex flex-col items-center">
                            <svg className="w-full max-w-[240px] h-32 text-slate-300" viewBox="0 0 250 120">
                              {/* Grid */}
                              <line x1="35" y1="20" x2="230" y2="20" stroke="#1e293b" strokeDasharray="2,2" />
                              <line x1="35" y1="60" x2="230" y2="60" stroke="#1e293b" strokeDasharray="2,2" />
                              <line x1="132" y1="15" x2="132" y2="100" stroke="#1e293b" strokeDasharray="2,2" />
                              <line x1="230" y1="15" x2="230" y2="100" stroke="#1e293b" strokeDasharray="2,2" />
                              
                              {/* Colored Triangle Fill (Area) */}
                              <polygon points="35,100 230,20 230,100" fill="rgba(6, 182, 212, 0.15)" />
                              
                              {/* Axes */}
                              <line x1="35" y1="100" x2="235" y2="100" stroke="#64748b" strokeWidth="1.5" />
                              <line x1="35" y1="10" x2="35" y2="100" stroke="#64748b" strokeWidth="1.5" />
                              
                              {/* Labels */}
                              <text x="20" y="15" fill="#94a3b8" fontSize="8" fontWeight="bold">v (m/s)</text>
                              <text x="225" y="112" fill="#94a3b8" fontSize="8" fontWeight="bold">t (s)</text>
                              <text x="15" y="103" fill="#64748b" fontSize="8">0</text>
                              <text x="10" y="63" fill="#64748b" fontSize="8">10</text>
                              <text x="10" y="23" fill="#64748b" fontSize="8">20</text>
                              <text x="125" y="110" fill="#64748b" fontSize="8">5s</text>
                              <text x="222" y="110" fill="#64748b" fontSize="8">10s</text>
                              
                              {/* Plot line */}
                              <line x1="35" y1="100" x2="230" y2="20" stroke="#06b6d4" strokeWidth="2.5" />
                              <circle cx="230" cy="20" r="3.5" fill="#06b6d4" />
                            </svg>
                            
                            <div className="mt-2 text-center text-[11px] font-sans bg-slate-950 border border-slate-800 p-2.5 rounded-lg w-full text-slate-300">
                              <span className="text-cyan-400 font-bold block text-[9px] uppercase font-mono tracking-wide">ÁREA DEL TRIÁNGULO</span>
                              <p className="text-slate-400 font-medium mt-0.5">Distancia = (Base × Altura) / 2</p>
                              <p className="text-white font-bold mt-0.5">Distancia = (10s × 20 m/s) / 2 = 100 m</p>
                            </div>
                          </div>
                        </div>

                        {/* Dron Beta (Rectángulo) */}
                        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl shadow-md">
                          <span className="text-amber-400 font-mono text-[10px] font-bold block pb-1 border-b border-slate-800 mb-2 uppercase">📈 DRON CENTINELA BETA (Rapidez Constante)</span>
                          <div className="flex flex-col items-center">
                            <svg className="w-full max-w-[240px] h-32 text-slate-300" viewBox="0 0 250 120">
                              {/* Grid */}
                              <line x1="35" y1="20" x2="230" y2="20" stroke="#1e293b" strokeDasharray="2,2" />
                              <line x1="35" y1="60" x2="230" y2="60" stroke="#1e293b" strokeDasharray="2,2" />
                              <line x1="132" y1="15" x2="132" y2="100" stroke="#1e293b" strokeDasharray="2,2" />
                              <line x1="230" y1="15" x2="230" y2="100" stroke="#1e293b" strokeDasharray="2,2" />
                              
                              {/* Colored Rectangle Fill (Area) */}
                              <polygon points="35,60 230,60 230,100 35,100" fill="rgba(245, 158, 11, 0.15)" />
                              
                              {/* Axes */}
                              <line x1="35" y1="100" x2="235" y2="100" stroke="#64748b" strokeWidth="1.5" />
                              <line x1="35" y1="10" x2="35" y2="100" stroke="#64748b" strokeWidth="1.5" />
                              
                              {/* Labels */}
                              <text x="20" y="15" fill="#94a3b8" fontSize="8" fontWeight="bold">v (m/s)</text>
                              <text x="225" y="112" fill="#94a3b8" fontSize="8" fontWeight="bold">t (s)</text>
                              <text x="15" y="103" fill="#64748b" fontSize="8">0</text>
                              <text x="10" y="63" fill="#64748b" fontSize="8">10</text>
                              <text x="10" y="23" fill="#64748b" fontSize="8">20</text>
                              <text x="125" y="110" fill="#64748b" fontSize="8">5s</text>
                              <text x="222" y="110" fill="#64748b" fontSize="8">10s</text>
                              
                              {/* Plot line */}
                              <line x1="35" y1="60" x2="230" y2="60" stroke="#f59e0b" strokeWidth="2.5" />
                              <circle cx="230" cy="60" r="3.5" fill="#f59e0b" />
                            </svg>
                            
                            <div className="mt-2 text-center text-[11px] font-sans bg-slate-950 border border-slate-800 p-2.5 rounded-lg w-full text-slate-300">
                              <span className="text-amber-400 font-bold block text-[9px] uppercase font-mono tracking-wide">ÁREA DEL RECTÁNGULO</span>
                              <p className="text-slate-400 font-medium mt-0.5">Distancia = Base × Altura</p>
                              <p className="text-white font-bold mt-0.5">Distancia = 10s × 10 m/s = 100 m</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Summary box comparing results */}
                      <div className="bg-amber-950/20 border border-amber-500/25 p-3 rounded-xl text-center text-xs font-semibold text-amber-200 shadow-md">
                        ✨ <strong>Conclusión:</strong> Ambos drones recorren exactamente <strong>100 metros</strong> en los 10 segundos, aunque Dron Alpha acelera progresivamente y Dron Beta sostiene rapidez constante. ¡La geometría lo demuestra!
                      </div>
                    </div>
                  )}

                  {/* Level 5 Caída de Plomo y Pluma Interactiva */}
                  {level.id === 5 && (
                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col md:flex-row gap-6 items-center">
                      {/* Tube Visual representation */}
                      <div className="flex-1 flex flex-col items-center bg-slate-900 rounded-2xl p-4 text-white relative w-full max-w-[240px] border border-slate-800 shadow-lg">
                        <span className="text-[9px] font-mono font-black text-teal-400 tracking-wider uppercase mb-1">CÁMARA DE CAÍDA DIRECTA</span>
                        
                        <div className="absolute top-2 right-2 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded text-[8px] font-mono text-slate-300 font-bold">
                          {simAirResistance ? "💨 CON AIRE" : "🌌 EN VACÍO"}
                        </div>

                        {/* Tubes Container */}
                        <div className="w-full h-[180px] bg-slate-950/80 border border-slate-800 rounded-xl relative overflow-hidden mt-2">
                          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:100%_15px]"></div>
                          
                          {/* Floor line */}
                          <div className="absolute bottom-0 inset-x-0 h-1.5 bg-emerald-500/30 border-t border-emerald-500/40"></div>

                          {/* Lead Ball */}
                          <div 
                            className="absolute left-[15%] w-10 flex flex-col items-center transition-all duration-75"
                            style={{ transform: `translateY(${(leadY / 240) * 125}px)`, top: '5px' }}
                          >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-400 via-slate-500 to-slate-700 border border-slate-300 shadow flex items-center justify-center text-white text-[9px] font-black">Pb</div>
                            <span className="text-[6px] font-mono text-slate-400 uppercase mt-0.5 font-bold">Plomo</span>
                          </div>

                          {/* Feather */}
                          <div 
                            className="absolute right-[15%] w-10 flex flex-col items-center transition-all duration-75"
                            style={{ transform: `translateY(${(featherY / 240) * 125}px)`, top: '5px' }}
                          >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-200 to-sky-100 border border-sky-300 shadow flex items-center justify-center text-teal-700 text-sm">🪶</div>
                            <span className="text-[6px] font-mono text-slate-400 uppercase mt-0.5 font-bold">Pluma</span>
                          </div>
                        </div>

                        <div className="mt-2 text-center bg-teal-950/80 px-2.5 py-0.5 rounded border border-teal-800/40 text-[8px] font-mono text-teal-400 font-bold">
                          TIEMPO CORRIDO: {simTime}s / {simMaxTime}s
                        </div>
                      </div>

                      {/* Right Control Board */}
                      <div className="flex-[1.4] w-full space-y-4">
                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-2">
                          <h5 className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">🔬 LECTURA CINEMÁTICA EN VIVO</h5>
                          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-slate-200">
                              <span className="text-slate-400 font-bold text-[8px] block">⚪ BOLA DE PLOMO</span>
                              <p className="font-semibold text-slate-200 mt-0.5">Caído: <span className="text-amber-400 font-bold">{dLead} m</span></p>
                              <p className="font-semibold text-slate-200">Velocidad: <span className="text-amber-400 font-bold">{vLead} m/s</span></p>
                            </div>
                            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-cyan-400">
                              <span className="text-cyan-400 font-bold text-[8px] block">🪶 PLUMA DE AVE</span>
                              <p className="font-semibold text-slate-200 mt-0.5">Caído: <span className="font-bold">{dFeather} m</span></p>
                              <p className="font-semibold text-slate-200">Velocidad: <span className="font-bold">{vFeather} m/s</span></p>
                            </div>
                          </div>
                        </div>

                        {/* Interactive adjustments */}
                        <div className="grid grid-cols-2 gap-2">
                          {/* Gravity */}
                          <button
                            onClick={() => {
                              setSimGravityActive(!simGravityActive);
                              handleSimReset();
                            }}
                            className={`p-2.5 rounded-xl border text-[9px] font-mono font-black uppercase transition-all cursor-pointer flex flex-col items-center justify-center text-center leading-tight ${
                              simGravityActive 
                                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300 font-bold shadow-md' 
                                : 'bg-rose-950/40 border-rose-500/30 text-rose-300 font-bold shadow-md'
                            }`}
                          >
                            <span>🪐 GRAVEDAD</span>
                            <span className="text-[9px] font-bold mt-0.5">{simGravityActive ? "g = 9.8 (ACTIVA) 🌍" : "g = 0 (NULA) 🌌"}</span>
                          </button>

                          {/* Vacuum */}
                          <button
                            onClick={() => {
                              setSimAirResistance(!simAirResistance);
                              handleSimReset();
                            }}
                            className={`p-2.5 rounded-xl border text-[9px] font-mono font-black uppercase transition-all cursor-pointer flex flex-col items-center justify-center text-center leading-tight ${
                              !simAirResistance 
                                ? 'bg-cyan-950/40 border-cyan-500/30 text-cyan-300 font-bold shadow-md' 
                                : 'bg-orange-950/40 border-orange-500/30 text-orange-300 font-bold shadow-md'
                            }`}
                          >
                            <span>🌌 RESISTENCIA</span>
                            <span className="text-[9px] font-bold mt-0.5">{!simAirResistance ? "VACÍO ABSOLUTO" : "CON AIRE 💨"}</span>
                          </button>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSimPlaying(!simPlaying)}
                            className={`flex-1 py-2.5 rounded-xl font-mono font-bold text-xs uppercase flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                              simPlaying 
                                ? 'bg-amber-500 text-slate-950 hover:bg-amber-600 shadow-lg font-black' 
                                : 'bg-cyan-600 text-slate-950 hover:bg-cyan-500 shadow-lg font-black'
                            }`}
                          >
                            {simPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            {simPlaying ? "Pausar" : "Pley (Play) ▶️"}
                          </button>
                          <button
                            onClick={handleSimReset}
                            className="p-2.5 bg-slate-850 hover:bg-slate-700 text-slate-300 font-mono font-bold text-xs rounded-xl cursor-pointer transition-all border border-slate-700"
                            title="Reiniciar"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Encounter of items for Level 10 */}
                  {level.id === 10 && (
                    <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl">
                      <div className="flex justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400 font-bold text-xs">
                        <span>Punto de Encuentro Sondas en Trayectoria Lineal</span>
                        <span className="text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20 font-mono">Separación Inicial = 1000 m</span>
                      </div>
                      
                      <div className="h-16 relative flex items-center justify-between border border-slate-800 my-2 bg-slate-900 rounded-xl overflow-hidden">
                        {/* Background track ticks */}
                        <div className="absolute inset-x-0 bottom-0 h-4 bg-slate-950 border-t border-slate-800 flex justify-between px-4 text-[8px] font-mono text-slate-400">
                          <span>0m</span>
                          <span>200m</span>
                          <span>400m</span>
                          <span className="text-amber-400 font-black">600m (Encuentro)</span>
                          <span>800m</span>
                          <span>1000m</span>
                        </div>

                        <div className="p-1 rounded bg-cyan-500/10 border border-cyan-500/30 font-bold text-cyan-400 text-[9px] z-10 ml-4 animate-pulse flex items-center gap-1">
                          🛰️ Sonda Alpha (vA = 30 m/s ➡️)
                        </div>

                        {/* Meeting point axis marker */}
                        <div className="absolute left-[60%] h-full w-[2px] bg-amber-500/50 z-10 flex flex-col justify-center items-center">
                          <span className="bg-amber-950/80 text-amber-300 border border-amber-500/35 text-[8px] font-mono px-1 rounded font-black -mt-6">
                            X = 600m
                          </span>
                        </div>

                        <div className="p-1 rounded bg-amber-500/10 border border-amber-500/30 font-bold text-amber-400 text-[9px] z-10 mr-4 animate-pulse flex items-center gap-1">
                          🚀 Sonda Beta (⬅️ vB = -20 m/s)
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 🔬 LABORATORIO DE DATOS INTERACTIVO (ACOMODAR DATOS) */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-black">
                      🔬 LABORATORIO DE DATOS INTERACTIVO
                    </h4>
                  </div>
                  <span className="font-mono text-[9px] bg-cyan-950/40 text-cyan-300 px-2.5 py-0.5 rounded-full font-black uppercase tracking-widest border border-cyan-500/20">
                    Modulador Cinético / Dinámico
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-normal font-medium">
                  Modifica las variables físicas con los deslizadores interactivos de abajo para simular el comportamiento del sistema y acomodar los datos de la evaluación. ¡Comprueba las ecuaciones en tiempo real!
                </p>

                {/* Level 1: MRU Constant Speed */}
                {level.id === 1 && (
                  <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Speed Slider */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono text-[10px] text-slate-300 font-bold">
                          <span>Rapidez Constante (v):</span>
                          <span className="text-amber-400">{calcVelocity} m/s</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="40"
                          step="1"
                          value={calcVelocity}
                          onChange={(e) => setCalcVelocity(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                        <div className="flex justify-between font-mono text-[8px] text-slate-500">
                          <span>0 m/s</span>
                          <span>40 m/s (Fácil control)</span>
                        </div>
                      </div>

                      {/* Time Slider */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono text-[10px] text-slate-300 font-bold">
                          <span>Tiempo de Recorrido (t):</span>
                          <span className="text-amber-400">{calcTime} s</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="20"
                          step="1"
                          value={calcTime}
                          onChange={(e) => setCalcTime(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                        <div className="flex justify-between font-mono text-[8px] text-slate-500">
                          <span>0 s</span>
                          <span>20 s</span>
                        </div>
                      </div>
                    </div>

                    {/* Math & Tracking */}
                    <div className="pt-3 border-t border-slate-800 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="font-mono text-xs font-bold text-cyan-400">
                          Ecuación: d = v · t
                        </div>
                        <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-center">
                          <span className="block text-[8px] text-slate-400 font-bold font-mono">DISTANCIA CALCULADA (d):</span>
                          <span className="font-mono text-sm font-black text-amber-400">{calcVelocity * calcTime} metros</span>
                        </div>
                        <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-center">
                          <span className="block text-[8px] text-slate-400 font-bold font-mono">ACELERACIÓN (a):</span>
                          <span className="font-mono text-sm font-black text-slate-500">0 m/s² (Fija)</span>
                        </div>
                      </div>

                      {/* Spaceship track visualization */}
                      <div className="relative h-8 bg-slate-900 rounded-lg overflow-hidden border border-slate-800">
                        {/* ticks */}
                        <div className="absolute left-0 text-[7px] text-slate-500 font-mono pl-1 top-0.5">0m</div>
                        <div className="absolute right-1 text-[7px] text-slate-500 font-mono top-0.5">Max 800m</div>
                        
                        {/* Animated Ship */}
                        <div 
                          className="absolute top-1 text-base transition-all duration-300"
                          style={{ left: `${Math.min(92, ((calcVelocity * calcTime) / 800) * 100)}%` }}
                        >
                          🚀
                        </div>
                        
                        {/* Progress line */}
                        <div 
                          className="absolute bottom-0 left-0 h-0.5 bg-amber-500 transition-all duration-300"
                          style={{ width: `${Math.min(100, ((calcVelocity * calcTime) / 800) * 100)}%` }}
                        ></div>
                      </div>

                      <div className="p-2.5 bg-slate-900/60 border border-slate-800 rounded-lg text-[10px] text-slate-400 font-medium leading-normal">
                        💡 <strong className="text-slate-200 font-bold">Ayuda Didáctica:</strong> Si dejas el tiempo en <span className="font-bold text-amber-400">10 s</span> y arrastras la velocidad a exactamente <span className="font-bold text-amber-400">20 m/s</span>, la distancia calculada te dará exactamente <span className="font-bold text-amber-400">200 m</span>, confirmando la predicción matemática de tu bitácora de vuelo.
                      </div>
                    </div>
                  </div>
                )}

                {/* Level 2: MRUA Deceleration */}
                {level.id === 2 && (
                  <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Initial Speed Slider */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono text-[10px] text-slate-300 font-bold">
                          <span>Velocidad Inicial (v0):</span>
                          <span className="text-amber-400">{calcInitialVelocity} m/s</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="50"
                          step="1"
                          value={calcInitialVelocity}
                          onChange={(e) => setCalcInitialVelocity(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                        <div className="flex justify-between font-mono text-[8px] text-slate-500">
                          <span>10 m/s</span>
                          <span>50 m/s</span>
                        </div>
                      </div>

                      {/* Time Slider */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono text-[10px] text-slate-300 font-bold">
                          <span>Tiempo (t):</span>
                          <span className="text-amber-400">{calcTime} s</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="12"
                          step="1"
                          value={calcTime}
                          onChange={(e) => setCalcTime(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                        <div className="flex justify-between font-mono text-[8px] text-slate-500">
                          <span>1 s</span>
                          <span>12 s</span>
                        </div>
                      </div>

                      {/* Acceleration Slider */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono text-[10px] text-slate-300 font-bold">
                          <span>Aceleración / Desaceleración (a):</span>
                          <span className="text-rose-400">{calcAcceleration} m/s²</span>
                        </div>
                        <input
                          type="range"
                          min="-10"
                          max="2"
                          step="0.5"
                          value={calcAcceleration}
                          onChange={(e) => setCalcAcceleration(Number(e.target.value))}
                          className="w-full accent-rose-500 cursor-pointer"
                        />
                        <div className="flex justify-between font-mono text-[8px] text-slate-500">
                          <span>-10 m/s² (Frenado)</span>
                          <span>+2 m/s² (Acelerar)</span>
                        </div>
                      </div>
                    </div>

                    {/* Calculations */}
                    {(() => {
                      const vf = Math.max(0, calcInitialVelocity + calcAcceleration * calcTime);
                      const d = calcInitialVelocity * calcTime + 0.5 * calcAcceleration * (calcTime * calcTime);
                      return (
                        <div className="pt-3 border-t border-slate-800 space-y-3">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            <div className="bg-slate-900 border border-slate-800 p-2 rounded-lg text-center">
                              <span className="block text-[8px] text-slate-400 font-bold font-mono">FÓRMULAS USADAS:</span>
                              <span className="font-mono text-[9px] text-cyan-400 block font-bold mt-0.5">vf = v0 + a·t</span>
                              <span className="font-mono text-[9px] text-cyan-400 block font-bold">d = v0·t + 0.5·a·t²</span>
                            </div>
                            <div className="bg-slate-900 border border-slate-800 p-2 rounded-lg text-center flex flex-col justify-center">
                              <span className="block text-[8px] text-slate-400 font-bold font-mono">VELOCIDAD FINAL (vf):</span>
                              <span className="font-mono text-xs font-black text-amber-400">{vf.toFixed(1)} m/s</span>
                            </div>
                            <div className="bg-slate-900 border border-slate-800 p-2 rounded-lg text-center col-span-2 md:col-span-1 flex flex-col justify-center">
                              <span className="block text-[8px] text-slate-400 font-bold font-mono">DISTANCIA FRENADO (d):</span>
                              <span className="font-mono text-xs font-black text-teal-400">{d.toFixed(1)} metros</span>
                            </div>
                          </div>

                          {/* Decelerating track visual */}
                          <div className="relative h-8 bg-slate-900 rounded-lg overflow-hidden border border-slate-800">
                            <div className="absolute left-0 text-[7px] text-slate-500 font-mono pl-1 top-0.5">0m</div>
                            <div className="absolute right-1 text-[7px] text-slate-500 font-mono top-0.5">Max 600m</div>
                            
                            {/* Spaceship */}
                            <div 
                              className="absolute top-1 text-base transition-all duration-300"
                              style={{ left: `${Math.min(92, (d / 600) * 100)}%` }}
                            >
                              🚀 {vf === 0 && <span className="text-[8px] bg-rose-600 text-white font-mono px-1 rounded absolute -top-3 left-0">DETENIDA</span>}
                            </div>
                          </div>

                          <div className="p-2.5 bg-slate-900/60 border border-slate-800 rounded-lg text-[10px] text-slate-400 font-medium leading-normal">
                            💡 <strong className="text-slate-200 font-bold">Estrategia de Solución:</strong> Para responder bien a la evaluación, coloca la Velocidad Inicial en <span className="font-bold text-amber-400">30 m/s</span> y el Tiempo en <span className="font-bold text-amber-400">6 s</span>. Mueve el deslizador de aceleración hasta que la <span className="font-bold text-amber-400">Velocidad Final (vf) sea exactamente 0.0 m/s</span>. ¡Verás que la aceleración tiene que ser <span className="font-bold text-rose-400">-5.0 m/s²</span>!
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Level 3: Interval velocity calculation */}
                {level.id === 3 && (
                  <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <p className="text-[10px] text-slate-400 font-mono leading-relaxed">
                      El desplazamiento en cada tramo depende de su velocidad constante ($d = v \cdot t$). En una gráfica de posición, el reposo ($v=0$) se ve como una línea horizontal.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Interval 1 Velocity */}
                      <div className="space-y-1">
                        <div className="flex justify-between font-mono text-[9px] text-slate-300 font-bold">
                          <span>Tramo 1 (0 a 3s) Vel:</span>
                          <span className="text-amber-400">{calcVelocity} m/s</span>
                        </div>
                        <input
                          type="range"
                          min="-10"
                          max="40"
                          value={calcVelocity}
                          onChange={(e) => setCalcVelocity(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>

                      {/* Interval 2 Velocity */}
                      <div className="space-y-1">
                        <div className="flex justify-between font-mono text-[9px] text-slate-300 font-bold">
                          <span>Tramo 2 (3 a 8s) Vel:</span>
                          <span className="text-amber-400">{calcVelocityB} m/s</span>
                        </div>
                        <input
                          type="range"
                          min="-10"
                          max="40"
                          value={calcVelocityB}
                          onChange={(e) => setCalcVelocityB(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>

                      {/* Interval 3 Velocity */}
                      <div className="space-y-1">
                        <div className="flex justify-between font-mono text-[9px] text-slate-300 font-bold">
                          <span>Tramo 3 (8 a 10s) Vel:</span>
                          <span className="text-rose-400">{calcWindSpeed} m/s</span>
                        </div>
                        <input
                          type="range"
                          min="-100"
                          max="10"
                          value={calcWindSpeed}
                          onChange={(e) => setCalcWindSpeed(Number(e.target.value))}
                          className="w-full accent-rose-500 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Math results */}
                    {(() => {
                      const pos1 = calcVelocity * 3;
                      const pos2 = pos1 + calcVelocityB * 5;
                      const pos3 = pos2 + calcWindSpeed * 2;
                      return (
                        <div className="pt-3 border-t border-slate-800 space-y-2">
                          <div className="grid grid-cols-3 gap-2 text-center font-mono text-[10px]">
                            <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                              <span className="block text-[7px] text-slate-400 font-bold">POSICIÓN FIN TRAMO 1:</span>
                              <span className="font-bold text-amber-400">{pos1} m</span>
                            </div>
                            <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                              <span className="block text-[7px] text-slate-400 font-bold">POSICIÓN FIN TRAMO 2:</span>
                              <span className={`font-bold ${calcVelocityB === 0 ? 'text-emerald-400 bg-emerald-950/40 px-1 rounded border border-emerald-500/20' : 'text-amber-400'}`}>
                                {pos2} m {calcVelocityB === 0 && "(Reposo)"}
                              </span>
                            </div>
                            <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                              <span className="block text-[7px] text-slate-400 font-bold">POSICIÓN FIN TRAMO 3:</span>
                              <span className="font-bold text-slate-300">{pos3} m</span>
                            </div>
                          </div>

                          <div className="p-2.5 bg-slate-900/60 border border-slate-800 rounded-lg text-[10px] text-slate-400 font-medium leading-normal">
                            💡 <strong className="text-slate-200 font-bold">Punto Clave:</strong> Al colocar la velocidad del <span className="font-bold text-amber-400">Tramo 2 en 0 m/s</span>, la posición al final de ese tramo permanece igual que al inicio (línea horizontal en la gráfica). Esto representa que la sonda está en reposo relativo.
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Level 4: Area Under Curve (Integration of Distance) */}
                {level.id === 4 && (
                  <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <p className="text-[10px] text-slate-400 font-mono leading-relaxed">
                      El desplazamiento en una gráfica de velocidad-tiempo ($v$-$t$) corresponde al **área geométrica bajo la curva**.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Dron Alpha Max Velocity */}
                      <div className="space-y-1">
                        <div className="flex justify-between font-mono text-[9px] text-slate-300 font-bold">
                          <span>Dron Alpha Velocidad Máx (v_max):</span>
                          <span className="text-amber-400">{calcVelocity} m/s</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="40"
                          value={calcVelocity}
                          onChange={(e) => setCalcVelocity(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>

                      {/* Dron Beta Constant Velocity */}
                      <div className="space-y-1">
                        <div className="flex justify-between font-mono text-[9px] text-slate-300 font-bold">
                          <span>Dron Beta Velocidad Const (v_const):</span>
                          <span className="text-amber-400">{calcVelocityB} m/s</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="30"
                          value={calcVelocityB}
                          onChange={(e) => setCalcVelocityB(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>

                      {/* Time limit */}
                      <div className="space-y-1">
                        <div className="flex justify-between font-mono text-[9px] text-slate-300 font-bold">
                          <span>Tiempo de Medición (t):</span>
                          <span className="text-teal-400">{calcTime} s</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="15"
                          value={calcTime}
                          onChange={(e) => setCalcTime(Number(e.target.value))}
                          className="w-full accent-teal-500 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Calculations */}
                    {(() => {
                      const distAlpha = (calcVelocity * calcTime) / 2; // Triángulo
                      const distBeta = calcVelocityB * calcTime;      // Rectángulo
                      return (
                        <div className="pt-3 border-t border-slate-800 space-y-2">
                          <div className="grid grid-cols-2 gap-4 text-center font-mono">
                            <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                              <span className="block text-[8px] text-cyan-400 font-black">🛸 DRON GUARDIÁN ALPHA (Triángulo):</span>
                              <span className="text-[10px] text-slate-500 block mt-1">Distancia = (v_max · t) / 2</span>
                              <span className="font-mono text-sm font-black text-cyan-400 mt-1 block">d = ({calcVelocity} · {calcTime}) / 2 = {distAlpha.toFixed(1)} m</span>
                            </div>
                            <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                              <span className="block text-[8px] text-amber-400 font-black">🛸 DRON CENTINELA BETA (Rectángulo):</span>
                              <span className="text-[10px] text-slate-500 block mt-1">Distancia = v_const · t</span>
                              <span className="font-mono text-sm font-black text-amber-400 mt-1 block">d = {calcVelocityB} · {calcTime} = {distBeta.toFixed(1)} m</span>
                            </div>
                          </div>

                          <div className="p-2.5 bg-slate-900/60 border border-slate-800 rounded-lg text-[10px] text-slate-400 font-medium leading-normal">
                            💡 <strong className="text-slate-200 font-bold">Deducción de la Respuesta:</strong> Deja el tiempo en <span className="font-bold text-teal-400">10 s</span>. Pon la velocidad máxima de Alpha en <span className="font-bold text-amber-400">20 m/s</span> y la constante de Beta en <span className="font-bold text-amber-400">10 m/s</span>. ¡Comprueba que ambos recorren exactamente la misma distancia de <span className="font-bold text-teal-400">100.0 m</span>!
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Level 5: Lead Sphere and Feather chamber */}
                {level.id === 5 && (
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[10px] text-slate-400 font-medium leading-relaxed">
                    ⚙️ <strong className="text-slate-200 font-black uppercase">¡SISTEMA CONECTADO!</strong> El Laboratorio de Datos Interactivo se encuentra integrado en la pantalla de telemetría táctica superior. Utiliza los botones de gravedad y resistencia del aire, y dale <strong className="text-teal-400 font-bold">▶️ Pley</strong> para analizar cómo caen el Plomo y la Pluma de manera simultánea en el vacío.
                  </div>
                )}

                {/* Level 6: Vertical launch equations */}
                {level.id === 6 && (
                  <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Launch Speed */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono text-[10px] text-slate-300 font-bold">
                          <span>Velocidad de Disparo (v0):</span>
                          <span className="text-amber-400">{calcInitialVelocity} m/s</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="50"
                          step="1"
                          value={calcInitialVelocity}
                          onChange={(e) => setCalcInitialVelocity(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                        <div className="flex justify-between font-mono text-[8px] text-slate-500">
                          <span>10 m/s</span>
                          <span>50 m/s</span>
                        </div>
                      </div>

                      {/* Gravity */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono text-[10px] text-slate-300 font-bold">
                          <span>Gravedad Planetaria (g):</span>
                          <span className="text-rose-400">{calcRadius} m/s²</span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="20"
                          step="1"
                          value={calcRadius}
                          onChange={(e) => setCalcRadius(Number(e.target.value))}
                          className="w-full accent-rose-500 cursor-pointer"
                        />
                        <div className="flex justify-between font-mono text-[8px] text-slate-500">
                          <span>5 m/s² (Débil)</span>
                          <span>20 m/s² (Intensa)</span>
                        </div>
                      </div>
                    </div>

                    {/* Calculations */}
                    {(() => {
                      const tSubida = calcInitialVelocity / calcRadius;
                      const hMax = (calcInitialVelocity * calcInitialVelocity) / (2 * calcRadius);
                      return (
                        <div className="pt-3 border-t border-slate-800 space-y-2">
                          <div className="grid grid-cols-2 gap-2 text-center font-mono">
                            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                              <span className="block text-[8px] text-slate-400 font-bold font-mono">TIEMPO HASTA LA CUSPIDE (ts):</span>
                              <span className="text-[9px] text-slate-500 block">t = v0 / g</span>
                              <span className="font-mono text-xs font-black text-amber-400 mt-0.5 block">{tSubida.toFixed(2)} segundos</span>
                            </div>
                            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                              <span className="block text-[8px] text-slate-400 font-bold font-mono">ALTURA MÁXIMA (h_max):</span>
                              <span className="text-[9px] text-slate-500 block">h = v0² / (2g)</span>
                              <span className="font-mono text-xs font-black text-teal-400 mt-0.5 block">{hMax.toFixed(2)} metros</span>
                            </div>
                          </div>

                          <div className="p-2.5 bg-slate-900/60 border border-slate-800 rounded-lg text-[10px] text-slate-400 font-medium leading-normal">
                            💡 <strong className="text-slate-200 font-bold">Prueba Académica:</strong> Deja la gravedad en <span className="font-bold text-rose-400">10 m/s²</span> y arrastra el disparo a <span className="font-bold text-amber-400">30 m/s</span>. ¡El tiempo de subida resultante es exactamente <span className="font-bold text-teal-400">3 s</span> y la altura máxima alcanzada es de <span className="font-bold text-teal-400">45 m</span>!
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Level 7: Parabolic Trajectory Range */}
                {level.id === 7 && (
                  <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Initial Speed */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono text-[10px] text-slate-300 font-bold">
                          <span>Rapidez de Salida (v0):</span>
                          <span className="text-amber-400">{calcInitialVelocity} m/s</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="50"
                          step="1"
                          value={calcInitialVelocity}
                          onChange={(e) => setCalcInitialVelocity(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                        <div className="flex justify-between font-mono text-[8px] text-slate-500">
                          <span>10 m/s</span>
                          <span>50 m/s</span>
                        </div>
                      </div>

                      {/* Launch Angle */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono text-[10px] text-slate-300 font-bold">
                          <span>Ángulo de Inclinación (θ):</span>
                          <span className="text-teal-400">{calcAngle}°</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="90"
                          step="5"
                          value={calcAngle}
                          onChange={(e) => setCalcAngle(Number(e.target.value))}
                          className="w-full accent-teal-500 cursor-pointer"
                        />
                        <div className="flex justify-between font-mono text-[8px] text-slate-500">
                          <span>0° (Horizontal)</span>
                          <span>90° (Vertical)</span>
                        </div>
                      </div>
                    </div>

                    {/* Calculations */}
                    {(() => {
                      const rad = (calcAngle * Math.PI) / 180;
                      const g = 10;
                      const range = (calcInitialVelocity * calcInitialVelocity * Math.sin(2 * rad)) / g;
                      const height = (calcInitialVelocity * calcInitialVelocity * Math.sin(rad) * Math.sin(rad)) / (2 * g);
                      return (
                        <div className="pt-3 border-t border-slate-800 space-y-2">
                          <div className="grid grid-cols-2 gap-2 text-center font-mono">
                            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                              <span className="block text-[8px] text-slate-400 font-bold font-mono">ALCANCE HORIZONTAL (R):</span>
                              <span className="text-[9px] text-slate-500 block">R = v0² sin(2θ) / g</span>
                              <span className="font-mono text-xs font-black text-amber-400 mt-0.5 block">{range.toFixed(1)} metros</span>
                            </div>
                            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                              <span className="block text-[8px] text-slate-400 font-bold font-mono">ALTURA MÁXIMA (H):</span>
                              <span className="text-[9px] text-slate-500 block">H = v0² sin²θ / 2g</span>
                              <span className="font-mono text-xs font-black text-teal-400 mt-0.5 block">{height.toFixed(1)} metros</span>
                            </div>
                          </div>

                          <div className="p-2.5 bg-slate-900/60 border border-slate-800 rounded-lg text-[10px] text-slate-400 font-medium leading-normal">
                            💡 <strong className="text-slate-200 font-bold">Curiosidad Parabólica:</strong> Configura el ángulo en <span className="font-bold text-teal-400">45°</span> para ver que produce el máximo alcance horizontal posible. ¡También comprueba que ángulos complementarios como <span className="font-bold text-amber-400">30° y 60°</span> dan exactamente el mismo alcance horizontal!
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Level 8: MCU Centripetal acceleration */}
                {level.id === 8 && (
                  <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Radius */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono text-[10px] text-slate-300 font-bold">
                          <span>Radio de la Órbita (R):</span>
                          <span className="text-amber-400">{calcRadius} m</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="200"
                          step="10"
                          value={calcRadius}
                          onChange={(e) => setCalcRadius(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                        <div className="flex justify-between font-mono text-[8px] text-slate-500">
                          <span>50 m</span>
                          <span>200 m</span>
                        </div>
                      </div>

                      {/* Speed */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono text-[10px] text-slate-300 font-bold">
                          <span>Rapidez Tangencial (v):</span>
                          <span className="text-teal-400">{calcVelocity} m/s</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="50"
                          step="2"
                          value={calcVelocity}
                          onChange={(e) => setCalcVelocity(Number(e.target.value))}
                          className="w-full accent-teal-500 cursor-pointer"
                        />
                        <div className="flex justify-between font-mono text-[8px] text-slate-500">
                          <span>10 m/s</span>
                          <span>50 m/s</span>
                        </div>
                      </div>
                    </div>

                    {/* Calculations */}
                    {(() => {
                      const ac = (calcVelocity * calcVelocity) / calcRadius;
                      const period = (2 * Math.PI * calcRadius) / calcVelocity;
                      return (
                        <div className="pt-3 border-t border-slate-800 space-y-2">
                          <div className="grid grid-cols-2 gap-2 text-center font-mono">
                            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                              <span className="block text-[8px] text-slate-400 font-bold font-mono">ACELERACIÓN CENTRÍPETA (ac):</span>
                              <span className="text-[9px] text-slate-500 block">ac = v² / R</span>
                              <span className="font-mono text-xs font-black text-rose-400 mt-0.5 block">{ac.toFixed(2)} m/s²</span>
                            </div>
                            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                              <span className="block text-[8px] text-slate-400 font-bold font-mono">PERIODO DE ÓRBITA (T):</span>
                              <span className="text-[9px] text-slate-500 block">T = 2πR / v</span>
                              <span className="font-mono text-xs font-black text-teal-400 mt-0.5 block">{period.toFixed(1)} segundos</span>
                            </div>
                          </div>

                          <div className="p-2.5 bg-slate-900/60 border border-slate-800 rounded-lg text-[10px] text-slate-400 font-medium leading-normal">
                            💡 <strong className="text-slate-200 font-bold">Análisis Teórico:</strong> Aunque la rapidez es constante, hay aceleración porque el vector de velocidad cambia continuamente de dirección. Esta aceleración (centrípeta) apunta estrictamente hacia el centro del planetoide.
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Level 9: Relative solar wind vector */}
                {level.id === 9 && (
                  <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Ship speed */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono text-[10px] text-slate-300 font-bold">
                          <span>Rapidez de la Nave (hacia el Norte):</span>
                          <span className="text-amber-400">{calcVelocity} km/h</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="120"
                          step="5"
                          value={calcVelocity}
                          onChange={(e) => setCalcVelocity(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                        <div className="flex justify-between font-mono text-[8px] text-slate-500">
                          <span>0 km/h</span>
                          <span>120 km/h</span>
                        </div>
                      </div>

                      {/* Wind speed */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono text-[10px] text-slate-300 font-bold">
                          <span>Rapidez del Viento Solar (hacia el Este):</span>
                          <span className="text-teal-400">{calcWindSpeed} km/h</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="5"
                          value={calcWindSpeed}
                          onChange={(e) => setCalcWindSpeed(Number(e.target.value))}
                          className="w-full accent-teal-500 cursor-pointer"
                        />
                        <div className="flex justify-between font-mono text-[8px] text-slate-500">
                          <span>0 km/h</span>
                          <span>100 km/h</span>
                        </div>
                      </div>
                    </div>

                    {/* Calculations */}
                    {(() => {
                      const netSpeed = Math.sqrt(calcVelocity * calcVelocity + calcWindSpeed * calcWindSpeed);
                      return (
                        <div className="pt-3 border-t border-slate-800 space-y-2">
                          <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-center font-mono">
                            <span className="block text-[8px] text-slate-400 font-bold">VELOCIDAD RESULTANTE (Nave + Viento):</span>
                            <span className="text-[10px] text-slate-500 block">v_neta = √(v_nave² + v_viento²)</span>
                            <span className="font-mono text-sm font-black text-teal-400 mt-1 block">v = √({calcVelocity}² + {calcWindSpeed}²) = {netSpeed.toFixed(1)} km/h</span>
                          </div>

                          <div className="p-2.5 bg-slate-900/60 border border-slate-800 rounded-lg text-[10px] text-slate-400 font-medium leading-normal">
                            💡 <strong className="text-slate-200 font-bold">Demostración Numérica:</strong> Coloca la rapidez de la nave en <span className="font-bold text-amber-400">80 km/h</span> y el viento en <span className="font-bold text-teal-400">60 km/h</span>. ¡La rapidez resultante calculada es exactamente de <span className="font-bold text-teal-400">100.0 km/h</span> en diagonal Noreste!
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Level 10: Encounter problems */}
                {level.id === 10 && (
                  <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Sonda Alpha speed */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono text-[10px] text-slate-300 font-bold">
                          <span>Sonda Alpha (vA):</span>
                          <span className="text-cyan-400">{calcVelocityA} m/s</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="50"
                          value={calcVelocityA}
                          onChange={(e) => setCalcVelocityA(Number(e.target.value))}
                          className="w-full accent-cyan-500 cursor-pointer"
                        />
                      </div>

                      {/* Sonda Beta speed */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono text-[10px] text-slate-300 font-bold">
                          <span>Sonda Beta (vB):</span>
                          <span className="text-amber-400">{calcVelocityB} m/s</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="50"
                          value={calcVelocityB}
                          onChange={(e) => setCalcVelocityB(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>

                      {/* Separation */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono text-[10px] text-slate-300 font-bold">
                          <span>Separación Inicial (D):</span>
                          <span className="text-teal-400">{calcSeparation} m</span>
                        </div>
                        <input
                          type="range"
                          min="500"
                          max="1500"
                          step="100"
                          value={calcSeparation}
                          onChange={(e) => setCalcSeparation(Number(e.target.value))}
                          className="w-full accent-teal-500 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Calculations */}
                    {(() => {
                      const tEncuentro = calcSeparation / (calcVelocityA + calcVelocityB);
                      const xEncuentro = calcVelocityA * tEncuentro;
                      return (
                        <div className="pt-3 border-t border-slate-800 space-y-2">
                          <div className="grid grid-cols-2 gap-2 text-center font-mono">
                            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                              <span className="block text-[8px] text-slate-400 font-bold font-mono">TIEMPO DE ENCUENTRO (te):</span>
                              <span className="text-[9px] text-slate-500 block">te = D / (vA + vB)</span>
                              <span className="font-mono text-xs font-black text-amber-400 mt-0.5 block">{tEncuentro.toFixed(1)} segundos</span>
                            </div>
                            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                              <span className="block text-[8px] text-slate-400 font-bold font-mono">LUGAR DE ENCUENTRO (desde Alpha):</span>
                              <span className="text-[9px] text-slate-500 block">xe = vA · te</span>
                              <span className="font-mono text-xs font-black text-teal-400 mt-0.5 block">A los {xEncuentro.toFixed(0)} metros</span>
                            </div>
                          </div>

                          <div className="p-2.5 bg-slate-900/60 border border-slate-800 rounded-lg text-[10px] text-slate-400 font-medium leading-normal">
                            💡 <strong className="text-slate-200 font-bold">Comprobación del Enigma:</strong> Si mantienes los valores originales de <span className="font-bold text-teal-400">D = 1000 m</span>, <span className="font-bold text-cyan-400">vA = 30 m/s</span> y <span className="font-bold text-amber-400">vB = 20 m/s</span>, verás que el tiempo de acoplamiento es exactamente de <span className="font-bold text-teal-400">20 segundos</span> a <span className="font-bold text-teal-400">600 metros</span> de la salida de Alpha.
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Level 11: Inercia (1ra Ley de Newton) */}
                {level.id === 11 && (
                  <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Velocity */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono text-[10px] text-slate-300 font-bold">
                          <span>Velocidad de Crucero de la Nave:</span>
                          <span className="text-amber-400">{calcVelocity} km/s</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="300"
                          step="10"
                          value={calcVelocity}
                          onChange={(e) => setCalcVelocity(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                        <div className="flex justify-between font-mono text-[8px] text-slate-500">
                          <span>10 km/s</span>
                          <span>300 km/s</span>
                        </div>
                      </div>

                      {/* Friction */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono text-[10px] text-slate-300 font-bold">
                          <span>Fricción en el Entorno de Vuelo (Vacío):</span>
                          <span className="text-rose-400">{calcFrictionCoefficient}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="0.5"
                          step="0.05"
                          value={calcFrictionCoefficient}
                          onChange={(e) => setCalcFrictionCoefficient(Number(e.target.value))}
                          className="w-full accent-rose-500 cursor-pointer"
                        />
                        <div className="flex justify-between font-mono text-[8px] text-slate-500">
                          <span>0 (Vacío Absoluto)</span>
                          <span>0.5 (Alta Resistencia)</span>
                        </div>
                      </div>
                    </div>

                    {/* Calculations */}
                    {(() => {
                      const netForceNeeded = calcFrictionCoefficient * 500; // Prop a la fricción
                      return (
                        <div className="pt-3 border-t border-slate-800 space-y-2">
                          <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-center font-mono">
                            <span className="block text-[8px] text-slate-400 font-bold flex justify-center">FUERZA MOTOR NECESARIA PARA MANTENER LA VELOCIDAD:</span>
                            <span className="font-mono text-sm font-black text-teal-400 mt-1 block">
                              Fuerza = {netForceNeeded.toFixed(0)} Newtons
                            </span>
                          </div>

                          <div className="p-2.5 bg-slate-900/60 border border-slate-800 rounded-lg text-[10px] text-slate-400 font-medium leading-normal">
                            💡 <strong className="text-slate-200 font-bold">Principio de Inercia:</strong> Como puedes notar, cuando el deslizador de fricción está en <span className="font-bold text-teal-400">0</span> (vacío cósmico), la fuerza necesaria es exactly <span className="font-bold text-teal-400">0 N</span>, sin importar qué tan alta sea la velocidad de la nave. ¡Un objeto en movimiento se mantiene en movimiento rectilíneo uniforme sin motores activos!
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Level 12: Fuerza y Masa (2da Ley de Newton) */}
                {level.id === 12 && (
                  <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Force */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono text-[10px] text-slate-300 font-bold">
                          <span>Fuerza Aplicada (F):</span>
                          <span className="text-amber-400">{calcForce} N</span>
                        </div>
                        <input
                          type="range"
                          min="100"
                          max="1000"
                          step="50"
                          value={calcForce}
                          onChange={(e) => setCalcForce(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                        <div className="flex justify-between font-mono text-[8px] text-slate-500">
                          <span>100 N</span>
                          <span>1000 N</span>
                        </div>
                      </div>

                      {/* Mass */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono text-[10px] text-slate-300 font-bold">
                          <span>Masa del Módulo (m):</span>
                          <span className="text-teal-400">{calcMass} kg</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="500"
                          step="10"
                          value={calcMass}
                          onChange={(e) => setCalcMass(Number(e.target.value))}
                          className="w-full accent-teal-500 cursor-pointer"
                        />
                        <div className="flex justify-between font-mono text-[8px] text-slate-500">
                          <span>50 kg</span>
                          <span>500 kg</span>
                        </div>
                      </div>
                    </div>

                    {/* Calculations */}
                    {(() => {
                      const acc = calcForce / calcMass;
                      return (
                        <div className="pt-3 border-t border-slate-800 space-y-2">
                          <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-center font-mono">
                            <span className="block text-[8px] text-slate-400 font-bold">ACELERACIÓN DEL MÓDULO (a):</span>
                            <span className="text-[9px] text-slate-500 block">a = F / m</span>
                            <span className="font-mono text-sm font-black text-teal-400 mt-1 block">
                              a = {calcForce} N / {calcMass} kg = {acc.toFixed(2)} m/s²
                            </span>
                          </div>

                          <div className="p-2.5 bg-slate-900/60 border border-slate-800 rounded-lg text-[10px] text-slate-400 font-medium leading-normal">
                            💡 <strong className="text-slate-200 font-bold">Relación Matemática:</strong> Comprueba la proporcionalidad: si duplicas la fuerza (de <span className="font-bold text-amber-400">400 N</span> a <span className="font-bold text-amber-400">800 N</span>) pero también duplicas la masa (de <span className="font-bold text-teal-400">200 kg</span> a <span className="font-bold text-teal-400">400 kg</span>), verás que la aceleración se mantiene idéntica en exactamente <span className="font-bold text-teal-400">2.0 m/s²</span>.
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Level 13: Acción y Reacción (3ra Ley de Newton) */}
                {level.id === 13 && (
                  <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="space-y-1.5">
                      <div className="flex justify-between font-mono text-[10px] text-slate-300 font-bold">
                        <span>Fuerza de Empuje del Astronauta (Acción):</span>
                        <span className="text-amber-400">{calcForce} N</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="500"
                        step="10"
                        value={calcForce}
                        onChange={(e) => setCalcForce(Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                      <div className="flex justify-between font-mono text-[8px] text-slate-500">
                        <span>50 N</span>
                        <span>500 N</span>
                      </div>
                    </div>

                    {/* Dual readout */}
                    <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-4 text-center font-mono">
                      <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 text-center">
                        <span className="block text-[8px] text-slate-400 font-bold">FUERZA SOBRE LA CAJA (Acción ➡️):</span>
                        <span className="font-mono text-sm font-black text-teal-400 mt-1 block">+{calcForce} N</span>
                      </div>
                      <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 text-center">
                        <span className="block text-[8px] text-slate-400 font-bold">FUERZA SOBRE EL JOVEN (Reacción ⬅️):</span>
                        <span className="font-mono text-sm font-black text-rose-400 mt-1 block">-{calcForce} N</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-slate-900/60 border border-slate-800 rounded-lg text-[10px] text-slate-400 font-medium leading-normal">
                      💡 <strong className="text-slate-200 font-bold">Tercera Ley de Newton:</strong> Las fuerzas siempre actúan en pares simétricos de igual magnitud pero sentidos contrarios sobre cuerpos distintos. Cuando el joven empuja la caja con <span className="font-bold text-amber-400">{calcForce} N</span>, la caja ejerce instantáneamente una fuerza de <span className="font-bold text-rose-400">{calcForce} N</span> sobre el joven en sentido opuesto.
                    </div>
                  </div>
                )}

                {/* Level 14: Fricción Estática vs Cinética */}
                {level.id === 14 && (
                  <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Normal Force */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono text-[10px] text-slate-300 font-bold">
                          <span>Fuerza Normal (Peso N):</span>
                          <span className="text-amber-400">{calcForce} N</span>
                        </div>
                        <input
                          type="range"
                          min="100"
                          max="1000"
                          step="50"
                          value={calcForce}
                          onChange={(e) => setCalcForce(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                        <div className="flex justify-between font-mono text-[8px] text-slate-500">
                          <span>100 N</span>
                          <span>1000 N</span>
                        </div>
                      </div>

                      {/* Static Friction */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono text-[10px] text-slate-300 font-bold">
                          <span>Coef. Fricción Estática (μe):</span>
                          <span className="text-amber-500">{calcFrictionStaticCoeff}</span>
                        </div>
                        <input
                          type="range"
                          min="0.1"
                          max="0.8"
                          step="0.05"
                          value={calcFrictionStaticCoeff}
                          onChange={(e) => setCalcFrictionStaticCoeff(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                        <div className="flex justify-between font-mono text-[8px] text-slate-500">
                          <span>0.1 (Deslizante)</span>
                          <span>0.8 (Rugoso)</span>
                        </div>
                      </div>

                      {/* Kinetic Friction */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono text-[10px] text-slate-300 font-bold">
                          <span>Coef. Fricción Cinética (μk):</span>
                          <span className="text-teal-400">{calcFrictionKineticCoeff}</span>
                        </div>
                        <input
                          type="range"
                          min="0.05"
                          max="0.6"
                          step="0.05"
                          value={calcFrictionKineticCoeff}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            // Ensure kinetic is always less than static!
                            setCalcFrictionKineticCoeff(Math.min(val, calcFrictionStaticCoeff - 0.05));
                          }}
                          className="w-full accent-teal-500 cursor-pointer"
                        />
                        <div className="flex justify-between font-mono text-[8px] text-slate-500">
                          <span>0.05 (Liso)</span>
                          <span>0.6 (Frenante)</span>
                        </div>
                      </div>
                    </div>

                    {/* Calculations */}
                    {(() => {
                      const fStaticMax = calcForce * calcFrictionStaticCoeff;
                      const fKinetic = calcForce * calcFrictionKineticCoeff;
                      return (
                        <div className="pt-3 border-t border-slate-800 space-y-2">
                          <div className="grid grid-cols-2 gap-2 text-center font-mono">
                            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                              <span className="block text-[8px] text-amber-400 font-bold">FRICCIÓN ESTÁTICA MÁXIMA (fe,max):</span>
                              <span className="text-[9px] text-slate-500 block">fe = μe · N</span>
                              <span className="font-mono text-xs font-black text-amber-500 mt-0.5 block">{fStaticMax.toFixed(0)} Newtons</span>
                            </div>
                            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                              <span className="block text-[8px] text-teal-400 font-bold">FRICCIÓN CINÉTICA DE ARRASTRE (fk):</span>
                              <span className="text-[9px] text-slate-500 block">fk = μk · N</span>
                              <span className="font-mono text-xs font-black text-teal-400 mt-0.5 block">{fKinetic.toFixed(0)} Newtons</span>
                            </div>
                          </div>

                          <div className="p-2.5 bg-slate-900/60 border border-slate-800 rounded-lg text-[10px] text-slate-400 font-medium leading-normal">
                            💡 <strong className="text-slate-200 font-bold">Diferencia Crítica:</strong> Nota cómo la <span className="font-bold text-amber-500">fricción estática máxima siempre supera a la cinética</span>. Esto demuestra físicamente que requiere mucha más fuerza romper el estado de reposo inicial que mantener la caja deslizándose de manera continua.
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Level 15: Atwood pulley machine */}
                {level.id === 15 && (
                  <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Mass 1 */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono text-[10px] text-slate-300 font-bold">
                          <span>Masa 1 (m1):</span>
                          <span className="text-amber-400">{calcMass1} kg</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          step="5"
                          value={calcMass1}
                          onChange={(e) => setCalcMass1(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                        />
                        <div className="flex justify-between font-mono text-[8px] text-slate-500">
                          <span>10 kg</span>
                          <span>100 kg</span>
                        </div>
                      </div>

                      {/* Mass 2 */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono text-[10px] text-slate-300 font-bold">
                          <span>Masa 2 (m2):</span>
                          <span className="text-teal-400">{calcMass2} kg</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          step="5"
                          value={calcMass2}
                          onChange={(e) => setCalcMass2(Number(e.target.value))}
                          className="w-full accent-teal-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                        />
                        <div className="flex justify-between font-mono text-[8px] text-slate-500">
                          <span>10 kg</span>
                          <span>100 kg</span>
                        </div>
                      </div>

                      {/* Gravity */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono text-[10px] text-slate-300 font-bold">
                          <span>Gravedad del Entorno (g):</span>
                          <span className="text-rose-400">{calcGravity} m/s²</span>
                        </div>
                        <input
                          type="range"
                          min="2"
                          max="20"
                          step="1"
                          value={calcGravity}
                          onChange={(e) => setCalcGravity(Number(e.target.value))}
                          className="w-full accent-rose-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                        />
                        <div className="flex justify-between font-mono text-[8px] text-slate-500">
                          <span>2 m/s²</span>
                          <span>20 m/s²</span>
                        </div>
                      </div>
                    </div>

                    {/* Calculations */}
                    {(() => {
                      const totalMass = calcMass1 + calcMass2;
                      const massDiff = Math.abs(calcMass2 - calcMass1);
                      const acc = (calcGravity * massDiff) / totalMass;
                      const tension = (2 * calcMass1 * calcMass2 * calcGravity) / totalMass;
                      return (
                        <div className="pt-3 border-t border-slate-800 space-y-2">
                          <div className="grid grid-cols-2 gap-2 text-center font-mono">
                            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                              <span className="block text-[8px] text-slate-400 font-bold">ACELERACIÓN DEL SISTEMA (a):</span>
                              <span className="text-[9px] text-slate-500 block">a = g · |m2 - m1| / (m1 + m2)</span>
                              <span className="font-mono text-xs font-black text-rose-400 mt-0.5 block">{acc.toFixed(2)} m/s²</span>
                            </div>
                            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                              <span className="block text-[8px] text-slate-400 font-bold">TENSIÓN DE LA CUERDA (T):</span>
                              <span className="text-[9px] text-slate-500 block">T = 2·m1·m2·g / (m1+m2)</span>
                              <span className="font-mono text-xs font-black text-teal-400 mt-0.5 block">{tension.toFixed(1)} N</span>
                            </div>
                          </div>

                          {/* Pulley visual sketch */}
                          <div className="relative h-24 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-center gap-12 overflow-hidden">
                            {/* Pulley wheels */}
                            <div className="w-10 h-10 rounded-full border-2 border-slate-600 bg-slate-850 flex items-center justify-center animate-spin" style={{ animationDuration: `${acc > 0 ? 10 / acc : 0}s` }}>
                              <div className="w-4 h-4 rounded-full border border-slate-500"></div>
                            </div>
                            
                            {/* Mass 1 box */}
                            <div className="absolute left-[30%] flex flex-col items-center transition-all duration-300" style={{ transform: `translateY(${-acc * 1.5}px)` }}>
                              <div className="w-8 h-8 bg-amber-500/20 border border-amber-500/40 rounded flex items-center justify-center text-[10px] font-mono font-bold text-amber-300 shadow-md">
                                m1
                              </div>
                              <span className="text-[7px] font-mono text-slate-400 font-bold mt-0.5">m1</span>
                            </div>

                            {/* Mass 2 box */}
                            <div className="absolute right-[30%] flex flex-col items-center transition-all duration-300" style={{ transform: `translateY(${acc * 1.5}px)` }}>
                              <div className="w-8 h-8 bg-teal-500/20 border border-teal-500/40 rounded flex items-center justify-center text-[10px] font-mono font-bold text-teal-300 shadow-md">
                                m2
                              </div>
                              <span className="text-[7px] font-mono text-slate-400 font-bold mt-0.5">m2</span>
                            </div>
                          </div>

                          <div className="p-2.5 bg-slate-900/60 border border-slate-800 rounded-lg text-[10px] text-slate-400 font-medium leading-normal">
                            💡 <strong className="text-slate-200 font-bold">Comprobación del Desafío:</strong> Ajusta <span className="font-bold text-amber-400">m1 = 20 kg</span>, <span className="font-bold text-teal-400">m2 = 30 kg</span>, y la gravedad en <span className="font-bold text-rose-400">10 m/s²</span>. ¡Verás que la aceleración calculada es exactamente <span className="font-bold text-teal-400">2.0 m/s²</span> y la tensión de la cuerda es de exactamente <span className="font-bold text-teal-400">240.0 N</span>!
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Level 16: Dynamic circular motion (Mangonel / Centripetal) */}
                {level.id === 16 && (
                  <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Mass */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono text-[10px] text-slate-300 font-bold">
                          <span>Masa del Proyectil (m):</span>
                          <span className="text-amber-400">{calcMass} kg</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="20"
                          step="1"
                          value={calcMass}
                          onChange={(e) => setCalcMass(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                        />
                        <div className="flex justify-between font-mono text-[8px] text-slate-500">
                          <span>1 kg</span>
                          <span>20 kg</span>
                        </div>
                      </div>

                      {/* Velocity */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono text-[10px] text-slate-300 font-bold">
                          <span>Rapidez de Giro (v):</span>
                          <span className="text-teal-400">{calcVelocity} m/s</span>
                        </div>
                        <input
                          type="range"
                          min="2"
                          max="30"
                          step="1"
                          value={calcVelocity}
                          onChange={(e) => setCalcVelocity(Number(e.target.value))}
                          className="w-full accent-teal-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                        />
                        <div className="flex justify-between font-mono text-[8px] text-slate-500">
                          <span>2 m/s</span>
                          <span>30 m/s</span>
                        </div>
                      </div>

                      {/* Radius */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono text-[10px] text-slate-300 font-bold">
                          <span>Radio del Brazo (R):</span>
                          <span className="text-rose-400">{calcRadius} m</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          step="0.5"
                          value={calcRadius}
                          onChange={(e) => setCalcRadius(Number(e.target.value))}
                          className="w-full accent-rose-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                        />
                        <div className="flex justify-between font-mono text-[8px] text-slate-500">
                          <span>1 m</span>
                          <span>10 m</span>
                        </div>
                      </div>
                    </div>

                    {/* Calculations */}
                    {(() => {
                      const ac = (calcVelocity * calcVelocity) / calcRadius;
                      const fc = calcMass * ac;
                      return (
                        <div className="pt-3 border-t border-slate-800 space-y-2">
                          <div className="grid grid-cols-2 gap-2 text-center font-mono">
                            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                              <span className="block text-[8px] text-slate-400 font-bold">ACELERACIÓN CENTRÍPETA (ac):</span>
                              <span className="text-[9px] text-slate-500 block">ac = v² / R</span>
                              <span className="font-mono text-xs font-black text-rose-400 mt-0.5 block">{ac.toFixed(1)} m/s²</span>
                            </div>
                            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                              <span className="block text-[8px] text-slate-400 font-bold">FUERZA CENTRÍPETA DE TENSIÓN (Fc):</span>
                              <span className="text-[9px] text-slate-500 block">Fc = m · v² / R</span>
                              <span className="font-mono text-xs font-black text-teal-400 mt-0.5 block">{fc.toFixed(0)} Newtons</span>
                            </div>
                          </div>

                          {/* Circular movement visualizer */}
                          <div className="relative h-28 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden">
                            <div className="relative w-24 h-24 rounded-full border border-dashed border-slate-850 flex items-center justify-center">
                              {/* Central axle */}
                              <div className="w-2.5 h-2.5 bg-slate-400 rounded-full"></div>
                              
                              {/* Rotating tether line and projectile */}
                              <div className="absolute inset-y-0 w-[1px] bg-slate-500/50 flex flex-col justify-start items-center origin-center animate-spin" style={{ animationDuration: `${calcVelocity > 0 ? 15 / calcVelocity : 0}s` }}>
                                <div className="w-3.5 h-3.5 rounded-full bg-amber-500 border border-slate-900 -mt-1.5 shadow-md shadow-amber-500/20"></div>
                              </div>
                            </div>
                          </div>

                          <div className="p-2.5 bg-slate-900/60 border border-slate-800 rounded-lg text-[10px] text-slate-400 font-medium leading-normal">
                            💡 <strong className="text-slate-200 font-bold">Efecto de la Rapidez:</strong> Observa cómo la rapidez tiene un efecto cuadrático en la tensión. Si duplicas la rapidez de <span className="font-bold text-teal-400">5 m/s</span> a <span className="font-bold text-teal-400">10 m/s</span> (con masa 2 kg y radio 2 m), la fuerza requerida para mantener la trayectoria se cuadruplica de <span className="font-bold text-rose-400">25 N</span> a <span className="font-bold text-rose-400">100 N</span>!
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>

              {/* The Question Text block */}
              <div className="space-y-4">
                <span className="font-mono text-[9px] text-[#A67C52] block font-bold uppercase tracking-wide">
                  PLANTEAMIENTO ACADÉMICO (PREGUNTA):
                </span>
                <p className="text-[#2D2A26] font-bold text-sm leading-relaxed">
                  {level.saber11.questionText}
                </p>
              </div>

              {/* Options layout */}
              <div className="space-y-3">
                {level.saber11.options.map((option) => {
                  const isSelected = saberSelected === option.key;
                  const isSubAndCorrect = (isSaberSubmitted || showSolutionDirectly) && option.key === level.saber11.correctAnswer;
                  const isSubAndWrong = isSaberSubmitted && isSelected && !isCorrectFeedback;

                  let optionBorderClass = "border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700 hover:bg-slate-900";
                  if (isSelected) {
                    optionBorderClass = "bg-slate-900 border-cyan-500 text-white ring-2 ring-cyan-500/25 font-bold";
                  }
                  if (isSubAndCorrect) {
                     optionBorderClass = "bg-emerald-950/30 border-emerald-500 text-emerald-400 font-bold ring-2 ring-emerald-500/25";
                  }
                  if (isSubAndWrong) {
                    optionBorderClass = "bg-rose-950/30 border-rose-500/50 text-rose-400";
                  }

                  return (
                    <button
                      key={option.key}
                      onClick={() => {
                        if (isSaberSubmitted || showSolutionDirectly) return;
                        setSaberSelected(option.key);
                      }}
                      disabled={isSaberSubmitted || showSolutionDirectly}
                      className={`w-full p-4.5 rounded-2xl border text-left text-xs md:text-sm leading-relaxed transition-all flex items-start gap-4 cursor-pointer ${optionBorderClass}`}
                    >
                      <div className={`w-6 h-6 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                        isSubAndCorrect 
                          ? 'bg-emerald-500 text-slate-950' 
                          : isSubAndWrong 
                          ? 'bg-rose-600 text-white'
                          : isSelected 
                          ? 'bg-cyan-500 text-slate-950' 
                          : 'bg-slate-900 border border-slate-800 text-slate-400'
                      }`}>
                        {option.key}
                      </div>
                      <div className="font-medium flex-1">
                        {option.text}
                      </div>

                      {/* Status indicator pill */}
                      {isSubAndCorrect && (
                        <span className="bg-emerald-500 text-slate-950 font-mono text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shrink-0 ml-2">
                          Correcto 🎓
                        </span>
                      )}
                      {isSubAndWrong && (
                        <span className="bg-rose-600 text-white font-mono text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shrink-0 ml-2">
                          Incorrecto ❌
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Error warning and hint screen */}
              {isSaberSubmitted && !isCorrectFeedback && !showSolutionDirectly && (
                <div className="p-5 bg-rose-950/40 border-2 border-rose-500/30 rounded-2xl text-xs text-rose-200 animate-fade-in flex gap-3 items-start shadow-xl">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-500" />
                  <div>
                    <span className="font-mono uppercase font-bold block mb-1">¡Establecimiento Inválido!</span>
                    <p className="text-rose-300 font-medium">
                      La firma cuántica no coincide. El reactor reporta un desequilibrio. ¡Revisa los conceptos clave de la pestaña anterior o usa el Laboratorio de Datos para calcular la respuesta matemática!
                    </p>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={handleSaberRetry}
                        className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 rounded-xl text-[10px] font-mono font-bold cursor-pointer transition-all shadow-sm"
                      >
                        <RefreshCw className="w-3 h-3" /> Reintentar Telemetría
                      </button>
                      <button
                        onClick={() => {
                          setShowSolutionDirectly(true);
                          setSaberSelected(level.saber11.correctAnswer);
                        }}
                        className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 px-4 py-2 rounded-xl text-[10px] font-mono font-bold cursor-pointer transition-all shadow-sm"
                      >
                        🔓 Revelar Solución Directamente
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Success Screen and In-depth pedagogical explainer */}
              {((isSaberSubmitted && isCorrectFeedback) || showSolutionDirectly) && (
                <div className="bg-emerald-950/25 border-2 border-emerald-500/30 p-6 rounded-3xl animate-fade-in space-y-4 shadow-xl">
                  <div className="flex gap-3 items-start text-emerald-400">
                    <div className="p-2 rounded-full bg-emerald-500/10 border border-emerald-500/25">
                      {showSolutionDirectly ? (
                        <span className="text-xl">🎓</span>
                      ) : (
                        <Check className="w-6 h-6 text-emerald-400" />
                      )}
                    </div>
                    <div>
                      <span className="font-mono text-xs uppercase font-bold tracking-widest block text-cyan-400">
                        {showSolutionDirectly ? "SOLUCIÓN EXPLICADA DIDÁCTICAMENTE" : "COMPUESTOS COMPATIBLES COMPROBADOS"}
                      </span>
                      <h4 className="text-lg font-bold text-white mt-0.5">
                        {showSolutionDirectly 
                          ? `Guía de Solución Académica para el Nivel ${level.id}`
                          : `¡Felicitaciones! Has desbloqueado el portal del Nivel ${level.id}`
                        }
                      </h4>
                    </div>
                  </div>

                  <div className="text-slate-300 text-xs md:text-sm leading-relaxed border-t border-slate-800 pt-4 space-y-3 text-left">
                    <span className="font-mono text-[10px] text-cyan-400 block uppercase font-bold">Respuesta Correcta: Opción {level.saber11.correctAnswer} — ¿Por qué de esta pregunta?</span>
                    <p className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-inner font-sans font-medium text-slate-350">
                      {level.saber11.pedagogicalFeedback}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-950 p-4 rounded-xl border border-slate-800 gap-3 shadow-md">
                    <p className="text-xs text-slate-400 text-center sm:text-left font-medium">
                      {showSolutionDirectly 
                        ? "Has accedido a la solución explicada. ¡Sigue adelante a otros desafíos!" 
                        : "Tu respuesta ha sido almacenada con éxito en la bitácora estelar. Se han acreditado tus monedas y XP del nivel."
                      }
                    </p>
                    <button
                      onClick={onBack}
                      className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-black text-xs rounded-lg cursor-pointer shrink-0 transition-colors uppercase tracking-wider"
                    >
                      Continuar la Aventura ➡️
                    </button>
                  </div>
                </div>
              )}

              {/* Submission control bar */}
              {!isSaberSubmitted && !showSolutionDirectly && (
                <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3">
                  {/* Left: Button to reveal solution directly */}
                  <button
                    onClick={() => {
                      setShowSolutionDirectly(true);
                      setSaberSelected(level.saber11.correctAnswer);
                    }}
                    className="px-4 py-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-mono font-bold text-[10px] rounded-xl cursor-pointer transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    🔓 Revelar Solución y Explicación
                  </button>

                  <p className="text-[11px] text-slate-400 text-center sm:text-left font-sans font-medium flex-1">
                    {saberSelected 
                      ? `Has seleccionado la Opción ${saberSelected}. ¿Confirmas de forma teórica?` 
                      : 'Elige una de las alternativas de respuesta para evaluar el portal.'}
                  </p>
                  
                  <button
                    onClick={handleSaberSubmit}
                    disabled={!saberSelected}
                    className={`px-8 py-3.5 rounded-xl font-mono font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                      saberSelected 
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/10' 
                        : 'bg-slate-900 border border-slate-800 text-slate-500 pointer-events-none'
                    }`}
                  >
                    Someter Respuesta a Cabina
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
