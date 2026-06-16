import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body as {
      name: string
      email: string
      subject: string
      message: string
    }

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['ponkrishnan4@gmail.com'],
      reply_to: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family:system-ui,sans-serif;background:#0a0f1e;color:#f1f5f9;padding:32px;max-width:600px;margin:0 auto;">
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:32px;">
            <h2 style="margin:0 0 24px;background:linear-gradient(135deg,#00b4d8,#7b2ff7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">
              New Portfolio Contact
            </h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:8px 0;color:#94a3b8;width:80px;vertical-align:top;">From</td>
                <td style="padding:8px 0;color:#f1f5f9;font-weight:600;">${name}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#94a3b8;vertical-align:top;">Email</td>
                <td style="padding:8px 0;"><a href="mailto:${email}" style="color:#00b4d8;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#94a3b8;vertical-align:top;">Subject</td>
                <td style="padding:8px 0;color:#f1f5f9;">${subject}</td>
              </tr>
            </table>
            <div style="margin-top:24px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.08);">
              <p style="margin:0 0 8px;color:#94a3b8;font-size:14px;">Message</p>
              <p style="margin:0;color:#f1f5f9;line-height:1.7;white-space:pre-wrap;">${message}</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
