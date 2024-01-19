import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import OAuthForm from "./OAuthForm";
import SignInForm from "./SignInForm";
import RegisterForm from "./RegisterForm";

export function AuthForm() {
  return (
    <div className="">
      <Tabs defaultValue="signin" className="max-w-sm">
        <TabsList className="grid grid-cols-2 mb-10 w-5/6 mx-auto">
          <TabsTrigger value="signin">Inicia sessió</TabsTrigger>
          <TabsTrigger value="register">Registra&apos;t</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <SignInForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
        <OAuthForm />
      </Tabs>
    </div>
  );
}
