import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="max-w-xl mx-auto p-2 md:max-w-1/2 flex justify-between">
      <Link className="text-xs" target="_blank" href="/condicions">
        Condicions del Servei
      </Link>
      <Link className="text-xs" target="_blank" href="/privacitat">
        Política de Privacitat
      </Link>
    </footer>
  );
};
