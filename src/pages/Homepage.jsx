import Experience from "../components/Experience";
import MyCarousel from "../components/Carousel";
import Portfolio from "../components/Portfolio";
import SocialLinks from "../components/SocialLinks";
import Home from "../components/Home";
import Contact from "../components/Contact";

function Homepage() {
  return (
    <div>
      <Home />
      <MyCarousel />
      <Portfolio />
      <Experience />
      <SocialLinks />
      <Contact />
    </div>
  );
}

export default Homepage;
