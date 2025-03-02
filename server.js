const express = require("express");
const cors = require("cors");
const path = require("path"); // Add this line to work with file paths
const app = express();
const port = 3000;

// Dummy election data
const electionData = [
  { state: "Alabama", votesDemocrat: 800, votesRepublican: 1200 },
  { state: "Alaska", votesDemocrat: 300, votesRepublican: 500 },
  { state: "Arizona", votesDemocrat: 1100, votesRepublican: 1000 },
  { state: "Arkansas", votesDemocrat: 600, votesRepublican: 900 },
  { state: "California", votesDemocrat: 5000, votesRepublican: 3000 },
  { state: "Colorado", votesDemocrat: 1200, votesRepublican: 1000 },
  { state: "Connecticut", votesDemocrat: 900, votesRepublican: 600 },
  { state: "Delaware", votesDemocrat: 300, votesRepublican: 200 },
  { state: "Florida", votesDemocrat: 2500, votesRepublican: 2700 },
  { state: "Georgia", votesDemocrat: 1800, votesRepublican: 1900 },
  { state: "Hawaii", votesDemocrat: 400, votesRepublican: 100 },
  { state: "Idaho", votesDemocrat: 200, votesRepublican: 500 },
  { state: "Illinois", votesDemocrat: 2200, votesRepublican: 1800 },
  { state: "Indiana", votesDemocrat: 1000, votesRepublican: 1300 },
  { state: "Iowa", votesDemocrat: 800, votesRepublican: 900 },
  { state: "Kansas", votesDemocrat: 600, votesRepublican: 800 },
  { state: "Kentucky", votesDemocrat: 700, votesRepublican: 1100 },
  { state: "Louisiana", votesDemocrat: 900, votesRepublican: 1200 },
  { state: "Maine", votesDemocrat: 400, votesRepublican: 300 },
  { state: "Maryland", votesDemocrat: 1500, votesRepublican: 800 },
  { state: "Massachusetts", votesDemocrat: 1800, votesRepublican: 900 },
  { state: "Michigan", votesDemocrat: 2000, votesRepublican: 1900 },
  { state: "Minnesota", votesDemocrat: 1500, votesRepublican: 1300 },
  { state: "Mississippi", votesDemocrat: 600, votesRepublican: 900 },
  { state: "Missouri", votesDemocrat: 1100, votesRepublican: 1300 },
  { state: "Montana", votesDemocrat: 300, votesRepublican: 500 },
  { state: "Nebraska", votesDemocrat: 400, votesRepublican: 600 },
  { state: "Nevada", votesDemocrat: 800, votesRepublican: 700 },
  { state: "New Hampshire", votesDemocrat: 500, votesRepublican: 400 },
  { state: "New Jersey", votesDemocrat: 1800, votesRepublican: 1200 },
  { state: "New Mexico", votesDemocrat: 600, votesRepublican: 400 },
  { state: "New York", votesDemocrat: 3500, votesRepublican: 2000 },
  { state: "North Carolina", votesDemocrat: 1800, votesRepublican: 1900 },
  { state: "North Dakota", votesDemocrat: 200, votesRepublican: 400 },
  { state: "Ohio", votesDemocrat: 2000, votesRepublican: 2200 },
  { state: "Oklahoma", votesDemocrat: 600, votesRepublican: 900 },
  { state: "Oregon", votesDemocrat: 1200, votesRepublican: 800 },
  { state: "Pennsylvania", votesDemocrat: 2500, votesRepublican: 2300 },
  { state: "Rhode Island", votesDemocrat: 300, votesRepublican: 100 },
  { state: "South Carolina", votesDemocrat: 900, votesRepublican: 1200 },
  { state: "South Dakota", votesDemocrat: 200, votesRepublican: 400 },
  { state: "Tennessee", votesDemocrat: 1000, votesRepublican: 1500 },
  { state: "Texas", votesDemocrat: 3000, votesRepublican: 4000 },
  { state: "Utah", votesDemocrat: 400, votesRepublican: 800 },
  { state: "Vermont", votesDemocrat: 300, votesRepublican: 100 },
  { state: "Virginia", votesDemocrat: 1800, votesRepublican: 1600 },
  { state: "Washington", votesDemocrat: 1500, votesRepublican: 1000 },
  { state: "West Virginia", votesDemocrat: 300, votesRepublican: 600 },
  { state: "Wisconsin", votesDemocrat: 1600, votesRepublican: 1500 },
  { state: "Wyoming", votesDemocrat: 100, votesRepublican: 300 },
  // Additional territories (to make it 54)
  { state: "Puerto Rico", votesDemocrat: 500, votesRepublican: 200 },
  { state: "Guam", votesDemocrat: 100, votesRepublican: 50 },
  { state: "U.S. Virgin Islands", votesDemocrat: 80, votesRepublican: 40 },
  { state: "District of Columbia", votesDemocrat: 700, votesRepublican: 100 },
];
// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (e.g., index.html, styles.css, script.js)
app.use(express.static(path.join(__dirname))); // Serve files from the project root

// API endpoint to get election data
app.get("/api/election-data", (req, res) => {
  res.json(electionData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
