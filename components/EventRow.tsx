"use client";

import { EventType } from "@/lib/types";
import React, { useState } from "react";
import Tag from "./Tag";
import { MdLocationOn } from "react-icons/md";
import { GoClockFill } from "react-icons/go";
import { IoTicket } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
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
        <div
          style={{
            backgroundImage: `url(${event.poster})`,
            filter: "grayscale(100%)",
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
          <DialogTitle className="text-xl bg-slate-200 dark:bg-black font-semibold text-text dark:text-glow p-1 rounded">
            {event.name}
          </DialogTitle>
          <DialogDescription>
            <div className="mt-6">
              <div className="flex items-start">
                <div className="w-2/3 pr-4">
                  <p className="text-black dark:text-glow text-base bg-slate-200 dark:bg-black p-1 rounded">
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
                    className="w-full"
                    src={event.poster ? event.poster : defaultPoster}
                    alt={event.name}
                    width={200}
                    height={250}
                  />
                </div>
              </div>
              <div className="mt-6">
                <div className="flex items-center bg-slate-200 dark:bg-glow rounded p-1">
                  <MdLocationOn className="text-black" />
                  <p className="ml-2 text-black text-sm  dark:text-black">
                    {event.location}
                  </p>
                </div>
                <div className="flex items-center mt-2 bg-slate-200 dark:bg-glow rounded p-1">
                  <GoClockFill className="text-black" />
                  <p className="ml-2 text-black text-sm dark:text-black">
                    {formattedDateStr}
                  </p>
                </div>
                <div className="flex items-center mt-2 bg-slate-200 dark:bg-glow rounded p-1">
                  <IoTicket className="text-black" />
                  <p className="ml-2 text-black text-sm dark:text-black">
                    {event.price}
                  </p>
                </div>
                {event.link && (
                  <div className="flex items-center mt-2 bg-slate-200 dark:bg-glow rounded p-1">
                    <FaLink className="text-black" />

                    <p className="ml-2 text-black text-sm dark:text-black">
                      <a href={event.link} target="_blank">
                        Link
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
