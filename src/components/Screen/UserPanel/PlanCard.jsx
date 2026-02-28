// /* eslint-disable react/prop-types */

// import { getMoneySymbol } from "../../../utils/additionalFunc";


// const PlanCard = ({ plan, onSelect, isAdmin=false }) => {
//   console.log(plan)
//   const isRecommended = plan.recommended;
//   const inActive = plan.status === false;

//   return (
//     <div
//       className={`
//             bg-slate-800/40 backdrop-blur-lg border rounded-2xl p-6 flex flex-col relative
//             ${
//               isRecommended
//                 ? "border-blue-500/80 shadow-2xl shadow-blue-600/20"
//                 : "border-slate-700/50"
//             } 
//         `}
//     >
//       {inActive && (
//         <span className=" absolute top-0 left-6 -mt-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">Inactive</span>
//       )}
//       {isRecommended && (
//         <div className="absolute top-0 right-6 -mt-3 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
//           Best Value
//         </div>
//       )}

//       <h3 className="text-xl font-bold text-white text-center uppercase">{plan.title}</h3>
//       <p className="text-5xl font-bold text-white text-center my-6">
//         {getMoneySymbol()}{plan.min}
//         {/* <span className="text-base font-normal text-slate-400"> / min</span> */}
//       </p>

//       <ul className="space-y-3 text-slate-300 text-sm mb-8 flex-grow">
//         {plan.features.map((feature, index) => (
//           <li key={index} className="flex items-center gap-3">
//             <i className="fa-solid fa-check-circle text-green-400"></i>
//             <span>{feature}</span>
//           </li>
//         ))}
//       </ul>

//       <button
//         onClick={() => onSelect(plan)}
//         className={`
//                     w-full py-3 rounded-xl font-semibold transition-colors
//                     ${
//                       isRecommended
//                         ? "bg-blue-600 hover:bg-blue-500 cursor-pointer text-white shadow-lg shadow-blue-600/30"
//                         : "bg-slate-700/70 hover:bg-slate-700 cursor-pointer text-white"
//                     }
//                 `}
//       >
//         {isAdmin ? "Edit Plan" : "Invest Now"}
//       </button>
//     </div>
//   );
// };

// export default PlanCard;

/* eslint-disable react/prop-types */
import { getMoneySymbol } from "../../../utils/additionalFunc";
import { Check, Diamond, ShieldCheck, Edit3, Lock } from "lucide-react";

const PlanCard = ({ plan, onSelect, isAdmin = false }) => {
  const isRecommended = plan.recommended;
  const inActive = plan.status === false;

  return (
    <div
      className={`
            relative flex flex-col h-full bg-[#0a0a0a] border rounded-[2rem] p-8 transition-all duration-500 group overflow-hidden
            ${
              isRecommended
                ? "border-[#FFD700] shadow-[0_0_30px_rgba(212,175,55,0.15)]"
                : "border-[#2a2a2a] hover:border-[#B8860B]/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.05)]"
            } 
        `}
    >
      {/* Ambient Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#B8860B] opacity-[0.03] blur-[80px] rounded-full pointer-events-none group-hover:opacity-[0.06] transition-opacity"></div>

      {/* Top Gold Bar for Recommended */}
      {isRecommended && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B8860B] via-[#FFD700] to-[#B8860B]"></div>
      )}

      {/* Status Badges */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        {inActive ? (
          <span className="bg-red-500/10 border border-red-500/30 text-red-500 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-2">
            <Lock size={12} /> Inactive Protocol
          </span>
        ) : (
          <div className={`p-3 rounded-xl border ${isRecommended ? 'bg-[#FFD700] border-[#FFD700] text-black' : 'bg-[#1a1a1a] border-[#2a2a2a] text-[#B8860B]'}`}>
            {isRecommended ? <Diamond size={24} /> : <ShieldCheck size={24} />}
          </div>
        )}

        {isRecommended && (
          <div className="bg-[#FFD700] text-black text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg">
            Best Value
          </div>
        )}
      </div>

      {/* Plan Title & Price */}
      <div className="text-center mb-8 relative z-10">
        <h3 className="text-xl font-bold text-white uppercase tracking-widest font-rajdhani mb-2">{plan.title}</h3>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-2xl font-bold text-[#B8860B]">{getMoneySymbol()}</span>
          <span className="text-5xl font-bold text-white font-rajdhani">{plan.min}</span>
        </div>
        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-2">Minimum Entry</p>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#2a2a2a] to-transparent mb-8"></div>

      {/* Features List */}
      <ul className="space-y-4 mb-8 flex-grow relative z-10">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
            <div className="mt-0.5 p-0.5 rounded-full bg-[#B8860B]/20">
                <Check size={12} className="text-[#FFD700]" strokeWidth={3} />
            </div>
            <span className="font-medium">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Action Button */}
      <button
        onClick={() => onSelect(plan)}
        className={`
            w-full py-4 rounded-xl font-bold font-rajdhani text-lg uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden z-10
            ${
              isRecommended
                ? "bg-gradient-to-r from-[#B8860B] to-[#FFD700] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:-translate-y-1"
                : "bg-[#1a1a1a] text-white border border-[#2a2a2a] hover:bg-[#B8860B]/10 hover:border-[#B8860B] hover:text-[#FFD700]"
            }
        `}
      >
        {isAdmin ? (
            <>
                <Edit3 size={18} /> Modify Protocol
            </>
        ) : (
            "Initialize Plan"
        )}
        
        {/* Shimmer Effect for Recommended Button */}
        {isRecommended && (
            <div className="absolute inset-0 bg-white/20 translate-y-full hover:translate-y-0 transition-transform duration-300"></div>
        )}
      </button>
    </div>
  );
};

export default PlanCard;