import { SMTPClient } from 'emailjs'
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import serverless from 'serverless-http'

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

app.post('/send-email', (req, res) => {
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

  client.send(emailMessage, (err, message) => {
    if (err) {
      console.error('Failed to send email...', err)
      res.status(500).send('Failed to send email')
    } else {
      console.log('Email sent successfully!', message)
      sendSuccessEmail(name, senderEmail)
      res.status(200).send('Email sent successfully')
    }
  })
})

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

  client.send(successMessage, (err, message) => {
    if (err) {
      console.error('Failed to send success email...', err)
    } else {
      console.log('Success email sent successfully!', message)
    }
  })
}

app.use('/.netlify/functions/send-email', app)

module.exports.handler = serverless(app)
