import { AboutUs } from "../../../../data";
import SEO from "../../SEO/SEO";
import ScrollReveal from "../../Animations/ScrollReveal";
import "./About.css";

const About = () => {
  return (
    <>
      <SEO
        title="Orvyn Media | About"
        description="Orvyn Media was born from a simple desire to help brands and individuals show up online with clarity, confidence, and strategy."
        image="https://www.orvynmedia.com/aboutScreen.png"
        url="https://www.orvynmedia.com/about"
      />

      <article className="AboutUs">
        <ScrollReveal>
          <div className="AboutUsHead">
            <h1>About Us</h1>
          </div>
        </ScrollReveal>

        <div className="AboutUsContainer">
          <ScrollReveal delay={0.1}>
            <div className="AboutUsHeader">
              <h2>{AboutUs.header}</h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="AboutUsFirst">
              <div className="AboutImgContainer">
                <img src="/dami.jpg" alt="founderImg" />
                <p>Founder</p>
              </div>
              <p>{AboutUs.firstText}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="AboutUsSmall">
              <div className="SmallImgText">
                <div className="SmallImgContainer">
                  <div className="SmallImg">
                    <img src="/dami.jpg" alt="founderImg" />
                    <p>Founder</p>
                  </div>
                  <p>
                    Founded by Raphael or Dami, a digital storyteller and social
                    media strategist, Orvyn began as a personal journey of
                    sharing content, inspiring others to grow,
                  </p>
                </div>
                <p className="SmallText2">
                  and managing social media pages that delivered real results.
                  Over time, that passion grew into a creative agency focused on
                  helping people build their digital presence and turn
                  visibility into real growth.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="AboutUsTexts">
              <p className="SecondText">{AboutUs.secondText}</p>
              <p className="ThirdText">{AboutUs.thirdText}</p>
              <p className="ForthText">{AboutUs.forthText}</p>
              <h3>{AboutUs.ending}</h3>
            </div>
          </ScrollReveal>
        </div>
      </article>
    </>
  );
};

export default About;
