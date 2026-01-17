import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // REQUIRED
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify(); // 🔥 This line catches auth issues early

    await transporter.sendMail({
      from: `"Saraswati Puja 💛" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "She clicked YES 💛",
      text: "She clicked YES on your Saraswati Puja website.",
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
}
