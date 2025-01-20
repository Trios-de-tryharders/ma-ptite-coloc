import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "elielajoinie24@gmail.com",
    pass: "zwzl rmfx yytn qgqw",
  },
});

export const sendEmail = (to: string, subject: string, text: string): void => {
  const mailOptions = {
    from: 'elielajoinie24@gmail.com',
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
