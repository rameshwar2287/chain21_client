import React, { useState } from "react";
// Make sure your routes are correctly mapped in your project
import { LandingRouters } from "../../../constants/routes";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  CheckCircle2, 
  MessageCircle, 
  Share2, 
  ShieldCheck, 
  Coins, 
  ChevronRight,
  HelpCircle,
  Cpu,
  Building2
} from "lucide-react";

// Updated content for Chain21 Crypto Real Estate
const faqData = [
  {
    question: "What is Chain21 and how does it work?",
    answer: [
      "Chain21 is a decentralized platform revolutionizing the real estate industry.",
      "It bridges the gap between traditional property ownership and Web3.",
      "Investors can buy, sell, and trade tokenized real estate assets globally.",
      "The ecosystem is powered by blockchain for absolute transparency and security.",
    ],
    icon: Building2
  },
  {
    question: "How does Tokenized Real Estate work?",
    answer: [
      "Chain21 tokenizes physical real estate assets into digital shares (NFTs).",
      "It allows for fractional ownership, lowering the barrier to entry for investors.",
      "We utilize a secure marketplace for digital asset ownership and trading.",
      "The model removes traditional middlemen, reducing fees and transaction times.",
    ],
    icon: Share2
  },
  {
    question: "What is the Ecosystem Utility Token?",
    answer: [
      "It is a token-based system for transactions, staking rewards, and governance.",
      "Our exclusive token drives property acquisitions and smart contract payouts.",
      "Investors earn passive income through automated rental yields and ROI.",
      "The economy ensures long-term liquidity and sustainability for property assets.",
    ],
    icon: Coins
  },
  {
    question: "How are investors and property owners empowered?",
    answer: [
      "Chain21 provides decentralized funding to bypass traditional banking hurdles.",
      "Property owners can liquidate assets faster through fractionalized sales.",
      "Direct distribution channels connect buyers directly with premium properties.",
      "We offer transparent income models secured by immutable smart contracts.",
    ],
    icon: ShieldCheck
  }
];

const Faq1 = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(0);

  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 } 
    }
  };

  return (
    <section className="relative py-24 md:py-32 bg-black overflow-hidden selection:bg-amber-500 selection:text-black" id="faq">
      
      {/* --- BACKGROUND ACCENTS --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle Blue & Amber Glows */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[150px] rounded-full" />
        
        {/* Dark Mode Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{ 
            backgroundImage: `radial-gradient(#374151 1.5px, transparent 1.5px)`,
            backgroundSize: '48px 48px'
          }} 
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-20">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col items-center gap-8 mb-20 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Rotating Badge */}
            <div className="relative inline-flex items-center justify-center rounded-full overflow-hidden p-[2px]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-100%] z-0"
                style={{ background: "conic-gradient(from 0deg, #3b82f6, #f59e0b, #3b82f6)" }}
              />
              <div className="relative z-10 px-6 py-2 rounded-full bg-[#111111] flex items-center gap-2">
                <HelpCircle size={14} className="text-amber-400" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">Support Center</span>
              </div>
            </div>

            <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white uppercase leading-none">
              Common <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-400">Questions</span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-amber-500 rounded-full" />
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="max-w-2xl text-gray-400 text-lg md:text-xl font-light leading-relaxed"
          >
            Everything you need to know about the <span className="text-amber-400 font-medium">Chain21 Ecosystem</span> and our decentralized real estate protocols.
          </motion.p>
        </div>

        {/* --- ACCORDION LIST --- */}
        <motion.div 
          variants={containerVars}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-4xl mx-auto space-y-4"
        >
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            const IconComponent = item.icon;

            return (
              <motion.div 
                key={index}
                variants={itemVars}
                className={`group rounded-[2rem] border transition-all duration-500 overflow-hidden ${
                  isOpen 
                  ? 'border-blue-500/30 bg-[#111111] shadow-[0_20px_60px_rgba(59,130,246,0.05)]' 
                  : 'border-gray-800 bg-[#111111] hover:bg-[#0a0a0a]'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                >
                  <div className="flex items-center gap-6">
                    <div className={`p-4 rounded-2xl transition-all duration-500 ${
                      isOpen ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg' : 'bg-black text-amber-400 border border-gray-800'
                    }`}>
                      <IconComponent size={24} />
                    </div>
                    <h3 className={`text-lg md:text-xl font-bold tracking-tight transition-colors ${
                      isOpen ? 'text-white' : 'text-gray-400 group-hover:text-white'
                    }`}>
                      {item.question}
                    </h3>
                  </div>

                  <div className={`p-2 rounded-full transition-all duration-500 ${
                    isOpen ? 'bg-amber-500 text-black rotate-45' : 'bg-black text-gray-500 border border-gray-800'
                  }`}>
                    <Plus size={20} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-10">
                        <div className="h-[1px] w-full bg-gray-800 mb-8" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                          {item.answer.map((line, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <CheckCircle2 size={18} className="text-blue-500 mt-0.5 shrink-0" />
                              <span className="text-sm text-gray-400 leading-relaxed font-light">
                                {line}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* --- SUPPORT CALL TO ACTION --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-24 max-w-3xl mx-auto"
        >
          <div className="bg-[#111111] border border-gray-800 rounded-[3rem] p-10 md:p-16 text-center space-y-8 shadow-2xl relative overflow-hidden group">
            {/* Animated Glow Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[80px] group-hover:bg-amber-500/20 transition-all duration-700" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 blur-[80px] group-hover:bg-blue-600/20 transition-all duration-700" />
            
            <div className="relative z-10 flex flex-col items-center gap-8">
              <div className="p-6 rounded-3xl bg-black border border-gray-800 shadow-inner group-hover:scale-110 transition-transform duration-500">
                <MessageCircle size={40} className="text-blue-500" />
              </div>
              
              <div className="space-y-3">
                <h3 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">Need more clarity?</h3>
                <p className="text-gray-400 text-lg font-light max-w-md mx-auto">
                  Our specialized Web3 real estate support team is available 24/7.
                </p>
              </div>

              <button 
                onClick={() => navigate(LandingRouters.USER_REGISTER)}
                className="group flex items-center gap-3 px-12 py-5 bg-amber-500 text-black font-black rounded-2xl hover:bg-amber-400 transition-all shadow-xl active:scale-95 uppercase text-xs tracking-widest"
              >
                Connect With Us <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
            
            {/* System Info Decorator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-30">
               <Cpu size={12} className="text-gray-400" />
               <span className="text-[8px] font-bold text-gray-400 tracking-[0.4em] uppercase">Chain21 Secure Gateway active</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Faq1;