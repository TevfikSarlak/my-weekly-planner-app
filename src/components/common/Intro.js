import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Signup from "./Signup";
import { BrowserRouter as Router } from 'react-router-dom';
import FeedbackForm from "./FeedbackForm";
import Week from "../calendar/Week";

export default function Intro(props) {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    }

    const handleSignupClick = () => {
        navigate('/signup')
    }

    const handleLoginClick = () => {
        navigate('/login')
    }
  
    
  return (
    <div className="">
      <nav className="flex flex-row mx-8 py-4 font-poppins text-slate-700 font-semibold justify-between md:justify-end space-x-6 relative z-10">
        <a
          href="https://medium.com/@tevfiksarlak/the-benefits-of-weekly-planning-unlocking-success-and-productivity-3ded56107186"
          className="px-2 py-1 border-2 border-white hover:border-2 hover:border-slate-700 hover:rounded-md"
        >
          Why Plan Weekly?
        </a>

        <Link
          to="/feedback"
          className="px-2 py-1 border-2 border-white hover:border-2 hover:border-slate-700 hover:rounded-md"
        >
          Feedback
        </Link>

        <div className="relative">
          <div
            className="relative w-8 h-8 overflow-hidden bg-amber-300 rounded-full hover:ring-2 hover:ring-slate-700"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <svg
              className="absolute w-10 h-10 text-slate-700 -left-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>

          
            <div className="absolute right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
                 onMouseEnter={handleMouseEnter}
                 onMouseLeave={handleMouseLeave}
            >
            {isHovered && (
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <Link
                    to="/login"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={handleLoginClick}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={handleSignupClick}
                  >
                    Signup
                  </Link>
                </li>
              </ul>)}
            </div>
          
        </div>
      </nav>

      <div className="flex flex-col md:grid md:grid-cols-2 mb-24 ">
        <div className="flex flex-col justify-center mx-auto md:grid h-72 w-72 md:w-full mt-24">
          <img src="/images/intro.jpg" alt="Intro" />
        </div>
        <div className="font-poppins sm:mx-auto md:mt-48 leading-loose space-y-12 ml-2">
          <span className="md:text-8xl text-6xl text-slate-700 font-poppins font-extrabold">
            My{" "}
          </span>
          <span
            className="font-poppins text-4xl md:text-6xl font-bold text-transparent bg-clip-text
                    bg-gradient-to-r from-amber-300 to-blue-600"
          >
            Weekly
          </span>
          <br></br>
          <div className="font-poppins bg-amber-400 text-indigo-700 text-4xl md:text-6xl p-4 mr-24 md:mr-60">
            Plan
            <span className="text-indigo-200 line-through">ner</span>
          </div>
          <h1 className="text-slate-700 mt-8 mb-2 md:mb-4 text-lg md:text-2xl font-poppins text-left">
            Organize your week with myweek app
          </h1>
          <ul className="list-disc ml-4 text-slate-600 font-poppins mb-4">
            <li>You can add and delete your tasks</li>
            <li>You can check completed tasks</li>
            <li>Easy to use</li>
            <li>You can take your notes for important events of week</li>
          </ul>
          <Link to="/week">
            <button className="font-poppins mx-auto justify-center md:ml-36 py-3 px-5 bg-indigo-800 hover:bg-indigo-500 rounded-2xl text-white shadow-6xl mb-24 mt-12">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
