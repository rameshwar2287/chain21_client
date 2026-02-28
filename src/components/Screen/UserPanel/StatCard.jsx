// /* eslint-disable react/prop-types */

// import { useNavigate } from "react-router-dom";
// import { NumberFormatCommas } from "../../../utils/FormatText";

// const StatCard = ({
//   title,
//   value,
//   icon,
//   iconImage,
//   change,
//   changeType,
//   isMoney,
//   path,
//   data
// }) => {
//   const isPositive = changeType === "positive";
//   const navigate = useNavigate();

//   const handleNavigate = () => {
//     navigate(path, { state: data });
//   };

//   return (
//     <div 
//       className="card hero-glass cursor-pointer hover-gold-shadow transition-all duration-300" 
//       onClick={handleNavigate}
//     >
//       <div className="flex items-center gap-4">
//         {iconImage ? (
//           <div className="w-12 h-12 flex items-center justify-center rounded-full bg-space-cadet/50 border border-glass-border">
//             <img
//               src={iconImage}
//               alt={title}
//               className="w-8 h-8 object-contain"
//             />
//           </div>
//         ) : (
//           <div className="w-12 h-12 flex items-center justify-center rounded-full bg-space-cadet/50 border border-glass-border">
//             <img src={icon} className="w-8 h-8 object-contain" alt="" />
//           </div>
//         )}
//         <div className="flex-1">
//           <p className="text-sm text-hero-secondary">{title}</p>
//           <p className="text-2xl font-bold text-hero-primary gradient-text">
//             <NumberFormatCommas value={value} decimalScale={isMoney ? 2 : 0} />
//           </p>
//         </div>
//       </div>
//       {change && (
//         <div
//           className={`mt-4 text-xs flex items-center font-semibold ${
//             isPositive ? "text-stat-active" : "text-red-400"
//           }`}
//         >
//           <i
//             className={`fa-solid ${
//               isPositive ? "fa-arrow-up" : "fa-arrow-down"
//             } mr-1`}
//           ></i>
//           {change} in last 7 days
//         </div>
//       )}
//     </div>
//   );
// };

// export default StatCard;

/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { NumberFormatCommas } from "../../../utils/FormatText";
import { TrendingUp, TrendingDown } from "lucide-react"; // Modern Icons

const StatCard = ({
  title,
  value,
  icon: Icon, // Can be a component or a string URL
  iconImage,  // Legacy support for direct image URLs
  change,
  changeType,
  isMoney,
  path,
  data
}) => {
  const isPositive = changeType === "positive";
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (path) navigate(path, { state: data });
  };

  // Helper to render the icon correctly whether it's an image URL or a Lucide Component
  const renderIcon = () => {
    if (iconImage) {
      return <img src={iconImage} alt={title} className="w-6 h-6 object-contain" />;
    }
    if (typeof Icon === 'string') {
       return <img src={Icon} alt={title} className="w-6 h-6 object-contain" />;
    }
    if (Icon) {
       // Render as React Component (Lucide)
       return <Icon size={24} className="text-[#FFD700]" />;
    }
    return null;
  };

  return (
    <div 
      className="group relative bg-[#0a0a0a] border border-[#2a2a2a] p-6 rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 hover:border-[#B8860B]/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] hover:-translate-y-1" 
      onClick={handleNavigate}
    >
      {/* Ambient Background Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#B8860B] opacity-[0.03] blur-[50px] group-hover:opacity-[0.08] transition-opacity pointer-events-none"></div>

      <div className="flex items-center gap-5 relative z-10">
        
        {/* Icon Container */}
        <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-black border border-[#2a2a2a] group-hover:border-[#FFD700] transition-colors shadow-lg shrink-0">
          {renderIcon()}
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1 truncate group-hover:text-[#FFD700] transition-colors">
            {title}
          </p>
          <p className="text-2xl font-bold text-white font-rajdhani truncate">
            <NumberFormatCommas value={value} decimalScale={isMoney ? 2 : 0} />
          </p>
        </div>
      </div>

      {/* Change Indicator (Optional) */}
      {change && (
        <div className="mt-4 pt-3 border-t border-[#2a2a2a] flex items-center gap-3">
          <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded ${isPositive ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"}`}>
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{change}</span>
          </div>
          <span className="text-[9px] text-gray-600 font-bold uppercase tracking-wider">vs last 7 days</span>
        </div>
      )}
      
      {/* Decorative Bottom Gold Line */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

export default StatCard;