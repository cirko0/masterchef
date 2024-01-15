import { FunctionComponent } from "react";

const RecipeCard: FunctionComponent = () => {
  return (
    <div className="rounded-xl bg-white shadow-[5px_5px_20px_2px_rgba(0,_0,_0,_0.25)] w-full text-left p-6 cursor-pointer flex gap-6 flex-col">
      <img
        className="rounded-xl w-full h-[15rem] object-cover"
        alt=""
        src="/thumb.png"
      />

      <p className="text-[2rem] font-medium text-black">
        Creamy Strawbery Milkshake
      </p>

      <div className="flex justify-between font-medium">
        <span className="text-darkorange text-[1.6rem]">John Doe</span>
        <span className="text-gold-100 text-[1.6rem]">Vegetarian</span>
      </div>
    </div>
  );
};

export default RecipeCard;
