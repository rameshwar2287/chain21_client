// import React, { useState } from "react";
// import {
//   ArrowRightLeft,
//   User,
//   DollarSign,
//   Send,
//   Shield,
//   CheckCircle,
//   AlertCircle,
//   UserCheck,
//   X,
//   Search,
//   Copy,
//   Wallet,
// } from "lucide-react";
// import {
//   sendOtp,
//   transferFunds,
//   verifyOtp,
//   verifyPayment,
//   verifyUser,
// } from "../../api/user.api";
// import { toast } from "react-toastify";
// import debounce from "lodash/debounce";
// import { useSelector } from "react-redux";
// import { sendUSDTToken } from "../../utils/helper";

// // Mock function for demonstration
// const getMoneySymbol = () => "$";

// const UserFundTransfer = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     amount: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [userVerified, setUserVerified] = useState(false);
//   const [verifying, setVerifying] = useState(false);
//   const [userInfo, setUserInfo] = useState(null); // will hold user's name if verified
//   const [userError, setUserError] = useState(null);
//   const [otpModalOpen, setOtpModalOpen] = useState(false);
//   const [verifyingOtp, setVerifyingOtp] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const walletAddress = useSelector(
//     (state) => state?.isLoggedUser?.data?.account
//   );
//   const [verifyPaymentDetails, setVerifyPaymentDetails] = useState(null);

//   const OtpModal = ({ isOpen, onClose, onVerify, loading }) => {
//     const [otp, setOtp] = useState("");

//     if (!isOpen) return null;

//     return (
//       <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4">
//         <div className="bg-slate-900 border border-purple-700/30 rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
//           <button
//             onClick={onClose}
//             className="absolute top-3 right-3 text-slate-400 hover:text-white transition"
//           >
//             <X className="w-5 h-5" />
//           </button>

//           <div className="text-center mb-5">
//             <Shield className="w-10 h-10 text-purple-400 mx-auto mb-2" />
//             <h3 className="text-xl font-bold text-white">OTP Verification</h3>
//             <p className="text-sm text-slate-400 mt-1">
//               Enter the 6-digit code sent to the registered device.
//             </p>
//           </div>

//           <input
//             type="text"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             placeholder="Enter OTP"
//             maxLength={6}
//             className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-center text-lg tracking-widest mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
//           />

//           <button
//             onClick={() => onVerify(otp)}
//             disabled={loading || otp.length !== 6}
//             className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
//               loading || otp.length !== 6
//                 ? "bg-slate-700 text-slate-500 cursor-not-allowed"
//                 : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
//             }`}
//           >
//             {loading ? "Verifying..." : "Verify OTP"}
//           </button>
//         </div>
//       </div>
//     );
//   };

//   // Inside the component
//   const debouncedVerifyUser = React.useCallback(
//     debounce(async (username) => {
//       setVerifying(true);
//       try {
//         const response = await verifyUser({ username: username.trim() });
//         if (response?.success) {
//           setUserInfo(response?.data);
//           setUserVerified(true);
//           setUserError(null);
//         } else {
//           setUserInfo(null);
//           setUserVerified(false);
//           setUserError("User not found");
//         }
//       } catch (err) {
//         console.error("Verification error:", err);
//         setUserInfo(null);
//         setUserVerified(false);
//         setUserError("An error occurred while verifying");
//       } finally {
//         setVerifying(false);
//       }
//     }, 500), // 500ms debounce delay
//     []
//   );

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     if (name === "username") {
//       setUserVerified(false);
//       setUserInfo(null);
//       setUserError(null);

//       // Trigger debounced API call if valid length
//       if (value.length >= 8 && value.length <= 12) {
//         debouncedVerifyUser(value);
//       } else {
//         debouncedVerifyUser.cancel(); // Cancel if user deletes or it's not in range
//       }
//     }
//   };

//   const handleFundTransfer = async () => {
//     if (!formData.username.trim()) {
//       toast.error("Please enter a username");
//       return;
//     }

//     if (!formData.amount || Number(formData.amount) <= 0) {
//       toast.error("Please enter a valid amount");
//       return;
//     }

//     try {
//       const res = await verifyPayment({
//         receiverAccount: userInfo?.account,
//         amount: formData.amount,
//       });
//       if (res?.success) {
//         toast.success(res?.message || "OTP sent successfully");
//         setVerifyPaymentDetails(res?.data);
//         setOtpModalOpen(true); // show OTP modal
//       } else {
//         toast.error(res?.message || "Something went wrong");
//       }
//     } catch (error) {
//       toast.error("Error sending OTP. Please try again after some time.");
//       console.error("Error sending OTP:", error);
//     }
//   };

//   const handleVerifyOtp = async (otp) => {
//     setVerifyingOtp(true);
//     try {
//       // Step 1: Verify OTP
//       const otpRes = await verifyOtp({
//         localTxId: verifyPaymentDetails?.localTxId,
//         otp,
//       });

//       if (!otpRes?.success) {
//         toast.error(otpRes?.message || "Invalid OTP");
//         return;
//       }

//       // Step 2: Send on-chain USDT transfer
//       toast.info("Initiating USDT transfer via MetaMask...");
//       const tx = await sendUSDTToken(userInfo?.account, formData.amount);

//       toast.success("Transaction sent! Waiting for confirmation...");
//       await tx.wait(); // Wait for 1 block confirmation (optional but good UX)

//       // Step 3: Notify backend with txHash
//       const transferRes = await transferFunds({
//         localTxId: verifyPaymentDetails?.localTxId,
//         txHash: tx.hash,
//       });

//       if (transferRes?.success) {
//         toast.success("Fund transfer successful!");
//         setFormData({ username: "", amount: "" });
//         setUserVerified(false);
//         setUserInfo(null);
//         setOtpModalOpen(false);
//       } else {
//         toast.error(transferRes?.message || "Transfer verification failed");
//       }
//     } catch (error) {
//       console.error("Transfer error:", error);
//       toast.error(error?.message || "Something went wrong during the transfer");
//     } finally {
//       setVerifyingOtp(false);
//       setLoading(false);
//     }
//   };

//   const formatAmount = (amt) => {
//     return amt ? Number(amt).toLocaleString() : "0";
//   };

//   const quickAmounts = [50, 100, 500, 1000];

//   const setQuickAmount = (value) => {
//     setFormData((prev) => ({ ...prev, amount: value.toString() }));
//   };

//   const isFormValid =
//     formData.username.trim() && formData.amount && Number(formData.amount) > 0;

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(walletAddress);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <>
//       <div className="max-w-2xl mx-auto">
//         <div className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border border-blue-800/30 rounded-3xl p-8 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden">
//           {/* Background Pattern */}
//           <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-purple-600/5"></div>
//           <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-purple-500/10 via-transparent to-transparent rounded-full blur-3xl"></div>

//           {/* Header */}
//           <div className="relative flex items-center justify-between mb-8">
//             <div className="flex items-center gap-4">
//               <div className="p-4 bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-2xl shadow-lg shadow-purple-500/10">
//                 <ArrowRightLeft className="w-8 h-8 text-purple-400" />
//               </div>
//               <div>
//                 <h2 className="text-3xl font-bold text-white mb-1">
//                   Fund Transfer
//                 </h2>
//                 <p className="text-slate-400">
//                   Send funds to another user instantly
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Security Notice */}
//           <div className="relative mb-8 p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl">
//             <div className="flex items-center gap-3">
//               <Shield className="w-5 h-5 text-amber-400 flex-shrink-0" />
//               <div>
//                 <span className="text-amber-300 font-semibold">
//                   Secure Transfer
//                 </span>
//                 <p className="text-amber-200/70 text-sm mt-1">
//                   All transfers are processed instantly with end-to-end
//                   encryption and cannot be reversed
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-6">
//             <div className="group">
//               <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
//                 <Wallet className="w-4 h-4 text-cyan-400" />
//                 Origin Wallet Address
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={walletAddress}
//                   disabled
//                   className="w-full bg-slate-800/30 border border-slate-700/30 rounded-xl py-4 px-5 pr-12 text-slate-300 text-sm font-mono cursor-not-allowed transition-all duration-300"
//                 />
//                 <button
//                   onClick={copyToClipboard}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-700/50 rounded-lg transition-colors duration-200 group"
//                   title="Copy address"
//                 >
//                   {copied ? (
//                     <CheckCircle className="w-4 h-4 text-green-400" />
//                   ) : (
//                     <Copy className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
//                   )}
//                 </button>

//                 {/* Copy feedback */}
//                 {copied && (
//                   <div className="absolute -top-8 right-0 bg-green-500/20 border border-green-500/30 text-green-400 text-xs px-2 py-1 rounded-lg">
//                     Copied!
//                   </div>
//                 )}
//               </div>
//               {/* <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
//               <AlertCircle className="w-3 h-3" />
//               Funds will be sent to this wallet address
//             </p> */}
//             </div>

//             {/* Username Field */}
//             <div className="group">
//               <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
//                 <User className="w-4 h-4 text-blue-400" />
//                 Recipient Username
//               </label>
//               <div className="flex gap-3">
//                 <div className="relative flex-1">
//                   <input
//                     type="text"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     placeholder="Enter recipient's username"
//                     className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl py-4 px-5 text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition-all duration-300 group-hover:border-blue-600/30 pr-12"
//                   />
//                   <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
//                 </div>
//               </div>
//               {verifying && (
//                 <p className="mt-2 text-sm text-blue-400">
//                   Verifying username...
//                 </p>
//               )}

//               {userVerified && userInfo?.username && (
//                 <div className="mt-2 flex items-center gap-2 text-green-400 text-sm font-medium">
//                   <UserCheck className="w-4 h-4" />
//                   Verified as{" "}
//                   <span className="font-semibold text-white">
//                     {userInfo.username}
//                   </span>
//                   <span className="ml-1 text-green-500">★</span>
//                 </div>
//               )}

//               {userError && (
//                 <p className="mt-2 text-sm text-red-400">{userError}</p>
//               )}
//             </div>

//             <div className="group">
//               <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
//                 <Wallet className="w-4 h-4 text-cyan-400" />
//                 Destination Wallet Address
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={userInfo?.account}
//                   disabled
//                   className="w-full bg-slate-800/30 border border-slate-700/30 rounded-xl py-4 px-5 pr-12 text-slate-300 text-sm font-mono cursor-not-allowed transition-all duration-300"
//                 />
//               </div>
//               {/* <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
//               <AlertCircle className="w-3 h-3" />
//               Funds will be sent to this wallet address
//             </p> */}
//             </div>

//             {/* Quick Amount Buttons */}
//             <div className="relative">
//               <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
//                 <DollarSign className="w-4 h-4 text-green-400" />
//                 Quick Select Amount
//               </label>
//               <div className="grid grid-cols-4 gap-3">
//                 {quickAmounts.map((value) => (
//                   <button
//                     key={value}
//                     onClick={() => setQuickAmount(value)}
//                     className={`p-3 rounded-xl text-sm font-semibold transition-all duration-300 border ${
//                       formData.amount === value.toString()
//                         ? "bg-gradient-to-r from-purple-600/30 to-blue-600/30 border-purple-500/50 text-purple-300"
//                         : "bg-slate-800/50 border-slate-700/50 text-slate-300 hover:border-purple-600/30 hover:bg-purple-600/10"
//                     }`}
//                   >
//                     {getMoneySymbol()}
//                     {value.toLocaleString()}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Amount Input */}
//             <div className="group">
//               <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
//                 <DollarSign className="w-4 h-4 text-cyan-400" />
//                 Transfer Amount ({getMoneySymbol()})
//               </label>
//               <div className="relative">
//                 <input
//                   type="number"
//                   name="amount"
//                   value={formData.amount}
//                   onChange={handleChange}
//                   placeholder="Enter amount to transfer"
//                   className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl py-4 px-5 text-white text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500/50 transition-all duration-300 group-hover:border-purple-600/30 pr-20"
//                 />
//                 <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

//                 {/* Amount Preview */}
//                 {formData.amount && (
//                   <div className="absolute right-5 top-1/2 -translate-y-1/2">
//                     <span className="text-purple-400 font-bold text-sm">
//                       {getMoneySymbol()}
//                       {formatAmount(formData.amount)}
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Transfer Summary */}
//             {isFormValid && (
//               <div className="relative p-5 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl">
//                 <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
//                   <CheckCircle className="w-5 h-5 text-green-400" />
//                   Transfer Summary
//                 </h3>
//                 <div className="space-y-3">
//                   <div className="flex justify-between items-center">
//                     <span className="text-slate-400">To:</span>
//                     <span className="text-blue-400 font-semibold">
//                       @{formData.username}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-slate-400">Amount:</span>
//                     <span className="text-white font-bold text-xl">
//                       {getMoneySymbol()}
//                       {formatAmount(formData.amount)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-slate-400">Transfer Fee:</span>
//                     <span className="text-green-400 font-semibold">
//                       {getMoneySymbol()}0.00
//                     </span>
//                   </div>
//                   <div className="border-t border-slate-600/30 pt-3">
//                     <div className="flex justify-between items-center">
//                       <span className="text-slate-300 font-semibold">
//                         Total Debit:
//                       </span>
//                       <span className="text-purple-400 font-bold text-2xl">
//                         {getMoneySymbol()}
//                         {formatAmount(formData.amount)}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Submit Button */}
//             <button
//               onClick={handleFundTransfer}
//               disabled={loading || !isFormValid}
//               className={`relative w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 overflow-hidden group ${
//                 loading || !isFormValid
//                   ? "bg-slate-700/50 text-slate-500 cursor-not-allowed border border-slate-600/30"
//                   : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] border border-purple-500/30"
//               }`}
//             >
//               <div className="relative flex items-center justify-center gap-3">
//                 {loading ? (
//                   <>
//                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                     <span>Processing Transfer...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Send className="w-5 h-5" />
//                     <span>
//                       {!isFormValid
//                         ? "Complete All Fields to Transfer"
//                         : `Send ${getMoneySymbol()}${formatAmount(
//                             formData.amount
//                           )} to @${formData.username}`}
//                     </span>
//                   </>
//                 )}
//               </div>

//               {/* Button glow effect */}
//               {!loading && isFormValid && (
//                 <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
//               )}
//             </button>
//           </div>

//           {/* Important Notice */}
//           <div className="mt-6 p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl">
//             <div className="flex items-start gap-3">
//               <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
//               <div className="text-sm text-slate-400">
//                 <p className="mb-2">
//                   <strong className="text-white">Important:</strong> Fund
//                   transfers are instant and cannot be reversed. Please verify
//                   the recipient username carefully before proceeding.
//                 </p>
//                 <p>
//                   Ensure you have sufficient balance in your wallet before
//                   initiating the transfer.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <OtpModal
//         isOpen={otpModalOpen}
//         onClose={() => setOtpModalOpen(false)}
//         onVerify={handleVerifyOtp}
//         loading={verifyingOtp}
//       />
//     </>
//   );
// };

// export default UserFundTransfer;


import React, { useState } from "react";
import {
  ArrowRightLeft,
  User,
  DollarSign,
  Send,
  Shield,
  CheckCircle,
  AlertCircle,
  UserCheck,
  X,
  Search,
  Copy,
  Wallet,
  Lock
} from "lucide-react";
import {
  sendOtp,
  transferFunds,
  verifyOtp,
  verifyPayment,
  verifyUser,
} from "../../api/user.api";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import { useSelector } from "react-redux";
import { sendUSDTToken } from "../../utils/helper";
import { motion, AnimatePresence } from "framer-motion";

// Mock function for demonstration
const getMoneySymbol = () => "$";

const UserFundTransfer = () => {
  const [formData, setFormData] = useState({
    username: "",
    amount: "",
  });
  const [loading, setLoading] = useState(false);
  const [userVerified, setUserVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // will hold user's name if verified
  const [userError, setUserError] = useState(null);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [copied, setCopied] = useState(false);
  const walletAddress = useSelector(
    (state) => state?.isLoggedUser?.data?.account
  );
  const [verifyPaymentDetails, setVerifyPaymentDetails] = useState(null);

  // --- OTP Modal Component (Restyled) ---
  const OtpModal = ({ isOpen, onClose, onVerify, loading }) => {
    const [otp, setOtp] = useState("");

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center px-4 font-poppins">
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0c0c0c] border border-[#D4AF37]/30 rounded-[2rem] p-8 w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden"
        >
            {/* Ambient Glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
            
            <button
                onClick={onClose}
                className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors"
            >
                <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-4 border border-[#D4AF37]/20">
                     <Shield className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h3 className="text-2xl font-black text-white font-rajdhani uppercase tracking-wide">Verification</h3>
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest mt-2">
                Enter the 6-digit security code
                </p>
            </div>

            <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="000000"
                maxLength={6}
                className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-4 text-[#D4AF37] text-center text-3xl font-rajdhani font-bold tracking-[0.5em] mb-6 focus:outline-none focus:border-[#D4AF37] transition-all placeholder-gray-800"
            />

            <button
                onClick={() => onVerify(otp)}
                disabled={loading || otp.length !== 6}
                className={`w-full py-4 rounded-xl font-black text-lg uppercase tracking-widest transition-all ${
                loading || otp.length !== 6
                    ? "bg-[#1a1a1a] text-gray-600 cursor-not-allowed border border-white/5"
                    : "bg-[#D4AF37] text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-[1.02]"
                }`}
            >
                {loading ? "Verifying..." : "Confirm Transfer"}
            </button>
        </motion.div>
      </div>
    );
  };

  // --- Logic remains identical ---
  const debouncedVerifyUser = React.useCallback(
    debounce(async (username) => {
      setVerifying(true);
      try {
        const response = await verifyUser({ username: username.trim() });
        if (response?.success) {
          setUserInfo(response?.data);
          setUserVerified(true);
          setUserError(null);
        } else {
          setUserInfo(null);
          setUserVerified(false);
          setUserError("User not found");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setUserInfo(null);
        setUserVerified(false);
        setUserError("An error occurred while verifying");
      } finally {
        setVerifying(false);
      }
    }, 500),
    []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "username") {
      setUserVerified(false);
      setUserInfo(null);
      setUserError(null);

      if (value.length >= 8 && value.length <= 12) {
        debouncedVerifyUser(value);
      } else {
        debouncedVerifyUser.cancel();
      }
    }
  };

  const handleFundTransfer = async () => {
    if (!formData.username.trim()) {
      toast.error("Please enter a username");
      return;
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      const res = await verifyPayment({
        receiverAccount: userInfo?.account,
        amount: formData.amount,
      });
      if (res?.success) {
        toast.success(res?.message || "OTP sent successfully");
        setVerifyPaymentDetails(res?.data);
        setOtpModalOpen(true); 
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Error sending OTP. Please try again after some time.");
      console.error("Error sending OTP:", error);
    }
  };

  const handleVerifyOtp = async (otp) => {
    setVerifyingOtp(true);
    try {
      const otpRes = await verifyOtp({
        localTxId: verifyPaymentDetails?.localTxId,
        otp,
      });

      if (!otpRes?.success) {
        toast.error(otpRes?.message || "Invalid OTP");
        return;
      }

      toast.info("Initiating USDT transfer via MetaMask...");
      const tx = await sendUSDTToken(userInfo?.account, formData.amount);

      toast.success("Transaction sent! Waiting for confirmation...");
      await tx.wait(); 

      const transferRes = await transferFunds({
        localTxId: verifyPaymentDetails?.localTxId,
        txHash: tx.hash,
      });

      if (transferRes?.success) {
        toast.success("Fund transfer successful!");
        setFormData({ username: "", amount: "" });
        setUserVerified(false);
        setUserInfo(null);
        setOtpModalOpen(false);
      } else {
        toast.error(transferRes?.message || "Transfer verification failed");
      }
    } catch (error) {
      console.error("Transfer error:", error);
      toast.error(error?.message || "Something went wrong during the transfer");
    } finally {
      setVerifyingOtp(false);
      setLoading(false);
    }
  };

  const formatAmount = (amt) => {
    return amt ? Number(amt).toLocaleString() : "0";
  };

  const quickAmounts = [50, 100, 500, 1000];

  const setQuickAmount = (value) => {
    setFormData((prev) => ({ ...prev, amount: value.toString() }));
  };

  const isFormValid = formData.username.trim() && formData.amount && Number(formData.amount) > 0;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="min-h-screen bg-[#050505] p-4 lg:p-8 font-poppins relative overflow-hidden flex items-center justify-center">
        
        {/* Background Ambience */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37] opacity-[0.03] blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#B8860B] opacity-[0.03] blur-[150px] rounded-full pointer-events-none"></div>

        <div className="w-full max-w-2xl relative z-10">
          <div className="relative bg-[#0c0c0c] border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden backdrop-blur-sm">
            
            {/* Top Gold Accent */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60"></div>

            {/* Header */}
            <div className="relative flex items-center justify-between mb-10">
              <div className="flex items-center gap-5">
                <div className="p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                  <ArrowRightLeft className="w-8 h-8 text-[#D4AF37]" strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white font-rajdhani uppercase tracking-tighter italic">
                    FUND <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F7E7CE]">TRANSFER</span>
                  </h2>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
                    Instant P2P Protocol
                  </p>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="relative mb-8 p-5 bg-[#050505] border border-white/5 rounded-2xl shadow-inner flex items-start gap-4">
               <Shield className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
               <div>
                  <span className="text-white text-xs font-black uppercase tracking-widest block mb-1">Encrypted Transfer</span>
                  <p className="text-gray-500 text-[11px] leading-relaxed">
                     All transfers are processed instantly via smart contract bridges. Transactions are irreversible once confirmed on the blockchain.
                  </p>
               </div>
            </div>

            <div className="space-y-8">
              
              {/* Origin Wallet */}
              <div className="group">
                <label className="flex items-center gap-2 text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-3 ml-1">
                  <Wallet className="w-3 h-3" />
                  Origin Wallet Address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={walletAddress}
                    disabled
                    className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl py-5 px-6 pr-14 text-gray-400 text-sm font-mono cursor-not-allowed transition-all"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-lg transition-colors group"
                    title="Copy address"
                  >
                    {copied ? (
                      <CheckCircle className="w-4 h-4 text-[#00FF88]" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-500 group-hover:text-white" />
                    )}
                  </button>
                  {copied && (
                    <span className="absolute -top-6 right-0 text-[10px] text-[#00FF88] font-bold uppercase tracking-widest">Copied</span>
                  )}
                </div>
              </div>

              {/* Recipient Username */}
              <div className="group">
                <label className="flex items-center gap-2 text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-3 ml-1">
                  <User className="w-3 h-3" />
                  Recipient Identity
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter Username"
                    className="w-full bg-[#050505] border border-white/10 rounded-2xl py-5 px-6 text-white text-lg font-rajdhani tracking-wider focus:outline-none focus:border-[#D4AF37]/50 transition-all placeholder-gray-700"
                  />
                  
                  {/* Status Indicator inside input */}
                  <div className="absolute right-6 top-1/2 -translate-y-1/2">
                    {verifying && <div className="w-4 h-4 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin"></div>}
                    {userVerified && userInfo?.username && <UserCheck className="w-5 h-5 text-[#00FF88]" />}
                    {userError && <AlertCircle className="w-5 h-5 text-red-500" />}
                  </div>
                </div>

                {/* Validation Messages */}
                <div className="mt-2 ml-1 h-5">
                    {userVerified && userInfo?.username && (
                        <p className="text-[10px] text-[#00FF88] font-bold uppercase tracking-widest flex items-center gap-1">
                            Verified: <span className="text-white">{userInfo.username}</span>
                        </p>
                    )}
                    {userError && (
                        <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">{userError}</p>
                    )}
                </div>
              </div>

               {/* Recipient Wallet (Auto-filled) */}
              <div className="group opacity-70">
                <label className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">
                  <Wallet className="w-3 h-3" />
                  Destination Address
                </label>
                <input
                  type="text"
                  value={userInfo?.account || "Waiting for valid recipient..."}
                  disabled
                  className="w-full bg-[#050505] border border-white/5 rounded-2xl py-4 px-6 text-gray-600 text-xs font-mono"
                />
              </div>

              {/* Quick Amounts */}
              <div>
                <label className="flex items-center gap-2 text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-3 ml-1">
                  <DollarSign className="w-3 h-3" />
                  Quick Select
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {quickAmounts.map((value) => (
                    <button
                      key={value}
                      onClick={() => setQuickAmount(value)}
                      className={`py-3 rounded-xl text-xs font-bold font-rajdhani tracking-wider transition-all duration-300 border ${
                        formData.amount === value.toString()
                          ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                          : "bg-[#050505] border-white/10 text-gray-500 hover:border-[#D4AF37]/50 hover:text-white"
                      }`}
                    >
                      {getMoneySymbol()}{value.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Input */}
              <div className="group">
                <label className="flex items-center gap-2 text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-3 ml-1">
                  <DollarSign className="w-3 h-3" />
                  Transfer Amount
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full bg-[#050505] border border-white/10 rounded-2xl py-6 px-6 text-white text-3xl font-rajdhani font-bold focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/20 transition-all placeholder-gray-800"
                  />
                  {formData.amount && (
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[#D4AF37] font-bold text-sm font-mono">
                      {getMoneySymbol()}{formatAmount(formData.amount)}
                    </div>
                  )}
                </div>
              </div>

              {/* Transfer Summary (Animated) */}
              <AnimatePresence>
                {isFormValid && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-2xl relative">
                        <div className="absolute top-0 right-0 p-3"><Lock className="w-4 h-4 text-[#D4AF37]/30" /></div>
                        
                        <h3 className="text-[10px] font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-[#00FF88]" />
                        Transaction Manifest
                        </h3>
                        <div className="space-y-3 text-xs font-medium">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500 uppercase tracking-wider">Recipient</span>
                            <span className="text-[#00FF88] font-mono">@{formData.username}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500 uppercase tracking-wider">Debit Amount</span>
                            <span className="text-white font-mono">{getMoneySymbol()}{formatAmount(formData.amount)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500 uppercase tracking-wider">Network Fee</span>
                            <span className="text-[#D4AF37] font-mono">0.00</span>
                        </div>
                        <div className="h-px bg-white/10 my-3"></div>
                        <div className="flex justify-between items-center">
                            <span className="text-white uppercase font-black tracking-widest">Total</span>
                            <span className="text-[#D4AF37] font-rajdhani font-bold text-2xl">
                            {getMoneySymbol()}{formatAmount(formData.amount)}
                            </span>
                        </div>
                        </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                onClick={handleFundTransfer}
                disabled={loading || !isFormValid}
                className={`group relative w-full py-5 rounded-2xl font-black font-rajdhani text-xl uppercase tracking-[0.2em] transition-all duration-300 overflow-hidden shadow-2xl ${
                  loading || !isFormValid
                    ? "bg-[#1a1a1a] text-gray-600 border border-white/5 cursor-not-allowed grayscale"
                    : "bg-gradient-to-r from-[#B8860B] to-[#FFD700] text-black hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] active:scale-95"
                }`}
              >
                {/* Shine Effect */}
                {!loading && isFormValid && (
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                )}

                <div className="relative flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                      <span className="text-sm tracking-widest">Processing...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" strokeWidth={2.5} />
                      <span>
                        {!isFormValid
                          ? "ENTER TRANSFER DETAILS"
                          : `EXECUTE TRANSFER`}
                      </span>
                    </>
                  )}
                </div>
              </button>
            </div>

            {/* Important Notice */}
            <div className="mt-8 p-5 bg-[#050505] border border-white/5 rounded-2xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500/70 flex-shrink-0 mt-0.5" />
              <div className="text-[10px] text-gray-500 font-medium leading-relaxed uppercase tracking-wider">
                <p>
                  <strong className="text-white">Warning:</strong> Blockchain transactions are immutable. Ensure recipient details are 100% accurate before execution.
                </p>
              </div>
            </div>
            
             {/* Footer Brand */}
            <div className="mt-6 flex justify-center opacity-20">
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white">CHAIN21 GLOBAL</p>
            </div>

          </div>
        </div>
      </div>
      
      <OtpModal
        isOpen={otpModalOpen}
        onClose={() => setOtpModalOpen(false)}
        onVerify={handleVerifyOtp}
        loading={verifyingOtp}
      />
    </>
  );
};

export default UserFundTransfer;