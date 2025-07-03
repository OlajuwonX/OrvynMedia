import "./Home.css";
import Hero from "../../Hero/Hero";
import About from "../../About/About";
import Ourservices from "../../OurServices/Ourservices";
import Revamp from "../../Revamp/Revamp";
import RevampImg from "../../RevampImg/RevampImg";
import Choose from "../../Choose/Choose";
import BTSVideo from "../../BTSVideo/BTSVideo";
import Brands from "../../Brands/Brands"

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Ourservices />
      <Revamp />
      <RevampImg />
      <Choose />
      <BTSVideo />
      <Brands />
    </div>
  );
};

export default Home;
