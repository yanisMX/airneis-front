"use client"
import React, { useState } from "react";
import Link from "next/link";
import postCallAPI from "@/app/API/postCallAPI";
import { UserDataSignUp } from "@/app/interfaces/interfaces";

const SignupPage = () => {

    
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const API_FOR_REGISTER = 'https://c1bb0d8a5f1d.airneis.net/api/auth/register';
  
  const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const userData : UserDataSignUp = {
      name,
      email,
      password
    }; 

    const result = await postCallAPI(API_FOR_REGISTER, userData)

    if (result.success) {
      console.log('Inscription réussie :', result);
      setErrorMessage('');
    } else {
      console.error('Erreur d\'inscription', result.message);
      setErrorMessage("Une erreur inconnue est survenue.");
    }
  };

  return (
    <div className="content-below-navbar min-h-screen">


      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-4xl font-bold leading-9  text-gray-900 tracking-wide">Inscris-toi</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <div className="flex justify-center mx-auto">
          </div>
          <div className="relative flex items-center mt-8">
            <span className="absolute">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-dark-300 dark:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>

            <input type="text" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:text-gray-800 dark:border-gray-600  dark:focus:border-blue-500 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Nom complet" value={name} onChange={(e) => setName(e.target.value)}/>
          </div>


          <div className="relative flex items-center mt-6">
            <span className="absolute">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>

            <input type="email" className="block w-full py-3 text-gray-800 bg-white border rounded-lg px-11   dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Adresse mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>

          <div className="relative flex items-center mt-4 ">
            <span className="absolute">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>

            <input type={showPassword ? "text" : "password"} className="block w-full px-10 py-3 text-gray-800 bg-white border rounded-lg dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ?  (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ): (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </span>
          </div>

          <div className="mt-6">
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Je m&apos;inscris
              </button>

              <p className="mt-10 text-center text-sm text-gray-500">
            Tu n&apos;es pas encore inscrit?
            <Link href="/connexion" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 pl-3">Connecte-toi ici !</Link>
          </p>
            
          {errorMessage && (
  <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
    {errorMessage}
  </div>
)}
          </div>
        </form>
        </div>
        </div>
      </div>
  );
};

export default SignupPage;
