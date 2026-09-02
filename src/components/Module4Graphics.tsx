import React, { useState } from 'react';
import { Waves, Eye, Compass, Zap, ArrowRight, CheckCircle2, XCircle, Info, Sparkles } from 'lucide-react';

interface Module4GraphicsProps {
  levelId: number;
}

export default function Module4Graphics({ levelId }: Module4GraphicsProps) {
  // State for Level 25 simulator
  const [l25Medium, setL25Medium] = useState<'agua' | 'aire'>('agua');
  const [l25Freq, setL25Freq] = useState<number>(440);

  // State for Level 26 simulator (Pool empty vs full)
  const [l26PoolFull, setL26PoolFull] = useState<boolean>(true);

  // State for Level 27 (Graph selection inspect)
  const [l27SelectedGraph, setL27SelectedGraph] = useState<'A' | 'B' | 'C' | 'D'>('B');

  // State for Level 28 (Charge sign toggle)
  const [l28ChargeSign, setL28ChargeSign] = useState<'negative' | 'positive'>('negative');

  // State for Level 29 (Option inspector)
  const [l29SelectedOption, setL29SelectedOption] = useState<'A' | 'B' | 'C' | 'D'>('B');

  // Level 25: Detector Acústico: Agua vs Aire
  if (levelId === 25) {
    const speed = l25Medium === 'agua' ? 1480 : 340;
    const wavelength = (speed / l25Freq).toFixed(2);

    return (
      <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-cyan-500/30 space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Waves className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span className="font-mono text-xs font-black text-cyan-300 uppercase tracking-wider">
              TELEMETRÍA: DETECTOR DE SONIDO (AGUA VS AIRE)
            </span>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-500/25">
            Pregunta 2 Saber 11
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          El investigador sumerge el detector en agua y luego lo saca al aire. Observa cómo cambian las cuatro variables registradas:
        </p>

        {/* Medium and Frequency Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-slate-400 block uppercase">
              1. Medio en el que está el Detector:
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setL25Medium('agua')}
                className={`flex-1 py-2 px-3 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  l25Medium === 'agua'
                    ? 'bg-cyan-600 text-white shadow-lg border border-cyan-400'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                <span>🌊 En Agua</span>
                <span className="text-[9px] opacity-75">(1480 m/s)</span>
              </button>
              <button
                type="button"
                onClick={() => setL25Medium('aire')}
                className={`flex-1 py-2 px-3 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  l25Medium === 'aire'
                    ? 'bg-amber-600 text-white shadow-lg border border-amber-400'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                <span>💨 En Aire</span>
                <span className="text-[9px] opacity-75">(340 m/s)</span>
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-mono font-bold text-slate-400">
              <span>2. Frecuencia de la Fuente (f):</span>
              <span className="text-cyan-400 font-bold">{l25Freq} Hz (Invariable)</span>
            </div>
            <input
              type="range"
              min="200"
              max="800"
              step="20"
              value={l25Freq}
              onChange={(e) => setL25Freq(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[8px] font-mono text-slate-500">
              <span>200 Hz</span>
              <span>Constante por ser la misma fuente</span>
              <span>800 Hz</span>
            </div>
          </div>
        </div>

        {/* 4 Variables Comparative Table */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
          <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
            <span className="block text-[8px] font-mono font-bold text-slate-500 uppercase">Variable A</span>
            <span className="font-mono text-xs font-bold text-slate-300">Distancia</span>
            <span className="block text-[9px] text-slate-500 mt-1">Depende de la posición, no del medio</span>
          </div>
          <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
            <span className="block text-[8px] font-mono font-bold text-slate-500 uppercase">Variable B</span>
            <span className="font-mono text-xs font-bold text-cyan-400">Frecuencia (f)</span>
            <span className="block font-mono text-xs font-black text-cyan-300">{l25Freq} Hz</span>
            <span className="block text-[9px] text-emerald-400 font-bold mt-0.5">¡NO CAMBIA!</span>
          </div>
          <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
            <span className="block text-[8px] font-mono font-bold text-slate-500 uppercase">Variable C</span>
            <span className="font-mono text-xs font-bold text-slate-300">Forma de onda</span>
            <span className="block text-[9px] text-slate-500 mt-1">Perfil sinusoidal constante</span>
          </div>
          <div className="p-2.5 bg-cyan-950/40 rounded-xl border-2 border-cyan-500/50 shadow-md">
            <span className="block text-[8px] font-mono font-bold text-amber-400 uppercase">Variable D (Clave)</span>
            <span className="font-mono text-xs font-bold text-amber-300">Velocidad (v)</span>
            <span className="block font-mono text-sm font-black text-white">{speed} m/s</span>
            <span className="block text-[9px] text-amber-400 font-bold mt-0.5">
              {l25Medium === 'agua' ? '¡Muy rápida en agua!' : '¡Mucho más lenta en aire!'}
            </span>
          </div>
        </div>

        {/* Wave Animation SVG */}
        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mb-2">
            <span>Visualización de la Onda Sonora ({l25Medium.toUpperCase()}):</span>
            <span className="text-amber-400 font-bold font-mono">Longitud de onda λ = {wavelength} m</span>
          </div>
          <svg className="w-full h-16 bg-slate-950 rounded-lg" viewBox="0 0 500 60">
            <line x1="0" y1="30" x2="500" y2="30" stroke="#334155" strokeDasharray="3,3" />
            <path
              d={
                l25Medium === 'agua'
                  ? "M 0 30 Q 62.5 5 125 30 T 250 30 T 375 30 T 500 30"
                  : "M 0 30 Q 15.6 10 31.25 30 T 62.5 30 T 93.75 30 T 125 30 T 156.25 30 T 187.5 30 T 218.75 30 T 250 30 T 281.25 30 T 312.5 30 T 343.75 30 T 375 30 T 406.25 30 T 437.5 30 T 468.75 30 T 500 30"
              }
              fill="none"
              stroke={l25Medium === 'agua' ? '#06b6d4' : '#f59e0b'}
              strokeWidth="2.5"
            />
          </svg>
          <div className="flex justify-between text-[9px] font-mono text-slate-400 mt-1.5">
            <span>Inicio del emisor</span>
            <span className="text-cyan-400 font-bold">
              {l25Medium === 'agua' ? 'Onda expandida (λ mayor por alta velocidad)' : 'Onda comprimida (λ menor por baja velocidad)'}
            </span>
            <span>Detector</span>
          </div>
        </div>

        <div className="p-3 bg-cyan-950/30 border border-cyan-500/25 rounded-xl text-xs text-cyan-200">
          💡 <strong className="text-white">Conclusión Científica:</strong> La frecuencia permanece fija porque es determinada únicamente por la fuente que genera el sonido. La variable física que cambia drásticamente entre el agua y el aire es la <strong>velocidad de propagación</strong> (de ~1500 m/s a ~340 m/s). Por ello, la <strong>opción D (La velocidad de la onda)</strong> es la respuesta correcta.
        </div>
      </div>
    );
  }

  // Level 26: Refracción en la Piscina: El Farol y el Nadador
  if (levelId === 26) {
    return (
      <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-cyan-500/30 space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span className="font-mono text-xs font-black text-cyan-300 uppercase tracking-wider">
              ÓPTICA GEOMÉTRICA: REFRACCIÓN EN LA PISCINA (FAROL Y NADADOR)
            </span>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-500/25">
            Pregunta 3 Saber 11
          </span>
        </div>

        {/* Toggle between Empty and Full pool */}
        <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800">
          <span className="text-xs font-mono font-bold text-slate-300">
            Comparar estado de la piscina:
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setL26PoolFull(false)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                !l26PoolFull
                  ? 'bg-amber-600 text-white border border-amber-400 shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              Figura 1: Piscina Vacía
            </button>
            <button
              type="button"
              onClick={() => setL26PoolFull(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                l26PoolFull
                  ? 'bg-cyan-600 text-white border border-cyan-400 shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              Figura 2: Piscina Llena (Con Agua)
            </button>
          </div>
        </div>

        {/* Diagram SVG recreating official ICFES figures */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
          <svg className="w-full max-w-[550px] h-64 bg-slate-950 rounded-xl border border-slate-800" viewBox="0 0 500 240">
            {/* Pool structure */}
            <rect x="180" y="80" width="300" height="150" fill="#0f172a" stroke="#475569" strokeWidth="2" />
            
            {/* Water if pool is full */}
            {l26PoolFull && (
              <rect x="180" y="80" width="300" height="150" fill="#06b6d4" fillOpacity="0.18" />
            )}

            {/* Surface level line */}
            <line x1="180" y1="80" x2="480" y2="80" stroke={l26PoolFull ? "#38bdf8" : "#64748b"} strokeWidth={l26PoolFull ? 2 : 1} strokeDasharray={l26PoolFull ? undefined : "4,4"} />
            <text x="190" y="74" fill={l26PoolFull ? "#38bdf8" : "#64748b"} fontSize="9" fontWeight="bold" fontFamily="monospace">
              {l26PoolFull ? "SUPERFICIE DEL AGUA (n = 1.33)" : "NIVEL SUPERIOR (PISCINA VACÍA)"}
            </text>

            {/* Ground / Deck on the left */}
            <rect x="20" y="80" width="160" height="150" fill="#1e293b" stroke="#475569" strokeWidth="2" />
            <text x="40" y="140" fill="#64748b" fontSize="10" fontFamily="monospace">Borde de la piscina</text>

            {/* Farol (Lamppost) */}
            <line x1="90" y1="80" x2="90" y2="25" stroke="#f59e0b" strokeWidth="4" />
            <circle cx="90" cy="22" r="10" fill="#f59e0b" filter="drop-shadow(0 0 6px rgba(245,158,11,0.8))" />
            <text x="75" y="10" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace">Farol real</text>

            {/* Swimmer on the bottom right */}
            <g transform="translate(390, 200)">
              <circle cx="0" cy="0" r="12" fill="#38bdf8" />
              <circle cx="4" cy="-3" r="3" fill="#0f172a" />
              <text x="-25" y="24" fill="#94a3b8" fontSize="9" fontFamily="monospace">Nadador (ojo)</text>
            </g>

            {/* Normal line at incidence point */}
            <line x1="280" y1="30" x2="280" y2="130" stroke="#64748b" strokeDasharray="3,3" strokeWidth="1" />
            <text x="284" y="45" fill="#64748b" fontSize="8" fontFamily="monospace">Normal</text>

            {/* LIGHT RAYS */}
            {!l26PoolFull ? (
              // Empty pool: Straight line ray from lamp to swimmer
              <g>
                <line x1="90" y1="22" x2="390" y2="200" stroke="#fde047" strokeWidth="2.5" strokeDasharray="6,3" />
                <polygon points="250,117 240,105 245,119" fill="#fde047" />
                <text x="260" y="125" fill="#fde047" fontSize="9" fontWeight="bold" fontFamily="monospace">Rayo recto en aire</text>
                <text x="260" y="190" fill="#a7f3d0" fontSize="10" fontWeight="bold" fontFamily="monospace">
                  El nadador ve el farol a su altura real
                </text>
              </g>
            ) : (
              // Full pool: Refraction at surface + virtual image
              <g>
                {/* Incident ray: lamp to surface (90, 22) -> (280, 80) */}
                <line x1="90" y1="22" x2="280" y2="80" stroke="#fde047" strokeWidth="2.5" />
                <polygon points="190,52 180,45 186,57" fill="#fde047" />
                <text x="130" y="40" fill="#fde047" fontSize="8" fontFamily="monospace">Rayo incidente</text>

                {/* Refracted ray: surface to swimmer (280, 80) -> (390, 200) */}
                <line x1="280" y1="80" x2="390" y2="200" stroke="#38bdf8" strokeWidth="3" />
                <polygon points="340,145 330,135 338,148" fill="#38bdf8" />
                <text x="345" y="145" fill="#38bdf8" fontSize="8" fontFamily="monospace">Rayo refractado</text>

                {/* Virtual projection backward in straight line along swimmer's line of sight */}
                {/* Slope is (200 - 80)/(390 - 280) = 120/110 = 1.0909 */}
                {/* Projected backward to x=90: y = 80 - 1.0909 * (280 - 90) = 80 - 207 = -127 (too high, let's show line up to top) */}
                <line x1="390" y1="200" x2="160" y2="-50" stroke="#fb7185" strokeWidth="2" strokeDasharray="4,4" />
                
                {/* Virtual image of lamp at higher position */}
                <g transform="translate(90, -10)">
                  <circle cx="0" cy="0" r="10" fill="#fb7185" fillOpacity="0.4" stroke="#fb7185" strokeWidth="2" strokeDasharray="3,3" />
                  <text x="-40" y="-12" fill="#fb7185" fontSize="10" fontWeight="bold" fontFamily="monospace">
                    💡 Imagen virtual MÁS ALTA
                  </text>
                </g>

                {/* Comparison arrow */}
                <line x1="110" y1="18" x2="110" y2="-6" stroke="#fb7185" strokeWidth="2" markerEnd="url(#arrow)" />
                <text x="120" y="8" fill="#fb7185" fontSize="9" fontWeight="bold" fontFamily="monospace">
                  ↑ Sube de posición
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Explanation Card */}
        <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-cyan-300 font-bold font-mono">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>¿Por qué el nadador ve el farol más alto?</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Al entrar al agua, la luz pasa de un medio menos denso (aire, <span className="font-mono text-cyan-300">n ≈ 1.0</span>) a uno más denso (agua, <span className="font-mono text-cyan-300">n ≈ 1.33</span>). Por la Ley de Snell, el rayo se quiebra <strong>acercándose a la normal</strong>. Como el cerebro humano interpreta que los rayos luminosos viajan en línea recta sin doblarse, proyecta la dirección del rayo que llega al ojo hacia atrás, ubicando la imagen virtual del farol <strong>más arriba que su posición real</strong>.
          </p>
          <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono pt-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Opción Correcta en la Prueba Saber 11: C (más alto).</span>
          </div>
        </div>
      </div>
    );
  }

  // Level 27: Onda de Luz a Través de Vidrio y Agua
  if (levelId === 27) {
    return (
      <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-cyan-500/30 space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Waves className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span className="font-mono text-xs font-black text-cyan-300 uppercase tracking-wider">
              LONGITUD DE ONDA DE LUZ: AIRE → VIDRIO → AGUA → AIRE
            </span>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-500/25">
            Pregunta 4 Saber 11
          </span>
        </div>

        {/* Media sequence overview banner */}
        <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
          <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg">
            <span className="text-slate-400 block font-bold">1. AIRE</span>
            <span className="text-cyan-400 font-bold">Menos denso</span>
            <span className="text-emerald-400 block font-black">λ MAYOR (Ancha)</span>
          </div>
          <div className="p-2 bg-cyan-950/50 border border-cyan-500/30 rounded-lg">
            <span className="text-slate-200 block font-bold">2. VIDRIO</span>
            <span className="text-amber-400 font-bold">MÁS DENSO</span>
            <span className="text-rose-400 block font-black">λ MENOR (Comprimida)</span>
          </div>
          <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg">
            <span className="text-slate-400 block font-bold">3. AGUA</span>
            <span className="text-cyan-300 font-bold">Densidad media</span>
            <span className="text-amber-400 block font-black">λ INTERMEDIA</span>
          </div>
          <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg">
            <span className="text-slate-400 block font-bold">4. AIRE</span>
            <span className="text-slate-400 font-bold">Salida</span>
            <span className="text-emerald-400 block font-black">λ RECUPERADA</span>
          </div>
        </div>

        {/* Interactive Graph Inspector */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-300">
              Explorar las 4 Gráficas de la Prueba Saber 11:
            </span>
            <div className="flex gap-1.5">
              {(['A', 'B', 'C', 'D'] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setL27SelectedGraph(opt)}
                  className={`px-3 py-1 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                    l27SelectedGraph === opt
                      ? opt === 'B'
                        ? 'bg-emerald-600 text-white shadow-lg border border-emerald-400'
                        : 'bg-rose-600 text-white shadow-lg border border-rose-400'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  Gráfica {opt} {opt === 'B' && '★'}
                </button>
              ))}
            </div>
          </div>

          {/* Graphical rendering of selected option */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center text-xs font-mono mb-2">
              <span className="font-bold text-white">Visualización Gráfica {l27SelectedGraph}:</span>
              {l27SelectedGraph === 'B' ? (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> ¡RESPUESTA CORRECTA!
                </span>
              ) : (
                <span className="text-rose-400 font-bold flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> Opción Incorrecta (Distractor)
                </span>
              )}
            </div>

            <svg className="w-full h-24 bg-slate-950 rounded-xl border border-slate-800" viewBox="0 0 500 90">
              {/* Media vertical regions */}
              <rect x="0" y="0" width="125" height="90" fill="#0f172a" />
              <rect x="125" y="0" width="100" height="90" fill="#1e293b" />
              <rect x="225" y="0" width="150" height="90" fill="#082f49" fillOpacity="0.4" />
              <rect x="375" y="0" width="125" height="90" fill="#0f172a" />

              {/* Dividers */}
              <line x1="125" y1="0" x2="125" y2="90" stroke="#475569" strokeDasharray="3,3" />
              <line x1="225" y1="0" x2="225" y2="90" stroke="#475569" strokeDasharray="3,3" />
              <line x1="375" y1="0" x2="375" y2="90" stroke="#475569" strokeDasharray="3,3" />

              {/* Region labels */}
              <text x="50" y="15" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">Aire</text>
              <text x="175" y="15" fill="#f59e0b" fontSize="9" fontFamily="monospace" textAnchor="middle">Vidrio</text>
              <text x="300" y="15" fill="#38bdf8" fontSize="9" fontFamily="monospace" textAnchor="middle">Agua</text>
              <text x="435" y="15" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">Aire</text>

              {/* Render wave according to selected graph */}
              {l27SelectedGraph === 'B' && (
                // CORRECT: Aire (wide) -> Vidrio (tight) -> Agua (medium) -> Aire (wide)
                <path
                  d="M 0 50 Q 31.25 25 62.5 50 T 125 50 M 125 50 Q 137.5 30 150 50 T 175 50 T 200 50 T 225 50 M 225 50 Q 243.75 28 262.5 50 T 300 50 T 337.5 50 T 375 50 M 375 50 Q 406.25 25 437.5 50 T 500 50"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="2.5"
                />
              )}

              {l27SelectedGraph === 'A' && (
                // WRONG: Vidrio shown wide, agua compressed
                <path
                  d="M 0 50 Q 31.25 25 62.5 50 T 125 50 M 125 50 Q 150 25 175 50 T 225 50 M 225 50 Q 237.5 30 250 50 T 275 50 T 300 50 T 325 50 T 350 50 T 375 50 M 375 50 Q 406.25 25 437.5 50 T 500 50"
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="2.5"
                />
              )}

              {l27SelectedGraph === 'C' && (
                // WRONG: Wavelength stays constant in all media
                <path
                  d="M 0 50 Q 25 25 50 50 T 100 50 T 150 50 T 200 50 T 250 50 T 300 50 T 350 50 T 400 50 T 450 50 T 500 50"
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="2.5"
                />
              )}

              {l27SelectedGraph === 'D' && (
                // WRONG: Inverted: Vidrio has the longest wavelength
                <path
                  d="M 0 50 Q 15.6 30 31.25 50 T 62.5 50 T 93.75 50 T 125 50 M 125 50 Q 175 20 225 50 M 225 50 Q 250 25 275 50 T 325 50 T 375 50 M 375 50 Q 390.6 30 406.25 50 T 437.5 50 T 468.75 50 T 500 50"
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="2.5"
                />
              )}
            </svg>

            <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
              {l27SelectedGraph === 'B' && (
                <span className="text-emerald-300">
                  ✓ <strong>Gráfica B (Correcta):</strong> Cumple rigurosamente con la relación física λ = v / f. Al entrar al vidrio (más denso), la velocidad disminuye drásticamente y las oscilaciones se comprimen al máximo. Al pasar al agua (densidad intermedia), las crestas se separan un poco más, y al salir al aire recuperan la amplitud de onda mayor original.
                </span>
              )}
              {l27SelectedGraph === 'A' && (
                <span className="text-rose-300">
                  ✗ <strong>Gráfica A (Incorrecta):</strong> Dibuja la onda más ancha en el vidrio y más comprimida en el agua, contradiciendo el hecho de que el vidrio es más denso que el agua.
                </span>
              )}
              {l27SelectedGraph === 'C' && (
                <span className="text-rose-300">
                  ✗ <strong>Gráfica C (Incorrecta):</strong> Muestra la longitud de onda idéntica en todos los materiales, lo cual violaría la Ley de Refracción donde la velocidad cambia según el medio.
                </span>
              )}
              {l27SelectedGraph === 'D' && (
                <span className="text-rose-300">
                  ✗ <strong>Gráfica D (Incorrecta):</strong> Invierte completamente la relación física, mostrando la onda más estirada en el vidrio y comprimida en el aire.
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Level 28: Campo Eléctrico y Carga Negativa -q
  if (levelId === 28) {
    return (
      <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-cyan-500/30 space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span className="font-mono text-xs font-black text-cyan-300 uppercase tracking-wider">
              CAMPO ELÉCTRICO ENTRE ESFERAS Y CARGA NEGATIVA (-q)
            </span>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-500/25">
            Pregunta 5 Saber 11
          </span>
        </div>

        {/* Charge polarity toggle for interactive physics */}
        <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800">
          <span className="text-xs font-mono font-bold text-slate-300">
            Signo de la carga de prueba:
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setL28ChargeSign('negative')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                l28ChargeSign === 'negative'
                  ? 'bg-rose-600 text-white border border-rose-400 shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              Carga -q (Problema Oficial)
            </button>
            <button
              type="button"
              onClick={() => setL28ChargeSign('positive')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                l28ChargeSign === 'positive'
                  ? 'bg-cyan-600 text-white border border-cyan-400 shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              Carga +q (Caso Comparativo)
            </button>
          </div>
        </div>

        {/* Electric Field SVG Diagram */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
          <svg className="w-full max-w-[500px] h-60 bg-slate-950 rounded-xl border border-slate-800" viewBox="0 0 500 220">
            {/* Positive Sphere (Left) */}
            <circle cx="80" cy="110" r="35" fill="#0284c7" stroke="#38bdf8" strokeWidth="3" filter="drop-shadow(0 0 10px rgba(56,189,248,0.4))" />
            <text x="80" y="118" fill="#ffffff" fontSize="26" fontWeight="black" textAnchor="middle">+</text>
            <text x="80" y="165" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Esfera (+)</text>

            {/* Negative Sphere (Right) */}
            <circle cx="420" cy="110" r="35" fill="#e11d48" stroke="#fb7185" strokeWidth="3" filter="drop-shadow(0 0 10px rgba(251,113,133,0.4))" />
            <text x="420" y="118" fill="#ffffff" fontSize="28" fontWeight="black" textAnchor="middle">−</text>
            <text x="420" y="165" fill="#fb7185" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Esfera (−)</text>

            {/* Electric Field Lines E (Curving from + to -) */}
            <path d="M 115 110 L 385 110" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,4" />
            <polygon points="255,107 265,110 255,113" fill="#64748b" />

            <path d="M 105 85 Q 250 20 395 85" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,4" />
            <polygon points="255,50 265,52 257,56" fill="#64748b" />

            <path d="M 105 135 Q 250 200 395 135" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,4" />
            <polygon points="255,170 265,168 257,164" fill="#64748b" />

            <text x="250" y="40" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">Línea de Campo Eléctrico E⃗</text>

            {/* Test Charge in the upper region */}
            <g transform="translate(250, 75)">
              <circle
                cx="0"
                cy="0"
                r="14"
                fill={l28ChargeSign === 'negative' ? '#fb7185' : '#38bdf8'}
                stroke="#ffffff"
                strokeWidth="2"
              />
              <text x="0" y="5" fill="#ffffff" fontSize="14" fontWeight="black" textAnchor="middle">
                {l28ChargeSign === 'negative' ? '−q' : '+q'}
              </text>

              {/* Force Vector Arrow */}
              {l28ChargeSign === 'negative' ? (
                // Force points down and left (towards + sphere) -> Option A!
                <g>
                  <line x1="0" y1="0" x2="-65" y2="35" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
                  <polygon points="-65,35 -52,26 -56,38" fill="#fbbf24" />
                  <text x="-75" y="55" fill="#fbbf24" fontSize="11" fontWeight="black" fontFamily="monospace" textAnchor="middle">
                    F⃗ (Hacia +) ★
                  </text>
                  <text x="-75" y="70" fill="#34d399" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    Gráfica A (Correcta)
                  </text>
                </g>
              ) : (
                // Positive charge moves in direction of E (Option C)
                <g>
                  <line x1="0" y1="0" x2="65" y2="35" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
                  <polygon points="65,35 56,38 52,26" fill="#38bdf8" />
                  <text x="75" y="55" fill="#38bdf8" fontSize="11" fontWeight="black" fontFamily="monospace" textAnchor="middle">
                    F⃗ (En sentido de E⃗)
                  </text>
                </g>
              )}
            </g>
          </svg>
        </div>

        {/* 4 Options Overview Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
          <div className="p-2.5 bg-emerald-950/40 border-2 border-emerald-500/50 rounded-xl">
            <span className="font-mono text-emerald-400 font-bold block">Gráfica A ★</span>
            <span className="text-[11px] font-bold text-white">Flecha hacia abajo-izquierda</span>
            <span className="text-[9px] text-emerald-400 block mt-1 font-bold">¡CORRECTA! Atracción hacia +</span>
          </div>
          <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl">
            <span className="font-mono text-slate-400 font-bold block">Gráfica B</span>
            <span className="text-[11px] text-slate-300">Flecha hacia arriba</span>
            <span className="text-[9px] text-rose-400 block mt-1">Incorrecta</span>
          </div>
          <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl">
            <span className="font-mono text-slate-400 font-bold block">Gráfica C</span>
            <span className="text-[11px] text-slate-300">Flecha a la derecha</span>
            <span className="text-[9px] text-rose-400 block mt-1">Solo si fuese +q</span>
          </div>
          <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl">
            <span className="font-mono text-slate-400 font-bold block">Gráfica D</span>
            <span className="text-[11px] text-slate-300">Flecha vertical abajo</span>
            <span className="text-[9px] text-rose-400 block mt-1">Incorrecta</span>
          </div>
        </div>

        <div className="p-3 bg-cyan-950/30 border border-cyan-500/25 rounded-xl text-xs text-cyan-200">
          💡 <strong className="text-white">Fundamento Físico:</strong> La fuerza eléctrica es F⃗ = q·E⃗. Como la carga de prueba es negativa (−q), el vector fuerza apunta en sentido opuesto al campo eléctrico (hacia la fuente positiva que la atrae y alejándose de la negativa que la repele). Por lo tanto, la <strong>Gráfica A</strong> ilustra la trayectoria correcta.
        </div>
      </div>
    );
  }

  // Level 29: Fuerzas Electrostáticas sobre Tres Cargas (Ley de Coulomb)
  if (levelId === 29) {
    return (
      <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-cyan-500/30 space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span className="font-mono text-xs font-black text-cyan-300 uppercase tracking-wider">
              FUERZAS ELECTROSTÁTICAS EN SISTEMA TRIANGULAR (LEY DE COULOMB)
            </span>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-500/25">
            Pregunta 6 Saber 11
          </span>
        </div>

        {/* Breakdown of the 2 forces */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-xl">
            <span className="font-mono text-[10px] font-bold text-cyan-400 uppercase block">
              1. Interacción Carga 2 (+) sobre Carga 1 (−)
            </span>
            <span className="text-white font-bold block mt-1">Signos Opuestos → ATRACCIÓN</span>
            <p className="text-slate-300 text-[11px] mt-1">
              La Carga 2 atrae a la Carga 1. El vector fuerza apunta <strong>hacia abajo y a la izquierda</strong>, en dirección directa a la Carga 2.
            </p>
          </div>
          <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-xl">
            <span className="font-mono text-[10px] font-bold text-amber-400 uppercase block">
              2. Interacción Carga 3 (−) sobre Carga 1 (−)
            </span>
            <span className="text-white font-bold block mt-1">Signos Iguales → REPULSIÓN</span>
            <p className="text-slate-300 text-[11px] mt-1">
              La Carga 3 repele a la Carga 1. El vector fuerza apunta <strong>hacia arriba y a la izquierda</strong>, alejándose sobre la línea diagonal.
            </p>
          </div>
        </div>

        {/* Triangle System SVG */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
          <svg className="w-full max-w-[500px] h-64 bg-slate-950 rounded-xl border border-slate-800" viewBox="0 0 500 240">
            {/* Dashed triangle frame */}
            <polygon points="250,50 120,200 380,200" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="4,4" />
            
            {/* Prolongation line for repulsion through C3 and C1 */}
            <line x1="380" y1="200" x2="160" y2="-50" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" />

            {/* Charge 2: Base Left (+) */}
            <circle cx="120" cy="200" r="18" fill="#0284c7" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="120" y="206" fill="#ffffff" fontSize="18" fontWeight="black" textAnchor="middle">+</text>
            <text x="120" y="230" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              Carga 2 (+)
            </text>

            {/* Charge 3: Base Right (-) */}
            <circle cx="380" cy="200" r="18" fill="#e11d48" stroke="#fb7185" strokeWidth="2.5" />
            <text x="380" y="207" fill="#ffffff" fontSize="20" fontWeight="black" textAnchor="middle">−</text>
            <text x="380" y="230" fill="#fb7185" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              Carga 3 (−)
            </text>

            {/* Charge 1: Top (-) */}
            <g transform="translate(250, 50)">
              <circle cx="0" cy="0" r="18" fill="#e11d48" stroke="#fb7185" strokeWidth="2.5" />
              <text x="0" y="7" fill="#ffffff" fontSize="20" fontWeight="black" textAnchor="middle">−</text>
              <text x="0" y="-24" fill="#fb7185" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                Carga 1 (−)
              </text>

              {/* Vector 1: F2 sobre 1 (Attraction towards C2: down-left) */}
              <line x1="0" y1="0" x2="-65" y2="75" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
              <polygon points="-65,75 -52,68 -60,60" fill="#38bdf8" />
              <text x="-75" y="95" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="end">
                Fuerza de 2 sobre 1 (Atracción)
              </text>

              {/* Vector 2: F3 sobre 1 (Repulsion away from C3: up-left) */}
              <line x1="0" y1="0" x2="-65" y2="-75" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
              <polygon points="-65,-75 -60,-60 -52,-68" fill="#fbbf24" />
              <text x="-75" y="-75" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="end">
                Fuerza de 3 sobre 1 (Repulsión)
              </text>
            </g>
          </svg>
        </div>

        {/* Options Comparison */}
        <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white font-mono">Verificación de Opciones:</span>
            <span className="text-emerald-400 font-bold font-mono flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Gráfica B es la Única Correcta
            </span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            La <strong>Gráfica B</strong> es la única figura que muestra de manera simultánea y matemáticamente rigurosa los dos vectores: la fuerza atractiva de la Carga 2 apuntando hacia la Carga 2 (abajo-izquierda) y la fuerza repulsiva de la Carga 3 apuntando en sentido opuesto a la Carga 3 sobre la línea recta que las une (arriba-izquierda).
          </p>
        </div>
      </div>
    );
  }

  return null;
}
