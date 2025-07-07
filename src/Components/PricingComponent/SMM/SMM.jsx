import { useNavigate } from "react-router-dom";
import { PricingData } from "../../../../data";
import "./SMM.css";
import { FaCheck } from "react-icons/fa6";
import ScrollReveal from "../../Animations/ScrollReveal";

const SMM = () => {
  const Category = PricingData.find((item) => item.id === 1);
  const navigate = useNavigate();

  return (
    <section className="TabDataContainer">
      <div className="TabDataHeader">
        <ScrollReveal delay={0.3}>
          <h2>{Category?.category}</h2>
        </ScrollReveal>
      </div>
      <div className="TabDataWrapper">
        {Category?.packages.map((pack, index) => (
          <ScrollReveal key={index} delay={0.4 * index * 0.1}>
            <div className="TabDataPack" key={index}>
              <div className="TabDataBack">
                <div className="TabDataGridOverlay"></div>
                <h3>{pack.tier}</h3>
                <p className="TabDataTagLine">{pack.tagline}</p>
                <p className="TabDataPrepTime">Prep - Time: {pack.prepTime}</p>
              </div>
              <ul className="TabDataDeliverables">
                {pack.deliverables.map((item, i) => (
                  <li key={i}>
                    <span className="Check">
                      <FaCheck />
                    </span>{" "}
                    {item}
                  </li>
                ))}
              </ul>
              <div className="TagDataBtn">
                <button
                  className="Button"
                  onClick={() => navigate(pack.buttonLink)}
                >
                  {pack.buttonLabel}
                </button>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default SMM;
