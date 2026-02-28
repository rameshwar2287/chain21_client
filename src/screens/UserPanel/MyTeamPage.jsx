// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { setLoading } from "../../redux/slices/loadingSlice";
// import { getTeamDivision, getAllTeamMembers } from "../../api/user.api";
// import { maskWalletAddress } from "../../utils/additionalFunc";
// import { NumberFormatCommas } from "../../utils/FormatText";
// import moment from "moment";
// import Pagination from "../../components/Screen/UserPanel/Pagination";

// // Team member table component
// const TeamMemberTable = ({ members, title, teamColor, totalBusiness }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;
//   const totalPages = Math.ceil(members?.length / itemsPerPage);
  
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const visibleMembers = members?.slice(startIndex, startIndex + itemsPerPage) || [];

//   const getBadgeColor = (level) => {
//     if (level <= 3) return "bg-green-500/20 text-green-400";
//     if (level <= 6) return "bg-blue-500/20 text-blue-400";
//     if (level <= 10) return "bg-purple-500/20 text-purple-400";
//     return "bg-orange-500/20 text-orange-400";
//   };

//   return (
//     <div className="bg-slate-900/40 backdrop-blur-md border border-slate-700/60 rounded-2xl overflow-hidden">
//       {/* Header */}
//       <div className={`p-4 border-b border-slate-700/60 ${teamColor}`}>
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
//           <div>
//             <h3 className="text-xl font-bold text-white">{title}</h3>
//             <p className="text-slate-400 text-sm mt-1">
//               Total Members: <span className="text-white font-semibold">{members?.length || 0}</span>
//             </p>
//           </div>
//           <div className="flex items-center gap-2 bg-slate-800/60 px-4 py-2 rounded-xl">
//             <i className="fa-solid fa-chart-line text-emerald-400"></i>
//             <span className="text-slate-400 text-sm">Total Business:</span>
//             <span className="text-emerald-400 font-bold">
//               $<NumberFormatCommas value={totalBusiness || 0} decimalScale={2} />
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead>
//             <tr className="bg-slate-800/40 text-slate-400 text-sm">
//               <th className="text-left px-4 py-3 font-medium">#</th>
//               <th className="text-left px-4 py-3 font-medium">User</th>
//               <th className="text-left px-4 py-3 font-medium">Level</th>
//               <th className="text-left px-4 py-3 font-medium">Investment</th>
//               <th className="text-left px-4 py-3 font-medium">Status</th>
//               <th className="text-left px-4 py-3 font-medium">Joined</th>
//             </tr>
//           </thead>
//           <tbody>
//             {visibleMembers.length > 0 ? (
//               visibleMembers.map((member, index) => (
//                 <tr 
//                   key={member._id || index} 
//                   className="border-b border-slate-700/40 hover:bg-slate-800/30 transition-colors"
//                 >
//                   <td className="px-4 py-3 text-slate-400">
//                     {startIndex + index + 1}
//                   </td>
//                   <td className="px-4 py-3">
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={`https://api.dicebear.com/8.x/bottts/svg?seed=${member.id || index}`}
//                         alt={member.username}
//                         className="w-10 h-10 rounded-full border border-slate-600"
//                       />
//                       <div>
//                         <p className="font-semibold text-white">{member.username || "N/A"}</p>
//                         <p className="text-xs text-slate-400">
//                           {maskWalletAddress(member.walletAddress) || "No wallet"}
//                         </p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3">
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(member.level)}`}>
//                       Level {member.level || 1}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3">
//                     <span className="text-emerald-400 font-semibold">
//                       $<NumberFormatCommas value={member.investment || 0} decimalScale={2} />
//                     </span>
//                   </td>
//                   <td className="px-4 py-3">
//                     <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
//                       member.active?.isActive 
//                         ? "bg-green-500/20 text-green-400" 
//                         : "bg-red-500/20 text-red-400"
//                     }`}>
//                       <span className={`w-1.5 h-1.5 rounded-full ${
//                         member.active?.isActive ? "bg-green-400" : "bg-red-400"
//                       }`}></span>
//                       {member.active?.isActive ? "Active" : "Inactive"}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3 text-slate-400 text-sm">
//                     {member.createdAt ? moment(member.createdAt).format("DD MMM YYYY") : "N/A"}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="px-4 py-12 text-center">
//                   <div className="flex flex-col items-center gap-2">
//                     <i className="fa-solid fa-users-slash text-4xl text-slate-600"></i>
//                     <p className="text-slate-400">No team members found</p>
//                   </div>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       {members?.length > itemsPerPage && (
//         <div className="p-4 border-t border-slate-700/40">
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={(page) => setCurrentPage(page)}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// // Stats card component
// const StatCard = ({ icon, label, value, color, subValue }) => (
//   <div className="bg-slate-900/40 backdrop-blur-md border border-slate-700/60 rounded-xl p-4">
//     <div className="flex items-center gap-3">
//       <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${color}`}>
//         <i className={`fa-solid ${icon} text-xl`}></i>
//       </div>
//       <div>
//         <p className="text-slate-400 text-sm">{label}</p>
//         <p className="text-white font-bold text-xl">{value}</p>
//         {subValue && (
//           <p className="text-slate-500 text-xs">{subValue}</p>
//         )}
//       </div>
//     </div>
//   </div>
// );

// const MyTeamPage = () => {
//   const dispatch = useDispatch();
//   const [activeTab, setActiveTab] = useState("all");
//   const [teamData, setTeamData] = useState(null);
//   const [allMembers, setAllMembers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   const fetchTeamData = async () => {
//     try {
//       dispatch(setLoading(true));
      
//       // Fetch team division data
//       const divisionRes = await getTeamDivision();
//       if (divisionRes?.success) {
//         setTeamData(divisionRes.data);
//       }

//       // Fetch all team members
//       const allMembersRes = await getAllTeamMembers();
//       if (allMembersRes?.success) {
//         setAllMembers(allMembersRes.data?.members || []);
//       }
//     } catch (error) {
//       console.error("Error fetching team data:", error);
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   useEffect(() => {
//     fetchTeamData();
//   }, []);

//   // Filter members based on search
//   const filterMembers = (members) => {
//     if (!searchQuery) return members;
//     const query = searchQuery.toLowerCase();
//     return members.filter(m => 
//       m.username?.toLowerCase().includes(query) ||
//       m.id?.toString().includes(query) ||
//       m.walletAddress?.toLowerCase().includes(query)
//     );
//   };

//   // Get members for current tab
//   const getCurrentTabMembers = () => {
//     if (!teamData) return [];
    
//     switch (activeTab) {
//       case "teamA":
//         return teamData.teamA?.members || [];
//       case "teamB":
//         return teamData.teamB?.members || [];
//       case "teamC":
//         return teamData.teamC?.members || [];
//       case "all":
//       default:
//         return allMembers;
//     }
//   };

//   const tabs = [
//     { id: "all", label: "All Members", icon: "fa-users", color: "bg-gradient-to-r from-blue-600 to-blue-500" },
//     { id: "teamA", label: "Team A", icon: "fa-crown", color: "bg-gradient-to-r from-amber-600 to-yellow-500" },
//     { id: "teamB", label: "Team B", icon: "fa-medal", color: "bg-gradient-to-r from-slate-400 to-slate-500" },
//     { id: "teamC", label: "Team C", icon: "fa-award", color: "bg-gradient-to-r from-orange-600 to-amber-500" },
//   ];

//   const getTabColor = () => {
//     switch (activeTab) {
//       case "teamA": return "bg-gradient-to-r from-amber-900/30 to-yellow-900/20";
//       case "teamB": return "bg-gradient-to-r from-slate-800/50 to-slate-700/30";
//       case "teamC": return "bg-gradient-to-r from-orange-900/30 to-amber-900/20";
//       default: return "bg-gradient-to-r from-blue-900/30 to-cyan-900/20";
//     }
//   };

//   const getTabTitle = () => {
//     switch (activeTab) {
//       case "teamA": return "Team A - Highest Business";
//       case "teamB": return "Team B - Second Highest Business";
//       case "teamC": return "Team C - Other Teams";
//       default: return "All Team Members";
//     }
//   };

//   const getTabBusiness = () => {
//     if (!teamData) return 0;
//     switch (activeTab) {
//       case "teamA": return teamData.teamA?.totalBusiness || 0;
//       case "teamB": return teamData.teamB?.totalBusiness || 0;
//       case "teamC": return teamData.teamC?.totalBusiness || 0;
//       default: 
//         return (teamData.teamA?.totalBusiness || 0) + 
//                (teamData.teamB?.totalBusiness || 0) + 
//                (teamData.teamC?.totalBusiness || 0);
//     }
//   };

//   return (
//     <div className="space-y-6 mt-6">
//       {/* Page Header */}
//       <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
//             <i className="fa-solid fa-sitemap text-blue-500"></i>
//             My Team
//           </h1>
//           <p className="text-slate-400 mt-1">
//             View your team members divided by business performance
//           </p>
//           {teamData?.summary?.lastShuffledAt && (
//             <p className="text-slate-500 text-sm mt-1">
//               <i className="fa-solid fa-clock-rotate-left mr-1"></i>
//               Last shuffled: {moment(teamData.summary.lastShuffledAt).format("DD MMM YYYY, hh:mm A")}
//             </p>
//           )}
//         </div>

//         {/* Search */}
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search by username, ID..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full md:w-72 bg-slate-800/50 border border-slate-700 rounded-full py-2.5 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <StatCard 
//           icon="fa-users" 
//           label="Total Team" 
//           value={teamData?.summary?.totalTeamMembers || allMembers.length || 0}
//           color="bg-blue-500/20 text-blue-400"
//         />
//         <StatCard 
//           icon="fa-crown" 
//           label="Team A Members" 
//           value={teamData?.teamA?.totalMembers || 0}
//           color="bg-amber-500/20 text-amber-400"
//           subValue={`$${(teamData?.teamA?.totalBusiness || 0).toLocaleString()}`}
//         />
//         <StatCard 
//           icon="fa-medal" 
//           label="Team B Members" 
//           value={teamData?.teamB?.totalMembers || 0}
//           color="bg-slate-400/20 text-slate-300"
//           subValue={`$${(teamData?.teamB?.totalBusiness || 0).toLocaleString()}`}
//         />
//         <StatCard 
//           icon="fa-award" 
//           label="Team C Members" 
//           value={teamData?.teamC?.totalMembers || 0}
//           color="bg-orange-500/20 text-orange-400"
//           subValue={`$${(teamData?.teamC?.totalBusiness || 0).toLocaleString()}`}
//         />
//       </div>

//       {/* Tabs */}
//       <div className="flex flex-wrap gap-2 bg-slate-900/40 backdrop-blur-md border border-slate-700/60 rounded-xl p-2">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
//               activeTab === tab.id
//                 ? `${tab.color} text-white shadow-lg`
//                 : "text-slate-400 hover:text-white hover:bg-slate-800/50"
//             }`}
//           >
//             <i className={`fa-solid ${tab.icon}`}></i>
//             <span className="hidden sm:inline">{tab.label}</span>
//             <span className="bg-slate-900/50 px-2 py-0.5 rounded-full text-xs">
//               {tab.id === "all" && (allMembers.length || 0)}
//               {tab.id === "teamA" && (teamData?.teamA?.totalMembers || 0)}
//               {tab.id === "teamB" && (teamData?.teamB?.totalMembers || 0)}
//               {tab.id === "teamC" && (teamData?.teamC?.totalMembers || 0)}
//             </span>
//           </button>
//         ))}
//       </div>

//       {/* Team Info Banner */}
//       {activeTab !== "all" && (
//         <div className={`p-4 rounded-xl border border-slate-700/60 ${getTabColor()}`}>
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
//             <div className="flex items-center gap-3">
//               <i className={`fa-solid ${
//                 activeTab === "teamA" ? "fa-crown text-amber-400" : 
//                 activeTab === "teamB" ? "fa-medal text-slate-300" : 
//                 "fa-award text-orange-400"
//               } text-2xl`}></i>
//               <div>
//                 <h3 className="font-bold text-white">{getTabTitle()}</h3>
//                 <p className="text-slate-400 text-sm">
//                   {activeTab === "teamA" && "Your direct referral with the highest business volume and their downlines"}
//                   {activeTab === "teamB" && "Your direct referral with the second highest business volume and their downlines"}
//                   {activeTab === "teamC" && "All other direct referrals and their downlines"}
//                 </p>
//               </div>
//             </div>
//             {activeTab === "teamA" && teamData?.teamA?.directReferral && (
//               <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-2 rounded-lg">
//                 <span className="text-slate-400 text-sm">Leader:</span>
//                 <span className="text-amber-400 font-semibold">
//                   {teamData.teamA.directReferral.username}
//                 </span>
//               </div>
//             )}
//             {activeTab === "teamB" && teamData?.teamB?.directReferral && (
//               <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-2 rounded-lg">
//                 <span className="text-slate-400 text-sm">Leader:</span>
//                 <span className="text-slate-300 font-semibold">
//                   {teamData.teamB.directReferral.username}
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Team Members Table */}
//       <TeamMemberTable 
//         members={filterMembers(getCurrentTabMembers())}
//         title={getTabTitle()}
//         teamColor={getTabColor()}
//         totalBusiness={getTabBusiness()}
//       />

//       {/* Info Note */}
//       {/* <div className="bg-slate-900/30 border border-slate-700/40 rounded-xl p-4">
//         <div className="flex items-start gap-3">
//           <i className="fa-solid fa-circle-info text-blue-400 mt-0.5"></i>
//           <div>
//             <p className="text-slate-300 text-sm">
//               <span className="font-semibold text-white">Team Shuffling:</span> Teams are automatically reshuffled every Monday at 3:00 AM IST based on the current business volume of your direct referrals.
//             </p>
//             <ul className="mt-2 text-slate-400 text-sm space-y-1">
//               <li className="flex items-center gap-2">
//                 <i className="fa-solid fa-crown text-amber-400 w-4"></i>
//                 <span><strong className="text-amber-400">Team A</strong> - Direct referral with highest investment/business</span>
//               </li>
//               <li className="flex items-center gap-2">
//                 <i className="fa-solid fa-medal text-slate-300 w-4"></i>
//                 <span><strong className="text-slate-300">Team B</strong> - Direct referral with second highest business</span>
//               </li>
//               <li className="flex items-center gap-2">
//                 <i className="fa-solid fa-award text-orange-400 w-4"></i>
//                 <span><strong className="text-orange-400">Team C</strong> - All other direct referrals combined</span>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div> */}
//     </div>
//   );
// };

// export default MyTeamPage;



import React, { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/loadingSlice";
import { getTeamDivision, getAllTeamMembers } from "../../api/user.api";
import { maskWalletAddress } from "../../utils/additionalFunc";
import { NumberFormatCommas } from "../../utils/FormatText";
import moment from "moment";
import Pagination from "../../components/Screen/UserPanel/Pagination";

// Team member table component
const TeamMemberTable = ({ members, title, teamColor, totalBusiness }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Reset to page 1 when members list changes (filtering)
  useEffect(() => {
    setCurrentPage(1);
  }, [members]);

  const totalPages = Math.ceil(members?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleMembers = members?.slice(startIndex, startIndex + itemsPerPage) || [];

  const getBadgeColor = (level) => {
    if (level <= 3) return "bg-green-500/20 text-green-400";
    if (level <= 6) return "bg-blue-500/20 text-blue-400";
    if (level <= 10) return "bg-purple-500/20 text-purple-400";
    return "bg-orange-500/20 text-orange-400";
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-700/60 rounded-2xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className={`p-4 border-b border-slate-700/60 ${teamColor} transition-colors duration-500`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-slate-400 text-sm mt-1">
              Showing: <span className="text-white font-semibold">{members?.length || 0}</span> Members
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/60 px-4 py-2 rounded-xl border border-slate-700/30">
            <i className="fa-solid fa-chart-line text-emerald-400"></i>
            <span className="text-slate-400 text-sm">Filtered Business:</span>
            <span className="text-emerald-400 font-bold">
              $<NumberFormatCommas value={totalBusiness || 0} decimalScale={2} />
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-800/40 text-slate-400 text-xs uppercase tracking-wider">
              <th className="text-left px-4 py-4 font-semibold">#</th>
              <th className="text-left px-4 py-4 font-semibold">User Details</th>
              <th className="text-left px-4 py-4 font-semibold">Level</th>
              <th className="text-left px-4 py-4 font-semibold">Investment</th>
              <th className="text-left px-4 py-4 font-semibold">Status</th>
              <th className="text-left px-4 py-4 font-semibold">Joined Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/30">
            {visibleMembers.length > 0 ? (
              visibleMembers.map((member, index) => (
                <tr 
                  key={member._id || index} 
                  className="hover:bg-slate-800/30 transition-colors group"
                >
                  <td className="px-4 py-4 text-slate-500 text-sm">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://api.dicebear.com/8.x/bottts/svg?seed=${member.id || index}`}
                        alt={member.username}
                        className="w-9 h-9 rounded-lg border border-slate-700 group-hover:border-blue-500 transition-colors"
                      />
                      <div>
                        <p className="font-semibold text-white text-sm">{member.username || "N/A"}</p>
                        <p className="text-[10px] font-mono text-slate-500">
                          {maskWalletAddress(member.walletAddress || member.account) || "No wallet"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase ${getBadgeColor(member.level)}`}>
                      Lvl {member.level || 1}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-emerald-400 font-bold text-sm">
                      $<NumberFormatCommas value={member.investment || 0} decimalScale={2} />
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      member.active?.isActive 
                        ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                        member.active?.isActive ? "bg-green-400" : "bg-red-400"
                      }`}></span>
                      {member.active?.isActive ? "ACTIVE" : "INACTIVE"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-400 text-xs">
                    {member.createdAt ? moment(member.createdAt).format("DD MMM YYYY") : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center gap-3 opacity-40">
                    <i className="fa-solid fa-filter-circle-xmark text-5xl text-slate-600"></i>
                    <p className="text-slate-400 font-medium">No members found matching these filters</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {members?.length > itemsPerPage && (
        <div className="p-4 border-t border-slate-700/40 bg-slate-800/20">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

const StatCard = ({ icon, label, value, color, subValue }) => (
  <div className="bg-slate-900/40 backdrop-blur-md border border-slate-700/60 rounded-xl p-4 hover:border-slate-500 transition-all cursor-default">
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 flex items-center justify-center rounded-xl shadow-inner ${color}`}>
        <i className={`fa-solid ${icon} text-xl`}></i>
      </div>
      <div className="flex-1">
        <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">{label}</p>
        <p className="text-white font-bold text-xl">{value}</p>
        {subValue && (
          <p className="text-emerald-500/80 text-[11px] font-semibold mt-0.5">{subValue}</p>
        )}
      </div>
    </div>
  </div>
);

const MyTeamPage = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("all");
  const [activeLevel, setActiveLevel] = useState("all"); // State for level filter
  const [teamData, setTeamData] = useState(null);
  const [allMembers, setAllMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTeamData = async () => {
    try {
      dispatch(setLoading(true));
      const divisionRes = await getTeamDivision();
      if (divisionRes?.success) setTeamData(divisionRes.data);

      const allMembersRes = await getAllTeamMembers();
      if (allMembersRes?.success) {
        setAllMembers(allMembersRes.data?.members || []);
      }
    } catch (error) {
      console.error("Error fetching team data:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchTeamData();
  }, []);

  // Dynamically extract unique levels available in the team
  const availableLevels = useMemo(() => {
    const levels = [...new Set(allMembers.map((m) => m.level))].sort((a, b) => a - b);
    return levels;
  }, [allMembers]);

  // Combined Filtering Logic
  const filteredData = useMemo(() => {
    let list = [];
    if (activeTab === "all") list = allMembers;
    else if (activeTab === "teamA") list = teamData?.teamA?.members || [];
    else if (activeTab === "teamB") list = teamData?.teamB?.members || [];
    else if (activeTab === "teamC") list = teamData?.teamC?.members || [];

    if (activeLevel !== "all") {
      list = list.filter(m => m.level === parseInt(activeLevel));
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(m => 
        m.username?.toLowerCase().includes(q) || 
        m.id?.toString().includes(q) || 
        (m.walletAddress || m.account)?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeTab, activeLevel, allMembers, teamData, searchQuery]);

  // Dynamic Summary Calculations
  const currentTotalBusiness = useMemo(() => {
    return filteredData.reduce((acc, curr) => acc + (curr.investment || 0), 0);
  }, [filteredData]);

  const tabs = [
    { id: "all", label: "All Members", icon: "fa-users", activeClass: "bg-blue-600 shadow-blue-500/20" },
    { id: "teamA", label: "Team A", icon: "fa-crown", activeClass: "bg-amber-600 shadow-amber-500/20" },
    { id: "teamB", label: "Team B", icon: "fa-medal", activeClass: "bg-slate-500 shadow-slate-500/20" },
    { id: "teamC", label: "Team C", icon: "fa-award", activeClass: "bg-orange-600 shadow-orange-500/20" },
  ];

  const getThemeColor = () => {
    switch (activeTab) {
      case "teamA": return "bg-gradient-to-r from-amber-900/30 to-yellow-900/10";
      case "teamB": return "bg-gradient-to-r from-slate-800/40 to-slate-700/20";
      case "teamC": return "bg-gradient-to-r from-orange-900/30 to-amber-900/10";
      default: return "bg-gradient-to-r from-blue-900/30 to-cyan-900/10";
    }
  };

  return (
    <div className="space-y-6 mt-6 pb-10">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <i className="fa-solid fa-sitemap text-blue-500"></i>
            My Team
          </h1>
          <p className="text-slate-400 text-sm mt-1">Hierarchical view of your network and business performance</p>
        </div>

        <div className="relative group">
          <input
            type="text"
            placeholder="Search username or wallet..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-80 bg-slate-800/40 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
          <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors"></i>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon="fa-users" label="Total Network" 
          value={teamData?.summary?.totalTeamMembers || allMembers.length} 
          color="bg-blue-500/20 text-blue-400" 
        />
        <StatCard 
          icon="fa-crown" label="Team A" 
          value={teamData?.teamA?.totalMembers || 0} 
          color="bg-amber-500/20 text-amber-400"
          subValue={`$${(teamData?.teamA?.totalBusiness || 0).toLocaleString()}`}
        />
        <StatCard 
          icon="fa-medal" label="Team B" 
          value={teamData?.teamB?.totalMembers || 0} 
          color="bg-slate-400/20 text-slate-300"
          subValue={`$${(teamData?.teamB?.totalBusiness || 0).toLocaleString()}`}
        />
        <StatCard 
          icon="fa-award" label="Team C" 
          value={teamData?.teamC?.totalMembers || 0} 
          color="bg-orange-500/20 text-orange-400"
          subValue={`$${(teamData?.teamC?.totalBusiness || 0).toLocaleString()}`}
        />
      </div>

      {/* Primary Filtering (Teams) */}
      <div className="flex flex-wrap gap-2 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-700/50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setActiveLevel("all"); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
              activeTab === tab.id 
                ? `${tab.activeClass} text-white shadow-lg scale-[1.02]` 
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <i className={`fa-solid ${tab.icon}`}></i>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Secondary Filtering (Levels) */}
      <div className="flex flex-wrap items-center gap-3 py-1 px-2">
        <div className="flex items-center gap-2 text-slate-500 mr-2">
          <i className="fa-solid fa-layer-group text-xs"></i>
          <span className="text-[11px] font-bold uppercase tracking-widest">Filter Level</span>
        </div>
        <button
          onClick={() => setActiveLevel("all")}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold border transition-all ${
            activeLevel === "all" 
              ? "bg-blue-500/10 border-blue-500/50 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]" 
              : "bg-slate-800/40 border-slate-700 text-slate-500 hover:border-slate-500"
          }`}
        >
          ALL LEVELS
        </button>
        {availableLevels.map((lvl) => (
          <button
            key={lvl}
            onClick={() => setActiveLevel(lvl)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold border transition-all ${
              activeLevel === lvl 
                ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
                : "bg-slate-800/40 border-slate-700 text-slate-500 hover:border-slate-500"
            }`}
          >
            LEVEL {lvl}
          </button>
        ))}
      </div>

      {/* Table Section */}
      <TeamMemberTable 
        members={filteredData}
        title={`${activeTab.toUpperCase()} MEMBERS ${activeLevel !== "all" ? `- LEVEL ${activeLevel}` : ""}`}
        teamColor={getThemeColor()}
        totalBusiness={currentTotalBusiness}
      />
    </div>
  );
};

export default MyTeamPage;