"use client";

import { EventType } from "@/lib/types";
import { cn, formattedDate } from "@/lib/utils";
import { useState } from "react";
import { BsCopy } from "react-icons/bs";
import { IoCheckmarkOutline } from "react-icons/io5";

export default function CopyButton({ event }: { event: EventType }) {
  const [onCopy, setCopy] = useState(false);
  const [onDone, setDone] = useState(false);

  const formattedDateStr = formattedDate(
    event.date,
    "eee, dd/MM/yyyy HH:mm'h'"
  );

  const handleCopy = async () => {
    let Eventtext = `
    Nom event: ${event.name}
    Descripció: ${event.description}
    Preu: ${event.price}
    Ubicació: ${event.location}
    Link: ${event.link}
    Quan: ${formattedDateStr}
    Tags: ${event.tags}
    Troba més esdeveniments a https://atbcn.info
  `;
    try {
      await navigator.clipboard.writeText(Eventtext!);
      setCopy(true);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="flex">
      <div
        // className="hover:scale-105 relative hover:bg-zinc-700 p-2 rounded-md cursor-pointer"
        className="hover:scale-105 relative bg-slate-500 p-2 rounded-md cursor-pointer"
        onClick={handleCopy}
      >
        <IoCheckmarkOutline
          className={cn(
            "cursor-pointer transition-all w-5 h-5 text-green-500",
            onDone ? "scale-100" : "scale-0"
          )}
          onTransitionEnd={() => {
            setTimeout(() => {
              setCopy(false);
              setDone(false);
            }, 500);
          }}
        />

        <div className="h-full w-full absolute top-0 left-0 flex items-center justify-center">
          <BsCopy
            className={cn("transition-all", onCopy ? "scale-0" : "scale-100")}
            onTransitionEnd={() => {
              if (onCopy) {
                setDone(true);
              }
            }}
          />
        </div>
      </div>
      {/* <p className="text-xs ml-auto"> {onDone ? "Copiat" : ""}</p> */}
    </div>
  );
}
