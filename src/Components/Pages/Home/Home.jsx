import "./Home.css";
import Hero from "../../Hero/Hero";
import About from "../../About/About";
import Ourservices from "../../OurServices/Ourservices";
import Revamp from "../../Revamp/Revamp";
import RevampImg from "../../RevampImg/RevampImg";
import Choose from "../../Choose/Choose";
import BTSVideo from "../../BTSVideo/BTSVideo";
import Brands from "../../Brands/Brands";
import OneTimeOffer from "../../OneTimeOffer/OneTimeOffer";
import SEO from "../../SEO/SEO";
import ScrollReveal from "../../Animations/ScrollReveal";

const Home = () => {
  return (
    <>
      <SEO
        title="Orvyn Media | Home"
        description="Welcome to Orvyn Media, where bold ideas meet powerful digital strategies. We help modern brands grow, show up and stand out online."
        image="https://www.orvynmedia.com/homeScreen.png"
        url="https://www.orvynmedia.com/"
      />

      <div>
        <ScrollReveal>
          <Hero />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <About />
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <Ourservices />
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <Revamp />
        </ScrollReveal>
        <ScrollReveal delay={0.4}>
          <RevampImg />
        </ScrollReveal>
        <ScrollReveal delay={0.5}>
          <Choose />
        </ScrollReveal>
        <ScrollReveal delay={0.6}>
          <BTSVideo />
        </ScrollReveal>
        <ScrollReveal delay={0.7}>
          <OneTimeOffer />
        </ScrollReveal>
        <ScrollReveal delay={0.8}>
          <Brands />
        </ScrollReveal>
      </div>
    </>
  );
};

export default Home;
