"use client";

import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { AuthFormErrors } from "@/lib/types";
import { cn, userSchema } from "@/lib/utils";
import React, { useState, useTransition } from "react";
import { signUpWithEmailAndPassword } from "../actions";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);

  const handleSignUp = async () => {
    try {
      await userSchema.validate({ email, password }, { abortEarly: false });
      startTransition(async () => {
        const data = { email, password };

        const result = signUpWithEmailAndPassword(data);
        const { error } = JSON.parse(await result);

        if (error?.message) {
          toast({
            style: {
              backgroundColor: "#fc0606",
              color: "#000000",
            },
            description: <code className="text-black">{error.message}</code>,
          });
        } else {
          toast({
            style: {
              backgroundColor: "#6ae95a",
              color: "#000000",
            },
            description: <code className="text-black">Registre correcte</code>,
          });
          // router.push("/add-event");
          router.refresh();
        }
      });
    } catch (error: any) {
      const yupErrors: AuthFormErrors = {};
      error.inner.forEach((validationError: any) => {
        yupErrors[validationError.path] = validationError.message;
      });
      setErrors(yupErrors);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="px-8 pb-8">
          <div className="mb-4">
            <Input
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
            <Input
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
              className="h-[40px] w-full items-center justify-center flex gap-2 bg-card dark:bg-black dark:border dark:border-glow text-background dark:text-glow font-bold p-2 px-4 rounded mb-2"
              type="button"
              onClick={() => handleSignUp()}
            >
              Registra&apos;t
              <AiOutlineLoading3Quarters
                className={cn("animate-spin", { hidden: !isPending })}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
