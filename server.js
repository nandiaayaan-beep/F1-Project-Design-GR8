const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const SUPABASE_URL = "https://tdoiwxffaoxexompcqmp.supabase.co/rest/v1/feedback";
const API_KEY = "sb_publishable_YBxg6PdcA9I9_b5efyupmg_FbUI3fqg"; // paste your publishable key

app.post("/submit-feedback", async (req, res) => {
  const { name, email, feedback } = req.body;

  try {
    const response = await fetch(SUPABASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": API_KEY,
        "Authorization": `Bearer ${API_KEY}`,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({ name, email, feedback })
    });

    if (!response.ok) {
      return res.status(500).send("Error saving data");
    }

    res.send("Feedback saved!");
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.listen(3000, () => {
  console.log("Server running!");
});