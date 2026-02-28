import React, { useEffect } from "react";
import TableComponent from "../../components/Global/TableComponent";
import HomeTop from "../../components/Screen/Landing/HomeTop";
import HomeSecond from "../../components/Screen/Landing/HomeSecond";
import HomeThird from "../../components/Screen/Landing/HomeThird";
import DocSlide from "../../components/Screen/Landing/DocSlide";
import Partners from "../../components/Screen/Landing/Partners";
import Technology from "../../components/Screen/Landing/Technology";
import Convenient from "../../components/Screen/Landing/Convenient";
import Faq from "../../components/Screen/Landing/Faq";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#home") {
      const element = document.getElementById("home");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);
  const columns = [
    "Block",
    "Hash",
    "Time",
    "Type",
    "From",
    "To",
    "Token",
    "Amount/Action",
    "Result",
  ];

  const rows = [
    [
      <a
        className="hover:text-green-500"
        href="/blockchain/block/blockdetails/13919739"
      >
        13,919,739
      </a>,
      <a
        className="truncate text-[#B3B3B3] cursor-pointer hover:text-green-500"
        href="/transactiondetails/9bd217"
      >
        9bd217...a90d50
      </a>,
      <p className="text-white text-opacity-70">3 seconds ago</p>,
      "Transfer POX",
      <a className="hover:text-green-500" href="/address-account/Governance">
        Governance
      </a>,
      <a className="hover:text-green-500" href="/">
        Governance
      </a>,
      <p className="uppercase">POX</p>,
      "45,000,000.000000",
      <p className="text-green-500 font-semibold">SUCCESS</p>,
    ],
    [
      <a
        className="hover:text-green-500"
        href="/blockchain/block/blockdetails/13919734"
      >
        13,919,734
      </a>,
      <a
        className="truncate text-[#B3B3B3] cursor-pointer hover:text-green-500"
        href="/transactiondetails/19e977"
      >
        19e977...52f023
      </a>,
      <p className="text-white text-opacity-70">24 seconds ago</p>,
      "Transfer bdog_usdt",
      <a
        className="hover:text-green-500"
        href="/address-account/PHcf59acrLY8dNWdUWhRMf3n7qJ3uMCy43"
      >
        PHcf5...MCy43
      </a>,
      <a className="hover:text-green-500" href="/">
        PGdvF...VjkCL
      </a>,
      <p className="uppercase">bdog_usdt</p>,
      "2.670630",
      <p className="text-green-500 font-semibold">SUCCESS</p>,
    ],
  ];
  return (
    <div className="md:p-6 p-4 min-h-screen space-y-5 relative" id="home" style={{
      background: 'linear-gradient(135deg, #000000 0%, #1a1410 25%, #0a0a0a 50%, #1a1410 75%, #000000 100%)',
      backgroundAttachment: 'fixed'
    }}>
      {/* Premium Gold Overlay Effect */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at 50% 0%, rgba(255, 215, 0, 0.15) 0%, transparent 50%)',
        zIndex: 0
      }}></div>

      <div className="relative z-10">
        <HomeTop />
        <HomeSecond />
        <HomeThird />

        {/* Premium Transaction Section Header */}
        <div className="mt-12 mb-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold premium-gold-gradient mb-2" style={{textShadow: '0 0 30px rgba(255, 215, 0, 0.6)'}}>
            Recent Blockchain Transactions
          </h1>
          <p className="opacity-70" style={{color: '#FFD700'}}>Live transaction activity on the network</p>
        </div>

        <div className="mb-20 rounded-3xl p-6" style={{
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(212, 175, 55, 0.5)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.2)',
          transition: 'all 0.3s ease'
        }} onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 25px 70px rgba(0, 0, 0, 0.9), 0 0 50px rgba(255, 215, 0, 0.3)';
          e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.7)';
        }} onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.2)';
          e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.5)';
        }}>
          <TableComponent columns={columns} rows={rows} />
        </div>
        <DocSlide />
        <Partners />
        <Technology />
        <Convenient />
        <Faq />
      </div>
    </div>
  );
};

export default Home;
