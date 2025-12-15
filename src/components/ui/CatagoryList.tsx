"use client";

import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { Event } from "@/types/events";
import axios from "axios";

const CategoryList = () => {
  const [Events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getEvents = async () => {
    try {
      const result = await axios.get(
        "https://neatmarble-us.backendless.app/api/data/Event",
      );
      setEvents(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);
  return (
    <div className="container mx-auto grid grid-cols-4 gap-8 p-4">
      {isLoading ? (
        <div className="col-span-4 text-center my-16">
          <p className="text-xl font-bold">Loading...</p>
        </div>
      ) : null}

      {Events.map((event) => {
        return <EventCard key={event.event_id} event={event} />;
      })}
    </div>
  );
};

export default CategoryList;
