const express = require('express');
const app = express();

/**
 * 🔥 REQUEST LOGGING (HARUS PALING ATAS)
 */
app.use((req, res, next) => {
  console.log(JSON.stringify({
    service: "simple-app",
    method: req.method,
    path: req.originalUrl,
    ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    user_agent: req.headers['user-agent'],
    time: new Date().toISOString()
  }))
  next()
})

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('adapa sihsfihfishfifhsiili jooooookowi');
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

module.exports = app;
