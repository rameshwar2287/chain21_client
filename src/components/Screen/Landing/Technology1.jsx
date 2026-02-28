// import React, { useState } from 'react';

// const techItems = [
//   { title: 'AI-Powered Trading', content: 'Advanced algorithms analyze market trends 24/7 to maximize your returns with automated trading strategies.', icon: '🤖' },
//   { title: 'Secure Smart Contracts', content: 'Immutable blockchain technology ensures your investments are protected with military-grade security.', icon: '🔒' },
//   { title: 'Full Transparency', content: 'All transactions are recorded on the blockchain and available for public verification in real-time.', icon: '👁️' },
//   { title: 'Instant Withdrawals', content: 'Access your earnings anytime with instant cryptocurrency withdrawals directly to your wallet.', icon: '⚡' },
//   { title: 'Global Access', content: 'Invest from anywhere in the world with our decentralized platform, no geographical restrictions.', icon: '🌐' },
//   { title: '24/7 Operations', content: 'Our AI trading bots work around the clock to ensure continuous profit generation for all investors.', icon: '📡' },
// ];

// const Technology1 = () => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   return (
//     <section className="relative container mx-auto mb-20 px-4 lg:px-[115px] py-20">
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl opacity-20" style={{background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)'}} />
//       </div>

//       <div className="relative flex flex-col items-center gap-6 max-w-[900px] mx-auto text-center mb-16">
//         <div className="relative">
//           <div className="absolute inset-0 rounded-2xl blur-2xl" style={{background: 'radial-gradient(circle, rgba(255, 215, 0, 0.5) 0%, transparent 70%)', boxShadow: '0 0 80px rgba(255, 215, 0, 0.4)'}} />
//           <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl" style={{background: 'linear-gradient(135deg, #FFD700 0%, #D4AF37 50%, #B8860B 100%)', boxShadow: '0 0 40px rgba(255, 215, 0, 0.7)'}}>
//             <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24">
//               <path d="M11.625 16.5C12.1223 16.5 12.5992 16.3025 12.9508 15.9508C13.3025 15.5992 13.5 15.1223 13.5 14.625C13.5 14.1277 13.3025 13.6508 12.9508 13.2992C12.5992 12.9475 12.1223 12.75 11.625 12.75C11.1277 12.75 10.6508 12.9475 10.2992 13.2992C9.94754 13.6508 9.75 14.1277 9.75 14.625C9.75 15.1223 9.94754 15.5992 10.2992 15.9508C10.6508 16.3025 11.1277 16.5 11.625 16.5Z" fill="#000" />
//             </svg>
//           </div>
//         </div>

//         <h2 className="text-5xl lg:text-7xl font-extrabold leading-tight">
//           <span className="premium-gold-gradient" style={{textShadow: '0 0 30px rgba(255, 215, 0, 0.8)'}}>Advanced Technology</span>
//           <br />
//           <span className="text-white">& AI Innovation</span>
//         </h2>

//         <p className="text-lg lg:text-xl opacity-90 max-w-3xl leading-relaxed font-medium" style={{color: '#FFD700'}}>
//           Powered by cutting-edge AI and blockchain technology. Our platform ensures <span className="font-bold">maximum security</span> and <span className="font-bold">optimal performance</span>.
//         </p>
//       </div>

//       <div className="hidden lg:block relative">
//         <div className="rounded-3xl p-10 max-w-[1200px] mx-auto" style={{background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(212, 175, 55, 0.3)', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)'}}>
//           <div className="flex gap-8">
//             <div className="flex flex-col gap-3 w-[280px]">
//               {techItems.map((item, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setActiveIndex(index)}
//                   className="text-left px-5 py-4 rounded-xl transition-all duration-300"
//                   style={activeIndex === index ? {
//                     background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(212, 175, 55, 0.1) 100%)',
//                     border: '1px solid rgba(255, 215, 0, 0.5)',
//                     transform: 'scale(1.05)'
//                   } : {opacity: 0.6}}
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="text-2xl">{item.icon}</div>
//                     <span className="font-semibold" style={{color: activeIndex === index ? '#FFD700' : '#C0C0C0'}}>{item.title}</span>
//                   </div>
//                 </button>
//               ))}
//             </div>

//             <div className="flex-1">
//               <div className="mb-6 inline-block">
//                 <div className="text-7xl w-24 h-24 rounded-2xl flex items-center justify-center" style={{background: 'linear-gradient(135deg, #FFD700 0%, #D4AF37 100%)', boxShadow: '0 10px 40px rgba(255, 215, 0, 0.4)'}}>
//                   <span>{techItems[activeIndex].icon}</span>
//                 </div>
//               </div>

//               <h3 className="text-4xl font-bold mb-6 text-white">{techItems[activeIndex].title}</h3>
//               <p className="text-xl leading-relaxed max-w-[600px] mb-8" style={{color: '#C0C0C0'}}>{techItems[activeIndex].content}</p>

//               <div className="flex flex-wrap gap-3">
//                 {['Blockchain Verified', 'AI Powered', 'Secure'].map((tag) => (
//                   <span key={tag} className="px-5 py-2 rounded-full text-sm font-bold" style={{background: 'rgba(212, 175, 55, 0.15)', color: '#FFD700', border: '1px solid rgba(212, 175, 55, 0.4)'}}>
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="lg:hidden space-y-4">
//         {techItems.map((item, index) => (
//           <div key={index} className="rounded-2xl p-6 transition-all duration-300" style={{background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(212, 175, 55, 0.3)'}}>
//             <div className="flex flex-col gap-4 mb-4">
//               <div className="flex-shrink-0 text-4xl w-16 h-16 rounded-xl flex items-center justify-center" style={{background: 'linear-gradient(135deg, #FFD700 0%, #D4AF37 100%)', boxShadow: '0 4px 20px rgba(255, 215, 0, 0.4)'}}>
//                 {item.icon}
//               </div>
//               <div>
//                 <h3 className="text-xl font-bold mb-2" style={{color: '#FFD700'}}>{item.title}</h3>
//                 <p className="text-sm leading-relaxed" style={{color: '#C0C0C0'}}>{item.content}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Technology1;



import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  ShieldCheck, 
  Search, 
  Zap, 
  Globe, 
  Clock, 
  Cpu, 
  Lock, 
  CheckCircle2 
} from 'lucide-react';

const techItems = [
  { title: 'AI-Powered Trading', content: 'Advanced algorithms analyze market trends 24/7 to maximize your returns with automated trading strategies.', icon: Bot },
  { title: 'Secure Smart Contracts', content: 'Immutable blockchain technology ensures your investments are protected with military-grade security.', icon: Lock },
  { title: 'Full Transparency', content: 'All transactions are recorded on the blockchain and available for public verification in real-time.', icon: Search },
  { title: 'Instant Withdrawals', content: 'Access your earnings anytime with instant cryptocurrency withdrawals directly to your wallet.', icon: Zap },
  { title: 'Global Access', content: 'Invest from anywhere in the world with our decentralized platform, no geographical restrictions.', icon: Globe },
  { title: '24/7 Operations', content: 'Our AI trading bots work around the clock to ensure continuous profit generation for all investors.', icon: Clock },
];

const Technology1 = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-24 bg-black overflow-hidden selection:bg-[#D4AF37] selection:text-black">
      
      {/* 1. BACKGROUND ATMOSPHERE */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/10 blur-[150px] rounded-full" />
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }} 
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-[115px]">
        
        {/* HEADER SECTION - Aligned with Security/Ecosystem UI */}
        <div className="flex flex-col items-center md:items-start gap-6 mb-20 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-1 h-12 bg-[#D4AF37] shadow-[0_0_20px_#D4AF37]" />
            <h2 className="text-4xl md:text-6xl font-black tracking-[0.2em] uppercase text-white">
              Advanced <span className="text-[#D4AF37]">Technology</span>
            </h2>
          </motion.div>
          <p className="max-w-3xl text-gray-400 tracking-widest text-sm md:text-base leading-relaxed uppercase font-light">
            Powered by cutting-edge <span className="text-[#D4AF37] font-medium">AI and blockchain technology</span>. Our platform ensures maximum security and optimal performance through automated innovation.
          </p>
        </div>

        {/* 2. MAIN CONTENT - DESKTOP TAB VIEW */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT SIDEBAR - Interactive Tabs */}
          <div className="col-span-4 flex flex-col gap-4">
            {techItems.map((item, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(index)}
                whileHover={{ x: 10 }}
                className={`relative flex items-center gap-4 px-6 py-5 rounded-xl border transition-all duration-500 overflow-hidden ${
                  activeIndex === index 
                    ? 'border-[#D4AF37] bg-[#D4AF37]/10 shadow-[0_0_30px_rgba(212,175,55,0.1)]' 
                    : 'border-white/5 bg-white/5 hover:border-white/20'
                }`}
              >
                {/* Active Indicator Bar */}
                {activeIndex === index && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-[#D4AF37] shadow-[0_0_15px_#D4AF37]"
                  />
                )}
                
                <item.icon className={`w-6 h-6 ${activeIndex === index ? 'text-[#D4AF37]' : 'text-gray-500'}`} />
                <span className={`text-xs font-black tracking-widest uppercase transition-colors ${
                  activeIndex === index ? 'text-white' : 'text-gray-500'
                }`}>
                  {item.title}
                </span>
              </motion.button>
            ))}
          </div>

          {/* RIGHT VIEWPORT - Display Active Content */}
          <div className="col-span-8 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="h-full rounded-2xl border border-[#D4AF37]/30 bg-[#0a0a0a]/80 backdrop-blur-xl p-12 flex flex-col justify-between overflow-hidden group"
              >
                {/* Scanner Beam Animation overlay */}
                <motion.div
                  className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent z-20"
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />

                <div className="space-y-8 relative z-10">
                  <div className="p-5 w-20 h-20 rounded-2xl border border-[#D4AF37]/50 bg-[#D4AF37]/10 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                    {React.createElement(techItems[activeIndex].icon, { className: "w-10 h-10 text-[#D4AF37]" })}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-4xl font-black tracking-tight text-white uppercase">
                      {techItems[activeIndex].title}
                    </h3>
                    <div className="h-[2px] w-24 bg-[#D4AF37]" />
                    <p className="text-gray-400 text-xl leading-relaxed max-w-2xl font-light">
                      {techItems[activeIndex].content}
                    </p>
                  </div>
                </div>

                {/* Bottom Tags */}
                <div className="flex flex-wrap gap-4 pt-8 border-t border-white/5">
                  {['Blockchain Verified', 'AI Powered', 'Secure'].map((tag) => (
                    <div key={tag} className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5">
                      <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" />
                      <span className="text-[10px] font-bold text-[#D4AF37] tracking-[0.2em] uppercase">{tag}</span>
                    </div>
                  ))}
                </div>

                {/* Decorative Background Icon */}
                <div className="absolute -bottom-10 -right-10 opacity-[0.03] rotate-12">
                   {React.createElement(techItems[activeIndex].icon, { size: 300, className: "text-[#D4AF37]" })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 3. MOBILE VIEW - STACKED CARDS */}
        <div className="lg:hidden space-y-6">
          {techItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="p-8 rounded-2xl border border-[#D4AF37]/20 bg-[#0a0a0a] space-y-4"
            >
              <item.icon className="w-10 h-10 text-[#D4AF37]" />
              <h3 className="text-xl font-black uppercase text-white tracking-widest">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.content}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Technology1;