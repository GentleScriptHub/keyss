const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// URL to your actual keys JSON on GitHub
const keysUrl = "https://raw.githubusercontent.com/GentleScriptHub/Real-Key/refs/heads/main/Keys.json";

app.get("/getKey", async (req, res) => {
  try {
    const response = await fetch(keysUrl);
    if (!response.ok) throw new Error("Failed to fetch keys");

    const data = await response.json();

    const currentTime = Math.floor(Date.now() / 1000);

    // Filter keys that are still valid (not expired)
    const validKeys = data.filter(entry => {
      const expires = new Date(entry.expires).getTime() / 1000;
      return expires > currentTime;
    });

    if (validKeys.length === 0) {
      return res.status(404).json({ error: "No valid keys found" });
    }

    // Send just the first valid key
    res.json({ key: validKeys[0].key });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
