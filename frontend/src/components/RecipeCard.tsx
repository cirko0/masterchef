import { FunctionComponent } from "react";

const RecipeCard: FunctionComponent = () => {
  return (
    <div className="rounded-xl bg-white shadow-master w-full text-left p-6 cursor-pointer flex gap-6 flex-col">
      <img
        className="rounded-xl w-full h-[150px] object-cover"
        alt=""
        src="/thumb.png"
      />

      <p className="text-[20px] font-medium text-black">
        Creamy Strawbery Milkshake
      </p>

      <div className="flex justify-between font-medium">
        <span className="text-darkorange text-[16px]">John Doe</span>
        <span className="text-gold-100 text-[16px]">Vegetarian</span>
      </div>
    </div>
  );
};

export default RecipeCard;
