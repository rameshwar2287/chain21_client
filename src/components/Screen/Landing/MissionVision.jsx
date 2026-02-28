import React from "react";
import { motion } from "framer-motion";
import {
    Target,
    Rocket,
    Sparkles,
    Globe,
    Cpu,
    ArrowUpRight
} from "lucide-react";

const MissionVision = () => {
    // Animation Variants matching your established UI
    const containerVars = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVars = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20
            }
        }
    };

    return (
        <div className="bg-slate-900 text-white min-h-screen font-sans selection:bg-[#f97316] selection:text-white overflow-hidden">

            {/* --- SECTION 1: HEADER --- */}
            <section className="relative pt-18 pb-14 px-6 text-center">
                {/* Background Subtle Accents */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,_rgba(249,115,22,0.1),_transparent_60%)]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 space-y-6 mt-12"
                >
                    {/* Animated Gradient Badge */}
                    <div className="flex justify-center">
                        <div className="relative inline-flex items-center justify-center rounded-full overflow-hidden p-[2px]">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-[-100%] z-0"
                                style={{ background: "conic-gradient(from 0deg, #f97316, #111111, #f97316)" }}
                            />
                            <div className="relative z-10 px-6 py-2 rounded-full bg-[#111111] border border-gray-800 flex items-center gap-2">
                                <Cpu size={14} className="text-[#f97316]" />
                                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400">Chain21 Core Foundations</span>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tight uppercase leading-none">
                        Mission <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-orange-400">&</span> Vision
                    </h1>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-[#f97316] to-orange-500 mx-auto rounded-full mt-4" />
                </motion.div>
            </section>

            {/* --- SECTION 2: THE CARDS --- */}
            <section className="pb-18 px-6">
                <motion.div
                    variants={containerVars}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-12"
                >

                    {/* OUR MISSION CARD */}
                    <motion.div
                        variants={itemVars}
                        whileHover={{ y: -8 }}
                        className="group relative p-8 md:p-14 rounded-[3rem] bg-[#111111] border border-gray-800 hover:border-gray-600 hover:bg-[#0a0a0a] hover:shadow-[0_20px_50px_rgba(249,115,22,0.08)] transition-all duration-500 overflow-hidden"
                    >
                        {/* Subtle Hover Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#f97316] to-orange-600 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500" />

                        <div className="space-y-8 relative z-10 flex flex-col h-full">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] bg-slate-900 border border-gray-800 shadow-xl flex items-center justify-center text-[#f97316] mb-4 group-hover:rotate-12 transition-transform duration-500">
                                <Target size={36} />
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-[#f97316] font-black tracking-widest uppercase text-xs md:text-sm">Our Mission</h2>
                                <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight tracking-tight">
                                    Empowering Creators & Audiences Through Web3
                                </h3>
                            </div>

                            <p className="text-gray-400 text-base md:text-lg leading-relaxed text-justify flex-grow">
                                To build Chain21 as a decentralized ecosystem that empowers filmmakers, content creators, and global audiences by leveraging blockchain technology and transparent ownership.
                            </p>

                            <div className="pt-6 border-t border-gray-800 flex items-center justify-between text-gray-500 group-hover:text-[#f97316] transition-colors">
                                <div className="flex items-center gap-2">
                                    <Globe size={18} />
                                    <span className="text-xs font-bold uppercase tracking-widest">Global Outreach</span>
                                </div>
                                <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </div>
                        </div>

                        {/* Bottom accent line */}
                        <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r from-[#f97316] to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </motion.div>

                    {/* OUR VISION CARD */}
                    <motion.div
                        variants={itemVars}
                        whileHover={{ y: -8 }}
                        className="group relative p-8 md:p-14 rounded-[3rem] bg-[#111111] border border-gray-800 hover:border-gray-600 hover:bg-[#0a0a0a] hover:shadow-[0_20px_50px_rgba(59,130,246,0.08)] transition-all duration-500 overflow-hidden"
                    >
                        {/* Subtle Hover Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500" />

                        <div className="space-y-8 relative z-10 flex flex-col h-full">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] bg-slate-900 border border-gray-800 shadow-xl flex items-center justify-center text-blue-500 mb-4 group-hover:-rotate-12 transition-transform duration-500">
                                <Rocket size={36} />
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-blue-500 font-black tracking-widest uppercase text-xs md:text-sm">Our Vision</h2>
                                <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight tracking-tight">
                                    Becoming the World's Leading Decentralized Platform
                                </h3>
                            </div>

                            <p className="text-gray-400 text-base md:text-lg leading-relaxed text-justify flex-grow">
                                To establish Chain21 as the top global platform where decentralized control, transparency, and Web3 incentives drive the future of digital entertainment and assets.
                            </p>

                            <div className="pt-6 border-t border-gray-800 flex items-center justify-between text-gray-500 group-hover:text-blue-500 transition-colors">
                                <div className="flex items-center gap-2">
                                    <Sparkles size={18} />
                                    <span className="text-xs font-bold uppercase tracking-widest">Future Ready</span>
                                </div>
                                <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </div>
                        </div>

                        {/* Bottom accent line */}
                        <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </motion.div>

                </motion.div>
            </section>

        </div>
    );
};

export default MissionVision;