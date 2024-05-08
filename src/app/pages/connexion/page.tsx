"use client"
import Link from "next/link";
import React, { useState } from "react";
import postCallAPI from "@/app/API/postCallAPI";



const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const API_FOR_LOGIN = 'https://c1bb0d8a5f1d.airneis.net/api/auth/login';

  interface UserData {
    email: string;
    password: string;
  }

  interface ApiResponse {
    success : boolean;
    token : {
      accessToken : string,
      refreshToken : string;
    }
  }

  const handleSubmit = async(event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

  const userData : UserData = {
      email,
      password
    };
    

    const result = await postCallAPI(API_FOR_LOGIN, userData)
    
    if (result.success) {
      console.log('Connexion réussie :', result);
      setErrorMessage('');
    } else {
      console.error('Erreur de connexion', result.message);
      setErrorMessage("Une erreur inconnue est survenue.");
    }
  };

  
 
  return (
    <div className="content-below-navbar min-h-screen">


      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900 tracking-wide">Identifiez-vous</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit} method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Adresse e-mail </label>
              <div className="mt-2">
                <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Mot de passe</label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Mot de passe oublié?</a>
                </div>
              </div>
              <div className="mt-2">
                <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Connexion
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Tu n&apos;es pas encore inscrit?
            <Link href="pages/inscription" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 pl-3">Inscris-toi ici !</Link>
          </p>
          {errorMessage && (
  <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
    {errorMessage}
  </div>
)}
        </div>
      </div>
      






    </div>
  );
}

export default LoginPage;