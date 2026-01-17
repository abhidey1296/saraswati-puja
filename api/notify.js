import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Saraswati Puja 💛" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "She clicked YES 💛",
      text: "She clicked YES on your Saraswati Puja website.",
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Email failed" });
  }
}
