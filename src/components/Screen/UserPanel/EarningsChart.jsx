// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
// } from "chart.js";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { getMoneySymbol } from "../../../utils/additionalFunc";
// import { setLoading } from "../../../redux/slices/loadingSlice";
// import { getIncomeWeakData } from "../../../api/user.api";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// const EarningsChart = () => {
//   const dispatch = useDispatch();

//   const [chartData, setChartData] = useState({
//     labels: [],
//     datasets: [],
//   });

//   useEffect(() => {
//     const fetchIncomeWeekTotal = async () => {
//       try {
//         dispatch(setLoading(true));
//         const response = await getIncomeWeakData();

//         const rawData = response?.data || [];

//         const labels = rawData.map((item) => item.date);
//         const dataPoints = rawData.map((item) =>
//           parseFloat(item.count.toFixed(2))
//         );

//         setChartData({
//           labels,
//           datasets: [
//             {
//               label: `Earnings (${getMoneySymbol()})`,
//               data: dataPoints,
//               borderColor: "#38bdf8",
//               backgroundColor: (context) => {
//                 const ctx = context.chart.ctx;
//                 const gradient = ctx.createLinearGradient(0, 0, 0, 200);
//                 gradient.addColorStop(0, "rgba(56, 189, 248, 0.4)");
//                 gradient.addColorStop(1, "rgba(56, 189, 248, 0)");
//                 return gradient;
//               },
//               tension: 0.4,
//               fill: true,
//               pointBackgroundColor: "#38bdf8",
//               pointBorderColor: "#fff",
//               pointHoverRadius: 7,
//               pointRadius: 5,
//             },
//           ],
//         });
//       } catch (err) {
//         console.error("Error fetching weekly income data:", err);
//       } finally {
//         dispatch(setLoading(false));
//       }
//     };

//     fetchIncomeWeekTotal();
//   }, [dispatch]);

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: false },
//     },
//     scales: {
//       x: {
//         grid: { color: "rgba(255, 255, 255, 0.1)" },
//         ticks: { color: "#94a3b8" },
//       },
//       y: {
//         grid: { color: "rgba(255, 255, 255, 0.1)" },
//         ticks: {
//           color: "#94a3b8",
//           callback: function (value) {
//             return "$" + value;
//           },
//         },
//       },
//     },
//   };

//   return (
//     <div className="bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6 h-100">
//       <h2 className="text-xl font-semibold text-white mb-4">
//         Earnings Overview
//       </h2>
//       <Line data={chartData} options={options} />
//     </div>
//   );
// };

// export default EarningsChart;


// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
// } from "chart.js";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getMoneySymbol } from "../../../utils/additionalFunc";
import { setLoading } from "../../../redux/slices/loadingSlice";
import { getIncomeWeakData } from "../../../api/user.api";
import { TrendingUp, Activity } from "lucide-react";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

const EarningsChart = () => {
  const dispatch = useDispatch();
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    const fetchIncomeWeekTotal = async () => {
      try {
        dispatch(setLoading(true));
        const response = await getIncomeWeakData();
        const rawData = response?.data || [];
        setWeeklyData(rawData);
      } catch (err) {
        console.error("Error fetching weekly income data:", err);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchIncomeWeekTotal();
  }, [dispatch]);

  return (
    <div className="bg-[#0c0c0c] border border-white/5 rounded-[2rem] p-8 h-[400px] shadow-2xl relative overflow-hidden group">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37] opacity-[0.03] blur-[80px] rounded-full pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-500"></div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-[#D4AF37]/10 rounded-lg border border-[#D4AF37]/20">
                <Activity size={20} className="text-[#D4AF37]" />
            </div>
            <div>
                <h2 className="text-xl font-bold font-rajdhani text-white uppercase tracking-wide">
                Earnings <span className="text-[#D4AF37]">Metrics</span>
                </h2>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">7-Day Performance</p>
            </div>
        </div>
        
        {/* Live Indicator */}
        <div className="flex items-center gap-2 px-3 py-1 bg-[#050505] rounded-full border border-white/10">
            <span className="w-1.5 h-1.5 bg-[#00FF88] rounded-full animate-pulse"></span>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Live Feed</span>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative h-[280px] w-full z-10">
        {weeklyData.length > 0 ? (
          <div className="space-y-3">
            {weeklyData.map((item, index) => {
              const date = new Date(item.date);
              const dayName = date.toLocaleDateString("en-US", { weekday: 'short' });
              const amount = parseFloat(item.count.toFixed(2));
              const maxAmount = Math.max(...weeklyData.map(d => d.count));
              const percentage = (amount / maxAmount) * 100;
              
              return (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 font-bold w-10">{dayName}</span>
                  <div className="flex-1 bg-[#1a1a1a] rounded-full h-8 overflow-hidden border border-white/5">
                    <div 
                      className="h-full bg-gradient-to-r from-[#B8860B] to-[#FFD700] flex items-center justify-end px-3 transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    >
                      {percentage > 20 && (
                        <span className="text-xs font-bold text-black">{getMoneySymbol()}{amount}</span>
                      )}
                    </div>
                  </div>
                  {percentage <= 20 && (
                    <span className="text-xs font-bold text-[#FFD700] w-16">{getMoneySymbol()}{amount}</span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
           <div className="h-full w-full flex flex-col items-center justify-center text-gray-600">
              <Activity className="animate-pulse mb-2 opacity-20" size={48} />
              <p className="text-xs uppercase tracking-widest font-bold">Syncing Data...</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default EarningsChart;