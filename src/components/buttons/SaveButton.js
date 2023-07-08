import React from "react";

export default function SaveButton({ onClick }) {
  return (
    <div>
      <button
        className="flex flex-row bg-indigo-800 hover:bg-indigo-500 rounded-full md:rounded-lg text-white py-1 px-2 md:px-5"
        onClick={onClick}
      >
        <span className="hidden md:flex">Save</span> <img src="/images/save.png" className="h-6 w-6 md:ml-1" />
      </button>
    </div>
  );
}
