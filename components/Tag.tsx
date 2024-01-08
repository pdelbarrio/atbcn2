import React from "react";

interface Prop {
  tag: string;
}

export default function Tag({ tag }: Prop) {
  return (
    <span className="px-2 py-1 bg-btvgray  dark:bg-black dark:border dark:border-glow rounded-full text-xs font-semibold text-white dark:text-glow mr-2">
      {tag}
    </span>
  );
}
