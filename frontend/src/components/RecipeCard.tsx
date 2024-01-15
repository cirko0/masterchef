import { FunctionComponent } from "react";

const RecipeCard: FunctionComponent = () => {
  return (
    <div className="rounded-xl bg-white shadow-[5px_5px_20px_2px_rgba(0,_0,_0,_0.25)] w-full text-left text-[2rem] font-inter p-10 cursor-pointer flex gap-5 flex-col">
      <img
        className="rounded-xl w-full h-[20rem] object-cover"
        alt=""
        src="/thumb.png"
      />

      <p className="text-[2.4rem] font-medium text-black">
        Creamy Strawbery Milkshake
      </p>

      <div className="flex justify-between font-medium">
        <span className="text-darkorange">John Doe</span>
        <span className="text-gold-100">Vegetarian</span>
      </div>
    </div>
  );
};

export default RecipeCard;
