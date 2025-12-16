import Navbar from "@/components/Navbar";
import { Event } from "@/types/events";
import { cache } from "react";
import PurchaseOrderSummary from "../components/OrderSummary";
import TicketTypeRow from "../components/EventTicketTypesCard";
import TicketTypeList from "../components/EventTicketTypesList";
import OrderSummary from "../components/OrderSummary";

interface EventDetailProps {
  params: Promise<{ objectid: string }>;
}

const getEvent = cache(async (objectId: string) => {
  const response = await fetch(
    `https://neatmarble-us.backendless.app/api/data/Event/${objectId}`,
  );
  const event: Event = await response.json();
  return event;
});

export const generateMetadata = async (props: EventDetailProps) => {
  const { objectid } = await props.params;
  const event = await getEvent(objectid);

  return {
    title: event.title,
    description: event.description,
    openGraph: {
      images: event.image,
    },
  };
};

const EventDetail = async (props: EventDetailProps) => {
  const { objectid } = await props.params;
  const event = await getEvent(objectid);

  return (
    <div>
      <Navbar />

      <div className="container mx-auto flex max-w-7xl space-y-2">

        {/* letak event */}
        <div className="container mx-auto max-w-4xl space-y-2  py-10">
          <p className="w-fit rounded-sm bg-blue-800 px-4 text-sm text-white">
            {event.category_id}
          </p>
          <h1 className="text-4xl font-bold">{event.title}</h1>
          <p className="font-light">Date - {event.organizer_id}</p>
          <div className="relative h-[260px] w-full overflow-hidden rounded-xl">
            <img src="/thumbnail.jpeg" alt="thumbnail" className="object-cover" />
          </div>
          <p className="font-bold">Description of this event:</p>
          <p className="rounded-xl border border-gray-200 px-1 py-1">
            {event.description}
          </p>

          {/* letak jenis tiket */}
          <TicketTypeList />
        </div>

        {/* Order Summary */}
        <div>
          <OrderSummary />
        </div>
        {/* <EventTicketType /> */}
      </div>
    </div>
  );
};

export default EventDetail;
