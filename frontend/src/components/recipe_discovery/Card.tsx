import React from "react";
import { Link } from "react-router-dom";

interface CardProps {
  name?: string;
  obj?: {
    _id: string;
  };
  img?: string;
  chef?: string;
  type?: string;
  width?: string;
  height?: string;
}

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
            <div
              className="h-12 md:h-[54px] w-full
                    overflow-hidden"
            >
              <span className="font-semibold text-xl text-black md:text-lg line-clamp-2 capitalize">
                {props.name}
              </span>
            </div>

            <div className="grow hidden md:block"></div>

            <div className="flex flex-col md:flex-row">
              <span className="mt-4 md:mt-0 font-normal text-darkorange text-base truncate grow">
                {props.chef}
              </span>

              {props.type?.toLowerCase() === "vegetarian" && (
                <span className="text-base capitalize truncate text-[#119C72]">
                  Vegetarian
                </span>
              )}

              {props.type?.toLowerCase() === "non-vegetarian" && (
                <span className="text-base capitalize truncate text-[#9c1a11]">
                  Non-Vegetarian
                </span>
              )}

              {props.type?.toLowerCase() === "vegan" && (
                <span className="text-base capitalize truncate text-[#2f9c11]">
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
        className={`rounded-xl bg-white shadow-master`}
        style={{ width: props.width, height: props.height }}
      >
        <div className="bg-whitesmoke animate-pulse bg-cover h-[150px] w-[90%] relative left-[5%] top-[5%] rounded-[5px]"></div>

        <div
          className="font-semibold text-lg h-[60px] w-[90%] ml-[5%] mt-[20px] 
                text-ellipsis overflow-hidden text-black"
        >
          <div className="mt-1 h-7 w-52 rounded-lg bg-whitesmoke animate-pulse"></div>
        </div>

        <div className="bg-whitesmoke animate-pulse float-left relative top-2 left-[5%] h-5 w-28 rounded-md"></div>
        <div className="bg-whitesmoke animate-pulse float-right relative right-[5%] top-2 h-5 w-20 rounded-md"></div>
      </div>
    </Link>
  );
};

export default Card;
