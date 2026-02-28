// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, Wallet, ShieldCheck, Cpu, ArrowRight, Fingerprint } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { LandingRouters } from "../../../constants/routes";
// import appLogo from "../../../assets/chain21_2.jpeg";

// const LoginModal = ({ isOpen, onClose }) => {
//   const navigate = useNavigate();

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
//           {/* 1. Backdrop with blur */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="absolute inset-0 bg-slate-900/40 "
//           />

//           {/* 2. Modal Content */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.9, y: 20 }}
//             className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden"
//           >
//             {/* Close Button */}
//             <button
//               onClick={onClose}
//               className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all z-50"
//             >
//               <X size={20} />
//             </button>

//             <div className="p-8 md:p-12 space-y-10">
//               {/* Header Badge & Title */}
//               <div className="flex flex-col items-center text-center space-y-6">
//                 <div className="relative w-20 h-20 flex items-center justify-center rounded-3xl overflow-hidden ">
//                   <motion.div
//                     animate={{ rotate: 360 }}
//                     transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
//                     className="absolute inset-[-100%] z-0"
//                     style={{ background: "conic-gradient(from 0deg, #3b82f6, #bc13fe, #3b82f6)" }}
//                   />
//                   <div className="relative z-10 w-full h-full rounded-[1.4rem] bg-white flex items-center justify-center border border-slate-50">
//                     <img src={appLogo} alt="CHAIN21 Logo" className="w-full h-full object-contain" />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <h2 className="text-3xl font-black tracking-tight text-black uppercase">
//                     Access <span className="text-blue-600">Terminal</span>
//                   </h2>
//                   <p className="text-[10px] font-bold text-black uppercase tracking-[0.3em]">
//                     Global Creative Community
//                   </p>
//                 </div>
//               </div>

//               {/* Login Action Card */}
//               <div 
//                 onClick={() => navigate(LandingRouters.USER_LOGIN)}
//                 className="group relative p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 cursor-pointer overflow-hidden"
//               >
//                 <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                
//                 <div className="flex items-center gap-6">
//                   <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-500">
//                     <Wallet size={28} />
//                   </div>
//                   <div className="text-left">
//                     <h4 className="text-lg font-bold text-slate-900">Web3 Login</h4>
//                     <p className="text-xs text-slate-500">Connect decentralized wallet</p>
//                   </div>
//                   <ArrowRight className="ml-auto text-slate-300 group-hover:text-blue-600 group-hover:translate-x-2 transition-all" />
//                 </div>
//               </div>

//               {/* Security Badge */}
//               <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-blue-50/50 border border-blue-100">
//                 <ShieldCheck size={18} className="text-blue-600" />
//                 <p className="text-[10px] text-blue-800 font-bold uppercase tracking-widest leading-tight">
//                   Encrypted Peer-to-Peer Protocol Active
//                 </p>
//               </div>

//               {/* Footer Links */}
//               <div className="pt-4 text-center space-y-4">
//                 <button 
//                    onClick={() => navigate(LandingRouters.USER_REGISTER)}
//                    className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest underline underline-offset-8 decoration-slate-200"
//                 >
//                   New Creator? Initialize ID
//                 </button>
                
//                 <div className="flex justify-center items-center gap-2 opacity-30 grayscale pt-2">
//                   <Cpu size={12} />
//                   <span className="text-[8px] font-black uppercase tracking-[0.4em]">Node Access V2.0.4</span>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default LoginModal;


import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Wallet, ShieldCheck, Cpu, ArrowRight, Fingerprint } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LandingRouters, AuthenticatedUserRouters } from "../../../constants/routes";
import { getWalletAddress } from "../../../utils/additionalFunc";
import { setLoading } from "../../../redux/slices/loadingSlice";
import { loginUserApi } from "../../../api/auth.api";
import { loginUser } from "../../../redux/slices/authSlice";
import WalletOptionModal from "../../Screen/Landing/WalletOptionModal";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import appLogo from "../../../assets/chain21_2.jpeg";

const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showWalletOptions, setShowWalletOptions] = useState(false);

  // 1. Connect Wallet Logic (Same as LoginPage)
  const getWalletAddressConnect = async (type) => {
    try {
      dispatch(setLoading(true));
      const response = await getWalletAddress(type);
      handleLogin(response);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Connection Failed",
        text: "Could not connect to Web3 provider",
        background: "#fff",
        color: "#000",
        confirmButtonColor: "#3b82f6",
      });
      dispatch(setLoading(false));
    }
  };

  // 2. Authentication Logic (Same as LoginPage)
  const handleLogin = async (address) => {
    try {
      dispatch(setLoading(true));
      const response = await loginUserApi({ walletAddress: address });
      
      if (response?.success) {
        await dispatch(loginUser({
          token: response?.token,
          userId: response?.data?._id,
          role: response?.data?.role,
          data: response?.data,
        }));
        
        onClose(); // Close modal on success
        navigate(AuthenticatedUserRouters.DASHBOARD);
      } else {
        toast.error(response?.message || "Authentication failed");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "Account not found or invalid credentials",
        background: "#fff",
        color: "#000",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      {/* Wallet Selector Nested Modal */}
      <WalletOptionModal
        hide={() => setShowWalletOptions(false)}
        connectWallet={(wallet) => getWalletAddressConnect(wallet)}
        show={showWalletOptions}
      />

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-slate-900/60 "
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.2)] border border-slate-200 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-400 hover:text-slate-900 transition-all z-50"
              >
                <X size={20} />
              </button>

              <div className="p-8 md:p-12 space-y-10">
                {/* Header Badge & Title */}
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="relative w-20 h-20 flex items-center justify-center rounded-3xl overflow-hidden ">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-[-100%] z-0"
                      style={{ background: "conic-gradient(from 0deg, #3b82f6, #bc13fe, #3b82f6)" }}
                    />
                    <div className="relative z-10 w-full h-full rounded-[1.4rem] bg-white flex items-center justify-center border border-slate-50">
                      <img src={appLogo} alt="CHAIN21 Logo" className="w-full h-full object-contain" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-3xl font-black tracking-tight text-black uppercase leading-none">
                      Access <span className="text-blue-600">Terminal</span>
                    </h2>
                    <p className="text-[10px] font-bold text-black uppercase tracking-[0.3em]">
                      Global Creative Community 
                    </p>
                  </div>
                </div>

                {/* Main Action Area */}
                <div className="space-y-6">
                  <div 
                    onClick={() => setShowWalletOptions(true)}
                    className="group relative p-6 md:p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 cursor-pointer overflow-hidden"
                  >
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-500">
                        <Wallet size={28} />
                      </div>
                      <div className="text-left">
                        <h4 className="text-lg font-bold text-black">Web3 Login</h4>
                        <p className="text-xs text-slate-500">Connect decentralized wallet </p>
                      </div>
                      <ArrowRight className="ml-auto text-slate-300 group-hover:text-blue-600 group-hover:translate-x-2 transition-all" />
                    </div>
                  </div>

                  {/* Security Badge */}
                  <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-blue-50/50 border border-blue-100">
                    <ShieldCheck size={18} className="text-blue-600" />
                    <p className="text-[10px] text-blue-800 font-bold uppercase tracking-widest leading-tight">
                      Encrypted Peer-to-Peer Protocol Active 
                    </p>
                  </div>
                </div>

                {/* Footer Links */}
                <div className="pt-4 text-center space-y-6">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    New to CHAIN21? 
                    <Link
                      to={LandingRouters.USER_REGISTER}
                      className="text-blue-600 hover:text-purple-600 transition-colors ml-2 underline underline-offset-8 decoration-slate-200"
                    >
                      Initialize ID 
                    </Link>
                  </p>
                  
                  <div className="flex justify-center items-center gap-2 opacity-30 grayscale pt-2">
                    <Cpu size={12} />
                    <span className="text-[8px] font-black uppercase tracking-[0.4em]">Node Access V2.0.4</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LoginModal;