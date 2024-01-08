"use client";

import { EventType } from "@/lib/types";
import React, { useState } from "react";
import Tag from "./Tag";
// import { AnimatePresence } from "framer-motion";
// import EventModal from "./EventModal";
import { formattedDate } from "@/lib/utils";

interface Props {
  event: EventType;
}

const EventRow = ({ event }: Props) => {
  const formattedDateStr = formattedDate(
    event.date,
    "eee, dd/MM/yyyy HH:mm'h'"
  );

  return (
    <div className="bg-card dark:bg-gradient-dark rounded-lg dark:border dark:border-glow shadow-lg overflow-hidden mb-3 cursor-pointer touch:bg-gray-500">
      <div className="flex flex-col p-4">
        {/* fecha / nombre / ubicación-precio */}
        <div className="flex justify-between mb-2">
          <div className="w-1/2">
            <p className="font-bold text-text dark:text-glow">
              {formattedDateStr}
            </p>
          </div>
          <div className="w-1/2 text-center">
            <p className="md:text-2xl font-bold text-text dark:text-glow">
              {event.name}
            </p>
            <p className="text-gray-600"></p>
          </div>
          <div className="w-1/4 md:text-right flex flex-col justify-between  text-text dark:text-glow ml-2 py-2 text-right">
            <p className="text-text text-sm md:text-base dark:text-glow">
              {event.location}
            </p>
            <p className="font-bold text-sm md:text-base">{event.price}</p>
          </div>
        </div>
        {/* tags */}
        <div className="h-10 flex items-center">
          {event.tags
            ? event.tags.map((tag, id) => {
                return <Tag key={id} tag={tag} />;
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default EventRow;
