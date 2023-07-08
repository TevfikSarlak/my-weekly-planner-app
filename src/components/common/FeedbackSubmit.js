import React from "react";
import { Link } from "react-router-dom";
import Intro from "./Intro";

export default function FeedbackSubmit () {
    return (
        <div className="fixed top-0 font-poppins left-0 w-screen h-screen bg-gray-200 bg-opacity-75 flex justify-center items-center z-50">
        <div className="bg-white p-8  rounded-lg shadow-md sm:mx-12">
        <h2 className="text-2xl font-bold mb-4">Thank you for your feedback!</h2>
            <p className="text-lg">We appreciate your input and will use it to improve our app.</p>
            <Link to="/" >
                <button
                   className="bg-indigo-600 hover:bg-indigo-400 text-white py-2 px-4 rounded-lg mt-4"
                   >Close
                </button>
            </Link>
          </div>
        </div>
    )
}