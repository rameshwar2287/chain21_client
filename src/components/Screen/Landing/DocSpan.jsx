// // import React from "react";
// // import { motion } from "framer-motion";
// // import { 
// //   Database, 
// //   CircleDollarSign, 
// //   Layers,
// //   Sparkles
// // } from "lucide-react";

// // const DocSpan = () => {
// //   const containerVars = {
// //     hidden: { opacity: 0 },
// //     show: { 
// //       opacity: 1, 
// //       transition: { staggerChildren: 0.3, delayChildren: 0.2 } 
// //     }
// //   };

// //   const itemVars = {
// //     hidden: { opacity: 0, scale: 0.95, y: 30 },
// //     show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
// //   };

// //   return (
// //     <div className="relative bg- text-white font-sans selection:bg-[#D4AF37] selection:text-black overflow-hidden pt-30">
      
// //       {/* 1. ADVANCED BACKGROUND ATMOSPHERE */}
// //       <div className="absolute inset-0 pointer-events-none">
// //         {/* Animated radial glow */}
// //         <motion.div 
// //           animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.2, 1] }}
// //           transition={{ duration: 10, repeat: Infinity }}
// //           className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg blur-[150px] rounded-full opacity-10"
// //         />
// //         {/* Subtle grid with fade */}
// //         <div 
// //           className="absolute inset-0 opacity-[0.03]" 
// //           style={{ 
// //             backgroundImage: `linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)`,
// //             backgroundSize: '80px 80px',
// //             maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
// //           }} 
// //         />
// //       </div>

// //       <div className="relative z-10 max-w-7xl mx-auto px-6">
        
// //         {/* SECTION HEADER */}
// //         <div className="space-y-6 mb-20 text-center md:text-left">
// //           <motion.div 
// //             initial={{ opacity: 0, x: -20 }}
// //             whileInView={{ opacity: 1, x: 0 }}
// //             viewport={{ once: true }}
// //             className="flex items-center gap-4 justify-center md:justify-start"
// //           >
// //             <div className="w-1 h-12 bg-gradient-to-b from-[#D4AF37] to-transparent shadow-[0_0_20px_rgba(212,175,55,0.8)]" />
// //             <div className="space-y-1">
// //               <h2 className="text-4xl md:text-5xl font-black tracking-[0.25em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#D4AF37] to-[#8B6B23]">
// //                 Ecosystem Foundations
// //               </h2>
// //               <div className="h-[1px] w-full bg-gradient-to-r from-[#D4AF37]/50 to-transparent" />
// //             </div>
// //           </motion.div>
          
// //           <motion.p 
// //             initial={{ opacity: 0 }}
// //             whileInView={{ opacity: 1 }}
// //             className="max-w-3xl text-gray-400 tracking-widest text-sm md:text-base leading-relaxed uppercase font-light"
// //           >
// //             CHAIN21 Global operates on advanced <span className="text-[#D4AF37] font-medium">blockchain infrastructure</span>, enabling secure transactions, immutable records, and decentralized participation.
// //           </motion.p>
// //         </div>

// //         {/* 2. PREMIUM CARDS GRID */}
// //         <motion.div 
// //           variants={containerVars}
// //           initial="hidden"
// //           whileInView="show"
// //           viewport={{ once: true }}
// //           className="grid grid-cols-1 lg:grid-cols-3 gap-8"
// //         >
// //           {[
// //             { 
// //               title: "Blockchain", 
// //               icon: Database, 
// //               items: ["Decentralized & Transparent Ledger", "Secure Smart Contract Architecture", "Global Accessibility"] 
// //             },
// //             { 
// //               title: "Crypto", 
// //               icon: CircleDollarSign, 
// //               items: ["Digital asset-based participation", "Fast & borderless transactions", "USDT (BEP-20) Supported"] 
// //             },
// //             { 
// //               title: "NFT", 
// //               icon: Layers, 
// //               items: ["Unique digital asset integration", "Ownership & authenticity on blockchain", "Future-ready NFT utilities"] 
// //             }
// //           ].map((card, idx) => (
// //             <motion.div 
// //               key={idx}
// //               variants={itemVars}
// //               whileHover={{ y: -10 }}
// //               className="relative group p-[1px] rounded-2xl overflow-hidden"
// //             >
// //               {/* Animated Border Glow on Hover */}
// //               <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
// //               {/* Inner Content Case */}
// //               <div className="relative bg-[#0a0a0a]/90 backdrop-blur-xl p-8 rounded-2xl h-full border border-white/5 space-y-8 flex flex-col shadow-2xl">
                
// //                 {/* Header Row */}
// //                 <div className="flex items-center justify-between border-b border-[#D4AF37]/10 pb-6">
// //                   <div className="flex items-center gap-4">
// //                     <div className="p-3 bg-[#D4AF37]/5 rounded-xl group-hover:bg-[#D4AF37]/20 transition-colors">
// //                       <card.icon className="text-[#D4AF37] w-8 h-8" />
// //                     </div>
// //                     <h3 className="text-2xl font-bold tracking-widest text-white uppercase group-hover:text-[#D4AF37] transition-colors">
// //                       {card.title}
// //                     </h3>
// //                   </div>
// //                   <Sparkles className="w-4 h-4 text-[#D4AF37]/30 group-hover:text-[#D4AF37] transition-all" />
// //                 </div>

// //                 {/* List Items */}
// //                 <ul className="space-y-5 flex-grow">
// //                   {card.items.map((text, i) => (
// //                     <li key={i} className="flex items-start gap-3 group/li">
// //                       <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37] group-hover/li:shadow-[0_0_8px_#D4AF37] transition-all" />
// //                       <span className="text-[11px] tracking-[0.2em] uppercase text-gray-400 group-hover/li:text-white transition-colors">
// //                         {text}
// //                       </span>
// //                     </li>
// //                   ))}
// //                 </ul>

// //                 {/* Bottom Accent */}
// //                 <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
// //               </div>
// //             </motion.div>
// //           ))}
// //         </motion.div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DocSpan;

// import React from "react";
// import { motion } from "framer-motion";
// import { 
//   Database, 
//   UserCheck, 
//   Coins, 
//   ChevronRight,
//   Zap,
//   ShieldCheck,
//   Cpu,
//   ArrowUpRight
// } from "lucide-react";

// const DocSpan = () => {
//   const containerVars = {
//     hidden: { opacity: 0 },
//     show: { 
//       opacity: 1, 
//       transition: { staggerChildren: 0.2 } 
//     }
//   };

//   const itemVars = {
//     hidden: { opacity: 0, y: 30 },
//     show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
//   };

//   return (
//     <div className="relative bg-white text-slate-900 font-sans selection:bg-[#bc13fe] selection:text-white overflow-hidden py-24">
      
//       {/* 1. LIGHT-THEME TECHNICAL BACKGROUND */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(59,130,246,0.05),_transparent_50%)]" />
//         <div 
//           className="absolute inset-0 opacity-[0.4]" 
//           style={{ 
//             backgroundImage: `radial-gradient(#e2e8f0 1.5px, transparent 1.5px)`,
//             backgroundSize: '40px 40px',
//           }} 
//         />
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-6">
        
//         {/* --- SECTION HEADER --- */}
//         <div className="text-center mb-20 space-y-4">
//           <motion.div 
//             initial={{ opacity: 0, y: -10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-widest uppercase"
//           >
//             <Cpu size={14} /> Global Creative Community
//           </motion.div>
          
//           <motion.h2 
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900"
//           >
//             Web3 Distribution <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Ecosystem</span>
//           </motion.h2>
          
//           <motion.p 
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             className="max-w-2xl mx-auto text-slate-500 text-lg font-light leading-relaxed"
//           >
//             Revolutionizing the film industry through decentralized funding, 
//             immutable ownership, and direct-to-audience distribution channels.
//           </motion.p>
//         </div>

//         {/* --- 2. THE THREE CORE PILLARS (Section 3 Content) --- */}
//         <motion.div 
//           variants={containerVars}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true }}
//           className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
//         >
//           {[
//             { 
//               title: "Blockchain Ecosystem", 
//               icon: Database, 
//               color: "blue",
//               desc: "Harnessing blockchain technology to transform film production and OTT launch with absolute transparency." 
//             },
//             { 
//               title: "Creator Empowerment", 
//               icon: UserCheck, 
//               color: "purple",
//               desc: "Providing decentralized funding, royalties, and direct distribution for content creators globally." 
//             },
//             { 
//               title: "Tokenized Economy", 
//               icon: Coins, 
//               color: "indigo",
//               desc: "Introducing a token-based economy for funding, community rewards, and project engagement." 
//             }
//           ].map((card, idx) => (
//             <motion.div 
//               key={idx}
//               variants={itemVars}
//               whileHover={{ y: -10 }}
//               className="group relative p-8 rounded-[2.5rem] bg-white border border-slate-100 hover:border-blue-200 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.08)] transition-all duration-500"
//             >
//               <div className={`w-16 h-16 rounded-2xl bg-${card.color}-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
//                 <card.icon className={`text-${card.color}-600 w-8 h-8`} />
//               </div>
              
//               <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
//                 {card.title}
//               </h3>
              
//               <p className="text-slate-500 text-sm leading-relaxed mb-8">
//                 {card.desc}
//               </p>

//               <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
//                 Learn More <ArrowUpRight size={14} />
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* --- 3. THE ECOSYSTEM FLOW BANNER (Visual Highlight) --- */}
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.95 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           className="relative rounded-[3rem] overflow-hidden bg-slate-900 p-8 md:p-16 text-white"
//         >
//           {/* Decorative mesh bg */}
//           <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
//           <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent" />
          
//           <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
//             <div className="space-y-8">
//               <div className="inline-flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest">
//                 <Zap size={14} fill="currentColor" /> Web3 Distribution Pipeline
//               </div>
//               <h4 className="text-4xl font-bold leading-tight">
//                 Decentralizing the <br /> 
//                 <span className="text-blue-400">Global Creative Economy</span>
//               </h4>
//               <div className="space-y-4">
//                 {[
//                   { label: "Tokenizes Film Assets", icon: ShieldCheck },
//                   { label: "Exclusive OTT Access", icon: TvIcon },
//                   { label: "On-Chain Royalties", icon: Coins }
//                 ].map((item, i) => (
//                   <div key={i} className="flex items-center gap-3">
//                     <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center">
//                       <item.icon size={12} className="text-blue-400" />
//                     </div>
//                     <span className="text-slate-300 text-sm tracking-wide">{item.label}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Tech Visual Element */}
//             <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
//               {/* <img 
//                 src={About} 
//                 alt="Ecosystem Flow" 
//                 className="w-full h-full object-cover"
//               /> */}
//               <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay" />
//             </div>
//           </div>
//         </motion.div>

//       </div>
//     </div>
//   );
// };

// // Simple internal icon for Tv
// const TvIcon = ({ size, className }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
//     <rect width="20" height="15" x="2" y="7" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/>
//   </svg>
// );

// export default DocSpan;

// import React from "react";
// import { motion } from "framer-motion";
// import { 
//   Database, 
//   UserCheck, 
//   Coins, 
//   ChevronRight,
//   Zap,
//   ShieldCheck,
//   Cpu,
//   ArrowUpRight,
//   Film,
//   Layers
// } from "lucide-react";
// import Ecosystem from "../../../assets/chain21flow.png";

// const DocSpan = () => {
//   const containerVars = {
//     hidden: { opacity: 0 },
//     show: { 
//       opacity: 1, 
//       transition: { staggerChildren: 0.2 } 
//     }
//   };

//   const itemVars = {
//     hidden: { opacity: 0, y: 30 },
//     show: { 
//       opacity: 1, 
//       y: 0, 
//       transition: { 
//         type: "spring",
//         stiffness: 100,
//         damping: 20
//       } 
//     }
//   };

//   return (
//     <div className="relative bg-white  font-sans selection:bg-[#bc13fe] selection:text-white overflow-hidden py-24">
      
//       {/* 1. PREMIUM TECHNICAL BACKGROUND */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(59,130,246,0.08),_transparent_50%)]" />
//         <div 
//           className="absolute inset-0 opacity-[0.4]" 
//           style={{ 
//             backgroundImage: `radial-gradient(#e2e8f0 1.5px, transparent 1.5px)`,
//             backgroundSize: '48px 48px',
//           }} 
//         />
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-6">
        
//         {/* --- SECTION HEADER --- */}
//         <div className="text-center mb-18 space-y-6">
//           <div className="flex justify-center">
//             <div className="relative inline-flex items-center justify-center rounded-full overflow-hidden p-[2px]">
//               {/* Rotating Gradient Border */}
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
//                 className="absolute inset-[-100%] z-0"
//                 style={{ background: "conic-gradient(from 0deg, #3b82f6, #bc13fe, #3b82f6)" }}
//               />
//               <div className="relative z-10 px-6 py-2 rounded-full bg-white flex items-center gap-2">
//                 <Cpu size={14} className="text-blue-600" />
//                 <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500">Global Creative Community</span>
//               </div>
//             </div>
//           </div>
          
//           <motion.h2 
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-5xl md:text-7xl font-black tracking-tight text-black"
//           >
//             Web3 Distribution <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-700">Ecosystem</span>
//           </motion.h2>
          
//           <motion.p 
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             className="max-w-3xl mx-auto text-black text-lg md:text-xl font-light leading-relaxed"
//           >
//             Revolutionizing the film industry through decentralized funding, 
//             immutable ownership, and direct-to-audience distribution channels.
//           </motion.p>
//         </div>

//         {/* --- 2. THE THREE CORE PILLARS --- */}
//         <motion.div 
//           variants={containerVars}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true }}
//           className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-18"
//         >
//           {[
//             { 
//               title: "Blockchain Ecosystem", 
//               icon: Database, 
//               color: "from-blue-600 to-blue-400",
//               lightColor: "bg-blue-50",
//               desc: "Harnessing blockchain technology to transform film production and OTT launch with absolute transparency." 
//             },
//             { 
//               title: "Creator Empowerment", 
//               icon: UserCheck, 
//               color: "from-purple-600 to-purple-400",
//               lightColor: "bg-purple-50",
//               desc: "Providing decentralized funding, royalties, and direct distribution for content creators globally." 
//             },
//             { 
//               title: "Tokenized Economy", 
//               icon: Coins, 
//               color: "from-indigo-600 to-indigo-400",
//               lightColor: "bg-indigo-50",
//               desc: "Introducing a token-based economy for funding, community rewards, and project engagement." 
//             }
//           ].map((card, idx) => (
//             <motion.div 
//               key={idx}
//               variants={itemVars}
//               whileHover={{ y: -12 }}
//               className="group relative p-10 rounded-2xl bg-white border border-slate-200 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(59,130,246,0.1)] transition-all duration-500 overflow-hidden"
//             >
//               {/* Subtle hover background glow */}
//               <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500`} />
              
//               <div className={`w-16 h-16 rounded-2xl ${card.lightColor} flex items-center justify-center mb-8 border border-white group-hover:scale-110 transition-transform duration-500`}>
//                 <card.icon className={`w-8 h-8 text-slate-800`} />
//               </div>
              
//               <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-700 transition-colors">
//                 {card.title}
//               </h3>
              
//               <p className="text-slate-500 text-base leading-relaxed mb-10 font-light">
//                 {card.desc}
//               </p>

//               <div className="flex items-center gap-2 text-slate-900 font-bold text-[10px] uppercase tracking-[0.2em] group-hover:gap-3 transition-all">
//                 Discovery Pillar <ArrowUpRight size={14} className="text-blue-600" />
//               </div>

//               {/* Bottom accent line */}
//               <div className={`absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r ${card.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* --- 3. THE ECOSYSTEM FLOW BANNER --- */}
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.95 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           className="relative rounded-2xl overflow-hidden bg-slate-950 p-8 md:p-20 text-white shadow-2xl"
//         >
//           {/* Animated Mesh Overlay */}
//           {/* <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" /> */}
//           <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent blur-3xl" />
          
//           <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
//             <div className="space-y-10">
//               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
//                 <Zap size={12} fill="currentColor" /> Web3 Distribution Pipeline
//               </div>
              
//               <h4 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight">
//                 Decentralizing the <br /> 
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 italic">Global Creative Economy</span>
//               </h4>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 {[
//                   { label: "Tokenized Film Assets", icon: ShieldCheck },
//                   { label: "Exclusive OTT access", icon: Film },
//                   { label: "On-Chain Royalties", icon: Coins },
//                   { label: "NFT Marketplace", icon: Layers }
//                 ].map((item, i) => (
//                   <div key={i} className="flex items-center gap-4 group">
//                     <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-all">
//                       <item.icon size={18} className="text-blue-400" />
//                     </div>
//                     <span className="text-slate-300 text-sm font-medium tracking-wide uppercase">{item.label}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Technical Visual Container */}
//             <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/5 shadow-inner group">
//                 {/* Decorative scanning line for the visual area */}
//                 <motion.div 
//                   animate={{ top: ['0%', '100%', '0%'] }}
//                   transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//                   className="absolute left-0 right-0 h-[1px] bg-blue-500/50 z-20"
//                 />
                
//                 <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-purple-900/40 flex items-center justify-center">
//                     <motion.div 
//                       animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
//                       transition={{ duration: 4, repeat: Infinity }}
//                       className="w-40 h-40 rounded-full bg-blue-500 blur-3xl" 
//                     />
                    
//                     <img src={Ecosystem} className=""/>
                  
                   
//                 </div>
                
//                 <div className="absolute inset-0 bg-slate-900/20 mix-blend-overlay" />
//             </div>
//           </div>
//         </motion.div>

//       </div>
//     </div>
//   );
// };

// const TvIcon = ({ size, className }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
//     <rect width="20" height="15" x="2" y="7" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/>
//   </svg>
// );

// export default DocSpan;
import React from "react";
import { motion } from "framer-motion";
import { 
  Database, 
  Coins, 
  Building,
  ShieldCheck,
  Globe,
  ArrowRight,
  Hexagon,
  Cpu,
  Link
} from "lucide-react";
import Ecosystem from "../../../assets/chain21flow.png"; // Make sure this is a transparent PNG if possible!

const DocSpan = () => {
  const containerVars = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15, delayChildren: 0.1 } 
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 20 } 
    }
  };

  return (
    <div className="relative bg-[#020617] text-slate-200 font-sans selection:bg-amber-500 selection:text-black overflow-hidden py-32">
      
      {/* --- 1. DEEP WEB3 BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dynamic Glowing Orbs matching Logo Colors */}
        <motion.div 
          animate={{ x: [-50, 50, -50], y: [-20, 30, -20] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [50, -50, 50], y: [30, -20, 30] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px]" 
        />
        
        {/* Tech Grid */}
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{ 
            backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)'
          }} 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
          <div className="space-y-6 max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-blue-950/50 border border-blue-800/50 backdrop-blur-md"
            >
              <Link size={16} className="text-amber-400" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-300">Chain21 Infrastructure</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white"
            >
              Tokenized <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-600">
                Property Network
              </span>
            </motion.h2>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-400 text-lg max-w-md md:text-right font-light border-l-2 md:border-l-0 md:border-r-2 border-amber-500/30 pl-4 md:pl-0 md:pr-4"
          >
            Securing real-world assets on the blockchain. We merge the high-growth potential of crypto with the stability of premium real estate.
          </motion.p>
        </div>

        {/* --- 2. UNIQUE HEXAGONAL CARDS --- */}
        <motion.div 
          variants={containerVars}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32"
        >
          {[
            { 
              title: "Smart Contracts", 
              icon: ShieldCheck, 
              borderHover: "group-hover:border-blue-500",
              glow: "group-hover:shadow-[0_0_30px_rgba(37,99,235,0.2)]",
              desc: "Automated, trustless governance for property deeds and transactions." 
            },
            { 
              title: "Fractional Ownership", 
              icon: Building, 
              borderHover: "group-hover:border-amber-500",
              glow: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]",
              desc: "Buy, sell, and trade shares of high-value properties seamlessly." 
            },
            { 
              title: "Global Liquidity", 
              icon: Globe, 
              borderHover: "group-hover:border-blue-400",
              glow: "group-hover:shadow-[0_0_30px_rgba(96,165,250,0.2)]",
              desc: "Remove borders. Invest using USDT, BTC, or ETH instantly." 
            }
          ].map((card, idx) => (
            <motion.div 
              key={idx}
              variants={itemVars}
              className={`group relative p-[1px] rounded-[2rem] bg-gradient-to-b from-slate-800 to-slate-900/50 overflow-hidden transition-all duration-500 ${card.glow}`}
            >
              {/* Inner Card Content */}
              <div className={`relative h-full bg-[#0B1120] rounded-[2rem] p-8 md:p-10 border border-transparent ${card.borderHover} transition-colors duration-500 z-10 flex flex-col justify-between`}>
                
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Hexagon size={120} strokeWidth={1} />
                </div>

                <div>
                  <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-slate-800 transition-all duration-500 relative">
                    <card.icon className="w-6 h-6 text-slate-300 group-hover:text-amber-400 transition-colors z-10" />
                    {/* Icon Glow */}
                    <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {card.title}
                  </h3>
                  
                  <p className="text-slate-400 text-sm leading-relaxed font-light">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-10 flex items-center gap-2 text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em] group-hover:text-blue-400 transition-colors">
                  View Protocol <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Animated Hover Gradient Border */}
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-600 via-transparent to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          ))}
        </motion.div>

        {/* --- 3. GLASSMORPHIC DASHBOARD BANNER --- */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-2xl p-8 md:p-16 text-white shadow-2xl overflow-hidden"
        >
          {/* Internal Glows */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <Cpu size={14} /> The Ecosystem
              </div>
              
              <h4 className="text-4xl md:text-5xl font-bold leading-[1.2] tracking-tight">
                An Interlocking Chain of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Wealth Generation</span>
              </h4>

              {/* Vertical Stepper/Pipeline UI */}
              <div className="relative pl-6 space-y-8 border-l border-slate-700">
                {[
                  { title: "Asset Tokenization", desc: "Properties are verified, appraised, and minted into divisible tokens." },
                  { title: "Decentralized Exchange", desc: "Trade your shares 24/7 on our proprietary Chain21 DEX." },
                  { title: "Automated Yield Distribution", desc: "Rental income is paid directly to your connected wallet via smart contracts." }
                ].map((step, i) => (
                  <div key={i} className="relative group cursor-pointer">
                    {/* Stepper Dot */}
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#0B1120] border-2 border-slate-600 group-hover:border-amber-400 transition-colors flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-amber-400 transition-colors" />
                    </div>
                    <h5 className="text-lg font-semibold text-slate-200 group-hover:text-white transition-colors mb-1">{step.title}</h5>
                    <p className="text-sm text-slate-500 font-light group-hover:text-slate-400 transition-colors">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Visual Presentation */}
            <div className="relative aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden bg-[#050A15] border border-slate-800 shadow-[0_0_40px_rgba(0,0,0,0.5)] group">
                
                {/* Simulated Data lines */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                
                {/* Image Container with Hover zoom */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                   {/* Replace Ecosystem with your actual transparent 3D asset */}
                   <img 
                      src={Ecosystem} 
                      alt="Chain21 Tech"
                      className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(37,99,235,0.3)] group-hover:scale-105 group-hover:drop-shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all duration-700"
                    />
                </div>
                
                {/* Tech overlay border sweep */}
                <motion.div 
                  animate={{ left: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                  className="absolute top-0 bottom-0 w-[100px] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[45deg]"
                />
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default DocSpan;