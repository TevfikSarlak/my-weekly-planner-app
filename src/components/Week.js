import React from "react";
import { Day }from "./Day";

export default function Week() {
  const today = new Date();
  const monthYear = today.toLocaleString("en-EN", { month: "long", year: "numeric" });
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat","Sun"];
  const days = [];

  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + i);
    days.push(date);
  }

  return (
    <div>
      <div className="flex flex-row  my-4 font-poppins items-center justify-between border-b-4 pb-4 border-slate-500 px-6">
        <div className="text-2xl md:text-4xl text-slate-800 font-bold">{monthYear}</div>
        <div>
          <button className="flex flex-row  bg-indigo-800 hover:bg-indigo-500 rounded-lg text-white py-1 px-3 md:px-5">
            Save <img src="/images/save.png" className="h-6 w-6 ml-1" />
          </button>
        </div>
      </div>
      <div className="flex flex-col md:grid md:grid-cols-5 font-poppins mx-4 space-x-4">
        {days.map((day) => (
          <Day key={day.getTime()} day={daysOfWeek[day.getDay()]} date={day.toLocaleString("fr-FR", { day: "2-digit", month: "2-digit" })} />
        ))}
      </div>
    </div>
  );
}
