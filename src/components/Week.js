import React from "react";

export default function Week() {

    const today = new Date();
    const monthYear = today.toLocaleString('en-US', { month: 'long', year: 'numeric' });

    return (
        <div>
            <div className="flex flex-row  mt-4 font-poppins items-center justify-around
                        border-b-4 pb-4 border-slate-500">
                <div className="text-2xl md:text-4xl text-slate-800 font-bold ">
                    {monthYear}
                </div>
                <div>
                    <button className="bg-indigo-800 hover:bg-indigo-500 rounded-lg
                                     text-white py-1 px-5 ">
                        Save
                    </button>
                </div>

            </div>
            
        </div>
    )
}