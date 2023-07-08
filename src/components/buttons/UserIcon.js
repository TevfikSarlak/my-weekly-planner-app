import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function UserIcon({ isLoggedin }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [userInitial, setUserInitial] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userEmail = user.email;
      const initial = userEmail ? userEmail[0].toUpperCase() : "";
      setUserInitial(initial);
    }
  }, []);

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="relative w-8 h-8 overflow-hidden bg-amber-500 rounded-full hover:ring-2 hover:ring-slate-700">
        {isLoggedin ? (
          <h1 className="text-3xl text-slate-700 flex justify-center items-center font-bold">{userInitial}</h1>
        ) : (
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
        )}
      </div>

      {isHovered && (
        <div className="absolute right-0 bg-gray-100 divide-y divide-gray-200 rounded-lg shadow w-44">
          {isLoggedin ? (
            <ul className="py-2 text-sm text-gray-700">
              <li>
                <Link
                  to="/"
                  className="block px-4 py-2 hover:bg-indigo-200"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="py-2 text-sm text-gray-700">
              <li>
                <Link
                  to="/login"
                  className="block px-4 py-2 hover:bg-indigo-200"
                  onClick={handleLoginClick}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="block px-4 py-2 hover:bg-indigo-200"
                  onClick={handleSignupClick}
                >
                  Signup
                </Link>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
