import { useState } from "react";
import "./ContactForm.css";

const ContactForm = () => {
  const [selectedService, setSelectedService] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      location: e.target.location.value,
      selectedService,
      description,
    };

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormSuccess(true);
        setFormMessage("Form details sent successfully!");
        e.target.reset();
        setSelectedService("");
        setDescription("");
      } else {
        setFormSuccess(false);
        setFormMessage("❌ Failed to send. Please try again.");
      }
    } catch {
      setFormSuccess(false);
      setFormMessage("🚨 Error sending message. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ContactFormContainer">
      <div className="ContactFormHead">
        <h1>Prefer we reach out?</h1>
      </div>
      <form onSubmit={handleSubmit} className="ContactForm">
        <p>Fill in your details and we'll reach out as soon as possible.</p>

        <input type="text" name="name" placeholder="Full Name:" required />
        <input type="email" name="email" placeholder="Email Address:" required />
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
          <option value="Social Media Management">Social Media Management</option>
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

        <div className="ContactCardButtons">
          <button className="Button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Submit"}
          </button>
        </div>

        {formMessage && (
          <p className={`FormMessage ${formSuccess ? "success" : "error"}`}>
            {formMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
