// /* eslint-disable react/no-unescaped-entities */
// /* eslint-disable react/prop-types */
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import { ethers } from "ethers";
// import Swal from "sweetalert2";
// import { getMoneySymbol } from "../../../utils/additionalFunc";
// import { setLoading } from "../../../redux/slices/loadingSlice";
// import { sendPaymentDetail } from "../../../api/user.api";
// import { MainContent } from "../../../constants/mainContent";

// const InvestmentModal = ({ plan, onClose }) => {
//   const dispatch = useDispatch();
//   const userInfo = useSelector((state) => state?.isLoggedUser?.data);
//   console.log(userInfo)
//   const [amount, setAmount] = useState(0);
//   const MINIMUM_AMOUNT = 100;

//   useEffect(() => {
//     // Use plan min if it's higher than global minimum, otherwise use global minimum
//     const initialAmount = plan?.min && plan.min > MINIMUM_AMOUNT ? plan.min : MINIMUM_AMOUNT;
//     setAmount(initialAmount);
//   }, [plan]);

//   const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";
//   const USDT_ABI = [
//     "function allowance(address owner, address spender) view returns (uint256)",
//     "function approve(address spender, uint256 amount) returns (bool)",
//     "function transfer(address to, uint256 amount) returns (bool)",
//     "function balanceOf(address account) view returns (uint256)",
//     "function decimals() view returns (uint8)",
//   ];

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setAmount(value);
//   };

//   const handleConnectAndPayment = async () => {
//     const numberAmount = Number(amount);

//     if (!amount || numberAmount <= 0) {
//       toast.error("Please enter a valid amount");
//       return;
//     }

//     // Determine the actual minimum (plan min or global minimum, whichever is higher)
//     const actualMinimum = plan?.min && plan.min > MINIMUM_AMOUNT ? plan.min : MINIMUM_AMOUNT;

//     if (numberAmount < actualMinimum) {
//       toast.error(`Minimum investment amount is ${getMoneySymbol()}${actualMinimum}`);
//       return;
//     }

//     // Check if amount is a multiple of 100
//     if (numberAmount % 100 !== 0) {
//       toast.error(`Investment amount must be in multiples of $100 (e.g., $100, $200, $300)`);
//       return;
//     }

//     // Check if amount exceeds plan max (if plan has max)
//     if (plan?.max && plan.max !== Infinity && numberAmount > plan.max) {
//       toast.error(`Maximum investment amount for this plan is ${getMoneySymbol()}${plan.max}`);
//       return;
//     }
//     try {
//       dispatch(setLoading(true));

//       if (window.ethereum) {
//         const walletType = sessionStorage.getItem("walletType");
//         if (walletType === "safepal") {
//           const isSafePal =
//             window.ethereum.isSafePal ||
//             navigator.userAgent.toLowerCase().includes("safepal");
//           if (!isSafePal) {
//             throw new Error("Please use SafePal wallet.");
//           }
//         }
//         if (walletType === "metamask") {
//           const isMetaMask = window.ethereum.isMetaMask;
//           if (!isMetaMask) {
//             throw new Error("Please use MetaMask wallet.");
//           }
//         }
//         if (walletType === "trustwallet") {
//           const isTrustWallet = window.ethereum.isTrust;
//           if (!isTrustWallet) {
//             throw new Error("Please use Trust Wallet.");
//           }
//         }
//         await window.ethereum.request({ method: "eth_requestAccounts" });

//         try {
//           await window.ethereum.request({
//             method: "wallet_switchEthereumChain",
//             params: [{ chainId: "0x38" }],
//           });
//         } catch (switchError) {
//           if (switchError.code === 4902) {
//             try {
//               await window.ethereum.request({
//                 method: "wallet_addEthereumChain",
//                 params: [
//                   {
//                     chainId: "0x38",
//                     chainName: "Binance Smart Chain",
//                     nativeCurrency: {
//                       name: "BNB",
//                       symbol: "BNB",
//                       decimals: 18,
//                     },
//                     rpcUrls: ["https://bsc-dataseed1.binance.org/"],
//                     blockExplorerUrls: ["https://bscscan.com/"],
//                   },
//                 ],
//               });
//             } catch (addError) {
//               console.error("Error adding BSC network:", addError);
//               throw new Error("Failed to add BSC network");
//             }
//           } else {
//             throw switchError;
//           }
//         }

//         const provider = new ethers.BrowserProvider(window.ethereum);
//         const signer = await provider.getSigner();
//         const userAddress = await signer.getAddress();
//         console.log("Connected wallet address:", userAddress);
//         if (userAddress != userInfo?.account) {
//           throw new Error("Please connect to the registered wallet.");
//         }
//         const recipientAddress = import.meta.env.VITE_PAYMENT_ADDRESS;
//         if (!recipientAddress) {
//           toast.error("Please enter a recipient address");
//           return;
//         }

//         const chainId = await window.ethereum.request({
//           method: "eth_chainId",
//         });
//         if (chainId !== "0x38") {
//           throw new Error("Please connect to BSC network first");
//         }

//         const usdtContract = new ethers.Contract(
//           USDT_ADDRESS,
//           USDT_ABI,
//           signer
//         );

//         try {
//           const decimals = await usdtContract.decimals();
//           console.log(`Token decimals: ${decimals}`);
//         } catch (error) {
//           console.error("Error fetching USDT decimals:", error);
//           throw new Error("Invalid USDT contract on BSC network");
//         }

//         const balance = await usdtContract.balanceOf(userAddress);
//         const amountInUSDT = ethers.parseUnits(amount.toString(), 18);

//         if (balance < amountInUSDT) {
//           throw new Error("Insufficient USDT balance");
//         }

//         const tx = await usdtContract.transfer(recipientAddress, amountInUSDT);
//         await tx.wait();
//         console.log("Transaction hash:", tx.hash);
//         console.log(tx);

//         await onSuccess({
//           //   packageId: plan._id,
//           txnHash: tx.hash,
//           amount,
//           toWalletAddress: recipientAddress,
//           fromWalletAddress: userAddress,
//         });
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Connection Failed",
//           text: "Wallet is not installed.",
//         });
//         throw new Error("Wallet is not installed.");
//       }
//     } catch (error) {
//       console.error("Error during wallet connection or payment:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Operation Failed",
//         text:
//           error.message ||
//           "Failed to connect wallet or complete payment. Please try again.",
//       });
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   const onSuccess = async (data) => {
//     try {
//       dispatch(setLoading(true));
//       await sendPaymentDetail(data);
//       onClose();
//       toast.success("Investment successful!");
//     } catch (error) {
//       console.error("Error during wallet connection or payment:", error);
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   if (!plan) return null;

//   // Calculate the actual minimum (plan min or global minimum, whichever is higher)
//   const actualMinimum = plan?.min && plan.min > MINIMUM_AMOUNT ? plan.min : MINIMUM_AMOUNT;
//   const numberAmount = Number(amount);
//   const isAmountValid = amount && numberAmount >= actualMinimum && numberAmount % 100 === 0 && (!plan?.max || plan.max === Infinity || numberAmount <= plan.max);

//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
//       <div className="bg-slate-800 border border-slate-700/50 rounded-2xl p-8 w-full max-w-md m-4">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-bold text-white">
//             Invest in {MainContent.appName}
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-slate-400 hover:text-white text-xl"
//           >
//             <i className="fa-solid fa-times"></i>
//           </button>
//         </div>

//         <div className="space-y-4">
//           <div className="text-sm text-slate-400">
//             <span className="font-semibold text-white">
//               Minimum Investment: {getMoneySymbol()}{actualMinimum}
//             </span>
//             <span className="block text-xs mt-1">
//               Packages must be purchased in multiples of $100
//             </span>
//           </div>

//           <div>
//             <label className="text-sm text-slate-400 mb-2 block">
//               Investment Amount ({getMoneySymbol()})
//             </label>
//             <input
//               type="number"
//               value={amount}
//               onChange={handleChange}
//               min={actualMinimum}
//               step="100"
//               placeholder={`Enter amount (minimum ${getMoneySymbol()}${actualMinimum})`}
//               className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 px-4 text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
//             />
//             {amount && numberAmount < actualMinimum && (
//               <p className="text-red-400 text-xs mt-1">
//                 Minimum investment amount is {getMoneySymbol()}{actualMinimum}
//               </p>
//             )}
//             {amount && numberAmount >= actualMinimum && numberAmount % 100 !== 0 && (
//               <p className="text-red-400 text-xs mt-1">
//                 Amount must be in multiples of $100 (e.g., $100, $200, $300)
//               </p>
//             )}
//           </div>

//           <div className="text-xs text-slate-500 p-3 bg-slate-900/50 rounded-lg">
//             You are investing **{amount}
//             {getMoneySymbol()}** in the **{plan.title}** plan. Returns are
//             calculated based on the plan's APY.
//           </div>

//           <button
//             onClick={handleConnectAndPayment}
//             disabled={!isAmountValid}
//             className={`w-full p-3 rounded-xl font-semibold text-lg transition-colors shadow-lg ${!isAmountValid
//               ? "bg-slate-700 text-slate-400 cursor-not-allowed"
//               : "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-600/30"
//               }`}
//           >
//             {!isAmountValid
//               ? `Minimum ${getMoneySymbol()}${actualMinimum} Required`
//               : `Confirm ${getMoneySymbol()}${amount}`
//             }
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InvestmentModal;



/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import Swal from "sweetalert2";
import { getMoneySymbol } from "../../../utils/additionalFunc";
import { setLoading } from "../../../redux/slices/loadingSlice";
import { sendPaymentDetail } from "../../../api/user.api";
import { MainContent } from "../../../constants/mainContent";
import { ShieldCheck, X, Zap, Wallet, Info } from "lucide-react";

const InvestmentModal = ({ plan, onClose }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state?.isLoggedUser?.data);
  const [amount, setAmount] = useState(0);
  const MINIMUM_AMOUNT = 100;

  useEffect(() => {
    const initialAmount = plan?.min && plan.min > MINIMUM_AMOUNT ? plan.min : MINIMUM_AMOUNT;
    setAmount(initialAmount);
  }, [plan]);

  const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";
  const USDT_ABI = ["function transfer(address to, uint256 amount) returns (bool)", "function balanceOf(address account) view returns (uint256)", "function decimals() view returns (uint8)"];

  const handleConnectAndPayment = async () => {
    const numberAmount = Number(amount);
    const actualMinimum = plan?.min && plan.min > MINIMUM_AMOUNT ? plan.min : MINIMUM_AMOUNT;

    if (numberAmount < actualMinimum || numberAmount % 100 !== 0) {
      toast.error("Invalid amount. Please check constraints.");
      return;
    }

    try {
      dispatch(setLoading(true));
      if (!window.ethereum) throw new Error("Please install a crypto wallet.");

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      if (userAddress.toLowerCase() !== userInfo?.account?.toLowerCase()) {
        throw new Error("Please connect to your registered wallet.");
      }

      const recipientAddress = import.meta.env.VITE_PAYMENT_ADDRESS;
      const usdtContract = new ethers.Contract(USDT_ADDRESS, USDT_ABI, signer);
      const amountInUSDT = ethers.parseUnits(amount.toString(), 18);

      const tx = await usdtContract.transfer(recipientAddress, amountInUSDT);
      await tx.wait();

      await onSuccess({ txnHash: tx.hash, amount, toWalletAddress: recipientAddress, fromWalletAddress: userAddress });
    } catch (error) {
      Swal.fire({ icon: "error", title: "Transaction Failed", text: error.message });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onSuccess = async (data) => {
    await sendPaymentDetail(data);
    onClose();
    toast.success("Investment confirmed!");
  };

  const actualMinimum = plan?.min && plan.min > MINIMUM_AMOUNT ? plan.min : MINIMUM_AMOUNT;
  const numberAmount = Number(amount);
  const isAmountValid = amount && numberAmount >= actualMinimum && numberAmount % 100 === 0;

  return (
    <div className="fixed inset-0 bg-[#050505]/90  flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
      <div className="relative bg-[#0c0c0c] border border-white/10 rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        {/* Top Glow Decor */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full pointer-events-none"></div>

        {/* Header */}
        <div className="relative p-8 pb-4 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 bg-blue-500/10 rounded-lg text-blue-400">
                <Zap size={16} fill="currentColor" />
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Secure Protocol</span>
            </div>
            <h2 className="text-3xl font-black text-white font-rajdhani italic leading-none uppercase tracking-tighter">
              Invest in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 pr-5">{plan.title}</span>
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-500 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 pt-2 space-y-6">
          {/* Quick Info Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Minimum</p>
              <p className="text-xl font-black text-white">{getMoneySymbol()}{actualMinimum}</p>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Increment</p>
              <p className="text-xl font-black text-white">+{getMoneySymbol()}100</p>
            </div>
          </div>

          {/* Input Section */}
          <div className="space-y-3">
            <div className="relative">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500">
                <Wallet size={20} />
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-black/40 border border-white/10 focus:border-blue-500/50 rounded-2xl py-5 pl-14 pr-6 text-2xl font-black text-white transition-all outline-none placeholder:text-gray-700"
                placeholder="0.00"
              />
            </div>
            
            {/* Validation Warnings */}
            {amount > 0 && (
                <div className="flex gap-2 items-start px-2">
                    <Info size={14} className={isAmountValid ? "text-emerald-500" : "text-amber-500"} />
                    <p className={`text-[11px] font-medium leading-tight ${isAmountValid ? "text-emerald-500" : "text-amber-500"}`}>
                        {numberAmount < actualMinimum 
                            ? `Increase amount to at least ${getMoneySymbol()}${actualMinimum}` 
                            : numberAmount % 100 !== 0 
                            ? "Amount must be a multiple of $100" 
                            : "Amount is valid for investment"}
                    </p>
                </div>
            )}
          </div>

          {/* Summary Box */}
          <div className="bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/10 rounded-2xl p-5 relative overflow-hidden">
             <div className="relative z-10 flex justify-between items-center">
                <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Est. Power</div>
                <div className="text-xl font-black text-white uppercase italic tracking-tighter">{amount} <span className="text-blue-400 text-sm">USDT</span></div>
             </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleConnectAndPayment}
            disabled={!isAmountValid}
            className={`group relative w-full overflow-hidden rounded-2xl py-5 transition-all duration-300 ${
              !isAmountValid
                ? "bg-white/5 text-gray-600 cursor-not-allowed border border-white/5"
                : "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_10px_30px_rgba(37,99,235,0.3)]"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="relative flex items-center justify-center gap-3 text-lg font-black uppercase italic tracking-widest">
              {isAmountValid ? (
                <>Deploy Capital <ShieldCheck size={22} /></>
              ) : (
                "Invalid Amount"
              )}
            </span>
          </button>
          
          <p className="text-center text-[10px] text-gray-600 uppercase font-black tracking-[0.3em]">Institutional Grade Security</p>
        </div>
      </div>
    </div>
  );
};

export default InvestmentModal;