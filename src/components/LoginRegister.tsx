import React, { useState, useEffect } from 'react';
import { User, isMasterUser } from '../types';
import { Shield, UserCheck, Rocket, AlertTriangle, Sparkles, Star } from 'lucide-react';
import { TransparentImage } from './TransparentImage';
import { NovaAvatar } from './ModuleMap';

interface LoginRegisterProps {
  onLoginSuccess: (user: User) => void;
}

export default function LoginRegister({ onLoginSuccess }: LoginRegisterProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Pre-seed default account and master account on first load
  useEffect(() => {
    const existing = localStorage.getItem('extrovers_users');
    const users = existing ? JSON.parse(existing) : {};

    if (!users["extrover"]) {
      users["extrover"] = {
        password: "123",
        data: {
          username: "extrover",
          coins: 10,
          completedLevels: [],
          moduleUnlocks: [1],
          predictions: {},
          submittedAnswers: {},
          score: 0
        }
      };
    }

    if (!users["jojabravo@gmail.com"]) {
      users["jojabravo@gmail.com"] = {
        password: "",
        data: {
          username: "JOJABRAVO@GMAIL.COM",
          coins: 999,
          completedLevels: [],
          moduleUnlocks: [1, 2, 3, 4, 5], // All modules unlocked directly
          predictions: {},
          submittedAnswers: {},
          score: 100
        }
      };
    }

    if (!users["bryanconrado02@gmail.com"]) {
      users["bryanconrado02@gmail.com"] = {
        password: "",
        data: {
          username: "bryanconrado02@gmail.com",
          coins: 999,
          completedLevels: [],
          moduleUnlocks: [1, 2, 3, 4, 5], // All modules unlocked directly
          predictions: {},
          submittedAnswers: {},
          score: 100
        }
      };
    }

    localStorage.setItem('extrovers_users', JSON.stringify(users));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!username.trim()) {
      setErrorMessage('Por favor escribe tu apodo o correo de explorador.');
      return;
    }

    const usersStr = localStorage.getItem('extrovers_users');
    const users = usersStr ? JSON.parse(usersStr) : {};

    const cleanUsername = username.trim().toLowerCase();
    const isMaster = isMasterUser(cleanUsername);

    if (users[cleanUsername]) {
      if (isMaster) {
        setSuccessMessage('⭐ ¡Bienvenido Anfitrión / Maestro! Acceso total a todos los mundos activado.');
      } else {
        setSuccessMessage('¡Acceso autorizado! Iniciando hiper-impulsores...');
      }
      setTimeout(() => {
        onLoginSuccess(users[cleanUsername].data);
      }, 1000);
    } else {
      // Automatic quick registration if they log in with a new name!
      if (isMaster) {
        setSuccessMessage('⭐ ¡Bienvenido Anfitrión / Maestro! Acceso total a todos los mundos activado.');
      } else {
        setSuccessMessage('✨ ¡Un nuevo explorador estelar se asoma! Creando archivo estelar... ✨');
      }
      
      const newUser: User = {
        username: username.trim(),
        coins: isMaster ? 999 : 50,
        completedLevels: [],
        moduleUnlocks: isMaster ? [1, 2, 3, 4, 5] : [1],
        predictions: {},
        submittedAnswers: {},
        score: isMaster ? 100 : 0
      };

      users[cleanUsername] = {
        password: "",
        data: newUser
      };

      localStorage.setItem('extrovers_users', JSON.stringify(users));
      
      setTimeout(() => {
        onLoginSuccess(newUser);
      }, 1200);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!username.trim()) {
      setErrorMessage('Define tu nombre o correo de explorador.');
      return;
    }

    if (username.length < 3) {
      setErrorMessage('El apodo o correo debe tener mínimo 3 caracteres.');
      return;
    }

    const usersStr = localStorage.getItem('extrovers_users');
    const users = usersStr ? JSON.parse(usersStr) : {};

    const cleanUsername = username.trim().toLowerCase();
    const isMaster = isMasterUser(cleanUsername);

    if (users[cleanUsername]) {
      setErrorMessage('Este explorador ya está registrado en la nave. ¡Puedes iniciar sesión directamente!');
      return;
    }

    const newUser: User = {
      username: username.trim(),
      coins: isMaster ? 999 : 50,
      completedLevels: [],
      moduleUnlocks: isMaster ? [1, 2, 3, 4, 5] : [1],
      predictions: {},
      submittedAnswers: {},
      score: isMaster ? 100 : 0
    };

    users[cleanUsername] = {
      password: "",
      data: newUser
    };

    localStorage.setItem('extrovers_users', JSON.stringify(users));
    setSuccessMessage(isMaster 
      ? '⭐ ¡Firma Maestra Grabada! Acceso ilimitado a todos los módulos y niveles.' 
      : '🎉 ¡Firma grabada! Tripulación autorizada. Abordando...'
    );
    
    setTimeout(() => {
      onLoginSuccess(newUser);
    }, 1000);
  };

  return (
    <div className="max-w-md w-full mx-auto my-12 bg-slate-900 border-2 border-slate-850 rounded-3xl p-8 shadow-2xl relative overflow-hidden ring-4 ring-cyan-500/15">
      {/* Crazy and Extroverted background decorations */}
      <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-cyan-500/10 border border-dashed border-cyan-500/30 animate-[spin_20s_linear_infinite] pointer-events-none text-[8px] font-mono text-cyan-400 p-2 flex items-center justify-center">
        E = mc²? Or mc³?! 🤯
      </div>
      <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-purple-500/10 border border-dotted border-purple-500/30 animate-[spin_15s_linear_infinite_reverse] pointer-events-none text-[8px] font-mono text-purple-400 p-3 flex items-center justify-center">
        v = d/t... 🌀
      </div>
      {/* Playful visual decoration representing extroverted design */}
      <div className="absolute right-4 bottom-24 text-xl opacity-35 select-none pointer-events-none animate-bounce">
        ✨🚀🧪
      </div>

      {/* Nova Welcoming Section (Transparent PNG processing) */}
      <div className="relative flex flex-col items-center mb-6 pt-2 select-none">
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* Futuristic hologram circle behind Nova */}
          <div className="absolute inset-0 bg-cyan-400/10 border border-cyan-400/25 rounded-full animate-pulse shadow-[0_0_25px_rgba(34,211,238,0.25)]"></div>
          <div className="absolute inset-2 border border-dashed border-cyan-400/20 rounded-full animate-[spin_40s_linear_infinite]"></div>
          
          <NovaAvatar animation="celebrate" size="xl" />
        </div>
        
        {/* Speech bubble welcoming the user */}
        <div className="mt-4 bg-slate-950/90 border border-slate-800 rounded-2xl px-5 py-3 max-w-xs relative text-left shadow-lg ring-1 ring-cyan-500/10">
          {/* Speech bubble pointer arrow */}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-950 border-t border-l border-slate-800 rotate-45"></div>
          <p className="text-[11px] font-semibold text-slate-200 leading-relaxed text-center">
            "¡Hola, explorador! Soy <span className="text-cyan-400 font-bold">Nova</span>. ¡Te doy la bienvenida al universo de Los Extrovers! Ingresa tu firma abajo para iniciar nuestro viaje científico."
          </p>
        </div>
      </div>

      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cyan-400/10 border-2 border-cyan-500/40 mb-4 relative hover:scale-110 transition-transform cursor-pointer shadow-lg" title="¡Cuidado! El reactor está inestable">
          <Rocket className="w-10 h-10 text-cyan-400 animate-[bounce_1.5s_infinite]" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[9px] text-white font-bold items-center justify-center">☣️</span>
          </span>
        </div>
        <h2 className="text-xl font-black text-white tracking-tight flex items-center justify-center gap-2">
          🎉 CABINA EXTREMA LOS EXTROVERS
        </h2>
        <p className="text-xs text-cyan-400 font-mono mt-1 uppercase tracking-wider font-extrabold flex items-center justify-center gap-1">
          <span>✨</span> COMPAÑEROS DE AVENTURAS CIENTÍFICAS <span>✨</span>
        </p>
        <div className="mt-4 text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 py-1.5 px-4 rounded-full inline-block animate-[bounce_2s_infinite]">
          ⚡ ¡Súbete al Desafío del Profesor Jorge Jaramillo! ⚡
        </div>
      </div>

      <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-6">
        <div>
          <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 font-bold">
            Identificación de Explorador
          </label>
          <div className="relative">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ej: Brayan, Michell, Alisson..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 pl-11 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/15 font-mono font-bold"
            />
            <Shield className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-500" />
          </div>
        </div>

        {errorMessage && (
          <div className="flex items-start gap-2.5 p-3.5 bg-rose-950/50 border border-rose-900 rounded-xl text-xs text-rose-300">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="flex items-start gap-2.5 p-3.5 bg-emerald-950/50 border border-emerald-900 rounded-xl text-xs text-emerald-300">
            <Sparkles className="w-4 h-4 shrink-0 mt-0.5 animate-spin text-emerald-400" />
            <span className="font-bold">{successMessage}</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-mono font-black text-xs rounded-xl transition-all cursor-pointer shadow-lg active:scale-98 flex items-center justify-center gap-2 uppercase tracking-wider"
        >
          {isRegistering ? 'REGISTRAR TRIPULACIÓN' : 'INICIAR SESIÓN'}
          <UserCheck className="w-4 h-4" />
        </button>
      </form>

      {/* Switcher */}
      <div className="mt-6 text-center">
        <button
          onClick={() => {
            setIsRegistering(!isRegistering);
            setErrorMessage('');
            setSuccessMessage('');
          }}
          className="text-xs text-slate-400 hover:text-cyan-400 underline decoration-cyan-400/30 underline-offset-4 cursor-pointer transition-all font-medium"
        >
          {isRegistering 
            ? '¿Ya tienes un apodo registrado? Ingresa aquí' 
            : '¿Apodo nuevo? Regístrate para iniciar un perfil nuevo'}
        </button>
      </div>

      {/* Default account notice */}
      <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
        {/* Special Master Account shortcuts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => {
              setUsername('bryanconrado02@gmail.com');
              setIsRegistering(false);
            }}
            className="w-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-xl p-3 text-left transition-all cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-300 shrink-0">
                <Star className="w-4 h-4 text-cyan-400 fill-cyan-400/30" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[11px] font-mono font-bold text-cyan-300 block truncate">
                  bryanconrado02@gmail.com
                </span>
                <span className="text-[10px] text-slate-400 block truncate">
                  Pase Anfitrión • Libre acceso a mundos
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded font-bold group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors shrink-0 ml-1">
              Entrar
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setUsername('JOJABRAVO@GMAIL.COM');
              setIsRegistering(false);
            }}
            className="w-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl p-3 text-left transition-all cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-300 shrink-0">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400/30" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[11px] font-mono font-bold text-amber-300 block truncate">
                  JOJABRAVO@GMAIL.COM
                </span>
                <span className="text-[10px] text-slate-400 block truncate">
                  Pase Maestro • Libre acceso a mundos
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-2 py-1 rounded font-bold group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shrink-0 ml-1">
              Entrar
            </span>
          </button>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
          <span className="text-[10px] font-mono text-cyan-400 block uppercase tracking-wider mb-1 font-extrabold">
            🚀 ACCESO RÁPIDO SIN CONTRASEÑAS
          </span>
          <p className="text-[11px] text-slate-400 leading-normal font-sans font-medium">
            ¡Nos encanta la velocidad! Escribe tu apodo o correo y presiona <strong>INICIAR SESIÓN</strong>. Si ingresas por primera vez, crearemos tu bitácora de viaje al instante.
          </p>
        </div>
      </div>
    </div>
  );
}
