import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const email = formData.get('email') as string | null;

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const fromEmail = process.env.FROM_EMAIL || 'Vibe Coding <noreply@yourdomain.com>';

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Welcome to The Vibe Academy',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: 'Space Grotesk', Arial, sans-serif; background-color: #0F172A; color: #F1F5F9; padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: #1E293B; border-radius: 12px; padding: 40px; border: 1px solid #334155;">
            <h1 style="color: #A78BFA; margin-bottom: 20px;">Welcome to The Vibe Academy</h1>
            <p style="color: #CBD5E1; line-height: 1.6; margin-bottom: 20px;">
              Thanks for signing up! You're now part of a community of builders who are creating revenue-generating apps in record time.
            </p>
            <p style="color: #CBD5E1; line-height: 1.6; margin-bottom: 20px;">
              Here's what you can expect:
            </p>
            <ul style="color: #CBD5E1; line-height: 1.8; margin-bottom: 30px;">
              <li>AI-powered development tips and tricks</li>
              <li>Marketing strategies that actually work</li>
              <li>App monetization insights</li>
              <li>Exclusive case studies and frameworks</li>
            </ul>
            <p style="color: #CBD5E1; line-height: 1.6;">
              Stay tuned for actionable insights delivered straight to your inbox.
            </p>
            <hr style="border: none; border-top: 1px solid #334155; margin: 30px 0;">
            <p style="color: #94a3b8; font-size: 14px;">
              You're receiving this because you signed up at https://www.thevibe.academy/
            </p>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    // Return success with redirect for form submission
    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
