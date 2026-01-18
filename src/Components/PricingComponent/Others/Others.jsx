import Web from "../Web/Web";
import Graphics from "../Graphics/Graphics";
import "./Others.css";

const Others = ({ tabData, currentSubTab, setCurrentSubTab, subTabs = [], loading = false }) => {
  const renderContent = () => {
    if (loading) {
      return (
        <div className="loading-spinner-others">
          <div className="spinner"></div>
          <p>Loading content...</p>
        </div>
      );
    }

    // For any sub-tab, we'll use a generic component approach
    // If it's Web or Graphics, use the specific components, otherwise use a generic one
    
    if (currentSubTab === "Website Design & Development") {
      return <Web tabData={tabData[currentSubTab] || []} loading={false} />;
    } else if (currentSubTab === "Graphics Design") {
      return <Graphics tabData={tabData[currentSubTab] || []} loading={false} />;
    } else {
      // For other sub-tabs like "Picture Edits" or "UI/UX", determine the structure
      const subTabData = tabData[currentSubTab] || [];
      
      if (!subTabData || subTabData.length === 0) {
        return (
          <section className="TabDataContainer">
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

      // Determine the structure based on the data format
      // If the first item has a "deliverables" array of objects with "title" and "text", use OtherDataContainer structure
      const firstItem = subTabData[0];
      const hasServiceStructure = firstItem && 
        Array.isArray(firstItem.deliverables) && 
        firstItem.deliverables.length > 0 && 
        typeof firstItem.deliverables[0] === 'object' && 
        firstItem.deliverables[0].hasOwnProperty('title') && 
        firstItem.deliverables[0].hasOwnProperty('text');

      if (hasServiceStructure) {
        // Use OtherDataContainer structure (like Web/Graphics) but without H2 header
        const serviceInfo = firstItem || {};
        
        return (
          <section className="OtherDataContainer">
            <div>
              <div className="OtherDataCard">
                <div className="OtherDataBack">
                  <div className="TabDataGridOverlay"></div>
                  <p>{serviceInfo.description || "Service description coming soon."}</p>
                  <p>{serviceInfo.includes || "What we offer:"}</p>
                </div>
                <div className="OtherDataWrap">
                  {(serviceInfo.deliverables || []).map((item, index) => (
                    <div key={index}>
                      <div className="OtherDataDeliverables">
                        <h3>
                          <span className="Check">✓</span> {item.title || item.name || item.service || ''}
                        </h3>
                        <p>{item.description || item.text || item.details || ''}</p>
                      </div>
                    </div>
                  ))}
                  <div>
                    <div className="OtherDataButton">
                      <button className="Button" onClick={() => window.location.href = serviceInfo.button_link || serviceInfo.buttonLink || "/contact"}>
                        {serviceInfo.button_label || serviceInfo.buttonLabel || "Get Started"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      } else {
        // Use TabDataContainer structure (like SMM/ADS/Content) but without H2 header
        return (
          <section className="TabDataContainer">
            <div className="TabDataWrapper">
              {subTabData.map((pack, index) => (
                <div className="TabDataPack" key={index}>
                  <div className="TabDataBack">
                    <div className="TabDataGridOverlay"></div>
                    <h3>{pack.tier || pack.title || 'Package'}</h3>
                    <p className="TabDataTagLine">{pack.tagline || pack.description || ''}</p>
                    <p className="TabDataPrepTime">Prep - Time: {pack.prep_time || pack.duration || 'N/A'}</p>
                  </div>
                  <ul className="TabDataDeliverables">
                    {(pack.deliverables || []).map((item, i) => (
                      <li key={i}>
                        <span className="Check">✓ </span>
                        {typeof item === 'string' ? item : item.name || item.title || item.description || ''}
                      </li>
                    ))}
                  </ul>
                  <div className="TagDataBtn">
                    <button
                      className="Button"
                      onClick={() => window.location.href = pack.button_link || pack.buttonLink || "/contact"}
                    >
                      {pack.button_label || pack.buttonLabel || 'Get Started'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      }
    }
  };

  return (
    <section className="OthersContainer">
      <div className="OthersCard">
        <div className="OthersButtons">
          {subTabs.map((subTab) => (
            <button
              key={subTab.id}
              className={`TabButton ${currentSubTab === subTab.title ? "active" : ""}`}
              onClick={() => setCurrentSubTab(subTab.title)}
            >
              {subTab.title}
            </button>
          ))}
        </div>
        <div className="PricingContent">{renderContent()}</div>
      </div>
    </section>
  );
};

export default Others;