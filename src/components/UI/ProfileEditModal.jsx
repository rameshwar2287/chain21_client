import { useState, useEffect } from "react";
import { X, User, Mail, Phone, Globe, Edit3, CheckCircle } from "lucide-react";
import { updateProfile } from "../../api/user.api";
import { getUserProfile } from "../../api/auth.api";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/loadingSlice";
import { updateUserData } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

const ProfileEditModal = ({ isOpen, onClose, userData, onSuccess }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    country: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        username: userData.username || "",
        email: userData.email || "",
        mobile: userData.mobile || "",
        country: userData.country || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username?.trim()) {
      toast.error("Username is required");
      return;
    }

    if (!formData.email?.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!formData.mobile?.trim()) {
      toast.error("Mobile number is required");
      return;
    }

    dispatch(setLoading(true));
    try {
      const res = await updateProfile({
        username: formData.username.trim(),
        email: formData.email.trim(),
        mobile: formData.mobile.trim(),
        country: formData.country.trim(),
      });

      if (res?.success) {
        toast.success(res?.message || "Profile updated successfully!");
        
        // Refresh user data
        const userRes = await getUserProfile();
        if (userRes?.success) {
          dispatch(updateUserData({ data: userRes.data }));
        }
        
        onSuccess?.();
        onClose();
      } else {
        toast.error(res?.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden animate-slideUp">
        {/* Decorative gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        
        {/* Header */}
        <div className="relative px-8 py-6 border-b border-slate-700/50 bg-slate-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Edit3 size={22} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
                <p className="text-sm text-slate-400 mt-0.5">Update your personal information (One-time only)</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-700/50 rounded-xl transition-colors group"
            >
              <X size={24} className="text-slate-400 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative p-8 space-y-6">
          {/* Non-editable fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Referral ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={userData?.referralLink || ""}
                  readOnly
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl py-3 px-4 pr-10 text-slate-500 cursor-not-allowed"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600">
                  <CheckCircle size={18} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Wallet Address
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={userData?.account || ""}
                  readOnly
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl py-3 px-4 pr-10 text-slate-500 cursor-not-allowed text-sm"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600">
                  <CheckCircle size={18} />
                </div>
              </div>
            </div>
          </div>

          {/* Editable fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <User size={16} className="text-blue-400" />
                Username *
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <Mail size={16} className="text-blue-400" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <Phone size={16} className="text-blue-400" />
                Mobile Number *
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter mobile number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <Globe size={16} className="text-blue-400" />
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter country"
              />
            </div>
          </div>

          {/* Warning message */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
            <p className="text-sm text-amber-300 flex items-start gap-2">
              <span className="text-amber-400 mt-0.5">⚠️</span>
              <span>
                <strong>Important:</strong> You can only edit your profile once. Please ensure all information is correct before saving.
              </span>
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-slate-700/50 hover:bg-slate-700 text-white rounded-xl font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/25"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;
