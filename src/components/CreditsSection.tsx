import React from 'react';
import { UserCheck, Award, GraduationCap, Users, Heart, Sun, Star } from 'lucide-react';

export default function CreditsSection() {
  return (
    <div id="credits-panel" className="bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-6 sm:p-8 mt-12 relative overflow-hidden shadow-xl backdrop-blur-md">
      {/* Playful decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full pointer-events-none"></div>
      <div className="absolute -bottom-10 -right-5 text-6xl text-cyan-500/5 pointer-events-none select-none font-extrabold animate-[spin_50s_linear_infinite]">
        ⚛️ 🛸 🌟 ⏳
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center animate-bounce">
            <Users className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="font-mono text-sm uppercase tracking-widest text-white font-bold">
              ESTACIÓN DE MANDO Y RECONOCIMIENTO
            </h3>
            <p className="text-[10px] text-slate-400 font-sans font-semibold uppercase">
              ¡Bienvenidos a la base de operaciones científicas!
            </p>
          </div>
        </div>
        
        {/* Extrovert Power Badge */}
        <div className="bg-amber-500/10 border border-amber-500/35 text-amber-400 text-[10px] font-mono font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5 self-start sm:self-center">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>PODER EXTROVERTIDO ACTIVO ✨</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 text-left">
        {/* Nombre de la aventura */}
        <div id="credit-adventure" className="bg-slate-950 p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/30 transition-colors group">
          <span className="font-mono text-[9px] text-cyan-400 font-bold uppercase block mb-1 tracking-wider">Aventura Estelar</span>
          <h4 className="text-lg font-bold text-white flex items-center gap-2 group-hover:scale-[1.02] transition-transform">
            <Award className="w-5 h-5 text-amber-400 shrink-0 fill-amber-400/20" />
            Los Extrovers
          </h4>
          <p className="text-xs text-slate-300 mt-3 leading-relaxed font-sans font-semibold">
            ¡Una expedición súper alegre y extrovertida para descifrar los secretos de la Cinemática! Diseñada para que domines las pruebas Saber 11 sin rendirte jamás.
          </p>
        </div>

        {/* Integrantes del grupo */}
        <div id="credit-crew" className="bg-slate-950 p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/30 transition-colors">
          <span className="font-mono text-[9px] text-cyan-400 font-bold uppercase block mb-1 tracking-wider">Tripulantes Aventureros</span>
          <ul className="space-y-3 mt-3">
            {[
              { name: "Brayan Conrado", role: "Especialista en Sistemas Combinados", emoji: "👨‍🚀", color: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20" },
              { name: "Michell Barrientos", role: "Analista de Telemetría v-t", emoji: "👩‍🚀", color: "bg-amber-500/15 text-amber-400 border-amber-500/20" },
              { name: "Alisson Quintero", role: "Navegadora de Orbitación Parabólica", emoji: "💻", color: "bg-purple-500/15 text-purple-400 border-purple-500/20" }
            ].map((member, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                <div className={`w-8 h-8 rounded-lg ${member.color} border flex items-center justify-center text-sm font-bold shrink-0 shadow-sm`}>
                  {member.emoji}
                </div>
                <div className="font-sans">
                  <div className="font-bold text-white">{member.name}</div>
                  <span className="text-[10px] text-slate-400 font-mono block font-bold leading-none mt-0.5">{member.role}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Docente */}
        <div id="credit-teacher" className="bg-slate-950 p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/30 transition-colors md:col-span-2 lg:col-span-1">
          <span className="font-mono text-[9px] text-cyan-400 font-bold uppercase block mb-1 tracking-wider">Director Científico (Docente)</span>
          <div className="flex gap-3 mt-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm leading-tight font-serif italic">
                Prof. Jorge Armando Jaramillo Bravo
              </h5>
              <p className="text-[11px] text-slate-300 mt-1.5 leading-relaxed font-sans font-semibold">
                Licenciado en Matemáticas y Física de la UdeA. Magíster en Ciencias Exactas y PhD (c) en Educación. ¡Líder intelectual de nuestra diversión cuántica!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer del ICFES y el Colegio */}
      <div className="mt-8 pt-4 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] font-mono text-slate-400 font-semibold">
        <div className="flex items-center gap-1.5">
          <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
          <span>PROYECTO ACADÉMICO - ENTRENAMIENTO PRUEBAS SABER 11 (ICFES)</span>
        </div>
        <div>UNIVERSIDAD DE ANTIOQUIA &copy; 2026</div>
      </div>
    </div>
  );
}
