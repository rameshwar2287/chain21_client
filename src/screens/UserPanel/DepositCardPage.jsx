// import React, { useState, useEffect } from "react";
// import { Wallet, ArrowUpRight, DollarSign, CreditCard, Shield, CheckCircle, AlertCircle, TrendingUp, Send, UserPlus, Search, X } from 'lucide-react';
// import { toast } from "react-toastify";
// import { getROIWalletBalance, depositFromROIWallet, depositForOtherUser, transferROIWallet } from "../../api/user.api";

// const getMoneySymbol = () => "$";

// const DepositCardPage = () => {
//   const [activeTab, setActiveTab] = useState("deposit"); // deposit, topup, transfer
//   const [amount, setAmount] = useState("");
//   const [targetUserId, setTargetUserId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [walletBalance, setWalletBalance] = useState({
//     roiWallet: 0,
//     levelIncomeWallet: 0,
//     totalDepositWallet: 0,
//     currentIncome: 0
//   });
//   const [searchUser, setSearchUser] = useState("");
//   const [searchedUser, setSearchedUser] = useState(null);

//   // Calculate button disabled state
//   const isButtonDisabled = React.useMemo(() => {
//     const numAmount = Number(amount) || 0;
//     const hasTargetId = targetUserId?.trim() || "";
    
//     if (loading) return true;
//     if (!amount) return true;
//     if (numAmount < 5) return true;
    
//     if (activeTab === "transfer") {
//       if (!hasTargetId) return true;
//       if (numAmount > (walletBalance.roiWallet || 0)) return true;
//     }
    
//     if (activeTab === "topup") {
//       if (!hasTargetId) return true;
//       if (numAmount > (walletBalance.totalDepositWallet || 0)) return true;
//     }
    
//     if (activeTab === "deposit") {
//       if (numAmount > (walletBalance.totalDepositWallet || 0)) return true;
//     }
    
//     return false;
//   }, [loading, amount, targetUserId, activeTab, walletBalance]);

//   useEffect(() => {
//     fetchWalletBalance();
//   }, []);

//   const fetchWalletBalance = async () => {
//     try {
//       const response = await getROIWalletBalance();
//       if (response.success) {
//         setWalletBalance(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching wallet balance:", error);
//     }
//   };

//   const handleDepositForOwn = async () => {
//     const numberAmount = Number(amount);
    
//     if (numberAmount <= 0) {
//       toast.error("Deposit Amount must be greater than 0");
//       return;
//     }
    
//     if (numberAmount < 5) {
//       toast.error("Minimum deposit amount is $5");
//       return;
//     }

//     if (numberAmount > walletBalance.totalDepositWallet) {
//       toast.error(`Insufficient balance. Available: $${walletBalance.totalDepositWallet.toFixed(2)}`);
//       return;
//     }
    
//     setLoading(true);
//     try {
//       const response = await depositFromROIWallet({ amount: numberAmount });
//       if (response.success) {
//         toast.success(response.message || "Deposit successful!");
//         setAmount("");
//         await fetchWalletBalance();
//       } else {
//         toast.error(response.message || "Deposit failed");
//       }
//     } catch (error) {
//       console.error("Error in deposit:", error);
//       toast.error(error.response?.data?.message || "Error processing deposit");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDepositForOther = async () => {
//     const numberAmount = Number(amount);
    
//     if (numberAmount <= 0) {
//       toast.error("Deposit Amount must be greater than 0");
//       return;
//     }
    
//     if (numberAmount < 5) {
//       toast.error("Minimum deposit amount is $5");
//       return;
//     }

//     if (!targetUserId?.trim()) {
//       toast.error("Please enter target user ID");
//       return;
//     }

//     if (numberAmount > walletBalance.totalDepositWallet) {
//       toast.error(`Insufficient balance. Available: $${walletBalance.totalDepositWallet.toFixed(2)}`);
//       return;
//     }
    
//     setLoading(true);
//     try {
//       const response = await depositForOtherUser({ 
//         amount: numberAmount,
//         targetUserId: targetUserId.trim()
//       });
//       if (response.success) {
//         toast.success(response.message || "Top-up successful!");
//         setAmount("");
//         setTargetUserId("");
//         setSearchedUser(null);
//         await fetchWalletBalance();
//       } else {
//         toast.error(response.message || "Top-up failed");
//       }
//     } catch (error) {
//       console.error("Error in top-up:", error);
//       toast.error(error.response?.data?.message || "Error processing top-up");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTransfer = async () => {
//     const numberAmount = Number(amount);
    
//     if (numberAmount <= 0) {
//       toast.error("Transfer Amount must be greater than 0");
//       return;
//     }

//     if (!targetUserId?.trim()) {
//       toast.error("Please enter target user ID");
//       return;
//     }

//     if (numberAmount > walletBalance.roiWallet) {
//       toast.error(`Insufficient ROI wallet balance. Available: $${walletBalance.roiWallet.toFixed(2)}`);
//       return;
//     }
    
//     setLoading(true);
//     try {
//       const response = await transferROIWallet({ 
//         amount: numberAmount,
//         targetUserId: targetUserId.trim()
//       });
//       if (response.success) {
//         toast.success(response.message || "Transfer successful!");
//         setAmount("");
//         setTargetUserId("");
//         setSearchedUser(null);
//         await fetchWalletBalance();
//       } else {
//         toast.error(response.message || "Transfer failed");
//       }
//     } catch (error) {
//       console.error("Error in transfer:", error);
//       toast.error(error.response?.data?.message || "Error processing transfer");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatAmount = (amt) => {
//     return amt ? Number(amt).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00";
//   };

//   const quickAmounts = [5, 10, 25, 50, 100, 500];

//   const setQuickAmount = (value) => {
//     setAmount(value.toString());
//   };

//   return (
//     <div className="max-w-4xl mx-auto">
//       {/* Wallet Balance Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border border-blue-700/30 rounded-xl p-4">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-blue-300 text-sm">ROI Wallet</span>
//             <TrendingUp className="w-4 h-4 text-blue-400" />
//           </div>
//           <p className="text-2xl font-bold text-white">{getMoneySymbol()}{formatAmount(walletBalance.roiWallet)}</p>
//         </div>
//         <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border border-purple-700/30 rounded-xl p-4">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-purple-300 text-sm">Generation Income Wallet</span>
//             <UserPlus className="w-4 h-4 text-purple-400" />
//           </div>
//           <p className="text-2xl font-bold text-white">{getMoneySymbol()}{formatAmount(walletBalance.levelIncomeWallet)}</p>
//         </div>
//         <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 border border-green-700/30 rounded-xl p-4">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-green-300 text-sm">Total Deposit Wallet</span>
//             <Wallet className="w-4 h-4 text-green-400" />
//           </div>
//           <p className="text-2xl font-bold text-white">{getMoneySymbol()}{formatAmount(walletBalance.totalDepositWallet)}</p>
//         </div>
//       </div>

//       {/* Main Card */}
//       <div className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border border-blue-800/30 rounded-3xl p-8 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden">
        
//         {/* Background Pattern */}
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-cyan-600/5"></div>
        
//         {/* Header */}
//         <div className="relative flex items-center justify-between mb-8">
//           <div className="flex items-center gap-4">
//             <div className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl shadow-lg shadow-green-500/10">
//               <CreditCard className="w-8 h-8 text-green-400" />
//             </div>
//             <div>
//               <h2 className="text-3xl font-bold text-white mb-1">
//                 Deposit Card
//               </h2>
//               <p className="text-slate-400">Manage ROI & Generation Income wallets</p>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="relative mb-6 flex gap-2 border-b border-slate-700/50">
//           <button
//             onClick={() => {
//               setActiveTab("deposit");
//               setAmount("");
//               setTargetUserId("");
//               setSearchedUser(null);
//             }}
//             className={`px-6 py-3 font-semibold transition-all duration-300 border-b-2 ${
//               activeTab === "deposit"
//                 ? "border-green-500 text-green-400"
//                 : "border-transparent text-slate-400 hover:text-slate-300"
//             }`}
//           >
//             Deposit for Own ID
//           </button>
//           <button
//             onClick={() => {
//               setActiveTab("topup");
//               setAmount("");
//               setTargetUserId("");
//               setSearchedUser(null);
//             }}
//             className={`px-6 py-3 font-semibold transition-all duration-300 border-b-2 ${
//               activeTab === "topup"
//                 ? "border-green-500 text-green-400"
//                 : "border-transparent text-slate-400 hover:text-slate-300"
//             }`}
//           >
//             Top-up for Other User
//           </button>
//           <button
//             onClick={() => {
//               setActiveTab("transfer");
//               setAmount("");
//               setTargetUserId("");
//               setSearchedUser(null);
//             }}
//             className={`px-6 py-3 font-semibold transition-all duration-300 border-b-2 ${
//               activeTab === "transfer"
//                 ? "border-green-500 text-green-400"
//                 : "border-transparent text-slate-400 hover:text-slate-300"
//             }`}
//           >
//             Transfer ROI Wallet
//           </button>
//         </div>

//         {/* Quick Amount Buttons */}
//         <div className="relative mb-6">
//           <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
//             <DollarSign className="w-4 h-4 text-green-400" />
//             Quick Select Amount
//           </label>
//           <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
//             {quickAmounts.map((value) => (
//               <button
//                 key={value}
//                 onClick={() => setQuickAmount(value)}
//                 className={`p-3 rounded-xl text-sm font-semibold transition-all duration-300 border ${
//                   amount === value.toString()
//                     ? 'bg-gradient-to-r from-green-600/30 to-emerald-600/30 border-green-500/50 text-green-300'
//                     : 'bg-slate-800/50 border-slate-700/50 text-slate-300 hover:border-green-600/30 hover:bg-green-600/10'
//                 }`}
//               >
//                 {getMoneySymbol()}{value.toLocaleString()}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Amount Input */}
//         <div className="relative mb-6">
//           <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
//             <Wallet className="w-4 h-4 text-cyan-400" />
//             {activeTab === "transfer" ? "Transfer Amount" : "Deposit Amount"} ({getMoneySymbol()})
//           </label>
//           <div className="relative group">
//             <input
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               placeholder="Enter amount"
//               min="5"
//               step="0.01"
//               className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl py-4 px-5 text-white text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500/50 transition-all duration-300 group-hover:border-green-600/30 pr-20"
//             />
//             {amount && (
//               <div className="absolute right-5 top-1/2 -translate-y-1/2">
//                 <span className="text-green-400 font-bold text-sm">
//                   {getMoneySymbol()}{formatAmount(amount)}
//                 </span>
//               </div>
//             )}
//           </div>
//           {amount && Number(amount) > 0 && (
//             <div className="mt-2">
//               {Number(amount) >= 5 ? (
//                 <p className="text-xs text-green-400 flex items-center gap-1">
//                   <CheckCircle className="w-3 h-3" />
//                   Amount is valid
//                 </p>
//               ) : (
//                 <p className="text-xs text-red-400 flex items-center gap-1">
//                   <AlertCircle className="w-3 h-3" />
//                   Minimum amount is $5
//                 </p>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Target User Input (for topup and transfer) */}
//         {(activeTab === "topup" || activeTab === "transfer") && (
//           <div className="relative mb-6">
//             <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
//               <UserPlus className="w-4 h-4 text-purple-400" />
//               Target User ID
//             </label>
//             <div className="relative">
//               <input
//                 type="text"
//                 value={targetUserId}
//                 onChange={(e) => setTargetUserId(e.target.value.trimStart())}
//                 placeholder="Enter user ID"
//                 className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl py-4 px-5 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500/50 transition-all duration-300"
//               />
//             </div>
//             {activeTab === "transfer" && amount && Number(amount) > 0 && (
//               <div className="mt-2">
//                 {Number(amount) > (walletBalance.roiWallet || 0) ? (
//                   <p className="text-xs text-red-400 flex items-center gap-1">
//                     <AlertCircle className="w-3 h-3" />
//                     Insufficient ROI wallet balance. Available: ${(walletBalance.roiWallet || 0).toFixed(2)}
//                   </p>
//                 ) : targetUserId?.trim() ? (
//                   <p className="text-xs text-green-400 flex items-center gap-1">
//                     <CheckCircle className="w-3 h-3" />
//                     Ready to transfer
//                   </p>
//                 ) : null}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Submit Button */}
//         <button
//           onClick={
//             activeTab === "deposit" 
//               ? handleDepositForOwn 
//               : activeTab === "topup" 
//               ? handleDepositForOther 
//               : handleTransfer
//           }
//           disabled={isButtonDisabled}
//           className={`relative w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 overflow-hidden group ${
//             isButtonDisabled
//               ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed border border-slate-600/30'
//               : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-xl shadow-green-500/25 hover:shadow-green-500/40 hover:scale-[1.02] active:scale-[0.98] border border-green-500/30'
//           }`}
//         >
//           <div className="relative flex items-center justify-center gap-3">
//             {loading ? (
//               <>
//                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                 <span>Processing...</span>
//               </>
//             ) : (
//               <>
//                 {activeTab === "deposit" && <ArrowUpRight className="w-5 h-5" />}
//                 {activeTab === "topup" && <UserPlus className="w-5 h-5" />}
//                 {activeTab === "transfer" && <Send className="w-5 h-5" />}
//                 <span>
//                   {activeTab === "deposit" && `Deposit ${getMoneySymbol()}${formatAmount(amount)}`}
//                   {activeTab === "topup" && `Top-up ${getMoneySymbol()}${formatAmount(amount)}`}
//                   {activeTab === "transfer" && `Transfer ${getMoneySymbol()}${formatAmount(amount)}`}
//                 </span>
//               </>
//             )}
//           </div>
//         </button>

//         {/* Info Notice */}
//         <div className="mt-6 p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl">
//           <p className="text-xs text-slate-400 flex items-start gap-2">
//             <Shield className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
//             <span>
//               {activeTab === "deposit" && "ROI and Generation Income can only be used for deposits. They cannot be withdrawn directly to your main wallet."}
//               {activeTab === "topup" && "You can top-up/activate any user's ID using your ROI and Generation Income wallets. Minimum amount is $5."}
//               {activeTab === "transfer" && "Transfer ROI wallet balance to another user's ROI wallet. Only ROI wallet balance can be transferred."}
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DepositCardPage;



import React, { useState, useEffect, useMemo } from "react";
import { Wallet, ArrowUpRight, DollarSign, CreditCard, Shield, CheckCircle, AlertCircle, TrendingUp, Send, UserPlus, Search, X, Lock } from 'lucide-react';
import { toast } from "react-toastify";
import { getROIWalletBalance, depositFromROIWallet, depositForOtherUser, transferROIWallet } from "../../api/user.api";
import { motion, AnimatePresence } from "framer-motion";

const getMoneySymbol = () => "$";

const DepositCardPage = () => {
  const [activeTab, setActiveTab] = useState("deposit"); // deposit, topup, transfer
  const [amount, setAmount] = useState("");
  const [targetUserId, setTargetUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState({
    roiWallet: 0,
    levelIncomeWallet: 0,
    totalDepositWallet: 0,
    currentIncome: 0
  });
  const [searchUser, setSearchUser] = useState(""); // Kept for consistency with original code
  const [searchedUser, setSearchedUser] = useState(null); // Kept for consistency

  // Calculate button disabled state (Original Logic Preserved)
  const isButtonDisabled = useMemo(() => {
    const numAmount = Number(amount) || 0;
    const hasTargetId = targetUserId?.trim() || "";
    
    if (loading) return true;
    if (!amount) return true;
    if (numAmount < 5) return true;
    
    if (activeTab === "transfer") {
      if (!hasTargetId) return true;
      if (numAmount > (walletBalance.roiWallet || 0)) return true;
    }
    
    if (activeTab === "topup") {
      if (!hasTargetId) return true;
      if (numAmount > (walletBalance.totalDepositWallet || 0)) return true;
    }
    
    if (activeTab === "deposit") {
      if (numAmount > (walletBalance.totalDepositWallet || 0)) return true;
    }
    
    return false;
  }, [loading, amount, targetUserId, activeTab, walletBalance]);

  useEffect(() => {
    fetchWalletBalance();
  }, []);

  const fetchWalletBalance = async () => {
    try {
      const response = await getROIWalletBalance();
      if (response.success) {
        setWalletBalance(response.data);
      }
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
    }
  };

  const handleDepositForOwn = async () => {
    const numberAmount = Number(amount);
    
    if (numberAmount <= 0) {
      toast.error("Deposit Amount must be greater than 0");
      return;
    }
    
    if (numberAmount < 5) {
      toast.error("Minimum deposit amount is $5");
      return;
    }

    if (numberAmount > walletBalance.totalDepositWallet) {
      toast.error(`Insufficient balance. Available: $${walletBalance.totalDepositWallet.toFixed(2)}`);
      return;
    }
    
    setLoading(true);
    try {
      const response = await depositFromROIWallet({ amount: numberAmount });
      if (response.success) {
        toast.success(response.message || "Deposit successful!");
        setAmount("");
        await fetchWalletBalance();
      } else {
        toast.error(response.message || "Deposit failed");
      }
    } catch (error) {
      console.error("Error in deposit:", error);
      toast.error(error.response?.data?.message || "Error processing deposit");
    } finally {
      setLoading(false);
    }
  };

  const handleDepositForOther = async () => {
    const numberAmount = Number(amount);
    
    if (numberAmount <= 0) {
      toast.error("Deposit Amount must be greater than 0");
      return;
    }
    
    if (numberAmount < 5) {
      toast.error("Minimum deposit amount is $5");
      return;
    }

    if (!targetUserId?.trim()) {
      toast.error("Please enter target user ID");
      return;
    }

    if (numberAmount > walletBalance.totalDepositWallet) {
      toast.error(`Insufficient balance. Available: $${walletBalance.totalDepositWallet.toFixed(2)}`);
      return;
    }
    
    setLoading(true);
    try {
      const response = await depositForOtherUser({ 
        amount: numberAmount,
        targetUserId: targetUserId.trim()
      });
      if (response.success) {
        toast.success(response.message || "Top-up successful!");
        setAmount("");
        setTargetUserId("");
        setSearchedUser(null);
        await fetchWalletBalance();
      } else {
        toast.error(response.message || "Top-up failed");
      }
    } catch (error) {
      console.error("Error in top-up:", error);
      toast.error(error.response?.data?.message || "Error processing top-up");
    } finally {
      setLoading(false);
    }
  };

  const handleTransfer = async () => {
    const numberAmount = Number(amount);
    
    if (numberAmount <= 0) {
      toast.error("Transfer Amount must be greater than 0");
      return;
    }

    if (!targetUserId?.trim()) {
      toast.error("Please enter target user ID");
      return;
    }

    if (numberAmount > walletBalance.roiWallet) {
      toast.error(`Insufficient ROI wallet balance. Available: $${walletBalance.roiWallet.toFixed(2)}`);
      return;
    }
    
    setLoading(true);
    try {
      const response = await transferROIWallet({ 
        amount: numberAmount,
        targetUserId: targetUserId.trim()
      });
      if (response.success) {
        toast.success(response.message || "Transfer successful!");
        setAmount("");
        setTargetUserId("");
        setSearchedUser(null);
        await fetchWalletBalance();
      } else {
        toast.error(response.message || "Transfer failed");
      }
    } catch (error) {
      console.error("Error in transfer:", error);
      toast.error(error.response?.data?.message || "Error processing transfer");
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amt) => {
    return amt ? Number(amt).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00";
  };

  const quickAmounts = [5, 10, 25, 50, 100, 500];

  const setQuickAmount = (value) => {
    setAmount(value.toString());
  };

  // Helper component for stat cards to maintain clean code
  const StatCard = ({ label, value, icon: Icon, colorClass, borderClass, iconColor }) => (
    <div className={`bg-[#0c0c0c] border ${borderClass} rounded-[1.5rem] p-6 relative overflow-hidden group hover:bg-[#111] transition-all duration-500`}>
      <div className={`absolute -top-2 -right-2 p-3 opacity-10 group-hover:opacity-20 transition-opacity duration-500 group-hover:scale-110 ${iconColor}`}>
        <Icon size={80} />
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${colorClass}`}>{label}</span>
          <div className={`p-2 rounded-lg bg-black/50 backdrop-blur-sm border border-white/5 ${iconColor}`}>
             <Icon size={16} />
          </div>
        </div>
        <p className="text-3xl font-black font-rajdhani text-white tracking-tight">{getMoneySymbol()}{formatAmount(value)}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] p-4 lg:p-8 font-poppins relative overflow-hidden">
        
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#D4AF37] opacity-[0.03] blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#B8860B] opacity-[0.03] blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Wallet Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <StatCard 
            label="ROI Wallet" 
            value={walletBalance.roiWallet} 
            icon={TrendingUp} 
            colorClass="text-[#FFD700]" 
            borderClass="border-[#FFD700]/30" 
            iconColor="text-[#FFD700]"
            />
            <StatCard 
            label="Generation Income" 
            value={walletBalance.levelIncomeWallet} 
            icon={UserPlus} 
            colorClass="text-[#00FF88]" 
            borderClass="border-[#00FF88]/30" 
            iconColor="text-[#00FF88]"
            />
            <StatCard 
            label="Total Deposit" 
            value={walletBalance.totalDepositWallet} 
            icon={Wallet} 
            colorClass="text-white" 
            borderClass="border-white/20" 
            iconColor="text-white"
            />
        </div>

        {/* Main Card */}
        <div className="bg-[#0c0c0c] border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden backdrop-blur-sm">
            
            {/* Top Gold Accent */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60"></div>

            {/* Header */}
            <div className="flex items-center gap-5 mb-8">
                <div className="p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                    <CreditCard className="w-8 h-8 text-[#D4AF37]" strokeWidth={2.5} />
                </div>
                <div>
                    <h2 className="text-3xl font-black text-white font-rajdhani uppercase tracking-tighter italic">
                    DEPOSIT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F7E7CE]">CARD</span>
                    </h2>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
                    Manage ROI & Generation Income
                    </p>
                </div>
            </div>

            {/* Custom Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-[#050505] border border-white/10 rounded-2xl mb-8">
                {[
                    { id: "deposit", label: "Self Deposit" },
                    { id: "topup", label: "P2P Top-up" },
                    { id: "transfer", label: "ROI Transfer" }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => {
                        setActiveTab(tab.id);
                        setAmount("");
                        setTargetUserId("");
                        setSearchedUser(null);
                        }}
                        className={`flex-1 py-4 px-4 rounded-xl text-xs font-bold font-rajdhani uppercase tracking-wider transition-all duration-300 ${
                        activeTab === tab.id
                            ? "bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                            : "text-gray-500 hover:text-white hover:bg-white/5"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Quick Amount Buttons */}
            <div className="mb-8">
                <label className="flex items-center gap-2 text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-4 pl-1">
                    <DollarSign className="w-3 h-3" />
                    Quick Select
                </label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {quickAmounts.map((value) => (
                    <button
                        key={value}
                        onClick={() => setQuickAmount(value)}
                        className={`py-3 rounded-xl text-xs font-bold font-rajdhani tracking-wider transition-all duration-300 border ${
                        amount === value.toString()
                            ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]'
                            : 'bg-[#050505] border-white/10 text-gray-500 hover:border-[#D4AF37]/50 hover:text-white'
                        }`}
                    >
                        {getMoneySymbol()}{value.toLocaleString()}
                    </button>
                    ))}
                </div>
            </div>

            {/* Amount Input */}
            <div className="mb-8 relative group">
                <label className="flex items-center gap-2 text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-4 pl-1">
                    <Wallet className="w-3 h-3" />
                    {activeTab === "transfer" ? "Transfer Amount" : "Deposit Amount"} ({getMoneySymbol()})
                </label>
                
                <div className="relative">
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        min="5"
                        step="0.01"
                        className="w-full bg-[#050505] border border-white/10 rounded-2xl py-6 px-6 text-white text-3xl font-rajdhani font-bold focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/20 transition-all placeholder-gray-800"
                    />
                    {amount && (
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[#D4AF37] font-bold text-sm font-mono">
                            {getMoneySymbol()}{formatAmount(amount)}
                        </div>
                    )}
                </div>

                <div className="mt-3 pl-2 min-h-[20px]">
                    {amount && Number(amount) > 0 && (
                        Number(amount) >= 5 ? (
                            <p className="text-[10px] text-[#00FF88] font-bold uppercase tracking-widest flex items-center gap-2 animate-in fade-in slide-in-from-left-2">
                                <CheckCircle className="w-3 h-3" />
                                Amount Authorized
                            </p>
                        ) : (
                            <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest flex items-center gap-2 animate-in fade-in slide-in-from-left-2">
                                <AlertCircle className="w-3 h-3" />
                                Minimum Amount: $5.00
                            </p>
                        )
                    )}
                </div>
            </div>

            {/* Target User Input (Animated) */}
            <AnimatePresence>
                {(activeTab === "topup" || activeTab === "transfer") && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mb-8"
                    >
                        <label className="flex items-center gap-2 text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-4 pl-1">
                            <UserPlus className="w-3 h-3" />
                            Target User ID
                        </label>
                        <input
                            type="text"
                            value={targetUserId}
                            onChange={(e) => setTargetUserId(e.target.value.trimStart())}
                            placeholder="Enter User ID"
                            className="w-full bg-[#050505] border border-white/10 rounded-2xl py-5 px-6 text-white font-rajdhani text-lg tracking-wider focus:outline-none focus:border-[#D4AF37]/50 transition-all placeholder-gray-700"
                        />
                        
                        {/* Validation Logic Visuals */}
                        {activeTab === "transfer" && amount && Number(amount) > 0 && (
                            <div className="mt-3 pl-2">
                                {Number(amount) > (walletBalance.roiWallet || 0) ? (
                                    <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest flex items-center gap-2">
                                        <AlertCircle className="w-3 h-3" />
                                        Insufficient Balance: ${(walletBalance.roiWallet || 0).toFixed(2)}
                                    </p>
                                ) : targetUserId?.trim() ? (
                                    <p className="text-[10px] text-[#00FF88] font-bold uppercase tracking-widest flex items-center gap-2">
                                        <CheckCircle className="w-3 h-3" />
                                        Ready to Transfer
                                    </p>
                                ) : null}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
                onClick={
                    activeTab === "deposit" 
                    ? handleDepositForOwn 
                    : activeTab === "topup" 
                    ? handleDepositForOther 
                    : handleTransfer
                }
                disabled={isButtonDisabled}
                className={`group relative w-full py-5 rounded-2xl font-black font-rajdhani text-xl uppercase tracking-[0.2em] transition-all duration-300 overflow-hidden shadow-2xl ${
                    isButtonDisabled
                    ? 'bg-[#1a1a1a] text-gray-600 border border-white/5 cursor-not-allowed grayscale'
                    : 'bg-gradient-to-r from-[#B8860B] to-[#FFD700] text-black hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] active:scale-95'
                }`}
            >
                {/* Shine Effect */}
                {!isButtonDisabled && (
                     <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                )}

                <div className="relative flex items-center justify-center gap-3">
                    {loading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                            <span className="text-base tracking-widest">Processing...</span>
                        </>
                    ) : (
                        <>
                            {activeTab === "deposit" && <ArrowUpRight className="w-6 h-6" strokeWidth={2.5} />}
                            {activeTab === "topup" && <UserPlus className="w-6 h-6" strokeWidth={2.5} />}
                            {activeTab === "transfer" && <Send className="w-6 h-6" strokeWidth={2.5} />}
                            <span>
                                {activeTab === "deposit" && `EXECUTE DEPOSIT`}
                                {activeTab === "topup" && `EXECUTE P2P TOP-UP`}
                                {activeTab === "transfer" && `EXECUTE TRANSFER`}
                            </span>
                        </>
                    )}
                </div>
            </button>

            {/* Info Notice */}
            <div className="mt-8 p-6 bg-[#050505] border border-white/10 rounded-2xl flex items-start gap-4">
                <Shield className="text-[#D4AF37] shrink-0 mt-1" size={20} />
                <p className="text-[10px] text-gray-500 font-medium leading-relaxed uppercase tracking-wider">
                    <strong className="text-white block mb-1">Protocol Advisory:</strong>
                    {activeTab === "deposit" && "ROI and Generation Income funds are restricted to internal deposits. Direct mainnet withdrawal is disabled."}
                    {activeTab === "topup" && "Cross-chain activation authorized. You may utilize ROI/Level wallets to activate external User IDs. Minimum: $5.00."}
                    {activeTab === "transfer" && "P2P ROI Ledger Transfer initiated. Funds move strictly between ROI wallets."}
                </p>
            </div>

        </div>
      </div>
    </div>
  );
};

export default DepositCardPage;