import { useNavigate } from "react-router-dom";
import { PricingData } from "../../../../data";
import "./Content.css";

const Content = () => {
  const navigate = useNavigate();

  const Category = PricingData.find((item) => item.id === 3);

  if (!Category || !Array.isArray(Category.packages)) {
    return (
      <div className="TabDataContainer">
        <h2>Content Not Available</h2>
        <p>We're having trouble loading the pricing information.</p>
      </div>
    );
  }

  return (
    <div className="ContentContainer">
      <div className="ContentHeader">
        <h2>{Category.category}</h2>
      </div>

      <div className="ContentWrapper">
        {Category.packages.map((group, groupIdx) => (
          <div key={groupIdx} className="ContentCard">
            <div className="ContentType">
              {group.type && <h3 className="ContentTypeHead">{group.type}</h3>}
              {group.typeText && (
                <p className="ContentDescription">{group.typeText}</p>
              )}
            </div>

            <div className="ContentPackageCards">
              {group.tier.map((pack, packIdx) => (
                <div className="ContentPack" key={packIdx}>
                  <div className="ContentBack">
                    <div className="TabDataGridOverlay" />
                    <h3>{pack.tierPack}</h3>
                    {pack.description && (
                      <p className="ContentDescription">{pack.description}</p>
                    )}
                    {pack.prepTime && <p>{pack.prepTime}</p>}
                    {pack.price && (
                      <p className="ContentPrice">
                        <span>{pack.price}</span>
                      </p>
                    )}
                  </div>

                  {Array.isArray(pack.deliverables) &&
                    pack.deliverables.length > 0 && (
                      <ul className="ContentDeliverables">
                        {pack.deliverables.map((item, i) => (
                          <li key={i}>
                            <span className="Check">✔</span> {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  <div className="ContentButton">
                    <button
                      className="Button"
                      onClick={() => navigate(pack.buttonLink || "/contact")}
                    >
                      {pack.buttonLabel || "Get Started"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="ContentClose">
        <h2>Want Something More Specific?</h2>
        <p>
          If you have specific deliverables or expectations, we can tailor a
          plan that fits your needs.
        </p>
        <div className="ContentButton">
          <button className="Button" onClick={() => navigate("/contact")}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Content;
