import { PricingData } from "../../../../data";
import "./SMM.css";

const SMM = () => {
  const smmCategory = PricingData.find((item) => item.id === 1);
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
              <p className="TabDataPrepTime">Prep - Time: {pack.prepTime}</p>
            </div>
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

export default SMM;
