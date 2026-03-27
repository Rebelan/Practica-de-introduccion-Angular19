
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/events', (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let counter = 0;

  const interval = setInterval(() => {
    counter++;
    res.write(`data: ${JSON.stringify({ counter, message: "Ping desde el servidor" })}\n\n`);
  }, 2000);

  req.on('close', () => {
    clearInterval(interval);
  });
});

app.listen(3001, () => console.log("✅ Servidor SSE funcionando en http://localhost:3001/events"));
