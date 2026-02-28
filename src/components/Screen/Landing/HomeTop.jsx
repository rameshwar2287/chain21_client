import React from "react";
import { FaUsers } from "react-icons/fa";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { RiWallet3Fill } from "react-icons/ri";
import { SiMoneygram } from "react-icons/si";
import SearchComponent from "../../Global/SearchComponent";

const HomeTop = () => {
  return (
    <div className="flex flex-col items-center space-y-[50px] mt-[50px]">
      {/* Title with Premium Gold Gradient & Strong Glow */}
      <div className="text-center space-y-3">
        <p className="text-[var(--text)] font-extrabold text-3xl md:text-6xl premium-gold-gradient gold-glow-text animate-float-gentle" style={{
          textShadow: '0 0 20px rgba(255, 215, 0, 1), 0 0 40px rgba(255, 215, 0, 0.7), 0 0 60px rgba(212, 175, 55, 0.5)'
        }}>
          YUMEKO-AI BLOCKCHAIN EXPLORER
        </p>
        <p className="text-gold-bright text-sm md:text-lg opacity-90 font-medium">
          Powered by Next-Generation Blockchain Technology ✨
        </p>
      </div>

      {/* Top Stats & Search */}
      <div className="flex flex-col md:flex-row items-center md:space-x-4 w-full md:w-[60%] lg:w-[50%] mt-2 space-y-4 md:space-y-0">
        {/* Total Block - Premium Design */}
        <div className="glass-premium-bright rounded-2xl w-full md:w-auto px-6 py-2 flex flex-col items-center hover-gold-glow transition-all duration-300">
          <p className="text-gold-bright opacity-90 whitespace-nowrap text-center font-medium">
            Total Block
          </p>
          <p className="font-bold text-xl text-gold-primary">13.90M</p>
        </div>

        {/* Search Bar */}
        <SearchComponent />
      </div>

      {/* Trending Search */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-6 my-6 w-full">
        <p className="text-xl text-center font-semibold text-[var(--text)] mb-4 md:mb-0 whitespace-nowrap">
          Trending Search:
        </p>
        <div className="grid grid-cols-5 gap-2 md:gap-6 w-full">
          <a className="flex items-center p-2 space-x-4" href="/tokens/pox">
            <img
              src="https://yumekoai.world/assets/yumeko-logo-white-Cfdj20CD.png"
              alt="POX-logo"
              className="w-12 h-12 rounded-full p-2  bg-black dark:bg-transparent"
            />
          </a>
          <a
            className="flex items-center p-2 space-x-4"
            href="/tokendetails/PEmC2y95fNckYXPodRekgbgDQDZmDdw5T7"
          >
            <img
              src="https://yumekoai.world/assets/yumeko-logo-white-Cfdj20CD.png"
              alt="HPOX-logo"
              className="w-12 h-12 rounded-full p-2  bg-black dark:bg-transparent"
            />
          </a>
          <a
            className="flex items-center p-2 space-x-4"
            href="/tokendetails/PApFeUXaX7jjHu3RQcwvgzy1tCwt3G9Q42"
          >
            <img
              src="https://yumekoai.world/assets/yumeko-logo-white-Cfdj20CD.png"
              alt="UVI-logo"
              className="w-12 h-12 rounded-full p-2  bg-black dark:bg-transparent"
            />
          </a>
          <a
            className="flex items-center p-2 space-x-4"
            href="/tokendetails/PQxhtJdzHi2ZFRoU4eUXfRY272FufZvc1P"
          >
            <img
              src="https://yumekoai.world/assets/yumeko-logo-white-Cfdj20CD.png"
              alt="$BDOG-logo"
              className="w-12 h-12 rounded-full p-2  bg-black dark:bg-transparent"
            />
          </a>
          <a
            className="flex items-center p-2 space-x-4"
            href="/tokendetails/PFZK5LUuhYQrieY4xmHN5xt9t4kuT4yuUq"
          >
            <img
              src="https://yumekoai.world/assets/yumeko-logo-white-Cfdj20CD.png"
              alt="wUSDT-logo"
              className="w-12 h-12 rounded-full p-2  bg-black dark:bg-transparent"
            />
          </a>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 3xl:grid-cols-4 gap-6 my-6">
        {/* Box 1 - Premium Design */}
        <div className="glass-premium px-6 py-4 flex justify-between items-center space-x-6 text-sm hover-gold-glow">
          <div className="flex items-center space-x-6">
            <FaUsers size={24} className="text-gold-bright animate-pulse-gold" />
            <div>
              <p className="pb-1 text-[var(--text)] opacity-70">Total Accounts</p>
              <p className="font-bold text-lg text-gold-primary">249,203</p>
            </div>
          </div>
          <div>
            <p className="pb-1 text-[var(--text)] opacity-70 whitespace-nowrap text-right">
              24 hrs
            </p>
            <p className="font-semibold text-gold-bright">+304</p>
          </div>
        </div>

        {/* Box 2 - Premium Design */}
        <div className="glass-premium px-6 py-4 flex justify-between items-center space-x-6 text-sm hover-gold-glow">
          <div className="flex items-center space-x-6">
            <SiMoneygram size={24} className="text-gold-bright animate-pulse-gold" />
            <div>
              <p className="pb-1 text-[var(--text)] opacity-70">
                Total Transactions
              </p>
              <p className="font-bold text-lg text-gold-primary">14,939,198</p>
            </div>
          </div>
          <div>
            <p className="pb-1 text-[var(--text)] opacity-70 whitespace-nowrap text-right">
              24 hrs
            </p>
            <p className="font-semibold text-gold-bright">+17,918</p>
          </div>
        </div>

        {/* Box 3 - Premium Design */}
        <div className="glass-premium px-6 py-4 flex justify-between items-center space-x-6 text-sm hover-gold-glow">
          <div className="flex items-center space-x-6">
            <LuChartNoAxesCombined size={24} className="text-gold-bright animate-pulse-gold" />
            <div>
              <p className="pb-1 text-[var(--text)] opacity-70">TVL (Current)</p>
              <p className="font-bold text-lg text-gold-primary">$1,250,876.00</p>
            </div>
          </div>
          <div>
            <p className="pb-1 text-[var(--text)] opacity-70 whitespace-nowrap text-right">
              24 hrs
            </p>
            <p className="font-semibold text-red-400">-8.32</p>
          </div>
        </div>

        {/* Box 4 - Premium Design */}
        <div className="glass-premium px-6 py-4 flex justify-between items-center space-x-6 text-sm hover-gold-glow">
          <div className="flex items-center space-x-6">
            <RiWallet3Fill size={24} className="text-gold-bright animate-pulse-gold" />
            <div>
              <p className="pb-1 text-[var(--text)] opacity-70">
                Total Transfer Volume
              </p>
              <p className="font-bold text-lg text-gold-primary">$24,231,692.74</p>
            </div>
          </div>
          <div>
            <p className="pb-1 text-[var(--text)] opacity-70 whitespace-nowrap text-right">
              24 hrs
            </p>
            <p className="font-semibold text-gold-bright">+36,601.11</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Premium Design */}
      <div
        className="w-full flex flex-wrap items-center justify-between rounded-2xl my-2 px-6 py-4 glass-premium hover-gold-glow"
      >
        <p className="text-[var(--text)] opacity-70">
          Current / MaxTPS:{" "}
          <span className="text-gold-bright font-semibold">0/10000</span>
        </p>
        <p className="text-[var(--text)] opacity-70">
          Nodes: <span className="text-gold-bright font-semibold">49</span>
        </p>
        <p className="text-[var(--text)] opacity-70">
          Total Token: <span className="text-gold-bright font-semibold">9</span>
        </p>
        <p className="text-[var(--text)] opacity-70">
          Total Contracts:{" "}
          <span className="text-gold-bright font-semibold">91</span>
        </p>
      </div>
    </div>
  );
};

export default HomeTop;
