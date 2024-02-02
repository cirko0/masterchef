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
    <div className="rounded-3xl bg-darkorange py-5 px-7 grow">
      <Link to={`/recipe/view/${props.id}`} className="no-underline">
        <div className="flex flex-col grow gap-y-2">
          <h1 className="font-semibold text-2xl md:text-3xl text-white">
            Featured
          </h1>

          {props.name && (
            <h2 className="lg:hidden font-semibold text-lg md:text-xl capitalize text-white">
              {props.author}'s {props.name}
            </h2>
          )}
          {props.text && (
            <h2 className="italic font-semibold text-sm md:text-base lg:text-lg text-white">
              {props.text}
            </h2>
          )}

          {props.text && (
            <h3 className="text-sm md:text-base lg:hidden text-white flex items-center">
              Take a look &nbsp;
              <BiRightArrowAlt className="text-[20px]" />
            </h3>
          )}

          {!props.text && (
            <div className="mt-1 h-7 w-[96%] xl:w-[82%] rounded-lg bg-[#ffbf73] animate-pulse"></div>
          )}
          {!props.text && (
            <div className="mt-1 h-7 w-[64%] rounded-lg bg-[#ffbf73] animate-pulse"></div>
          )}
          {!props.text && (
            <div className="md:hidden mt-1 h-7 w-[64%] rounded-lg bg-[#ffbf73] animate-pulse"></div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default FeaturedBanner;
