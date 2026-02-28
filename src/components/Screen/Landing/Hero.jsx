


// /* eslint-disable react/no-unescaped-entities */
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { TypeAnimation } from "react-type-animation"; // Install this: npm install react-type-animation
// import {
//   ArrowRight,
//   Database,
//   Users,
//   Coins,
//   Clapperboard,
//   Sparkles,
//   Play,
//   Share2,
//   Tv,
//   ChevronRight,
// } from "lucide-react";
// import { LandingRouters } from "../../../constants/routes";
// import Logo from "../../../assets/chain21_2.jpeg";

// const Hero = () => {
//   const navigate = useNavigate();

//   // Grid background settings
//   const gridSize = 100; // Total cells for the background effect

//   const containerVars = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1, delayChildren: 0.3 },
//     },
//   };

//   const itemVars = {
//     hidden: { opacity: 0, y: 20 },
//     show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//   };

//   return (
//     <div className="relative bg-white text-slate-900 min-h-screen selection:bg-[#bc13fe] selection:text-white font-sans overflow-x-hidden">
      
//       {/* --- ANIMATED GRID BACKGROUND --- */}
//       <div className="absolute inset-0 z-0 pointer-events-none">
//         {/* The 60px Static Grid Line */}
//         <div 
//           className="absolute inset-0 opacity-[0.08]" 
//           style={{ 
//             backgroundImage: `linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)`,
//             backgroundSize: '80px 80px'
//           }} 
//         />
        
//         {/* Dynamic Animated Cells */}
//         <div className="absolute inset-0 grid grid-cols-[repeat(auto-fill,60px)] grid-rows-[repeat(auto-fill,60px)] opacity-[0.4]">
//           {[...Array(gridSize)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="border-[0.5px] border-slate-100"
//               initial={{ opacity: 0 }}
//               whileHover={{ 
//                 backgroundColor: "rgba(188, 19, 254, 0.1)", 
//                 opacity: 1,
//                 transition: { duration: 0 } 
//               }}
//               animate={{ opacity: 0 }}
//               transition={{ duration: 1.5 }}
//             />
//           ))}
//         </div>

//         {/* Central Glow */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[400px] md:h-[600px] bg-purple-500/5 rounded-full blur-[120px]" />
//       </div>

//       <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-20 pb-12 z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center space-y-8 md:space-y-12 max-w-6xl w-full flex flex-col items-center"
//         >
//           {/* Logo Assembly */}
//           <div className="relative group flex items-center justify-center">
//   {/* The Orbiting Glow Effect */}
//   <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-2xl rounded-full animate-pulse" />
  
//   <div className="relative w-32 h-32 md:w-44 md:h-44 flex items-center justify-center">
    
//     {/* 1. THE ROTATING BORDER (CONIC GRADIENT) */}
//     <motion.div
//       animate={{ rotate: 360 }}
//       transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//       className="absolute inset-0 rounded-full p-[3px] md:p-[4px]"
//       style={{ 
//         background: "conic-gradient(from 0deg, #3b82f6, #bc13fe, #3b82f6)",
//         mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
//         WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
//         WebkitMaskComposite: "destination-out",
//         maskComposite: "exclude",
//       }}
//     />

//     {/* 2. THE IMAGE CONTAINER (FORCING PERFECT ROUND) */}
//     <div className="relative w-[90%] h-[90%] bg-white rounded-full overflow-hidden shadow-inner flex items-center justify-center border-[2px] border-slate-50">
//       <motion.img
//         whileHover={{ scale: 1.1 }}
//         src={Logo}
//         alt="CHAIN21 Logo"
//         /* Important: object-cover and h-full w-full ensures the jpeg fills the circle perfectly */
//         className="w-full h-full object-cover" 
//       />
//     </div>

//     {/* 3. OPTIONAL: ORBITING PARTICLE */}
//     <motion.div
//       animate={{ rotate: 360 }}
//       transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
//       className="absolute inset-0 z-20 pointer-events-none"
//     >
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#bc13fe] rounded-full shadow-[0_0_15px_#bc13fe]" />
//     </motion.div>
//   </div>
// </div>

//           <div className="space-y-6 w-full">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.4 }}
//               className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-2 rounded-2xl sm:rounded-full bg-slate-50/80 backdrop-blur-sm border border-slate-200/60 shadow-sm"
//             >
//               <span className="text-xs md:text-sm font-bold tracking-[0.15em] text-slate-800 uppercase">CHAIN21 Global</span>
//               <div className="hidden sm:block h-4 w-[1px] bg-slate-300" />
//               <span className="text-[10px] md:text-[11px] font-semibold tracking-widest text-[#bc13fe] uppercase flex items-center gap-2">
//                 <Sparkles size={12} className="animate-pulse" /> Global Creative Community
//               </span>
//             </motion.div>

//             {/* TYPING ANIMATION HEADLINE */}
//             <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] md:leading-[0.9] text-slate-900 px-2 min-h-[120px] sm:min-h-[160px] md:min-h-[200px]">
//               <TypeAnimation
//                 sequence={[
//                   'Decentralizing',
//                   1000,
//                   'Empowering',
//                   1000,
//                   'Uniting',
//                   1000,
//                 ]}
//                 wrapper="span"
//                 speed={50}
//                 repeat={Infinity}
//                 className="block mb-2"
//               />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-[#bc13fe] to-blue-700">
//                 Creative Power
//               </span>
//             </h1>

//             <p className="text-base md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed text-slate-500 font-light italic px-4">
//               "CHAIN21 Global is transforming cinema through blockchain innovation, empowering a <span className="text-slate-900 font-semibold not-italic">Global Creative Community</span> to own the stories they love."
//             </p>
//           </div>

//           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-6">
//             <button
//               onClick={() => navigate(LandingRouters.USER_REGISTER)}
//               className="w-full sm:w-auto group relative px-8 py-4 bg-slate-900 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3 overflow-hidden"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
//               <span className="relative z-10 text-sm md:text-base">Join the Community</span> 
//               <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </button>
//             <button className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-sm border border-slate-200 font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-sm active:scale-95 group">
//               <Play className="w-4 h-4 fill-slate-900 group-hover:fill-[#bc13fe] transition-colors" /> 
//               <span className="text-sm md:text-base text-slate-700">Watch Film</span>
//             </button>
//           </div>
//         </motion.div>
//       </section>

//       {/* --- OTHER SECTIONS REMAIN THE SAME --- */}
//       <section className="pb-10 px-4 md:px-6 max-w-7xl mx-auto relative z-10">
//         <motion.div
//           variants={containerVars}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true, margin: "-50px" }}
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
//         >
//           {[
//             { icon: Clapperboard, title: "Film Production", color: "from-blue-500 to-blue-600", desc: "Collaborative filmmaking powered by secure on-chain governance." },
//             { icon: Share2, title: "Film Distribution", color: "from-purple-500 to-purple-600", desc: "Direct-to-consumer pipelines removing traditional middle-man costs." },
//             { icon: Tv, title: "OTT Platform", color: "from-indigo-500 to-indigo-600", desc: "Next-gen streaming experience for global community audiences." }
//           ].map((item, idx) => (
//             <motion.div
//               key={idx}
//               variants={itemVars}
//               whileHover={{ y: -8 }}
//               className="relative group p-8 md:p-10 rounded-2xl bg-white border border-slate-200 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl"
//             >
//               <div className="relative z-10">
//                 <div className="w-14 h-14 rounded-xl border border-slate-100 flex items-center justify-center mb-6 bg-slate-50 group-hover:scale-110 transition-transform">
//                   <item.icon className="w-6 h-6 text-slate-900" />
//                 </div>
//                 <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
//                 <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 italic">"{item.desc}"</p>
//                 <div className="flex items-center gap-2 text-slate-900 font-bold text-[10px] uppercase tracking-widest">
//                   Learn More <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
//                 </div>
//               </div>
//               <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${item.color} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left`} />
//             </motion.div>
//           ))}
//         </motion.div>
//       </section>

//              <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
//          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
//            <motion.div
//             variants={containerVars}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
//           >
//             {[
//               { title: "Blockchain Ecosystem", icon: Database, color: "text-blue-400", desc: "Harnessing blockchain technology to transform film production and OTT launch." },
//               { title: "Empowering Creators", icon: Users, color: "text-purple-400", desc: "Providing decentralized funding and direct distribution for creators globally." },
//               { title: "Tokenized Economy", icon: Coins, color: "text-indigo-400", desc: "Introducing a token-based economy for community rewards and engagement." }
//             ].map((pillar, idx) => (
//               <div key={idx} className="group p-6 md:p-8 border border-slate-800 rounded-2xl hover:border-slate-700 transition-colors">
//                 <div className="flex items-center gap-4 mb-6">
//                   <div className="p-3 rounded-lg bg-white/5 border border-white/10 group-hover:border-purple-500/50 transition-all">
//                     <pillar.icon className={`${pillar.color} w-6 h-6`} />
//                   </div>
//                   <h4 className="text-lg md:text-xl font-bold">{pillar.title}</h4>
//                 </div>
//                 <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6 font-light">{pillar.desc}</p>
//                 <div className="flex items-center gap-2 text-purple-400 font-bold text-[10px] uppercase tracking-[0.2em] opacity-60">
//                   Core Pillar <ChevronRight size={14} />
//                 </div>
//               </div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//     </div>
//   );
// };

// export default Hero;

/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  ArrowRight,
  Database,
  Coins,
  Sparkles,
  ChevronRight,
  Building,
  ShieldCheck,
  Wallet,
  Globe,
  LineChart,
  ArrowUpRight
} from "lucide-react";
import { LandingRouters } from "../../../constants/routes";
import Logo from "../../../assets/chain21_2.jpeg";

const Hero = () => {
  const navigate = useNavigate();

  // Grid background settings
  const gridSize = 100;

  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring" } },
  };

  return (
    <div className="relative bg-slate-50 text-slate-900 min-h-screen selection:bg-amber-500 selection:text-white font-sans overflow-x-hidden">
      
      {/* --- ANIMATED GRID BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Static Grid Line */}
        <div 
          className="absolute inset-0 opacity-[0.06]" 
          style={{ 
            backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }} 
        />
        
        {/* Dynamic Animated Cells (Amber/Gold Hover) */}
        <div className="absolute inset-0 grid grid-cols-[repeat(auto-fill,60px)] grid-rows-[repeat(auto-fill,60px)] opacity-[0.3]">
          {[...Array(gridSize)].map((_, i) => (
            <motion.div
              key={i}
              className="border-[0.5px] border-slate-200"
              initial={{ opacity: 0 }}
              whileHover={{ 
                backgroundColor: "rgba(245, 158, 11, 0.15)", // Amber tint
                opacity: 1,
                transition: { duration: 0 } 
              }}
              animate={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            />
          ))}
        </div>

        {/* Central Glows (Blue & Gold) */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-1/3 translate-x-1/4 -translate-y-1/2 w-full max-w-[600px] h-[400px] bg-amber-500/5 rounded-full blur-[100px]" />
      </div>

      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-24 pb-12 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-8 md:space-y-12 max-w-6xl w-full flex flex-col items-center"
        >
          {/* Logo Assembly with Cool Animations */}
          <div className="relative group flex items-center justify-center">
            {/* The Orbiting Glow Effect */}
            <div className="absolute -inset-6 bg-gradient-to-tr from-blue-600/20 via-transparent to-amber-500/20 blur-2xl rounded-full animate-pulse" />
            
            <div className="relative w-36 h-36 md:w-48 md:h-48 flex items-center justify-center">
              
              {/* 1. THE ROTATING BORDER (CONIC GRADIENT) */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full p-[3px] md:p-[4px]"
                style={{ 
                  background: "conic-gradient(from 0deg, #2563eb, #f59e0b, #1e3a8a, #2563eb)", // Blue -> Amber -> Dark Blue
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "destination-out",
                  maskComposite: "exclude",
                }}
              />

              {/* 2. THE IMAGE CONTAINER (Floating effect) */}
              <motion.div 
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-[88%] h-[88%] bg-white rounded-full overflow-hidden shadow-[0_0_40px_rgba(37,99,235,0.15)] flex items-center justify-center border-[2px] border-slate-50 p-2"
              >
                <img
                  src={Logo}
                  alt="Chain21 Logo"
                  className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500" 
                />
              </motion.div>

              {/* 3. ORBITING PARTICLES */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 z-20 pointer-events-none"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_15px_#f59e0b]" />
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 z-20 pointer-events-none"
              >
                <div className="absolute bottom-0 right-1/4 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_#2563eb]" />
              </motion.div>
            </div>
          </div>

          <div className="space-y-6 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-5 py-2 sm:px-6 sm:py-2.5 rounded-2xl sm:rounded-full bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm"
            >
              <span className="text-xs md:text-sm font-bold tracking-[0.15em] text-blue-900 uppercase">Chain21 Network</span>
              <div className="hidden sm:block h-4 w-[1px] bg-slate-300" />
              <span className="text-[10px] md:text-[11px] font-bold tracking-widest text-amber-500 uppercase flex items-center gap-2">
                <Sparkles size={14} className="animate-pulse" /> Crypto • Real Estate
              </span>
            </motion.div>

            {/* TYPING ANIMATION HEADLINE */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] md:leading-[1] text-slate-900 px-2 min-h-[120px] sm:min-h-[160px] md:min-h-[200px]">
              <TypeAnimation
                sequence={[
                  'Tokenizing',
                  1500,
                  'Securing',
                  1500,
                  'Investing in',
                  1500,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="block mb-2 text-slate-800"
              />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-amber-500 drop-shadow-sm">
                Real Estate.
              </span>
            </h1>

            <p className="text-base md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed text-slate-500 font-light px-4">
              Chain21 bridges the gap between digital assets and physical properties. <span className="text-slate-800 font-semibold">Fractional ownership, secured on-chain.</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-6 pt-4">
            <button
              onClick={() => navigate(LandingRouters.USER_REGISTER)}
              className="w-full sm:w-auto group relative px-8 py-4 bg-blue-900 text-white font-bold rounded-xl transition-all shadow-xl shadow-blue-900/20 active:scale-95 flex items-center justify-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 text-sm md:text-base tracking-wide">Connect Wallet</span> 
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-slate-200 font-bold rounded-xl hover:border-blue-200 hover:bg-blue-50/50 transition-all flex items-center justify-center gap-3 shadow-sm active:scale-95 group">
              <Building className="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-colors" /> 
              <span className="text-sm md:text-base text-slate-700 group-hover:text-blue-900 transition-colors">Browse Properties</span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* --- FEATURE CARDS SECTION (Light UI) --- */}
      <section className="pb-20 px-4 md:px-6 max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVars}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {[
            { icon: Building, title: "Tokenized Assets", color: "from-blue-500 to-blue-700", bgHover: "hover:border-blue-200", desc: "Fractional ownership of premium global properties. Buy shares easily and securely on the blockchain." },
            { icon: ShieldCheck, title: "Smart Contracts", color: "from-amber-400 to-amber-600", bgHover: "hover:border-amber-200", desc: "Immutable transactions ensuring transparent governance, automated payouts, and unbreakable security." },
            { icon: Wallet, title: "Instant Liquidity", color: "from-blue-800 to-slate-900", bgHover: "hover:border-slate-300", desc: "Invest, earn ROI, and trade your real estate shares directly using your preferred cryptocurrency." }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVars}
              whileHover={{ y: -8 }}
              className={`relative group p-8 md:p-10 rounded-2xl bg-white border border-slate-200 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl ${item.bgHover}`}
            >
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl border border-slate-100 flex items-center justify-center mb-6 bg-slate-50 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 shadow-sm">
                  <item.icon className="w-7 h-7 text-blue-900" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8">{item.desc}</p>
                <div className="flex items-center gap-2 text-blue-600 font-bold text-[11px] uppercase tracking-widest group-hover:text-amber-500 transition-colors">
                  Learn More <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
              {/* Bottom animated border line */}
              <div className={`absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r ${item.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* --- DARK PILLARS SECTION --- */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden rounded-t-[3rem]">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">The Chain21 <span className="text-amber-500">Ecosystem</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Built on robust infrastructure to redefine how the world interacts with real estate investments.</p>
          </div>

          <motion.div
            variants={containerVars}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-8"
          >
            {[
              { title: "Immutable Records", icon: Database, color: "text-blue-400", border: "group-hover:border-blue-500/50", desc: "Every transaction, deed, and ownership transfer is permanently recorded on the blockchain." },
              { title: "Global Accessibility", icon: Globe, color: "text-amber-400", border: "group-hover:border-amber-500/50", desc: "Removing geographic borders, allowing investors worldwide to participate in lucrative markets." },
              { title: "Stable Yields", icon: LineChart, color: "text-blue-300", border: "group-hover:border-blue-300/50", desc: "Combining the high-growth potential of crypto with the tangible, cash-flowing stability of property." }
            ].map((pillar, idx) => (
              <div key={idx} className={`group p-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl transition-all duration-300 hover:bg-slate-800 ${pillar.border}`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700 shadow-inner">
                    <pillar.icon className={`${pillar.color} w-6 h-6`} />
                  </div>
                  <h4 className="text-lg md:text-xl font-bold text-slate-100">{pillar.title}</h4>
                </div>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 font-light">{pillar.desc}</p>
                <div className="flex items-center gap-2 text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                  Core Pillar <ChevronRight size={14} />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Hero;