// import React from 'react';
// import { motion } from 'framer-motion';
// import { 
//   LayoutDashboard, 
//   Activity, 
//   BarChart3, 
//   ShieldCheck, 
//   Terminal,
//   MousePointer2,
//   PieChart
// } from 'lucide-react';
// import x3 from '../../../assets/Landing/dashboard.jpg';

// const Convenient = () => {
//   return (
//     <section className="relative py-24 bg-white overflow-hidden selection:bg-[#bc13fe] selection:text-white" id="dashboard">
      
//       {/* 1. LIGHT-THEME BACKGROUND ACCENTS */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-blue-50/40 rounded-full blur-[160px] opacity-50" />
//         <div 
//           className="absolute inset-0 opacity-[0.5]" 
//           style={{ 
//             backgroundImage: `radial-gradient(#e2e8f0 1.2px, transparent 1.2px)`,
//             backgroundSize: '40px 40px'
//           }} 
//         />
//       </div>

//       <div className="relative z-10 container mx-auto px-6 lg:px-[115px]">
        
//         {/* HEADER SECTION */}
//         <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto text-center mb-20">
//           <motion.div 
//             initial={{ opacity: 0, y: -20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="flex flex-col items-center gap-4"
//           >
//             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-bold tracking-[0.3em] uppercase">
//               <Terminal size={12} /> Management Interface
//             </div>
            
//             <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight uppercase">
//               Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Dashboard</span>
//             </h2>
//             <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
//           </motion.div>

//           <motion.p 
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="text-slate-500 text-lg md:text-xl font-light leading-relaxed max-w-2xl"
//           >
//             Real-time visualization of your <span className="text-blue-600 font-medium">film assets</span>, 
//             distribution performance, and ecosystem growth with advanced on-chain analytics.
//           </motion.p>
//         </div>

//         {/* 2. DASHBOARD PREVIEW - CLEAN SOFTWARE LOOK */}
//         <motion.div 
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//           className="relative max-w-5xl mx-auto group"
//         >
//           {/* Subtle Outer Glow */}
//           <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000" />
          
//           <div className="relative rounded-[2rem] border border-slate-200 bg-white p-2 shadow-[0_30px_70px_rgba(0,0,0,0.08)] overflow-hidden">
            
//             {/* Top Navigation Bar of the "Software Window" */}
//             <div className="h-12 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between px-6">
//               <div className="flex gap-2">
//                 <div className="w-3 h-3 rounded-full bg-slate-200" />
//                 <div className="w-3 h-3 rounded-full bg-slate-200" />
//                 <div className="w-3 h-3 rounded-full bg-slate-200" />
//               </div>
//               <div className="flex items-center gap-2">
//                 <ShieldCheck size={14} className="text-blue-600" />
//                 <span className="text-[10px] tracking-widest uppercase text-slate-400 font-bold">CHAIN21 Portal Secure Connection</span>
//               </div>
//               <div className="w-12" /> {/* Balancing spacer */}
//             </div>

//             {/* The Image Container */}
//             <div className="relative overflow-hidden bg-slate-50 rounded-b-[1.5rem]">
//               <motion.img 
//                 whileHover={{ scale: 1.01 }}
//                 transition={{ duration: 0.8 }}
//                 className="w-full h-auto mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity" 
//                 src={x3} 
//                 alt="CHAIN21 Premium Dashboard" 
//               />
              
//               {/* Floating Interaction Hint */}
//               <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce">
//                 <MousePointer2 size={18} className="text-blue-600" />
//                 <span className="text-xs font-bold text-slate-700 tracking-tight">Interactive Analytics</span>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* 3. DASHBOARD KEY FEATURES - STAT CARDS */}
//         {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20 max-w-5xl mx-auto">
//           {[
//             { icon: BarChart3, label: "Live Analytics", color: "blue" },
//             { icon: Activity, label: "Asset Tracking", color: "purple" },
//             { icon: PieChart, label: "Revenue Share", color: "indigo" },
//             { icon: ShieldCheck, label: "Audit Logs", color: "violet" }
//           ].map((item, idx) => (
//             <motion.div 
//               key={idx}
//               whileHover={{ y: -8 }}
//               className="flex flex-col items-center gap-4 p-8 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
//             >
//               <div className={`p-4 rounded-2xl bg-${item.color}-50 text-${item.color}-600 group-hover:scale-110 transition-transform`}>
//                 <item.icon size={24} />
//               </div>
//               <span className="text-xs font-black tracking-[0.2em] uppercase text-slate-400 group-hover:text-slate-900 transition-colors">
//                 {item.label}
//               </span>
//             </motion.div>
//           ))}
//         </div> */}
//       </div>
//     </section>
//   );
// };

// export default Convenient;


import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Activity, 
  BarChart3, 
  ShieldCheck, 
  Terminal,
  MousePointer2,
  PieChart,
  Cpu,
  ChevronRight
} from 'lucide-react';
import x3 from '../../../assets/Landing/dashboard.jpg';

const Convenient = () => {
  const stats = [
    { icon: BarChart3, label: "Live Analytics", color: "from-blue-500 to-blue-600", bg: "bg-blue-50" },
    { icon: Activity, label: "Asset Tracking", color: "from-purple-500 to-purple-600", bg: "bg-purple-50" },
    { icon: PieChart, label: "Revenue Share", color: "from-indigo-500 to-indigo-600", bg: "bg-indigo-50" },
    { icon: ShieldCheck, label: "Audit Logs", color: "from-cyan-500 to-cyan-600", bg: "bg-cyan-50" }
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
    <section className="relative py-18 md:py-24 bg-white overflow-hidden selection:bg-[#bc13fe] selection:text-white" id="dashboard">
      
      {/* 1. PREMIUM LIGHT-THEME BACKGROUND ACCENTS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(59,130,246,0.04),_transparent_70%)]" />
        <div 
          className="absolute inset-0 opacity-[0.4]" 
          style={{ 
            backgroundImage: `radial-gradient(#e2e8f0 1.2px, transparent 1.2px)`,
            backgroundSize: '40px 40px'
          }} 
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-[115px]">
        
        {/* HEADER SECTION - Unified with previous pages */}
        <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6"
          >
            {/* Rotating Gradient Border Badge */}
            <div className="relative inline-flex items-center justify-center rounded-full overflow-hidden p-[2px]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-100%] z-0"
                style={{ background: "conic-gradient(from 0deg, #3b82f6, #bc13fe, #3b82f6)" }}
              />
              <div className="relative z-10 px-6 py-2 rounded-full bg-white flex items-center gap-2">
                <Cpu size={14} className="text-blue-600" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500">Enterprise Interface</span>
              </div>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-tight uppercase">
              Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-700">Dashboard</span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg md:text-xl font-light leading-relaxed max-w-2xl"
          >
            Real-time visualization of your <span className="text-blue-600 font-medium">film assets</span>, 
            distribution performance, and ecosystem growth with advanced on-chain analytics.
          </motion.p>
        </div>

        {/* 2. DASHBOARD PREVIEW - CLEAN SOFTWARE LOOK */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", damping: 25 }}
          className="relative max-w-5xl mx-auto group"
        >
          {/* Subtle Outer Glow */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000" />
          
          <div className="relative rounded-[2.5rem] border border-slate-200 bg-white p-3 shadow-[0_30px_70px_rgba(0,0,0,0.08)] overflow-hidden">
            
            {/* Top Navigation Bar of the "Software Window" */}
            <div className="h-12 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between px-8">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-200" />
                <div className="w-3 h-3 rounded-full bg-slate-200" />
                <div className="w-3 h-3 rounded-full bg-slate-200" />
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-blue-600" />
                <span className="text-[10px] tracking-widest uppercase text-slate-400 font-black italic">CHAIN21 Portal Secure Connection</span>
              </div>
              <div className="w-12" /> 
            </div>

            {/* The Image Container */}
            <div className="relative overflow-hidden bg-slate-50 rounded-b-[2rem]">
              <motion.img 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.8 }}
                className="w-full h-auto brightness-[0.98] contrast-[1.02] group-hover:brightness-100 transition-all duration-700" 
                src={x3} 
                alt="CHAIN21 Premium Dashboard" 
              />
              
              {/* Floating Interaction Hint */}
              <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white flex items-center gap-4 animate-bounce">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <MousePointer2 size={18} />
                </div>
                <div className="flex flex-col pr-2">
                  <span className="text-xs font-black text-slate-900 uppercase">Interactive Mode</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Click to expand data</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        
      </div>
    </section>
  );
};

export default Convenient;