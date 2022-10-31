import Carousel from "../components/Carousel";
import About from "./About";

function Homepage() {
  return (
    <div>
      <Carousel />
      <div className="mb-5">
        <About />
      </div>
    </div>
  );
}

export default Homepage;
