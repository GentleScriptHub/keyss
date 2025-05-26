const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

const keysUrl = "https://raw.githubusercontent.com/GentleScriptHub/Real-Key/main/Keys.json";

app.get("/getKey", async (req, res) => {
  try {
    const response = await fetch(keysUrl);
    if (!response.ok) throw new Error("Failed to fetch keys");

    const data = await response.json();
    const currentTime = Math.floor(Date.now() / 1000);

    const validKeys = data.filter(entry => {
      const expires = new Date(entry.expires).getTime() / 1000;
      return expires > currentTime;
    });

    if (validKeys.length === 0) {
      return res.status(404).json({ error: "No valid keys found" });
    }

    // ✅ Return full key and expiration info
    res.json({ keys: validKeys });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
