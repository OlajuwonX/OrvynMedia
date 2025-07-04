import { useNavigate } from "react-router-dom";
import { PricingData } from "../../../../data";
import "./ADS.css";

const ADS = () => {
  const Category = PricingData.find((item) => item.id === 2);
  const navigate = useNavigate();

  return (
    <div className="TabDataContainer">
      <div className="TabDataHeader">
        <h2>{Category?.category}</h2>
      </div>
      <div className="TabDataWrapper">
        {Category?.packages.map((pack, index) => (
          <div className="TabDataPack" key={index}>
            <div className="TabDataBack">
              <div className="TabDataGridOverlay"></div>
              <h3>{pack.tier}</h3>
              <p className="TabDataTagLine">{pack.tagline}</p>
              <p className="TabDataPrice">
                <span>{pack.price}</span>
              </p>
            </div>
            <p className="TabDataDescription">{pack.description}</p>
            <ul className="TabDataDeliverables">
              {pack.deliverables.map((item, i) => (
                <li key={i}>✔ {item}</li>
              ))}
            </ul>
            <button
              className="Button"
              onClick={() => navigate(pack.buttonLink)}
            >
              {pack.buttonLabel}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ADS;
