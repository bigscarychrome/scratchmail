// backend/index.js
import express from 'express';
import nodemailer from 'nodemailer';

const app = express();
app.use(express.json());

app.post('/send-email', async (req, res) => {
    const { to, subject, message } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'Gmail', // or another provider
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text: message,
        });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(3000, () => console.log('Email server running on port 3000'));
