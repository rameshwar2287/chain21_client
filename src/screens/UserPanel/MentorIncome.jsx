import React from "react";
import { AlertCircle } from "lucide-react";

const MentorIncome = () => {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-gray-500/20 bg-black/40 p-8 backdrop-blur-xl">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl bg-gray-600/20" />
        <div className="relative z-10 flex items-center gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-500/30 bg-white/5 text-3xl text-gray-400">
            <i className="fa-solid fa-chalkboard-user"></i>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Mentor Bonus</h1>
            <p className="text-gray-400 font-medium uppercase text-xs tracking-widest mt-1">Feature Disabled</p>
          </div>
        </div>
      </div>
      
      {/* Disabled Notice */}
      <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-yellow-500 mb-2">Feature Currently Disabled</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              The Mentor Bonus feature is currently disabled. Please contact support for more information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorIncome;