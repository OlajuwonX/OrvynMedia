import { useNavigate } from "react-router-dom";
import "./Content.css";
import { FaCheck } from "react-icons/fa6";
import ScrollReveal from "../../Animations/ScrollReveal";

const Content = ({ tabData, loading = false }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <section className="ContentContainer">
        <div className="ContentHeader">
          <ScrollReveal delay={0.3}>
            <h2>ORVYN MEDIA MOBILE VIDEOGRAPHY RATES</h2>
          </ScrollReveal>
        </div>
        <div className="ContentWrapper">
          <div className="ContentCard">
            <div className="ContentBack">
              <div className="skeleton-packages">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="skeleton-package">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-subtitle"></div>
                    <div className="skeleton-list">
                      <div className="skeleton-list-item"></div>
                      <div className="skeleton-list-item"></div>
                      <div className="skeleton-list-item"></div>
                    </div>
                    <div className="skeleton-button"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!tabData || tabData.length === 0) {
    return (
      <section className="ContentContainer">
        <div className="ContentHeader">
          <ScrollReveal delay={0.3}>
            <h2>ORVYN MEDIA MOBILE VIDEOGRAPHY RATES</h2>
          </ScrollReveal>
        </div>
        <div className="ContentWrapper">
          <div className="ContentCard">
            <div className="ContentBack">
              <p>No packages available</p>
              <p>Please add packages in the admin panel</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="ContentContainer">
      <div className="ContentHeader">
        <ScrollReveal delay={0.3}>
          <h2>ORVYN MEDIA MOBILE VIDEOGRAPHY RATES</h2>
        </ScrollReveal>
      </div>

      <div className="ContentWrapper">
        {/* Render each card as a separate ContentPack */}
        {tabData.map((pack, packIdx) => (
          <ScrollReveal delay={0.4} key={packIdx}>
            <div className="ContentCard">
              <div className="ContentBack">
                <div className="TabDataGridOverlay" />
                <h3>{pack.tier || pack.title || 'Package'}</h3>
                {pack.description && (
                  <p className="ContentDescription">{pack.description}</p>
                )}
                {pack.prep_time && <p>{pack.prep_time}</p>}
                {pack.price && (
                  <p className="ContentPrice">
                    <span>{pack.price}</span>
                  </p>
                )}
              </div>

              {(pack.deliverables || pack.features || []).length > 0 && (
                <ul className="ContentDeliverables">
                  {(pack.deliverables || pack.features).map((item, i) => (
                    <li key={i}>
                      <span className="Check">
                        <FaCheck />
                      </span>{" "}
                      {typeof item === 'string' ? item : item.name || item.title || item.description || ''}
                    </li>
                  ))}
                </ul>
              )}
              <div className="ContentButton">
                <button
                  className="Button"
                  onClick={() => navigate(pack.button_link || pack.buttonLink || "/contact")}
                >
                  {pack.button_label || pack.buttonLabel || "Get Started"}
                </button>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
      <ScrollReveal delay={0.5}>
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
      </ScrollReveal>
    </section>
  );
};

export default Content;