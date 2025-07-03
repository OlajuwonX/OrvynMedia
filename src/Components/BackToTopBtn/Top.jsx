import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import "./Top.css";

const TopBtn = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    showButton && (
      <button className="BackToTopBtn" onClick={scrollToTop}>
        <FaArrowUp/>
      </button>
    )
  );
};

export default TopBtn;
