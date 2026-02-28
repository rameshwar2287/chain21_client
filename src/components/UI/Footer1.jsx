import React from "react";
import { motion } from "framer-motion";
import appLogo from "../../assets/chain21_2.jpeg"; // Using your Doc Logo
import { FaTelegramPlane, FaYoutube, FaFacebook, FaTwitter } from "react-icons/fa";
import { ExternalLink, ShieldCheck, Globe, Cpu, ChevronRight, Mail } from "lucide-react";

const Footer1 = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white pt-18 overflow-hidden selection:bg-[#bc13fe] selection:text-white border-t border-slate-100">
      
      {/* 1. BACKGROUND DECORATION - Unified with Header/Hero */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_50%_100%,_rgba(59,130,246,0.05),_transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* --- TOP SECTION: BRAND & NAVIGATION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-20">
          
          {/* Column 1: Brand Identity */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="relative w-16 h-16 flex items-center justify-center rounded-full overflow-hidden p-[2px]">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-100%] z-0"
                />
                <div className="relative z-10 w-full h-full rounded-full bg-black flex items-center justify-center">
                  <img src={appLogo} className="h-18 w-18 object-contain" alt="Chain21 Logo" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-slate-900 leading-none">CHAIN21</span>
                <span className="text-[10px] font-bold tracking-[0.3em] text-blue-600 uppercase italic">Crypto • Real Estate</span>
              </div>
            </div>
            
            <p className="text-black text-lg  leading-relaxed max-w-sm italic">
              "Where Real Estate Meets the Future of Decentralized Ownership. Empowering investors through Web3 innovation."
            </p>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-lg shadow-slate-200">
                <ShieldCheck size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase text-black tracking-widest">Protocol Status</span>
                <span className="text-xs font-bold text-slate-900">Secure Node V2.0.4 - Active</span>
              </div>
            </div>
          </div>

          {/* Column 2: Ecosystem (Products) */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-xs font-black tracking-[0.3em] uppercase text-slate-900 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Ecosystem
            </h4>
            <ul className="space-y-4">
              {["Property Tokenization", "Real Estate Platform", "Asset Marketplace", "Yield Launchpad"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-xs font-black tracking-[0.3em] uppercase text-slate-900 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-600" /> Resources
            </h4>
            <ul className="space-y-4">
              {["Whitepaper", "Tokenomics", "Documentation", "Smart Contracts"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm font-medium text-slate-500 hover:text-purple-600 transition-colors flex items-center gap-2 group">
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter/Join */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-200 relative overflow-hidden group">
              <div className="relative z-10 space-y-4">
                <h4 className="text-xl font-bold text-black tracking-tight">Stay in the Loop</h4>
                <p className="text-xs text-black font-medium leading-relaxed">
                  Join our newsletter to get exclusive early access to property launches and Web3 asset updates.
                </p>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Enter email address..." 
                    className="w-full bg-white border text-black border-slate-200 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-blue-500 transition-all"
                  />
                  <button className="absolute right-2 top-2 p-2.5 rounded-xl bg-slate-900 text-white hover:bg-blue-600 transition-colors">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <Mail size={150} />
              </div>
            </div>
          </div>

        </div>

        {/* --- BOTTOM SECTION: LEGAL & SOCIAL --- */}
        <div className="py-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Copyright & Legal */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
            <span className="text-[11px] font-black uppercase text-slate-400 tracking-widest">
              © {currentYear} CHAIN21 GLOBAL • ALL RIGHTS RESERVED
            </span>
            <div className="flex gap-6">
              <a href="#" className="text-[10px] font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest">Privacy Policy</a>
              <a href="#" className="text-[10px] font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest">Terms of Use</a>
            </div>
          </div>

          {/* Social Links - Professional Minimalist Style */}
          <div className="flex items-center gap-3">
            {[
              { icon: FaTelegramPlane, link: "#", color: "hover:bg-blue-50 hover:text-blue-500" },
              { icon: FaYoutube, link: "#", color: "hover:bg-red-50 hover:text-red-600" },
              { icon: FaFacebook, link: "#", color: "hover:bg-blue-50 hover:text-blue-700" },
              { icon: FaTwitter, link: "#", color: "hover:bg-slate-50 hover:text-slate-900" }
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.link} 
                className={`w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 transition-all duration-300 shadow-sm ${social.color}`}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>

        </div>

        {/* System Breadcrumb Decorator */}
        <div className="pb-10 flex justify-center items-center gap-2 opacity-20 grayscale pointer-events-none">
           <Cpu size={14} />
           <span className="text-[8px] font-black uppercase tracking-[0.6em]">Distributed Real Estate Network active</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer1;