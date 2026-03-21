import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { otpStore } from '../send-otp/route';

export async function POST(req: NextRequest) {
  try {
    const { email, otp, subject, body } = await req.json();

    if (!email || !otp || !subject || !body) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Verify OTP
    const record = otpStore.get(email);

    if (!record) {
      return NextResponse.json({ error: 'No OTP found — request a new one' }, { status: 400 });
    }
    if (Date.now() > record.expires) {
      otpStore.delete(email);
      return NextResponse.json({ error: 'OTP expired — request a new one' }, { status: 400 });
    }
    if (record.otp !== otp.trim()) {
      return NextResponse.json({ error: 'Incorrect code' }, { status: 400 });
    }

    // OTP valid — instantiate Resend here so env var is available at runtime
    const resend = new Resend(process.env.RESEND_API_KEY);
    otpStore.delete(email);

    await resend.emails.send({
      from:    'Portfolio Contact <onboarding@resend.dev>',
      to:      'dericjojo8@gmail.com',
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;">
          <p style="font-size:12px;color:#888;margin:0 0 4px;">From</p>
          <p style="font-size:15px;color:#0a0a0a;margin:0 0 20px;">${email}</p>
          <p style="font-size:12px;color:#888;margin:0 0 4px;">Subject</p>
          <p style="font-size:15px;font-weight:600;color:#0a0a0a;margin:0 0 20px;">${subject}</p>
          <p style="font-size:12px;color:#888;margin:0 0 4px;">Message</p>
          <p style="font-size:15px;color:#0a0a0a;line-height:1.7;margin:0;white-space:pre-wrap;">${body}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}