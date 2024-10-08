const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Helper functions to generate random values
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomFloat(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1);
}

// Endpoint 1: /api/plants
app.get("/api/plants", (req, res) => {
  const plants = [
    {
      id: 1,
      name: "Tomato",
      soilMoisture: getRandomInt(20, 80), // Random moisture level
      lastWatered: new Date(
        Date.now() - getRandomInt(0, 48) * 60 * 60 * 1000
      ).toISOString(),
      status: "OK",
    },
    {
      id: 2,
      name: "Basil",
      soilMoisture: getRandomInt(20, 80),
      lastWatered: new Date(
        Date.now() - getRandomInt(0, 48) * 60 * 60 * 1000
      ).toISOString(),
      status: getRandomInt(0, 1) === 1 ? "OK" : "Needs Water",
    },
    {
      id: 3,
      name: "Lettuce",
      soilMoisture: getRandomInt(20, 80),
      lastWatered: new Date(
        Date.now() - getRandomInt(0, 48) * 60 * 60 * 1000
      ).toISOString(),
      status: "OK",
    },
  ];
  res.json(plants);
});

// Endpoint 2: /api/nutrient-solution
app.get("/api/nutrient-solution", (req, res) => {
  const nutrientSolution = {
    pH: getRandomFloat(5.5, 7.5),
    ec: getRandomFloat(1.0, 2.5),
    status: "OK",
  };
  res.json(nutrientSolution);
});

// Endpoint 3: /api/environment
app.get("/api/environment", (req, res) => {
  const environment = {
    temperature: getRandomFloat(20.0, 35.0),
    humidity: getRandomInt(30, 80),
  };
  res.json(environment);
});

// Endpoint 4: /api/logs
app.get("/api/logs", (req, res) => {
  const logs = [
    {
      timestamp: new Date(Date.now() - 3600 * 1000).toISOString(),
      action: "Watered",
      plantId: 1,
      details: "Watering cycle completed.",
    },
    {
      timestamp: new Date(Date.now() - 7200 * 1000).toISOString(),
      action: "Adjusted pH",
      plantId: null,
      details: "pH adjusted to 6.5.",
    },
    {
      timestamp: new Date(Date.now() - 10800 * 1000).toISOString(),
      action: "Fertilized",
      plantId: 2,
      details: "Nutrients added to solution.",
    },
  ];
  res.json(logs);
});

// Endpoint 5: /api/control (POST)
app.post("/api/control", (req, res) => {
  const { command, plantId } = req.body;
  const response = {
    status: "success",
    message: `Command "${command}" executed for Plant ID ${plantId}.`,
  };
  console.log(`Control command received: ${command} for Plant ID: ${plantId}`);
  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
});
