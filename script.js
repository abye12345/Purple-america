let map;
let markers = {}; // Store markers for each state

// Function to initialize the map
function initMap() {
  // Create a map centered on the United States
  map = L.map("map").setView([37.8, -96], 4); // Centered on the U.S.

  // Add a tile layer (base map)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
}

// Function to add markers for each state/territory
function addMarkers(data) {
  data.forEach((item) => {
    const coordinates = getStateCoordinates(item.state);

    if (coordinates) {
      const totalVotes = item.votesDemocrat + item.votesRepublican;
      const democratPercentage = (item.votesDemocrat / totalVotes) * 100;
      const republicanPercentage = (item.votesRepublican / totalVotes) * 100;

      // Blend red and blue based on percentages
      const color = `rgb(${republicanPercentage}%, 0, ${democratPercentage}%)`;

      // Create a circle marker
      const marker = L.circleMarker(coordinates, {
        radius: 10,
        fillColor: color,
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
        votesDemocrat: item.votesDemocrat, // Store Democrat votes in marker options
        votesRepublican: item.votesRepublican, // Store Republican votes in marker options
      })
        .addTo(map)
        .bindPopup(
          `<b>${item.state}</b><br>Democrat: ${item.votesDemocrat}<br>Republican: ${item.votesRepublican}`
        );

      // Store the marker in the markers object
      markers[item.state] = marker;
    }
  });
}

// Function to get coordinates for a state
function getStateCoordinates(state) {
  const stateCoordinates = {
    Alabama: [32.8067, -86.7911],
    Alaska: [61.385, -152.2683],
    Arizona: [33.7712, -111.3877],
    Arkansas: [34.9513, -92.3809],
    California: [36.7783, -119.4179],
    Colorado: [39.1136, -105.3589],
    Connecticut: [41.5834, -72.7622],
    Delaware: [39.3498, -75.5148],
    Florida: [27.994402, -81.760254],
    Georgia: [33.7629, -84.4227],
    Hawaii: [21.1098, -157.5311],
    Idaho: [44.2394, -114.5103],
    Illinois: [40.3363, -89.0022],
    Indiana: [39.8647, -86.2604],
    Iowa: [42.0046, -93.214],
    Kansas: [38.5111, -96.8005],
    Kentucky: [37.669, -84.6514],
    Louisiana: [31.1801, -91.8749],
    Maine: [44.6074, -69.3977],
    Maryland: [39.0724, -76.7902],
    Massachusetts: [42.2373, -71.5314],
    Michigan: [43.3504, -84.5603],
    Minnesota: [45.7326, -93.9196],
    Mississippi: [32.7673, -89.6812],
    Missouri: [38.4623, -92.302],
    Montana: [46.9048, -110.3261],
    Nebraska: [41.1289, -98.2883],
    Nevada: [38.4199, -117.1219],
    "New Hampshire": [43.4108, -71.5653],
    "New Jersey": [40.314, -74.5089],
    "New Mexico": [34.8375, -106.2371],
    "New York": [43.2994, -74.2179],
    "North Carolina": [35.6411, -79.8431],
    "North Dakota": [47.5362, -99.793],
    Ohio: [40.4173, -82.9071],
    Oklahoma: [35.5376, -96.9247],
    Oregon: [44.5672, -122.1269],
    Pennsylvania: [40.5773, -77.264],
    "Rhode Island": [41.6772, -71.5101],
    "South Carolina": [33.8191, -80.9066],
    "South Dakota": [44.2853, -99.4632],
    Tennessee: [35.7449, -86.7489],
    Texas: [31.9686, -99.9018],
    Utah: [39.4997, -111.5473],
    Vermont: [44.0407, -72.7093],
    Virginia: [37.768, -78.2057],
    Washington: [47.3917, -121.5708],
    "West Virginia": [38.468, -80.9696],
    Wisconsin: [44.2563, -89.6385],
    Wyoming: [42.7475, -107.2085],
    "Puerto Rico": [18.2208, -66.5901],
    Guam: [13.4443, 144.7937],
    "U.S. Virgin Islands": [18.3358, -64.8963],
    "District of Columbia": [38.9072, -77.0369],
  };

  return stateCoordinates[state] || null;
}

// Function to handle state search
function searchState() {
  const stateInput = document.getElementById("stateInput").value.trim();
  const stateStatementDiv = document.getElementById("stateStatement");

  // Clear the previous statement
  stateStatementDiv.innerHTML = "";

  if (markers[stateInput]) {
    const marker = markers[stateInput];
    const latLng = marker.getLatLng();

    // Zoom to the state
    map.setView(latLng, 6);

    // Open the marker's popup
    marker.openPopup();

    // Display a statement
    const totalVotes =
      marker.options.votesDemocrat + marker.options.votesRepublican;
    const democratPercentage = (
      (marker.options.votesDemocrat / totalVotes) *
      100
    ).toFixed(2);
    const republicanPercentage = (
      (marker.options.votesRepublican / totalVotes) *
      100
    ).toFixed(2);

    stateStatementDiv.innerHTML = `
            <h3>${stateInput}</h3>
            <p>Democrat Votes: ${marker.options.votesDemocrat} (${democratPercentage}%)</p>
            <p>Republican Votes: ${marker.options.votesRepublican} (${republicanPercentage}%)</p>
        `;
  } else {
    stateStatementDiv.innerHTML = `<p style="color: red;">State not found. Please check your input.</p>`;
  }
}

// Fetch election data and display it
async function fetchElectionData() {
  try {
    const response = await fetch("http://localhost:3000/api/election-data");
    const data = await response.json();
    addMarkers(data); // Only add markers to the map
  } catch (error) {
    console.error("Error fetching election data:", error);
  }
}

// Initialize the map and fetch data on load
initMap();
fetchElectionData();

// Add event listener for the search button
document.getElementById("searchButton").addEventListener("click", searchState);
