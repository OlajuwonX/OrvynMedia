import Web from "../../PricingComponent/Web/Web";
import Graphics from "../../PricingComponent/Graphics/Graphics";
import "./Others.css";

const Others = ({ currentSubTab, setCurrentSubTab }) => {
  const renderContent = () => {
    switch (currentSubTab) {
      case "Web":
        return <Web />;
      case "Graphics":
        return <Graphics />;
      default:
        return null;
    }
  };

  return (
    <div className="OthersContainer">
      <div className="OthersCard">
        <div className="OthersButtons">
          <button
            className={`TabButton ${currentSubTab === "Web" ? "active" : ""}`}
            onClick={() => setCurrentSubTab("Web")}
          >
            Web
          </button>
          <button
            className={`TabButton ${currentSubTab === "Graphics" ? "active" : ""}`}
            onClick={() => setCurrentSubTab("Graphics")}
          >
            Graphics
          </button>
        </div>
        <div className="PricingContent">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Others;
