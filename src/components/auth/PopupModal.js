import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PopupModal() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();
  
  const handleCloseModal = () => {
    navigate("/week", { replace: true });
    setIsModalOpen(false);
  };

  return (
    <div>
      {isModalOpen && (
        <div
          className="fixed font-poppins top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-200 bg-opacity-50"
        >
          <div
            tabIndex="-1"
            className="relative  max-w-md max-h-full w-5/6 md:w-1/3"
          >
            <div className="relative bg-white rounded-lg shadow ">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center mb-4"
                data-modal-hide="popup-modal"
                onClick={handleCloseModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>

              <div className="p-6 text-center mt-8 space-y-2">

                <h3 className="mt-8 text-indigo-800 font-bold text-xl">
                  By using this option,
                </h3>

                <p className="text-gray-500 ">
                  If you are not logged in, please
                  <Link
                    to="/login"
                    className="text-indigo-500 hover:underline font-medium inline-flex items-center px-5 py-2.5 text-center mr-2"
                  >
                    Log in
                  </Link>
                </p>

                <p className="text-gray-500 ">
                  If you are not signed in, please
                  <Link
                    to="/signup"
                    className="text-indigo-500 hover:underline font-medium inline-flex items-center px-5 py-2.5 text-center mr-2"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
