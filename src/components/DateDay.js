import React from "react";

export default function DateDay({date, day}) {
    return(
        <div className="flex flex-row justify-between text-slate-500  border-b-2
        border-slate-500 font-semibold">
            <div>
                {date}
            </div>
            <div className="text-amber-600">
                {day}
            </div>    
        </div>
    )
}