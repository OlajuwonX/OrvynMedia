import { HomeOfferData } from "../../../data";
import { useNavigate } from "react-router-dom";
import "./OneTimeOffer.css";
import { FaCheck } from "react-icons/fa6";
import ScrollReveal from "../Animations/ScrollReveal";

const OneTimeOffer = () => {
  const navigate = useNavigate();

  return (
    <section className="HomeOfferContainer">
      <div className="HomeOfferSection">
        {HomeOfferData.map(
          ({
            id,
            type,
            price,
            description,
            includes,
            img,
            deliverables,
            buttonLabel,
            buttonLink,
            buttonClass,
          }) => (
            <ScrollReveal key={id} delay={0.7 * id * 0.1}>
              <div className="HomeOfferWrap" key={id}>
                  <h2>{type}</h2>
                <div className="HomeOfferCard">
                  <div className="HomeOfferImg">
                    <img src={img} alt="offer-bg" />
                  </div>

                  <div className="HomeOfferText">
                    <div className="HomeOfferBack">
                      <h3>{description}</h3>
                      <p className="HomeOfferPrice">{price}</p>
                      <p>{includes}</p>
                    </div>

                    <div className="HomeOfferItem">
                      {deliverables.map((item, index) => (
                        <ul key={index}>
                          <li>
                            <span className="Check">
                              <FaCheck />
                            </span>{" "}
                            {item}
                          </li>
                        </ul>
                      ))}
                      <div className="HomeOfferBtn">
                        <button
                          className={buttonClass}
                          onClick={() => navigate(buttonLink)}
                        >
                          {buttonLabel}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )
        )}
      </div>
    </section>
  );
};

export default OneTimeOffer;
