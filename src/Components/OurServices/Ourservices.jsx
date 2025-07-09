import { useState } from "react";
import { Accordion } from "../../../data";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "./OurServices.css";
import ScrollReveal from "../Animations/ScrollReveal";

const Ourservices = () => {
  const [openId, setOpenId] = useState(null);
  const toggleAccordion = (id) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  const navigate = useNavigate();

  return (
    <section className="AccordionContainer">
      <div className="AccordionHead">
        <h1>Our Services</h1>
      </div>
      <div className="AccordionSection">
        <div className="AccordionItemContainer">
          {Accordion.map(
            ({
              id,
              title,
              subTitle,
              description,
              close,
              buttonText,
              buttonClass,
              buttonLink,
            }) => (
              <ScrollReveal key={id} delay={0.3 * id * 0.2}>
                <div key={id} className="AccordionItem">
                  <div
                    className="AccordionHeader"
                    onClick={() => toggleAccordion(id)}
                  >
                    <h3>{title}</h3>
                    <span className="Icon">
                      {openId === id ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                  </div>
                  {openId === id && (
                    <div className="AccordionContent">
                      <div className="AccordionText">
                        <h4 className="Sub">{subTitle}</h4>
                        <p>{description}</p>
                        <h4 className="AccordionClose">{close}</h4>
                        <div className="AccordionBtnContainer">
                          <button
                            className={`AccordionBtn ${buttonClass}`}
                            onClick={() => navigate(buttonLink)}
                          >
                            {buttonText}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            )
          )}
        </div>
        <ScrollReveal delay={0.3}>
          <div className="AccordionImage">
            <img loading="lazy" src="/finalBg.jpg" alt="What We offer" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Ourservices;
