// app.js

const express = require('express');
const app = express();

// middleware untuk parse JSON
app.use(express.json());

// route GET
app.get('/', (req, res) => {
    res.send('Im Updating');
});

// route POST contoh
app.post('/test', (req, res) => {
    const data = req.body;
    res.json({ message: 'Data received', yourData: data });
});

// Export objek app agar bisa di-require oleh file server.js atau test.js
module.exports = app;
