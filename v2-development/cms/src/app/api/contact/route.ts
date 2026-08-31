import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'http://localhost:5173',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields.' },
        { status: 400, headers: CORS_HEADERS },
      )
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Lycos Core Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || 'rudi@lycoscore.com',
      replyTo: email,
      subject: `Lycos Core Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nBottlenecks:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8a4bf3;">New Inquiry from Lycos Core</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <hr />
          <h3>Operational Bottlenecks:</h3>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    })

    return NextResponse.json(
      { success: true },
      { status: 200, headers: CORS_HEADERS },
    )
  } catch (err) {
    console.error('[Contact API Error]', err)
    return NextResponse.json(
      { success: false, error: 'Failed to send email. Please try again.' },
      { status: 500, headers: CORS_HEADERS },
    )
  }
}
