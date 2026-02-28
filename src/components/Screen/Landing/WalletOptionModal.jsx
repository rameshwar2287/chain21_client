import { CgClose } from "react-icons/cg";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Cpu, ChevronRight, Lock } from "lucide-react";
import safePng from "../../../assets/safepal.png";
import trustPng from "../../../assets/trustwallet.jpg";
import metamaskIcon from "../../../assets/metamask.png";
import tpIcon from "../../../assets/tokenpocket.png";

const WalletOptionModal = ({ show, hide, connectWallet }) => {
  const walletOptions = [
    { name: "MetaMask", icon: metamaskIcon, color: "from-amber-400 to-orange-500" },
    { name: "SafePal", icon: safePng, color: "from-blue-500 to-cyan-400" },
    { name: "Trust Wallet", icon: trustPng, color: "from-blue-600 to-blue-400" },
    { name: "TokenPocket", icon: tpIcon, color: "from-blue-500 to-amber-500" },
  ];

  const selectHandler = (walletName) => {
    connectWallet(walletName.toLowerCase().replace(/\s/g, ""));
    hide();
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-6 overflow-hidden">
          {/* 1. Backdrop with softer slate tint & Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={hide}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* 2. Modal Content Container - Light Dark (Slate) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-md bg-slate-900 md:rounded-[2rem] h-full flex flex-col items-center justify-center md:h-auto shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-slate-700/50 overflow-hidden"
          >
            {/* Ambient Background Glow inside Modal */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={hide}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-100 hover:bg-slate-700 transition-all z-50 shadow-sm active:scale-95"
            >
              <CgClose size={18} />
            </button>

            <div className="p-8 w-full flex flex-col items-center justify-center space-y-8 relative z-10">
              
              {/* --- HEADER SECTION --- */}
              <div className="w-full flex flex-col items-center text-center space-y-4">
                <div className="w-full space-y-2 mt-4 md:mt-0">
                  <h2 className="text-3xl font-black tracking-tight text-slate-100 uppercase">
                    Select <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">Wallet</span>
                  </h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest max-w-[250px] mx-auto leading-relaxed">
                    Connect securely to the Chain21 network
                  </p>
                </div>
              </div>

              {/* --- WALLET OPTIONS GRID --- */}
              <div className="w-full grid grid-cols-1 gap-3">
                {walletOptions.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => selectHandler(option.name)}
                    className="group relative flex items-center justify-between p-4 rounded-2xl bg-slate-800 border border-slate-700 hover:bg-slate-700/80 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:border-slate-600 transition-all duration-300 overflow-hidden"
                  >
                    {/* Subtle hover accent line */}
                    <div className={`absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r ${option.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />

                    <div className="flex items-center gap-5 relative z-10">
                      <div className="w-12 h-12 rounded-[1rem] bg-slate-900 shadow-sm border border-slate-700 flex items-center justify-center p-2.5 group-hover:rotate-6 transition-all duration-500">
                        <img
                          src={option.icon}
                          alt={option.name}
                          className="w-full h-full object-contain filter group-hover:brightness-110 rounded-md"
                        />
                      </div>
                      <div className="text-left">
                        <span className="block text-base font-bold text-slate-100 leading-none">
                          {option.name}
                        </span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 block">
                          Verified Protocol
                        </span>
                      </div>
                    </div>

                    <div className="relative z-10 w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-amber-400 group-hover:border-amber-500/30 transition-all shadow-sm">
                      <ChevronRight size={16} />
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* --- FOOTER INFO --- */}
              <div className="pt-6 border-t border-slate-800 w-full">
                <div className="flex flex-col items-center gap-4">
                   <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <Lock size={14} className="text-blue-400" />
                      <span className="text-[9px] font-bold text-blue-300 uppercase tracking-widest leading-none pt-0.5">
                        Secure P2P Node Active
                      </span>
                   </div>
                   
                   <div className="flex items-center gap-2 opacity-60 grayscale pointer-events-none">
                      <Cpu size={12} className="text-slate-400" />
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.4em]">Ecosystem Access V2.0.4</span>
                   </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WalletOptionModal;