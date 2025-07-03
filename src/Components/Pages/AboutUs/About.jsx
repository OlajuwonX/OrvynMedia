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
