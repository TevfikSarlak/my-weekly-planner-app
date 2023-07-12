import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import {  signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider  } from 'firebase/auth';
import { auth, } from '../../firebase';
import { RiGoogleFill } from 'react-icons/ri';

export default function Login() {

    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            navigate("/userweek")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(errorMessage){
                setErrorMessage("Password or Email is wrong!")
                setPassword('')
                setEmail('')
            }
            console.log(errorCode, errorMessage)
        });
       
    }

    const handleLoginWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
          .then((result) => {
            // Handle successful login with Google
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log(user);
          })
          .catch((error) => {
            // Handle errors
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(errorCode, errorMessage);
          });
      };

    const handleCloseModal = () => {
        navigate("/");
      };
    
    
    return (
        <div>
             <section className="fixed font-poppins top-0 left-0 w-screen h-screen
                               bg-gray-200 bg-opacity-75 flex justify-center items-center z-50"
             >
                <div className="flex flex-col w-5/6 md:w-1/3 items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                   
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                            <div className="flex items-end justify-end">
                                <button
                                    className="text-gray-500 hover:text-gray-800 transition-all duration-200"
                                    onClick={handleCloseModal}
                                >
                                    <MdClose size={24} />
                                </button>
                            </div>

                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Log into your Account
                            </h1>
                            
                            <form className="space-y-4 md:space-y-6" 
                                  action="#">
                                <div>
                                    <label for="email"
                                           className="block mb-2 text-sm font-semibold text-indigo-800"
                                           >Your email
                                    </label>

                                    <input type="email" 
                                           name="email"
                                           id="email" 
                                           value={email}
                                           onChange={(e)=>setEmail(e.target.value)}
                                           
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                                           placeholder="name@company.com" 
                                           required
                                    />
                                </div>

                                <div>
                                    <label for="password" 
                                           className="block mb-2 text-sm font-semibold text-indigo-800"
                                           >Password
                                    </label>

                                    <input type="password" 
                                           name="password"
                                           id="password" 
                                           value={password}
                                           onChange={(e) => setPassword(e.target.value)}
                                           placeholder="••••••••" 
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                                           required=""
                                    />

                                   {errorMessage && (
                                        <p className="text-sm text-red-700">{errorMessage}</p>
                                    )}



                                </div>

                                <button type="submit"
                                        onClick={onLogin}
                                        className="w-full text-white bg-indigo-800 hover:bg-indigo-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        >Log In
                                </button>

                                <div className='text-slate-400 flex flex-col justify-center items-center text-sm' >OR</div>
                                
                                <button
                                    className="flex items-center justify-center w-full text-indigo-800 bg-sky-100 hover:bg-sky-200 hover:underline focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    onClick={handleLoginWithGoogle}
                                >
                                    <RiGoogleFill size={20} className="mr-2" />
                                    Login with Google
                                </button>
                                
                                <p className="text-sm font-light text-gray-500">
                                    Don't you have an account? 
                                    <Link to="/signup" className="font-medium text-indigo-600 hover:underline">
                                        Sign up here
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