import { useNavigate } from "react-router-dom";
import "./SMM.css";
import { FaCheck } from "react-icons/fa6";
import ScrollReveal from "../../Animations/ScrollReveal";

const SMM = ({ tabData, loading = false }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <section className="TabDataContainer">
        <div className="TabDataHeader">
          <ScrollReveal delay={0.3}>
            <h2>Social Media Management</h2>
          </ScrollReveal>
        </div>
        <div className="TabDataWrapper">
          <div className="skeleton-packages">
            {[...Array(3)].map((_, i) => (
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
      </section>
    );
  }

  // If no dynamic data, show a message
  if (!tabData || tabData.length === 0) {
    return (
      <section className="TabDataContainer">
        <div className="TabDataHeader">
          <ScrollReveal delay={0.3}>
            <h2>Social Media Management</h2>
          </ScrollReveal>
        </div>
        <div className="TabDataWrapper">
          <div className="TabDataPack">
            <div className="TabDataBack">
              <div className="TabDataGridOverlay"></div>
              <h3>No packages available</h3>
              <p className="TabDataTagLine">Please add packages in the admin panel</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="TabDataContainer">
      <div className="TabDataHeader">
        <ScrollReveal delay={0.3}>
          <h2>Social Media Management</h2>
        </ScrollReveal>
      </div>
      <div className="TabDataWrapper">
        {tabData.map((pack, index) => (
          <ScrollReveal key={index} delay={0.4 * index * 0.1}>
            <div className="TabDataPack" key={index}>
              <div className="TabDataBack">
                <div className="TabDataGridOverlay"></div>
                <h3>{pack.tier || pack.title || 'Package'}</h3>
                <p className="TabDataTagLine">{pack.tagline || pack.description || ''}</p>
                <p className="TabDataPrepTime">Prep - Time: {pack.prep_time || pack.duration || 'N/A'}</p>
              </div>
              <ul className="TabDataDeliverables">
                {(pack.deliverables || pack.features || []).map((item, i) => (
                  <li key={i}>
                    <span className="Check">
                      <FaCheck />
                    </span>{" "}
                    {typeof item === 'string' ? item : item.name || item.title || item.description || ''}
                  </li>
                ))}
              </ul>
              <div className="TagDataBtn">
                <button
                  className="Button"
                  onClick={() => navigate(pack.button_link || pack.buttonLink || "/contact")}
                >
                  {pack.button_label || pack.buttonLabel || 'Get Started'}
                </button>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default SMM;