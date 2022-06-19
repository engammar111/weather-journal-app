// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Integrate body-parser with our App
const bodyParser = require("body-parser");
// Integrate cors to enable Cross Origin Resource Sharing
const cors = require("cors");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 5500 || process.env.PORT;
const server = app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});

// POST route
app.post("/add", addInfo);
function addInfo(req, res) {
  newData = {
    temp: req.body.temp,
    date: req.body.date,
    content: req.body.content,
  };
  projectData.push(newData);

  res.json(projectData);
}

// Initialize all route with a callback function
app.get("/all", (req, res) => {
  res.json(projectData);
});
