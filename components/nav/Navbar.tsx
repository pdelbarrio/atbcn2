import Link from "next/link";
import React from "react";
import { ModeToggle } from "../ToggleTheme";
import { DialogInfo } from "../DialogInfo";

export default function Navbar() {
  return (
    <nav className="max-w-xl mx-auto p-2 md:max-w-1/2">
      <div className="h-[120px]">
        <div className="flex justify-between items-center mt-2">
          <div className="flex">
            <Link href="/" className="font-bold dark:text-glow text-2xl">
              @bcn
            </Link>
          </div>
          <div>
            <DialogInfo />
          </div>
          <div>
            <ModeToggle />
          </div>
          <div className="flex flex-col">
            <Link
              href="/add-event"
              className="bg-card text-background font-bold px-4 py-1 rounded-lg text-base"
            >
              add event
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
