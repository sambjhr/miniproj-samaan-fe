"use client";

import EventCard from "./EventCard";
import { Event } from "@/types/events";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

const EventList = () => {
  const { data: events, isPending } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const users = await axiosInstance.get<Event[]>(
        "/api/data/Event",
      );
      return users.data;
    },
  });

  return (
    <div className="container mx-auto grid grid-cols-4 gap-8 p-4 auto-rows-fr items-stretch">
      {isPending ? (
        <div className="col-span-4 my-16 text-center">
          <p className="text-xl font-bold">Loading...</p>
        </div>
      ) : null}

      {events?.map((event) => {
        return <EventCard key={event.event_id} event={event} />;
      })}
    </div>
  );
};

export default EventList;
