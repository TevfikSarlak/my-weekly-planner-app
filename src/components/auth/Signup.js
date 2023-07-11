import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigate('/login');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    } else {
      setPasswordError('Please provide the same password to confirm');
    }
  };

  const handleCloseModal = () => {
    navigate('/');
  };

  return (
    <div>
      <div className="fixed font-poppins bg-gray-200 top-0 left-0 w-screen h-screen bg-opacity-75 flex justify-center items-center z-50">
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
                Create an Account
              </h1>

              <form className="space-y-4 md:space-y-6 ">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-medium font-semibold text-indigo-800"
                  >
                    Your email
                  </label>

                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com"
                    required
                  />

                </div>

                <div>

                  <label
                    htmlFor="password"
                    className="block mb-2 text-medium font-semibold text-indigo-800"
                  >
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />

                </div>

                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-medium font-semibold text-indigo-800"
                  >
                    Confirm password
                  </label>

                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />

                  {passwordError && (
                    <p className="text-sm text-red-700">{passwordError}</p>
                  )}

                </div>

                <button
                  type="submit"
                  onClick={onSubmit}
                  className="w-full text-white bg-indigo-800 hover:bg-indigo-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Create an account
                </button>

                <p className="text-sm font-light text-gray-500">
                  Already have an account?{' '}
                  <Link
                    className="font-medium text-indigo-600 hover:underline"
                    to="/login"
                  >
                    Log in here
                  </Link>
                </p>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
