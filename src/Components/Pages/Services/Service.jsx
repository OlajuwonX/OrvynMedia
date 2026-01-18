import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { tabsApi, cardsApi, faqsApi } from "../../../lib/supabase";
import SMM from "../../PricingComponent/SMM/SMM";
import ADS from "../../PricingComponent/ADS/ADS";
import Content from "../../PricingComponent/Content/Content";
import Others from "../../PricingComponent/Others/Others";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import "./Service.css";
import SEO from "../../SEO/SEO";
import ScrollReveal from "../../Animations/ScrollReveal";

const Service = () => {
  const location = useLocation();
  const pricingRef = useRef(null);

  const [activeTab, setActiveTab] = useState("SMM");
  const [activeSubTab, setActiveSubTab] = useState("Website Design & Development"); // Updated to match actual tab name
  const [openId, setOpenId] = useState(null);
  const [allTabs, setAllTabs] = useState([]); // All tabs from DB
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabData, setTabData] = useState({}); // Store card data for each tab
  const [tabsLoaded, setTabsLoaded] = useState(false);
  const [cardsLoaded, setCardsLoaded] = useState(false);
  const [faqsLoaded, setFaqsLoaded] = useState(false);

  const toggleAccordion = (id) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all tabs
        const tabsData = await tabsApi.getAll();
        setAllTabs(tabsData);
        setTabsLoaded(true);

        // Fetch all FAQs
        const faqsData = await faqsApi.getAll();
        setFaqs(faqsData);
        setFaqsLoaded(true);

        // Fetch cards for each tab
        const tabCards = {};
        for (const tab of tabsData) {
          const cards = await cardsApi.getByTab(tab.id);
          tabCards[tab.title] = cards;
        }
        setTabData(tabCards);
        setCardsLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        // Only set loading to false when all data is loaded
        if (tabsLoaded && cardsLoaded && faqsLoaded) {
          setLoading(false);
        } else {
          // Set loading to false after all promises resolve
          setLoading(false);
        }
      }
    };

    fetchData();
  }, []);

  // Update the activeSubTab when tabs are loaded to ensure it matches an actual sub-tab
  useEffect(() => {
    if (allTabs.length > 0 && !activeSubTab) {
      const othersTab = allTabs.find(t => t.title === "Others+");
      if (othersTab) {
        const subTabs = allTabs.filter(t => t.parent_id === othersTab.id);
        if (subTabs.length > 0) {
          setActiveSubTab(subTabs[0].title); // Set to first sub-tab
        }
      }
    }
  }, [allTabs]);

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      // Check if the hash is one of the known sub-tabs under Others+
      const othersTab = allTabs.find(t => t.title === "Others+");
      if (othersTab) {
        const subTabs = allTabs.filter(t => t.parent_id === othersTab.id);
        const subTabNames = subTabs.map(st => st.title);
        
        if (subTabNames.includes(hash)) {
          setActiveTab("Others+");
          setActiveSubTab(hash);
        } else if (hash === "Web" || hash === "Graphics") {
          // Map legacy names to actual names
          const nameMap = {
            "Web": "Website Design & Development",
            "Graphics": "Graphics Design"
          };
          setActiveTab("Others+");
          setActiveSubTab(nameMap[hash] || subTabNames[0]);
        } else {
          setActiveTab(hash);
        }
      } else {
        setActiveTab(hash);
      }

      setTimeout(() => {
        pricingRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location, allTabs]);

  // Map database tabs to the intended UI structure
  const getTabData = (tabName) => {
    // Map the expected tab names to actual database tab names
    const tabNameMap = {
      "SMM": "Social Media Management",
      "ADS": "Ads Management Packages",
      "Content": "ORVYN MEDIA MOBILE VIDEOGRAPHY RATES",
      "Others+": "Others+",
    };
    
    const actualTabName = tabNameMap[tabName] || tabName; // Use the provided name if not in map
    if (actualTabName) {
      return tabData[actualTabName] || [];
    }
    return [];
  };

  // Get sub-tabs under "Others+"
  const getSubTabData = (subTabName) => {
    // Look for the sub-tab that belongs to Others+
    const othersTab = allTabs.find(t => t.title === "Others+");
    if (!othersTab) return [];

    // Find the specific sub-tab under "Others+"
    const subTab = allTabs.find(t => t.title === subTabName && t.parent_id === othersTab.id);
    if (subTab) {
      return tabData[subTab.title] || [];
    }
    return [];
  };

  // Get all sub-tabs under "Others+"
  const getOthersSubTabs = () => {
    const othersTab = allTabs.find(t => t.title === "Others+");
    if (!othersTab) return [];
    
    return allTabs
      .filter(t => t.parent_id === othersTab.id)
      .sort((a, b) => a.order_position - b.order_position);
  };

  // Map tab titles to components
  const renderContent = () => {
    if (loading) {
      return (
        <div className="loading-skeleton">
          <div className="skeleton-header"></div>
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
      );
    }

    switch (activeTab) {
      case "SMM":
        return <SMM tabData={getTabData("SMM")} loading={!cardsLoaded} />;
      case "ADS":
        return <ADS tabData={getTabData("ADS")} loading={!cardsLoaded} />;
      case "Content":
        return <Content tabData={getTabData("Content")} loading={!cardsLoaded} />;
      case "Others+":
        return (
          <Others
            tabData={{
              Web: getSubTabData("Web"),
              Graphics: getSubTabData("Graphics")
            }}
            currentSubTab={activeSubTab}
            setCurrentSubTab={setActiveSubTab}
            subTabs={getOthersSubTabs()}
            loading={!cardsLoaded}
          />
        );
      default:
        return null;
    }
  };

  if (loading && Object.keys(tabData).length === 0) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading services...</p>
        </div>
      </div>
    );
  }

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
                {["SMM", "ADS", "Content", "Others+"].map((tab) => (
                  <button
                    key={tab}
                    className={`Button ${activeTab === tab ? "active" : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === "Others+" ? "Others+" : tab}
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
              {loading ? (
                // Skeleton loader for FAQs
                [...Array(5)].map((_, i) => (
                  <div key={i} className="skeleton-faq">
                    <div className="skeleton-faq-question"></div>
                    <div className="skeleton-faq-answer"></div>
                  </div>
                ))
              ) : (
                faqs.map((faq) => (
                  <ScrollReveal key={faq.id} delay={0.6 * faq.id * 0.1}>
                    <div className="FrequentItem">
                      <div
                        className="FrequentQuestion"
                        onClick={() => toggleAccordion(faq.id)}
                      >
                        <h3>{faq.question}</h3>
                        <span>
                          {openId === faq.id ? (
                            <CiCircleMinus size={24} />
                          ) : (
                            <CiCirclePlus size={24} />
                          )}
                        </span>
                      </div>

                      {openId === faq.id && (
                        <div className="FrequentAnswer">
                          {/* Handle different FAQ answer formats */}
                          {typeof faq.answer === 'string' ? (
                            <p>{faq.answer}</p>
                          ) : Array.isArray(faq.answer) ? (
                            faq.answer.map((part, i) => {
                              if (part.highlight) {
                                const [before, after] = part.text.split(part.highlight);
                                return (
                                  <p key={i}>
                                    {before}
                                    <span className="Highlight">{part.highlight}</span>
                                    {after}
                                  </p>
                                );
                              }
                              return <p key={i}>{part.text}</p>;
                            })
                          ) : (
                            <p>{JSON.stringify(faq.answer)}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </ScrollReveal>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;