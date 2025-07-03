import { FaWhatsapp } from "react-icons/fa";

import "./Contact.css";
import ContactForm from "../../ContactForm/ContactForm";

const Contact = () => {
  return (
    <div className="ContactSection">
      <div className="ContactContainer">
        <div className="ContactHead">
          <h1>Discovery call?</h1>
        </div> 
        <div className="ContactCard">
          <div className="ContactImg">
            <img src="/book.jpg" alt="Book" />
            <p className="BookText">Start your free consultation</p>
            <p className="BookMinutes">30mins</p>
          </div>

          <div className="ContactCardButtons">
            <a href="tel:+2348122207090">
              <button className="Button">Call Us Now</button>
            </a>
            <a href="https://wa.me/2348071802928?text=Hi%20Orvyn%20Media%2C%20I'm%20interested%20in%20a%20graphics%20design%20project.%20Here%20are%20the%20details%3A%0A-%20Type%20of%20design%3A%20%0A-%20What%20it's%20for%3A%20%0A-%20Any%20deadline%3A%20%0A-%20My%20name%3A
">
              <button className="Button">Let's Chat <FaWhatsapp size={16}/></button>
            </a>
          </div>
        </div>
      </div>

      <ContactForm />
    </div>
  );
};

export default Contact;
