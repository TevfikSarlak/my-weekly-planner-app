import React from "react";

export default function SaveButton({ onClick }) {
  return (
    <div>
      <button
        className="flex flex-row bg-indigo-800 hover:bg-indigo-500 rounded-lg text-white py-1 px-3 md:px-5"
        onClick={onClick}
      >
        Save <img src="/images/save.png" className="h-6 w-6 ml-1" />
      </button>
    </div>
  );
}
