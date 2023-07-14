import React from "react";
import { Link } from 'react-router-dom';
import UserIcon from "../buttons/UserIcon";

export default function Intro({ isLoggedin, userInitial }) {
  return (
    <div>
      {/* Navigation */}
      <nav className="flex flex-row mx-8 py-4 font-poppins text-slate-700 font-semibold justify-between md:justify-end space-x-6 relative z-10">
        {/* Why Plan Weekly Link */}
        <a
          href="https://medium.com/@tevfiksarlak/the-benefits-of-weekly-planning-unlocking-success-and-productivity-3ded56107186"
          className="px-2 py-1 border-2 border-white hover:border-2 hover:border-slate-700 hover:rounded-md"
        >
          Why Plan Weekly?
        </a>

        {/* Feedback Link */}
        <Link
          to="/feedback"
          className="px-2 py-1 border-2 border-white hover:border-2 hover:border-slate-700 hover:rounded-md"
        >
          Feedback
        </Link>

        {/* User Icon */}
        <UserIcon isLoggedin={isLoggedin} userInitial={userInitial} />
      </nav>

      {/* Intro Section */}
      <div className="flex flex-col md:grid md:grid-cols-2 mb-24">
        {/* Image */}
        <div className="flex flex-col justify-center mx-auto md:grid h-72 w-72 md:w-full mt-24">
          <img src="/images/intro.jpg" alt="Intro" />
        </div>

        {/* Text Content */}
        <div className="font-poppins sm:mx-auto md:mt-48 leading-loose space-y-12 ml-2">
          {/* "My" Text */}
          <span className="md:text-8xl text-6xl text-slate-700 font-poppins font-extrabold">
            My{" "}
          </span>

          {/* "Weekly" Text */}
          <span className="font-poppins text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-blue-600">
            Weekly
          </span>
          <br></br>

          {/* "Plan" Text */}
          <div className="font-poppins bg-amber-400 text-indigo-700 text-4xl md:text-6xl p-4 mr-24 md:mr-60">
            Plan
            <span className="text-indigo-200 line-through">ner</span>
          </div>

          {/* App Description */}
          <h1 className="text-slate-700 mt-8 mb-2 md:mb-4 text-lg md:text-2xl font-poppins text-left">
            Organize your week with myweek app
          </h1>
          <ul className="list-disc ml-4 text-slate-600 font-poppins mb-4">
            <li>You can add and delete your tasks</li>
            <li>You can check completed tasks</li>
            <li>Easy to use</li>
            <li>You can take your notes for important events of week</li>
          </ul>

          {/* Get Started Button */}
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
