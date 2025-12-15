export interface Event {
  event_id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  organizer_id: number;
  category_id: number;
  objectId: string;
}
