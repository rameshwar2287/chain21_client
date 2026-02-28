// import React, { useEffect, useState } from "react";
// import {
//   Wallet,
//   DollarSign,
//   ArrowDownLeft,
//   AlertCircle,
//   CheckCircle,
//   Copy,
//   TrendingUp,
//   Clock,
//   Shield,
//   Zap,
//   Info,
//   Sparkles
// } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import {
//   getOptForWithdrawal,
//   verifyWithdrawalDetails,
// } from "../../api/user.api";
// import { Axios } from "../../constants/mainContent";
// import { loginUser } from "../../redux/slices/authSlice";
// import { setLoading } from "../../redux/slices/loadingSlice";

// const getMoneySymbol = () => "$";

// const RequestWithdrawal = () => {
//   const [amount, setAmount] = useState("");
//   const [copied, setCopied] = useState(false);
//   const [withdrawalAmount, setWithdrawalAmount] = useState(0);
//   const dispatch = useDispatch();

//   // Fetch fresh user data
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await Axios.get("/user/get-user");
//         if (response?.data?.success) {
//           dispatch(loginUser({
//             token: response.data.token,
//             userId: response.data.data._id,
//             role: response.data.role,
//             data: response.data.data
//           }));
//         }
//       } catch (error) {
//         console.error("Error fetching fresh profile:", error);
//       }
//     };
//     fetchProfile();
//   }, [dispatch]);

//   const withdrawalInfo = useSelector((state) => state?.isLoggedUser?.data?.withdrawalInfo) || {};
//   const {
//     availableWithdrawalAmount = 0,
//     totalWithdrawableAmount = 0,
//     withdrawnAmount = 0
//   } = withdrawalInfo;

//   useEffect(() => {
//     setWithdrawalAmount(availableWithdrawalAmount);
//   }, [availableWithdrawalAmount]);

//   const walletAddress = useSelector((state) => state?.isLoggedUser?.data?.account);

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setAmount(value);
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(walletAddress);
//     setCopied(true);
//     toast.success("Address copied to clipboard!");
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const formatAmount = (amt) => {
//     return amt ? Number(amt).toLocaleString() : "0";
//   };

//   const formatCurrency = (amt) => {
//     if (!amt || Number(amt) <= 0) return "0.00";
//     return Number(amt).toLocaleString("en-US", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     });
//   };

//   const remainingAmount = withdrawalAmount - Number(amount) >= 0
//     ? withdrawalAmount - Number(amount)
//     : 0;

//   const calculateGasFees = (withdrawalAmt) => {
//     if (!withdrawalAmt || Number(withdrawalAmt) <= 0) return 0;
//     return (Number(withdrawalAmt) * 10) / 100; // 10% charges
//   };

//   const calculateNetAmount = (withdrawalAmt) => {
//     if (!withdrawalAmt || Number(withdrawalAmt) <= 0) return 0;
//     const gasFees = calculateGasFees(withdrawalAmt);
//     return Number(withdrawalAmt) - gasFees;
//   };

//   const gasFees = amount ? calculateGasFees(amount) : 0;
//   const netAmount = amount ? calculateNetAmount(amount) : 0;

//   const handleSubmit = async () => {
//     try {
//       dispatch(setLoading(true));
//       const payload = {
//         amount: Number(amount),
//         walletAddress,
//       };
//       const res = await verifyWithdrawalDetails(payload);

//       if (res?.success) {
//         const withdrawalAmountAfterWithdrawal = withdrawalAmount - Number(amount);
//         setWithdrawalAmount(withdrawalAmountAfterWithdrawal);
//         toast.success(res?.message || "Withdrawal request submitted successfully");
//         setAmount("");
//       } else {
//         const errorMessage = res?.response?.data?.message || res?.message || res?.response?.data?.error || "Something went wrong";
//         toast.error(errorMessage);
//       }
//     } catch (error) {
//       console.log("Error in withdrawal request:", error);
//       const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong";
//       toast.error(errorMessage);
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0a0f1e] via-[#0f1729] to-[#0a0f1e] py-8 px-4">
//       <div className="max-w-7xl mx-auto">

//         {/* Header Section with Glow Effect */}
//         <div className="text-center mb-12 relative">
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-500/20 via-amber-500/20 to-orange-500/20 rounded-full blur-3xl"></div>
//           <h1 className="relative text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
//             Withdrawal Portal
//           </h1>
//           <p className="relative text-slate-400 text-lg">Secure, Fast & Reliable Fund Transfers</p>
//         </div>

//         {/* Stats Cards Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

//           {/* Total Withdrawal Card */}
//           <div className="group relative bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 backdrop-blur-xl border border-yellow-500/10 rounded-3xl p-6 overflow-hidden hover:border-yellow-500/30 transition-all duration-500">
//             <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//             <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-all duration-500"></div>
//             <div className="relative">
//               <div className="flex items-center justify-between mb-4">
//                 <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total</p>
//                 <TrendingUp className="w-5 h-5 text-yellow-400" />
//               </div>
//               <h3 className="text-3xl font-black text-white mb-1">
//                 {getMoneySymbol()} {formatAmount(totalWithdrawableAmount)}
//               </h3>
//               <p className="text-slate-500 text-xs">Lifetime Capacity</p>
//             </div>
//           </div>

//           {/* Available Balance Card with Golden Accent */}
//           <div className="group relative bg-gradient-to-br from-yellow-900/20 via-amber-900/10 to-slate-900/90 backdrop-blur-xl border border-yellow-500/30 rounded-3xl p-6 overflow-hidden hover:border-yellow-500/50 transition-all duration-500 shadow-lg shadow-yellow-500/10">
//             <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-transparent"></div>
//             <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/20 rounded-full blur-3xl"></div>
//             <div className="relative">
//               <div className="flex items-center justify-between mb-4">
//                 <p className="text-yellow-200/80 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
//                   <Sparkles className="w-4 h-4" />
//                   Available
//                 </p>
//                 <DollarSign className="w-6 h-6 text-yellow-400 animate-pulse" />
//               </div>
//               <h3 className="text-4xl font-black bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-400 bg-clip-text text-transparent mb-1">
//                 {getMoneySymbol()} {formatAmount(availableWithdrawalAmount)}
//               </h3>
//               <p className="text-yellow-200/50 text-xs font-medium">Ready to Withdraw</p>
//             </div>
//           </div>

//           {/* Withdrawn Amount Card */}
//           <div className="group relative bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 backdrop-blur-xl border border-green-500/10 rounded-3xl p-6 overflow-hidden hover:border-green-500/30 transition-all duration-500">
//             <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//             <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-all duration-500"></div>
//             <div className="relative">
//               <div className="flex items-center justify-between mb-4">
//                 <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Withdrawn</p>
//                 <CheckCircle className="w-5 h-5 text-green-400" />
//               </div>
//               <h3 className="text-3xl font-black text-white mb-1">
//                 {getMoneySymbol()} {formatAmount(withdrawnAmount)}
//               </h3>
//               <p className="text-slate-500 text-xs">Historical Total</p>
//             </div>
//           </div>
//         </div>

//         {/* Main Withdrawal Form */}
//         <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-2xl border border-yellow-500/20 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl shadow-yellow-500/10">

//           {/* Background Effects */}
//           <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-transparent to-amber-500/5"></div>
//           <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl"></div>
//           <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>

//           <div className="relative z-10">

//             {/* Form Header */}
//             <div className="flex items-center gap-4 mb-10">
//               <div className="p-4 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-2xl shadow-lg shadow-yellow-500/20">
//                 <Wallet className="w-8 h-8 text-yellow-400" />
//               </div>
//               <div>
//                 <h2 className="text-3xl md:text-4xl font-black text-white">Request Withdrawal</h2>
//                 <p className="text-slate-400 text-sm mt-1">Withdraw your earnings instantly</p>
//               </div>
//             </div>

//             {/* Info Banner */}
//             <div className="mb-8 p-5 bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10 border border-amber-500/30 rounded-2xl backdrop-blur-xl">
//               <div className="flex items-start gap-3">
//                 <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
//                 <div className="flex-1">
//                   <h3 className="text-amber-300 font-bold mb-1">Important Information</h3>
//                   <ul className="text-amber-200/70 text-sm space-y-1">
//                     <li className="flex items-center gap-2">
//                       <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
//                       Minimum withdrawal: {getMoneySymbol()}10
//                     </li>
//                     <li className="flex items-center gap-2">
//                       <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
//                       10% service charges apply
//                     </li>
//                     <li className="flex items-center gap-2">
//                       <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
//                       Processing time: 24-48 hours
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>

//             {/* Available Balance Display */}
//             <div className="mb-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl">
//               <div className="flex justify-between items-center">
//                 <span className="text-green-300 font-semibold">Available Balance</span>
//                 <span className="text-2xl font-black text-green-400">
//                   {getMoneySymbol()} {formatAmount(withdrawalAmount)}
//                 </span>
//               </div>
//             </div>

//             {/* Amount Input */}
//             <div className="mb-6">
//               <label className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-3 uppercase tracking-wider">
//                 <DollarSign className="w-4 h-4 text-yellow-400" />
//                 Withdrawal Amount
//               </label>
//               <div className="relative group">
//                 <input
//                   type="number"
//                   inputMode="decimal"
//                   value={amount}
//                   onChange={handleChange}
//                   placeholder="0.00"
//                   className="w-full bg-slate-800/50 border-2 border-slate-700/50 rounded-2xl py-5 px-6 text-white text-2xl font-bold focus:outline-none focus:border-yellow-500/50 focus:ring-4 focus:ring-yellow-500/20 transition-all duration-300 placeholder:text-slate-600"
//                 />
//                 <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500/10 via-transparent to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
//               </div>

//               {/* Remaining Balance */}
//               {amount && (
//                 <div className="mt-3 flex justify-between items-center text-sm">
//                   <span className="text-slate-400">Remaining Balance</span>
//                   <span className={`font-bold ${Number(amount) > withdrawalAmount ? "text-red-400" : "text-emerald-400"}`}>
//                     {getMoneySymbol()} {formatCurrency(remainingAmount)}
//                   </span>
//                 </div>
//               )}
//             </div>

//             {/* Wallet Address */}
//             <div className="mb-8">
//               <label className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-3 uppercase tracking-wider">
//                 <Wallet className="w-4 h-4 text-yellow-400" />
//                 Destination Address
//               </label>
//               <div className="relative group">
//                 <input
//                   type="text"
//                   value={walletAddress}
//                   disabled
//                   className="w-full bg-slate-800/30 border-2 border-slate-700/30 rounded-2xl py-4 px-5 pr-14 text-slate-300 font-mono text-sm cursor-not-allowed"
//                 />
//                 <button
//                   onClick={copyToClipboard}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 rounded-xl transition-all duration-200 group"
//                   title="Copy address"
//                 >
//                   {copied ? (
//                     <CheckCircle className="w-5 h-5 text-green-400" />
//                   ) : (
//                     <Copy className="w-5 h-5 text-yellow-400" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Withdrawal Summary */}
//             {amount && Number(amount) >= 10 && Number(amount) <= withdrawalAmount && (
//               <div className="mb-8 p-6 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-blue-500/10 border border-blue-500/30 rounded-2xl backdrop-blur-xl">
//                 <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
//                   <Zap className="w-5 h-5 text-blue-400" />
//                   Transaction Summary
//                 </h3>
//                 <div className="space-y-3">
//                   <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-xl">
//                     <span className="text-slate-400">Withdrawal Amount</span>
//                     <span className="text-white font-bold text-lg">
//                       {getMoneySymbol()} {formatCurrency(amount)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-xl">
//                     <span className="text-slate-400">Service Charges (10%)</span>
//                     <span className="text-red-400 font-bold text-lg">
//                       - {getMoneySymbol()} {formatCurrency(gasFees)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl">
//                     <span className="text-green-300 font-bold">You Receive</span>
//                     <span className="text-green-400 font-black text-2xl">
//                       {getMoneySymbol()} {formatCurrency(netAmount)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Submit Button */}
//             <button
//               onClick={handleSubmit}
//               disabled={!amount || Number(amount) < 10 || Number(amount) > withdrawalAmount}
//               className={`relative w-full py-5 px-8 rounded-2xl font-black text-lg transition-all duration-300 overflow-hidden group ${!amount || Number(amount) < 10 || Number(amount) > withdrawalAmount
//                   ? "bg-slate-700/50 text-slate-500 cursor-not-allowed border-2 border-slate-600/30"
//                   : "bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 hover:from-yellow-400 hover:via-amber-400 hover:to-yellow-500 text-black shadow-2xl shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-[1.02] active:scale-[0.98] border-2 border-yellow-400/50"
//                 }`}
//             >
//               <div className="relative flex items-center justify-center gap-3">
//                 {!amount || Number(amount) < 10 || Number(amount) > withdrawalAmount ? (
//                   <>
//                     <AlertCircle className="w-6 h-6" />
//                     <span>
//                       {!amount || Number(amount) < 10
//                         ? "Enter Valid Amount"
//                         : "Insufficient Balance"}
//                     </span>
//                   </>
//                 ) : (
//                   <>
//                     <ArrowDownLeft className="w-6 h-6 group-hover:rotate-12 transition-transform" />
//                     <span>Confirm Withdrawal</span>
//                     <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
//                   </>
//                 )}
//               </div>
//               {amount && Number(amount) >= 10 && Number(amount) <= withdrawalAmount && (
//                 <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/30 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
//               )}
//             </button>

//             {/* Security Notice */}
//             <div className="mt-8 p-5 bg-slate-800/30 border border-slate-700/30 rounded-2xl backdrop-blur-sm">
//               <div className="flex items-start gap-3">
//                 <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
//                 <div className="flex-1">
//                   <h4 className="text-blue-300 font-bold mb-1 text-sm">Secure Transaction</h4>
//                   <p className="text-slate-400 text-xs leading-relaxed">
//                     All withdrawals are processed securely through encrypted channels.
//                     Please verify your wallet address before confirming. Transactions cannot be reversed once processed.
//                   </p>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default RequestWithdrawal;


/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import {
  Wallet,
  DollarSign,
  ArrowDownLeft,
  AlertCircle,
  CheckCircle,
  Copy,
  TrendingUp,
  Shield,
  Zap,
  Info,
  Sparkles
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { verifyWithdrawalDetails } from "../../api/user.api";
import { Axios } from "../../constants/mainContent";
import { loginUser } from "../../redux/slices/authSlice";
import { setLoading } from "../../redux/slices/loadingSlice";

const getMoneySymbol = () => "$";

const RequestWithdrawal = () => {
  const [amount, setAmount] = useState("");
  const [copied, setCopied] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await Axios.get("/user/get-user");
        if (response?.data?.success) {
          dispatch(loginUser({
            token: response.data.token,
            userId: response.data.data._id,
            role: response.data.role,
            data: response.data.data
          }));
        }
      } catch (error) {
        console.error("Error fetching fresh profile:", error);
      }
    };
    fetchProfile();
  }, [dispatch]);

  const withdrawalInfo = useSelector((state) => state?.isLoggedUser?.data?.withdrawalInfo) || {};
  const {
    availableWithdrawalAmount = 0,
    totalWithdrawableAmount = 0,
    withdrawnAmount = 0
  } = withdrawalInfo;

  useEffect(() => {
    setWithdrawalAmount(availableWithdrawalAmount);
  }, [availableWithdrawalAmount]);

  const walletAddress = useSelector((state) => state?.isLoggedUser?.data?.account);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    toast.success("Address copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const formatAmount = (amt) => amt ? Number(amt).toLocaleString() : "0";
  const formatCurrency = (amt) => {
    if (!amt || Number(amt) <= 0) return "0.00";
    return Number(amt).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const gasFees = amount ? (Number(amount) * 10) / 100 : 0;
  const netAmount = amount ? Number(amount) - gasFees : 0;
  const remainingAmount = withdrawalAmount - Number(amount) >= 0 ? withdrawalAmount - Number(amount) : 0;

  const handleSubmit = async () => {
    try {
      dispatch(setLoading(true));
      const res = await verifyWithdrawalDetails({ amount: Number(amount), walletAddress });
      if (res?.success) {
        setWithdrawalAmount(withdrawalAmount - Number(amount));
        toast.success(res?.message || "Success");
        setAmount("");
      } else {
        toast.error(res?.message || "Failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen  text-white py-12 px-4 font-poppins relative selection:bg-blue-500 selection:text-white">
      {/* Ambient Lighting Background */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-blue-600 opacity-[0.03] blur-[150px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600 opacity-[0.03] blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/5 pb-8 mb-12 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black font-rajdhani text-white uppercase tracking-tighter italic">
              WITHDRAWAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 pr-5">GATEWAY</span>
            </h1>
            <p className="text-gray-500 text-[11px] font-bold uppercase tracking-[0.3em] mt-2 pl-1">
              CHAIN21 GLOBAL • Secure Asset Transfer
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#0c0c0c] rounded-full border border-white/5 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Protocol Active</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Total Capacity", val: totalWithdrawableAmount, icon: TrendingUp, color: "text-gray-400" },
            { label: "Available Balance", val: availableWithdrawalAmount, icon: Zap, color: "text-blue-400", highlight: true },
            { label: "Historical Total", val: withdrawnAmount, icon: CheckCircle, color: "text-emerald-400" }
          ].map((item, i) => (
            <div key={i} className={`relative bg-[#0c0c0c] border ${item.highlight ? 'border-blue-500/30 shadow-[0_0_30px_rgba(37,99,235,0.1)]' : 'border-white/5'} p-6 rounded-[2rem] overflow-hidden group transition-all duration-500`}>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">{item.label}</p>
                  <item.icon size={18} className={item.color} />
                </div>
                <h3 className={`text-3xl font-black font-rajdhani italic ${item.highlight ? 'text-white' : 'text-gray-200'}`}>
                  {getMoneySymbol()} {formatAmount(item.val)}
                </h3>
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-500 group-hover:w-full transition-all duration-700"></div>
            </div>
          ))}
        </div>

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Form Side */}
          <div className="lg:col-span-3 bg-[#0c0c0c] border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] rounded-full"></div>
            
            <div className="relative space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400 border border-blue-500/20 shadow-inner">
                  <Wallet size={24} />
                </div>
                <h2 className="text-2xl font-black font-rajdhani uppercase tracking-tight italic">Initiate Request</h2>
              </div>

              {/* Amount Input Block */}
              <div className="space-y-4">
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors">
                    <DollarSign size={24} />
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-black/40 border border-white/10 focus:border-blue-500/50 rounded-[1.5rem] py-6 pl-16 pr-8 text-3xl font-black font-rajdhani text-white transition-all outline-none"
                  />
                  {amount && (
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
                       <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">USDT</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center px-2">
                   <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase">
                      <Info size={14} /> Min: {getMoneySymbol()}10
                   </div>
                   {amount > 0 && (
                     <div className={`text-[11px] font-black uppercase italic ${Number(amount) > withdrawalAmount ? 'text-red-500' : 'text-emerald-500'}`}>
                        Remainder: {getMoneySymbol()}{formatCurrency(remainingAmount)}
                     </div>
                   )}
                </div>
              </div>

              {/* Destination Block */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">Verified Destination</label>
                <div className="relative group">
                  <input
                    type="text"
                    value={walletAddress}
                    disabled
                    className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 px-6 text-[12px] font-mono text-gray-400 cursor-not-allowed"
                  />
                  <button onClick={copyToClipboard} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/5 hover:bg-white/10 rounded-xl text-blue-400 transition-all">
                    {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={handleSubmit}
                disabled={!amount || Number(amount) < 10 || Number(amount) > withdrawalAmount}
                className={`group relative w-full overflow-hidden rounded-[1.5rem] py-5 transition-all duration-500 ${
                  (!amount || Number(amount) < 10 || Number(amount) > withdrawalAmount)
                    ? "bg-white/5 text-gray-600 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_10px_40px_rgba(37,99,235,0.3)]"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative flex items-center justify-center gap-3 text-lg font-black uppercase italic tracking-widest">
                  {(!amount || Number(amount) < 10) ? 'Enter Amount' : Number(amount) > withdrawalAmount ? 'Over Balance' : 'Confirm Deployment'} 
                  <ArrowDownLeft size={22} className="group-hover:rotate-12 transition-transform" />
                </span>
              </button>
            </div>
          </div>

          {/* Ledger Side / Summary */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#0c0c0c] border border-white/5 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden">
               <div className="flex items-center gap-3 mb-6">
                 <Sparkles size={20} className="text-blue-400" />
                 <h3 className="text-lg font-black font-rajdhani uppercase italic tracking-tight">Fee Structure</h3>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-gray-500 text-xs font-bold uppercase">Base Amount</span>
                    <span className="text-white font-black">{getMoneySymbol()}{formatCurrency(amount || 0)}</span>
                  </div>
                  <div className="flex justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-tighter">Admin Charge (10%)</span>
                    <span className="text-red-500 font-black">-{getMoneySymbol()}{formatCurrency(gasFees)}</span>
                  </div>
                  <div className="flex justify-between p-5 bg-gradient-to-br from-blue-600/20 to-indigo-600/10 rounded-2xl border border-blue-500/20 shadow-inner">
                    <span className="text-blue-300 text-xs font-black uppercase">Final Settlement</span>
                    <span className="text-white text-2xl font-black font-rajdhani italic">{getMoneySymbol()}{formatCurrency(netAmount)}</span>
                  </div>
               </div>
            </div>

            <div className="bg-[#0c0c0c] border border-white/5 rounded-[2.5rem] p-6 text-center">
               <Shield size={24} className="mx-auto text-blue-500/50 mb-3" />
               <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.4em] leading-relaxed">
                 Institutional Grade Encryption <br/> 24-48h Settlement Cycle
               </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RequestWithdrawal;