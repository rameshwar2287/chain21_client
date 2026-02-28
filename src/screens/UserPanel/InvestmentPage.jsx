// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { setLoading } from "../../redux/slices/loadingSlice";
// import InvestmentModal from "../../components/Screen/UserPanel/InvestmentModal";
// import PlanCard from "../../components/Screen/UserPanel/PlanCard";
// import { getPackageInfo } from "../../api/user.api";
// import { getMoneySymbol } from "../../utils/additionalFunc";

// const InvestmentPage = () => {
//   const dispatch = useDispatch();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProperty, setSelectedProperty] = useState(null);
//   const [properties, setProperties] = useState([]);

//   // Updated Static data themed for Chain21 Crypto Real Estate
//   const staticPlans = [
//     {
//       id: 1,
//       title: "Dubai Marina Villa Token",
//       min: 50,
//       max: 1000,
//       profitPercentage: 8,
//       limit: "Up to 3X",
//       recommended: false,
//       features: [
//         "8% Monthly Rental Yield",
//         "Asset Value: $50 – $1000",
//         "Location: Dubai, UAE",
//         "Basic Smart Contract Access",
//         "Open for Investment",
//       ],
//     },
//     {
//       id: 2,
//       title: "Manhattan Commercial Yield",
//       min: 1010,
//       max: 5000,
//       profitPercentage: 10,
//       limit: "Up to 3X",
//       recommended: true,
//       features: [
//         "10% Monthly Rental Yield",
//         "Asset Value: $1010 – $5,000",
//         "Location: New York, USA",
//         "Priority DAO Voting Rights",
//         "Open for Investment",
//       ],
//     },
//     {
//       id: 3,
//       title: "Miami Beachfront Fractional",
//       min: 5100,
//       max: Infinity,
//       profitPercentage: 12,
//       limit: "Up to 3X",
//       recommended: false,
//       features: [
//         "12% Monthly Rental Yield",
//         "Asset Value: $5,100 & Above",
//         "Location: Miami, USA",
//         "Premium Liquidity Pool Access",
//         "Open for Investment",
//       ],
//     },
//   ];

//   const handleSelectProperty = (property) => {
//     setSelectedProperty(property);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedProperty(null);
//   };

//   const fetchPackageInfo = async () => {
//     try {
//       dispatch(setLoading(true));
//       const response = await getPackageInfo();
//       console.log("API Response:", response);
      
//       const rawPlans = response?.data || response?.packages || response;
      
//       // Check if response is an array or has data property. If not, use static plans.
//       if (!rawPlans || !Array.isArray(rawPlans) || rawPlans.length === 0) {
//         console.warn("⚠️ Invalid or empty API response, showing static plans");
//         setProperties(staticPlans);
//         return;
//       }

//       // Transform API response to match PlanCard component format
//       const transformedProperties = rawPlans
//         .filter((plan) => plan.status !== false) // Filter out inactive plans
//         .map((plan) => {
//           const minAmount = plan.minAmount || plan.min || 0;
//           const profitPct = plan.percentage || plan.profitPercentage || 0;

//           // Compute per-day ROI if not provided by API
//           const computedPerDay = ((profitPct / 100) * Number(minAmount || 0)) / 30;
//           const perDayRoiValue = typeof plan.perDayRoi === 'number' && plan.perDayRoi > 0
//             ? Number(plan.perDayRoi)
//             : Number(isFinite(computedPerDay) ? computedPerDay : 0);

//           // Format to two decimals for display
//           const perDayDisplay = perDayRoiValue ? perDayRoiValue.toFixed(2) : '0.00';

//           return {
//             _id: plan._id,
//             id: plan.id || plan._id,
//             title: plan.title || "Prime Estate",
//             min: minAmount,
//             max: plan.maxAmount === Infinity ? Infinity : plan.maxAmount || plan.max || Infinity,
//             profitPercentage: profitPct,
//             perDayRoi: perDayRoiValue,
//             perDayDisplay,
//             limit: "Up to 3X",
//             recommended: plan.title?.toLowerCase() === "standard" || plan.recommended || false,
//             status: plan.status !== false,
//             features: [
//               `Monthly ${profitPct}% Rental Yield`,
//               `Asset Value: ${getMoneySymbol()}${minAmount} – ${
//                 plan.maxAmount === Infinity || plan.max === Infinity
//                   ? "∞"
//                   : `${getMoneySymbol()}${plan.maxAmount || plan.max || 0}`
//               }`,
//               plan.tags && plan.tags.length > 0 ? `Location: ${plan.tags.join(", ")}` : "Prime Location",
//               plan.status ? "Open for Investment" : "Sold Out",
//             ].filter(Boolean), // Remove empty strings
//           };
//         });

//       if (transformedProperties.length > 0) {
//         setProperties(transformedProperties);
//         console.log("✅ Dynamic properties loaded from API:", transformedProperties.length);
//       } else {
//         console.warn("⚠️ API returned empty array, showing static plans fallback");
//         setProperties(staticPlans); // Fallback to static if filtered array is empty
//       }
//     } catch (error) {
//       console.error("❌ Error fetching package info:", error);
//       // Use static data if the API request fails entirely
//       setProperties(staticPlans);
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   useEffect(() => {
//     fetchPackageInfo();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <div className="space-y-8 pt-4">
//       <div>
//         <h1 className="text-3xl font-bold text-white">Property Assets</h1>
//         <p className="text-slate-400 mt-1">
//           Invest in premium tokenized real estate assets and earn passive income.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {properties.map((property) => (
//           <PlanCard key={property.id} plan={property} onSelect={handleSelectProperty} />
//         ))}
//       </div>

//       {isModalOpen && (
//         <InvestmentModal plan={selectedProperty} onClose={handleCloseModal} />
//       )}
//     </div>
//   );
// };

// export default InvestmentPage;


// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { setLoading } from "../../redux/slices/loadingSlice";
// import InvestmentModal from "../../components/Screen/UserPanel/InvestmentModal";
// import PlanCard from "../../components/Screen/UserPanel/PlanCard";
// import { getPackageInfo } from "../../api/user.api";
// import { getMoneySymbol } from "../../utils/additionalFunc";

// const InvestmentPage = () => {
//   const dispatch = useDispatch();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProperty, setSelectedProperty] = useState(null);
//   const [properties, setProperties] = useState([]);

//   // Updated Static data themed for Chain21 Crypto Real Estate
//   const staticPlans = [
//     {
//       id: 1,
//       title: "Dubai Marina Villa Token",
//       min: 50,
//       max: 1000,
//       profitPercentage: 8,
//       limit: "Up to 3X",
//       recommended: false,
//       features: [
//         "8% Monthly Rental Yield",
//         "Asset Value: $50 – $1000",
//         "Location: Dubai, UAE",
//         "Basic Smart Contract Access",
//         "Open for Investment",
//       ],
//     },
//     {
//       id: 2,
//       title: "Manhattan Commercial Yield",
//       min: 1010,
//       max: 5000,
//       profitPercentage: 10,
//       limit: "Up to 3X",
//       recommended: true,
//       features: [
//         "10% Monthly Rental Yield",
//         "Asset Value: $1010 – $5,000",
//         "Location: New York, USA",
//         "Priority DAO Voting Rights",
//         "Open for Investment",
//       ],
//     },
//     {
//       id: 3,
//       title: "Miami Beachfront Fractional",
//       min: 5100,
//       max: Infinity,
//       profitPercentage: 12,
//       limit: "Up to 3X",
//       recommended: false,
//       features: [
//         "12% Monthly Rental Yield",
//         "Asset Value: $5,100 & Above",
//         "Location: Miami, USA",
//         "Premium Liquidity Pool Access",
//         "Open for Investment",
//       ],
//     },
//   ];

//   const handleSelectProperty = (property) => {
//     setSelectedProperty(property);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedProperty(null);
//   };

//   const fetchPackageInfo = async () => {
//     try {
//       dispatch(setLoading(true));
//       const response = await getPackageInfo();
//       console.log("API Response:", response);
      
//       const rawPlans = response?.data || response?.packages || response;
      
//       // Check if response is an array or has data property. If not, use static plans.
//       if (!rawPlans || !Array.isArray(rawPlans) || rawPlans.length === 0) {
//         console.warn("⚠️ Invalid or empty API response, showing static plans");
//         setProperties(staticPlans);
//         return;
//       }

//       // Transform API response to match PlanCard component format
//       const transformedProperties = rawPlans
//         .filter((plan) => plan.status !== false) // Filter out inactive plans
//         .map((plan) => {
//           const minAmount = plan.minAmount || plan.min || 0;
//           const profitPct = plan.percentage || plan.profitPercentage || 0;

//           // Compute per-day ROI if not provided by API
//           const computedPerDay = ((profitPct / 100) * Number(minAmount || 0)) / 30;
//           const perDayRoiValue = typeof plan.perDayRoi === 'number' && plan.perDayRoi > 0
//             ? Number(plan.perDayRoi)
//             : Number(isFinite(computedPerDay) ? computedPerDay : 0);

//           // Format to two decimals for display
//           const perDayDisplay = perDayRoiValue ? perDayRoiValue.toFixed(2) : '0.00';

//           return {
//             _id: plan._id,
//             id: plan.id || plan._id,
//             title: plan.title || "Prime Estate",
//             min: minAmount,
//             max: plan.maxAmount === Infinity ? Infinity : plan.maxAmount || plan.max || Infinity,
//             profitPercentage: profitPct,
//             perDayRoi: perDayRoiValue,
//             perDayDisplay,
//             limit: "Up to 3X",
//             recommended: plan.title?.toLowerCase() === "standard" || plan.recommended || false,
//             status: plan.status !== false,
//             features: [
//               `Monthly ${profitPct}% Rental Yield`,
//               `Asset Value: ${getMoneySymbol()}${minAmount} – ${
//                 plan.maxAmount === Infinity || plan.max === Infinity
//                   ? "∞"
//                   : `${getMoneySymbol()}${plan.maxAmount || plan.max || 0}`
//               }`,
//               plan.tags && plan.tags.length > 0 ? `Location: ${plan.tags.join(", ")}` : "Prime Location",
//               plan.status ? "Open for Investment" : "Sold Out",
//             ].filter(Boolean), // Remove empty strings
//           };
//         });

//       if (transformedProperties.length > 0) {
//         setProperties(transformedProperties);
//         console.log("✅ Dynamic properties loaded from API:", transformedProperties.length);
//       } else {
//         console.warn("⚠️ API returned empty array, showing static plans fallback");
//         setProperties(staticPlans); // Fallback to static if filtered array is empty
//       }
//     } catch (error) {
//       console.error("❌ Error fetching package info:", error);
//       // Use static data if the API request fails entirely
//       setProperties(staticPlans);
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   useEffect(() => {
//     fetchPackageInfo();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <div className="space-y-8 pt-4">
//       <div>
//         <h1 className="text-3xl font-bold text-white">Property Assets</h1>
//         <p className="text-slate-400 mt-1">
//           Invest in premium tokenized real estate assets and earn passive income.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {properties.map((property) => (
//           <PlanCard key={property.id} plan={property} onSelect={handleSelectProperty} />
//         ))}
//       </div>

//       {isModalOpen && (
//         <InvestmentModal plan={selectedProperty} onClose={handleCloseModal} />
//       )}
//     </div>
//   );
// };

// export default InvestmentPage;

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/loadingSlice";
import InvestmentModal from "../../components/Screen/UserPanel/InvestmentModal";
// Removing old PlanCard as we are upgrading it to a custom UI below
// import PlanCard from "../../components/Screen/UserPanel/PlanCard"; 
import { getPackageInfo } from "../../api/user.api";
import { getMoneySymbol } from "../../utils/additionalFunc";
import { MapPin, TrendingUp, ChevronRight, Star, ShieldCheck } from "lucide-react";

// --- CUSTOM UI: Premium Property Card ---
const PropertyAssetCard = ({ plan, onSelect }) => {
  return (
    <div className="group relative bg-[#111111] border border-gray-800 rounded-3xl overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-gray-700 transition-all duration-500 flex flex-col h-full">
      
      {/* Property Image Banner */}
      <div className="relative h-56 w-full overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent z-10" />
        <img 
          src={plan.image} 
          alt={plan.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <TrendingUp size={14} className="text-amber-400" />
            <span className="text-xs font-bold text-white tracking-widest uppercase">{plan.profitPercentage}% Yield</span>
          </div>
        </div>

        {plan.recommended && (
          <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-amber-500 to-orange-500 text-black px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg shadow-amber-500/20">
            <Star size={12} fill="currentColor" />
            <span className="text-[10px] font-black uppercase tracking-widest">Premium Asset</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6 md:p-8 flex flex-col flex-grow relative z-20">
        
        <div className="mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors leading-tight">
            {plan.title}
          </h3>
          <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium uppercase tracking-widest">
            <MapPin size={14} className="text-blue-500" />
            {plan.location || "Prime Global Location"}
          </div>
        </div>

        {/* Investment Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-black border border-gray-800 rounded-xl p-4">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Min Entry</p>
            <p className="text-lg font-bold text-white">{getMoneySymbol()}{plan.min}</p>
          </div>
          <div className="bg-black border border-gray-800 rounded-xl p-4">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Max Allocation</p>
            <p className="text-lg font-bold text-white">
              {plan.max === Infinity ? "Unlimited" : `${getMoneySymbol()}${plan.max}`}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => onSelect(plan)}
          className="mt-auto w-full group/btn bg-blue-600/10 hover:bg-blue-600 border border-blue-600/30 hover:border-blue-500 text-blue-500 hover:text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-widest"
        >
          View Asset Details <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>

      </div>
      
      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
};


// --- MAIN PAGE COMPONENT ---
const InvestmentPage = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [properties, setProperties] = useState([]);



  const handleSelectProperty = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  const fetchPackageInfo = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getPackageInfo();
      
      const rawPlans = response?.data || response?.packages || response;
      
      if (!rawPlans || !Array.isArray(rawPlans) || rawPlans.length === 0) {
        setProperties([]);
        return;
      }

      // Default fallback images for dynamic properties if API doesn't provide them
      const fallbackImages = [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
      ];

      // Transform API response to match New Component format
      const transformedProperties = rawPlans
        .filter((plan) => plan.status !== false)
        .map((plan, index) => {
          const minAmount = plan.minAmount || plan.min || 0;
          const profitPct = plan.percentage || plan.profitPercentage || 0;

          const computedPerDay = ((profitPct / 100) * Number(minAmount || 0)) / 30;
          const perDayRoiValue = typeof plan.perDayRoi === 'number' && plan.perDayRoi > 0
            ? Number(plan.perDayRoi)
            : Number(isFinite(computedPerDay) ? computedPerDay : 0);

          const perDayDisplay = perDayRoiValue ? perDayRoiValue.toFixed(2) : '0.00';

          return {
            _id: plan._id,
            id: plan.id || plan._id,
            title: plan.title || "Prime Estate Asset",
            min: minAmount,
            max: plan.maxAmount === Infinity ? Infinity : plan.maxAmount || plan.max || Infinity,
            profitPercentage: profitPct,
            perDayRoi: perDayRoiValue,
            perDayDisplay,
            limit: "Up to 3X",
            recommended: plan.title?.toLowerCase() === "standard" || plan.recommended || false,
            status: plan.status !== false,
            image: plan.picture || plan.image || plan.img || fallbackImages[index % fallbackImages.length],
            location: plan.location || (plan.tags && plan.tags.length > 0 ? plan.tags.join(", ") : "Global Prime"),
            features: [
              `Monthly ${profitPct}% Rental Yield`,
              `Asset Value: ${getMoneySymbol()}${minAmount} – ${
                plan.maxAmount === Infinity || plan.max === Infinity ? "∞" : `${getMoneySymbol()}${plan.maxAmount || plan.max || 0}`
              }`,
              plan.status ? "Open for Investment" : "Sold Out",
            ].filter(Boolean),
          };
        });

      setProperties(transformedProperties);
    } catch (error) {
      console.error("❌ Error fetching package info:", error);
      setProperties([]);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchPackageInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-10 pt-6 pb-20 px-4 md:px-8 max-w-7xl mx-auto selection:bg-amber-500 selection:text-black">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gray-800">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            <ShieldCheck size={14} className="text-blue-500" /> Verified On-Chain Assets
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Property <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Assets</span></h1>
          <p className="text-gray-400 max-w-xl text-sm leading-relaxed">
            Acquire fractional shares in premium global real estate. Stake your tokens, earn automated rental yields, and build a decentralized portfolio.
          </p>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <PropertyAssetCard 
            key={property.id} 
            plan={property} 
            onSelect={handleSelectProperty} 
          />
        ))}
      </div>

      {/* Investment Modal Component (remains unchanged) */}
      {isModalOpen && (
        <InvestmentModal plan={selectedProperty} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default InvestmentPage;