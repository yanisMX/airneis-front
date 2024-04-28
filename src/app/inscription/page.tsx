"use client"
import React, { useState } from "react";

const SignupFormPage = () => {

    
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const handleSubmit = async (event : any) => {
    event.preventDefault();
    // Construction de la requête à l'API
    const userData = {
      name,
      email,
      password
    };
    try {
        const response = await fetch('https://c1bb0d8a5f1d.airneis.net/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
        const data = await response.json();
  
        if (response.ok) {
          console.log('Inscription réussie :', data);
          // Traitement après inscription réussie, comme redirection ou affichage d'un message
        } else {
          console.error('Erreur d\'inscription', data.message);
        }
      } catch (error) {
        console.error('Erreur lors de la connexion au serveur', error);
      }
    };



  return (
    <section className="bg-white ">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <div className="flex justify-center mx-auto">
          </div>

          <div className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900 tracking-wide">
           Inscris-toi
          </div>

          <div className="relative flex items-center mt-8">
            <span className="absolute">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-dark-300 dark:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>

            <input type="text" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:text-gray-800 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-500 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)}/>
          </div>

          <label htmlFor="dropzone-file" className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 ">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>

            <h2 className="mx-3 text-gray-400">Profile Photo</h2>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>

          <div className="relative flex items-center mt-6">
            <span className="absolute">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>

            <input type="email" className="block w-full py-3 text-gray-800 bg-white border rounded-lg px-11   dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>

          <div className="relative flex items-center mt-4 ">
            <span className="absolute">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>

            <input type="password" className="block w-full px-10 py-3 text-gray-800 bg-white border rounded-lg dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="mt-6">
            <button type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
             Je m&apos;inscris
            </button>

            <div className="mt-6 text-center">
              <a href="/connexion" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Tu as déjà un compte ? Connecte-toi !
              </a>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignupFormPage;
