"use client";

import { EventType } from "@/lib/types";
import React, { useState } from "react";
import Tag from "../Tag";
import { MdLocationOn } from "react-icons/md";
import { GoClockFill } from "react-icons/go";
import { IoTicket } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formattedDate } from "@/lib/utils";
import Image from "next/image";
import CopyButton from "../CopyButton/CopyButton";

interface Props {
  event: EventType;
}

const EventRow = ({ event }: Props) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const formattedDateStr = formattedDate(
    event.date,
    "eee, dd/MM/yyyy HH:mm'h'"
  );

  const handleClick = () => {
    setIsZoomed(!isZoomed);

    // Si se hace zoom, establece un timeout para volver al tamaño original después de 3 segundos
    if (!isZoomed) {
      setTimeout(() => {
        setIsZoomed(false);
      }, 2000);
    }
  };

  const style = {
    transform: isZoomed ? "scale(2)" : "scale(1)",
    transformOrigin: "top right",
    transition: "transform .3s",
  };

  const dayOfWeek = new Date(event.date).getDay();
  let backgroundClass;
  if (dayOfWeek === 0) {
    backgroundClass = "bg-card2"; // Sunday
  } else {
    backgroundClass = dayOfWeek % 2 === 0 ? "bg-card" : "bg-card2"; // Alternating between bg-card and bg-card2 for other days
  }

  const defaultPoster =
    "https://res.cloudinary.com/getoutbcn/image/upload/v1680721784/samples/poster_sh7xqa.jpg";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          data-testid="event-row"
          className={`dark:bg-gradient-dark rounded-lg dark:border dark:border-glow shadow-lg overflow-hidden mb-3 cursor-pointer touch:bg-gray-500 ${backgroundClass}`}
        >
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
              <div className="w-1/4 md:text-right flex flex-col justify-between text-text dark:text-glow ml-2 py-2 text-right">
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
      </DialogTrigger>
      <DialogContent
        data-testid="event-dialog"
        className="sm:max-w-[425px] bg-white dark:bg-black"
      >
        <div
          style={{
            backgroundImage: `url(${event.poster})`,
            filter: "blur(5px)",
            opacity: "0.4",
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: -1,
          }}
          className="bg-cover"
        ></div>
        <DialogHeader>
          <DialogTitle
            data-testid="event-name"
            className="text-xl bg-slate-200 dark:bg-black font-semibold text-text dark:text-glow p-1 rounded"
          >
            {event.name}
          </DialogTitle>
          <DialogDescription>
            <div className="mt-6">
              <div className="flex items-start">
                <div data-testid="event-description" className="w-2/3 pr-4">
                  {event.description && (
                    <div className="description-container">
                      <p className="text-black dark:text-glow text-sm bg-slate-200 dark:bg-black p-1 rounded">
                        {event.description}
                      </p>
                    </div>
                  )}
                  <div className="mt-4">
                    <div className="flex flex-wrap mb-4"></div>
                  </div>
                </div>
                <div data-testid="event-image" className="w-1/3">
                  <Image
                    className="w-full cursor-pointer relative z-10"
                    style={style}
                    src={event.poster ? event.poster : defaultPoster}
                    alt={event.name}
                    width={200}
                    height={250}
                    onClick={handleClick}
                  />
                </div>
              </div>
              <div data-testid="event-tags" className="h-10 flex items-center">
                {event.tags
                  ? event.tags.map((tag, id) => {
                      return <Tag key={id} tag={tag} />;
                    })
                  : null}
              </div>
              <div className="mt-6">
                <div
                  data-testid="event-location"
                  className="flex items-center bg-slate-200 dark:bg-glow rounded p-1"
                >
                  <MdLocationOn className="text-black" />
                  <p className="ml-2 text-black text-sm  dark:text-black">
                    {event.location}
                  </p>
                </div>
                <div
                  data-testid="event-date"
                  className="flex items-center mt-2 bg-slate-200 dark:bg-glow rounded p-1"
                >
                  <GoClockFill className="text-black" />
                  <p className="ml-2 text-black text-sm dark:text-black">
                    {formattedDateStr}
                  </p>
                </div>
                <div
                  data-testid="event-price"
                  className="flex items-center mt-2 bg-slate-200 dark:bg-glow rounded p-1"
                >
                  <IoTicket className="text-black" />
                  <p className="ml-2 text-black text-sm dark:text-black">
                    <span>{event.price}</span>
                  </p>
                </div>
                {event.link && (
                  <div
                    data-testid="event-link"
                    className="flex items-center mt-2 bg-slate-200 dark:bg-glow rounded p-1"
                  >
                    <FaLink className="text-black" />

                    <div className="ml-2 text-black text-sm dark:text-black">
                      <a href={event.link} target="_blank">
                        Link
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex h-full w-full top-0 left-0 items-center justify-center relative z-5">
          <CopyButton event={event} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventRow;
