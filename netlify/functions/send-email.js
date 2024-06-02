import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
})

const handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    // CORS Preflight
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': process.env.CLIENT_URL,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: ''
    }
  }

  try {
    const { name, senderEmail, message } = JSON.parse(event.body)

    const emailMessage = {
      text: `Name: ${name}\nEmail: ${senderEmail}\nMessage: ${message}`,
      from: `${name} <${senderEmail}>`,
      to: 'saidcueter11@gmail.com',
      subject: 'New Contact Request',
      html: `
        <html>
        <body>
          <h2>Contact Request from ${name}</h2>
          <p><strong>Email:</strong> ${senderEmail}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </body>
        </html>
      `
    }

    await transporter.sendMail(emailMessage)

    const successMailOptions = {
      from: 'Said Cueter <saidcueter11@gmail.com>',
      to: senderEmail,
      subject: 'Email Sent Successfully',
      text: `Hello ${name},\n\nYour email was successfully sent.`,
      html: `
        <html>
        <body>
          <h2>Hello ${name}</h2>
          <p>Your email was successfully sent.</p>
          <p>Thank you!</p>
        </body>
        </html>
      `
    }

    await transporter.sendMail(successMailOptions)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': process.env.CLIENT_URL
      },
      body: 'Email sent successfully'
    }
  } catch (error) {
    console.error('Failed to send email...', error)
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': process.env.CLIENT_URL
      },
      body: 'Failed to send email'
    }
  }
}

export { handler }
