import { FaWhatsapp } from "react-icons/fa";

import ContactForm from "../../ContactForm/ContactForm";
import "./Contact.css";
import SEO from "../../SEO/SEO";
import ScrollReveal from "../../Animations/ScrollReveal";

const Contact = () => {
  return (
    <>
      <SEO
        title="Orvyn Media | Contact"
        description="Get in touch with Orvyn Media, we're ready to bring your digital vision to life. Let's start the conversation."
        image="https://www.orvynmedia.com/contactScreen.png"
        url="https://www.orvynmedia.com/contact"
      />

      <div className="ContactSection">
        <ScrollReveal delay={0.1}>
          <div className="ContactContainer">
            <div className="ContactHead">
              <h1>Discovery call</h1>
            </div>
            <div className="ContactCard">
              <div className="ContactImg">
                <img src="/book.jpg" alt="Book" />
                <p className="BookText">Start your free consultation</p>
                <p className="BookMinutes">30mins</p>
              </div>

              <div className="ContactCardButtons">
                <a href="tel:+2348071802928">
                  <button className="Button">Call Us Now</button>
                </a>
                <a href="https://wa.link/i0alen">
                  <button className="Button">
                    Let's Chat <FaWhatsapp size={16} />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <ContactForm />
        </ScrollReveal>
      </div>
    </>
  );
};

export default Contact;
