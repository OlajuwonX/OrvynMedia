import { AboutUs } from "../../../data";
import { useNavigate } from "react-router-dom";
import "./About.css";

const About = () => {
  const navigate = useNavigate();
  const goToAbout = () => {
    navigate("/about");
  };

  return (
    <section className="AboutContainer">
      <div className="About">
        <div className="AboutHeader">
          <h1>Who we are</h1>
        </div>
        <div className="AboutText">
          <div className="AboutIntro">
            <h2>{AboutUs.header}</h2>
          </div>
          <div className="AboutSubheader">
            <p>
              Founded by Raphael or Dami, a digital storyteller and social media
              strategist, Orvyn began as a personal journey of sharing content,
              inspiring others to grow, and managing social media pages that
              delivered real results. Over time, that passion grew into a
              creative agency focused
            </p>
            <div className="AboutBtn">
              <button className="Button" onClick={goToAbout}>
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
