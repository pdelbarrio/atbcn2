import React from "react";
import { AuthForm } from "./components/AuthForm";

export default async function page() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-96">
        <AuthForm />
      </div>
    </div>
  );
}
