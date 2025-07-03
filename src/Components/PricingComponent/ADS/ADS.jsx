import { PricingData } from "../../../../data";
import "./ADS.css";

const ADS = () => {
  const smmCategory = PricingData.find((item) => item.id === 2);
  return (
    <div className="TabDataContainer">
      <div className="TabDataHeader">
        <h2>{smmCategory?.category}</h2>
      </div>
      <div className="TabDataWrapper">
        {smmCategory?.packages.map((pack, index) => (
          <div className="TabDataPack" key={index}>
            <div className="TabDataBack">
              <div className="TabDataGridOverlay"></div>
              <h3>{pack.tier}</h3>
              <p className="TabDataTagLine">{pack.tagline}</p>
              <p className="TabDataPrice"><span>{pack.price}</span></p>
            </div>
              <p className="TabDataDescription">{pack.description}</p>
            <ul className="TabDataDeliverables">
              {pack.deliverables.map((item, i) => (
                <li key={i}>✔ {item}</li>
              ))}
            </ul>
            <a href={pack.buttonLink}>
              <button className="Button">{pack.buttonLabel}</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ADS;
