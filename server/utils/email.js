
import { Resend } from "resend";

const sendEmail = async ({ to, subject, text, html }) => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  if (!from) {
    throw new Error("EMAIL_FROM is not configured.");
  }

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      subject,
      text,
      html,
    });

    if (error) {
      console.error("Resend API error:", error);
      throw new Error(error.message || "Unable to send email.");
    }

    console.log("Email accepted by Resend:", data.id);

    return data;
  } catch (error) {
    console.error("Email sending failed:", error.message);
    throw error;
  }
};

export default sendEmail;
