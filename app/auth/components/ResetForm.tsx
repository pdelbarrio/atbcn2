import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/context/auth.context";
import { AuthFormErrors } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState, useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function ResetForm() {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState<boolean>(false);
  const { supabaseclient } = useAuthContext();

  const handleEmailChange = (e: any) => setEmail(e.target.value);

  const sendResetPassword = async () => {
    try {
      startTransition(async () => {
        const { data, error } = await supabaseclient.auth.resetPasswordForEmail(
          email,
          // { redirectTo: `${window.location.href}update-user` }
          { redirectTo: "https://www.atbcn.info/update-user" }
        );
        setSuccess(true);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid gap-4 w-full max-w-sm">
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

        {success && (
          <div className="bg-green-100 text-green-600 px-2 rounded">
            Comprova el teu correu electrònic per restablir la contrasenya.
          </div>
        )}
        <div className="flex flex-col mt-2">
          <button
            className="h-[40px] w-full items-center justify-center flex gap-2 bg-card dark:bg-black dark:border dark:border-glow text-background dark:text-glow font-bold p-2 px-4 rounded mb-2"
            type="button"
            onClick={sendResetPassword}
          >
            Reseteja la contrasenya
            <AiOutlineLoading3Quarters
              className={cn("animate-spin", { hidden: !isPending })}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
