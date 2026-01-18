import { useNavigate } from "react-router-dom";
import "./Web.css";
import { FaCheck } from "react-icons/fa6";
import ScrollReveal from "../../Animations/ScrollReveal";

const Web = ({ tabData, loading = false }) => {
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

  // For Web tab, we expect the data to be in the first item
  const webInfo = tabData[0] || {};

  return (
    <section className="OtherDataContainer">
      <ScrollReveal delay={0.4}>
        <div className="OtherDataCard">
          <div className="OtherDataBack">
            <div className="TabDataGridOverlay"></div>
            <p>{webInfo.description || "Premium websites tailored to your brand, goals and user experience."}</p>
            <p>{webInfo.includes || "What We Offer:"}</p>
          </div>
          <div className="OtherDataWrap">
            {(webInfo.deliverables || webInfo.services || []).map((item, index) => (
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
                <button className="Button" onClick={() => navigate(webInfo.button_link || webInfo.buttonLink || "/contact")}>
                  {webInfo.button_label || webInfo.buttonLabel || "Get Started"}
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Web;