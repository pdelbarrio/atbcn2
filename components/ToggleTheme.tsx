"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <>
      <Button variant="outline" size="icon">
        <MdDarkMode
          className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          onClick={() => setTheme("dark")}
        />
        <MdLightMode
          className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          onClick={() => setTheme("light")}
        />
      </Button>
    </>
  );
}
