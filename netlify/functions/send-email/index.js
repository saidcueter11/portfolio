import { SMTPClient } from 'emailjs'
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import awsServerlessExpress from 'aws-serverless-express'

dotenv.config()

const app = express()

app.use(express.json())

const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

const client = new SMTPClient({
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASSWORD,
  host: process.env.EMAIL_HOST,
  ssl: true
})

app.post('/send-email', async (req, res) => {
  try {
    const { name, senderEmail, message } = req.body

    const emailMessage = {
      text: `Name: ${name}\nEmail: ${senderEmail}\nMessage: ${message}`,
      from: `${name} <${senderEmail}>`,
      to: 'saidcueter11@gmail.com',
      subject: 'New Contact Request',
      attachment: [
        {
          data: `
                    <html>
                    <body>
                        <h2>Contact Request from ${name}</h2>
                        <p><strong>Email:</strong> ${senderEmail}</p>
                        <p><strong>Message:</strong></p>
                        <p>${message}</p>
                    </body>
                    </html>
                `,
          alternative: true
        }
      ]
    }

    await sendEmail(emailMessage)
    await sendSuccessEmail(name, senderEmail)

    res.status(200).send('Email sent successfully')
  } catch (error) {
    console.error('Failed to send email...', error)
    res.status(500).send('Failed to send email')
  }
})

function sendEmail (emailMessage) {
  return new Promise((resolve, reject) => {
    client.send(emailMessage, (err, message) => {
      if (err) {
        reject(err)
      } else {
        resolve(message)
      }
    })
  })
}

function sendSuccessEmail (name, senderEmail) {
  const successMessage = {
    text: `Hello ${name},\n\nYour email was successfully sent.`,
    from: 'Said Cueter <saidcueter11@gmail.com>',
    to: senderEmail,
    subject: 'Email Sent Successfully',
    attachment: [
      {
        data: `
                    <html>
                    <body>
                        <h2>Hello ${name}</h2>
                        <p>Your email was successfully sent.</p>
                        <p>Thank you!</p>
                    </body>
                    </html>
                `,
        alternative: true
      }
    ]
  }

  return sendEmail(successMessage)
}

const server = awsServerlessExpress.createServer(app)
export const handler = (event, context) => awsServerlessExpress.proxy(server, event, context)
