import { FaTiktok, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

import "./Footer.css";
import { navData } from "../../../data";

const Footer = () => {
  const navigate = useNavigate();

  const goToTerms = () => navigate("/terms");
  const goToPrivacy = () => navigate("/privacy");

  return (
    <footer className="FooterContainer">
      <div className="FooterSection">
        <div className="FooterBrand">
          <img src="/logoImg.png" alt="Logo" />
        </div>

        <div className="Footer1">
          {/* Company Nav */}
          <div className="FooterCompany">
            <div className="FooterCompanyHeader">
              <h2>Company</h2>
            </div>
            <ul className="FooterMenu">
              {navData.map((items) => (
                <li key={items.id} className="FooterMenuItems">
                  <Link to={items.path} className="FooterMenuLinks">
                    {items.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="FooterQuick">
            <div className="FooterQuickHead">
              <h2>Legal</h2>
            </div>
            <div className="FooterQuickLinks">
              <button className="Button" onClick={goToTerms}>
                Terms & Conditions
              </button>
              <button className="Button" onClick={goToPrivacy}>
                Privacy Policy
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Contact & Socials */}
        <div className="Footer2">
          {/* Contact Us */}
          <div className="FooterContact">
            <div className="FooterContactHead">
              <h2>Contact Us</h2>
            </div>
            <div className="FooterContactLinks">
              <a
                href="https://wa.me/2348071802928?text=Hi%20Orvyn%20Media%2C%20I'm%20interested%20in%20a%20graphics%20design%20project.%20Here%20are%20the%20details%3A%0A-%20Type%20of%20design%3A%20%0A-%20What%20it's%20for%3A%20%0A-%20Any%20deadline%3A%20%0A-%20My%20name%3A"
              >
                <button className="ContactBtn">
                  Whatsapp <span><FaWhatsapp size={14} /></span>
                </button>
              </a>

              <a
                href="mailto:helloorvynmedia@gmail.com?subject=I%20just%20read%20the%20Terms%20and%20Conditions&body=Hi%20Orvyn%20Media%2C%0AI%20just%20read%20the%20terms%20and%20conditions%20and..."
              >
                <button className="ContactBtn">
                  Send A Mail{" "}
                  <span className="ContactIcons"><CiMail size={14} /></span>
                </button>
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="FooterSocials">
            <div className="FooterSocialsHead">
              <h2>socials</h2>
            </div>
            <div className="FooterSocialsLinks">
              <a
                href="https://www.instagram.com/orvynmedia"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="SocialBtn">
                  <span className="ContactIcons">Instagram <FaInstagram size={14} /></span>
                </button>
              </a>
              <a
                href="https://www.tiktok.com/@orvynmedia"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="SocialBtn">
                  <span className="ContactIcons">TikTok <FaTiktok size={14} /></span>
                </button>
              </a>
              <a
                href="https://x.com/orvynmedia"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="SocialBtn">
                  <span className="ContactIcons">Twitter <FaXTwitter size={14} /></span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Divider + Copyright */}
      <hr className="FooterDivider"/>
      <div className="FooterCopyright">
        <h2>© 2025 Orvyn Media. All rights reserved.</h2>
      </div>
    </footer>
  );
};

export default Footer;
