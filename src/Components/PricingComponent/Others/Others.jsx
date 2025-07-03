import React, { useState } from "react";
import Web from "../../PricingComponent/Web/Web";
import Graphics from "../../PricingComponent/Graphics/Graphics";

const Others = () => {
  const [activeTab, setActiveTab] = useState("SMM");

  const otherContent = () => {
    switch (activeTab) {
      case "Web":
        return <Web />;
      case "Graphics":
        return <Graphics />;
      default:
        return null;
    }
  };
  return (
    <div className="ServiceContainer">
      <div className="PricingCard">
        <div className="PricingHeader">
          <h1>I</h1>
          <h3>Done</h3>
        </div>
        <div className="TabButtons">
          <button
            className={`TabButton ${activeTab === "Web" ? "active" : ""}`}
            onClick={() => setActiveTab("Web")}
          >
             Web
          </button>
          <button
            className={`TabButton ${activeTab === "Graphics" ? "active" : ""}`}
            onClick={() => setActiveTab("Graphics")}
          >
            Graphics
          </button>
        </div>
        <div className="PricingContent">{otherContent()}</div>
      </div>
    </div>
  );
};

export default Others;
