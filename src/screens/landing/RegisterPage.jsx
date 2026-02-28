// // import { Link, useLocation, useNavigate } from "react-router-dom";
// // import { useDispatch } from "react-redux";
// // import { useEffect, useState } from "react";
// // import { toast } from "react-toastify";
// // import Swal from "sweetalert2";
// // import { getWalletAddress } from "../../utils/additionalFunc";
// // import {
// //   nameValidator,
// //   phoneValidator,
// //   validateWalletAddress,
// // } from "../../utils/inputValidator";
// // import WalletOptionModal from "../../components/Screen/Landing/WalletOptionModal";
// // import { createUserApi } from "../../api/auth.api";
// // import { loginUser } from "../../redux/slices/authSlice";
// // import { setLoading } from "../../redux/slices/loadingSlice";
// // import {
// //   AuthenticatedUserRouters,
// //   LandingRouters,
// // } from "../../constants/routes";
// // import { MainContent, backendConfig } from "../../constants/mainContent";
// // import { User, Phone, MapPin, Wallet, UserPlus, ShieldCheck, Globe } from "lucide-react";
// // import { motion } from "framer-motion";

// // // Country List Data
// // const countryList = [
// //   { name: "Afghanistan", code: "+93" },
// //   { name: "Albania", code: "+355" },
// //   { name: "Algeria", code: "+213" },
// //   { name: "Argentina", code: "+54" },
// //   { name: "Australia", code: "+61" },
// //   { name: "Austria", code: "+43" },
// //   { name: "Bangladesh", code: "+880" },
// //   { name: "Belgium", code: "+32" },
// //   { name: "Brazil", code: "+55" },
// //   { name: "Canada", code: "+1" },
// //   { name: "China", code: "+86" },
// //   { name: "Colombia", code: "+57" },
// //   { name: "Denmark", code: "+45" },
// //   { name: "Egypt", code: "+20" },
// //   { name: "France", code: "+33" },
// //   { name: "Germany", code: "+49" },
// //   { name: "Ghana", code: "+233" },
// //   { name: "Greece", code: "+30" },
// //   { name: "India", code: "+91" },
// //   { name: "Indonesia", code: "+62" },
// //   { name: "Iran", code: "+98" },
// //   { name: "Iraq", code: "+964" },
// //   { name: "Ireland", code: "+353" },
// //   { name: "Italy", code: "+39" },
// //   { name: "Japan", code: "+81" },
// //   { name: "Kenya", code: "+254" },
// //   { name: "Malaysia", code: "+60" },
// //   { name: "Mexico", code: "+52" },
// //   { name: "Morocco", code: "+212" },
// //   { name: "Nepal", code: "+977" },
// //   { name: "Netherlands", code: "+31" },
// //   { name: "New Zealand", code: "+64" },
// //   { name: "Nigeria", code: "+234" },
// //   { name: "Norway", code: "+47" },
// //   { name: "Pakistan", code: "+92" },
// //   { name: "Philippines", code: "+63" },
// //   { name: "Poland", code: "+48" },
// //   { name: "Portugal", code: "+351" },
// //   { name: "Russia", code: "+7" },
// //   { name: "Saudi Arabia", code: "+966" },
// //   { name: "Singapore", code: "+65" },
// //   { name: "South Africa", code: "+27" },
// //   { name: "South Korea", code: "+82" },
// //   { name: "Spain", code: "+34" },
// //   { name: "Sri Lanka", code: "+94" },
// //   { name: "Sweden", code: "+46" },
// //   { name: "Switzerland", code: "+41" },
// //   { name: "Thailand", code: "+66" },
// //   { name: "Turkey", code: "+90" },
// //   { name: "Ukraine", code: "+380" },
// //   { name: "United Arab Emirates", code: "+971" },
// //   { name: "United Kingdom", code: "+44" },
// //   { name: "United States", code: "+1" },
// //   { name: "Vietnam", code: "+84" }
// // ];

// // const RegisterPage = () => {
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();
// //   const { search } = useLocation();
// //   const [showWalletModal, setShowWalletModal] = useState(false);

// //   const [formData, setFormData] = useState({
// //     username: "",
// //     mobile: "",
// //     referral: "",
// //     walletAddress: "",
// //     countryCode: "",
// //     country: ""
// //   });

// //   const [sponsorInfo, setSponsorInfo] = useState({
// //     username: "",
// //     loading: false,
// //     error: ""
// //   });

// //   const [errors, setErrors] = useState({});

// //   useEffect(() => {
// //     if (search) {
// //       const referralCode = search?.split("=")[1] || "";
// //       setFormData({
// //         ...formData,
// //         referral: referralCode,
// //       });
      
// //       if (referralCode) {
// //         fetchSponsorDetails(referralCode);
// //       }
// //     }
// //   }, [search]);

// //   const fetchSponsorDetails = async (referralCode) => {
// //     if (!referralCode || referralCode.length < 3) {
// //       setSponsorInfo({ username: "", loading: false, error: "" });
// //       return;
// //     }

// //     setSponsorInfo({ username: "", loading: true, error: "" });

// //     try {
// //       const response = await fetch(`${backendConfig.origin}/api/user/verify-referral/${referralCode}`, {
// //         method: 'GET',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         }
// //       });

// //       const data = await response.json();
      
// //       console.log("API Response:", data);

// //       if (response.ok && data.success && data.data) {
// //         setSponsorInfo({
// //           username: data.data.username,
// //           loading: false,
// //           error: ""
// //         });
// //       } else {
// //         setSponsorInfo({
// //           username: "",
// //           loading: false,
// //           error: data.message || "Invalid referral code"
// //         });
// //       }
// //     } catch (error) {
// //       console.error("Fetch sponsor error:", error);
// //       setSponsorInfo({
// //         username: "",
// //         loading: false,
// //         error: "Could not verify"
// //       });
// //     }
// //   };

// //   const handleChange = (e, field) => {
// //     const { value } = e.target;
// //     setFormData({
// //       ...formData,
// //       [field]: value,
// //     });

// //     if (field === "referral") {
// //       clearTimeout(window.referralTimeout);
// //       window.referralTimeout = setTimeout(() => {
// //         fetchSponsorDetails(value);
// //       }, 500);
// //     }
// //   };

// //   const handleCountryChange = (e) => {
// //     const selectedCountry = e.target.value;
// //     const countryData = countryList.find(c => c.name === selectedCountry);
    
// //     setFormData({
// //       ...formData,
// //       country: selectedCountry,
// //       countryCode: countryData ? countryData.code : ""
// //     });
// //   };

// //   const handleNavigate = () => {
// //     navigate(AuthenticatedUserRouters.DASHBOARD);
// //   };

// //   const validate = () => {
// //     const validationErrors = {};
// //     let isValid = true;

// //     const nameError = nameValidator(formData.username);
// //     if (nameError) { validationErrors.username = nameError; isValid = false; }

// //     const mobileError = phoneValidator(formData.mobile, false);
// //     if (mobileError) { validationErrors.mobile = mobileError; isValid = false; }
    
// //     const walletAddressError = validateWalletAddress(formData.walletAddress) || "";
// //     if (walletAddressError) { validationErrors.walletAddress = walletAddressError; isValid = false; }
    
// //     if (!formData.country) { validationErrors.country = "Country is required"; isValid = false; }
    
// //     setErrors(validationErrors);
// //     return isValid;
// //   };

// //   const handleRegisterClick = async (walletAddress) => {
// //     try {
// //       dispatch(setLoading(true));
// //       const response = await createUserApi({
// //         ...formData,
// //         walletAddress: walletAddress || formData.walletAddress,
// //       });

// //       if (response?.success) {
// //         await dispatch(
// //           loginUser({
// //             token: response?.token,
// //             userId: response?.data?._id,
// //             role: response?.data?.role,
// //             data: response?.data,
// //           })
// //         );
// //         Swal.fire({
// //           icon: "success",
// //           title: "Registration Success",
// //           text: "Welcome to CHAIN21 GLOBAL!",
// //           background: "#050505",
// //           color: "#FFD700",
// //           confirmButtonColor: "#B8860B",
// //           timer: 3000,
// //         }).then(() => {
// //           handleNavigate();
// //         });
// //       } else {
// //         toast.error(response?.response?.data?.message || "Something went wrong");
// //       }
// //     } catch (error) {
// //       Swal.fire({
// //         icon: "error",
// //         title: "Registration Failed",
// //         text: error?.response?.data?.message || error.message || "Something went wrong",
// //         background: "#050505",
// //         color: "#fff",
// //         confirmButtonColor: "#d33",
// //       });
// //     } finally {
// //       dispatch(setLoading(false));
// //     }
// //   };

// //   const handleSubmit = () => {
// //     if (validate()) {
// //       handleRegisterClick();
// //     } else {
// //       toast.error("Please check all required fields.");
// //     }
// //   };

// //   const getWalletAddressConnect = async (type) => {
// //     try {
// //       dispatch(setLoading(true));
// //       const response = await getWalletAddress(type);
// //       setFormData({ ...formData, walletAddress: response });
// //       sessionStorage.setItem("walletType", response);
// //     } catch (error) {
// //       Swal.fire({
// //         icon: "error",
// //         title: "Connection Failed",
// //         text: error?.response?.data?.message || "Could not connect wallet",
// //       });
// //     } finally {
// //       dispatch(setLoading(false));
// //     }
// //   };

// //   return (
// //     <>
// //       <WalletOptionModal
// //         hide={() => setShowWalletModal(false)}
// //         connectWallet={(wallet) => getWalletAddressConnect(wallet)}
// //         show={showWalletModal}
// //       />
      
// //       <style>{`
// //         :root {
// //           --gold-primary: #FFD700;
// //           --gold-dark: #B8860B;
// //           --obsidian: #050505;
// //           --obsidian-card: #0c0c0c;
// //         }
// //         .hero-text-gradient {
// //           background: linear-gradient(135deg, #FFF8D6 0%, #FFD700 50%, #B8860B 100%);
// //           -webkit-background-clip: text;
// //           -webkit-text-fill-color: transparent;
// //         }
// //         select.custom-select {
// //           appearance: none;
// //           background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFD700%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
// //           background-repeat: no-repeat;
// //           background-position: right 1rem center;
// //           background-size: 0.65em auto;
// //         }
// //       `}</style>

// //       <div className="relative min-h-screen bg-[#050505] pt-40 pb-12 flex items-center justify-center overflow-hidden font-poppins">
        
// //         <div className="absolute inset-0 pointer-events-none">
// //           <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#B8860B] opacity-[0.05] blur-[150px] rounded-full"></div>
// //           <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#FFD700] opacity-[0.03] blur-[150px] rounded-full"></div>
// //           <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(#FFD700 1px, transparent 1px), linear-gradient(90deg, #FFD700 1px, transparent 1px)`, backgroundSize: '50px 50px' }}></div>
// //         </div>

// //         <motion.div 
// //           initial={{ opacity: 0, scale: 0.95 }}
// //           animate={{ opacity: 1, scale: 1 }}
// //           transition={{ duration: 0.5 }}
// //           className="relative w-full max-w-4xl px-4 z-10"
// //         >
// //           <div className="bg-[#0c0c0c] border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_60px_rgba(0,0,0,0.8)] relative overflow-visible backdrop-blur-sm">
            
// //             <div className="absolute -top-10 left-1/2 -translate-x-1/2">
// //               <div className="relative rounded-2xl w-20 bg-[#0c0c0c] border border-[#B8860B]/50 shadow-[0_0_30px_rgba(212,175,55,0.15)] z-20">
// //                 <img src={MainContent.appLogo} alt="CHAIN21 Logo" className="w-full object-contain rounded-2xl" />
// //               </div>
// //             </div>

// //             <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-60"></div>

// //             <div className="text-center mb-10 mt-6">
// //               <h1 className="text-3xl md:text-4xl font-black font-rajdhani text-white mb-2 tracking-wide">
// //                 JOIN THE <span className="hero-text-gradient">ECOSYSTEM</span>
// //               </h1>
// //               <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em]">
// //                 Secure Decentralized Identity Protocol
// //               </p>
// //             </div>

// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
// //               {/* Username */}
// //               <div className="space-y-2 text-black">
// //                 <label className="text-[10px] font-bold text-[#FFD700] uppercase tracking-[0.2em] flex items-center gap-2 pl-1">
// //                   <User size={12} /> Username
// //                 </label>
// //                 <input
// //                   type="text"
// //                   placeholder="Create Username"
// //                   className="w-full bg-[#050505] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-700 focus:outline-none focus:border-[#FFD700]/50 focus:shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-all font-rajdhani tracking-wider text-sm"
// //                   value={formData.username}
// //                   onChange={(e) => handleChange(e, "username")}
// //                 />
// //                 {errors.username && <p className="text-red-500 text-[10px] uppercase font-bold tracking-wider mt-1 flex items-center gap-1"><ShieldCheck size={10} /> {errors.username}</p>}
// //               </div>

// //               {/* Country */}
// //               <div className="space-y-2 text-black">
// //                 <label className="text-[10px] font-bold text-[#FFD700] uppercase tracking-[0.2em] flex items-center gap-2 pl-1">
// //                   <MapPin size={12} /> Country
// //                 </label>
// //                 <select
// //                   className="w-full custom-select bg-[#050505] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#FFD700]/50 transition-all font-rajdhani tracking-wider text-sm appearance-none cursor-pointer hover:bg-[#0a0a0a]"
// //                   value={formData.country}
// //                   onChange={handleCountryChange}
// //                 >
// //                   <option value="" disabled className="text-gray-500">Select Region</option>
// //                   {countryList.map((c) => (
// //                     <option key={c.name} value={c.name} className="bg-[#0c0c0c] text-white">{c.name}</option>
// //                   ))}
// //                 </select>
// //                 {errors.country && <p className="text-red-500 text-[10px] uppercase font-bold tracking-wider mt-1">{errors.country}</p>}
// //               </div>

// //               {/* Country Code */}
// //               <div className="space-y-2 text-black">
// //                 <label className="text-[10px] font-bold text-[#FFD700] uppercase tracking-[0.2em] flex items-center gap-2 pl-1">
// //                   <Globe size={12} /> Dial Code
// //                 </label>
// //                 <select
// //                   className="w-full custom-select bg-[#050505] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#FFD700]/50 transition-all font-rajdhani tracking-wider text-sm appearance-none cursor-pointer hover:bg-[#0a0a0a]"
// //                   value={formData.countryCode}
// //                   onChange={(e) => handleChange(e, "countryCode")}
// //                 >
// //                   <option value="" disabled className="text-gray-500">Code</option>
// //                   {countryList.map((c, index) => (
// //                     <option key={`${c.code}-${index}`} value={c.code} className="bg-[#0c0c0c] text-white">
// //                       {c.code} ({c.name})
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>

// //               {/* Phone */}
// //               <div className="space-y-2 text-black">
// //                 <label className="text-[10px] font-bold text-[#FFD700] uppercase tracking-[0.2em] flex items-center gap-2 pl-1">
// //                   <Phone size={12} /> Mobile Number
// //                 </label>
// //                 <input
// //                   type="tel"
// //                   placeholder="000 000 0000"
// //                   className="w-full bg-[#050505] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-700 focus:outline-none focus:border-[#FFD700]/50 transition-all font-rajdhani tracking-wider text-sm"
// //                   value={formData.mobile}
// //                   onChange={(e) => handleChange(e, "mobile")}
// //                   maxLength={10}
// //                 />
// //                 {errors.mobile && <p className="text-red-500 text-[10px] uppercase font-bold tracking-wider mt-1">{errors.mobile}</p>}
// //               </div>

// //               {/* Referral */}
// //               <div className="space-y-2 text-black">
// //                 <label className="text-[10px] font-bold text-[#FFD700] uppercase tracking-[0.2em] flex items-center gap-2 pl-1">
// //                   <UserPlus size={12} /> Referral Code
// //                 </label>
// //                 <input
// //                   type="text"
// //                   placeholder="Optional Code"
// //                   className="w-full bg-[#050505] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-700 focus:outline-none focus:border-[#FFD700]/50 transition-all font-rajdhani tracking-wider text-sm"
// //                   value={formData.referral}
// //                   onChange={(e) => handleChange(e, "referral")}
// //                 />
                
// //                 {sponsorInfo.loading && (
// //                   <p className="text-blue-400 text-[10px] uppercase font-bold tracking-wider mt-1 flex items-center gap-1">
// //                     <span className="animate-spin">⏳</span> Verifying...
// //                   </p>
// //                 )}
                
// //                 {sponsorInfo.username && !sponsorInfo.loading && (
// //                   <p className="text-green-400 text-[10px] uppercase font-bold tracking-wider mt-1 flex items-center gap-1">
// //                     ✅ Sponsor: <span className="text-[#FFD700]">{sponsorInfo.username}</span>
// //                   </p>
// //                 )}
                
// //                 {sponsorInfo.error && !sponsorInfo.loading && (
// //                   <p className="text-red-500 text-[10px] uppercase font-bold tracking-wider mt-1">
// //                     ❌ {sponsorInfo.error}
// //                   </p>
// //                 )}
// //               </div>

// //               {/* Wallet Address */}
// //               <div className="md:col-span-1 space-y-2">
// //                 <label className="text-[10px] font-bold text-[#FFD700] uppercase tracking-[0.2em] flex items-center gap-2 pl-1">
// //                   <Wallet size={12} /> Digital Identity (Wallet)
// //                 </label>
// //                 <div className="relative group">
// //                   <input
// //                     type="text"
// //                     placeholder="Connect wallet"
// //                     readOnly
// //                     className="w-full bg-[#050505] border border-white/10 rounded-xl pl-5 pr-24 py-4 text-[#FFD700] font-mono text-xs placeholder-gray-800 focus:outline-none cursor-not-allowed text-ellipsis"
// //                     value={formData.walletAddress}
// //                   />
// //                   <div className="absolute right-1.5 top-1.5 bottom-1.5">
// //                     <button
// //                       type="button"
// //                       onClick={() => setShowWalletModal(true)}
// //                       className="h-full px-4 rounded-lg bg-[#D4AF37] text-black text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-lg"
// //                     >
// //                       {formData.walletAddress ? "Change" : "Connect"}
// //                     </button>
// //                   </div>
// //                 </div>
// //                 {errors.walletAddress && <p className="text-red-500 text-[10px] uppercase font-bold tracking-wider mt-1">{errors.walletAddress}</p>}
// //               </div>

// //               {/* Submit Button */}
// //               <div className="md:col-span-2 pt-8">
// //                 <button
// //                   onClick={handleSubmit}
// //                   className="w-full bg-gradient-to-r from-[#B8860B] to-[#FFD700] text-black font-black font-rajdhani text-xl py-5 rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_50px_rgba(212,175,55,0.4)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group uppercase tracking-[0.1em]"
// //                 >
// //                   <span className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-500 skew-y-12"></span>
// //                   <span className="relative flex items-center gap-3">
// //                     <UserPlus className="w-6 h-6" strokeWidth={2.5} />
// //                     Create Account
// //                   </span>
// //                 </button>
// //               </div>

// //             </div>

// //             <div className="mt-8 pt-6 border-t border-white/5 text-center">
// //               <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
// //                 Already authenticated?{" "}
// //                 <Link
// //                   to={LandingRouters.USER_LOGIN}
// //                   className="text-[#FFD700] hover:text-white transition-colors ml-2 underline underline-offset-4 decoration-[#B8860B]"
// //                 >
// //                   Access Terminal
// //                 </Link>
// //               </p>
// //             </div>

// //           </div>
// //         </motion.div>
// //       </div>
// //     </>
// //   );
// // };

// // export default RegisterPage;



// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import Swal from "sweetalert2";
// import { getWalletAddress } from "../../utils/additionalFunc";
// import {
//   nameValidator,
//   phoneValidator,
//   validateWalletAddress,
// } from "../../utils/inputValidator";
// import WalletOptionModal from "../../components/Screen/Landing/WalletOptionModal";
// import { createUserApi } from "../../api/auth.api";
// import { loginUser } from "../../redux/slices/authSlice";
// import { setLoading } from "../../redux/slices/loadingSlice";
// import {
//   AuthenticatedUserRouters,
//   LandingRouters,
// } from "../../constants/routes";
// import { MainContent, backendConfig } from "../../constants/mainContent";
// import { User, Phone, MapPin, Wallet, UserPlus, ShieldCheck, Globe, Cpu, ArrowRight, Fingerprint } from "lucide-react";
// import { motion } from "framer-motion";
// import appLogo from "../../assets/chain21_2.jpeg";

// // Updated Country List
// const countryList = [
//   { name: "Afghanistan", code: "+93" }, { name: "Albania", code: "+355" }, { name: "Algeria", code: "+213" },
//   { name: "Argentina", code: "+54" }, { name: "Australia", code: "+61" }, { name: "Austria", code: "+43" },
//   { name: "Bangladesh", code: "+880" }, { name: "Belgium", code: "+32" }, { name: "Brazil", code: "+55" },
//   { name: "Canada", code: "+1" }, { name: "China", code: "+86" }, { name: "Colombia", code: "+57" },
//   { name: "Denmark", code: "+45" }, { name: "Egypt", code: "+20" }, { name: "France", code: "+33" },
//   { name: "Germany", code: "+49" }, { name: "Ghana", code: "+233" }, { name: "Greece", code: "+30" },
//   { name: "India", code: "+91" }, { name: "Indonesia", code: "+62" }, { name: "Iran", code: "+98" },
//   { name: "Iraq", code: "+964" }, { name: "Ireland", code: "+353" }, { name: "Italy", code: "+39" },
//   { name: "Japan", code: "+81" }, { name: "Kenya", code: "+254" }, { name: "Malaysia", code: "+60" },
//   { name: "Mexico", code: "+52" }, { name: "Morocco", code: "+212" }, { name: "Nepal", code: "+977" },
//   { name: "Netherlands", code: "+31" }, { name: "New Zealand", code: "+64" }, { name: "Nigeria", code: "+234" },
//   { name: "Norway", code: "+47" }, { name: "Pakistan", code: "+92" }, { name: "Philippines", code: "+63" },
//   { name: "Poland", code: "+48" }, { name: "Portugal", code: "+351" }, { name: "Russia", code: "+7" },
//   { name: "Saudi Arabia", code: "+966" }, { name: "Singapore", code: "+65" }, { name: "South Africa", code: "+27" },
//   { name: "South Korea", code: "+82" }, { name: "Spain", code: "+34" }, { name: "Sri Lanka", code: "+94" },
//   { name: "Sweden", code: "+46" }, { name: "Switzerland", code: "+41" }, { name: "Thailand", code: "+66" },
//   { name: "Turkey", code: "+90" }, { name: "Ukraine", code: "+380" }, { name: "United Arab Emirates", code: "+971" },
//   { name: "United Kingdom", code: "+44" }, { name: "United States", code: "+1" }, { name: "Vietnam", code: "+84" }
// ];

// const RegisterPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { search } = useLocation();
//   const [showWalletModal, setShowWalletModal] = useState(false);

//   const [formData, setFormData] = useState({
//     username: "",
//     mobile: "",
//     referral: "",
//     walletAddress: "",
//     countryCode: "",
//     country: ""
//   });

//   const [sponsorInfo, setSponsorInfo] = useState({ username: "", loading: false, error: "" });
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (search) {
//       const referralCode = search?.split("=")[1] || "";
//       setFormData(prev => ({ ...prev, referral: referralCode }));
//       if (referralCode) fetchSponsorDetails(referralCode);
//     }
//   }, [search]);

//   const fetchSponsorDetails = async (code) => {
//     if (!code || code.length < 3) return;
//     setSponsorInfo({ username: "", loading: true, error: "" });
//     try {
//       const res = await fetch(`${backendConfig.origin}/api/user/verify-referral/${code}`);
//       const data = await res.json();
//       if (res.ok && data.success) setSponsorInfo({ username: data.data.username, loading: false, error: "" });
//       else setSponsorInfo({ username: "", loading: false, error: "Invalid Sponsor" });
//     } catch {
//       setSponsorInfo({ username: "", loading: false, error: "Verification Failed" });
//     }
//   };

//   const handleChange = (e, field) => {
//     const { value } = e.target;
//     setFormData(prev => ({ ...prev, [field]: value }));
//     if (field === "referral") {
//       clearTimeout(window.referralTimeout);
//       window.referralTimeout = setTimeout(() => fetchSponsorDetails(value), 500);
//     }
//   };

//   const handleCountryChange = (e) => {
//     const selected = e.target.value;
//     const countryData = countryList.find(c => c.name === selected);
//     setFormData(prev => ({ ...prev, country: selected, countryCode: countryData ? countryData.code : "" }));
//   };

//   const validate = () => {
//     const valErrors = {};
//     if (nameValidator(formData.username)) valErrors.username = "Invalid Username";
//     if (phoneValidator(formData.mobile, false)) valErrors.mobile = "Invalid Phone";
//     if (validateWalletAddress(formData.walletAddress)) valErrors.walletAddress = "Wallet Connection Required";
//     if (!formData.country) valErrors.country = "Region Required";
//     setErrors(valErrors);
//     return Object.keys(valErrors).length === 0;
//   };

//   const handleRegister = async () => {
//     // if (!validate()) return toast.error("Please complete all required fields");
//     try {
//       dispatch(setLoading(true));
//       const res = await createUserApi(formData);
//       if (res?.success) {
//         dispatch(loginUser({ token: res.token, userId: res.data._id, role: res.data.role, data: res.data }));
//         Swal.fire({ icon: "success", title: "Welcome to CHAIN21", text: "Identity Protocol Initialized", timer: 2000, showConfirmButton: false });
//         navigate(AuthenticatedUserRouters.DASHBOARD);
//       } else {
//         toast.error(res?.response?.data?.message || "Registration Failed");
//       }
//     } catch (err) {
//       toast.error("System Error during initialization");
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center py-24 px-4 md:px-10 md:py-24 font-sans overflow-hidden selection:bg-[#bc13fe] selection:text-white">
//       <WalletOptionModal
//         hide={() => setShowWalletModal(false)}
//         connectWallet={(type) => getWalletAddress(type).then(addr => setFormData(p => ({...p, walletAddress: addr})))}
//         show={showWalletModal}
//       />

//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="w-full max-w-7xl grid lg:grid-cols-2 rounded-[3.5rem] bg-white border border-slate-300 shadow-[0_50px_100px_rgba(0,0,0,0.08)] overflow-hidden"
//       >
//         {/* --- LEFT SIDE: CINEMATIC VISUAL --- */}
//         <div className="relative hidden lg:flex flex-col justify-between p-16 bg-slate-950">
//           <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,_rgba(59,130,246,0.15),_transparent_50%)]" />
//           <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `linear-gradient(#fff 1.5px, transparent 1.5px), linear-gradient(90deg, #fff 1.5px, transparent 1.5px)`, backgroundSize: '60px 60px' }} />

//           <div className="relative z-10">
//             <div className="flex items-center gap-3">
//               <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
//               <span className="text-white font-black tracking-[0.3em] uppercase text-xs">Genesis Protocol</span>
//             </div>
//           </div>

//           <div className="relative z-10 space-y-6">
//             <h2 className="text-6xl font-black text-white leading-tight uppercase">
//               Join the <br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 italic font-bold">Creative</span> <br />
//               Revolution.
//             </h2>
//             <p className="text-black text-xl font-light leading-relaxed max-w-md">
//               Establish your decentralized identity and start distributing cinematic excellence on the Web3 blockchain. 
//             </p>
//           </div>

//           <div className="relative z-10 flex items-center gap-8">
//              <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 tracking-widest uppercase">
//                <ShieldCheck size={14} className="text-blue-500" /> Secure Distribution 
//              </div>
//              <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 tracking-widest uppercase">
//                <Globe size={14} className="text-purple-500" /> Global Ecosystem 
//              </div>
//           </div>
//         </div>

//         {/* --- RIGHT SIDE: FORM --- */}
//         <div className="flex flex-col justify-center p-8 md:p-16 relative bg-white">
//           <div className="max-w-xl w-full mx-auto space-y-10 relative z-10">
            
//             <div className="flex flex-col lg:flex-row items-center gap-6">
//               <div className="relative w-20 h-20 flex items-center justify-center rounded-3xl overflow-hidden  shrink-0">
//                 <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute inset-[-100%] z-0" style={{ background: "conic-gradient(from 0deg, #3b82f6, #bc13fe, #3b82f6)" }} />
//                 <div className="relative z-10 w-full h-full rounded-[1.4rem] bg-white flex items-center justify-center border border-slate-100">
//                   <img src={appLogo} alt="CHAIN21 Logo" className="w-full h-full object-contain" />
//                 </div>
//               </div>
//               <div className="text-center lg:text-left">
//                 <h1 className="text-4xl font-black tracking-tight text-slate-900 leading-none uppercase">Initialize <span className="text-blue-600">ID</span></h1>
//                 <p className="font-bold text-black uppercase text-[9px] tracking-[0.3em] mt-2">Decentralized Creative Economy Protocol </p>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               <div className="space-y-2 text-black">
//                 <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1 flex items-center gap-2"><User size={12} className="text-blue-600"/> Username</label>
//                 <input type="text" placeholder="Identity name" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold focus:bg-white focus:border-blue-500 transition-all outline-none" value={formData.username} onChange={(e) => handleChange(e, "username")} />
//               </div>

//               <div className="space-y-2 text-black">
//                 <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1 flex items-center gap-2"><MapPin size={12} className="text-purple-600"/> Region</label>
//                 <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold focus:bg-white focus:border-blue-500 transition-all outline-none appearance-none cursor-pointer" value={formData.country} onChange={handleCountryChange}>
//                   <option value="">Select Country</option>
//                   {countryList.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
//                 </select>
//               </div>

//               <div className="space-y-2 text-black">
//                 <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1 flex items-center gap-2"><Phone size={12} className="text-indigo-600"/> Mobile</label>
//                 <input type="tel" placeholder="Phone number" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold focus:bg-white focus:border-blue-500 transition-all outline-none" value={formData.mobile} onChange={(e) => handleChange(e, "mobile")} />
//               </div>

//               <div className="space-y-2 text-black">
//                 <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1 flex items-center gap-2"><UserPlus size={12} className="text-blue-400"/> Sponsor Code</label>
//                 <div className="relative">
//                   <input type="text" placeholder="Optional" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold focus:bg-white focus:border-blue-500 transition-all outline-none" value={formData.referral} onChange={(e) => handleChange(e, "referral")} />
//                   {sponsorInfo.username && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-green-600 uppercase tracking-tighter bg-green-50 px-2 py-1 rounded-md">Verified: {sponsorInfo.username}</span>}
//                 </div>
//               </div>

//               <div className="md:col-span-2 space-y-2">
//                 <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1 flex items-center gap-2"><Wallet size={12} className="text-blue-600"/> On-Chain Wallet Address </label>
//                 <div className="relative group">
//                   <input type="text" readOnly placeholder="Connect Web3 Wallet to continue" className={`w-full bg-slate-50 border border-slate-100 rounded-2xl pl-6 pr-32 py-4 text-xs font-mono transition-all ${formData.walletAddress ? 'text-blue-600' : 'text-black'}`} value={formData.walletAddress} />
//                   <button type="button" onClick={() => setShowWalletModal(true)} className="absolute right-2 top-2 bottom-2 px-5 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all">
//                     {formData.walletAddress ? "Change" : "Connect"}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-6 pt-4">
//               <button onClick={handleRegister} className="w-full bg-slate-900 text-white font-black py-5 rounded-[1.5rem] shadow-xl hover:shadow-blue-500/20 hover:bg-blue-600 transition-all active:scale-95 uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3">
//                 Finalize Genesis ID <ArrowRight size={16} />
//               </button>
              
//               <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-blue-50/50 border border-blue-100">
//                 <Fingerprint size={18} className="text-blue-600" />
//                 <p className="text-[10px] text-blue-800 font-bold tracking-wide uppercase leading-relaxed">
//                   Decentralized funding & direct distribution enabled upon activation.
//                 </p>
//               </div>
//             </div>

//             <p className="text-center text-black text-xs font-bold uppercase tracking-widest pt-4">
//               Already a creator? <Link to={LandingRouters.USER_LOGIN} className="text-blue-600 hover:underline underline-offset-8 decoration-slate-200 ml-1">Access Terminal</Link>
//             </p>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default RegisterPage;


import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { getWalletAddress } from "../../utils/additionalFunc";
import {
  nameValidator,
  phoneValidator,
  validateWalletAddress,
} from "../../utils/inputValidator";
import WalletOptionModal from "../../components/Screen/Landing/WalletOptionModal";
import { createUserApi } from "../../api/auth.api";
import { loginUser } from "../../redux/slices/authSlice";
import { setLoading } from "../../redux/slices/loadingSlice";
import {
  AuthenticatedUserRouters,
  LandingRouters,
} from "../../constants/routes";
import { MainContent, backendConfig } from "../../constants/mainContent";
import { 
  User, 
  Phone, 
  MapPin, 
  Wallet, 
  UserPlus, 
  ShieldCheck, 
  Cpu, 
  ArrowRight, 
  Mail,
  Fingerprint
} from "lucide-react";
import { motion } from "framer-motion";
import appLogo from "../../assets/chain21_2.jpeg";

const countryList = [
  { name: "Afghanistan", code: "+93" }, { name: "Albania", code: "+355" }, { name: "Algeria", code: "+213" },
  { name: "Argentina", code: "+54" }, { name: "Australia", code: "+61" }, { name: "Austria", code: "+43" },
  { name: "Bangladesh", code: "+880" }, { name: "Belgium", code: "+32" }, { name: "Brazil", code: "+55" },
  { name: "Canada", code: "+1" }, { name: "China", code: "+86" }, { name: "Colombia", code: "+57" },
  { name: "Denmark", code: "+45" }, { name: "Egypt", code: "+20" }, { name: "France", code: "+33" },
  { name: "Germany", code: "+49" }, { name: "Ghana", code: "+233" }, { name: "Greece", code: "+30" },
  { name: "India", code: "+91" }, { name: "Indonesia", code: "+62" }, { name: "Iran", code: "+98" },
  { name: "Iraq", code: "+964" }, { name: "Ireland", code: "+353" }, { name: "Italy", code: "+39" },
  { name: "Japan", code: "+81" }, { name: "Kenya", code: "+254" }, { name: "Malaysia", code: "+60" },
  { name: "Mexico", code: "+52" }, { name: "Morocco", code: "+212" }, { name: "Nepal", code: "+977" },
  { name: "Netherlands", code: "+31" }, { name: "New Zealand", code: "+64" }, { name: "Nigeria", code: "+234" },
  { name: "Norway", code: "+47" }, { name: "Pakistan", code: "+92" }, { name: "Philippines", code: "+63" },
  { name: "Poland", code: "+48" }, { name: "Portugal", code: "+351" }, { name: "Russia", code: "+7" },
  { name: "Saudi Arabia", code: "+966" }, { name: "Singapore", code: "+65" }, { name: "South Africa", code: "+27" },
  { name: "South Korea", code: "+82" }, { name: "Spain", code: "+34" }, { name: "Sri Lanka", code: "+94" },
  { name: "Sweden", code: "+46" }, { name: "Switzerland", code: "+41" }, { name: "Thailand", code: "+66" },
  { name: "Turkey", code: "+90" }, { name: "Ukraine", code: "+380" }, { name: "United Arab Emirates", code: "+971" },
  { name: "United Kingdom", code: "+44" }, { name: "United States", code: "+1" }, { name: "Vietnam", code: "+84" }
];

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const [showWalletModal, setShowWalletModal] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "", 
    mobile: "",
    referral: "",
    walletAddress: "",
    countryCode: "",
    country: ""
  });

  const [sponsorInfo, setSponsorInfo] = useState({ username: "", loading: false, error: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (search) {
      const referralCode = search?.split("=")[1] || "";
      setFormData(prev => ({ ...prev, referral: referralCode }));
      if (referralCode) fetchSponsorDetails(referralCode);
    }
  }, [search]);

  const fetchSponsorDetails = async (code) => {
    if (!code || code.length < 3) return;
    setSponsorInfo({ username: "", loading: true, error: "" });
    try {
      const res = await fetch(`${backendConfig.origin}/api/user/verify-referral/${code}`);
      const data = await res.json();
      if (res.ok && data.success) setSponsorInfo({ username: data.data.username, loading: false, error: "" });
      else setSponsorInfo({ username: "", loading: false, error: "Invalid Sponsor" });
    } catch {
      setSponsorInfo({ username: "", loading: false, error: "Verification Failed" });
    }
  };

  const handleChange = (e, field) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === "referral") {
      clearTimeout(window.referralTimeout);
      window.referralTimeout = setTimeout(() => fetchSponsorDetails(value), 500);
    }
  };

  const handleCountryChange = (e) => {
    const selected = e.target.value;
    const countryData = countryList.find(c => c.name === selected);
    setFormData(prev => ({ ...prev, country: selected, countryCode: countryData ? countryData.code : "" }));
  };

  const validate = () => {
    const valErrors = {};
    if (nameValidator(formData.username)) valErrors.username = "Invalid Username";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) valErrors.email = "Invalid Email";
    if (phoneValidator(formData.mobile, false)) valErrors.mobile = "Invalid Phone";
    if (validateWalletAddress(formData.walletAddress)) valErrors.walletAddress = "Wallet Connection Required";
    if (!formData.country) valErrors.country = "Region Required";
    setErrors(valErrors);
    return Object.keys(valErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return toast.error("Please complete all required fields");
    try {
      dispatch(setLoading(true));
      const res = await createUserApi(formData);
      if (res?.success) {
        dispatch(loginUser({ token: res.token, userId: res.data._id, role: res.data.role, data: res.data }));
        Swal.fire({ 
          icon: "success", 
          title: "Identity Verified", 
          text: "Welcome to the Chain21 Ecosystem.", 
          background: "#111111",
          color: "#ffffff",
          confirmButtonColor: "#f59e0b",
          timer: 2000, 
          showConfirmButton: false 
        });
        navigate(AuthenticatedUserRouters.DASHBOARD);
      } else {
        toast.error(res?.response?.data?.message || "Registration Failed");
      }
    } catch (err) {
      toast.error("System Error during initialization");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 py-24 md:px-10 font-sans overflow-hidden selection:bg-amber-500 selection:text-black">
      <WalletOptionModal
        hide={() => setShowWalletModal(false)}
        connectWallet={(type) => getWalletAddress(type).then(addr => setFormData(p => ({...p, walletAddress: addr})))}
        show={showWalletModal}
      />

      {/* --- Ambient Background --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl relative z-10 my-10"
      >
        {/* Decorative Top Line */}
        <div className="w-full h-1.5 bg-gradient-to-r from-blue-600 via-amber-500 to-blue-600 rounded-t-2xl" />
        
        <div className="bg-[#111111] border-x border-b border-gray-800 rounded-b-2xl p-8 md:p-12 shadow-2xl backdrop-blur-xl">
          
          {/* Header & Logo */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-white rounded-xl p-1 mb-6 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
              <img src={appLogo} alt="Chain21 Logo" className="w-full h-full object-contain rounded-lg" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight uppercase">
              Initialize <span className="text-amber-500">Identity</span>
            </h1>
            <p className="text-gray-500 text-xs mt-2 tracking-widest uppercase text-center max-w-sm">
              Create your secure investor profile for the decentralized real estate ecosystem.
            </p>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            
            {/* Username */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                <User size={12} className="text-blue-500"/> Username
              </label>
              <input 
                type="text" 
                placeholder="Identity name" 
                className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3.5 text-white placeholder-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm" 
                value={formData.username} 
                onChange={(e) => handleChange(e, "username")} 
              />
              {errors.username && <p className="text-red-500 text-[9px] font-bold uppercase ml-2 mt-1">{errors.username}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                <Mail size={12} className="text-amber-500"/> Email Address
              </label>
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3.5 text-white placeholder-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm" 
                value={formData.email} 
                onChange={(e) => handleChange(e, "email")} 
              />
              {errors.email && <p className="text-red-500 text-[9px] font-bold uppercase ml-2 mt-1">{errors.email}</p>}
            </div>

            {/* Region */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                <MapPin size={12} className="text-blue-500"/> Region
              </label>
              <select 
                className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm appearance-none cursor-pointer" 
                value={formData.country} 
                onChange={handleCountryChange}
              >
                <option value="" className="text-gray-500">Select Country</option>
                {countryList.map(c => <option key={c.name} value={c.name} className="bg-[#111111]">{c.name}</option>)}
              </select>
              {errors.country && <p className="text-red-500 text-[9px] font-bold uppercase ml-2 mt-1">{errors.country}</p>}
            </div>

            {/* Mobile */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                <Phone size={12} className="text-amber-500"/> Mobile
              </label>
              <input 
                type="tel" 
                placeholder="Phone number" 
                className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3.5 text-white placeholder-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm" 
                value={formData.mobile} 
                onChange={(e) => handleChange(e, "mobile")} 
              />
              {errors.mobile && <p className="text-red-500 text-[9px] font-bold uppercase ml-2 mt-1">{errors.mobile}</p>}
            </div>

            {/* Sponsor Code */}
            <div className="md:col-span-2 space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                <UserPlus size={12} className="text-blue-400"/> Sponsor Code
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Optional referral code" 
                  className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3.5 text-white placeholder-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm" 
                  value={formData.referral} 
                  onChange={(e) => handleChange(e, "referral")} 
                />
                {sponsorInfo.username && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-bold text-amber-400 uppercase tracking-widest bg-amber-900/20 border border-amber-500/30 px-2 py-1 rounded-md">
                    Verified: {sponsorInfo.username}
                  </span>
                )}
              </div>
            </div>

            {/* Wallet Address */}
            <div className="md:col-span-2 space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                <Wallet size={12} className="text-blue-500"/> On-Chain Wallet Address 
              </label>
              <div className="relative group">
                <input 
                  type="text" 
                  readOnly 
                  placeholder="Connect Web3 Wallet to continue" 
                  className={`w-full bg-black border border-gray-800 rounded-xl pl-4 pr-32 py-3.5 text-xs font-mono transition-all outline-none ${formData.walletAddress ? 'text-blue-400 border-blue-500/50' : 'text-gray-500'}`} 
                  value={formData.walletAddress} 
                />
                <button 
                  type="button" 
                  onClick={() => setShowWalletModal(true)} 
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-lg bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-blue-500 transition-all flex items-center"
                >
                  {formData.walletAddress ? "Change" : "Connect"}
                </button>
              </div>
              {errors.walletAddress && <p className="text-red-500 text-[9px] font-bold uppercase ml-2 mt-1">{errors.walletAddress}</p>}
            </div>
          </div>

          {/* Submit Area */}
          <div className="space-y-5 pt-2">
            <button 
              onClick={handleRegister} 
              className="w-full bg-gradient-to-r from-amber-500 to-amber-400 text-black font-black py-4 rounded-xl hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all active:scale-95 uppercase text-xs tracking-widest flex items-center justify-center gap-2"
            >
              Finalize Genesis ID <ArrowRight size={16} />
            </button>
            
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-blue-900/10 border border-blue-900/30">
              <Fingerprint size={16} className="text-blue-500 shrink-0" />
              <p className="text-[9px] text-blue-400 font-bold tracking-widest uppercase leading-relaxed">
                Smart contract funding & decentralized asset distribution enabled upon activation.
              </p>
            </div>
          </div>

          {/* Footer Area */}
          <div className="mt-8 pt-6 border-t border-gray-800 text-center">
            <p className="text-gray-500 text-xs uppercase tracking-widest">
              Already an investor?{" "}
              <Link
                to={LandingRouters.USER_LOGIN}
                className="text-white font-bold hover:text-amber-500 transition-colors ml-1"
              >
                Access Portal
              </Link>
            </p>
          </div>

        </div>

        {/* Security Trust Indicators */}
        <div className="mt-6 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2 text-[9px] font-bold text-gray-600 tracking-widest uppercase">
            <ShieldCheck size={12} className="text-gray-500" /> Web3 Verified
          </div>
          <div className="flex items-center gap-2 text-[9px] font-bold text-gray-600 tracking-widest uppercase">
            <Cpu size={12} className="text-gray-500" /> Distributed Node Active
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;