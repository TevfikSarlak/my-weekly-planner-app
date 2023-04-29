import React from "react";

export default function ClearButton({ onClick }) {
  return (
    <div>
      <button
        className="flex flex-row bg-amber-700 hover:bg-amber-400 rounded-full md:rounded-lg text-white py-2 md:py-1 px-2 md:px-3"
        onClick={onClick}
      >
        <span className="hidden md:flex">Clear All</span> <img src="/images/bin.png" alt="bin" className="h-6 w-6 md:h-5 md:w-5 md:ml-1" />
      </button>
    </div>
  );
}