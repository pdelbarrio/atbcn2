"use client";

import { EventType } from "@/lib/types";
import React, { useState } from "react";
import Tag from "./Tag";
// import { AnimatePresence } from "framer-motion";
// import EventModal from "./EventModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formattedDate } from "@/lib/utils";
import Image from "next/image";

interface Props {
  event: EventType;
}

const EventRow = ({ event }: Props) => {
  const formattedDateStr = formattedDate(
    event.date,
    "eee, dd/MM/yyyy HH:mm'h'"
  );

  const defaultPoster =
    "https://res.cloudinary.com/getoutbcn/image/upload/v1680721784/samples/poster_sh7xqa.jpg";

  return (
    <Dialog>
      <DialogTrigger asChild>
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
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-black">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-text dark:text-glow">
            {event.name}
          </DialogTitle>
          <DialogDescription>
            <div className="mt-6">
              <div className="flex items-start">
                <div className="w-2/3 pr-4">
                  <p className="text-text dark:text-glow text-base">
                    {event.description}
                  </p>
                  <div className="mt-4">
                    <div className="flex flex-wrap mb-4">
                      <div className="h-10 flex items-center">
                        {event.tags
                          ? event.tags.map((tag, id) => {
                              return <Tag key={id} tag={tag} />;
                            })
                          : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-1/3">
                  <Image
                    className="w-full rounded-lg opacity-30"
                    src={event.poster ? event.poster : defaultPoster}
                    alt={event.name}
                    fill
                  />
                </div>
              </div>
              <div className="mt-6">
                <div className="flex items-center dark:bg-glow dark:rounded-lg">
                  {/* <LocationIcon /> */}
                  <p className="ml-2 text-text text-sm dark:text-black">
                    {event.location}
                  </p>
                </div>
                <div className="flex items-center mt-2 dark:bg-glow dark:rounded-lg">
                  {/* <ClockIcon /> */}
                  <p className="ml-2 text-text text-sm dark:text-black">
                    {formattedDateStr}
                  </p>
                </div>
                <div className="flex items-center mt-2 dark:bg-glow dark:rounded-lg">
                  {/* <TicketIcon /> */}
                  <p className="ml-2 text-text text-sm dark:text-black">
                    {event.price}
                  </p>
                </div>
                {event.link && (
                  <div className="flex items-center mt-2 dark:bg-glow dark:rounded-lg">
                    {/* <LinkIcon /> */}

                    <p className="ml-2 text-text text-sm dark:text-black">
                      <a href={event.link} target="_blank">
                        Link del evento
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EventRow;
