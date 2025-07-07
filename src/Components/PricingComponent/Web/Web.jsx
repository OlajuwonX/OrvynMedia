import { useNavigate } from "react-router-dom";
import { PricingData } from "../../../../data";

import "./Web.css";
import { FaCheck } from "react-icons/fa6";
import ScrollReveal from "../../Animations/ScrollReveal";

const Web = () => {
  const Category = PricingData.find((item) => item.id === 5);
  const navigate = useNavigate();
  return (
    <section className="OtherDataContainer">
      <ScrollReveal delay={0.3}>
        <h2>{Category?.category}</h2>
      </ScrollReveal>
      <ScrollReveal delay={0.4}>
        <div className="OtherDataCard">
          <div className="OtherDataBack">
            <div className="TabDataGridOverlay"></div>
            <p>{Category?.description}</p>
            <p>{Category?.includes}</p>
          </div>
          <div className="OtherDataWrap">
            {Category.deliverables.map((item, index) => (
              <ScrollReveal key={index} delay={0.5 * index * 0.1}>
                <div className="OtherDataDeliverables" key={index}>
                  <h3>
                    <span className="Check">
                      <FaCheck />
                    </span>{" "}
                    {item.title}
                  </h3>
                  <p>{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
            <ScrollReveal delay={0.6}>
              <div className="OtherDataButton">
                <button className="Button" onClick={() => navigate("/contact")}>
                  {Category?.buttonLabel}
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Web;
