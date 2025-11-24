import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// =============== SEND EMAIL FUNCTION =================== //
export const sendVerificationEmail = async (to, token) => {
  const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  const htmlContent = `
      <h2>Email Verification</h2>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${verificationUrl}">Verify Email</a>
      <br><br>
      <p>If you did not create an account, please ignore this email.</p>
  `;

  try {
    await resend.emails.send({
      from: "College App <onboarding@resend.dev>",
      to: to,
      subject: "Verify your email",
      html: htmlContent,
    });

    console.log("📧 Verification email sent successfully");
  } catch (error) {
    console.error("❌ Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};
