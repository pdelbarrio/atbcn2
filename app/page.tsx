import EventList from "@/components/EventList";
import { getEvents } from "@/lib/actions/events";
import React from "react";

export default async function Home() {
  const events = await getEvents();

  return (
    <div className="max-w-screen-sm mx-auto px-4">
      <EventList events={events} />
    </div>
  );
}
