import { PricingData } from "../../../../data";
import { useNavigate } from "react-router-dom";

import "./Graphics.css";

const Graphics = () => {
  const Category = PricingData.find((item) => item.id === 4);
  const navigate = useNavigate();

  return (
    <div className="OtherDataContainer">
      <h2>{Category?.category}</h2>
      <div className="OtherDataCard">
        <div className="OtherDataBack">
          <div className="TabDataGridOverlay"></div>
          <p>{Category?.description}</p>
          <p>{Category?.includes}</p>
        </div>
        <div className="OtherDataWrap">
          {Category.deliverables.map((item, index) => (
            <div className="OtherDataDeliverables" key={index}>
              <h3>
                <span className="Check">✔</span> {item.title}
              </h3>
              <p>{item.text}</p>
            </div>
          ))}
          <div className="OtherDataButton">
            <button className="Button" onClick={() => navigate("/contact")}>
              {Category?.buttonLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graphics;
