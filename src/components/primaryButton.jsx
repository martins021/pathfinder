import React from "react";

const PrimaryButton = ({text}) => {
  return (
    <button type="button" className="p-4 border border-black rounded-lg hover:bg-violet-700 hover:text-white duration-300">
        {text}
    </button>
  );
};

export default PrimaryButton;