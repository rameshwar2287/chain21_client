// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import Swal from "sweetalert2";
// import { useState } from "react";
// import { MainContent } from "../../constants/mainContent";
// import {
//   AuthenticatedUserRouters,
//   LandingRouters,
// } from "../../constants/routes";
// import { loginUser } from "../../redux/slices/authSlice";
// import { getWalletAddress } from "../../utils/additionalFunc";
// import { setLoading } from "../../redux/slices/loadingSlice";
// import { loginUserApi } from "../../api/auth.api";
// import WalletOptionModal from "../../components/Screen/Landing/WalletOptionModal";
// import { toast } from "react-toastify";
// import { 
//   Wallet, 
//   Cpu, 
//   ShieldCheck, 
//   ArrowRight, 
//   Fingerprint, 
//   Globe, 
//   Mail, 
//   Lock, 
//   LogIn 
// } from "lucide-react";
// import { motion } from "framer-motion";
// import appLogo from "../../assets/chain21_2.jpeg";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [showWalletModal, setShowWalletModal] = useState(false);
  
//   // State for Email/Password Login
//   const initialData = {
//     email: "",
//     password: "",
//   };
//   const [payload, setPayload] = useState(initialData);

//   // Handle Input Changes
//   const handleChange = (e, field) => {
//     const { value } = e.target;
//     setPayload({
//       ...payload,
//       [field]: value,
//     });
//   };

//   // Handle Web3 Wallet Connect
//   const getWalletAddressConnect = async (type) => {
//     try {
//       dispatch(setLoading(true));
//       const response = await getWalletAddress(type);
//       handleLogin(response);
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Connection Failed",
//         text: "Could not connect to Web3 provider",
//         background: "#fff",
//         color: "#000",
//         confirmButtonColor: "#3b82f6",
//       });
//       dispatch(setLoading(false));
//     }
//   };

//   // Unified Login Handler for Web3
//   const handleLogin = async (address) => {
//     try {
//       dispatch(setLoading(true));
//       const response = await loginUserApi({ walletAddress: address });
//       if (response?.success) {
//         await dispatch(loginUser({
//           token: response?.token,
//           userId: response?.data?._id,
//           role: response?.data?.role,
//           data: response?.data,
//         }));
//         navigate(AuthenticatedUserRouters.DASHBOARD);
//       } else {
//         toast.error(response?.message || "Authentication failed");
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Access Denied",
//         text: "Account not found or invalid credentials",
//         background: "#fff",
//         color: "#000",
//         confirmButtonColor: "#ef4444",
//       });
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   // Unified Login Handler for Email/Password
//   const handleSubmit = async () => {
//     if (!payload.email || !payload.password) {
//       toast.warning("Please enter your credentials");
//       return;
//     }
//     dispatch(setLoading(true));
//     try {
//       const response = await loginUserApi(payload);
//       if (response?.success) {
//         await dispatch(
//           loginUser({
//             token: response?.token,
//             userId: response?.data?._id,
//             role: response?.data?.role,
//             data: response?.data,
//           })
//         );
//         Swal.fire({
//           icon: "success",
//           title: "Access Granted",
//           text: "Welcome back to the Chain21 ecosystem.",
//           background: "#fff",
//           color: "#000",
//           confirmButtonColor: "#3b82f6",
//           timer: 2000,
//         }).then(() => {
//           navigate(AuthenticatedUserRouters.DASHBOARD);
//         });
//       } else {
//         toast.error(response?.message || "Invalid credentials");
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Login Failed",
//         text: error?.response?.data?.message || error.message || "Invalid credentials provided.",
//         background: "#fff",
//         color: "#000",
//         confirmButtonColor: "#ef4444",
//       });
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center p-4 py-24 md:px-10 font-sans overflow-hidden selection:bg-[#bc13fe] selection:text-white">
//       <WalletOptionModal
//         hide={() => setShowWalletModal(false)}
//         connectWallet={(wallet) => getWalletAddressConnect(wallet)}
//         show={showWalletModal}
//       />

//       {/* Main Glass Container */}
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="w-full max-w-6xl h-full min-h-[700px] grid lg:grid-cols-2 rounded-[3.5rem] bg-white border border-slate-200 shadow-[0_50px_100px_rgba(0,0,0,0.08)] overflow-hidden"
//       >
        
//         {/* --- LEFT SIDE: CINEMATIC VISUAL --- */}
//         <div className="relative hidden lg:flex flex-col justify-between p-16 bg-slate-950 overflow-hidden">
//           {/* Background Animated Elements */}
//           <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,_rgba(59,130,246,0.15),_transparent_50%)]" />
//           <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_100%,_rgba(188,19,254,0.1),_transparent_50%)]" />
//           <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />

//           <div className="relative z-10">
//             <div className="flex items-center gap-3">
//               <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
//               <span className="text-white font-black tracking-[0.3em] uppercase text-xs">Security Protocol</span>
//             </div>
//           </div>

//           <div className="relative z-10 space-y-6">
//             <h2 className="text-5xl font-black text-white leading-tight">
//               Access the <br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 italic">Decentralized</span> <br />
//               Economy.
//             </h2>
//             <p className="text-slate-400 text-xl font-light leading-relaxed max-w-md">
//               Securely sign in to manage your real estate assets, distribute tokens, and engage with the community.
//             </p>
//           </div>

//           <div className="relative z-10 flex items-center gap-6">
//              <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 tracking-widest uppercase">
//                <ShieldCheck size={14} className="text-blue-500" /> Web3 Verified
//              </div>
//              <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 tracking-widest uppercase">
//                <Globe size={14} className="text-purple-500" /> Decentralized Node
//              </div>
//           </div>
//         </div>

//         {/* --- RIGHT SIDE: AUTHENTICATION --- */}
//         <div className="flex flex-col justify-center p-8 md:p-16 lg:p-20 relative bg-white">
          
//           {/* Mobile Background Accents */}
//           <div className="absolute inset-0 lg:hidden pointer-events-none opacity-20">
//              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 blur-[100px] rounded-full" />
//              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100 blur-[100px] rounded-full" />
//           </div>

//           <div className="max-w-md w-full mx-auto space-y-8 relative z-10">
            
//             {/* Logo Badge */}
//             <div className="flex justify-center lg:justify-start">
//               <div className="relative w-16 h-16 flex items-center justify-center rounded-[1.2rem] overflow-hidden ">
//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
//                   className="absolute inset-[-100%] z-0"
//                   style={{ background: "conic-gradient(from 0deg, #3b82f6, #bc13fe, #3b82f6)" }}
//                 />
//                 <div className="relative z-10 w-[95%] h-[95%] rounded-xl bg-white flex items-center justify-center border border-slate-100">
//                   <img src={appLogo} alt="CHAIN21 Logo" className="w-10 h-10 object-contain" />
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-3 text-center lg:text-left">
//               <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-tight">
//                 Welcome <span className="text-blue-600">Back</span>
//               </h1>
//               <p className="text-slate-500 font-medium tracking-wide uppercase text-[10px]">
//                 Chain21 Global Community Authentication
//               </p>
//             </div>

//             {/* --- EMAIL / PASSWORD LOGIN FORM --- */}
//             <div className="space-y-4">
//               <div className="space-y-1.5">
//                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
//                   <Mail size={14} /> Email Address
//                 </label>
//                 <input
//                   type="email"
//                   className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
//                   placeholder="name@example.com"
//                   value={payload.email}
//                   onChange={(e) => handleChange(e, "email")}
//                 />
//               </div>
              
//               <div className="space-y-1.5">
//                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
//                   <Lock size={14} /> Password
//                 </label>
//                 <input
//                   type="password"
//                   className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
//                   placeholder="••••••••"
//                   value={payload.password}
//                   onChange={(e) => handleChange(e, "password")}
//                 />
//               </div>

//               <button
//                 onClick={handleSubmit}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-blue-600/20 transition-all active:scale-95 flex items-center justify-center gap-2 mt-2"
//               >
//                 <LogIn size={18} /> Access Account
//               </button>
//             </div>

//             {/* OR Divider */}
//             <div className="relative py-2">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-slate-200"></div>
//               </div>
//               <div className="relative flex justify-center">
//                 <span className="px-4 bg-white text-[10px] uppercase tracking-widest text-slate-400 font-bold">Or Connect With</span>
//               </div>
//             </div>

//             {/* Web3 Action Area */}
//             <div 
//               className="group relative p-5 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-500 overflow-hidden cursor-pointer flex items-center gap-5"
//               onClick={() => setShowWalletModal(true)}
//             >
//               {/* Visual Hover Line */}
//               <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

//               <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-500">
//                 <Wallet size={26} />
//               </div>
//               <div className="space-y-0.5">
//                 <h3 className="text-lg font-bold text-black">Web3 Wallet</h3>
//                 <p className="text-xs text-slate-500 font-light">Connect decentralized wallet</p>
//               </div>
//               <ArrowRight className="ml-auto text-slate-300 group-hover:text-blue-600 group-hover:translate-x-2 transition-all mr-2" />
//             </div>

//             {/* Secure Info Note */}
//             <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-blue-50/50 border border-blue-100">
//               <Fingerprint size={16} className="text-blue-600 shrink-0" />
//               <p className="text-[10px] text-blue-800 font-medium tracking-wide uppercase leading-relaxed">
//                 Your identity is secured by <span className="font-black">Smart Contract Protocols</span>.
//               </p>
//             </div>

//             {/* Bottom Links */}
//             <div className="pt-6 border-t border-slate-100 text-center lg:text-left space-y-4">
//               <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
//                 New to CHAIN21 Community?{" "}
//                 <Link
//                   to={LandingRouters.USER_REGISTER}
//                   className="text-blue-600 hover:text-purple-600 transition-colors ml-2 underline underline-offset-8 decoration-slate-200"
//                 >
//                   Join the Revolution <ArrowRight size={12} className="inline ml-1" />
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>

//       </motion.div>

//       {/* Decorative Breadcrumb */}
//       <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-20 pointer-events-none grayscale">
//          <Cpu size={14} />
//          <span className="text-[8px] font-black uppercase tracking-[0.5em]">CHAIN21 Cloud Access Active</span>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useState } from "react";
import { MainContent } from "../../constants/mainContent";
import {
  AuthenticatedUserRouters,
  LandingRouters,
} from "../../constants/routes";
import { loginUser } from "../../redux/slices/authSlice";
import { getWalletAddress } from "../../utils/additionalFunc";
import { setLoading } from "../../redux/slices/loadingSlice";
import { loginUserApi } from "../../api/auth.api";
import WalletOptionModal from "../../components/Screen/Landing/WalletOptionModal";
import { toast } from "react-toastify";
import { 
  Wallet, 
  Cpu, 
  ShieldCheck, 
  ArrowRight, 
  Mail, 
  Lock, 
  LogIn,
  KeyRound,
  Fingerprint
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import appLogo from "../../assets/chain21_2.jpeg";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showWalletModal, setShowWalletModal] = useState(false);
  
  // UI State for Tabbed Interface
  const [authMethod, setAuthMethod] = useState("email"); // "email" or "web3"
  
  // State for Email/Password Login
  const initialData = {
    email: "",
    password: "",
  };
  const [payload, setPayload] = useState(initialData);

  // Handle Input Changes
  const handleChange = (e, field) => {
    const { value } = e.target;
    setPayload({
      ...payload,
      [field]: value,
    });
  };

  // Handle Web3 Wallet Connect
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
        background: "#111111",
        color: "#ffffff",
        confirmButtonColor: "#3b82f6",
      });
      dispatch(setLoading(false));
    }
  };

  // Unified Login Handler for Web3
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
        navigate(AuthenticatedUserRouters.DASHBOARD);
      } else {
        toast.error(response?.message || "Authentication failed");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "Account not found or invalid credentials",
        background: "#111111",
        color: "#ffffff",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Unified Login Handler for Email/Password
  const handleSubmit = async () => {
    if (!payload.email || !payload.password) {
      toast.warning("Please enter your credentials");
      return;
    }
    dispatch(setLoading(true));
    try {
      const response = await loginUserApi(payload);
      if (response?.success) {
        await dispatch(
          loginUser({
            token: response?.token,
            userId: response?.data?._id,
            role: response?.data?.role,
            data: response?.data,
          })
        );
        Swal.fire({
          icon: "success",
          title: "Access Granted",
          text: "Welcome back to the Chain21 ecosystem.",
          background: "#111111",
          color: "#ffffff",
          confirmButtonColor: "#f59e0b",
          timer: 2000,
        }).then(() => {
          navigate(AuthenticatedUserRouters.DASHBOARD);
        });
      } else {
        toast.error(response?.message || "Invalid credentials");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error?.response?.data?.message || error.message || "Invalid credentials provided.",
        background: "#111111",
        color: "#ffffff",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 py-24 md:px-10 font-sans overflow-hidden selection:bg-amber-500 selection:text-black">
      <WalletOptionModal
        hide={() => setShowWalletModal(false)}
        connectWallet={(wallet) => getWalletAddressConnect(wallet)}
        show={showWalletModal}
      />

      {/* --- Ambient Background --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/10 blur-[120px] rounded-full mix-blend-screen" />
        {/* Tech Grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Decorative Top Line */}
        <div className="w-full h-1.5 bg-gradient-to-r from-blue-600 via-amber-500 to-blue-600 rounded-t-2xl" />
        
        <div className="bg-[#111111] border-x border-b border-gray-800 rounded-b-2xl p-8 md:p-10 shadow-2xl backdrop-blur-xl">
          
          {/* Header & Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-white rounded-xl p-1 mb-6 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
              <img src={appLogo} alt="Chain21 Logo" className="w-full h-full object-contain rounded-lg" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight uppercase">
              Chain21 <span className="text-amber-500">Gateway</span>
            </h1>
            <p className="text-gray-500 text-xs mt-2 tracking-widest uppercase">Secure Portal Access</p>
          </div>

          {/* --- CUSTOM TABBED UI --- */}
          <div className="flex p-1 bg-black border border-gray-800 rounded-lg mb-8">
            <button
              onClick={() => setAuthMethod("email")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold uppercase tracking-widest rounded-md transition-all ${
                authMethod === "email" 
                  ? "bg-[#111111] text-amber-500 border border-gray-800 shadow-sm" 
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <KeyRound size={14} /> Standard
            </button>
            <button
              onClick={() => setAuthMethod("web3")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold uppercase tracking-widest rounded-md transition-all ${
                authMethod === "web3" 
                  ? "bg-[#111111] text-blue-500 border border-gray-800 shadow-sm" 
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <Wallet size={14} /> Web3
            </button>
          </div>

          {/* --- TAB CONTENT --- */}
          <div className="min-h-[240px]">
            <AnimatePresence mode="wait">
              
              {/* EMAIL TAB */}
              {authMethod === "email" && (
                <motion.div
                  key="email"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                      <Mail size={12} /> Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3.5 text-white placeholder-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm"
                        placeholder="Enter your email"
                        value={payload.email}
                        onChange={(e) => handleChange(e, "email")}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                      <Lock size={12} /> Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3.5 text-white placeholder-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm"
                        placeholder="••••••••"
                        value={payload.password}
                        onChange={(e) => handleChange(e, "password")}
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-400 text-black font-black uppercase tracking-widest text-xs py-4 rounded-xl hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all active:scale-95 flex items-center justify-center gap-2 mt-4"
                  >
                    <LogIn size={16} /> Authenticate
                  </button>
                </motion.div>
              )}

              {/* WEB3 TAB */}
              {authMethod === "web3" && (
                <motion.div
                  key="web3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col h-full justify-center space-y-6 pt-4"
                >
                  <div className="text-center space-y-2">
                    <div className="w-20 h-20 mx-auto bg-blue-900/20 border border-blue-500/30 rounded-full flex items-center justify-center text-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                      <Fingerprint size={32} />
                    </div>
                    <h3 className="text-white font-bold text-lg mt-4">Decentralized Login</h3>
                    <p className="text-gray-400 text-xs px-4 leading-relaxed">
                      Connect your wallet to securely access your tokenized real estate portfolio.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowWalletModal(true)}
                    className="w-full bg-black border border-blue-500/50 hover:bg-blue-600 hover:border-blue-500 text-white font-bold uppercase tracking-widest text-xs py-4 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-3 group"
                  >
                    <Wallet size={16} className="text-blue-400 group-hover:text-white transition-colors" /> 
                    Connect Wallet
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Area */}
          <div className="mt-8 pt-6 border-t border-gray-800 text-center">
            <p className="text-gray-500 text-xs uppercase tracking-widest">
              No account yet?{" "}
              <Link
                to={LandingRouters.USER_REGISTER}
                className="text-white font-bold hover:text-amber-500 transition-colors ml-1"
              >
                Register Now
              </Link>
            </p>
          </div>

        </div>

        {/* Security Trust Indicators */}
        <div className="mt-6 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2 text-[9px] font-bold text-gray-600 tracking-widest uppercase">
            <ShieldCheck size={12} className="text-gray-500" /> SSL Secured
          </div>
          <div className="flex items-center gap-2 text-[9px] font-bold text-gray-600 tracking-widest uppercase">
            <Cpu size={12} className="text-gray-500" /> Smart Contract Verified
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;