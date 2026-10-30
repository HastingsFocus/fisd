
import "dotenv/config";
import sendEmail from "../utils/email.js";

const testEmail = async () => {
  try {
    const result = await sendEmail({
      to: process.env.TEST_EMAIL,
      subject: "FISDEV CMS Email Test",
      text: "Your FISDEV CMS email service is working.",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>FISDEV CMS</h2>
          <p>Your email integration is working successfully!</p>
          <p>You can now proceed with testing invitations.</p>
        </div>
      `,
    });

    console.log("Test email submitted successfully:", result.id);
  } catch (error) {
    console.error("Test email failed:", error.message);
    process.exitCode = 1;
  }
};

testEmail();
