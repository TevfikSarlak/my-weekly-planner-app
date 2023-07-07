import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
    const navigate = useNavigate();

    const handleCloseModal = () => {
        navigate("/")
      }

    return (
        <div>
             <section className="fixed font-poppins top-0 left-0 w-screen h-screen
                               bg-gray-200 bg-opacity-75 flex justify-center items-center z-50"
                  onClick={handleCloseModal}    
    >
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                   
                    <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Log into your Account
                            </h1>
                            <form class="space-y-4 md:space-y-6" 
                                  action="#">
                                <div>
                                    <label for="email"
                                           class="block mb-2 text-sm font-semibold text-indigo-800"
                                           >Your email
                                    </label>

                                    <input type="email" 
                                           name="email"
                                           id="email" 
                                           class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                                           placeholder="name@company.com" 
                                           required=""
                                    />
                                </div>

                                <div>
                                    <label for="password" 
                                           class="block mb-2 text-sm font-semibold text-indigo-800"
                                           >Password
                                    </label>

                                    <input type="password" 
                                           name="password"
                                           id="password" 
                                           placeholder="••••••••" 
                                           class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                                           required=""
                                    />

                                </div>

                                <button type="submit"
                                        class="w-full text-white bg-indigo-800 hover:bg-indigo-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        >Log In
                                </button>

                                <p class="text-sm font-light text-gray-500"
                                   >Don't you have an account? 
                                      <Link to="/signup" 
                                         class="font-medium text-indigo-600 hover:underline"
                                         >Signup here
                                      </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
      
    )
}