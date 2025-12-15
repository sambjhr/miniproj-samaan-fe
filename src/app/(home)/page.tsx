import Navbar from "@/components/Navbar";
import Homepage from "@/components/Homepage";
import Promotion from "@/components/Promotion";
import Eventreview from "@/components/Eventreview";
import Contactus from "@/components/Contactus";
import Jumbotron from "@/components/ui/Jumbotron";
import EventList from "@/components/ui/EventList";


function Home() {
  return (
    <div>
      <Navbar />
      <Jumbotron />
      <div>
        <h1 className="text-4xl container mx-auto text-center font-bold mb-5">Featured Events</h1>
      </div>
      <EventList />
      {/* <Homepage />
      <Promotion />
      <Eventreview /> */}
      <Contactus />
    </div>
  );
}

export default Home;