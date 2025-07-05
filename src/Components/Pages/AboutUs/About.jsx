import { AboutUs } from "../../../../data";
import "./About.css";

const About = () => {
  return (
    <div className="AboutUs">
      <div className="AboutUsHead">
        <h1>About Us</h1>
      </div>

      <div className="AboutUsContainer">
        <div className="AboutUsHeader">
          <h2>{AboutUs.header}</h2>
        </div>
        <div className="AboutUsFirst">
          <div className="AboutImgContainer">
            <img src="/dami.jpg" alt="founderImg" />
            <p>Founder</p>
          </div>
          <p>{AboutUs.firstText}</p>
        </div>
        <div className="AboutUsSmall">
          <div className="SmallImgText">
            <div className="SmallImgContainer">
              <div className="SmallImg">
                <img src="/dami.jpg" alt="founderImg" />
                <p>Founder</p>
              </div>
              <p>
                Founded by Raphael or Dami, a digital storyteller and social
                media strategist, Orvyn began as a personal journey of sharing
                content, inspiring others to grow, and managing social media
              </p>
            </div>
            <p className="SmallText2">
              pages that delivered real results. Over time, that passion grew
              into a creative agency focused on helping people build their
              digital presence and turn visibility into real growth.
            </p>
          </div>
        </div>
        <div className="AboutUsTexts">
          <p className="SecondText">{AboutUs.secondText}</p>
          <p className="ThirdText">{AboutUs.thirdText}</p>
          <p className="ForthText">{AboutUs.forthText}</p>
          <h3>{AboutUs.ending}</h3>
        </div>
      </div>
    </div>
  );
};

export default About;
