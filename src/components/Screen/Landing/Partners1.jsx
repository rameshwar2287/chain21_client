import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Eye,
  Lock,
  Layers,
  Cpu,
  Globe,
  Zap,
  ChevronRight,
  TrendingUp
} from "lucide-react";
import SecurityImage from "../../../assets/security.jpg";
import Logo from "../../../assets/chain21_2.jpeg";


const Partners1 = () => {
  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVars = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden selection:bg-[#bc13fe] selection:text-white" id="security">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-50/50 rounded-full blur-[120px]" />
      </div>

      <div className="relative container mx-auto px-6 space-y-32">

        {/* --- SECTION 1: SECURITY & TRANSPARENCY --- */}
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <div className="relative inline-flex items-center justify-center rounded-full overflow-hidden p-[2px]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-100%] z-0"
                style={{ background: "conic-gradient(from 0deg, #3b82f6, #bc13fe, #3b82f6)" }}
              />
              <div className="relative z-10 px-6 py-2 rounded-full bg-white flex items-center gap-2">
                <Lock size={14} className="text-blue-600" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500">Security Protocols</span>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl md:text-7xl font-black tracking-tight text-slate-900 leading-tight uppercase">
                Security & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-700">
                  Transparency
                </span>
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto lg:mx-0 rounded-full" />
            </div>

            <p className="text-lg md:text-xl leading-relaxed text-black">
              Security is the cornerstone of the CHAIN21 ecosystem. We utilize multi-layer encryption and on-chain verification to ensure every creative asset and transaction is immutable.
            </p>
          </motion.div>

          {/* Image with Border Rotation and Scanning */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-[500px] aspect-square rounded-[3rem] overflow-hidden p-[6px]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-50%] z-0"
                style={{ background: "conic-gradient(from 0deg, #3b82f6, #bc13fe, #3b82f6)" }}
              />
              <div className="relative z-10 w-full h-full bg-white rounded-[2.8rem] overflow-hidden group">
                {/* <img src={SecurityImage} alt="CHAIN21 Security" className="w-full h-full object-cover hover:scale-105" /> */}
                <motion.img
                  src={SecurityImage}
                  alt="CHAIN21 Security"
                  className="w-full h-full object-cover"
                  initial={{ scale: 1, filter: "brightness(0.9) grayscale(0.2)" }}
                  whileHover={{
                    scale: 1.08,
                    filter: "brightness(0.7) grayscale(0)",
                    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] }
                  }}
                />
                <motion.div
                  className="absolute left-0 right-0 h-[2px] z-20 shadow-[0_0_15px_#3b82f6]"
                  style={{ background: "linear-gradient(90deg, transparent, #3b82f6, transparent)" }}
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* --- SECTION 2: WHY CHOOSE CHAIN21 (Featuring Dual-Axis Logo Scanner) --- */}
        <div className="space-y-16">
          <div className="flex flex-col items-center text-center gap-8">
            <div className="relative inline-flex items-center justify-center rounded-full overflow-hidden p-[2px]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-100%] z-0"
                style={{ background: "conic-gradient(from 0deg, #3b82f6, #bc13fe, #3b82f6)" }}
              />
              <div className="relative z-10 px-6 py-2 rounded-full bg-white flex items-center gap-2">
                <ShieldCheck size={14} className="text-blue-600" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500">Global Standards</span>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl md:text-7xl font-black tracking-tight text-slate-900 uppercase">
                Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-700">CHAIN21 Global</span>
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-black leading-relaxed pt-2">
                Engineered for creators seeking transparency, security, and sustainable growth.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* --- LEFT SIDE: 3D ROTATING LOGO WITH DUAL SCANNER --- */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative aspect-square rounded-[4rem] bg-black border border-slate-100 flex items-center justify-center overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.15)_0%,_transparent_70%)]" />

              {/* Rotating Logo Wrapper */}
              <motion.div
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative z-10 w-2/3 h-auto"
              >
                <img src={Logo} alt="CHAIN21 Logo" className="w-full h-auto " />

                {/* 1. TOP TO BOTTOM SCANNER LINE */}
                <motion.div
                  className="absolute left-0 right-0 h-[2px] z-20 shadow-[0_0_15px_#3b82f6]"
                  style={{ background: "linear-gradient(90deg, transparent, #3b82f6, transparent)" }}
                  animate={{ top: ['-5%', '105%', '-5%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* 2. LEFT TO RIGHT SCANNER LINE */}
                <motion.div
                  className="absolute top-0 bottom-0 w-[2px] z-20 shadow-[0_0_15px_#bc13fe]"
                  style={{ background: "linear-gradient(180deg, transparent, #bc13fe, transparent)" }}
                  animate={{ left: ['-5%', '105%', '-5%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
              </motion.div>

              {/* Decorative Pulse Rings */}
              <div className="absolute w-full h-full border border-blue-100/10 rounded-full animate-ping opacity-20" />
            </motion.div>

            {/* --- RIGHT SIDE: FEATURES --- */}
            <motion.div variants={containerVars} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-4">
              {[
                { text: "Blockchain-Based Secure Ecosystem", icon: ShieldCheck, color: "text-blue-600" },
                { text: "Transparent Creator Income Models", icon: TrendingUp, color: "text-purple-600" },
                { text: "Global Cross-Border Accessibility", icon: Globe, color: "text-indigo-600" },
                { text: "Multiple Trusted Wallet Protocols", icon: Lock, color: "text-blue-500" },
                { text: "Tech-Driven OTT Operations", icon: Cpu, color: "text-purple-500" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVars}
                  className="flex items-center justify-between p-6 rounded-[2rem] border border-slate-100 bg-white hover:shadow-2xl transition-all duration-500 group cursor-default"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <item.icon className={`${item.color} w-6 h-6`} />
                    </div>
                    <span className="text-slate-800 font-bold uppercase text-xs md:text-sm tracking-widest">{item.text}</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-600 transition-all" />

                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners1;