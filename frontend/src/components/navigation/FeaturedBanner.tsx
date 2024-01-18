import React from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

interface FeaturedBannerProps {
  id: string;
  name?: string;
  author?: string;
  text?: string;
}

const FeaturedBanner: React.FC<FeaturedBannerProps> = (props) => {
  return (
    <div className="rounded-xl bg-darkorange p-10 col-span-2 ">
      <Link to={`/recipe/view/${props.id}`} className="no-underline">
        <div className="flex flex-col gap-5 ">
          <h1 className="font-bold text-[30px] text-white">Featured</h1>

          {props.name && (
            <h2 className="lg:hidden font-medium text-[18px] text-white md:text-xl capitalize">
              {props.author}'s {props.name}
            </h2>
          )}
          {props.text && (
            <h2 className="font-medium text-[18px] text-white">{props.text}</h2>
          )}

          {props.text && (
            <h3 className="text-sm md:text-base text-white lg:hidden flex items-center">
              Take a look &nbsp;
              <BiRightArrowAlt className="text-[20px]" />
            </h3>
          )}

          {!props.text && (
            <div className="mt-1 h-7 w-[96%] xl:w-[82%] rounded-lg bg-[#ebebeb] animate-pulse"></div>
          )}
          {!props.text && (
            <div className="mt-1 h-7 w-[64%] rounded-lg bg-[#ebebeb] animate-pulse"></div>
          )}
          {!props.text && (
            <div className="md:hidden mt-1 h-7 w-[64%] rounded-lg bg-[#ebebeb] animate-pulse"></div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default FeaturedBanner;
