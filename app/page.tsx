"use client";
import EventList from "@/components/EventList";
import { getEvents } from "@/lib/actions/events";
import React from "react";

//TODO:Component temporary transformed to client component for testing purposes
// export default async function Home() {
//   const events = await getEvents();

//   return (
//     <div className="max-w-screen-sm mx-auto px-4">
//       <EventList events={events} />
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import Loading from "./loading";

export default function Home() {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getEvents();
        setEvents(eventsData as any[]);
      } catch (error) {
        console.error(error);
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="max-w-screen-sm mx-auto px-4">
      {isLoading ? <Loading /> : <EventList events={events} />}
    </div>
  );
}
