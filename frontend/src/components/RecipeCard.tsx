import { FunctionComponent } from "react";

const RecipeCard: FunctionComponent = () => {
  return (
    <div className="relative rounded-xl bg-white shadow-[5px_5px_20px_2px_rgba(0,_0,_0,_0.25)] w-[37.6rem] h-[33.8rem] text-left text-[2rem] text-gold-100 font-inter">
      <div className="absolute top-[29.1rem] left-[25.05rem] font-medium">
        Vegetarian
      </div>
      <div className="absolute top-[29.1rem] left-[2.05rem] font-medium text-darkorange">
        John Doe
      </div>
      <img
        className="absolute top-[1.7rem] left-[2.1rem] rounded-xl w-[33.4rem] h-[18.2rem] object-cover"
        alt=""
        src="/rectangle-5@2x.png"
      />
      <div className="absolute top-[20.9rem] left-[2.25rem] text-[2.4rem] font-medium text-black inline-block w-[33.4rem]">
        <p className="m-0">Creamy Strawbery</p>
        <p className="m-0">Milkshake</p>
      </div>
    </div>
  );
};

export default RecipeCard;
