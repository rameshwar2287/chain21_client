// import React, { useState } from "react";
// import Hero from "../../components/Screen/Landing/Hero";
// import Convenient from "../../components/Screen/Landing/Convenient";
// import Partners1 from "../../components/Screen/Landing/Partners1";
// import Faq1 from "../../components/Screen/Landing/Faq1";
// import MissionVision from "../../components/Screen/Landing/MissionVision";
// import DocSpan from "../../components/Screen/Landing/DocSpan";
// import DocSlide from "../../components/Screen/Landing/DocSlide";
// import Roadmap from "../../components/Screen/Landing/Roadmap";

// const LandingPage = () => {
//   return (
//     <>
//       <div className="min-h-screen text-white" >
//         <div className="">
//           <Hero />
//           {/* About */}
//           <DocSpan />

//           <MissionVision />

//           <Roadmap />

//           {/* Supported Wallet */}
//           <DocSlide />

//           {/* Why Gcc */}
//           <Partners1 />

//           {/* Dashboard */}
//           <Convenient />

//           <Faq1 />
//         </div>
//       </div>
//     </>
//   );
// };

// export default LandingPage;



import React, { useState, useEffect } from "react";
import Hero from "../../components/Screen/Landing/Hero";
import Convenient from "../../components/Screen/Landing/Convenient";
import Partners1 from "../../components/Screen/Landing/Partners1";
import Faq1 from "../../components/Screen/Landing/Faq1";
import MissionVision from "../../components/Screen/Landing/MissionVision";
import DocSpan from "../../components/Screen/Landing/DocSpan";
import DocSlide from "../../components/Screen/Landing/DocSlide";
import Roadmap from "../../components/Screen/Landing/Roadmap";
import LoginModal from "../../components/Screen/Landing/LoginModal"; // Import the new component
import PropertyTicker from "../../components/Screen/Landing/PropertyTicker";
import InvestmentWidget from "../../components/Screen/Landing/InvestmentWidget";

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Auto-open modal after 5 seconds
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="min-h-screen text-white bg-white">
        <div className="">
          <Hero />
          <PropertyTicker/>
          <DocSpan />
          <InvestmentWidget/>
          <MissionVision />
          <Roadmap />
          <DocSlide />
          {/* <Partners1 /> */}
          {/* <Convenient /> */}
          <Faq1 />
        </div>

        {/* Login Modal Component */}
        {/* <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
      </div>
    </>
  );
};

export default LandingPage;