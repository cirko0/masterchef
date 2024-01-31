import React from "react";
import { Link } from "react-router-dom";

interface CardProps {
  name?: string;
  obj?: {
    _id: string;
  };
  img?: string;
  width: string;
  height: string;
  chef?: string;
  type?: string;
}

const Card: React.FC<CardProps> = (props) => {
  if (props.name) {
    return (
      <Link to={`/recipe/view/${props.obj?._id}`} className="no-underline">
        <div
          className={`rounded-xl bg-white shadow-[0px_0px_15px_0px_rgba(0,_0,_0,_0.15)] w-full text-left p-5 cursor-pointer flex gap-5 flex-col h-full`}
        >
          <img
            className="bg-gray-500 rounded-xl w-full h-[150px] object-cover"
            alt=""
            src={`${props.img}`}
          />
          <div className="flex justify-between font-medium flex-col h-full gap-4">
            <span className="text-[20px] font-medium text-black line-clamp-2 capitalize">
              {props.name}
            </span>
            <div className="flex justify-between md:flex-row ">
              <span className="text-darkorange text-[16px] truncate">
                {props.chef}
              </span>
              {props.type?.toLowerCase() === "vegetarian" && (
                <span className="text-[16px] capitalize truncate text-[#119C72]">
                  Vegetarian
                </span>
              )}
              {props.type?.toLowerCase() === "non-vegetarian" && (
                <span className="text-[16px] capitalize truncate text-[#9c1a11]">
                  Non-Vegetarian
                </span>
              )}
              {props.type?.toLowerCase() === "vegan" && (
                <span className="text-[16px] capitalize truncate text-[#2f9c11]">
                  Vegan
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to="#">
      <div
        className={`font-poppins rounded-lg bg-white shadow-[0px_0px_15px_0px_rgba(0,_0,_0,_0.15)] card`}
        style={{ width: props.width, height: props.height }}
      >
        <div className="bg-[#ebebeb] animate-pulse bg-cover h-[150px] w-[90%] relative left-[5%] top-[5%] rounded-[5px]"></div>
        <div className="font-poppins font-semibold text-lg h-[60px] w-[90%] ml-[5%] mt-[20px] text-ellipsis overflow-hidden text-ninja-blue">
          <div className="mt-1 h-7 w-52 rounded-lg bg-[#ebebeb] animate-pulse"></div>
        </div>
        <div className="bg-[#ebebeb] animate-pulse float-left relative top-2 left-[5%] h-5 w-28 rounded-md"></div>
        <div className="bg-[#ebebeb] animate-pulse float-right relative right-[5%] top-2 h-5 w-20 rounded-md"></div>
      </div>
    </Link>
  );
};

export default Card;
