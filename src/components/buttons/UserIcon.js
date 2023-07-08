import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserIcon () {

    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    }

    const handleSignupClick = () => {
        navigate("/signup")
    }

    const handleLoginClick = () => {
        navigate("/login")
    }
    return (
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
    )
}

