import React from "react";
import { Link } from "react-router-dom";
import { CardProps } from "../../interfaces/recipe_discovery/recipe_discovery.interface";

const Card: React.FC<CardProps> = (props) => {
  if (props.name) {
    return (
      <Link to={`/recipe/view/${props.obj?._id}`} className="no-underline">
        <div
          className={`rounded-lg bg-white shadow-master flex md:flex-col w-full h-full`}
        >
          <div
            className="bg-whitesmoke bg-cover h-full w-[30%] rounded-l-lg md:h-[152px] md:w-[90%] md:relative md:left-[5%] md:top-[5%] md:rounded-[5px] bg-center"
            style={{ backgroundImage: `url('${props.img}')` }}
          ></div>

          <div className="w-[70%] md:w-full flex flex-col p-3 md:px-4 md:pt-0 md:mt-5 grow">
            <div>
              <span
                className="h-14 md:h-[54px] w-full
                    font-semibold text-lg text-black md:text-xl line-clamp-2 capitalize"
              >
                {props.name}
              </span>
            </div>

            <div className="grow hidden md:block"></div>

            <div className="flex flex-col md:flex-row">
              <span className="mt-2 md:mt-0 font-normal text-darkorange md:text-base text-sm truncate grow">
                {props.chef}
              </span>

              {props.type?.toLowerCase() === "vegetarian" && (
                <span className="md:text-base text-sm capitalize truncate font-light text-[#119C72]">
                  Vegetarian
                </span>
              )}

              {props.type?.toLowerCase() === "non-vegetarian" && (
                <span className="md:text-base text-sm capitalize truncate font-light text-[#9c1a11]">
                  Non-Vegetarian
                </span>
              )}

              {props.type?.toLowerCase() === "vegan" && (
                <span className="md:text-base text-sm capitalize truncate font-light text-[#2f9c11]">
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
    <Link to="#" className="w-full h-[120px] md:w-[320px] md:h-[275px]">
      <div
        className={`rounded-xl bg-white shadow-master w-full h-full flex md:block`}
      >
        <div className="bg-whitesmoke animate-pulse bg-cover h-full w-[30%] md:w-[90%] relative left-0 md:left-[5%] md:top-[5%] rounded-[5px] md:h-[150px]"></div>

        <div>
          <div className="h-[60px] w-[90%] px-2 md:px-0 md:ml-[5%] mt-[10px] md:mt-[20px]">
            <div className="mt-1 w-[175px] h-7 md:w-52 rounded-lg bg-whitesmoke animate-pulse"></div>
          </div>

          <div className="bg-whitesmoke animate-pulse float-top md:float-left relative md:top-2 left-[5%] h-5 w-28 rounded-md"></div>
          <div className="bg-whitesmoke animate-pulse top-1 float-bottom left-[5%] md:left-auto md:float-right relative right-[5%] md:top-2 h-5 w-20 rounded-md"></div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
