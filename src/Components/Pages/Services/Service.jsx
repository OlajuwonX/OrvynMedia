import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import SMM from "../../PricingComponent/SMM/SMM";
import ADS from "../../PricingComponent/ADS/ADS";
import Content from "../../PricingComponent/Content/Content";
import Others from "../../PricingComponent/Others/Others";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { frequentData } from "../../../../data";
import "./Service.css";

const Service = () => {
  const location = useLocation();
  const pricingRef = useRef(null);

  const [activeTab, setActiveTab] = useState("SMM");
  const [activeSubTab, setActiveSubTab] = useState("Web");
  const [openId, setOpenId] = useState(null);

  const toggleAccordion = (id) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      if (hash === "Web" || hash === "Graphics") {
        setActiveTab("Others");
        setActiveSubTab(hash);
      } else {
        setActiveTab(hash);
      }

      setTimeout(() => {
        pricingRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location]);

  const renderContent = () => {
    switch (activeTab) {
      case "SMM":
        return <SMM />;
      case "ADS":
        return <ADS />;
      case "Content":
        return <Content />;
      case "Others":
        return (
          <Others
            currentSubTab={activeSubTab}
            setCurrentSubTab={setActiveSubTab}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="ServiceContainer">
      <div className="PricingCard" ref={pricingRef}>
        <div className="PricingHeader">
          <h1>
            Affordable <span>pricing</span> tailored just for you.
          </h1>
          <h3>
            We're only one click away from delivering the best digital services
            your brand deserves.
          </h3>
        </div>

        <div className="PricingTab">
          <div className="TabButtons">
            {["SMM", "ADS", "Content", "Others"].map((tab) => (
              <button
                key={tab}
                className={`Button ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "Others" ? "Others+" : tab}
              </button>
            ))}
          </div>
        </div>

        <div className="PricingContent">{renderContent()}</div>
      </div>

      <div className="FrequentCard">
        <div className="FrequentWrap">
          <div className="FrequentIntro">
            <h1>Frequently Asked Questions</h1>
            <h2>Some questions you might have</h2>
          </div>

          <div className="FrequentContent">
            {frequentData.map(({ id, question, answer }) => (
              <div className="FrequentItem" key={id}>
                <div
                  className="FrequentQuestion"
                  onClick={() => toggleAccordion(id)}
                >
                  <h3>{question}</h3>
                  <span>
                    {openId === id ? (
                      <CiCircleMinus size={24} />
                    ) : (
                      <CiCirclePlus size={24} />
                    )}
                  </span>
                </div>
                {openId === id && (
                  <div className="FrequentAnswer">
                    <p>{answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
