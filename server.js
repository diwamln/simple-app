// server.js

// Impor objek app dari app.js
const app = require('./app'); 

const PORT = 4000;
const HOST = '0.0.0.0';

// start server
app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});
