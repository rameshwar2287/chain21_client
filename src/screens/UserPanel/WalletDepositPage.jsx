// import React, { useState } from "react";
// import { Wallet, ArrowUpRight, DollarSign, Shield, CheckCircle, AlertCircle, TrendingUp, Lock } from 'lucide-react';
// import { toast } from "react-toastify";
// import { motion, AnimatePresence } from "framer-motion";
// import { ethers } from "ethers";
// import axios from "axios";

// // Constants - Update these with your real values
// const ADMIN_WALLET_ADDRESS = "0xYourAdminWalletAddressHere"; 
// const USDT_CONTRACT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955"; // BSC USDT Example

// // Minimal ABI for USDT transfer
// const USDT_ABI = [
//   "function transfer(address to, uint256 amount) public returns (bool)",
//   "function decimals() view returns (uint8)"
// ];

// const getMoneySymbol = () => "$";

// const WalletDepositPage = () => {
//   const [amount, setAmount] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setAmount(e.target.value);
//   };

//   const handleWalletDepositRequest = async () => {
//     const numberAmount = Number(amount);
    
//     if (numberAmount < 100) {
//       toast.warn("Minimum capital injection is $100");
//       return;
//     }

//     if (!window.ethereum) {
//       toast.error("Crypto wallet not detected. Please install MetaMask, SafePal, or Trust Wallet.");
//       return;
//     }
    
//     setLoading(true);

//     try {
//       // 1. Initialize Ethers Provider (v6 syntax)
//       const provider = new ethers.BrowserProvider(window.ethereum);
      
//       // Request account access
//       const accounts = await provider.send("eth_requestAccounts", []);
//       const signer = await provider.getSigner();
//       const userAddress = accounts[0];

//       // 2. Setup USDT Contract
//       const usdtContract = new ethers.Contract(USDT_CONTRACT_ADDRESS, USDT_ABI, signer);
      
//       // Note: BSC/ETH USDT usually uses 18 decimals, but Polygon/Ethereum USDT uses 6. 
//       // Always verify decimals() if you want to be 100% safe.
//       const decimals = await usdtContract.decimals();
//       const parsedAmount = ethers.parseUnits(amount.toString(), decimals);

//       // 3. Execute Transaction
//       toast.info("Please confirm the transaction in your wallet...");
//       const tx = await usdtContract.transfer(ADMIN_WALLET_ADDRESS, parsedAmount);
      
//       toast.info("Transaction pending... waiting for blockchain confirmation.");
      
//       // 4. Wait for confirmation
//       const receipt = await tx.wait();

//       if (receipt.status === 1) {
//         // 5. Store in Database
//         // Replace with your actual backend endpoint
//         const response = await axios.post("/api/wallet/deposit", {
//           userId: "USER_ID_FROM_CONTEXT", // Pass your actual user ID here
//           amount: numberAmount,
//           txHash: tx.hash,
//           fromAddress: userAddress,
//           status: "completed"
//         });

//         if (response.status === 200 || response.status === 201) {
//           toast.success("Capital Injection Authorized & Recorded Successfully");
//           setAmount("");
//         }
//       } else {
//         throw new Error("Transaction failed on-chain");
//       }

//     } catch (error) {
//       console.error("Deposit Error:", error);
//       const errorMessage = error.reason || error.message || "Transaction Failed";
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatAmount = (amt) => {
//     return amt ? Number(amt).toLocaleString() : "0";
//   };

//   const quickAmounts = [100, 500, 1000, 5000];

//   return (
//     <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 font-poppins relative overflow-hidden">
      
//       {/* Background Ambience */}
//       <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#D4AF37] opacity-[0.03] blur-[150px] rounded-full pointer-events-none"></div>
//       <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#B8860B] opacity-[0.03] blur-[150px] rounded-full pointer-events-none"></div>

//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="w-full max-w-2xl relative"
//       >
//         <div className="bg-[#0c0c0c] border border-white/5 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden backdrop-blur-sm">
          
//           <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50"></div>

//           {/* Header */}
//           <div className="flex items-center justify-between mb-10">
//             <div className="flex items-center gap-5">
//               <div className="p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl shadow-[0_0_20px_rgba(212,175,55,0.1)]">
//                 <ArrowUpRight className="w-8 h-8 text-[#D4AF37]" strokeWidth={2.5} />
//               </div>
//               <div>
//                 <h2 className="text-3xl font-black text-white font-rajdhani uppercase tracking-tighter italic">
//                   ADD <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F7E7CE]">FUNDS</span>
//                 </h2>
//                 <div className="flex items-center gap-2 mt-1">
//                   <span className="w-1.5 h-1.5 bg-[#00FF88] rounded-full animate-pulse"></span>
//                   <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">
//                     Secure Gateway Active
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Security Badge */}
//           <div className="mb-10 p-5 bg-[#050505] border border-white/5 rounded-2xl flex items-start gap-4 shadow-inner">
//             <Shield className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
//             <div>
//               <span className="text-white text-xs font-black uppercase tracking-widest block mb-1">Encrypted Protocol</span>
//               <p className="text-gray-500 text-[11px] leading-relaxed">
//                 Your capital is protected by military-grade encryption. Deposits are processed via decentralized blockchain layers.
//               </p>
//             </div>
//           </div>

//           {/* Quick Amount Selector */}
//           <div className="mb-8">
//             <label className="flex items-center gap-2 text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-4 pl-1">
//               <DollarSign className="w-3 h-3" />
//               Select Volume
//             </label>
//             <div className="grid grid-cols-4 gap-3">
//               {quickAmounts.map((value) => (
//                 <button
//                   key={value}
//                   type="button"
//                   onClick={() => setAmount(value.toString())}
//                   className={`py-4 rounded-xl text-sm font-bold font-rajdhani tracking-wider transition-all duration-300 border ${
//                     amount === value.toString()
//                       ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)] scale-105'
//                       : 'bg-[#111] border-white/5 text-gray-500 hover:border-[#D4AF37]/50 hover:text-white'
//                   }`}
//                 >
//                   {getMoneySymbol()}{value.toLocaleString()}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Input Area */}
//           <div className="mb-8 relative group">
//             <label className="flex items-center gap-2 text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-4 pl-1">
//               <Wallet className="w-3 h-3" />
//               Custom Amount
//             </label>
            
//             <div className="relative">
//               <input
//                 type="number"
//                 value={amount}
//                 onChange={handleChange}
//                 placeholder="0.00"
//                 className="w-full bg-[#050505] border border-white/10 rounded-2xl py-6 px-6 text-white text-4xl font-rajdhani font-bold focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/20 transition-all placeholder-gray-800"
//               />
//               <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 font-rajdhani text-xl font-bold">USDT</span>
//             </div>

//             <div className="mt-3 pl-2 h-6">
//               {amount && Number(amount) > 0 && (
//                 Number(amount) >= 100 ? (
//                   <p className="text-[10px] text-[#00FF88] font-bold uppercase tracking-widest flex items-center gap-2">
//                     <CheckCircle className="w-3 h-3" />
//                     Volume Authorized
//                   </p>
//                 ) : (
//                   <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest flex items-center gap-2">
//                     <AlertCircle className="w-3 h-3" />
//                     Minimum Injection: $100
//                   </p>
//                 )
//               )}
//             </div>
//           </div>

//           {/* Transaction Summary */}
//           <AnimatePresence>
//             {amount && Number(amount) >= 100 && (
//               <motion.div 
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="overflow-hidden mb-8"
//               >
//                 <div className="p-6 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-2xl relative">
//                    <div className="absolute top-0 right-0 p-2">
//                       <Lock className="w-3 h-3 text-[#D4AF37]/50" />
//                    </div>

//                   <h3 className="text-[10px] font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
//                     <TrendingUp className="w-3 h-3 text-[#D4AF37]" />
//                     Transaction Manifest
//                   </h3>
                  
//                   <div className="space-y-3">
//                     <div className="flex justify-between items-center text-xs">
//                       <span className="text-gray-500 uppercase font-bold tracking-wider">Injection</span>
//                       <span className="text-white font-mono">{getMoneySymbol()}{formatAmount(amount)}</span>
//                     </div>
//                     <div className="flex justify-between items-center text-xs">
//                       <span className="text-gray-500 uppercase font-bold tracking-wider">Platform Fee</span>
//                       <span className="text-[#00FF88] font-mono">0.00</span>
//                     </div>
//                     <div className="h-px bg-white/10 my-3"></div>
//                     <div className="flex justify-between items-center">
//                       <span className="text-white text-xs uppercase font-black tracking-widest">Total Credit</span>
//                       <span className="text-[#D4AF37] font-rajdhani font-bold text-2xl drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
//                         {getMoneySymbol()}{formatAmount(amount)}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Action Button */}
//           <button
//             onClick={handleWalletDepositRequest}
//             disabled={loading || !amount || Number(amount) < 100}
//             className={`group relative w-full py-5 rounded-2xl font-black font-rajdhani text-xl uppercase tracking-[0.2em] transition-all duration-300 overflow-hidden ${
//               loading || !amount || Number(amount) < 100
//                 ? 'bg-[#1a1a1a] text-gray-600 border border-white/5 cursor-not-allowed grayscale'
//                 : 'bg-gradient-to-r from-[#B8860B] to-[#FFD700] text-black shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_50px_rgba(212,175,55,0.4)]'
//             }`}
//           >
//             <div className="relative flex items-center justify-center gap-3">
//               {loading ? (
//                 <>
//                   <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
//                   <span className="text-base tracking-widest">Verifying...</span>
//                 </>
//               ) : (
//                 <>
//                   <Wallet className="w-5 h-5" strokeWidth={2.5} />
//                   <span>
//                     {!amount || Number(amount) < 100 
//                       ? 'Verify Inputs'
//                       : 'Confirm Deposit'
//                     }
//                   </span>
//                 </>
//               )}
//             </div>
//           </button>

//           <div className="mt-8 flex justify-center opacity-30">
//             <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white">
//               CHAIN21 GLOBAL
//             </p>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default WalletDepositPage;


import React, { useState } from "react";
import { Wallet, ArrowUpRight, DollarSign, Shield, CheckCircle, AlertCircle, TrendingUp, Lock } from 'lucide-react';
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { ethers } from "ethers";
import { walletDepositRequestBlockchain } from "../../api/user.api";

// Constants - Get from environment or config
// Correct Vite Syntax
const ADMIN_WALLET_ADDRESS = import.meta.env.VITE_PAYMENT_ADDRESS || "0xYourFallbackAddress";
const USDT_CONTRACT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955"; // BSC USDT

const USDT_ABI = [
  "function transfer(address to, uint256 amount) public returns (bool)",
  "function decimals() view returns (uint8)"
];

const getMoneySymbol = () => "$";

const WalletDepositPage = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleWalletDepositRequest = async () => {
    const numberAmount = Number(amount);
    console.log(ADMIN_WALLET_ADDRESS)
    if (numberAmount < 100) {
      toast.warn("Minimum capital injection is $100");
      return;
    }

    if (!window.ethereum) {
      toast.error("Crypto wallet not detected. Please install MetaMask, SafePal, or Trust Wallet.");
      return;
    }
    
    setLoading(true);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const userAddress = accounts[0];

      const usdtContract = new ethers.Contract(USDT_CONTRACT_ADDRESS, USDT_ABI, signer);
      const decimals = await usdtContract.decimals();
      const parsedAmount = ethers.parseUnits(amount.toString(), decimals);

      toast.info("Please confirm the transaction in your wallet...");
      const tx = await usdtContract.transfer(ADMIN_WALLET_ADDRESS, parsedAmount);
      
      toast.info("Transaction pending... waiting for blockchain confirmation.");
      const receipt = await tx.wait();

      if (receipt.status === 1) {
        const response = await walletDepositRequestBlockchain({
          amount: numberAmount,
          txHash: tx.hash,
          fromAddress: userAddress
        });

        if (response.success) {
          toast.success("Capital Injection Authorized & Recorded Successfully");
          setAmount("");
        } else {
          toast.error(response.message || "Failed to record deposit");
        }
      } else {
        throw new Error("Transaction failed on-chain");
      }

    } catch (error) {
      console.error("Deposit Error:", error);
      const errorMessage = error.reason || error.message || "Transaction Failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amt) => {
    return amt ? Number(amt).toLocaleString() : "0";
  };

  const quickAmounts = [100, 500, 1000, 5000];

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 font-poppins relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#D4AF37] opacity-[0.03] blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#B8860B] opacity-[0.03] blur-[150px] rounded-full pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl relative"
      >
        <div className="bg-[#0c0c0c] border border-white/5 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden backdrop-blur-sm">
          
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50"></div>

          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                <ArrowUpRight className="w-8 h-8 text-[#D4AF37]" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-white font-rajdhani uppercase tracking-tighter italic">
                  ADD <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F7E7CE]">FUNDS</span>
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-1.5 h-1.5 bg-[#00FF88] rounded-full animate-pulse"></span>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                    Secure Gateway Active
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Badge */}
          <div className="mb-10 p-5 bg-[#050505] border border-white/5 rounded-2xl flex items-start gap-4 shadow-inner">
            <Shield className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
            <div>
              <span className="text-white text-xs font-black uppercase tracking-widest block mb-1">Encrypted Protocol</span>
              <p className="text-gray-500 text-[11px] leading-relaxed">
                Your capital is protected by military-grade encryption. Deposits are processed via decentralized blockchain layers.
              </p>
            </div>
          </div>

          {/* Quick Amount Selector */}
          <div className="mb-8">
            <label className="flex items-center gap-2 text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-4 pl-1">
              <DollarSign className="w-3 h-3" />
              Select Volume
            </label>
            <div className="grid grid-cols-4 gap-3">
              {quickAmounts.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAmount(value.toString())}
                  className={`py-4 rounded-xl text-sm font-bold font-rajdhani tracking-wider transition-all duration-300 border ${
                    amount === value.toString()
                      ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)] scale-105'
                      : 'bg-[#111] border-white/5 text-gray-500 hover:border-[#D4AF37]/50 hover:text-white'
                  }`}
                >
                  {getMoneySymbol()}{value.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="mb-8 relative group">
            <label className="flex items-center gap-2 text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-4 pl-1">
              <Wallet className="w-3 h-3" />
              Custom Amount
            </label>
            
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full bg-[#050505] border border-white/10 rounded-2xl py-6 px-6 text-white text-4xl font-rajdhani font-bold focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/20 transition-all placeholder-gray-800"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 font-rajdhani text-xl font-bold">USDT</span>
            </div>

            <div className="mt-3 pl-2 h-6">
              {amount && Number(amount) > 0 && (
                Number(amount) >= 100 ? (
                  <p className="text-[10px] text-[#00FF88] font-bold uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle className="w-3 h-3" />
                    Volume Authorized
                  </p>
                ) : (
                  <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest flex items-center gap-2">
                    <AlertCircle className="w-3 h-3" />
                    Minimum Injection: $100
                  </p>
                )
              )}
            </div>
          </div>

          {/* Transaction Summary */}
          <AnimatePresence>
            {amount && Number(amount) >= 100 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-8"
              >
                <div className="p-6 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-2xl relative">
                   <div className="absolute top-0 right-0 p-2">
                      <Lock className="w-3 h-3 text-[#D4AF37]/50" />
                   </div>

                  <h3 className="text-[10px] font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                    <TrendingUp className="w-3 h-3 text-[#D4AF37]" />
                    Transaction Manifest
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500 uppercase font-bold tracking-wider">Injection</span>
                      <span className="text-white font-mono">{getMoneySymbol()}{formatAmount(amount)}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500 uppercase font-bold tracking-wider">Platform Fee</span>
                      <span className="text-[#00FF88] font-mono">0.00</span>
                    </div>
                    <div className="h-px bg-white/10 my-3"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-white text-xs uppercase font-black tracking-widest">Total Credit</span>
                      <span className="text-[#D4AF37] font-rajdhani font-bold text-2xl drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                        {getMoneySymbol()}{formatAmount(amount)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Button */}
          <button
            onClick={handleWalletDepositRequest}
            disabled={loading || !amount || Number(amount) < 100}
            className={`group relative w-full py-5 rounded-2xl font-black font-rajdhani text-xl uppercase tracking-[0.2em] transition-all duration-300 overflow-hidden ${
              loading || !amount || Number(amount) < 100
                ? 'bg-[#1a1a1a] text-gray-600 border border-white/5 cursor-not-allowed grayscale'
                : 'bg-gradient-to-r from-[#B8860B] to-[#FFD700] text-black shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_50px_rgba(212,175,55,0.4)]'
            }`}
          >
            <div className="relative flex items-center justify-center gap-3">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                  <span className="text-base tracking-widest">Verifying...</span>
                </>
              ) : (
                <>
                  <Wallet className="w-5 h-5" strokeWidth={2.5} />
                  <span>
                    {!amount || Number(amount) < 100 
                      ? 'Verify Inputs'
                      : 'Confirm Deposit'
                    }
                  </span>
                </>
              )}
            </div>
          </button>

          <div className="mt-8 flex justify-center opacity-30">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white">
              CHAIN21 GLOBAL
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WalletDepositPage;
