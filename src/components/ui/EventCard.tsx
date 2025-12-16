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
      <div className="flex h-full flex-col gap-2 rounded-xl border border-gray-100 p-3 transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg">
        <div className="relative h-40 w-full overflow-hidden rounded-lg">
          <Image
            src="/thumbnail.jpeg"
            alt="thumbnail"
            width={500}
            height={300}
          />
        </div>
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
