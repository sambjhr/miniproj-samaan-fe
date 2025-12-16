import Navbar from "@/components/Navbar";
import Contactus from "@/components/Contactus";
import Jumbotron from "@/components/ui/Jumbotron";
import EventList from "@/components/ui/EventList";
import SearchBar from "./components/SearchBar";
import CategoryCard from "@/components/ui/CatagoryCard";
import PromotionList from "@/components/ui/PromotionList";



const categories = [
  { id: 1, name: "Concert" },
  { id: 2, name: "Business" },
  { id: 3, name: "Music" },
  { id: 4, name: "Games" },
  { id: 4, name: "Art" },
];

function BrowseEvent() {
  return (
    <div>
      <Navbar />

      <div className="container mx-auto space-y-8 pt-10">
        
        <SearchBar />

        {/* category event */}
      <div>
        <h1 className="container mx-auto mb-5 p-10 text-center text-4xl font-bold">
          Choose what you wanna do!
        </h1>
        <div className="scrollbar-hide container mx-auto flex justify-between gap-12 overflow-x-auto p-5 px-6">
          {categories.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </div>

      {/* Featured Event */}
      <div>
        <h1 className="container mx-auto mb-5 p-10 text-center text-4xl font-bold">
          Featured Events
        </h1>
      </div>
      <EventList />

      {/* Ini buat promotion card */}
      <div>
        <h1 className="container mx-auto mb-5 p-10 text-center text-4xl font-bold">
          Promotions
        </h1>
        <PromotionList />

      </div>
      </div>

      {/* Ini letak footer */}
      <Contactus />
    </div>
  );
}

export default BrowseEvent;
