import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ── Gmail SMTP transporter ────────────────────────────────────────────────────
// Requires GMAIL_USER and GMAIL_APP_PASSWORD in .env.local
// Get an App Password at: https://myaccount.google.com/apppasswords
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const otpStore = new Map<string, { otp: string; expires: number }>();

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const otp     = generateOTP();
    const expires = Date.now() + 10 * 60 * 1000; // 10 minutes

    otpStore.set(email, { otp, expires });

    await transporter.sendMail({
      from:    `"Deric Jojo" <${process.env.GMAIL_USER}>`,
      to:      email,
      subject: 'Your verification code',
      html: `
        <div style="font-family:sans-serif;max-width:420px;margin:0 auto;padding:32px;">
          <p style="font-size:14px;color:#666;margin:0 0 8px;">Your one-time code</p>
          <p style="font-size:48px;font-weight:700;letter-spacing:8px;color:#0a0a0a;margin:0 0 24px;">${otp}</p>
          <p style="font-size:13px;color:#888;margin:0;">Expires in 10 minutes. If you didn't request this, ignore this email.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('OTP send error:', e);
    return NextResponse.json({ error: 'Failed to send verification code' }, { status: 500 });
  }
}

export { otpStore };