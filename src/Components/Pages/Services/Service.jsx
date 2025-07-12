import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import SMM from "../../PricingComponent/SMM/SMM";
import ADS from "../../PricingComponent/ADS/ADS";
import Content from "../../PricingComponent/Content/Content";
import Others from "../../PricingComponent/Others/Others";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { frequentData } from "../../../../data";
import "./Service.css";
import SEO from "../../SEO/SEO";
import ScrollReveal from "../../Animations/ScrollReveal";

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
    <>
      <SEO
        title="Orvyn Media | Services"
        description="Explore tailored digital services designed to amplify your brand, from content creation and social media management to web development and visual storytelling."
        image="https://www.orvynmedia.com/serviceScreen.png"
        url="https://www.orvynmedia.com/services"
      />

      <div className="ServiceContainer">
        <div className="PricingCard" ref={pricingRef}>
          <div className="PricingHeader">
            <ScrollReveal delay={0.1}>
              <h1>
                Affordable <span>pricing</span> tailored just for you.
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <h3>
                We're only one click away from delivering the best digital
                services your brand deserves.
              </h3>
            </ScrollReveal>
          </div>

          <div className="PricingTab">
            <ScrollReveal delay={0.3}>
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
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.4}>
            <div className="PricingContent">{renderContent()}</div>
          </ScrollReveal>
        </div>

        <div className="FrequentCard">
          <div className="FrequentWrap">
            <div className="FrequentIntro">
              <ScrollReveal delay={0.5}>
                <h1>Frequently Asked Questions</h1>
              </ScrollReveal>
              <ScrollReveal delay={0.6}>
                <h2>Some questions you might have</h2>
              </ScrollReveal>
            </div>

            <div className="FrequentContent">
              {frequentData.map(({ id, question, answer }) => (
                <ScrollReveal key={id} delay={0.6 * id * 0.1}>
                  <div className="FrequentItem">
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
                        {answer.map(({ text, highlight }, i) => {
                          if (highlight && text.includes(highlight)) {
                            const [before, after] = text.split(highlight);
                            return (
                              <p key={i}>
                                {before}
                                <span className="Highlight">{highlight}</span>
                                {after}
                              </p>
                            );
                          }
                          return <p key={i}>{text}</p>;
                        })}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
