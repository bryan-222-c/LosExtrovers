import React, { useState } from 'react';
import { Droplets, CloudFog, Flame, Activity, Compass, ArrowUp, ArrowDown, CheckCircle2, XCircle, Sparkles, Scale } from 'lucide-react';

interface Module5GraphicsProps {
  levelId: number;
}

export default function Module5Graphics({ levelId }: Module5GraphicsProps) {
  // State for Level 30 (Sublimación Hielo Seco)
  const [l30State, setL30State] = useState<'solido' | 'gaseoso'>('gaseoso');

  // State for Level 31 (Ebullición según altura)
  const [l31Altitude, setL31Altitude] = useState<number>(25); // 0 to 25 km

  // State for Level 32 (Gráfica Masa vs Densidad)
  const [l32Extrapolate, setL32Extrapolate] = useState<boolean>(true);

  // State for Level 33 (Jeringa)
  const [l33Displaced, setL33Displaced] = useState<boolean>(true); // true = displaced X up

  // State for Level 34 (Submarino)
  const [l34Pumping, setL34Pumping] = useState<boolean>(true); // true = expulsando agua

  // ==========================================
  // LEVEL 30: SUBLIMACIÓN HIELO SECO (CO2)
  // ==========================================
  if (levelId === 30) {
    const isSolid = l30State === 'solido';
    return (
      <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-cyan-500/30 space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <CloudFog className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span className="font-mono text-xs font-black text-cyan-300 uppercase tracking-wider">
              TELEMETRÍA: CAMBIO DE ESTADO DEL CO₂ (SÓLIDO → GASEOSO)
            </span>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-500/25">
            Pregunta 1 Saber 11
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Un bloque de hielo seco (CO₂ sólido) sublima al estado gaseoso a temperatura ambiental. Observa cómo cambia la distancia entre partículas y el volumen manteniendo la masa intacta:
        </p>

        {/* State Toggle Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setL30State('solido')}
            className={`flex-1 py-2 px-3 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              isSolid
                ? 'bg-blue-600 text-white shadow-lg border border-blue-400'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <span>🧊 CO₂ Sólido (Hielo Seco)</span>
          </button>
          <button
            type="button"
            onClick={() => setL30State('gaseoso')}
            className={`flex-1 py-2 px-3 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              !isSolid
                ? 'bg-cyan-600 text-white shadow-lg border border-cyan-400'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <span>💨 CO₂ Gaseoso (Sublimado)</span>
          </button>
        </div>

        {/* Microscopic Particle Visualization */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
          <div className="w-full flex justify-between text-[10px] font-mono text-slate-400 mb-2">
            <span>Cámara de Confinamiento Molecular:</span>
            <span className={isSolid ? "text-blue-400 font-bold" : "text-cyan-400 font-bold"}>
              {isSolid ? "Red compacta (Distancia mínima)" : "Partículas libres (Gran separación intermolecular)"}
            </span>
          </div>

          <svg className="w-full max-w-[480px] h-48 bg-slate-950 rounded-xl border border-slate-800" viewBox="0 0 400 180">
            {/* Cylinder / Container Outline */}
            <rect x="50" y="20" width="300" height="140" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="2" />
            
            {isSolid ? (
              // Solid: tightly packed in bottom center
              <g transform="translate(140, 70)">
                <rect x="0" y="0" width="120" height="80" rx="6" fill="#1e3a8a" fillOpacity="0.4" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3,3" />
                <text x="60" y="-10" fill="#60a5fa" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  Volumen pequeño (V₁)
                </text>
                {/* Regular grid of CO2 molecules */}
                {[0, 24, 48, 72, 96].map((x) =>
                  [15, 35, 55, 75].map((y) => (
                    <circle key={`${x}-${y}`} cx={x + 12} cy={y - 5} r="6" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="1" />
                  ))
                )}
              </g>
            ) : (
              // Gas: dispersed all over the 300x140 area
              <g>
                <text x="200" y="40" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  Volumen expandido (V₂ &gt;&gt; V₁) — Ocupa todo el espacio
                </text>
                {/* Dispersed random-looking molecules */}
                {[
                  [70, 60], [100, 130], [130, 80], [160, 140], [190, 70], [220, 120],
                  [250, 60], [280, 140], [310, 85], [90, 100], [150, 110], [210, 95],
                  [270, 105], [320, 130], [80, 140], [120, 50], [180, 130], [240, 75],
                  [300, 55], [330, 110]
                ].map(([cx, cy], i) => (
                  <g key={i}>
                    <circle cx={cx} cy={cy} r="6" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
                    {/* Small velocity vector line */}
                    <line x1={cx} y1={cy} x2={cx + (i % 2 === 0 ? 8 : -8)} y2={cy + (i % 3 === 0 ? 8 : -8)} stroke="#38bdf8" strokeWidth="1" opacity="0.6" />
                  </g>
                ))}
              </g>
            )}
          </svg>
        </div>

        {/* Physical Equation Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs">
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">1. Masa (m)</span>
            <span className="font-mono text-emerald-400 font-black text-sm block my-0.5">m = CONSTANTE</span>
            <span className="text-[10px] text-slate-400">Por conservación de la materia, no disminuye ni se destruye.</span>
          </div>
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">2. Volumen (V)</span>
            <span className="font-mono text-cyan-400 font-black text-sm block my-0.5">AUMENTA (V₂ &gt;&gt; V₁)</span>
            <span className="text-[10px] text-slate-400">Al pasar a gas, la distancia entre partículas crece drásticamente.</span>
          </div>
          <div className="p-3 bg-cyan-950/40 rounded-xl border-2 border-cyan-500/50">
            <span className="text-[10px] font-mono text-amber-400 block uppercase font-bold">3. Densidad (d = m / V)</span>
            <span className="font-mono text-amber-300 font-black text-sm block my-0.5">DISMINUYE ↓</span>
            <span className="text-[10px] text-amber-200">Mismo numerador (m) dividido por un denominador mayor (V).</span>
          </div>
        </div>

        {/* Conclusion Box */}
        <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5 text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono">
            <CheckCircle2 className="w-4 h-4" />
            <span>Opción Correcta en la Prueba Saber 11: B</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            La densidad del CO₂ disminuye porque <strong>la distancia entre partículas y el volumen aumentan</strong>. Las opciones que afirman que la masa disminuye (A y D) son incorrectas puesto que la masa total se conserva durante cualquier cambio de estado físico.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // LEVEL 31: EBULLICIÓN Y PRESIÓN SEGÚN ALTURA
  // ==========================================
  if (levelId === 31) {
    // Boiling point approximation based on height
    // At 0 km: 100°C; at 25 km: ~25°C or less
    const approxTemp = Math.max(25, Math.round(100 - l31Altitude * 3.1));
    const airDensityRatio = Math.max(0.03, Math.exp(-l31Altitude / 7.5)).toFixed(2);

    return (
      <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-cyan-500/30 space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span className="font-mono text-xs font-black text-cyan-300 uppercase tracking-wider">
              MODELO SABER 11: PRESIÓN ATMOSFÉRICA VS. PUNTO DE EBULLICIÓN
            </span>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-500/25">
            Pregunta 2 Saber 11
          </span>
        </div>

        {/* Altitude interactive slider */}
        <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-300 font-bold">Ajustar Altura de la Olla:</span>
            <span className="text-cyan-400 font-black text-sm">{l31Altitude} km sobre el nivel del mar</span>
          </div>
          <input
            type="range"
            min="0"
            max="25"
            step="1"
            value={l31Altitude}
            onChange={(e) => setL31Altitude(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
          <div className="flex justify-between text-[9px] font-mono text-slate-500">
            <span>0 km (Nivel del mar, P = 1 atm)</span>
            <span className="text-amber-400 font-bold">25 km (Cuestionario Saber 11)</span>
          </div>
        </div>

        {/* Visual Columns Comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Recreated Atmosphere Column SVG from PDF */}
          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex flex-col items-center">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase mb-2">
              Modelo Físico: Altura vs Partículas de Aire
            </span>
            <svg className="w-full max-w-[240px] h-60 bg-slate-950 rounded-lg border border-slate-800" viewBox="0 0 200 240">
              {/* Box perspective prism */}
              <polygon points="30,220 170,220 185,190 45,190" fill="#1e293b" stroke="#475569" strokeWidth="1" />
              <line x1="30" y1="220" x2="30" y2="40" stroke="#475569" strokeWidth="1.5" />
              <line x1="170" y1="220" x2="170" y2="40" stroke="#475569" strokeWidth="1.5" />
              <line x1="185" y1="190" x2="185" y2="20" stroke="#334155" strokeWidth="1" strokeDasharray="2,2" />
              <polygon points="30,40 170,40 185,20 45,20" fill="none" stroke="#475569" strokeWidth="1.5" />

              {/* Height Axis Markers */}
              <text x="15" y="45" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="end">30 km</text>
              <line x1="20" y1="42" x2="28" y2="42" stroke="#64748b" />
              <text x="15" y="75" fill="#f59e0b" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="end">25 km</text>
              <line x1="20" y1="72" x2="28" y2="72" stroke="#f59e0b" strokeWidth="2" />
              <text x="15" y="105" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="end">20 km</text>
              <text x="15" y="135" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="end">15 km</text>
              <text x="15" y="165" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="end">10 km</text>
              <text x="15" y="195" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="end">5 km</text>
              <text x="15" y="222" fill="#38bdf8" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="end">0 km</text>

              {/* Atmospheric air particles showing exponential decay */}
              {/* High density at bottom (y 180 to 220) */}
              {Array.from({ length: 45 }).map((_, i) => (
                <circle
                  key={`b-${i}`}
                  cx={40 + ((i * 37) % 120)}
                  cy={180 + ((i * 19) % 36)}
                  r="1.8"
                  fill="#94a3b8"
                />
              ))}
              {/* Medium density (y 130 to 180) */}
              {Array.from({ length: 25 }).map((_, i) => (
                <circle
                  key={`m-${i}`}
                  cx={45 + ((i * 43) % 115)}
                  cy={130 + ((i * 23) % 45)}
                  r="1.6"
                  fill="#64748b"
                />
              ))}
              {/* Low density (y 80 to 130) */}
              {Array.from({ length: 12 }).map((_, i) => (
                <circle
                  key={`t-${i}`}
                  cx={45 + ((i * 51) % 110)}
                  cy={80 + ((i * 29) % 45)}
                  r="1.5"
                  fill="#475569"
                />
              ))}
              {/* Very low density at 25 km (y 40 to 80) */}
              {Array.from({ length: 4 }).map((_, i) => (
                <circle
                  key={`top-${i}`}
                  cx={50 + ((i * 67) % 100)}
                  cy={45 + ((i * 31) % 30)}
                  r="1.4"
                  fill="#f59e0b"
                />
              ))}

              {/* Indicator of current selected height */}
              {/* y = 220 - (height / 30) * 180 */}
              <line
                x1="26"
                y1={220 - (l31Altitude / 30) * 180}
                x2="175"
                y2={220 - (l31Altitude / 30) * 180}
                stroke="#38bdf8"
                strokeWidth="2"
                strokeDasharray="4,2"
              />
              <circle
                cx="175"
                cy={220 - (l31Altitude / 30) * 180}
                r="4"
                fill="#38bdf8"
              />
            </svg>
          </div>

          {/* Boiling Pot & Physical Conditions */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-1">
                Estado Físico a {l31Altitude} km:
              </span>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Presión Atmosférica:</span>
                  <span className="font-mono text-cyan-400 font-bold">
                    {l31Altitude === 0 ? "1.00 atm (101.3 kPa)" : `${airDensityRatio} atm (Muy baja)`}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Temperatura de Ebullición:</span>
                  <span className="font-mono text-amber-400 font-black text-sm">
                    ~{approxTemp} °C {l31Altitude > 0 && <span className="text-emerald-400 text-xs">(&lt; 100 °C)</span>}
                  </span>
                </div>
              </div>
            </div>

            {/* Boiling Simulation SVG */}
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-center">
              <svg className="w-36 h-28" viewBox="0 0 140 100">
                {/* Pot */}
                <rect x="25" y="30" width="90" height="55" rx="5" fill="#334155" stroke="#64748b" strokeWidth="2" />
                <rect x="30" y="45" width="80" height="36" rx="3" fill="#0284c7" fillOpacity="0.4" />
                {/* Handles */}
                <path d="M 25 40 Q 12 45 25 55" fill="none" stroke="#64748b" strokeWidth="2.5" />
                <path d="M 115 40 Q 128 45 115 55" fill="none" stroke="#64748b" strokeWidth="2.5" />
                {/* Downward atmospheric arrows (proportional to pressure) */}
                {l31Altitude <= 10 ? (
                  <g stroke="#f87171" strokeWidth="1.5">
                    <line x1="45" y1="12" x2="45" y2="26" markerEnd="url(#red-arrow)" />
                    <line x1="70" y1="12" x2="70" y2="26" markerEnd="url(#red-arrow)" />
                    <line x1="95" y1="12" x2="95" y2="26" markerEnd="url(#red-arrow)" />
                    <text x="70" y="8" fill="#f87171" fontSize="7" fontFamily="monospace" textAnchor="middle">Presión Atm Alta</text>
                  </g>
                ) : (
                  <g stroke="#38bdf8" strokeWidth="1">
                    <line x1="70" y1="18" x2="70" y2="26" />
                    <text x="70" y="12" fill="#38bdf8" fontSize="7" fontFamily="monospace" textAnchor="middle">Presión Débil</text>
                  </g>
                )}
                {/* Vapor bubbles */}
                <circle cx="50" cy="65" r="3" fill="#38bdf8" opacity="0.8" />
                <circle cx="70" cy="55" r="4" fill="#38bdf8" opacity="0.9" />
                <circle cx="90" cy="68" r="3" fill="#38bdf8" opacity="0.8" />
                <path d="M 70 45 Q 65 35 70 25" fill="none" stroke="#bae6fd" strokeWidth="1.5" opacity="0.7" />
                <path d="M 55 45 Q 50 35 55 25" fill="none" stroke="#bae6fd" strokeWidth="1.5" opacity="0.7" />
                <path d="M 85 45 Q 80 35 85 25" fill="none" stroke="#bae6fd" strokeWidth="1.5" opacity="0.7" />
              </svg>
            </div>

            <div className="text-[11px] text-slate-300">
              💡 Para que el agua hierva, su presión de vapor debe igualar la presión atmosférica circundante. Como a 25 km hay muy poco aire, la presión exterior es mínima, por lo que <strong>hierve a mucho menos de 100 °C</strong>.
            </div>
          </div>
        </div>

        {/* Conclusion Box */}
        <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5 text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono">
            <CheckCircle2 className="w-4 h-4" />
            <span>Opción Correcta en la Prueba Saber 11: A</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            A 25 km de altura, el agua <strong>hierve a una temperatura menor que 100 °C, porque la presión es menor en esta altura</strong>.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // LEVEL 32: GRÁFICA MASA VS DENSIDAD DE LÍQUIDO
  // ==========================================
  if (levelId === 32) {
    // Official points from ICFES diagram:
    // (0.7, 25), (0.9, 30), (1.1, 35), (1.3, 42), (1.5, 50)
    // Intercept with Y axis at Density = 0 is ~ 8 g (mass of dry sponge)
    return (
      <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-cyan-500/30 space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span className="font-mono text-xs font-black text-cyan-300 uppercase tracking-wider">
              ANÁLISIS GRÁFICO: MASA VS DENSIDAD Y LÍNEA DE TENDENCIA
            </span>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-500/25">
            Pregunta 3 Saber 11
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Los estudiantes sumergieron una esponja en líquidos de diferente densidad. La gráfica muestra los datos experimentales y la línea de tendencia (regresión lineal):
        </p>

        {/* Toggle Extrapolation View */}
        <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800">
          <span className="text-xs font-mono font-bold text-slate-300">
            Modo de Visualización Científica:
          </span>
          <button
            type="button"
            onClick={() => setL32Extrapolate(!l32Extrapolate)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              l32Extrapolate
                ? 'bg-emerald-600 text-white border border-emerald-400 shadow-md'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {l32Extrapolate ? '✓ Extrapolación Activada (d → 0)' : 'Ver Solo Puntos Medidos'}
          </button>
        </div>

        {/* Official ICFES Graph SVG Recreation */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
          <svg className="w-full max-w-[500px] h-64 bg-slate-950 rounded-xl border border-slate-800" viewBox="0 0 500 240">
            {/* Grid Lines */}
            {[0, 10, 20, 30, 40, 50].map((val) => {
              const y = 200 - (val / 50) * 160;
              return (
                <g key={`y-${val}`}>
                  <line x1="60" y1={y} x2="460" y2={y} stroke="#1e293b" strokeDasharray="2,2" />
                  <text x="50" y={y + 3} fill="#64748b" fontSize="9" fontFamily="monospace" textAnchor="end">
                    {val}
                  </text>
                </g>
              );
            })}

            {[0.0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6].map((val) => {
              const x = 60 + (val / 1.6) * 400;
              return (
                <g key={`x-${val}`}>
                  <line x1={x} y1="40" x2={x} y2="200" stroke="#1e293b" strokeDasharray="2,2" />
                  <text x={x} y="215" fill="#64748b" fontSize="8.5" fontFamily="monospace" textAnchor="middle">
                    {val.toFixed(1)}
                  </text>
                </g>
              );
            })}

            {/* Axes */}
            <line x1="60" y1="200" x2="470" y2="200" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="60" y1="200" x2="60" y2="30" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

            <text x="260" y="232" fill="#94a3b8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              Densidad (g/cm³)
            </text>
            <text x="20" y="120" fill="#94a3b8" fontSize="10" fontWeight="bold" fontFamily="monospace" transform="rotate(-90 20 120)" textAnchor="middle">
              Masa (g)
            </text>

            {/* Trend Line: from (0, 8.5) to (1.55, 52) */}
            {/* Equation: y = 8.5 + 27.5 * x */}
            {/* At x=0 (x_svg=60): y_svg = 200 - (8.5 / 50)*160 = 200 - 27.2 = 172.8 */}
            {/* At x=0.7 (x_svg=235): y_svg = 200 - (27.75/50)*160 = 111.2 */}
            {/* At x=1.5 (x_svg=435): y_svg = 200 - (49.75/50)*160 = 40.8 */}

            {/* Solid line between measured range 0.7 to 1.5 */}
            <line x1="235" y1="111" x2="435" y2="41" stroke="#38bdf8" strokeWidth="2.5" />

            {/* Extrapolated line to Y-axis intercept */}
            {l32Extrapolate && (
              <g>
                <line x1="60" y1="173" x2="235" y2="111" stroke="#34d399" strokeWidth="2.5" strokeDasharray="4,3" />
                {/* Intercept Highlight Circle */}
                <circle cx="60" cy="173" r="6" fill="#34d399" stroke="#065f46" strokeWidth="2" />
                <text x="75" y="168" fill="#34d399" fontSize="10" fontWeight="black" fontFamily="monospace">
                  Intercepto &gt; 0 (Masa esponja seca ≈ 8.5 g)
                </text>
              </g>
            )}

            {/* Experimental Data Points */}
            {[
              [0.7, 25],
              [0.9, 30],
              [1.1, 35],
              [1.3, 42],
              [1.5, 50]
            ].map(([den, mas], idx) => {
              const px = 60 + (den / 1.6) * 400;
              const py = 200 - (mas / 50) * 160;
              return (
                <g key={idx}>
                  <circle cx={px} cy={py} r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Physical Interpretation Box */}
        <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono">
            <CheckCircle2 className="w-4 h-4" />
            <span>Respuesta Correcta en la Prueba Saber 11: Opción A</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            ¿Es una predicción basada en los datos experimentales? <strong>Sí, porque la línea de tendencia cruza en un punto diferente de cero.</strong> La línea de tendencia matemática modela el comportamiento de todo el sistema; al extrapolarla hacia densidad cero, el corte con el eje vertical predice que la masa seguirá siendo diferente de cero (correspondiente a la masa de la esponja seca sin líquido).
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // LEVEL 33: JERINGA SELLADA (GAS IDEAL)
  // ==========================================
  if (levelId === 33) {
    return (
      <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-cyan-500/30 space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span className="font-mono text-xs font-black text-cyan-300 uppercase tracking-wider">
              GASES IDEALES: JERINGA SELLADA Y LEY DE BOYLE (P · V = CTE)
            </span>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-500/25">
            Pregunta 4 Saber 11
          </span>
        </div>

        {/* Interactive Plunger Toggle */}
        <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800">
          <span className="text-xs font-mono font-bold text-slate-300">
            Acción sobre el émbolo:
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setL33Displaced(false)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                !l33Displaced
                  ? 'bg-amber-600 text-white border border-amber-400 shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              Posición Inicial (d, P_gas = P)
            </button>
            <button
              type="button"
              onClick={() => setL33Displaced(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                l33Displaced
                  ? 'bg-cyan-600 text-white border border-cyan-400 shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              Desplazado arriba +X (y soltar)
            </button>
          </div>
        </div>

        {/* Syringe SVG Diagram */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
          <svg className="w-full max-w-[420px] h-64 bg-slate-950 rounded-xl border border-slate-800" viewBox="0 0 350 240">
            {/* External Pressure arrows pushing down on plunger */}
            <g stroke="#f87171" strokeWidth="2">
              <line x1="150" y1="15" x2="150" y2="40" />
              <polygon points="150,40 146,32 154,32" fill="#f87171" />
              <line x1="200" y1="15" x2="200" y2="40" />
              <polygon points="200,40 196,32 204,32" fill="#f87171" />
              <text x="175" y="12" fill="#f87171" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                Fuerza Atmosférica Externa (F_ext = P · A) ↓
              </text>
            </g>

            {/* Syringe Barrel (Area A) */}
            <rect x="135" y="45" width="80" height="150" fill="#0f172a" stroke="#475569" strokeWidth="2" />
            <text x="225" y="120" fill="#94a3b8" fontSize="9" fontFamily="monospace">Área A</text>

            {/* Sealed Tip at bottom */}
            <polygon points="175,225 165,195 185,195" fill="#000000" stroke="#475569" strokeWidth="2" />
            <circle cx="175" cy="225" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
            <text x="175" y="238" fill="#ef4444" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              PUNTA SELLADA
            </text>

            {/* Plunger & Gas inside */}
            {l33Displaced ? (
              // Displaced UP by X: Plunger at y=55 (larger volume)
              <g>
                {/* Plunger shaft */}
                <rect x="168" y="15" width="14" height="40" fill="#64748b" />
                <rect x="145" y="15" width="60" height="8" rx="2" fill="#94a3b8" />
                {/* Plunger rubber head */}
                <rect x="137" y="55" width="76" height="15" fill="#334155" stroke="#38bdf8" strokeWidth="1.5" />
                
                {/* Gas volume under plunger */}
                <rect x="137" y="70" width="76" height="125" fill="#06b6d4" fillOpacity="0.15" />
                <text x="175" y="115" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  V_nuevo &gt; V_inicial
                </text>
                <text x="175" y="132" fill="#f59e0b" fontSize="10" fontWeight="black" fontFamily="monospace" textAnchor="middle">
                  P_nueva &lt; P
                </text>

                {/* Internal Force vector (weaker upward force) */}
                <line x1="175" y1="85" x2="175" y2="72" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="175,72 171,80 179,80" fill="#38bdf8" />
                <text x="175" y="150" fill="#34d399" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  F_ext &gt; F_int → ¡Retorna abajo!
                </text>

                {/* Distance marker d + X */}
                <line x1="120" y1="195" x2="120" y2="55" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="110" y="125" fill="#f59e0b" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="end">
                  d + X
                </text>
              </g>
            ) : (
              // Initial position: Plunger at y=110
              <g>
                {/* Plunger shaft */}
                <rect x="168" y="45" width="14" height="65" fill="#64748b" />
                <rect x="145" y="45" width="60" height="8" rx="2" fill="#94a3b8" />
                {/* Plunger head */}
                <rect x="137" y="110" width="76" height="15" fill="#334155" stroke="#94a3b8" strokeWidth="1" />
                {/* Gas volume */}
                <rect x="137" y="125" width="76" height="70" fill="#06b6d4" fillOpacity="0.25" />
                <text x="175" y="155" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  Presión gas = P
                </text>
                <line x1="120" y1="195" x2="120" y2="110" stroke="#94a3b8" strokeWidth="1.5" />
                <text x="110" y="155" fill="#94a3b8" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="end">
                  d
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Thermodynamic Explanation */}
        <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono">
            <CheckCircle2 className="w-4 h-4" />
            <span>Opción Correcta en la Prueba Saber 11: D</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Al desplazar el émbolo hacia arriba, el volumen ocupado por el gas confinado aumenta. Por la Ley de Boyle para un gas ideal a temperatura constante (P · V = constante), al aumentar el volumen, la presión interna disminuye (P_gas &lt; P). Como la presión atmosférica externa P sigue siendo mayor, la fuerza que ejerce el aire exterior empuja el émbolo hacia abajo, por lo que <strong>retornará a la posición inicial, porque la nueva presión del gas es menor que P</strong>.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // LEVEL 34: SUBMARINO Y ARQUÍMEDES
  // ==========================================
  if (levelId === 34) {
    return (
      <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-cyan-500/30 space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span className="font-mono text-xs font-black text-cyan-300 uppercase tracking-wider">
              PRINCIPIO DE ARQUÍMEDES: ASCENSO DEL SUBMARINO Y FUERZAS
            </span>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-500/25">
            Pregunta 5 Saber 11
          </span>
        </div>

        {/* Toggle Ballast State */}
        <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800">
          <span className="text-xs font-mono font-bold text-slate-300">
            Estado de los tanques de lastre:
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setL34Pumping(false)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                !l34Pumping
                  ? 'bg-slate-700 text-white border border-slate-500'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
              }`}
            >
              Tanques con Agua (W = E, Reposo)
            </button>
            <button
              type="button"
              onClick={() => setL34Pumping(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                l34Pumping
                  ? 'bg-cyan-600 text-white border border-cyan-400 shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
              }`}
            >
              Bombeando Agua al Exterior (Asciende)
            </button>
          </div>
        </div>

        {/* Free Body Diagram SVG */}
        <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
          <svg className="w-full max-w-[480px] h-64 bg-slate-950 rounded-xl border border-slate-800" viewBox="0 0 450 240">
            {/* Water Background */}
            <rect x="20" y="20" width="410" height="200" rx="8" fill="#082f49" fillOpacity="0.4" stroke="#0284c7" strokeWidth="1" />
            <text x="35" y="40" fill="#38bdf8" fontSize="9" fontFamily="monospace">Agua del mar (densidad ρ)</text>
            <text x="35" y="55" fill="#64748b" fontSize="8" fontFamily="monospace">Profundidad h</text>

            {/* Submarine Hull */}
            <g transform="translate(225, 120)">
              {/* Elliptical Body */}
              <ellipse cx="0" cy="0" rx="85" ry="32" fill="#1e293b" stroke="#64748b" strokeWidth="2.5" />
              {/* Tower / Conning Tower */}
              <rect x="-15" y="-50" width="30" height="22" rx="3" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
              <line x1="0" y1="-50" x2="0" y2="-62" stroke="#64748b" strokeWidth="2" />
              {/* Propeller */}
              <rect x="-92" y="-12" width="7" height="24" rx="2" fill="#475569" />

              {/* Water in ballast tanks */}
              <rect x="-45" y="8" width="90" height="15" rx="3" fill={l34Pumping ? "#334155" : "#0284c7"} stroke="#38bdf8" strokeWidth="1" />
              <text x="0" y="19" fill="#ffffff" fontSize="7.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                {l34Pumping ? "TANQUES VACÍOS (AGUA EXPULSADA)" : "TANQUES LLENOS DE AGUA"}
              </text>

              {/* Water pumping spray if pumping */}
              {l34Pumping && (
                <g stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3,2">
                  <line x1="40" y1="15" x2="70" y2="28" />
                  <line x1="45" y1="18" x2="75" y2="22" />
                  <text x="95" y="32" fill="#38bdf8" fontSize="8" fontWeight="bold" fontFamily="monospace">
                    Agua expulsada
                  </text>
                </g>
              )}

              {/* VECTORS */}
              {/* 1. Empuje E (Upward) - CONSTANT length! */}
              <line x1="0" y1="-32" x2="0" y2="-95" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
              <polygon points="0,-95 -5,-83 5,-83" fill="#38bdf8" />
              <text x="12" y="-85" fill="#38bdf8" fontSize="11" fontWeight="black" fontFamily="monospace">
                E (Empuje Constante)
              </text>

              {/* 2. Peso W (Downward) */}
              {l34Pumping ? (
                // Reduced weight W < E
                <g>
                  <line x1="0" y1="32" x2="0" y2="65" stroke="#f87171" strokeWidth="3" strokeLinecap="round" />
                  <polygon points="0,65 -4,55 4,55" fill="#f87171" />
                  <text x="10" y="60" fill="#f87171" fontSize="10" fontWeight="bold" fontFamily="monospace">
                    W (Peso Menor)
                  </text>

                  {/* Net Force Vector (Upward) */}
                  <line x1="-55" y1="10" x2="-55" y2="-45" stroke="#34d399" strokeWidth="4" strokeLinecap="round" />
                  <polygon points="-55,-45 -60,-35 -50,-35" fill="#34d399" />
                  <text x="-65" y="-20" fill="#34d399" fontSize="10" fontWeight="black" fontFamily="monospace" textAnchor="end">
                    F_neta ↑ (Asciende)
                  </text>
                </g>
              ) : (
                // Balanced weight W = E
                <g>
                  <line x1="0" y1="32" x2="0" y2="95" stroke="#f87171" strokeWidth="4" strokeLinecap="round" />
                  <polygon points="0,95 -5,83 5,83" fill="#f87171" />
                  <text x="12" y="85" fill="#f87171" fontSize="11" fontWeight="black" fontFamily="monospace">
                    W (Peso Inicial = E)
                  </text>
                  <text x="-65" y="0" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="end">
                    F_neta = 0 (Reposo)
                  </text>
                </g>
              )}
            </g>
          </svg>
        </div>

        {/* 3 Students Statements Analysis */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <div className="p-3 bg-slate-900 rounded-xl border border-rose-900/40">
            <div className="flex items-center gap-1.5 text-rose-400 font-bold font-mono">
              <XCircle className="w-4 h-4" />
              <span>Estudiante 1 (Falso)</span>
            </div>
            <p className="text-slate-400 mt-1 text-[11px]">
              "El submarino asciende porque el empuje aumenta." <strong className="text-rose-300">¡Falso!</strong> El volumen sumergido no cambia, por lo que E es constante.
            </p>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-rose-900/40">
            <div className="flex items-center gap-1.5 text-rose-400 font-bold font-mono">
              <XCircle className="w-4 h-4" />
              <span>Estudiante 2 (Falso)</span>
            </div>
            <p className="text-slate-400 mt-1 text-[11px]">
              "El empuje aumenta y el peso disminuye." <strong className="text-rose-300">¡Falso!</strong> El peso sí disminuye, pero el empuje permanece invariable.
            </p>
          </div>

          <div className="p-3 bg-emerald-950/40 rounded-xl border-2 border-emerald-500/50">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold font-mono">
              <CheckCircle2 className="w-4 h-4" />
              <span>Estudiante 3 (¡Correcto! ★)</span>
            </div>
            <p className="text-emerald-200 mt-1 text-[11px]">
              "La fuerza neta está orientada hacia arriba." <strong className="text-emerald-400">¡Verdadero!</strong> Al bajar W, F_neta = E - W &gt; 0 hacia arriba.
            </p>
          </div>
        </div>

        {/* Conclusion Box */}
        <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5 text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono">
            <CheckCircle2 className="w-4 h-4" />
            <span>Opción Correcta en la Prueba Saber 11: C (sólo el estudiante 3)</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            El empuje depende únicamente del volumen sumergido y la densidad del agua (E = ρ · g · V_sumergido). Como el submarino ya está totalmente sumergido, su volumen exterior no cambia al expulsar agua. Lo único que cambia es que <strong>pierde masa, reduciendo su peso</strong>, haciendo que la fuerza neta resultante apunte hacia arriba. Por lo tanto, <strong>sólo el estudiante 3</strong> hace una afirmación correcta.
          </p>
        </div>
      </div>
    );
  }

  return null;
}
