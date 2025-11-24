
const Resend = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const sendVerificationEmail = async (email, verificationToken, name) => {
  const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
  const verificationUrl = `${baseUrl}/verify-email?token=${verificationToken}`;

  try {
    const result = await resend.emails.send({
      from: process.env.MAIL_FROM || 'noreply@college-system.com',
      to: email,
      subject: 'Verify Your Email - College Management System',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Hello ${name}!</h2>
          <p>Please verify your email by clicking the link below:</p>
          <a href="${verificationUrl}">Verify Email</a>
        </div>
      `
    });

    console.log('Verification email sent, id:', result.id); // result.id is valid here
    return { success: true, id: result.id };
  } catch (error) {
    console.error('Error sending verification email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = { sendVerificationEmail };
