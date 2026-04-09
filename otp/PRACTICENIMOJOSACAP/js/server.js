const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

let otpStore = {};

/* EMAIL SETUP */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "villanuevagerald73@gmail.com",
    pass: "krncdvhwboknalrm"
  }
});

/* SEND OTP */
app.post("/send-otp", async (req, res) => {
  console.log("🔥 BACKEND HIT");

  const { email } = req.body;
  console.log("EMAIL:", email);

  if (!email) {
    return res.json({ success: false });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[email] = otp;

  try {
    await transporter.sendMail({
      from: "SugarLoomPh",
      to: email,
      subject: "OTP Code",
      text: `Your OTP is: ${otp}`
    });

    console.log("✅ EMAIL SENT:", otp);
    res.json({ success: true });

  } catch (err) {
    console.log("❌ ERROR:", err);
    res.json({ success: false });
  }
});

/* VERIFY */
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] == otp) {
    return res.json({ success: true });
  }

  res.json({ success: false });
});

app.get("/", (req, res) => {
  res.send("OK");
});

app.listen(5000, () => {
  console.log("🔥 Server running on port 5000");
});