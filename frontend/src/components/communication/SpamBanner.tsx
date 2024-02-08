import React from "react";
import { BiSolidErrorCircle } from "react-icons/bi";

const SpamBanner: React.FC = () => {
  return (
    <div className="bg-yellow-100 font-medium text-yellow-900 py-3 px-4 rounded-xl flex flex-col md:flex-row md:items-center gap-2 md:w-[95%]">
      <p className="font-semibold shrink-0 md:mr-1 flex items-center justify-center">
        <BiSolidErrorCircle className="text-xl" />
        &thinsp; Spam Policy
      </p>
      <p className="text-sm md:mt-1">
        Please submit valid food recipes only - this helps maintain a pleasant
        experience for everyone and ensure that things work as intended.
        Expletives are strictly prohibited.
      </p>
    </div>
  );
};

export default SpamBanner;
