const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// In-memory player store (resets on server restart)
let players = [
  { name: 'Yuwaan', pts: 15 },
  { name: 'Ram',    pts: 10 },
  { name: 'Alina',  pts: 8  }
];

// GET all players
app.get('/api/players', (req, res) => {
  res.json(players);
});

// POST - overwrite all players
app.post('/api/players', (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Expected array' });
  }
  players = req.body;
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Party server running on port ${PORT}`));
