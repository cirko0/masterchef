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
          className={`rounded-xl bg-white shadow-master w-full text-left p-5 cursor-pointer flex gap-5 flex-col h-full`}
        >
          <img
            className="bg-[#ebebeb] rounded-xl w-full h-[150px] object-cover"
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
        className={`rounded-xl bg-white shadow-master w-full p-5 flex gap-5 flex-col h-full`}
      >
        <div className="bg-[#ebebeb] animate-pulse rounded-xl w-full h-[150px] object-cover"></div>
        <div className="flex flex-col justify-between gap-4">
          <div className="h-6 w-52 rounded-md bg-[#ebebeb] animate-pulse"></div>
          <div className="flex justify-between font-medium">
            <div className="bg-[#ebebeb] animate-pulse float-left h-5 w-28 rounded-md"></div>
            <div className="bg-[#ebebeb] animate-pulse float-right h-5 w-20 rounded-md"></div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
