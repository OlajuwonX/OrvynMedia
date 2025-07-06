import { HomeOfferData } from "../../../data";
import { useNavigate } from "react-router-dom";
import "./OneTimeOffer.css";

const OneTimeOffer = () => {
  const navigate = useNavigate();

  return (
    <div className="HomeOfferContainer">
      <div className="HomeOfferSection">
        {HomeOfferData.map(
          ({
            id,
            type,
            price,
            description,
            includes,
            deliverables,
            buttonLabel,
            buttonLink,
            buttonClass,
          }) => (
            <div className="HomeOfferWrap" key={id}>
              <h2>{type}</h2>
              <div className="HomeOfferCard">
                <div className="HomeOfferImg">
                  <img src="/backimg.jpg" alt="offer-bg" />
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
                        <li>{item}</li>
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
          )
        )}
      </div>
    </div>
  );
};

export default OneTimeOffer;
