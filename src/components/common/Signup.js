import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
    const navigate = useNavigate();

    const handleCloseModal = () => {
        navigate('/')
      }

    return (
        <div>
             <div className="fixed font-poppins bg-gray-200 top-0 left-0 w-screen h-screen bg-opacity-75 flex justify-center items-center z-50"
                      onClick={handleCloseModal}    
             >
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                   
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Create an Account
                            </h1>
                            <form className="space-y-4 md:space-y-6" 
                                  action="#">
                                <div>
                                    <label htmlFor="email"
                                           className="block mb-2 text-medium font-semibold text-indigo-800"
                                           >Your email
                                    </label>

                                    <input type="email" 
                                           name="email"
                                           id="email" 
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                                           placeholder="name@company.com" 
                                           required=""
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" 
                                           className="block mb-2 text-medium font-semibold text-indigo-800"
                                           >Password
                                    </label>

                                    <input type="password" 
                                           name="password"
                                           id="password" 
                                           placeholder="••••••••" 
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                                           required=""
                                    />

                                </div>

                                <div>
                                    <label htmlFor="confirm-password"
                                           className="block mb-2 text-medium font-semibold text-indigo-800"
                                           >Confirm password
                                    </label>

                                    <input type="confirm-password" 
                                           name="confirm-password" 
                                           id="confirm-password" 
                                           placeholder="••••••••" 
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                                           required=""
                                    />

                                </div>

                                <button type="submit"
                                        className="w-full text-white bg-indigo-800 hover:bg-indigo-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        >Create an account
                                </button>

                                <p className="text-sm font-light text-gray-500"
                                   >Already have an account? 
                                      <Link className="font-medium text-indigo-600 hover:underline"
                                            to="/login"
                                           >Login here
                                      </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    )
}