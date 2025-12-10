const express = require('express');
const app = express();

// middleware untuk parse JSON
app.use(express.json());

// route GET
app.get('/', (req, res) => {
    res.send('Hello World! Node.js server is running.... ngecek pipeline3');
});

// route POST contoh
app.post('/test', (req, res) => {
    const data = req.body;
    res.json({ message: 'Data received', yourData: data });
});

// start server
app.listen(3000, '0.0.0.0', () => console.log("Server running"));


