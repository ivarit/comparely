
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { scrapePrices } = require('./utils/scraper');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/search', async (req, res) => {
    const query = req.query.query;
    if (!query) return res.status(400).json({ error: 'Query parameter is required.' });

    try {
        const results = await scrapePrices(query);
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Scraping failed.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
