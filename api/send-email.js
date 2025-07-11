import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, phone, location, selectedService, description } = req.body;

    const { error } = await resend.emails.send({
      from: "Orvyn Media <hello@orvynmedia.com>",
      to: "helloorvynmedia@gmail.com",
      subject: "New Client Inquiry!",
      html: `
        <h2>New Inquiry from ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Service:</strong> ${selectedService}</p>
        <p><strong>Description:</strong> ${description}</p>
      `,
    });

    if (error) {
      return res.status(400).json({ error });
    }

    return res.status(200).json({ success: true });
  } catch ({ message }) {
    return res.status(500).json({ error: message });
  }
}