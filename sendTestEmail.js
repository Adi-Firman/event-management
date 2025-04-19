const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

async function sendTestEmail() {
  try {
    const info = await transporter.sendMail({
      from: `"Event App" <${process.env.SMTP_EMAIL}>`,
      to: "youremail@gmail.com", // ganti ke email kamu sendiri
      subject: "Test Email dari Event App",
      text: "Hello! Ini email percobaan dari project event kamu.",
    });

    console.log("Email terkirim:", info.response);
  } catch (err) {
    console.error("Gagal kirim email:", err);
  }
}

sendTestEmail();
