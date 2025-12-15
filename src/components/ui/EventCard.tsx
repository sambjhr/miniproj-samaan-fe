import { Event } from "@/types/events";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";


interface EventCardProps {
  event: Event;
}

const EventCard = (props: EventCardProps) => {
  return (
    <Link href={`/eventt/${props.event.objectId}`}>
    <div className="space-y-2 rounded-xl border p-3">
      <Image src="/thumbnail.jpeg" alt="thumbnail" width={500} height={300} />
      <p className="w-fit rounded-sm bg-blue-800 px-4 text-sm text-white">
        {props.event.category_id}
      </p>
      <h2 className="line-clamp-2 text-xl font-bold">{props.event.title}</h2>
      <p className="text-lg">Date - {props.event.organizer_id}</p>
      <p className="line-clamp-3">{props.event.description}</p>
    </div>
    </Link>
  );
};

export default EventCard;
