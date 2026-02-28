import React from "react";
import { motion } from "framer-motion";
import {
    Play,
    Network,
    Globe2,
    Trophy,
    ArrowUpRight,
    Building2
} from "lucide-react";

const Roadmap = () => {
    // Alternating Blue and Gold themes derived from the Chain21 Logo
    const roadmapData = [
        {
            quarter: "Q1 2026",
            title: "Platform Launch",
            icon: Play,
            desc: "Launch the Chain21 decentralized crypto real estate platform.",
            gradient: "from-blue-500 to-blue-600",
            iconColor: "text-blue-500",
            hoverText: "group-hover:text-blue-500",
            shadowHover: "hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)]",
            dotHover: "group-hover:border-blue-500 group-hover:bg-blue-900",
            badgeHover: "group-hover:bg-blue-600 group-hover:text-white"
        },
        {
            quarter: "Q2 2026",
            title: "Asset Tokenization",
            icon: Network,
            desc: "Implement fractional ownership & smart contract property models.",
            gradient: "from-amber-400 to-amber-500",
            iconColor: "text-amber-400",
            hoverText: "group-hover:text-amber-400",
            shadowHover: "hover:shadow-[0_20px_50px_rgba(251,191,36,0.15)]",
            dotHover: "group-hover:border-amber-400 group-hover:bg-amber-900",
            badgeHover: "group-hover:bg-amber-500 group-hover:text-black"
        },
        {
            quarter: "Q3 2026",
            title: "Global Expansion",
            icon: Globe2,
            desc: "Expand to global real estate markets & onboard new investors.",
            gradient: "from-blue-500 to-blue-600",
            iconColor: "text-blue-500",
            hoverText: "group-hover:text-blue-500",
            shadowHover: "hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)]",
            dotHover: "group-hover:border-blue-500 group-hover:bg-blue-900",
            badgeHover: "group-hover:bg-blue-600 group-hover:text-white"
        },
        {
            quarter: "Q4 2026",
            title: "Staking & Rewards",
            icon: Trophy,
            desc: "Introduce yield rewards, staking incentives & ecosystem governance.",
            gradient: "from-amber-400 to-amber-500",
            iconColor: "text-amber-400",
            hoverText: "group-hover:text-amber-400",
            shadowHover: "hover:shadow-[0_20px_50px_rgba(251,191,36,0.15)]",
            dotHover: "group-hover:border-amber-400 group-hover:bg-amber-900",
            badgeHover: "group-hover:bg-amber-500 group-hover:text-black"
        },
    ];

    const containerVars = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 },
        },
    };

    const itemVars = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 100, damping: 20 }
        },
    };

    return (
        <div className="bg-[#030822] py-24 px-6 font-sans overflow-hidden selection:bg-amber-500 selection:text-black">
            <div className="max-w-7xl mx-auto">

                {/* --- HEADER --- */}
                <div className="text-center mb-24 space-y-6">
                    <div className="flex justify-center">
                        <div className="relative inline-flex items-center justify-center rounded-full overflow-hidden p-[2px]">
                            {/* Rotating Gradient Border (Blue to Gold) */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-[-100%] z-0"
                                style={{ background: "conic-gradient(from 0deg, #3b82f6, #f59e0b, #3b82f6)" }}
                            />
                            <div className="relative z-10 px-6 py-2 rounded-full bg-[#111111] flex items-center gap-2">
                                <Building2 size={14} className="text-amber-400" />
                                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">Strategic Timeline</span>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight uppercase">
                        Product <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-400">Roadmap</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto rounded-full" />
                </div>

                {/* --- ROADMAP TRACK --- */}
                <motion.div
                    variants={containerVars}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {/* Connecting Line for Desktop */}
                    <div className="absolute top-[6.5rem] left-0 w-full h-[2px] bg-gray-800 hidden lg:block" />

                    {roadmapData.map((step, idx) => (
                        <motion.div key={idx} variants={itemVars} className="relative group">

                            {/* Quarter Badge */}
                            <div className="mb-10 hidden lg:flex justify-center relative z-10">
                                <div className={`px-6 py-2 rounded-md bg-[#111111] border border-gray-800 text-gray-300 text-xs font-black tracking-widest transition-colors duration-500 ${step.badgeHover}`}>
                                    {step.quarter}
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className={`relative p-8 md:p-10 rounded-[2.5rem] bg-[#111111] border border-gray-800 group-hover:bg-[#0a0a0a] ${step.shadowHover} transition-all duration-500 h-full flex flex-col items-center lg:items-start text-center lg:text-left overflow-hidden`}>

                                {/* Subtle Hover Gradient Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                                <div className="w-16 h-16 rounded-2xl bg-black border border-gray-800 flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500 relative z-10">
                                    <step.icon className={`w-8 h-8 ${step.iconColor}`} />
                                </div>

                                <h3 className={`text-2xl font-extrabold mb-4 text-white ${step.hoverText} transition-colors relative z-10 tracking-tight`}>
                                    {step.title}
                                </h3>

                                <p className="text-gray-400 text-base leading-relaxed mb-8 relative z-10 font-light flex-grow">
                                    {step.desc}
                                </p>

                                <div className={`mt-auto flex items-center gap-2 text-gray-600 ${step.hoverText} font-bold text-[10px] uppercase tracking-[0.2em] transition-all relative z-10`}>
                                    Target Phase <ArrowUpRight size={14} />
                                </div>

                                {/* Mobile Quarter Badge */}
                                <div className={`mt-6 p-2 px-6 rounded-xl bg-black border border-gray-800 flex items-center lg:hidden gap-2 text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em] transition-all relative z-10 ${step.hoverText}`}>
                                    {step.quarter} 
                                </div>

                                {/* Animated Bottom Accent Line */}
                                <div className={`absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r ${step.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                            </div>

                            {/* Connector Dot for Desktop */}
                            <div className={`absolute top-[6.5rem] left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-black border-4 border-gray-700 hidden lg:block ${step.dotHover} group-hover:scale-125 transition-all duration-500 z-20`} />
                        </motion.div>
                    ))}
                </motion.div>
                
            </div>
        </div>
    );
};

export default Roadmap;