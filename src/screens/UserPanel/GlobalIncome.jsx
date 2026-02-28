import React from "react";
import UserIncomeHistory from "./UserIncomeHistory";

const GlobalIncome = () => {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-black/40 p-8 backdrop-blur-xl">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl bg-emerald-600/20" />
        <div className="relative z-10 flex items-center gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-white/5 text-3xl text-emerald-400">
            <i className="fa-solid fa-globe"></i>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Global Income</h1>
            <p className="text-emerald-400 font-medium uppercase text-xs tracking-widest mt-1">Company Turnover Share</p>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Earn daily rewards from the company's global turnover. Achieve Rank 5 or 6 to share a 0.50% pool, or reach Rank 7 or 8 to participate in an exclusive 1.00% pool of the total daily business volume.
            </p>
          </div>
        </div>
      </div>
      <UserIncomeHistory type="globalIncome" />
    </div>
  );
};

export default GlobalIncome;