import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Transactions from "./Transactions";
import EarningsChart from "../../components/Screen/UserPanel/EarningsChart";
import ProfileCard from "../../components/Screen/UserPanel/ProfileCard";
import { getIncomeTotal, getTransactionHistory } from "../../api/auth.api";
import { setLoading } from "../../redux/slices/loadingSlice";
import {
  getIncomeTotalForAdmin,
  getIncomeTotalForAdminIncome,
  getTransactionHistoryForAdmin,
} from "../../api/admin.api";
import {
  AuthenticatedAdminRouters,
  AuthenticatedUserRouters,
} from "../../constants/routes";
import aiTradeBg from "../../assets/Landing/ai-trade.jpg"; 
import { 
  Bot, TrendingUp, Wallet, Users, Activity, BarChart3, ShieldCheck, ArrowRight,
  UserPlus, Layers, Award, Trophy, Calendar, Infinity, GraduationCap, Globe, Edit3 
} from "lucide-react";
import ProfileEditModal from "../../components/UI/ProfileEditModal";

const Dashboard1 = () => {
  const [transactionHistory, setTransactionHistory] = useState(null);
  const [totalIncome, setTotalIncome] = useState(null);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const role = useSelector((state) => state?.isLoggedUser?.role);
  const userInfo = useSelector((state) => state?.isLoggedUser?.data);
  const access = localStorage.getItem("access");
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      dispatch(setLoading(true));
      
      // Fetch Transactions
      const transResponse = role === "USER" 
        ? await getTransactionHistory() 
        : await getTransactionHistoryForAdmin();
      setTransactionHistory(transResponse?.data);

      // Fetch Income Totals
      if (role === "USER") {
        const userResponse = await getIncomeTotal();
        console.log("User Income Response:", userResponse?.data);
        setTotalIncome(userResponse?.data);
      } else {
        const adminIncomeRes = await getIncomeTotalForAdminIncome();
        const adminGeneralRes = await getIncomeTotalForAdmin();
        setTotalIncome({ ...adminIncomeRes?.data, ...adminGeneralRes });
      }
    } catch (err) {
      console.error("Dashboard Data Fetch Error:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, [role, access]);

  // Safely format numbers for display
  const formatVal = (val) => Number(val || 0).toFixed(2);

  const revenueOverview = [
    {
      title: "Total Direct Users",
      value: `${Math.floor(totalIncome?.totalDirectUsers || 0)}`,
      icon: Users,
      path: AuthenticatedUserRouters.MY_TEAM,
      color: "text-[#D4AF37]"
    },
    {
      title: "Direct Bussiness",
      value: `${Math.floor(totalIncome?.totalDirectBusiness ||  0)}`,
      icon: Users,
      path: AuthenticatedUserRouters.MY_TEAM,
      color: "text-[#D4AF37]"
    },
    {
      title: "Total Downline Users",
      value: `${Math.floor(totalIncome?.totalDownlineUsers || 0)}`,
      icon: Users,
      path: AuthenticatedUserRouters.MY_TEAM,
      color: "text-[#D4AF37]"
    },
    {
      title: "Total Income",
      value: `$ ${formatVal(totalIncome?.totalIncome)}`,
      icon: Wallet,
      path: AuthenticatedUserRouters.INCOME_HISTORY,
      color: "text-[#D4AF37]"
    },
    {
      title: "Today Income",
      value: `$ ${formatVal(totalIncome?.todayIncome)}`,
      icon: Activity,
      path: AuthenticatedUserRouters.INCOME_HISTORY,
      color: "text-[#00FF88]"
    },
    {
      title: "Today Trading Income",
      value: `$ ${formatVal(totalIncome?.todayTradingIncome)}`,
      icon: Activity,
      path: AuthenticatedUserRouters.TRADING_INCOME_HISTORY,
      color: "text-[#00FF88]"
    },
    {
      title: "Total Trading Income",
      value: `$ ${formatVal(totalIncome?.totalTradingIncome)}`,
      icon: TrendingUp,
      path: AuthenticatedUserRouters.TRADING_INCOME_HISTORY,
      color: "text-[#00FF88]"
    },
    {
      title: "Direct Referral Income",
      value: `$ ${formatVal(totalIncome?.directReferralIncome)}`,
      icon: UserPlus,
      path: AuthenticatedUserRouters.REFERRAL_HISTORY,
      color: "text-blue-400"
    },
    // {
    //   title: "Total Generation Income",
    //   value: `$ ${formatVal(totalIncome?.totalLevelIncome)}`,
    //   icon: BarChart3,
    //   path: AuthenticatedUserRouters.LEVEL_INCOME_HISTORY,
    //   color: "text-blue-400"
    // },
    {
      title: "Today Generation Bonus",
      value: `$ ${formatVal(totalIncome?.todayGenerationalBonus)}`,
      icon: Layers,
      path: AuthenticatedUserRouters.GENERATION_INCOME_HISTORY,
      color: "text-purple-300"
    },
    {
      title: "Total Generation Bonus",
      value: `$ ${formatVal(totalIncome?.totalGenerationalBonus)}`,
      icon: Layers,
      path: AuthenticatedUserRouters.GENERATION_INCOME_HISTORY,
      color: "text-purple-400"
    },
    {
      title: "Today Leadership Bonus",
      value: `$ ${formatVal(totalIncome?.todayLeadershipBonus)}`,
      icon: Award,
      path: AuthenticatedUserRouters.LEADERSHIP_INCOME_HISTORY,
      color: "text-orange-400"
    },
    {
      title: "Total Leadership Bonus",
      value: `$ ${formatVal(totalIncome?.totalLeadershipBonus)}`,
      icon: Trophy,
      path: AuthenticatedUserRouters.LEADERSHIP_INCOME_HISTORY,
      color: "text-orange-500"
    },
    {
      title: "Today Lifetime Bonus",
      value: `$ ${formatVal(totalIncome?.todayLifetimeBonus)}`,
      icon: Calendar,
      path: AuthenticatedUserRouters.LIFETIME_INCOME_HISTORY,
      color: "text-pink-400"
    },
    {
      title: "Total Lifetime Bonus",
      value: `$ ${formatVal(totalIncome?.totalLifetimeBonus)}`,
      icon: Infinity,
      path: AuthenticatedUserRouters.LIFETIME_INCOME_HISTORY,
      color: "text-pink-500"
    },
    // {
    //   title: "Today Mentor Bonus",
    //   value: `$ ${formatVal(totalIncome?.todayMentorBonus)}`,
    //   icon: GraduationCap,
    //   path: AuthenticatedUserRouters.MENTOR_HISTORY,
    //   color: "text-cyan-400"
    // },
    // {
    //   title: "Total Mentor Bonus",
    //   value: `$ ${formatVal(totalIncome?.totalMentorBonus)}`,
    //   icon: GraduationCap,
    //   path: AuthenticatedUserRouters.MENTOR_HISTORY,
    //   color: "text-cyan-500"
    // },
    {
      title: "Today Global Income",
      value: `$ ${formatVal(totalIncome?.todayGlobalIncome)}`,
      icon: Globe,
      path: AuthenticatedUserRouters.GLOBAL_INCOME_HISTORY,
      color: "text-emerald-400"
    },
    {
      title: "Total Global Income",
      value: `$ ${formatVal(totalIncome?.totalGlobalIncome)}`,
      icon: Globe,
      path: AuthenticatedUserRouters.GLOBAL_INCOME_HISTORY,
      color: "text-emerald-500"
    },
    {
      title: "Total Investment",
      value: `$ ${formatVal(totalIncome?.totalInvestment)}`,
      icon: Wallet,
      path: AuthenticatedUserRouters.INVESTMENT_HISTORY,
      color: "text-[#D4AF37]"
    },
    {
      title: "Total Team Transaction",
      value: `$ ${formatVal(totalIncome?.totalTeamTransaction)}`,
      icon: TrendingUp,
      path: AuthenticatedUserRouters.TRANSACTIONS,
      color: "text-orange-400"
    },
    {
      title: "Today Withdrawals",
      value: `$ ${formatVal(totalIncome?.todayWithdrawals)}`,
      icon: ShieldCheck,
      path: AuthenticatedUserRouters.WITHDRAWAL_HISTORY,
      color: "text-red-400"
    }
  ];

  const adminOverview = [
     {
      title: "All Users",
      value: `${Number(totalIncome?.users || 0)}`,
      icon: Users,
      path: AuthenticatedAdminRouters.ALL_USERS,
      color: "text-blue-400"
    },
    {
      title: "Total Revenue",
      value: `$ ${formatVal(totalIncome?.totalIncome)}`,
      icon: Wallet,
      path: AuthenticatedAdminRouters.INCOME_HISTORY,
      color: "text-[#D4AF37]"
    }
  ];

  const DashboardCard = ({ title, value, Icon, path, color }) => (
    <div
      onClick={() => path && navigate(path)}
      className="group relative bg-[#0c0c0c] border border-white/5 p-6 rounded-[1.5rem] cursor-pointer overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10 flex justify-between items-start">
        <div className="space-y-2">
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] group-hover:text-gray-300 transition-colors">{title}</p>
          <h3 className="text-2xl lg:text-3xl font-black text-white font-rajdhani tracking-tight group-hover:scale-105 origin-left transition-transform duration-300">
            {value}
          </h3>
        </div>
        <div className={`p-3 rounded-2xl bg-[#050505] border border-white/5 group-hover:border-[#D4AF37]/30 transition-colors ${color} shadow-inner`}>
          <Icon size={22} className="group-hover:animate-pulse" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4AF37] group-hover:w-full transition-all duration-700 ease-out"></div>
    </div>
  );

  return (
    <div className="min-h-screen p-4 lg:p-8 text-white relative font-poppins selection:bg-[#D4AF37] selection:text-black">
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37] opacity-[0.03] blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="relative z-10 space-y-10 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/5 pb-6 gap-4">
          <div>
            <h1 className="text-4xl font-black font-rajdhani text-white uppercase tracking-tighter italic">
              DASHBOARD <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F7E7CE] pr-5">OVERVIEW</span>
            </h1>
            <p className="text-gray-500 text-[11px] font-bold uppercase tracking-[0.3em] mt-2 pl-1">CHAIN21 GLOBAL • Secure Ecosystem</p>
          </div>
          <div className="flex items-center gap-3">
            {role === "USER" && !userInfo?.profileEdited && (
              <button
                onClick={() => setIsProfileEditOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-full border border-blue-400/30 transition-all shadow-lg shadow-blue-500/25"
              >
                <Edit3 size={16} className="text-white" />
                <span className="text-[10px] uppercase font-bold text-white tracking-widest">Edit Profile</span>
              </button>
            )}
            <div className="flex items-center gap-2 px-4 py-2 bg-[#0c0c0c] rounded-full border border-white/5">
              <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse"></span>
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">System Operational</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {(role === "USER" ? revenueOverview : adminOverview).map((item, index) => (
            <DashboardCard key={index} {...item} Icon={item.icon} />
          ))}
        </div>

        {role === "USER" && (
          <>
            <div className="relative w-full rounded-[2rem] overflow-hidden border border-white/10 group shadow-2xl">
              <div className="absolute inset-0 bg-[#0c0c0c]"></div>
              <div className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:scale-105 transition-transform duration-1000" style={{ backgroundImage: `url(${aiTradeBg})` }}></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-transparent"></div>
              <div className="relative z-20 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-left max-w-2xl space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                    <Bot size={14} /> AI Protocol V.3.0
                  </div>
                  <div>
                    <h3 className="text-4xl md:text-5xl font-black text-white font-rajdhani mb-2 uppercase italic tracking-tight">AI TRADE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-white pr-3">ENGINE</span></h3>
                    <p className="text-gray-400 text-sm font-light leading-relaxed max-w-lg border-l-2 border-[#D4AF37] pl-4">Deploy institutional-grade algorithms to execute trades with precision.</p>
                  </div>
                </div>
                <button onClick={() => navigate(AuthenticatedUserRouters.AI_TRADE)} className="group/btn relative px-10 py-5 rounded-xl bg-[#D4AF37] text-black font-black font-rajdhani text-xl uppercase tracking-widest overflow-hidden hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all">
                  <span className="relative flex items-center gap-3">Initialize Bot <TrendingUp size={24} /></span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              <div className="lg:col-span-2 bg-[#0c0c0c] border border-white/5 rounded-[2rem] p-2 shadow-xl"><EarningsChart /></div>
              <div className="lg:col-span-1 bg-[#0c0c0c] border border-white/5 rounded-[2rem] p-2 shadow-xl"><ProfileCard /></div>
            </div>
          </>
        )}

        <div className="bg-[#0c0c0c] border border-white/5 rounded-[2rem] p-8 shadow-xl">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#D4AF37]/10 rounded-lg text-[#D4AF37]"><Wallet size={20} /></div>
              <h3 className="text-xl font-bold text-white font-rajdhani uppercase tracking-wider">Recent <span className="text-[#D4AF37]">Ledger</span></h3>
            </div>
            <button onClick={() => navigate(AuthenticatedUserRouters.TRANSACTIONS)} className="group flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 transition-all">
              <span className="text-[10px] font-bold text-gray-400 group-hover:text-[#D4AF37] uppercase tracking-widest">View All History</span>
              <ArrowRight size={14} className="text-gray-500 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
            </button>
          </div>
          <Transactions history={transactionHistory} />
        </div>
      </div>

      {/* Profile Edit Modal */}
      {role === "USER" && (
        <ProfileEditModal
          isOpen={isProfileEditOpen}
          onClose={() => setIsProfileEditOpen(false)}
          userData={userInfo}
          onSuccess={fetchData}
        />
      )}
    </div>
  );
};

export default Dashboard1;