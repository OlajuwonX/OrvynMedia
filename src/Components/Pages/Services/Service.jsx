import { useState } from "react";
import "./Service.css";
import SMM from "../../PricingComponent/SMM/SMM";
import ADS from "../../PricingComponent/ADS/ADS";
import Content from "../../PricingComponent/Content/Content";
import Others from "../../PricingComponent/Others/Others";

const Service = () => {
  const [activeTab, setActiveTab] = useState("SMM");

  const renderContent = () => {
    switch (activeTab) {
      case "SMM":
        return <SMM />;
      case "ADS":
        return <ADS />;
      case "Content":
        return <Content />;
      case "Others":
        return <Others />;
      default:
        return null;
    }
  };
  return (
    <div className="ServiceContainer">
      <div className="PricingCard">
        <div className="PricingHeader">
          <h1>Affordable <span>pricing</span> tailored just for you.</h1>
          <h3>
            We're only one click away from delivering the best digital services
            your brand deserves.
          </h3>
        </div>
        <div className="PricingTab">
          <div className="TabButtons">
            <button
              className={`Button ${activeTab === "SMM" ? "active" : ""}`}
              onClick={() => setActiveTab("SMM")}
            >
              SMM
            </button>
            <button
              className={`Button ${activeTab === "ADS" ? "active" : ""}`}
              onClick={() => setActiveTab("ADS")}
            >
              ADS
            </button>
            <button
              className={`Button ${activeTab === "Content" ? "active" : ""}`}
              onClick={() => setActiveTab("Content")}
            >
              Content
            </button>
            <button
              className={`Button ${activeTab === "Others" ? "active" : ""}`}
              onClick={() => setActiveTab("Others")}
            >
              Others+
            </button>
          </div>
        </div>
        <div className="PricingContent">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Service;
