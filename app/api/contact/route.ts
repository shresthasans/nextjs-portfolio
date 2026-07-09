import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: 'Portfolio Contact <contact@sanjayshrestha.com>',
    to: 'dziner.sanjay@gmail.com',
    replyTo: email,
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
        <h2 style="margin-bottom:4px">New contact form submission</h2>
        <p style="color:#888;font-size:13px;margin-top:0">From your portfolio</p>
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
        <table style="width:100%;font-size:14px;border-collapse:collapse">
          <tr>
            <td style="padding:6px 0;color:#555;width:80px"><strong>Name</strong></td>
            <td style="padding:6px 0">${name}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#555"><strong>Email</strong></td>
            <td style="padding:6px 0"><a href="mailto:${email}" style="color:#b45309">${email}</a></td>
          </tr>
        </table>
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
        <p style="font-size:14px;line-height:1.6;white-space:pre-wrap">${message}</p>
      </div>
    `,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
