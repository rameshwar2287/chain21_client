import React, { useEffect, useState } from "react";
import {
  createRankAndReward,
  getRankAndReward,
  rankAndRewardStatus,
  updateRewardAndRank,
} from "../../api/admin.api";
import { setLoading } from "../../redux/slices/loadingSlice";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  TrendingUp,
  DollarSign,
  Calendar,
  Edit3,
  ToggleLeft,
  ToggleRight,
  Award,
  Sparkles,
  Shield,
  Star,
  Crown,
  Zap,
  X
} from "lucide-react";

const ManageRankAndReward = () => {
  const location = useLocation();
  const data = location.state;
  const [manageRankAndReward, setManageRankAndReward] = useState([]);
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    investment: "",
    reward: "",
    type: "Rank Reward",
  });
  const [payload, setPayload] = useState({
    title: "",
    investment: "",
    reward: "",
    type: "Rank Reward",
  });

  const fetchManageRankAndReward = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getRankAndReward();
      setManageRankAndReward(response?.data);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchManageRankAndReward();
  }, []);

  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
    setEditFormData({
      title: user.title || "",
      investment: user.investment || "",
      reward: user.reward || "",
      type: user.type || "Rank Reward",
    });
    setIsEditModalOpen(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    try {
      dispatch(setLoading(true));
      const response = await updateRewardAndRank(
        selectedUser._id,
        editFormData
      );

      if (response?.success) {
        Swal.fire({
          icon: "success",
          text: response?.message || "Rank and reward updated successfully",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        setIsEditModalOpen(false);
        setSelectedUser(null);
        fetchManageRankAndReward();
      } else {
        Swal.fire({
          icon: "error",
          text: response?.message || "Failed to update rank and reward",
        });
      }
    } catch (err) {
      console.error("Failed to update rank and reward:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleStatusActiveInactive = async (id) => {
    try {
      dispatch(setLoading(true));
      const response = await rankAndRewardStatus(id);
      if (response?.success) {
        Swal.fire({
          icon: "success",
          text: response?.message || "Rank reward status changed successfully",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });

        setManageRankAndReward((prevUsers) =>
          prevUsers.map((user) =>
            user._id === id ? { ...user, status: !user.status } : user
          )
        );
      }
    } catch (error) {
      console.error("Error changing status:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!payload.title || !payload.investment || !payload.reward) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      dispatch(setLoading(true));
      const response = await createRankAndReward(payload);

      if (response?.success) {
        Swal.fire({
          icon: "success",
          text: response?.message || "Rank created successfully",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        setPayload({ title: "", investment: "", reward: "", type: "Rank Reward" });
        fetchManageRankAndReward();
      } else {
        Swal.fire({
          icon: "error",
          text: response?.message || "Failed to create rank",
        });
      }
    } catch (err) {
      console.error("Failed to create user:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const filteredUsers = manageRankAndReward?.filter((user) => {
    if (data === "active") {
      return user.status === true;
    } else if (data === "inactive") {
      return user.status === false;
    }
    return true;
  });

  const getTierStyles = (type) => {
    if (!type) return {};
    if (type.toLowerCase().includes("gold")) {
      return {
        badgeBg: "bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600",
        titleClass: "text-yellow-300",
        accent: "yellow",
        glow: "shadow-yellow-500/30",
        icon: Crown,
        borderGlow: "border-yellow-500/30"
      };
    }
    if (type.toLowerCase().includes("silver")) {
      return {
        badgeBg: "bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500",
        titleClass: "text-slate-200",
        accent: "slate",
        glow: "shadow-slate-400/20",
        icon: Shield,
        borderGlow: "border-slate-400/20"
      };
    }
    if (type.toLowerCase().includes("diamond")) {
      return {
        badgeBg: "bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600",
        titleClass: "text-cyan-200",
        accent: "cyan",
        glow: "shadow-cyan-400/30",
        icon: Sparkles,
        borderGlow: "border-cyan-400/30"
      };
    }
    return {
      badgeBg: "bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600",
      titleClass: "text-purple-200",
      accent: "purple",
      glow: "shadow-purple-500/20",
      icon: Star,
      borderGlow: "border-purple-500/20"
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1e] via-[#0f1729] to-[#0a0f1e] py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Premium Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-yellow-500/10 rounded-full blur-3xl"></div>
          <h1 className="relative text-5xl md:text-6xl font-black mb-3 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-2xl">
            Rank & Reward Management
          </h1>
          <p className="relative text-slate-400 text-lg flex items-center justify-center gap-2">
            <Award className="w-5 h-5 text-yellow-400" />
            Create and manage exclusive rewards
          </p>
        </div>

        {/* Premium Create Form */}
        <div className="group relative bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-2xl border border-yellow-500/20 rounded-3xl p-8 md:p-10 overflow-hidden shadow-2xl shadow-yellow-500/10">

          {/* Animated Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-transparent to-amber-500/5"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-all duration-700"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-r from-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/15 transition-all duration-700"></div>

          <div className="relative z-10">
            {/* Form Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-2xl shadow-lg shadow-yellow-500/20">
                  <Sparkles className="w-7 h-7 text-yellow-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white">Create New Rank</h2>
                  <p className="text-slate-400 text-sm mt-1">Add exclusive rewards and achievements</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Type Select */}
              <div className="space-y-3 group">
                <label className="flex items-center gap-2 text-sm font-bold text-yellow-200/90 uppercase tracking-wider">
                  <Star className="w-4 h-4 text-yellow-400" />
                  Reward Type
                </label>
                <select
                  name="type"
                  value={payload.type}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-2xl bg-slate-800/50 border-2 border-slate-700/50 text-white font-semibold focus:outline-none focus:border-yellow-500/50 focus:ring-4 focus:ring-yellow-500/20 transition-all duration-300"
                >
                  <option value="Rank Reward">🏆 Rank Reward</option>
                  <option value="Global Archive Reward">🌍 Global Archive Reward</option>
                  <option value="Silver Club">🥈 Silver Club</option>
                  <option value="Gold Club">🥇 Gold Club</option>
                  <option value="Diamond Club">💎 Diamond Club</option>
                </select>
              </div>

              {/* Title Input */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-bold text-yellow-200/90 uppercase tracking-wider">
                  <Award className="w-4 h-4 text-yellow-400" />
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={payload.title}
                  onChange={handleInputChange}
                  placeholder="Enter rank title..."
                  className="w-full p-4 rounded-2xl bg-slate-800/50 border-2 border-slate-700/50 text-white font-semibold placeholder:text-slate-500 focus:outline-none focus:border-yellow-500/50 focus:ring-4 focus:ring-yellow-500/20 transition-all duration-300"
                />
              </div>

              {/* Investment Input */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-bold text-yellow-200/90 uppercase tracking-wider">
                  <DollarSign className="w-4 h-4 text-yellow-400" />
                  Required Investment
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="investment"
                    value={payload.investment}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className="w-full p-4 pr-16 rounded-2xl bg-slate-800/50 border-2 border-slate-700/50 text-white font-bold placeholder:text-slate-500 focus:outline-none focus:border-yellow-500/50 focus:ring-4 focus:ring-yellow-500/20 transition-all duration-300"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-yellow-400 font-bold text-sm">USD</span>
                </div>
              </div>

              {/* Reward Input */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-bold text-yellow-200/90 uppercase tracking-wider">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  Reward Amount
                </label>
                <input
                  type="text"
                  name="reward"
                  value={payload.reward}
                  onChange={handleInputChange}
                  placeholder="Enter reward details..."
                  className="w-full p-4 rounded-2xl bg-slate-800/50 border-2 border-slate-700/50 text-white font-semibold placeholder:text-slate-500 focus:outline-none focus:border-yellow-500/50 focus:ring-4 focus:ring-yellow-500/20 transition-all duration-300"
                />
              </div>

              {/* Action Buttons */}
              <div className="md:col-span-2 flex items-center justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setPayload({ title: "", investment: "", reward: "", type: "Rank Reward" })}
                  className="px-8 py-4 text-sm font-bold bg-slate-800/50 border-2 border-slate-700/50 text-slate-300 rounded-2xl hover:bg-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
                >
                  Reset Form
                </button>
                <button
                  type="submit"
                  className="group relative px-10 py-4 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 hover:from-yellow-400 hover:via-amber-400 hover:to-yellow-500 text-black font-black rounded-2xl shadow-2xl shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden"
                >
                  <div className="relative flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    <span>Create Rank</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/30 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center gap-3 mt-10">
          <div className="h-1 w-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full"></div>
          <h2 className="text-2xl font-black text-white">Active Ranks & Rewards</h2>
          <div className="h-1 flex-1 bg-gradient-to-r from-amber-500/50 to-transparent rounded-full"></div>
        </div>

        {/* Premium Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredUsers?.map((row, index) => {
            const styles = getTierStyles(row.type);
            const IconComponent = styles.icon;

            return (
              <div
                key={row._id}
                className="group relative bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-xl border-2 border-transparent hover:border-yellow-500/30 rounded-3xl p-7 shadow-2xl hover:shadow-yellow-500/20 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                style={{
                  animation: "fadeInUp 0.6s ease-out forwards",
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0
                }}
              >
                {/* Animated Background Glow */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-yellow-500/5 via-transparent to-amber-500/5`}></div>
                <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="relative z-10">
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl shadow-2xl ${styles.badgeBg} ${styles.glow} group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className={`text-2xl font-black ${styles.titleClass} drop-shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                          {row.title}
                        </h3>
                        <div className="mt-2 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/40 backdrop-blur-sm">
                          <span className="text-xs text-yellow-300 font-bold">{row.type}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className={`px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 ${row.status
                        ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/40 text-green-300 shadow-lg shadow-green-500/20'
                        : 'bg-gradient-to-r from-red-500/20 to-rose-500/20 border-2 border-red-500/40 text-red-300 shadow-lg shadow-red-500/20'
                      }`}>
                      <div className={`w-2.5 h-2.5 rounded-full ${row.status ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                      {row.status ? 'ACTIVE' : 'INACTIVE'}
                    </div>
                  </div>

                  {/* Investment & Reward Panels */}
                  <div className="space-y-4 mb-6">
                    {/* Investment */}
                    <div className="group/item p-5 bg-gradient-to-r from-slate-800/60 to-slate-900/60 border-2 border-yellow-500/10 rounded-2xl hover:border-yellow-500/30 transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-yellow-500/10 rounded-xl">
                            <DollarSign className="w-5 h-5 text-yellow-400" />
                          </div>
                          <div>
                            <div className="text-xs text-yellow-200/70 font-semibold uppercase tracking-wider">Investment</div>
                            <div className="text-2xl font-black text-yellow-300 mt-1">${row.investment}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Reward */}
                    <div className="p-5 bg-gradient-to-br from-yellow-900/20 via-amber-900/10 to-slate-900/60 border-2 border-yellow-500/20 rounded-2xl backdrop-blur-sm">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-xs text-yellow-200/70 font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
                            <Zap className="w-3.5 h-3.5" />
                            Expected Reward
                          </div>
                          <div className="text-xl font-black bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">{row.reward}</div>
                        </div>
                        <div className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                          <span className="text-xs text-yellow-300 font-bold">Monthly</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Created Date */}
                  <div className="flex items-center gap-2 mb-6 p-3 bg-slate-800/30 border border-slate-700/30 rounded-xl">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-xs text-slate-400 font-medium">
                      Created: {new Date(row?.createdAt)?.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleOpenEditModal(row)}
                      className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white rounded-2xl font-bold transition-all duration-300 hover:scale-[1.03] shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </button>

                    <button
                      onClick={() => handleStatusActiveInactive(row._id)}
                      className={`flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl font-bold transition-all duration-300 hover:scale-[1.03] shadow-xl ${row.status
                          ? 'bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-600 text-white shadow-red-500/20 hover:shadow-red-500/40'
                          : 'bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white shadow-green-500/20 hover:shadow-green-500/40'
                        }`}
                    >
                      {row.status ? (
                        <>
                          <ToggleRight className="w-5 h-5" />
                          Disable
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="w-5 h-5" />
                          Enable
                        </>
                      )}
                    </button>
                  </div>

                  {/* Bottom Glow Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Premium Edit Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-yellow-500/30 rounded-3xl p-8 shadow-2xl shadow-yellow-500/20 w-full max-w-lg animate-scaleIn">

              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-amber-500/5 rounded-3xl"></div>

              <div className="relative z-10">
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-xl">
                      <Edit3 className="w-6 h-6 text-yellow-400" />
                    </div>
                    <h2 className="text-2xl font-black text-white">Edit Rank & Reward</h2>
                  </div>
                  <button
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setSelectedUser(null);
                    }}
                    className="p-2 hover:bg-slate-700/50 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>

                <form onSubmit={handleEditSubmit} className="space-y-5">
                  {/* Type */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-yellow-200/90 uppercase tracking-wider">Type</label>
                    <select
                      name="type"
                      value={editFormData.type}
                      onChange={handleEditInputChange}
                      className="w-full p-3.5 rounded-xl bg-slate-800 border-2 border-slate-700/50 text-white font-semibold focus:outline-none focus:border-yellow-500/50 focus:ring-4 focus:ring-yellow-500/20 transition-all"
                    >
                      <option value="Rank Reward">🏆 Rank Reward</option>
                      <option value="Global Archive Reward">🌍 Global Archive Reward</option>
                      <option value="Silver Club">🥈 Silver Club</option>
                      <option value="Gold Club">🥇 Gold Club</option>
                      <option value="Diamond Club">💎 Diamond Club</option>
                    </select>
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-yellow-200/90 uppercase tracking-wider">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={editFormData.title}
                      onChange={handleEditInputChange}
                      placeholder="Enter title..."
                      className="w-full p-3.5 rounded-xl bg-slate-800 border-2 border-slate-700/50 text-white font-semibold focus:outline-none focus:border-yellow-500/50 focus:ring-4 focus:ring-yellow-500/20 transition-all"
                    />
                  </div>

                  {/* Investment */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-yellow-200/90 uppercase tracking-wider">Investment</label>
                    <input
                      type="number"
                      name="investment"
                      value={editFormData.investment}
                      onChange={handleEditInputChange}
                      placeholder="0.00"
                      className="w-full p-3.5 rounded-xl bg-slate-800 border-2 border-slate-700/50 text-white font-bold focus:outline-none focus:border-yellow-500/50 focus:ring-4 focus:ring-yellow-500/20 transition-all"
                    />
                  </div>

                  {/* Reward */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-yellow-200/90 uppercase tracking-wider">Reward</label>
                    <input
                      type="text"
                      name="reward"
                      value={editFormData.reward}
                      onChange={handleEditInputChange}
                      placeholder="Enter reward..."
                      className="w-full p-3.5 rounded-xl bg-slate-800 border-2 border-slate-700/50 text-white font-semibold focus:outline-none focus:border-yellow-500/50 focus:ring-4 focus:ring-yellow-500/20 transition-all"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditModalOpen(false);
                        setSelectedUser(null);
                      }}
                      className="flex-1 px-6 py-3.5 bg-slate-700 hover:bg-slate-600 text-white rounded-2xl font-bold transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3.5 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 hover:from-yellow-400 hover:via-amber-400 hover:to-yellow-500 text-black font-black rounded-2xl shadow-xl shadow-yellow-500/30 hover:shadow-yellow-500/50 transition-all duration-300"
                    >
                      Update Rank
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ManageRankAndReward;
