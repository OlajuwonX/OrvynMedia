import { useState } from "react";

import "./ContactForm.css";

const ContactForm = () => {
  const [selectedService, setSelectedService] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div className="ContactFormContainer">
      <div className="ContactFormHead">
        <h1>Prefer we reach out?</h1>
      </div>
      <form
        action="https://formsubmit.co/helloorvynmedia@gmail.com"
        method="POST"
        className="ContactForm"
      >
        <p>Fill in your details and we'll reach out as soon as possible.</p>
        <input type="text" name="name" placeholder="Full Name:" required />
        <input
          type="email"
          name="email"
          placeholder="Email Address:"
          required
        />
        <input type="tel" name="phone" placeholder="Phone Number:" required />
        <input type="text" name="location" placeholder="Location:" required />
        <select
          id="selectedService"
          name="selectedService"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="FormSelect"
          required
        >
          <option value="" disabled>
            Select a service
          </option>
          <option value="Ads Management">Ads Management</option>
          <option value="Social Media Management">
            Social Media Management
          </option>
          <option value="Content Creation">Content Creation</option>
          <option value="Website Development">Web Development</option>
          <option value="Graphics Design">Brand Strategy</option>
        </select>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="serviceDescription"
          placeholder="Tell us what you need…"
          className="FormTextArea"
          required
        />

        <input type="hidden" name="_subject" value="New client inquiry!" />
        <input type="hidden" name="_captcha" value="false" />
        <input
          type="hidden"
          name="_next"
          value="https://orvynmedia.com/thank-you"
        />
        <input type="hidden" name="_subject" value="New Booking Inquiry" />

        <button className="Button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
