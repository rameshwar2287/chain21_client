import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Activity, Building2 } from "lucide-react";

// 1. YOUR DATA + EXTRA GLOBAL TOKENS FOR A SEAMLESS LOOP
const tickerData = [
  { symbol: "PGXIO", name: "Pune GrowthX", apy: "14.5%", badge: "NEW" }, // Replaced [NT] with a 'NEW' badge and mock APY
  { symbol: "IIO", name: "India Investment Opp", apy: "12.5%" },
  { symbol: "BRHIO", name: "Bangalore Rental Housing", apy: "11.4%" },
  { symbol: "GHHIO", name: "Goa Holiday Homes", apy: "13.2%", badge: "HOT" },
  { symbol: "MAHIO", name: "Mumbai Affordable Housing", apy: "11.8%" },
  { symbol: "DXB21", name: "Dubai Luxury Villas", apy: "15.2%", badge: "SOLD OUT" },
  { symbol: "SGPH", name: "Singapore Penthouse", apy: "10.5%" },
  { symbol: "LDNR", name: "London Residential Core", apy: "9.8%" },
  { symbol: "NYCC", name: "New Delhi Commercial", apy: "11.2%" },
];

const PropertyTicker = () => {
  return (
    <div className="relative w-full  py-10 bg-[#050A15] border-y border-slate-800/60 py-4 overflow-hidden flex items-center">
      
      {/* Left/Right Gradient Fades for a seamless entering/exiting effect */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050A15] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050A15] to-transparent z-10 pointer-events-none" />

      {/* Live Indicator Pulse (Left Side Fixed) */}
      <div className="hidden md:flex absolute left-6 z-20 items-center gap-2 px-3 py-1.5 bg-blue-900/30 border border-blue-500/30 rounded-full backdrop-blur-md">
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </div>
        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Live Markets</span>
      </div>

      {/* INFINITE SCROLLING CONTAINER */}
      <motion.div
        className="flex gap-6 w-max pl-4 md:pl-48"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          duration: 40, // Adjust speed here (lower is faster)
          ease: "linear", 
          repeat: Infinity 
        }}
      >
        {/* We map the array TWICE side-by-side to create the infinite loop effect */}
        {[...tickerData, ...tickerData].map((token, index) => (
          <div 
            key={index} 
            className="group flex flex-col justify-center min-w-[260px] md:min-w-[300px] bg-slate-900/50 border border-slate-800  rounded-xl p-4 transition-all duration-300 cursor-pointer"
          >
            {/* Top Row: Symbol & APY */}
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-slate-800 group-hover:bg-amber-500/10 transition-colors">
                  <Building2 size={14} className="text-slate-400 group-hover:text-amber-500 transition-colors" />
                </div>
                <span className="text-white font-bold tracking-wide">{token.symbol}</span>
                
                {/* Optional Badge (NEW, HOT, etc) */}
                {token.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider ${
                    token.badge === 'SOLD OUT' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {token.badge}
                  </span>
                )}
              </div>

              {/* Yield/APY Display */}
              <div className="flex items-center gap-1">
                <TrendingUp size={14} className="text-emerald-400" />
                <span className="text-emerald-400 font-bold">{token.apy}</span>
                <span className="text-[10px] text-slate-500 uppercase ml-0.5">APY</span>
              </div>
            </div>

            {/* Bottom Row: Full Name & Mini Chart Icon */}
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400 font-light truncate max-w-[180px]">
                {token.name}
              </span>
              <Activity size={14} className="text-blue-500/50 group-hover:text-blue-400 transition-colors" />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default PropertyTicker;