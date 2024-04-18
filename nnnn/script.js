var polylineCoords = [
  [41.9198343, 42.0064616],
  [41.9201936, 42.0061666],
  [41.9210917, 42.0058715],
  [41.9214309, 42.0059949],
  [41.9214908, 42.0065798],
  [41.9212194, 42.0071428],
  [41.9209200, 42.0081192],
  [41.9207723, 42.0088917],
  [41.9213551, 42.0125449],
  [41.9219299, 42.0122498],
  [41.9225166, 42.0120138],
  [41.9245681, 42.0110267],
  [41.9251449, 42.0129445],
  [41.9254402, 42.0138933],
  [41.9257416, 42.0148489],
  [41.9252925, 42.0149562],
  [41.9248375, 42.0150420],
  [41.9244284, 42.0152378],
  [41.9240732, 42.0154121],
  [41.9230634, 42.0160371],
  [41.9220177, 42.0165896],
  [41.9231752, 42.0198620],
  [41.9241451, 42.0194381],
  [41.9252027, 42.0190680]
];



// Initialize variables to hold sum of latitudes and longitudes
var sumLat = 0;
var sumLng = 0;

// Loop through each coordinate and sum up latitudes and longitudes
for (var i = 0; i < polylineCoords.length; i++) {
  sumLat += polylineCoords[i][0]; // Latitude is the first element in each coordinate pair
  sumLng += polylineCoords[i][1]; // Longitude is the second element in each coordinate pair
}

// Calculate average latitude and longitude
var avgLat = sumLat / polylineCoords.length;
var avgLng = sumLng / polylineCoords.length;


var map = L.map('map').setView([avgLat, avgLng], 15.6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);



var streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);

var satelliteLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains:['mt0','mt1','mt2','mt3']
});




var p1 = L.circleMarker(polylineCoords[3], { color: 'cyan', fillColor: 'blue', fillOpacity: 1, radius: 20 }).addTo(map).bindPopup('Start Point');
var p2 = L.circleMarker(polylineCoords[7], { color: 'cyan', fillColor: 'blue', fillOpacity: 1, radius: 20 }).addTo(map).bindPopup('Start Point');
var p3 = L.circleMarker(polylineCoords[8], { color: 'cyan', fillColor: 'blue', fillOpacity: 1, radius: 20 }).addTo(map).bindPopup('Start Point');
var p4 = L.circleMarker(polylineCoords[11], { color: 'cyan', fillColor: 'blue', fillOpacity: 1, radius: 20 }).addTo(map).bindPopup('Start Point');
var p5 = L.circleMarker(polylineCoords[14], { color: 'cyan', fillColor: 'blue', fillOpacity: 1, radius: 20 }).addTo(map).bindPopup('Start Point');
var p6 = L.circleMarker(polylineCoords[20], { color: 'cyan', fillColor: 'blue', fillOpacity: 1, radius: 20 }).addTo(map).bindPopup('Start Point');
var p7 = L.circleMarker(polylineCoords[21], { color: 'cyan', fillColor: 'blue', fillOpacity: 1, radius: 20 }).addTo(map).bindPopup('Start Point');


// Define breathing animation for circles p1 to p7
function animateBreathing(circle) {
  var scaleFactor = 1.5; // Adjust the scale factor as needed for the breathing effect
  var minRadius = 10; // Define the minimum radius for the circle
  var maxRadius = 20.1; // Define the maximum radius for the circle
  var deltaRadius = 1; // Define the step size for increasing or decreasing the radius
  var increasing = true; // Flag to track if the radius is currently increasing

  setInterval(function() {
    var currentRadius = circle.getRadius();
    
    // Check if the radius should increase or decrease
    if (increasing) {
      currentRadius += deltaRadius;
    } else {
      currentRadius -= deltaRadius;
    }

    // Reverse the direction if the radius reaches the minimum or maximum
    if (currentRadius >= maxRadius || currentRadius <= minRadius) {
      increasing = !increasing;
    }

    circle.setRadius(currentRadius); // Update the radius of the circle
  }, 80); // Adjust the interval as needed for smoother animation
}
// Apply breathing animation to circles p1 to p7
animateBreathing(p1);
animateBreathing(p2);
animateBreathing(p3);
animateBreathing(p4);
animateBreathing(p5);
animateBreathing(p6);
animateBreathing(p7);



var startPoint = L.circleMarker(polylineCoords[0], { color: 'blue', fillColor: 'red', fillOpacity: 1, radius: 30 }).addTo(map).bindPopup('Start Point');

var endCircle = L.circleMarker(polylineCoords[polylineCoords.length - 1], { color: 'black', fillColor: 'blue', fillOpacity: 1, radius: 30 }).addTo(map).bindPopup('Start Point');

// Define the custom icon
var flagIcon = L.icon({
  iconUrl: 'icons/panel.png',
  iconSize: [55, 55], // Adjust the size of the icon as needed
  iconAnchor: [27, 55], // Adjust the anchor point if necessary
});

var polyline = L.polyline([polylineCoords], {color: 'blue', weight: 5, dashArray: '12, 12'}).addTo(map);

map.on('zoomend', function() {
  var zoomLevel = map.getZoom();
  var scaleFactor = 1 + (zoomLevel - 15); // Adjust this value as needed
  var minIconSize = 2; // Define a minimum size for the icon

  var newIconSize = 25 * scaleFactor;
  if (newIconSize < minIconSize) {
    newIconSize = minIconSize;
  }


});

var audioPlayed = false; // Flag to track if the audio has been played

function stopAudio() {
  var audioPlayer = document.getElementById("audioPlayer");
  audioPlayer.pause(); // Pause the audio when it finishes playing
}


// Function to calculate the distance between two GPS coordinates using the Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Radius of the Earth in meters
  const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in meters
  return distance;
}

// Define a threshold distance for triggering audio playback
const thresholdDistance = 170; // Adjust the threshold distance as needed



//Function to update the user's location
function updateLocation() {
  navigator.geolocation.watchPosition(function(position) {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;
     

      // Check if the userMarker already exists, if so, update its position
      if (typeof userMarker !== 'undefined') {
        userMarker.setLatLng([userLat, userLng]);
      } else {
        // Add marker for the user's location with cyan circle
        userMarker = L.circleMarker([userLat, userLng], { color: 'red', fillColor: 'cyan', fillOpacity: 1, radius: 14 }).addTo(map).bindPopup('Your Location');
      }

      // Loop through each checkpoint and calculate distance
      var d1, d2, d3, d4, d5, d6, d7; // Declare variables to store distances

      for (var i = 0; i < polylineCoords.length - 2; i++) { // Exclude start and end points (p0 and last)
          const checkpointLat = polylineCoords[i][0];
          const checkpointLng = polylineCoords[i][1];
          const distanceToCheckpoint = calculateDistance(userLat, userLng, checkpointLat, checkpointLng);
          
          // Assign distance to corresponding variable (d1 to d7)
          switch (i) {
              case 0:
                  d1 = distanceToCheckpoint;
                  if (d1 < thresholdDistance && !audioPlayed) {

               
                    console.log("distance to the checkpoint 1 is 170 meters");
                                
                    var audioPlayer = new Audio('audio/100l.mp3'); // Replace 'path/to/audio/file.mp3' with the actual path to your audio file
                    audioPlayer.play();
                    audioPlayed = true; // Set the flag to true to prevent playing the audio repeatedly
                  }
                  
                  break;
              case 1:
                  d2 = distanceToCheckpoint;
                  if (d2 < thresholdDistance && !audioPlayed) {
                    // Display distance d1 to the screen
                  
                    console.log("distance to the checkpoint 2 is 170 meters");
                                
                    var audioPlayer = new Audio('audio/100l.mp3'); // Replace 'path/to/audio/file.mp3' with the actual path to your audio file
                    audioPlayer.play();
                    audioPlayed = true; // Set the flag to true to prevent playing the audio repeatedly
                  }
                  
                  break;
              case 2:
                  d3 = distanceToCheckpoint;
                 
                  break;
              case 3:
                  d4 = distanceToCheckpoint;
                  // Add an if statement to check d4 and console log if < 170
                  
                // Inside the if statement where you check the distance to checkpoint 4
             
                  break;
              case 4:
                  d5 = distanceToCheckpoint;
                  
                  break;
              case 5:
                  d6 = distanceToCheckpoint;
                  
                  break;
              // No need for case 6 (excluded last element)
          }
          
          // Console log for debugging purposes (optional)
          
      }
      console.log(d2);
      

      // Rest of the code calculating distance to p4 and triggering turn alert...
  });
}


// Function to start tracking when the start button is clicked
function startTracking() {
  // Call the updateLocation function to start tracking the user's location
  updateLocation();
  var audioPlayer = new Audio('audio/100l.mp3'); // Replace 'path/to/audio/file.mp3' with the actual path to your audio file
                    audioPlayer.play();
                    audioPlayed = true; 
}
// Call the updateLocation function to start tracking the user's location
//updateLocation();