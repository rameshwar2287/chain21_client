import React from "react";
import DocSpan from "./DocSpan";
import DocSlide from "./DocSlide";

const DocSlideFinal = () => {
  return (
    <div className="flex flex-col lg:space-y-[170px] p space-y-[80px]  lg:h-full">
      <DocSpan />
      <DocSlide />
    </div>
  );
};

export default DocSlideFinal;
