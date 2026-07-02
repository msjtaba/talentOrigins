import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key');

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const jobTypePreference = formData.get('jobTypePreference') as string;
    const linkedinUrl = (formData.get('linkedinUrl') as string) || 'Not provided';
    const coverNote = formData.get('coverNote') as string;
    const file = formData.get('resume') as File;

    if (!fullName || !email || !jobTypePreference || !coverNote) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!file || file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Invalid file attachment' }, { status: 400 });
    }

    const recruiterEmail = process.env.RECRUITER_EMAIL || 'info@torigins.com';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'mohd.muttalib24@talentorigins.com';
    const buffer = Buffer.from(await file.arrayBuffer());

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: fromEmail,
        to: recruiterEmail,
        subject: `[New Candidate Application] ${fullName} — ${jobTypePreference}`,
        text: `Name: ${fullName}\nEmail: ${email}\nJob Type: ${jobTypePreference}\nLinkedIn: ${linkedinUrl}\n\nCover Note:\n${coverNote}`,
        attachments: [{ filename: file.name, content: buffer }],
      });
    } else {
      console.log('Mocking Candidate Application Email Send (RESEND_API_KEY is not defined):', {
        to: recruiterEmail,
        fullName,
        email,
        jobTypePreference,
        linkedinUrl,
        fileName: file.name,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
