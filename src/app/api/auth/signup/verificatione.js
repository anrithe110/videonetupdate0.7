import nodemailer from "nodemailer";
export async function sendMail(email, CODE) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
      user: process.env.MAIL_EMAIL,
      pass: process.env.MAIL_PW,
    },
  });
  try {
    await transporter.sendMail({
      from: '"Message bot"<videonet@gmail.com>',
      to: `${email}`,
      subject: `Message for verification`,
      html: `<h1>Welcome to Videonet </h1> 
      <h1> verification code: ${CODE}</h1> `,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
export async function randomCode() {
  const codeLength = 4;
  const characters = "0123456789";
  let code = "";
  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
}
