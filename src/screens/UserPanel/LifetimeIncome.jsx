// import React from "react";
// import UserIncomeHistory from "./UserIncomeHistory";

// const LifetimeIncome = () => {
//   return (
//     <div className="space-y-6">
//       <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-black/40 p-8 backdrop-blur-xl">
//         <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl bg-blue-600/20" />
//         <div className="relative z-10 flex items-center gap-6">
//           <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/30 bg-white/5 text-3xl text-blue-400">
//             <i className="fa-solid fa-calendar-check"></i>
//           </div>
//           <div>
//             <h1 className="text-3xl font-bold text-white">Lifetime Bonus</h1>
//             <p className="text-blue-400 font-medium uppercase text-xs tracking-widest mt-1">Monthly Salary Reward</p>
//             <p className="text-slate-400 text-sm mt-2 max-w-xl">
//               Monthly rewards (e.g., $1,500 for Senior rank) provided for 6 months based on maintained business[cite: 100, 124].
//             </p>
//           </div>
//         </div>
//       </div>
//       <UserIncomeHistory type="LIFETIME_BONUS" />
//     </div>
//   );
// };

// export default LifetimeIncome;


import React from "react";
import UserIncomeHistory from "./UserIncomeHistory";

const LifetimeIncome = () => {
  const lifetimeRewards = [
    { rank: "Fresher", business: "$15,000", reward: "$150.00" },
    { rank: "Starter", business: "$35,000", reward: "$350.00" },
    { rank: "Junior", business: "$75,000", reward: "$750.00" },
    { rank: "Senior", business: "$1,50,000", reward: "$1,500.00" },
    { rank: "Manager", business: "$3,00,000", reward: "$3,000.00" },
    { rank: "Zonal Manager", business: "$6,00,000", reward: "$6,000.00" },
    { rank: "Business Head", business: "$15,00,000", reward: "$15,000.00" },
    { rank: "Director", business: "$30,00,000", reward: "$25,000.00" },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-black/40 p-8 backdrop-blur-xl">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl bg-blue-600/20" />
        <div className="relative z-10 flex items-center gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/30 bg-white/5 text-3xl text-blue-400">
            <i className="fa-solid fa-calendar-check"></i>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white uppercase tracking-tight">Lifetime Bonus</h1>
            <p className="text-blue-400 font-medium uppercase text-xs tracking-widest mt-1">Monthly Salary Reward</p>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Achieve business milestones to unlock monthly rewards provided for 6 months[cite: 100, 124]. 
              <span className="block mt-1 text-[10px] text-blue-300 italic">*Business counted 60% from power leg and 40% from rest other leg.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {lifetimeRewards.map((item, index) => (
          <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-5 group hover:border-blue-500/50 transition-all duration-300">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{item.rank}</span>
              <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-500 uppercase">Target Business</p>
              <p className="text-lg font-bold text-white">{item.business} </p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/5">
              <p className="text-[10px] text-slate-500 uppercase">Monthly Income</p>
              <p className="text-xl font-black text-blue-400">{item.reward} </p>
            </div>
          </div>
        ))}
      </div>

      {/* History Table */}
      <div className="rounded-3xl border border-white/5 bg-black/20 p-1">
        <UserIncomeHistory type="LIFETIME_BONUS" />
      </div>
    </div>
  );
};

export default LifetimeIncome;