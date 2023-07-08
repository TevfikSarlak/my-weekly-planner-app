import React from "react";

// Component for Clear Button with image icon and text
export default function ClearButton({ onClick }) {
  return (
    <div>
      <button
        className="flex flex-row bg-amber-500 hover:bg-amber-300 rounded-full md:rounded-lg text-white py-1  px-1 md:px-3"
        onClick={onClick}
      >
        <span className="hidden md:flex">Clear All</span> <img src="/images/bin.png" alt="bin" className="h-6 w-6 md:h-5 md:w-5 md:ml-1" />
      </button>
    </div>
  );
}