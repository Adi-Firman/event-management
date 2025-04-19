import nodemailer from "nodemailer";

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
      from: `"Test App" <${process.env.SMTP_EMAIL}>`,
      to: "adifirman46@gmail.com", // ganti sesuai email tujuan test
      subject: "Hello from Event App",
      text: "Ini email testing dari project Event Management kamu",
    });

    console.log("Email terkirim:", info.response);
  } catch (error) {
    console.error("Gagal kirim email:", error);
  }
}

sendTestEmail();
