// import React from "react";
// import UserIncomeHistory from "./UserIncomeHistory";

// const LeadershipIncome = () => {
//   return (
//     <div className="space-y-6">
//       <div className="relative overflow-hidden rounded-3xl border border-yellow-500/20 bg-black/40 p-8 backdrop-blur-xl">
//         <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl bg-yellow-600/20" />
//         <div className="relative z-10 flex items-center gap-6">
//           <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-yellow-500/30 bg-white/5 text-3xl text-yellow-500">
//             <i className="fa-solid fa-trophy"></i>
//           </div>
//           <div>
//             <h1 className="text-3xl font-bold text-white">Leadership Rewards</h1>
//             <p className="text-yellow-500 font-medium uppercase text-xs tracking-widest mt-1">Rank-Based Assets</p>
//             <p className="text-slate-400 text-sm mt-2 max-w-xl">
//               Achieve ranks like Senior or Manager to unlock rewards ranging from Latest Laptops to Mahindra EVs[cite: 103].
//             </p>
//           </div>
//         </div>
//       </div>
//       <UserIncomeHistory type="LEADERSHIP_BONUS" />
//     </div>
//   );
// };

// export default LeadershipIncome;


import React from "react";
import UserIncomeHistory from "./UserIncomeHistory";

const LeadershipIncome = () => {
  const rewards = [
    { rank: "Fresher", reward: "Tablet", icon: "fa-solid fa-tablet-screen-button" },
    { rank: "Starter", reward: "Samsung Mobile", icon: "fa-solid fa-mobile-screen-button" },
    { rank: "Junior", reward: "Latest Laptop", icon: "fa-solid fa-laptop" },
    { rank: "Senior", reward: "Yamaha FZS", icon: "fa-solid fa-motorcycle" },
    { rank: "Manager", reward: "Royal Enfield", icon: "fa-solid fa-motorcycle" },
    { rank: "Zonal Manager", reward: "Tata Tigor", icon: "fa-solid fa-car" },
    { rank: "Business Head", reward: "MG Windsor", icon: "fa-solid fa-car-side" },
    { rank: "Director", reward: "Mahindra 9xE", icon: "fa-solid fa-car-rear" },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-3xl border border-yellow-500/20 bg-black/40 p-8 backdrop-blur-xl">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl bg-yellow-600/20" />
        <div className="relative z-10 flex items-center gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-yellow-500/30 bg-white/5 text-3xl text-yellow-500">
            <i className="fa-solid fa-trophy"></i>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white uppercase tracking-tight">Leadership Rewards</h1>
            <p className="text-yellow-500 font-medium uppercase text-xs tracking-widest mt-1">Rank-Based Physical Assets</p>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Achieve milestones and unlock premium rewards ranging from high-end electronics to luxury electric vehicles.
            </p>
          </div>
        </div>
      </div>

      {/* Visual Rewards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {rewards.map((item, index) => (
          <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center group hover:border-yellow-500/50 transition-all duration-300">
            <div className="mb-3 p-3 rounded-full bg-yellow-500/10 text-yellow-500 group-hover:scale-110 transition-transform">
              <i className={`${item.icon} text-xl`}></i>
            </div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wide">{item.rank}</h3>
            <p className="text-slate-400 text-[10px] mt-1 uppercase">{item.reward}</p>
          </div>
        ))}
      </div>

      {/* History Table */}
      <div className="rounded-3xl border border-white/5 bg-black/20 p-1">
        <UserIncomeHistory type="LEADERSHIP_BONUS" />
      </div>
    </div>
  );
};

export default LeadershipIncome;