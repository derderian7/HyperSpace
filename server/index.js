const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

// Use CORS middleware to allow requests from http://localhost:3000
app.use(cors({ origin: "http://localhost:3000" }));

app.use(bodyParser.json());

app.get("/elements", async (req, res) => {
  try {
    const response = await axios.get("http://python_service:5000/elements");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching elements:", error);
    res.status(500).json({ error: "Error fetching elements" });
  }
});

app.post("/elements", async (req, res) => {
  try {
    const response = await axios.post(
      "http://python_service:5000/elements",
      req.body
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error adding element:", error);
    res.status(500).json({ error: "Error adding element" });
  }
});

app.put("/elements/:id", async (req, res) => {
  try {
    const response = await axios.put(
      `http://python_service:5000/elements/${req.params.id}`,
      req.body
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error updating element:", error);
    res.status(500).json({ error: "Error updating element" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
