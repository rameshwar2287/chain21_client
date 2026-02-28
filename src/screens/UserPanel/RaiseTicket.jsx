// import React, { useState } from "react";
// import {
//   Headphones,
//   MessageSquare,
//   AlertCircle,
//   Send,
//   CheckCircle,
//   Clock,
//   User,
//   FileText,
// } from "lucide-react";
// import { useDispatch } from "react-redux";
// import { setLoading } from "../../redux/slices/loadingSlice";
// import { toast } from "react-toastify";
// import { createTicket } from "../../api/user.api";

// const RaiseTicket = () => {
//   const [formData, setFormData] = useState({
//     subject: "",
//     message: "",
//     natureOfComplain: "",
//   });
//   const dispatch = useDispatch();
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.subject || !formData.message || !formData.natureOfComplain) {
//       console.log("Error: Please fill all fields");
//       return;
//     }
//     try {
//       setIsLoading(true);
//       dispatch(setLoading(true));
//       const response = await createTicket(formData);
//       if (response?.success) {
//         toast.success(response?.message || "Ticket raised successfully");
//         setFormData({ subject: "", message: "", natureOfComplain: "" });
//       } else {
//         toast.error("Error raising ticket:", response?.message);
//       }
//     } catch (error) {
//       console.error("Error raising ticket:", error);
//     } finally {
//       setIsLoading(false);
//       dispatch(setLoading(false));
//     }
//   };

//   const complaintOptions = [
//     { value: "transaction", label: "💳 Transaction Issue", icon: "💳" },
//     { value: "withdrawal", label: "💰 Withdrawal Issue", icon: "💰" },
//     { value: "deposit", label: "📈 Deposit Issue", icon: "📈" },
//     { value: "account", label: "👤 Account Related", icon: "👤" },
//     { value: "technical", label: "🔧 Technical Issue", icon: "🔧" },
//     { value: "other", label: "❓ Other", icon: "❓" },
//   ];

//   const isFormValid =
//     formData.subject && formData.message && formData.natureOfComplain;

//   return (
//     <div className="p-6 w-full">
//       <div className="max-w-4xl mx-auto relative">
//         {/* Background Effects */}
//         <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl"></div>
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-cyan-600/5 rounded-3xl"></div>
//         <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-blue-500/10 via-transparent to-transparent rounded-full blur-3xl"></div>

//         <div className="relative border border-blue-800/30 shadow-2xl rounded-3xl p-8 hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden">
//           {/* Header Section */}
//           <div className="flex items-center gap-6 mb-8">
//             <div className="relative">
//               <div className="p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl shadow-lg shadow-blue-500/10">
//                 <Headphones className="w-8 h-8 text-blue-400" />
//               </div>
//               <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
//             </div>
//             <div className="flex-1">
//               <h2 className="text-3xl font-bold text-white mb-2">
//                 Raise a Support Ticket
//               </h2>
//               <p className="text-slate-400 text-base">
//                 Our dedicated support team is here to help you 24/7. We
//                 typically respond within 2-4 hours.
//               </p>
//             </div>
//           </div>

//           {/* Support Info Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//             <div className="bg-slate-800/30 border border-slate-700/30 p-4 rounded-xl hover:border-blue-600/30 transition-colors duration-300">
//               <div className="flex items-center gap-3">
//                 <Clock className="w-5 h-5 text-green-400" />
//                 <div>
//                   <div className="font-semibold text-white text-sm">
//                     Response Time
//                   </div>
//                   <div className="text-xs text-slate-400">2-4 hours</div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-slate-800/30 border border-slate-700/30 p-4 rounded-xl hover:border-blue-600/30 transition-colors duration-300">
//               <div className="flex items-center gap-3">
//                 <MessageSquare className="w-5 h-5 text-blue-400" />
//                 <div>
//                   <div className="font-semibold text-white text-sm">
//                     Support Available
//                   </div>
//                   <div className="text-xs text-slate-400">
//                     24/7 Live Support
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-slate-800/30 border border-slate-700/30 p-4 rounded-xl hover:border-blue-600/30 transition-colors duration-300">
//               <div className="flex items-center gap-3">
//                 <CheckCircle className="w-5 h-5 text-cyan-400" />
//                 <div>
//                   <div className="font-semibold text-white text-sm">
//                     Resolution Rate
//                   </div>
//                   <div className="text-xs text-slate-400">99.8% Success</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Form */}
//           <div className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Subject Field */}
//               <div className="group">
//                 <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
//                   <FileText className="w-4 h-4 text-blue-400" />
//                   Ticket Subject
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     name="subject"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     placeholder="Enter a clear subject line"
//                     className="w-full px-5 py-4 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition-all duration-300 group-hover:border-blue-600/30"
//                   />
//                   <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
//                 </div>
//               </div>

//               {/* Nature of Complaint */}
//               <div className="group">
//                 <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
//                   <AlertCircle className="w-4 h-4 text-orange-400" />
//                   Issue Category
//                 </label>
//                 <div className="relative">
//                   <select
//                     name="natureOfComplain"
//                     value={formData.natureOfComplain}
//                     onChange={handleChange}
//                     className="w-full px-5 py-4 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition-all duration-300 group-hover:border-blue-600/30 appearance-none cursor-pointer"
//                   >
//                     <option value="" disabled className="bg-slate-800">
//                       Select issue category
//                     </option>
//                     {complaintOptions.map((option) => (
//                       <option
//                         key={option.value}
//                         value={option.value}
//                         className="bg-slate-800"
//                       >
//                         {option.label}
//                       </option>
//                     ))}
//                   </select>
//                   <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
//                     <svg
//                       className="w-4 h-4 text-slate-500"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M19 9l-7 7-7-7"
//                       />
//                     </svg>
//                   </div>
//                   <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
//                 </div>
//               </div>
//             </div>

//             {/* Message Field */}
//             <div className="group">
//               <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
//                 <MessageSquare className="w-4 h-4 text-green-400" />
//                 Detailed Description
//               </label>
//               <div className="relative">
//                 <textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   placeholder="Please describe your issue in detail. Include any relevant information like transaction IDs, error messages, or steps you've already tried..."
//                   rows={6}
//                   className="w-full px-5 py-4 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition-all duration-300 group-hover:border-blue-600/30 resize-none"
//                 />
//                 <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
//               </div>
//               <div className="flex justify-between mt-2">
//                 <span className="text-xs text-slate-500">
//                   Be as specific as possible for faster resolution
//                 </span>
//                 <span className="text-xs text-slate-500">
//                   {formData.message.length}/1000
//                 </span>
//               </div>
//             </div>

//             {/* Form Summary */}
//             {isFormValid && (
//               <div className="p-5 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl">
//                 <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
//                   <CheckCircle className="w-5 h-5 text-green-400" />
//                   Ticket Summary
//                 </h3>
//                 <div className="space-y-2 text-sm">
//                   <div className="flex items-start gap-3">
//                     <span className="text-slate-400 min-w-20">Subject:</span>
//                     <span className="text-white font-medium">
//                       {formData.subject}
//                     </span>
//                   </div>
//                   <div className="flex items-start gap-3">
//                     <span className="text-slate-400 min-w-20">Category:</span>
//                     <span className="text-cyan-400 font-medium">
//                       {
//                         complaintOptions.find(
//                           (opt) => opt.value === formData.natureOfComplain
//                         )?.label
//                       }
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Submit Button */}
//             <div className="flex justify-end pt-4">
//               <button
//                 type="submit"
//                 disabled={isLoading || !isFormValid}
//                 onClick={handleSubmit}
//                 className={`relative flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 overflow-hidden group min-w-48 ${
//                   isLoading || !isFormValid
//                     ? "bg-slate-700/50 text-slate-500 cursor-not-allowed border border-slate-600/30"
//                     : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] border border-blue-500/30"
//                 }`}
//               >
//                 <div className="relative flex items-center gap-3">
//                   {isLoading ? (
//                     <>
//                       <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                       <span>Submitting Ticket...</span>
//                     </>
//                   ) : (
//                     <>
//                       <Send className="w-5 h-5" />
//                       <span>Submit Support Ticket</span>
//                     </>
//                   )}
//                 </div>

//                 {/* Button glow effect */}
//                 {!isLoading && isFormValid && (
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-cyan-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Help Notice */}
//           <div className="mt-8 p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl">
//             <div className="flex items-start gap-3">
//               <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
//               <div className="text-sm text-slate-400">
//                 <p className="mb-2">
//                   <strong className="text-white">
//                     Need immediate assistance?
//                   </strong>{" "}
//                   For urgent issues, you can also reach us via live chat or call
//                   our emergency support line.
//                 </p>
//                 <p>
//                   All tickets are tracked and you'll receive email updates on
//                   the progress of your request.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RaiseTicket;


import React, { useState } from "react";
import {
  Headphones,
  MessageSquare,
  AlertCircle,
  Send,
  CheckCircle,
  Clock,
  FileText,
  LifeBuoy
} from "lucide-react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/loadingSlice";
import { toast } from "react-toastify";
import { createTicket } from "../../api/user.api";
import { motion } from "framer-motion";

const RaiseTicket = () => {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    natureOfComplain: "",
  });
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.message || !formData.natureOfComplain) {
      toast.warning("Please fill all fields");
      return;
    }
    try {
      setIsLoading(true);
      dispatch(setLoading(true));
      const response = await createTicket(formData);
      if (response?.success) {
        toast.success(response?.message || "Ticket raised successfully");
        setFormData({ subject: "", message: "", natureOfComplain: "" });
      } else {
        toast.error(response?.message || "Error raising ticket");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
      dispatch(setLoading(false));
    }
  };

  const complaintOptions = [
    { value: "transaction", label: "Transaction Protocol", icon: "💳" },
    { value: "withdrawal", label: "Fund Extraction", icon: "💰" },
    { value: "deposit", label: "Capital Injection", icon: "📈" },
    { value: "account", label: "Profile Security", icon: "👤" },
    { value: "technical", label: "System Interface", icon: "🔧" },
    { value: "other", label: "General Inquiry", icon: "❓" },
  ];

  const isFormValid = formData.subject && formData.message && formData.natureOfComplain;

  return (
    <div className="p-4 lg:p-8 w-full min-h-screen bg-black">
      <div className="max-w-4xl mx-auto relative">
        
        {/* Ambient Background Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#B8860B] opacity-[0.05] blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FFD700] opacity-[0.03] blur-[120px] rounded-full"></div>

        <div className="relative bg-[#0a0a0a] border border-[#2a2a2a] shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-3xl p-6 lg:p-10 overflow-hidden">
          
          {/* Top Gold Bar Decoration */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-50"></div>

          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
            <div className="relative">
              <div className="p-5 bg-[#B8860B]/10 border border-[#B8860B]/30 rounded-2xl shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                <Headphones className="w-10 h-10 text-[#FFD700]" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black animate-pulse"></div>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold font-rajdhani text-white uppercase tracking-tight">
                SUPPORT <span className="hero-text-gradient">CONCIERGE</span>
              </h2>
              <p className="text-gray-500 text-sm font-poppins uppercase tracking-widest mt-1">
                Direct encrypted line to our technical analysts
              </p>
            </div>
          </div>

          {/* Support Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {[
              { icon: Clock, label: "Response Time", val: "2-4 Hours", color: "text-green-500" },
              { icon: LifeBuoy, label: "Live Assistance", val: "24/7 Priority", color: "text-[#FFD700]" },
              { icon: CheckCircle, label: "Resolution", val: "99.8% Success", color: "text-blue-500" }
            ].map((stat, i) => (
              <div key={i} className="bg-black border border-[#2a2a2a] p-4 rounded-2xl hover:border-[#B8860B]/30 transition-all">
                <div className="flex items-center gap-4">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <div>
                    <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{stat.label}</div>
                    <div className="text-sm font-bold text-white">{stat.val}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Subject Field */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-black text-[#B8860B] uppercase tracking-[0.2em] ml-1">
                  <FileText className="w-4 h-4" />
                  Ticket Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Summarize the requirement"
                  className="w-full bg-black border border-[#2a2a2a] rounded-xl px-5 py-4 text-white placeholder-gray-700 focus:outline-none focus:border-[#FFD700] focus:shadow-[0_0_15px_rgba(255,215,0,0.1)] transition-all font-poppins text-sm"
                />
              </div>

              {/* Nature of Complaint */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-black text-[#B8860B] uppercase tracking-[0.2em] ml-1">
                  <AlertCircle className="w-4 h-4" />
                  Issue Category
                </label>
                <select
                  name="natureOfComplain"
                  value={formData.natureOfComplain}
                  onChange={handleChange}
                  className="w-full bg-black border border-[#2a2a2a] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#FFD700] transition-all font-poppins text-sm cursor-pointer appearance-none"
                >
                  <option value="" disabled>Select Protocol Category</option>
                  {complaintOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-[#0a0a0a]">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message Field */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-black text-[#B8860B] uppercase tracking-[0.2em] ml-1">
                <MessageSquare className="w-4 h-4" />
                Detailed Intelligence
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Provide transaction IDs, error logs, or specific details for the analyst..."
                rows={5}
                className="w-full bg-black border border-[#2a2a2a] rounded-xl px-5 py-4 text-white placeholder-gray-700 focus:outline-none focus:border-[#FFD700] transition-all font-poppins text-sm resize-none"
              />
              <div className="flex justify-between px-1">
                <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest italic">Confidential encrypted channel</span>
                <span className={`text-[10px] font-mono ${formData.message.length > 900 ? 'text-red-500' : 'text-gray-600'}`}>
                  {formData.message.length}/1000
                </span>
              </div>
            </div>

            {/* Ticket Summary Section */}
            {isFormValid && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-[#B8860B]/5 border border-[#B8860B]/20 rounded-2xl relative"
              >
                <div className="absolute top-4 right-6 text-[#FFD700] opacity-20"><CheckCircle size={40} /></div>
                <h3 className="text-xs font-black text-white uppercase tracking-widest mb-4">Request Preview</h3>
                <div className="space-y-2">
                  <div className="flex gap-4 text-xs font-poppins">
                    <span className="text-gray-500 font-bold min-w-24 uppercase tracking-tighter">Subject:</span>
                    <span className="text-white">{formData.subject}</span>
                  </div>
                  <div className="flex gap-4 text-xs font-poppins">
                    <span className="text-gray-500 font-bold min-w-24 uppercase tracking-tighter">Protocol:</span>
                    <span className="text-[#FFD700]">{complaintOptions.find(o => o.value === formData.natureOfComplain)?.label}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Submit Button - HIGH VISIBILITY FIX */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading || !isFormValid}
                className={`relative flex items-center justify-center gap-3 px-10 py-4 rounded-xl font-bold font-rajdhani text-lg uppercase tracking-widest transition-all duration-300 group min-w-[240px] shadow-2xl ${
                  isLoading || !isFormValid
                    ? "bg-[#1a1a1a] text-gray-600 border border-[#2a2a2a] cursor-not-allowed"
                    : "bg-gradient-to-r from-[#B8860B] to-[#FFD700] text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:-translate-y-1 active:scale-95"
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    <span>Initializing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Deploy Ticket</span>
                  </>
                )}
                {!isLoading && isFormValid && (
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                )}
              </button>
            </div>
          </form>

          {/* Help Notice */}
          <div className="mt-12 p-5 bg-black border border-[#2a2a2a] rounded-2xl">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-5 h-5 text-[#FFD700] mt-1 flex-shrink-0" />
              <div className="text-xs text-gray-500 font-medium leading-relaxed">
                <p className="mb-2">
                  <strong className="text-white uppercase tracking-widest">Urgent Advisory:</strong> For high-priority capital injection or extraction issues, use the direct Telegram bridge for millisecond response times.
                </p>
                <p>All protocol communications are end-to-end encrypted and logged for security compliance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaiseTicket;