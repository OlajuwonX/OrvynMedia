import { useNavigate } from "react-router-dom";
import "./Content.css";
import { PricingData } from "../../../../data";

const Content = () => {
  const navigate = useNavigate();

  const Category = PricingData.find((item) => item.id === 3);

  if (!Category || !Array.isArray(Category.category)) {
    return (
      <div className="TabDataContainer">
        <h2>Content Not Available</h2>
        <p>We're having trouble loading the pricing information.</p>
      </div>
    );
  }

  return (
    <div className="TabDataContainer">
      {Category.category.map((section, sectionIdx) => (
        <div key={sectionIdx}>
          <div className="TabDataHeader">
            <h2>{section.categoryTitle}</h2>
            {(section.subhead || section.subHeadSpan) && (
              <h3>
                {section.subhead}
                {section.subHeadSpan && <span> {section.subHeadSpan}</span>}
              </h3>
            )}
          </div>

          <div className="TabDataWrapper">
            {section.packages.map((pack, packIdx) => (
              <div className="TabDataPack" key={packIdx}>
                <div className="TabDataBack">
                  <div className="TabDataGridOverlay" />
                  <h3>{pack.tier || "Standard"}</h3>
                  <p className="TabDataDescription">{pack.description}</p>

                  {pack.mobileSpan && (
                    <p className="TabDataPrice">
                      {pack.mobile && <span>{pack.mobile}</span>}
                      {pack.mobileSpan}
                    </p>
                  )}
                </div>

                {pack.includes && <p>{pack.includes}</p>}

                {Array.isArray(pack.deliverables) && pack.deliverables.length > 0 && (
                  <ul className="TabDataDeliverables">
                    {pack.deliverables.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}

                {(pack.addOn || pack.addOnText || pack.addOnSpan) && (
                  <p>
                    {pack.addOn} {pack.addOnText} {pack.addOnSpan}
                  </p>
                )}

                {pack.close && (
                  <p className="TabDataClose">{pack.close}</p>
                )}

                <button
                  className="Button"
                  onClick={() => navigate(pack.buttonLink || "/contact")}
                >
                  {pack.buttonLabel || "Get Started"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Content;
