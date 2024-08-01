const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

// Use CORS middleware to allow requests from http://localhost:3000
app.use(cors({ origin: "http://localhost:3000" }));

// Use bodyParser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Route to fetch all elements
app.get("/elements", async (req, res) => {
  try {
    const response = await axios.get("http://python_service:5000/elements");
    // Send the response data back to the client
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching elements:", error);
    res.status(500).json({ error: "Error fetching elements" });
  }
});

// Route to add a new element
app.post("/elements", async (req, res) => {
  try {
    // Make a POST request to the Python service to add a new element
    const response = await axios.post(
      "http://python_service:5000/elements",
      req.body
    );
    // Send the response data back to the client
    res.json(response.data);
  } catch (error) {
    console.error("Error adding element:", error);
    res.status(500).json({ error: "Error adding element" });
  }
});

// Route to update an existing element by ID
app.put("/elements/:id", async (req, res) => {
  try {
    // Make a PUT request to the Python service to update an element by ID
    const response = await axios.put(
      `http://python_service:5000/elements/${req.params.id}`,
      req.body
    );
    // Send the response data back to the client
    res.json(response.data);
  } catch (error) {
    console.error("Error updating element:", error);
    res.status(500).json({ error: "Error updating element" });
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
