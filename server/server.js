const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const DB_PATH = 'ai_tools_sample_data.json';
const FAV_PATH = 'favourites.json';

app.use(cors());
app.use(express.json());

// Read main tools DB
async function readDB() {
  const raw = await fs.readFile(DB_PATH, 'utf-8');
  return JSON.parse(raw);
}

// Read favourites DB
async function readFavDB() {
  const raw = await fs.readFile(FAV_PATH, 'utf-8');
  return JSON.parse(raw);
}

// Write to favourites DB
async function writeFavDB(db) {
  await fs.writeFile(FAV_PATH, JSON.stringify(db,[]), 'utf-8');
}

// GET /api/tools?category=Writing
app.get('/api/tools', async (req, res) => {
  try {
    const db = await readDB();
    const { category } = req.query;

    if (category) {
      const filtered = db.filter(tool =>
        tool.category.toLowerCase() === category.toLowerCase()
      );
      return res.json(filtered);
    }

    res.json(db);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read tools data' });
  }
});

// GET /api/tools/favorites
app.get('/api/tools/favorites', async (req, res) => {
  try {
    const fav = await readFavDB();
    res.json(fav);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read favorites' });
  }
});

// POST /api/tools/favorites/:id
app.post('/api/tools/favorites/', async (req, res) => {
  try {
    const { toolId } = req.body;
    // console.log(req.body)
    const favdb = await readFavDB();

    if (favdb.includes(toolId)) {
      return res.status(400).json({ success: false, message: 'Already favorited' });
    }

    favdb.push(toolId);
    await writeFavDB(favdb);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add favorite' });
  }
});

// DELETE /api/tools/favorites/:toolId
app.delete('/api/tools/favorites/:toolId', async (req, res) => {
  try {
    const { toolId } = req.params; 
             // toolId is a string
    const favdb = await readFavDB();        // assume this returns an array of strings
  // Keep only those IDs that don't match the one to delete
    const updatedFavs = favdb.filter(fav => fav !== Number(toolId));
    // console.log(updatedFavs)
    await writeFavDB(updatedFavs);
    return res.json({ success: true });
  } catch (err) {
    console.error('Error removing favorite:', err);
    return res.status(500).json({ error: 'Failed to remove favorite' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
