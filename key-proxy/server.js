const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;

// Your hidden GitHub RAW key.json URL
const GITHUB_KEY_URL = "https://raw.githubusercontent.com/GentleScriptHub/yh/main/key.json";

app.get("/keys", async (req, res) => {
    try {
        const response = await axios.get(GITHUB_KEY_URL);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch key file." });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
