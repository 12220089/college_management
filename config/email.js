require('dotenv').config(); // Make sure .env is loaded

// ✅ Correct import for Resend SDK
const Resend = require("resend").default;
const resend = new Resend(process.env.RESEND_API_KEY);

// ======================= SEND VERIFICATION EMAIL ========================= //
const sendVerificationEmail = async (email, verificationToken, name) => {
  const baseUrl = process.env.BASE_URL || "http://localhost:10000";
  const verificationUrl = `${baseUrl}/verify-email?token=${verificationToken}`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #4f46e5, #7c3aed); color: white; padding: 20px; text-align: center;">
        <h1>College Management System</h1>
      </div>
      <div style="padding: 30px; background: #f8fafc;">
        <h2 style="color: #4f46e5;">Hello ${name}!</h2>
        <p>Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="background: #4f46e5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Verify Email Address
          </a>
        </div>
        <p>If the button doesn't work, copy this link:<br>
          <a href="${verificationUrl}" style="color: #4f46e5;">${verificationUrl}</a>
        </p>
        <p style="color: #6b7280; font-size: 14px;">This link expires in 24 hours.</p>
      </div>
      <div style="background: #f1f5f9; padding: 20px; text-align: center; color: #6b7280; font-size: 12px;">
        <p>&copy; 2025 College Management System</p>
      </div>
    </div>
  `;

  try {
    const result = await resend.emails.send({
      from: process.env.MAIL_FROM || "College App <onboarding@resend.dev>",
      to: email,
      subject: "Verify Your Email",
      html: htmlContent,
    });

    console.log("Verification email sent, id:", result.id);
    return { success: true, id: result.id };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return { success: false, error: error.message };
  }
};

// ======================= SEND PASSWORD RESET EMAIL ========================= //
const sendPasswordResetEmail = async (email, resetToken, name) => {
  const baseUrl = process.env.BASE_URL || "http://localhost:10000";
  const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #4f46e5, #7c3aed); color: white; padding: 20px; text-align: center;">
        <h1>College Management System</h1>
      </div>
      <div style="padding: 30px; background: #f8fafc;">
        <h2 style="color: #4f46e5;">Hello ${name || ""}</h2>
        <p>Click the button below to reset your password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background: #4f46e5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Reset Password
          </a>
        </div>
        <p>If the button doesn't work, copy this link:<br>
          <a href="${resetUrl}" style="color: #4f46e5;">${resetUrl}</a>
        </p>
        <p style="color: #6b7280; font-size: 14px;">This link expires in 1 hour.</p>
      </div>
      <div style="background: #f1f5f9; padding: 20px; text-align: center; color: #6b7280; font-size: 12px;">
        <p>&copy; 2025 College Management System</p>
      </div>
    </div>
  `;

  try {
    const result = await resend.emails.send({
      from: process.env.MAIL_FROM || "College App <onboarding@resend.dev>",
      to: email,
      subject: "Reset Your Password - College Management System",
      html: htmlContent,
    });

    console.log("Password reset email sent, id:", result.id);
    return { success: true, id: result.id };
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return { success: false, error: error.message };
  }
};

module.exports = { sendVerificationEmail, sendPasswordResetEmail };
