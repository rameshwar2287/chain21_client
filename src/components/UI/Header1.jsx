import React from "react";
import appLogo from "../../assets/chain21_2.jpeg";
import { useNavigate } from "react-router-dom";
import { LandingRouters } from "../../constants/routes";
import { UserPlus, LogIn, Sun, Moon, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header1 = ({ isDark, setIsDark }) => {
  const navigate = useNavigate();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-500 ${
      isDark ? "bg-black/80 selection:bg-[#bc13fe] selection:text-white" : "bg-white selection:bg-blue-600 selection:text-white"
    } backdrop-blur-xl border-b ${isDark ? "border-white/5" : "border-slate-100"}`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          
          {/* LEFT SIDE: BRANDING */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 md:gap-4 cursor-pointer group"
            onClick={() => navigate(LandingRouters.DASHBOARD)}
          >
            <div className="relative">
              {/* Animated Gradient Border for Logo - matching your Hero style */}
              <div className="relative w-18 h-18 md:w-18 md:h-18 flex items-center justify-center rounded-full overflow-hidden ">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-100%] z-0"
                />
                <div className={`relative z-10 w-full h-full rounded-full flex items-center justify-center `}>
                  <img
                    src={appLogo}
                    className="h-16 w-16 md:h-16 md:w-16 object-contain"
                    alt="CHAIN21 Logo"
                  />
                </div>
              </div>
            </div>
            <div className="hidden md:flex flex-col">
              <span className={`text-xl md:text-2xl font-black tracking-tight leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>
                CHAIN21
              </span>
              <span className="text-[8px] md:text-[10px] font-bold tracking-[0.3em] text-blue-600 uppercase">
                Crypto Real Estate
              </span>
            </div>
          </motion.div>

          {/* RIGHT SIDE: ACTIONS */}
          <div className="flex items-center gap-3 md:gap-6">
            
            {/* DARK MODE TOGGLE - Using your Badge Style */}
            {/* <button 
              onClick={() => setIsDark(!isDark)}
              className="relative p-[1px] rounded-full overflow-hidden group transition-transform active:scale-90"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-100%] z-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "conic-gradient(from 0deg, #3b82f6, #bc13fe, #3b82f6)" }}
              />
              <div className={`relative z-10 p-2 rounded-full transition-colors ${
                isDark ? "bg-white/5 text-blue-400" : "bg-slate-50 text-slate-500"
              }`}>
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </div>
            </button> */}

            {/* LOGIN / JOIN BUTTONS */}
            <div className="flex items-center gap-2 md:gap-3">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${
                  isDark 
                  ? "border border-white/10 text-white hover:bg-white/5" 
                  : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
                onClick={() => navigate(LandingRouters.USER_LOGIN)}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Login</span>
              </motion.button>

              <motion.button
                whileHover={{ 
                  y: -2,
                  boxShadow: isDark ? "0 10px 30px rgba(188, 19, 254, 0.3)" : "0 10px 30px rgba(59, 130, 246, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest transition-all"
                onClick={() => navigate(LandingRouters.USER_REGISTER)}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Get Started</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Accent Line */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5 }}
        className={`h-[1px] w-full bg-gradient-to-r from-transparent ${isDark ? 'via-[#bc13fe]/30' : 'via-blue-600/20'} to-transparent`}
      />
    </nav>
  );
};

export default Header1;