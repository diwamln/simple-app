// app.js
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('apps versi 3, deploy success jir'); // Konten bebas diganti
});

app.post('/test', (req, res) => {
    res.json({
        message: 'Data received',
        yourData: req.body
    });
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});


// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});





// Export app tanpa listen (untuk testing)
module.exports = app;
