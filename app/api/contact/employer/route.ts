import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key');

export async function POST(req: NextRequest) {
  try {
    const { companyName, contactName, email, jobTitle, jobDescription } = await req.json();

    if (!companyName || !contactName || !email || !jobTitle || !jobDescription) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const recruiterEmail = process.env.RECRUITER_EMAIL || 'info@torigins.com';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'mohd.muttalib24@talentorigins.com';

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: fromEmail,
        to: recruiterEmail,
        subject: `[New Employer Lead] ${companyName} — ${contactName}`,
        text: `Company Name: ${companyName}\nContact Person: ${contactName}\nEmail: ${email}\nJob Title / Role: ${jobTitle}\n\nJob Description:\n${jobDescription}`,
      });
    } else {
      console.log('Mocking Employer Lead Email Send (RESEND_API_KEY is not defined):', {
        to: recruiterEmail,
        companyName,
        contactName,
        email,
        jobTitle,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
