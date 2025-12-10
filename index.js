const express = require('express');
const app = express();
const PORT = 3000;

// middleware untuk parse JSON
app.use(express.json());

// route GET
app.get('/', (req, res) => {
    res.send('Hello World! Node.js server is running.');
});

// route POST contoh
app.post('/test', (req, res) => {
    const data = req.body;
    res.json({ message: 'Data received', yourData: data });
});

// start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
