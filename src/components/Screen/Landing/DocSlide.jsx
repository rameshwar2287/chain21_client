import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Cpu, ArrowUpRight } from "lucide-react";

// Import your individual wallet images here
import TrustImg from "../../../assets/trustwallet.jpg";
import MetamaskImg from "../../../assets/metamask.png";
import TokenPocketImg from "../../../assets/tokenpocket.png";
import SafepalImg from "../../../assets/safepal.png";

const DocSlide = () => {
  const wallets = [
    { 
      name: "TRUST WALLET", 
      image: TrustImg, 
      color: "from-blue-500 to-blue-600", 
      hoverShadow: "hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)]"
    },
    { 
      name: "METAMASK", 
      image: MetamaskImg, 
      color: "from-amber-400 to-amber-500", 
      hoverShadow: "hover:shadow-[0_20px_50px_rgba(251,191,36,0.15)]"
    },
    { 
      name: "TOKEN POCKET", 
      image: TokenPocketImg, 
      color: "from-blue-500 to-blue-600", 
      hoverShadow: "hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)]"
    },
    { 
      name: "SAFEPAL", 
      image: SafepalImg, 
      color: "from-amber-400 to-amber-500", 
      hoverShadow: "hover:shadow-[0_20px_50px_rgba(251,191,36,0.15)]"
    }
  ];

  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 } 
    }
  };

  return (
    <section className="py-20 md:py-24 bg-black text-white font-sans selection:bg-amber-500 selection:text-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col items-center gap-6 md:gap-8 text-center">
          <div className="flex justify-center">
            <div className="relative inline-flex items-center justify-center rounded-full overflow-hidden p-[2px]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-100%] z-0"
                style={{ background: "conic-gradient(from 0deg, #3b82f6, #f59e0b, #3b82f6)" }}
              />
              <div className="relative z-10 px-4 md:px-6 py-1.5 md:py-2 rounded-full bg-[#111111] flex items-center gap-2">
                <Cpu size={14} className="text-amber-400" />
                <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">Web3 Connectivity</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h2 className="text-4xl md:text-7xl font-black tracking-tight uppercase leading-tight text-white">
              Supported <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-400">Wallets</span>
            </h2>
            <div className="w-20 md:w-24 h-1.5 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto rounded-full" />
            <p className="text-base md:text-xl text-gray-400 font-light leading-relaxed pt-2 px-4">
              Chain21 supports industry-leading decentralized protocols to ensure absolute security, flexibility, and investor-controlled access to your digital real estate assets.
            </p>
          </div>
        </div>

        {/* --- WALLET GRID (Responsive Optimized) --- */}
        <motion.div 
          variants={containerVars}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {wallets.map((wallet, index) => (
            <motion.div
              key={index}
              variants={itemVars}
              whileHover={{ y: -10 }}
              className={`group relative flex flex-col items-center justify-center p-6 sm:p-8 md:p-10 border border-gray-800 bg-[#111111] hover:bg-[#0a0a0a] rounded-[2.5rem] md:rounded-[3rem] transition-all duration-500 overflow-hidden ${wallet.hoverShadow}`}
            >
              {/* Hover Background Layer */}
              <div className={`absolute inset-0 bg-gradient-to-br ${wallet.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

              {/* Status Badge */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                 <ShieldCheck className={`w-5 h-5 md:w-6 md:h-6 ${index % 2 === 0 ? 'text-blue-500' : 'text-amber-400'}`} />
              </div>

              {/* Wallet Image Container */}
              <motion.div 
                whileHover={{ rotate: -5 }}
                className="mb-8 w-full max-w-[140px] md:max-w-[180px] aspect-square rounded-[1.5rem] md:rounded-[2rem] bg-black border border-gray-800 shadow-xl transition-all duration-500 relative z-10 overflow-hidden flex items-center justify-center p-2"
              >
                <img 
                  src={wallet.image} 
                  alt={wallet.name} 
                  className="w-full h-full object-contain filter group-hover:brightness-110 transition-all rounded-[1rem] md:rounded-[1.5rem]" 
                />
              </motion.div>
              
              <h3 className="text-xs md:text-sm font-black tracking-[0.2em] uppercase text-gray-400 group-hover:text-white transition-colors duration-500 relative z-10 text-center">
                {wallet.name} 
              </h3>

              <div className={`mt-6 flex items-center gap-2 font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] opacity-50 group-hover:opacity-100 transition-all duration-500 relative z-10 ${index % 2 === 0 ? 'text-blue-500' : 'text-amber-400'}`}>
                Secure Link <ArrowUpRight size={14} />
              </div>

              {/* Animated Bottom Border */}
              <div className={`absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r ${wallet.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default DocSlide;