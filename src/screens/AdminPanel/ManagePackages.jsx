import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/loadingSlice";
import PlanCard from "../../components/Screen/UserPanel/PlanCard";
import {
  getAllPackageBuyers,
  getPackageInfoAdmin,
  updatePackageAdmin,
  createPackageAdmin,
  deletePackageAdmin,
} from "../../api/admin.api";
import { getMoneySymbol } from "../../utils/additionalFunc";
import { toast } from "react-toastify";
import DataTable from "../../components/Screen/UserPanel/DataTable";
import { useLocation } from "react-router-dom";
import { isToday } from "../../utils/helper";
import Swal from "sweetalert2";

const ManagePackage = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [plans, setPlans] = useState([]);
  const location = useLocation();
  const data = location?.state;

  const [allPackageBuyers, setAllPackageBuyers] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    min: "",
    max: "",
    profitPercentage: "",
    profitLimit: "",
    tags: "",
    picture: "",
    location: "",
    status: true,
  });
  const [isCreateMode, setIsCreateMode] = useState(false);

  const staticPlans = [
    {
      id: 1,
      title: "BASIC Plan",
      min: 50,
      max: 1000,
      profitPercentage: 8,
      limit: "Up to 3X",
      recommended: false,
      features: [
        "8% return on investment",
        "Investment range: $50 – $1000",
        "Profit limit: Up to 3X",
        "Limited support",
        "Basic access to features",
      ],
    },
    {
      id: 2,
      title: "STANDARD Plan",
      min: 1010,
      max: 5000,
      profitPercentage: 10,
      limit: "Up to 3X",
      recommended: true,
      features: [
        "10% return on investment",
        "Investment range: $1010 – $5,000",
        "Profit limit: Up to 3X",
        "Priority support",
        "Access to premium features",
      ],
    },
    {
      id: 3,
      title: "PREMIUM Plan",
      min: 5100,
      max: Infinity,
      profitPercentage: 12,
      limit: "Up to 3X",
      recommended: false,
      features: [
        "12% return on investment",
        "Investment range: $5,100 & Above",
        "Profit limit: Up to 3X",
        "24/7 support",
        "Full access to all features",
      ],
    },
  ];

  const handleSelectPlan = (plan) => {
    // Ensure we preserve the _id or id from the plan object
    const planWithId = {
      ...plan,
      _id: plan._id || plan.id, // Ensure _id is always set
    };

    setSelectedPlan(planWithId);
    setIsModalOpen(true);
    setIsCreateMode(false);

    setFormData({
      title: plan.title || "",
      min: plan.min || "",
      max: plan.max === Infinity ? "" : plan.max || "",
      profitPercentage: plan.profitPercentage || "",
      profitLimit: plan.profitLimit || plan.limit || "",
      tags: extractTags(plan.features) || "",
      picture: plan.picture || "",
      location: plan.location || "",
      status: extractStatus(plan.features, plan.status),
    });
  };

  const handleCreateNew = () => {
    setSelectedPlan(null);
    setIsModalOpen(true);
    setIsCreateMode(true);
    setFormData({
      title: "",
      min: "",
      max: "",
      profitPercentage: "",
      profitLimit: "",
      tags: "",
      picture: "",
      location: "",
      status: true,
    });
  };

  const extractTags = (features) => {
    const tagLine = features.find((f) => f.startsWith("Tags:"));
    return tagLine ? tagLine.replace("Tags: ", "") : "";
  };

  const extractStatus = (features, planStatus) => {
    // First check if plan has direct status property
    if (planStatus !== undefined) {
      return planStatus;
    }
    // Fallback to extracting from features array
    if (features && Array.isArray(features)) {
      const statusLine = features.find((f) => f && f.startsWith("Status:"));
      return statusLine?.includes("Active") ?? true;
    }
    return true; // Default to active
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
    setIsCreateMode(false);
    setFormData({
      title: "",
      min: "",
      max: "",
      profitPercentage: "",
      profitLimit: "",
      tags: "",
      picture: "",
      location: "",
      status: true,
    });
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, picture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchPackageInfo = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getPackageInfoAdmin();
      console.log("Admin Package API Response:", response);

      const rawPlans = response?.data || response?.packages || response;

      if (!rawPlans || !Array.isArray(rawPlans)) {
        console.warn("Invalid API response format, using static plans");
        setPlans(staticPlans);
        return;
      }

      const transformedPlans = rawPlans.map((plan) => ({
        _id: plan._id,
        id: plan.id || plan._id,
        title: plan.title,
        min: plan.minAmount,
        max: plan.maxAmount,
        profitPercentage: plan.percentage,
        profitLimit: plan.profitLimit || plan.limit || "Up to 3X",
        recommended: plan.title.toLowerCase() === "standard",
        perDayRoi: plan.perDayRoi ?? 0,
        status: plan.status,
        features: [
          `${plan.percentage}% return on investment`,
          `Investment range: ${getMoneySymbol()}${plan.minAmount} – ${plan.maxAmount === Infinity
            ? "∞"
            : getMoneySymbol() + plan.maxAmount
          }`,
          `Profit limit: ${plan.profitLimit || plan.limit || "Up to 3X"}`,
          plan.tags && plan.tags.length > 0 ? `Tags: ${plan.tags.join(", ")}` : "",
          plan.perDayRoi ? `Per day ROI: $ ${plan.perDayRoi}` : "",
          `Status: ${plan.status ? "Active" : "Inactive"}`,
        ].filter(Boolean), // Remove empty strings
      }));

      setPlans(transformedPlans);
    } catch (error) {
      console.error("Error fetching package info:", error);
      // Don't show toast for initial load errors, just use static plans
      setPlans(staticPlans);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchPackageInfo();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.min || !formData.profitPercentage) {
      toast.error("Please fill all required fields");
      return;
    }

    // Minimum investment validation
    if (parseFloat(formData.min) < 100) {
      toast.error("Minimum investment must be at least $100");
      return;
    }

    const payload = {
      title: formData.title,
      minAmount: parseFloat(formData.min),
      maxAmount: formData.max === "" ? Infinity : parseFloat(formData.max),
      percentage: parseFloat(formData.profitPercentage),
      profitLimit: formData.profitLimit || "Up to 3X",
      tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      picture: formData.picture || "",
      location: formData.location || "",
      status: formData.status,
      perDayRoi: 0,
    };

    try {
      dispatch(setLoading(true));
      let res;

      if (isCreateMode) {
        // Create new package
        res = await createPackageAdmin(payload);
        if (res?.success) {
          toast.success(res?.message || "Property created successfully!");
          handleCloseModal();
          fetchPackageInfo();
        } else {
          toast.error(res?.message || "Failed to create property!");
        }
      } else {
        // Update existing package
        const packageId = selectedPlan?._id || selectedPlan?.id;
        if (!packageId) {
          toast.error("Property ID is missing. Cannot update property.");
          console.error("Selected plan:", selectedPlan);
          return;
        }
        res = await updatePackageAdmin(packageId, payload);
        if (res?.success) {
          toast.success(res?.message || "Property updated successfully!");
          handleCloseModal();
          fetchPackageInfo();
        } else {
          toast.error(res?.message || "Something went wrong!");
        }
      }
    } catch (error) {
      console.error(`Failed to ${isCreateMode ? 'create' : 'update'} property:`, error);
      toast.error(`Failed to ${isCreateMode ? 'create' : 'update'} property. Please try again.`);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeletePackage = async (planId) => {
    if (!planId) {
      toast.error("Property ID is missing. Cannot delete property.");
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        dispatch(setLoading(true));
        const res = await deletePackageAdmin(planId);
        if (res?.success) {
          toast.success(res?.message || "Property deleted successfully!");
          fetchPackageInfo();
        } else {
          toast.error(res?.message || res?.error || "Failed to delete property!");
        }
      } catch (error) {
        console.error("Failed to delete property:", error);
        toast.error(error?.response?.data?.message || "Failed to delete property. Please try again.");
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  const fetchAllPackageBuyersHistory = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getAllPackageBuyers();
      if (response?.success) {
        setAllPackageBuyers(response?.data?.history || response?.data || []);
      } else {
        // Don't show error toast if API fails, just set empty array
        console.warn("Failed to fetch property buyers:", response?.message);
        setAllPackageBuyers([]);
      }
    } catch (err) {
      console.error("Error fetching property buyers: ", err);
      // Don't show toast for initial load errors
      setAllPackageBuyers([]);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchAllPackageBuyersHistory();
  }, []);

  const filteredIncomeHistory =
    data === "today"
      ? allPackageBuyers.filter((item) => isToday(new Date(item.createdAt)))
      : allPackageBuyers;

  const columns = [
    {
      header: "S/N",
      accessor: "_id",
      cell: (_, rowIndex) => (
        <span className="font-medium text-white">{rowIndex + 1}</span>
      ),
    },
    {
      header: "Transaction ID",
      accessor: "id",
      cell: (row) => <span className="font-medium text-white">{row?.id}</span>,
    },
    {
      header: "User ID",
      accessor: "user.username",
      cell: (row) => (
        <span className="font-medium text-white">{row?.user?.username}</span>
      ),
    },
    // {
    //   header: "From User",
    //   accessor: "fromUser.username",
    //   cell: (row) => (
    //     <span className="font-medium text-white">{row?.fromUser?.username || "-"}</span>
    //   ),
    // },
    {
      header: "Amount",
      accessor: "amount",
      cell: (row) => (
        <span className="font-medium text-white text-nowrap">
          $ {row?.amount}
        </span>
      ),
    },
    {
      header: "Generation Income",
      accessor: "income",
      cell: (row) => (
        <span className="font-medium text-white text-nowrap">
          $ {row?.income}
        </span>
      ),
    },
    {
      header: "Level",
      accessor: "level",
      cell: (row) => (
        <span className="font-medium text-white">{row?.level}</span>
      ),
    },
    {
      header: "Days",
      accessor: "days",
      cell: (row) => (
        <span className="font-medium text-white">{row?.days}</span>
      ),
    },
    {
      header: "Type",
      accessor: "type",
      cell: (row) => (
        <span className="font-medium text-white">{row?.type}</span>
      ),
    },
    {
      header: "Reward Paid",
      accessor: "rewardPaid",
      cell: (row) => (
        <span className="font-medium text-white">{row?.rewardPaid}</span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      cell: (row) => (
        <span
          className={`font-medium ${row?.status === "Completed" ? "text-green-500" : "text-yellow-400"
            }`}
        >
          {row?.status}
        </span>
      ),
    },
    {
      header: "Created At",
      accessor: "createdAt",
      cell: (row) => (
        <span className="text-slate-300">
          {new Date(row?.createdAt).toLocaleString()}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-8 pt-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Properties</h1>
          <p className="text-slate-400 mt-1">
            Add Property for user.
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
        >
          <i className="fa-solid fa-plus"></i>
          Create New Property
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div key={plan.id} className="relative">
            <PlanCard
              plan={plan}
              onSelect={handleSelectPlan}
              isAdmin={true}
            />
            <button
              onClick={() => {
                const packageId = plan._id || plan.id;
                if (!packageId) {
                  toast.error("Property ID is missing");
                  return;
                }
                handleDeletePackage(packageId);
              }}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-500 text-white p-2 rounded-lg transition-colors"
              title="Delete Property"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        ))}
      </div>

      <DataTable
        title="Recent Property Investors"
        columns={columns}
        data={filteredIncomeHistory}
        pageSize={10}
      />

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 px-8 py-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {isCreateMode ? "Create New Property" : "Edit Property"}
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">
                    {isCreateMode
                      ? "Define investment property details and benefits"
                      : "Update property configuration and settings"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700/50 rounded-lg"
                >
                  <i className="fa-solid fa-times text-xl"></i>
                </button>
              </div>
            </div>

            {/* Form Body */}
            <form onSubmit={handleFormSubmit} className="p-8">
              {/* Two Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Property Image */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <i className="fa-solid fa-image text-indigo-400"></i>
                    Property Image
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="picture-upload"
                    />
                    <label
                      htmlFor="picture-upload"
                      className="cursor-pointer px-4 py-3 rounded-lg border border-slate-600 bg-slate-800/50 text-white hover:bg-slate-700/50 transition-all flex items-center gap-2"
                    >
                      <i className="fa-solid fa-upload"></i>
                      Choose Image
                    </label>
                    {formData.picture && (
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-slate-600">
                        <img
                          src={formData.picture}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, picture: "" }))}
                          className="absolute top-1 right-1 bg-red-600 hover:bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        >
                          <i className="fa-solid fa-times"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <i className="fa-solid fa-tag text-blue-400"></i>
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    placeholder="Property Title"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-600 bg-slate-800/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Profit Percentage */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <i className="fa-solid fa-percent text-emerald-400"></i>
                    Profit Percentage
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      name="profitPercentage"
                      value={formData.profitPercentage}
                      onChange={handleFormChange}
                      placeholder="Profit Percentage (e.g., 5)"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-600 bg-slate-800/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    <i className="fa-solid fa-info-circle mr-1"></i>
                    Note: ROI is fixed at 5% monthly (0.1667% daily) for all properties
                  </p>
                </div>

                {/* Minimum Investment */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <i className="fa-solid fa-arrow-down text-yellow-400"></i>
                    Minimum Investment
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input
                      type="number"
                      name="min"
                      value={formData.min}
                      onChange={handleFormChange}
                      placeholder="Minimum $100"
                      min="100"
                      required
                      className="w-full pl-8 pr-4 py-3 rounded-lg border border-slate-600 bg-slate-800/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    <i className="fa-solid fa-exclamation-triangle mr-1"></i>
                    Minimum investment must be at least $100
                  </p>
                </div>

                {/* Maximum Investment */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <i className="fa-solid fa-arrow-up text-purple-400"></i>
                    Maximum Investment
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input
                      type="number"
                      name="max"
                      value={formData.max}
                      onChange={handleFormChange}
                      placeholder="Maximum Amount"
                      className="w-full pl-8 pr-4 py-3 rounded-lg border border-slate-600 bg-slate-800/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Profit Limit */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <i className="fa-solid fa-landmark text-cyan-400"></i>
                    Profit Limit
                  </label>
                  <input
                    type="text"
                    name="profitLimit"
                    value={formData.profitLimit}
                    onChange={handleFormChange}
                    placeholder="Profit Limit (e.g., Up to 3X)"
                    className="w-full px-4 py-3 rounded-lg border border-slate-600 bg-slate-800/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <i className="fa-solid fa-location-dot text-red-400"></i>
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                    placeholder="Location (e.g., Dubai, UAE)"
                    className="w-full px-4 py-3 rounded-lg border border-slate-600 bg-slate-800/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Full Width Fields */}
              <div className="space-y-6 mb-6">
                {/* Package Tags/Features */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <i className="fa-solid fa-tags text-pink-400"></i>
                    Property Tags/Features
                    <span className="text-xs text-slate-500 font-normal">(separated by comma)</span>
                  </label>
                  <textarea
                    name="tags"
                    value={formData.tags}
                    onChange={handleFormChange}
                    placeholder="Tags (comma separated)"
                    rows="2"
                    className="w-full px-4 py-3 rounded-lg border border-slate-600 bg-slate-800/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* Active Status */}
                <label className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg border border-slate-600 cursor-pointer hover:bg-slate-700/50 transition-colors">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="status"
                      checked={formData.status}
                      onChange={handleFormChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-500 transition-colors"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                  </div>
                  <div className="flex-1">
                    <span className="text-white font-medium">Active Status</span>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {formData.status ? "Property is active and visible to users" : "Property is inactive and hidden"}
                    </p>
                  </div>
                  <i className={`fa-solid ${formData.status ? 'fa-circle-check text-green-400' : 'fa-circle-xmark text-red-400'} text-xl`}></i>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t border-slate-700/50">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-3 rounded-lg font-semibold text-slate-300 bg-slate-700 hover:bg-slate-600 transition-all hover:shadow-lg"
                >
                  <i className="fa-solid fa-times mr-2"></i>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all hover:shadow-lg hover:shadow-blue-500/50"
                >
                  <i className={`fa-solid ${isCreateMode ? 'fa-plus' : 'fa-save'} mr-2`}></i>
                  {isCreateMode ? "Add Property" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePackage;
