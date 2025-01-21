import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmail = (to: string, subject: string, text: string): void => {
  const mailOptions = {
    from: 'elielajoinie24@gmail.com',
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error: any, info: { response: string; }) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
