import nodemailer from 'nodemailer';

// Create transporter - configure for Hostinger / Gmail / etc
const createTransporter = () => {
  // For production, use real SMTP
  // For demo, uses Ethereal or console log
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }
  
  // Mock transporter for demo / XAMPP without SMTP
  return {
    sendMail: async (options) => {
      console.log('📧 Mock Email Sent:');
      console.log(`To: ${options.to}`);
      console.log(`Subject: ${options.subject}`);
      console.log(`HTML: ${options.html?.substring(0, 200)}...`);
      return { messageId: `mock_${Date.now()}` };
    }
  };
};

export const sendEmail = async ({ to, subject, html, type = 'general', userId = null, pool = null }) => {
  try {
    const transporter = createTransporter();
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"CodeMaster Pro" <noreply@codemaster.pro>',
      to,
      subject,
      html
    });

    // Log to DB if pool provided
    if (pool) {
      try {
        await pool.query(
          'INSERT INTO email_logs (user_id, email, subject, type, status) VALUES (?, ?, ?, ?, ?)',
          [userId, to, subject, type, 'sent']
        );
      } catch {}
    }

    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error('Email failed:', err.message);
    return { success: false, error: err.message };
  }
};

// Email templates
export const emailTemplates = {
  welcome: (name) => `
    <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #2563eb, #7c3aed); padding: 30px; border-radius: 16px 16px 0 0; color: white; text-align: center;">
        <h1 style="margin:0; font-size: 28px;">Welcome to CodeMaster Pro! 🚀</h1>
      </div>
      <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: 0; border-radius: 0 0 16px 16px;">
        <p>Hi ${name},</p>
        <p>You're now part of 50,000+ developers learning to code like a pro!</p>
        <p><strong>What's next?</strong></p>
        <ul>
          <li>✅ Explore 20+ courses (React, Node, MySQL, DSA)</li>
          <li>✅ Download 150+ premium notes</li>
          <li>✅ Take quizzes and earn certificates</li>
          <li>✅ Join live classes</li>
          <li>✅ Try AI Tutor & Code Playground</li>
        </ul>
        <a href="http://localhost:5173/courses" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 20px;">Start Learning</a>
        <p style="margin-top: 30px; color: #6b7280; font-size: 12px;">Made for Bhopal, IN 🇮🇳 • XAMPP MySQL Ready • Razorpay Integrated</p>
      </div>
    </div>
  `,
  
  certificate: (name, courseTitle, certId) => `
    <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #f59e0b, #ef4444); padding: 30px; border-radius: 16px 16px 0 0; color: white; text-align: center;">
        <h1>🏆 Certificate Earned!</h1>
      </div>
      <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: 0; border-radius: 0 0 16px 16px;">
        <p>Congratulations ${name}!</p>
        <p>You've successfully completed <strong>${courseTitle}</strong></p>
        <p>Certificate ID: <code>${certId}</code></p>
        <p>Verify at: https://codemaster.pro/verify/${certId}</p>
        <a href="http://localhost:5173/certificates" style="display: inline-block; background: #000; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 20px;">View Certificate</a>
        <p style="margin-top: 20px;">Share on LinkedIn and get noticed by recruiters!</p>
      </div>
    </div>
  `,
  
  paymentSuccess: (name, plan, amount) => `
    <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 30px; border-radius: 16px 16px 0 0; color: white; text-align: center;">
        <h1>Payment Successful! 💳</h1>
      </div>
      <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: 0; border-radius: 0 0 16px 16px;">
        <p>Hi ${name},</p>
        <p>Your payment of <strong>₹${amount}</strong> for <strong>${plan.toUpperCase()}</strong> membership is confirmed!</p>
        <p>You now have access to:</p>
        <ul>
          <li>All premium courses</li>
          <li>Premium notes & cheat sheets</li>
          <li>AI Tutor unlimited</li>
          <li>Live classes</li>
          <li>Certificates</li>
        </ul>
        <a href="http://localhost:5173/dashboard" style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 20px;">Go to Dashboard</a>
      </div>
    </div>
  `
};
