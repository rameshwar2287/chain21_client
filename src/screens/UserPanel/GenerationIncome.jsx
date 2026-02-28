// // import React from "react";
// // import UserIncomeHistory from "./UserIncomeHistory";

// // const GenerationIncome = () => {
// //   return (
// //     <div className="space-y-6">
// //       <div className="relative overflow-hidden rounded-3xl border border-purple-500/20 bg-black/40 p-8 backdrop-blur-xl">
// //         <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl bg-purple-600/20" />
// //         <div className="relative z-10 flex items-center gap-6">
// //           <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-500/30 bg-white/5 text-3xl text-purple-400">
// //             <i className="fa-solid fa-sitemap"></i>
// //           </div>
// //           <div>
// //             <h1 className="text-3xl font-bold text-white">Generation Bonus</h1>
// //             <p className="text-purple-400 font-medium uppercase text-xs tracking-widest mt-1">20-Level Network Earnings</p>
// //             <p className="text-slate-400 text-sm mt-2 max-w-xl">
// //               Earn from 15% at Level 1 down to 1% at Level 20. Note: Each direct referral unlocks 2 levels.
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //       <UserIncomeHistory type="GENERATION_BONUS" />
// //     </div>
// //   );
// // };

// // export default GenerationIncome;


// import React from "react";
// import UserIncomeHistory from "./UserIncomeHistory";

// const GenerationIncome = () => {
//   const generationLevels = [
//     { level: "1st Level", bonus: "15%" },
//     { level: "2nd Level", bonus: "10%" },
//     { level: "3rd Level", bonus: "07%" },
//     { level: "4th Level", bonus: "06%" },
//     { level: "6th to 8th Level", bonus: "04%" },
//     { level: "9th to 14th Level", bonus: "03%" },
//     { level: "15th to 17th Level", bonus: "02%" },
//     { level: "18th to 20th Level", bonus: "01%" },
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Header Section */}
//       <div className="relative overflow-hidden rounded-3xl border border-purple-500/20 bg-black/40 p-8 backdrop-blur-xl">
//         <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl bg-purple-600/20" />
//         <div className="relative z-10 flex items-center gap-6">
//           <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-500/30 bg-white/5 text-3xl text-purple-400">
//             <i className="fa-solid fa-sitemap"></i>
//           </div>
//           <div>
//             <h1 className="text-3xl font-bold text-white uppercase tracking-tight">Generation Bonus</h1>
//             <p className="text-purple-400 font-medium uppercase text-xs tracking-widest mt-1">20-Level Network Earnings</p>
//             <p className="text-slate-400 text-sm mt-2 max-w-xl">
//               Earn residual income through 20 levels of depth. 
//               <span className="block mt-2 font-bold text-purple-300 uppercase text-[10px] tracking-tighter bg-purple-500/10 px-2 py-1 rounded inline-block">
//                 Note: Each direct referral unlocks 2 levels of income.
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Bonus Percentages Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//         {generationLevels.map((item, index) => (
//           <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center group hover:border-purple-500/50 transition-all duration-300">
//             <span className="text-[10px] text-slate-500 uppercase mb-1">{item.level}</span>
//             <p className="text-2xl font-black text-white group-hover:text-purple-400 transition-colors">
//               {item.bonus}
//             </p>
//             <span className="text-[8px] text-purple-400 font-bold uppercase tracking-widest mt-1">Bonus</span>
//           </div>
//         ))}
//       </div>

//       {/* History Table */}
//       <div className="rounded-3xl border border-white/5 bg-black/20 p-1">
//         <UserIncomeHistory type="GENERATION_BONUS" />
//       </div>
//     </div>
//   );
// };

// export default GenerationIncome;


import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setLoading } from "../../redux/slices/loadingSlice";
import { getAllUserLevelIncomeHistory } from "../../api/user.api";
import { AuthenticatedAdminRouters } from "../../constants/routes";
import StatCard from "../../components/Screen/UserPanel/StatCard";
import DataTable from "../../components/Screen/UserPanel/DataTable";

const GenerationIncome = () => {
  const dispatch = useDispatch();

  // State Management
  const [allIncomeHistory, setAllIncomeHistory] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalIncome, setTotalIncome] = useState({});
  const pageSize = 10;

  const generationLevels = [
    { level: "1st Level", bonus: "15%" },
    { level: "2nd Level", bonus: "10%" },
    { level: "3rd Level", bonus: "07%" },
    { level: "4th Level", bonus: "06%" },
    { level: "6th to 8th Level", bonus: "04%" },
    { level: "9th to 14th Level", bonus: "03%" },
    { level: "15th to 17th Level", bonus: "02%" },
    { level: "18th to 20th Level", bonus: "01%" },
  ];

  const cardData = [
    {
      title: "Total Generation Bonus",
      value: `$ ${Number(totalIncome?.totalLevel ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/bar-chart.png",
    },
    {
      title: "Today Generation Bonus",
      value: `$ ${Number(totalIncome?.todayLevel ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/bar-chart.png",
    },
  ];

  // Fetching Logic
  const fetchGenerationHistory = async (page = 1) => {
    try {
      dispatch(setLoading(true));
      const response = await getAllUserLevelIncomeHistory();
      if (response?.success) {
        setAllIncomeHistory(response?.data?.history || []);
        setTotalIncome({
          totalLevel: response?.data?.totalIncome || 0,
          todayLevel: response?.data?.todayTotal || 0
        });
        setTotalCount(response?.data?.history?.length || 0);
      } else {
        toast.error(response?.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Failed to fetch generation history");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchGenerationHistory();
  }, []);

  // Table Columns Configuration
  const columns = [
    {
      header: "S/N",
      accessor: "_id",
      cell: (_, rowIndex) => (
        <span className="font-medium text-white">
          {rowIndex + 1 + (currentPage - 1) * pageSize}
        </span>
      ),
    },
    {
      header: "User ID",
      accessor: "user.username",
      cell: (row) => <span className="font-medium text-white">{row?.user?.username}</span>,
    },
    {
      header: "From User",
      accessor: "fromUser.username",
      cell: (row) => <span className="font-medium text-white">{row?.fromUser?.username || "-"}</span>,
    },
    {
      header: "Level",
      accessor: "level",
      cell: (row) => <span className="font-medium text-white">{row?.level}</span>,
    },
    {
      header: "Bonus Amount",
      accessor: "income",
      cell: (row) => <span className="font-medium text-white">$ {row?.income.toFixed(2)}</span>,
    },
    {
      header: "Status",
      accessor: "status",
      cell: (row) => (
        <span className={`font-medium ${row?.status === "Completed" ? "text-green-500" : "text-yellow-400"}`}>
          {row?.status}
        </span>
      ),
    },
    {
      header: "Date",
      accessor: "createdAt",
      cell: (row) => <span className="text-slate-300">{new Date(row?.createdAt).toLocaleString()}</span>,
    },
  ];

  return (
    <div className="space-y-6 mt-5">
      {/* Header Section (Maintained) */}
      <div className="relative overflow-hidden rounded-3xl border border-purple-500/20 bg-black/40 p-8 backdrop-blur-xl">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl bg-purple-600/20" />
        <div className="relative z-10 flex items-center gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-500/30 bg-white/5 text-3xl text-purple-400">
            <i className="fa-solid fa-sitemap"></i>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white uppercase tracking-tight">Generation Bonus</h1>
            <p className="text-purple-400 font-medium uppercase text-xs tracking-widest mt-1">20-Level Network Earnings</p>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Earn residual income through 20 levels of depth.
              <span className="block mt-2 font-bold text-purple-300 uppercase text-[10px] tracking-tighter bg-purple-500/10 px-2 py-1 rounded inline-block">
                Note: Each direct referral unlocks 2 levels of income.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards Section (New) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            iconImage={item.icon}
            path={item.path}
          />
        ))}
      </div>

      {/* Bonus Percentages Grid (Maintained) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {generationLevels.map((item, index) => (
          <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center group hover:border-purple-500/50 transition-all duration-300">
            <span className="text-[10px] text-slate-500 uppercase mb-1">{item.level}</span>
            <p className="text-2xl font-black text-white group-hover:text-purple-400 transition-colors">
              {item.bonus}
            </p>
            <span className="text-[8px] text-purple-400 font-bold uppercase tracking-widest mt-1">Bonus</span>
          </div>
        ))}
      </div>

      {/* History Table (Updated to DataTable) */}
      <div className="rounded-3xl border border-white/5 bg-black/20 p-1">
        <DataTable
          title="Generation Income History"
          columns={columns}
          data={allIncomeHistory}
          totalCount={totalCount}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
};

export default GenerationIncome;