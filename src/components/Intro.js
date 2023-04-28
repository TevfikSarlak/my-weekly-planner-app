import React from "react";

export default function Intro(props) {
    return(
        <div className="">
            <nav className="flex flex-row mx-8 py-4 font-poppins text-slate-700 font-semibold justify-between md:justify-end space-x-6 relative z-10">
                <a href="#" className="px-2 py-1 border-2 border-white hover:border-2 hover:border-slate-700 hover:rounded-md">Why Plan Weekly?</a>
                <a href="#" className="px-2 py-1 border-2 border-white hover:border-2 hover:border-slate-700 hover:rounded-md">Feedback</a>
            </nav>
            <div className="flex flex-col md:grid md:grid-cols-2 mb-24 ">
                <div className="flex flex-col justify-center mx-auto md:grid h-72 w-72 md:w-full mt-24">
                    <img src="/images/intro.jpg" alt="Intro"/>
                </div>
                <div className="font-poppins md:mt-48 leading-loose space-y-12 ml-2">
                    <span className="md:text-8xl text-6xl text-slate-700 font-poppins font-extrabold">My </span>
                    <span className="font-poppins text-4xl md:text-6xl font-bold text-transparent bg-clip-text
                    bg-gradient-to-r from-amber-300 to-blue-600"
                    >Weekly</span><br></br>
                    <div className="font-poppins bg-amber-400 text-indigo-700 text-4xl md:text-6xl p-4 mr-24 md:mr-60"> Plan
                    <span className="text-indigo-200 line-through">ner</span></div>
                    <h1 className="text-slate-700 mt-8 mb-2 md:mb-4 text-lg md:text-2xl font-poppins text-left">Organize your week with myweek app</h1>
                    <ul className="list-disc ml-4 text-slate-600 font-poppins mb-4">
                        <li >You can add, check ,and delete your tasks</li>
                        <li>You can drag and drop your tasks</li>
                        <li>Easy to use</li>
                        <li>You can prioritize your tasks</li>
                    </ul>
                    <button className="font-poppins mx-auto ml-24 md:ml-36 py-3 px-5 bg-indigo-800
                                    hover:bg-indigo-500 rounded-2xl text-white shadow-6xl mb-24"
                            onClick={()=>props.handleStart()}>
                        Get Started
                    </button>
                </div>


            </div>
        </div>
    )
}