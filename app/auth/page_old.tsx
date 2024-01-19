"use client";

import { AuthFormErrors } from "@/lib/types";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);

  const handleRecoverPassword = () => {
    console.log("recover");
  };

  const handleSignInWithGoogle = () => {
    console.log("google signin");
  };

  const handleSignIn = () => {
    console.log("darse de alta");
  };

  const handleSignUp = () => {
    console.log("registrarse");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-sm">
        <div className="px-8 pb-8 mb-4">
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            {(errors as AuthFormErrors).email && (
              <p className="text-red-500 text-xs italic font-bold">
                {(errors as AuthFormErrors).email}
              </p>
            )}
          </div>
          <div className="mb-6">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            {(errors as AuthFormErrors).password && (
              <p className="text-red-500 text-xs font-bold italic">
                {(errors as AuthFormErrors).password}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <button
              type="button"
              className="h-[40px] bg-card dark:bg-glow text-black font-bold p-2 px-4 rounded mb-2"
              onClick={() => handleSignIn()}
            >
              Inicia sessió
            </button>
            <button
              className="h-[40px] bg-secondary dark:bg-black dark:border dark:border-glow text-background dark:text-glow font-bold p-2 px-4 rounded mb-2"
              type="button"
              onClick={() => handleSignUp()}
            >
              Registra&apos;t
            </button>

            <button
              onClick={handleSignInWithGoogle}
              className="flex items-center justify-center px-4 py-2 border gap-2 bg-white text-slate-700  border-slate-200 dark:border-slate-700 rounded-lg  dark:text-black hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
            >
              <img
                className="w-6 h-6"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt="google logo"
              />
              <span>Inicia sessió amb Google</span>
            </button>
            <button
              className="font-bold py-2"
              type="button"
              onClick={handleRecoverPassword}
            >
              Recuperar password
            </button>
          </div>
          {/* <ToastContainer /> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
