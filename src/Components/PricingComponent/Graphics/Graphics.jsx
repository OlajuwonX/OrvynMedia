import { useNavigate } from "react-router-dom";
import "./Graphics.css";
import { FaCheck } from "react-icons/fa6";
import ScrollReveal from "../../Animations/ScrollReveal";

const Graphics = ({ tabData, loading = false }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <section className="OtherDataContainer">
        <ScrollReveal delay={0.4}>
          <div className="OtherDataCard">
            <div className="OtherDataBack">
              <div className="skeleton-packages">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="skeleton-deliverable">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-text"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    );
  }

  // If no dynamic data, show a message
  if (!tabData || tabData.length === 0) {
    return (
      <section className="OtherDataContainer">
        <ScrollReveal delay={0.4}>
          <div className="OtherDataCard">
            <div className="OtherDataBack">
              <div className="TabDataGridOverlay"></div>
              <p>No services available</p>
              <p>Please add services in the admin panel</p>
            </div>
          </div>
        </ScrollReveal>
      </section>
    );
  }

  // For Graphics tab, we expect the data to be in the first item
  const graphicsInfo = tabData[0] || {};

  return (
    <section className="OtherDataContainer">
      <ScrollReveal delay={0.4}>
        <div className="OtherDataCard">
          <div className="OtherDataBack">
            <div className="TabDataGridOverlay"></div>
            <p>{graphicsInfo.description || "Clean, consistent and professional designs that reflect your brand across platforms. From logos to packaging, we create clean, branded visuals that bring your ideas to life whether for digital or print."}</p>
            <p>{graphicsInfo.includes || "What we offer:"}</p>
          </div>
          <div className="OtherDataWrap">
            {(graphicsInfo.deliverables || graphicsInfo.services || []).map((item, index) => (
              <ScrollReveal key={index} delay={0.5 * index * 0.1}>
                <div className="OtherDataDeliverables" key={index}>
                  <h3>
                    <span className="Check">
                      <FaCheck />
                    </span>{" "}
                    {typeof item === 'string' ? item : item.title || item.name || item.service || ''}
                  </h3>
                  <p>{typeof item === 'string' ? '' : item.description || item.text || item.details || ''}</p>
                </div>
              </ScrollReveal>
            ))}
            <ScrollReveal delay={0.6}>
              <div className="OtherDataButton">
                <button className="Button" onClick={() => navigate(graphicsInfo.button_link || graphicsInfo.buttonLink || "/contact")}>
                  {graphicsInfo.button_label || graphicsInfo.buttonLabel || "Request a Design"}
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Graphics;