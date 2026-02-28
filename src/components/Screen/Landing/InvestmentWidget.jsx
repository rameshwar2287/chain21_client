// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { LandingRouters } from '../../../constants/routes';

// const InvestmentWidget = () => {
//   const navigate = useNavigate();
//   const [quantity, setQuantity] = useState(1);
//   const [activeTab, setActiveTab] = useState('One Time');

//   const tabs = ['One Time', 'Monthly', 'Daily'];
  
//   const properties = [
//     { title: 'Senior Living Investment Opportunity by Manasum', active: true, img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=100&h=100' },
//     { title: 'Hyderabad Prime Land Investment Opportunity', active: false, img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=100&h=100' },
//     { title: 'Bangalore Prime Land Investment Opportunity', active: false, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=100&h=100' },
//     { title: 'Goa Holiday Homes Investment Opportunity', active: false, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=100&h=100' },
//     { title: 'Mumbai Commercial Complex Investment', active: false, img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=100&h=100' },
//     { title: 'Chennai IT Park Investment Opportunity', active: false, img: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=100&h=100' },
//   ];

//   const handleIncrement = () => setQuantity(prev => prev + 1);
//   const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

//   return (
//     <div className="min-h-screen bg-black text-white font-sans p-6 md:p-12">
//       {/* Top Navigation Tabs */}
//       <div className="flex justify-center mb-8">
//         <div className="flex space-x-6 text-sm font-medium">
//           {tabs.map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-6 py-2 rounded-full transition-colors ${
//                 activeTab === tab
//                   ? 'bg-[#f97316] text-white'
//                   : 'text-gray-400 hover:text-white'
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Main Content Layout */}
//       <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 items-start">
        
//         {/* Left Panel - Calculator Widget */}
//         <div className="w-full lg:w-[65%] bg-[#111111] border border-gray-800 rounded-3xl p-6 lg:h-[600px] flex flex-col">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
            
//             {/* Left Column Inside Widget */}
//             <div className="flex flex-col gap-4">
//               {/* SQFT Quantity Input */}
//               <div className="bg-black border border-gray-800 rounded-xl p-4 flex justify-between items-center">
//                 <span className="text-gray-300 font-medium">SQFT Quantity</span>
//                 <div className="flex items-center space-x-4">
//                   <button onClick={handleDecrement} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-xl hover:bg-gray-700">-</button>
//                   <span className="font-semibold text-lg">{quantity}</span>
//                   <button onClick={handleIncrement} className="w-8 h-8 rounded-full bg-[#f97316] flex items-center justify-center text-xl hover:bg-orange-600">+</button>
//                 </div>
//               </div>

//               {/* Market Price Selection */}
//               <div className="bg-black border border-gray-800 rounded-xl p-4 flex justify-between items-center cursor-pointer">
//                 <div className="flex items-center gap-3">
//                   <div className="w-4 h-4 rounded-full border-4 border-[#f97316] bg-black"></div>
//                   <span className="text-gray-300">Market Price</span>
//                 </div>
//                 <div className="text-right">
//                   <span className="text-blue-400 font-bold text-lg">₹10,109.35</span>
//                   <span className="text-xs text-gray-500 ml-1">/SQ.FT</span>
//                 </div>
//               </div>

//               {/* Limit Price Selection */}
//               <div className="bg-black border border-gray-800 rounded-xl p-4 flex justify-between items-center opacity-50 cursor-not-allowed">
//                 <div className="flex items-center gap-3">
//                   <div className="w-4 h-4 rounded-full border border-gray-500"></div>
//                   <span className="text-gray-300">Limit Price</span>
//                 </div>
//                 <div className="text-right blur-[2px]">
//                   <span className="text-blue-400 font-bold text-lg">₹10,134.35</span>
//                   <span className="text-xs text-gray-500 ml-1">/SQ.FT</span>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column Inside Widget */}
//             <div className="bg-black border border-gray-800 rounded-xl p-5 flex flex-col justify-between h-full">
//               <div>
//                 <div className="flex justify-between items-start mb-6">
//                   <span className="text-gray-300">Total Amount Payable*</span>
//                   <div className="text-right">
//                     <div className="text-blue-400 font-bold text-2xl">₹10,361.04</div>
//                     <div className="text-[10px] text-gray-500 mt-1">(Incl.Fees, Other Levies & Discount)</div>
//                   </div>
//                 </div>

//                 {/* Progress Bar Area */}
//                 <div className="mb-6">
//                   <div className="flex justify-between text-xs mb-2">
//                     <span className="text-white font-semibold">Bulk Discount</span>
//                     <span className="text-gray-400 italic">Order 30 SQFT to activate bulk discount</span>
//                   </div>
//                   <div className="w-full h-3 bg-gray-800 rounded-full flex gap-1">
//                     <div className="h-full w-2/3 bg-teal-500 rounded-l-full"></div>
//                     <div className="h-full w-1/4 bg-teal-500"></div>
//                     <div className="h-full w-1/12 bg-[#f97316] rounded-r-full"></div>
//                   </div>
//                 </div>

//                 {/* Breakdown */}
//                 <div className="space-y-3 text-sm">
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span> Trade Value</span>
//                     <span className="font-medium">₹10,109.35</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#f97316]"></span> Volatility Margin</span>
//                     <span className="font-medium">₹101.09</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span> Fees & Other Levies</span>
//                     <span className="font-medium">₹150.60</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Bottom Footer of Widget */}
//           <div className="mt-6 flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-6">
//             <div className="flex items-start gap-3 w-full md:w-2/3 mb-4 md:mb-0">
//               <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 accent-blue-600 rounded" />
//               <div>
//                 <p className="text-sm text-gray-300">
//                   I agree to digitally execute & be legally bound by this <a href="#" className="text-blue-500 hover:underline">Sales & Purchase Agreement</a>
//                 </p>
//                 <p className="text-[11px] text-gray-600 mt-2">*Returns and Liquidity are not guaranteed and are subjected to market risks.</p>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-4">
//               <button className="text-sm font-semibold text-white hover:text-gray-300">Know More</button>
//               <button 
//                 onClick={() => navigate(LandingRouters.USER_LOGIN)}
//                 className="flex items-center gap-2 border border-[#f97316] text-[#f97316] px-6 py-2.5 rounded-full font-semibold hover:bg-[#f97316] hover:text-white transition-all"
//               >
//                 Buy Now 
//                 <span className="text-xl leading-none">›</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Right Panel - Property Options */}
//         <div className="w-full lg:w-[35%] bg-[#111111] border border-gray-800 rounded-3xl p-4 lg:h-[600px] overflow-y-auto flex flex-col gap-3">
//           {properties.map((prop, index) => (
//             <div 
//               key={index} 
//               className={`flex items-center gap-4 bg-black rounded-2xl p-3 cursor-pointer transition-all border ${
//                 prop.active ? 'border-[#f97316]' : 'border-gray-800 hover:border-gray-600'
//               }`}
//             >
//               <img src={prop.img} alt="Property" className="w-20 h-20 rounded-xl object-cover" />
//               <div className="flex-1 pr-4">
//                 <h4 className="text-sm font-semibold leading-tight text-gray-200">{prop.title}</h4>
//               </div>
//             </div>
//           ))}
//           <div className="flex justify-center mt-2 cursor-pointer">
//             <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-gray-500 hover:text-white">
//                ⌄
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default InvestmentWidget;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Ensure this path matches your project structure
import { LandingRouters } from '../../../constants/routes';

const InvestmentWidget = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('One Time');

  const tabs = ['One Time', 'Monthly', 'Daily'];
  
  // Updated properties to reflect Global Tokenized Real Estate
//   const properties = [
//     { title: 'Dubai Marina Luxury Villa Tokenization', active: true, img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=100&h=100' },
//     { title: 'Manhattan Commercial Real Estate Yield', active: false, img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=100&h=100' },
//     { title: 'Miami Beachfront Condo Fractional Asset', active: false, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=100&h=100' },
//     { title: 'Singapore Tech Park Prime Asset', active: false, img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=100&h=100' },
//     { title: 'London High-Rise Residential Yield', active: false, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=100&h=100' },
//     { title: 'Tokyo Retail Hub Investment Node', active: false, img: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=100&h=100' },
//   ];
const properties = [
    { title: 'Pune Luxury Co-Living Investment Opportunity', active: true, img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=100&h=100' },
    { title: 'Noida Tech Hub Commercial Space', active: false, img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=100&h=100' },
    { title: 'Kochi Waterfront Residential Asset', active: false, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=100&h=100' },
    { title: 'Alibaug Premium Beachfront Villas', active: false, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=100&h=100' },
    { title: 'Ahmedabad Smart Logistics Hub Investment', active: false, img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=100&h=100' },
    { title: 'Jaipur Heritage Resort Fractional Share', active: false, img: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=100&h=100' },
  ];

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="min-h-screen bg-black text-white font-sans p-6 md:p-12 selection:bg-amber-500 selection:text-black">
      {/* Top Navigation Tabs */}
      <div className="flex justify-center mb-10">
        <div className="flex space-x-4 text-xs font-bold tracking-widest uppercase">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-2.5 rounded-full transition-all duration-300 border ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                  : 'bg-[#111111] text-gray-500 border-gray-800 hover:text-white hover:border-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Left Panel - Calculator Widget */}
        <div className="w-full lg:w-[65%] bg-[#111111] border border-gray-800 rounded-[2.5rem] p-6 lg:p-8 lg:h-[600px] flex flex-col shadow-2xl relative overflow-hidden group">
          
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] group-hover:bg-blue-600/10 transition-all duration-700 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 relative z-10">
            
            {/* Left Column Inside Widget */}
            <div className="flex flex-col gap-4">
              {/* Token Quantity Input */}
              <div className="bg-black border border-gray-800 rounded-2xl p-5 flex justify-between items-center transition-colors hover:border-gray-700">
                <span className="text-gray-400 font-medium uppercase text-xs tracking-widest">Token Quantity</span>
                <div className="flex items-center space-x-4">
                  <button onClick={handleDecrement} className="w-8 h-8 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center text-xl hover:bg-gray-800 hover:text-white transition-colors">-</button>
                  <span className="font-bold text-xl text-white w-8 text-center">{quantity}</span>
                  <button onClick={handleIncrement} className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-black flex items-center justify-center text-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-amber-500/20">+</button>
                </div>
              </div>

              {/* Market Price Selection */}
              <div className="bg-black border border-blue-500/50 rounded-2xl p-5 flex justify-between items-center cursor-pointer shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-4 border-blue-500 bg-black shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                  <span className="text-gray-300 font-medium">Market Price</span>
                </div>
                <div className="text-right">
                  <span className="text-white font-black text-xl">$250.00</span>
                  <span className="text-[10px] text-gray-500 ml-1 tracking-widest uppercase">/ USDT</span>
                </div>
              </div>

              {/* Limit Price Selection */}
              <div className="bg-black border border-gray-800 rounded-2xl p-5 flex justify-between items-center opacity-50 cursor-not-allowed hover:border-gray-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-600"></div>
                  <span className="text-gray-400 font-medium">Limit Price</span>
                </div>
                <div className="text-right blur-[1px]">
                  <span className="text-white font-bold text-xl">$245.50</span>
                  <span className="text-[10px] text-gray-500 ml-1 tracking-widest uppercase">/ USDT</span>
                </div>
              </div>
            </div>

            {/* Right Column Inside Widget */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-between items-start mb-8 border-b border-gray-800 pb-6">
                  <span className="text-gray-400 uppercase text-xs tracking-widest font-medium">Total Amount Payable*</span>
                  <div className="text-right">
                    <div className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200 font-black text-3xl">
                      ${(250 * quantity + 15.60 + 5.50).toFixed(2)}
                    </div>
                    <div className="text-[9px] text-gray-500 mt-2 tracking-widest uppercase">(Incl. Gas Fees & Platform Levies)</div>
                  </div>
                </div>

                {/* Progress Bar Area */}
                <div className="mb-8">
                  <div className="flex justify-between text-[10px] uppercase tracking-wider mb-3">
                    <span className="text-white font-bold">Whale Discount</span>
                    <span className="text-blue-400">Order 10+ Tokens</span>
                  </div>
                  <div className="w-full h-2 bg-gray-900 rounded-full flex gap-1 overflow-hidden border border-gray-800">
                    <div className="h-full w-2/3 bg-blue-600 rounded-l-full"></div>
                    <div className="h-full w-1/4 bg-blue-400"></div>
                    <div className="h-full w-1/12 bg-amber-400 rounded-r-full"></div>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center gap-2 text-xs uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.8)]"></span> Asset Value
                    </span>
                    <span className="font-bold text-white">${(250 * quantity).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center gap-2 text-xs uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_5px_rgba(251,191,36,0.8)]"></span> Est. Gas Fees
                    </span>
                    <span className="font-medium text-gray-300">$5.50</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center gap-2 text-xs uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.8)]"></span> Platform Levies
                    </span>
                    <span className="font-medium text-gray-300">$15.60</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer of Widget */}
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-6 relative z-10">
            <div className="flex items-start gap-3 w-full md:w-2/3 mb-6 md:mb-0">
              <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 accent-amber-500 rounded cursor-pointer" />
              <div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  I agree to digitally execute & be legally bound by this <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors border-b border-blue-400/30 pb-0.5">Smart Contract & Purchase Agreement</a>.
                </p>
                <p className="text-[10px] text-gray-600 mt-2 uppercase tracking-wider">*Yields and Liquidity are subject to on-chain market risks.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              <button className="text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-white transition-colors">Know More</button>
              <button 
                onClick={() => navigate(LandingRouters.USER_LOGIN)}
                className="group flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-400 text-black px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:scale-105 transition-all active:scale-95"
              >
                Mint Asset 
                <span className="text-lg leading-none group-hover:translate-x-1 transition-transform">›</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Property Options */}
        <div className="w-full lg:w-[35%] bg-[#111111] border border-gray-800 rounded-[2.5rem] p-4 lg:h-[600px] overflow-y-auto flex flex-col gap-3 scrollbar-hide">
          {properties.map((prop, index) => (
            <div 
              key={index} 
              className={`flex items-center gap-4 bg-black rounded-3xl p-3 cursor-pointer transition-all border ${
                prop.active 
                ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.15)] bg-gradient-to-r from-blue-900/10 to-black' 
                : 'border-gray-800 hover:border-gray-600 hover:bg-[#0a0a0a]'
              }`}
            >
              <img src={prop.img} alt="Property" className="w-20 h-20 rounded-2xl object-cover border border-gray-800" />
              <div className="flex-1 pr-2">
                <h4 className={`text-sm font-bold leading-snug ${prop.active ? 'text-white' : 'text-gray-300'}`}>
                  {prop.title}
                </h4>
                {/* Simulated Crypto APR tags */}
                <div className="mt-2 flex gap-2">
                  <span className="text-[9px] font-bold tracking-widest uppercase text-amber-400 bg-amber-400/10 px-2 py-1 rounded-md border border-amber-400/20">
                    12% APY
                  </span>
                  <span className="text-[9px] font-bold tracking-widest uppercase text-blue-400 bg-blue-400/10 px-2 py-1 rounded-md border border-blue-400/20">
                    ERC-404
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-center mt-2 cursor-pointer pb-2">
            <div className="w-10 h-10 rounded-full bg-black border border-gray-800 flex items-center justify-center text-gray-500 hover:text-white hover:border-gray-600 hover:bg-gray-900 transition-all">
               ⌄
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InvestmentWidget;