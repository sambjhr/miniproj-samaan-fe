import Navbar from "@/components/Navbar";
import Homepage from "@/components/Homepage";
import Promotion from "@/components/Promotion";
import Eventreview from "@/components/Eventreview";
import Contactus from "@/components/Contactus";

function Home() {
  return (
    <div>
      <Navbar />
      <Homepage />
      <Promotion />
      <Eventreview />
      <Contactus />
    </div>
  );
}

export default Home;