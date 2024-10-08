// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Sample Data for Testing
let plants = [
  { id: 1, name: "Tomato", moisture: 70, ph: 6.5, ec: 1.8 },
  { id: 2, name: "Basil", moisture: 60, ph: 7.0, ec: 1.2 },
];

// Endpoints
app.get("/api/plants", (req, res) => res.json(plants));
app.get("/api/sensor-data", (req, res) => {
  const sensorData = plants.map((plant) => ({
    plantId: plant.id,
    moisture: plant.moisture,
    ph: plant.ph,
    ec: plant.ec,
  }));
  res.json(sensorData);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.post("/api/control", (req, res) => {
  const { command } = req.body;
  console.log(`Received control command: ${command}`);
  res.json({ message: `Executed ${command}` });
});
