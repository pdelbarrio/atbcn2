"use client";

import React, { useState } from "react";
import { startOfWeek, endOfWeek, addWeeks, subWeeks } from "date-fns";
import { formattedDate } from "@/lib/utils";
import { LeftArrow, RightArrow } from "../components/Buttons";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { EventType } from "@/lib/types";
import EventRow from "./EventRow";

interface Props {
  events: EventType[];
}

export default function EventList({ events }: any) {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const currentWeekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const currentWeekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 });

  const eventsThisWeek = events.data.filter((event: EventType) => {
    const eventDate = new Date(event.date);
    return eventDate >= currentWeekStart && eventDate <= currentWeekEnd;
  });

  const isFirstWeek =
    currentWeekStart.getTime() ===
    startOfWeek(new Date(), { weekStartsOn: 1 }).getTime();

  const nextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const previousWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  return (
    <>
      <div className="px-4 justify-between flex bg-card dark:bg-gradient-dark dark:border dark:border-glow rounded-lg shadow-lg overflow-hidden mb-3 text-center py-2">
        <div>
          {isFirstWeek ? (
            ""
          ) : (
            <div
              className="hover:cursor-pointer p-1 mr-2"
              onClick={previousWeek}
            >
              <IoIosArrowDropleftCircle className="w-8 h-8 text-btvgray dark:text-glow" />
            </div>
          )}
        </div>
        <p className="text-text text-xs md:text-base dark:text-glow font-bold mr-2">
          del {formattedDate(currentWeekStart.toISOString(), "d MMMM")} al{" "}
          {formattedDate(currentWeekEnd.toISOString(), "d MMMM, yyyy")}
        </p>
        <div onClick={nextWeek} className="hover:cursor-pointer p-1">
          <IoIosArrowDroprightCircle className="w-8 h-8 text-btvgray dark:text-glow" />
        </div>
      </div>
      <div>
        {eventsThisWeek.length > 0 ? (
          <div>
            {eventsThisWeek.map((event: EventType) => (
              <EventRow event={event} key={event.id} />
            ))}
          </div>
        ) : (
          <div className="bg-card dark:bg-gradient-dark dark:border dark:border-glow rounded-lg shadow-lg overflow-hidden mb-3">
            <p className="text-center p-10 text-text dark:text-glow font-bold">
              No hay eventos introducidos para esta semana
            </p>
          </div>
        )}
      </div>
      <div className="max-w-screen-sm mx-auto px-4">
        <div className="flex justify-between py-4">
          <div>
            {isFirstWeek ? (
              ""
            ) : (
              <button
                className=" text-gray-800 font-bold sm:p-1 dark:bg-glow rounded-full"
                onClick={previousWeek}
                disabled={isFirstWeek}
              >
                <LeftArrow />
              </button>
            )}
          </div>
          <div>
            <button
              className="text-gray-800 font-bold sm:p-1 dark:bg-glow rounded-full"
              onClick={nextWeek}
            >
              <RightArrow />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
