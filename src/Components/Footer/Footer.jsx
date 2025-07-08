import { FaTiktok, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

import "./Footer.css";
import { navData } from "../../../data";
import ScrollReveal from "../Animations/ScrollReveal";

const Footer = () => {
  const navigate = useNavigate();

  const goToTerms = () => navigate("/terms");
  const goToPrivacy = () => navigate("/privacy");

  return (
    <footer className="FooterContainer">
      <div className="FooterSection">
        <div className="FooterBrand">
          <ScrollReveal delay={0.3}>
            <img src="/logoImg.png" alt="Logo" />
          </ScrollReveal>
        </div>

        <div className="Footer1">
          {/* Company Nav */}
          <div className="FooterCompany">
            <div className="FooterCompanyHeader">
              <ScrollReveal delay={0.9 * 0.1}>
                <h2>Company</h2>
              </ScrollReveal>
            </div>
            <ul className="FooterMenu">
              {navData.map((items, index) => (
                <ScrollReveal key={index} delay={0.9 * index * 0.2}>
                  <li key={items.id} className="FooterMenuItems">
                    <Link to={items.path} className="FooterMenuLinks">
                      {items.title}
                    </Link>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="FooterQuick">
            <div className="FooterQuickHead">
              <ScrollReveal delay={1}>
                <h2>Legal</h2>
              </ScrollReveal>
            </div>

            <div className="FooterQuickLinks">
              <ScrollReveal delay={1.1}>
                <button className="Button" onClick={goToTerms}>
                  Terms & Conditions
                </button>
              </ScrollReveal>
              <ScrollReveal delay={1.2}>
                <button className="Button" onClick={goToPrivacy}>
                  Privacy Policy
                </button>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Right Side - Contact & Socials */}
        <div className="Footer2">
          {/* Contact Us */}
          <div className="FooterContact">
            <div className="FooterContactHead">
              <ScrollReveal delay={1.3}>
                <h2>Contact Us</h2>
              </ScrollReveal>
            </div>
            <div className="FooterContactLinks">
              <ScrollReveal delay={1.4}>
                <a href="https://wa.me/2348071802928?text=Hi%20Orvyn%20Media%2C%20I'm%20interested%20in%20a%20graphics%20design%20project.%20Here%20are%20the%20details%3A%0A-%20Type%20of%20design%3A%20%0A-%20What%20it's%20for%3A%20%0A-%20Any%20deadline%3A%20%0A-%20My%20name%3A">
                  <button className="ContactBtn">
                    Whatsapp{" "}
                    <span>
                      <FaWhatsapp size={14} />
                    </span>
                  </button>
                </a>
              </ScrollReveal>
              <ScrollReveal delay={1.5}>
                <a href="mailto:helloorvynmedia@gmail.com?subject=I%20just%20read%20the%20Terms%20and%20Conditions&body=Hi%20Orvyn%20Media%2C%0AI%20just%20read%20the%20terms%20and%20conditions%20and...">
                  <button className="ContactBtn">
                    Send A Mail{" "}
                    <span className="ContactIcons">
                      <CiMail size={14} />
                    </span>
                  </button>
                </a>
              </ScrollReveal>
            </div>
          </div>

          {/* Social Links */}
          <div className="FooterSocials">
            <ScrollReveal delay={1.6}>
              <div className="FooterSocialsHead">
                <h2>socials</h2>
              </div>
            </ScrollReveal>
            <div className="FooterSocialsLinks">
              <ScrollReveal delay={1.7}>
                <a
                  href="https://www.instagram.com/orvynmedia"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="SocialBtn">
                    <span className="ContactIcons">
                      Instagram <FaInstagram size={14} />
                    </span>
                  </button>
                </a>
              </ScrollReveal>{" "}
              <ScrollReveal delay={1.8}>
                <a
                  href="https://www.tiktok.com/@orvynmedia"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="SocialBtn">
                    <span className="ContactIcons">
                      TikTok <FaTiktok size={14} />
                    </span>
                  </button>
                </a>
              </ScrollReveal>{" "}
              <ScrollReveal delay={1.9}>
                <a
                  href="https://x.com/orvynmedia"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="SocialBtn">
                    <span className="ContactIcons">
                      Twitter <FaXTwitter size={14} />
                    </span>
                  </button>
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>

      {/* Divider + Copyright */}
      <ScrollReveal delay={2}>
        <hr className="FooterDivider" />
        <div className="FooterCopyright">
          <h2>© 2025 Orvyn Media. All rights reserved.</h2>
        </div>
      </ScrollReveal>
    </footer>
  );
};

export default Footer;
