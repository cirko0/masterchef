import React from "react";
import { BiSolidBolt } from "react-icons/bi";

const AIAssistBanner: React.FC = () => {
  return (
    <div className="bg-[#D6F4EF] font-medium text-[#00654B] py-3 px-4 rounded-xl flex flex-col md:flex-row md:items-center gap-2 mb-1">
      <p className="font-semibold shrink-0 md:mr-1 flex items-center justify-center">
        <BiSolidBolt className="text-xl" />
        &thinsp; AI Assist
      </p>
      <p className="text-sm">
        Time for teamwork. Simply write out the steps & AI Assist will take care
        of writing the ingredient list, introduction and more. If you don't have
        an image to upload, it will generate one for you too.
      </p>
    </div>
  );
};

export default AIAssistBanner;
