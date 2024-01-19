"use client";

import { AuthFormErrors } from "@/lib/types";
import React, { useState } from "react";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);

  const handleSignIn = () => {};

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="px-8 pb-8">
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
              className="h-[40px] bg-card dark:bg-glow text-text font-bold p-2 px-4 rounded mb-2"
              onClick={() => handleSignIn()}
            >
              Inicia sessió
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
