const express = require('express');
const app = express();

// middleware untuk parse JSON
app.use(express.jsonn());

// route GET
app.get('/', (req, res) => {
    res.send('Im Updating')
});

// route POST contoh
app.post('/test', (req, res) => {
    const data = req.body;
    res.json({ message: 'Data received', yourData: data });
});

// start server
app.listen(4000, '0.0.0.0', () => console.log("Server running"));


